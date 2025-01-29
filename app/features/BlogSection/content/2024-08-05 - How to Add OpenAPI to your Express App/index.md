---
slug: 2024-08-05-how-to-add-openapi-to-your-express-app
title: How to Add OpenAPI to your Express App?
summary:
  Proper documentation is the key for comfortable work with your code. And the
  best documentation is the one you generate, not write.
pubdate: 2024-08-05
tags: node, express, openapi, swagger
youtube: https://www.youtube.com/watch?v=AzAr4TpNbmI
---

Proper documentation is the key for comfortable work with your code. And the
best documentation is the one you generate, not write.

### Structure and Preparations

Let’s say we have a simple Express application written in TypeScript. It
consists of only one area – “chores”. It’s glorified todo app, yes. It has:

- `main.ts` as the app’s entry point;
- `app.ts` for the app initialization;
- `chore/` as the actual business unit.

For the logic, it’s not really that important. What matters is that we have
controller as classes.

```ts
// ./chore/controller.ts

import { ChoreService } from "./service";
import { BaseChore, Chore, ChoreUpdate } from "./types";

export class ChoreController {
  private service: ChoreService;

  constructor(service: typeof ChoreService = ChoreService) {
    this.service = new service();
  }

  public getAllChores(): Chore[] {
    return this.service.getAllChores();
  }

  public createChore(chore: BaseChore): Chore[] {
    return this.service.createChore(chore);
  }

  public updateChore(id: string, chore: ChoreUpdate): Chore[] {
    return this.service.updateChore(id, chore);
  }

  public deleteChore(id: string): Chore[] {
    return this.service.deleteChore(id);
  }
}
```

It uses a service, but that’s really beyond the point. We could (we shouldn’t,
but we could) dump all the logic in the controller and it wouldn’t matter for
this example.

There’s also `routes.ts` file that basically takes URLs and payloads and pushes
it further:

```ts
// ./chore/routes.ts

import { type Request, type Response, Router } from "express";
import { ChoreController } from "./controller";
import { ChoreService } from "./service";
import { BaseChore, ChoreRequest } from "./types";

export const router = Router();

const controller = new ChoreController(ChoreService);

router.get("/", (_req: Request, res: Response): Response => {
  return res.json(controller.getAllChores());
});

router.post(
  "/",
  (req: Request<undefined, BaseChore>, res: Response): Response => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).send("Invalid chore");
    }

    try {
      return res.status(201).json(controller.createChore(req.body));
    } catch (e) {
      console.log(e);
      return res.status(500).send(JSON.stringify(e));
    }
  }
);

router.put(
  "/:id",
  (req: Request<ChoreRequest, BaseChore>, res: Response): Response => {
    if (!req.params.id) {
      return res.status(400).send("Invalid chore");
    }

    return res.json(controller.updateChore(req.params.id, req.body));
  }
);

router.delete("/:id", (req: Request<ChoreRequest>, res: Response): Response => {
  return res.json(controller.deleteChore(req.params.id));
});
```

And it is exported and thrown into the express app in `app.ts`:

```ts
// app.ts

import express, { Express } from "express";

import chores from "./chore";

export const app: Express = express();

app.use(express.json());
app.use("/", chores);
```

…which in return is taken by `main.ts`:

```ts
// main.ts

import express from "express";
import { app } from "./app";

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => console.log(`http://localhost:${port}`));
```

That’s it for preparations. This is a fully working app that accepts GET, POST,
PUT and DELETE. But to know it, you have to go through the code. This is where
OpenAPI comes in.

### Adding TSOA for generating docs

In order to enhance the controller with OpenAPI markers, we will use
[TSOA](https://github.com/lukeautry/tsoa). It’s battle-tested library built
exactly for this purpose. If you’ve worked with NestJS or TsED, you might’ve
seen decorators like `Get()` or `Post()` for controllers. That’s TSOA.

Let’s start by adding the library:

```bash
~ npm install tsoa
```

It comes fully typed, so there’s no need to add anything more.

After it is installed, let’s create `tsoa.json` file in the root of our project.
It’s the config file for the generator, it tells it where to look for
controllers and where to save the docs. It looks like this:

```json
{
  "entryFile": "src/main.ts",
  "controllerPathGlobs": ["./src/**/controller.ts"],
  "spec": {
    "outputDirectory": "./docs",
    "specVersion": 3,
    "spec": {
      "servers": [
        {
          "url": "http://localhost:3000",
          "description": "Local server"
        }
      ]
    }
  }
}
```

Going from the top,

- `entryFile` is for which file is the main one;
- `controllerPathGlobs` is a
  [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) for where to look
  for controllers;
- `spec` is the config for documentation that will be generated, with
  `outputDirectory` pointing at where we want to have `swagger.json`.
  `specVersion` defined whether we want OpenAPI standard (3) or Swagger (2). I
  highly recommend the former.

### Expanding the Controller

As mentioned earlier, TSOA works with controllers. So we need to enhance what we
currently have to make it readable.

Let’s start with marking the controller as `Route`, tag it and make it extend
the `Controller` class from TSOA:

```ts
// ./chore/controller.ts
import { Route, Tags, Controller } from "tsoa";

@Route()
@Tags("Chore")
export class ChoreController extends Controller {
  // ...

  constructor(service: typeof ChoreService = ChoreService) {
    super();

    this.service = new service();
  }
  // ...
}
```

From the top, `Route` allows the library to detect that it’s actually a
controller that takes care of traffic. `Tags` serves as the name (otherwise it
defaults to `"default"`) and `Controller` is a thin class giving us few
additional methods, like setting status codes and headers.

All right, let’s start adding some routes! First, we have `getAllChores`, which
is the easiest. Just add `Get()` and you’re golden:

```ts
// ./chore/controller.ts

export class ChoreController extends Controller {
  // ...

  @Get()
  public getAllChores(): Chore[] {
    return this.service.getAllChores();
  }
  // ...
}
```

Okay, we’ve been doing this for a while, but does it even work? Let’s try!

```bash
~ tsoa spec
```

And we have a new directory – `./docs` – created, with a `swagger.json` inside.
Okay, let’s keep the momentum going!

The most complex is definitely the POST verb, because it requires defining the
body. Let’s try:

```ts
// ./chore/controller.ts

@Route()
@Tags("Chore")
export class ChoreController extends Controller {
  // ...

  @SuccessResponse("201", "Created")
  @Post()
  public createChore(@Body() chore: BaseChore): Chore[] {
    this.setStatus(201);
    return this.service.createChore(chore);
  }

  // ...
}
```

Okay, it wasn’t that hard, right? The biggest thing is `this.setStatus` method,
coming from the TSOA `Controller` class. Without this, we’d get `200`, default
success status. It’s not a mistake, but good status codes just nice and makes
the work easier. What’s left are the PUT and DELETE ones, with path params.
Let’s go:

```ts
// ./chore/controller.ts

@Route()
@Tags("Chore")
export class ChoreController extends Controller {
  // ...

  @Put("{id}")
  public updateChore(
    @Path("id") id: string,
    @Body() chore: ChoreUpdate
  ): Chore[] {
    return this.service.updateChore(id, chore);
  }

  @Delete("{id}")
  public deleteChore(@Path("id") id: string): Chore[] {
    return this.service.deleteChore(id);
  }
}
```

Important thing is to match the param names, so if we have `Put("{id}")`, we
want to retain this `id` everywhere in the method.

Right, so it seems we’re done? Let’s try.

```bash
~ tsoa spec
```

And we’re golden. Docs are generated, so we can now have certainty that
everything we say in the Swagger matches the reality.

### Bonus #1: Exposing the Swagger docs

Having docs as the JSON file is the most important, but can we also present it
somehow? Sure we can. Enter Swagger UI! And I am not talking about the
[Swagger Editor](https://editor.swagger.io/), but our very own instance!

First, let’s install the dependencies:

```bash
~ npm i swagger-ui-express;
~ npm i -D @types/swagger-ui-express;
```

Now, we need to enable JSON imports in our TypeScript config:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

Having this will allow TS to import JSON files just like any other modules.

Now let’s import the dependencies in our main file:

```ts
// main.ts

import express from "express";
import Swagger from "swagger-ui-express";
import { app } from "./app";
import swaggerDocument from "../docs/swagger.json";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", Swagger.serve, Swagger.setup(swaggerDocument));

app.listen(port, () => console.log(`http://localhost:${port}`));
```

That’s it! Now, after we start out server and access
[http://localhost:3000/docs](http://localhost:3000/docs), we should have our
docs ready!

### Bonus #2: Generated Routing and Validation

But wait, there’s more!

No, really, there’s a bit more TSOA can do.

As you can see, there’s no validation to be found, and all the routes are made
by hand. That's a bit of a problem, because we define routes in `routes.ts`
file, and then in TSOA annotations in the controller. And all the validation
requires us to jump in and write it manually. These two issues can be solved in
one fell swoop.

First, let’s go back to the config file and add `routes` entry:

```json
{
  "entryFile": "src/main.ts",
  "controllerPathGlobs": ["./src/**/controller.ts"],
  "spec": {
    "outputDirectory": "./docs",
    "specVersion": 3,
    "spec": {
      "servers": [
        {
          "url": "http://localhost:3000",
          "description": "Local server"
        }
      ]
    }
  },
  "routes": {
    "routesDir": "./src/api"
  }
}
```

`routesDir` defines where the routes should be written. I put it in a general
location, because TSOA will take all controllers and combine them into one file.
Right, so let’s try to generate this.

```bash
~ tsoa routes
```

All right! We have `routes.ts` file created, which… frankly, looks messy. But
all generated code does, so don’t worry. If we dive a bit deeper, there’s
validation added, basing on our routes as well! For example, `app.delete` checks
for the `id` in path:

```ts
// ./src/api/routes.ts

const args: Record<string, TsoaRoute.ParameterSchema> = {
  id: {"in":"path","name":"id","required":true,"dataType":"string"},
};

// ...

try {
    validatedArgs = templateService.getValidatedArgs({ args, request, response });

// ...
```

That’s great, but what if we want to have more strict validation? Like, input
lengths?

No problem!

Let’s say we want to make sure that, when we add a chore, `name` is at least 3
characters long. To do so, we need to modify our type a bit:

```ts
// ./src/chore/types.ts

export interface BaseChore {
  /**
   * @minLength 3
   */
  name: string;
  /**
   * @minLength 3
   */
  description: string;
}
```

Yes, I know these aren't the most appealing, but adding these comments will
allow the generator to create validation clauses. Let’s try!

```bash
~ tsoa routes
```

And in the routes, we have our models updated:

```ts
// ./src/api/routes.ts

const models: TsoaRoute.Models = {
    "Chore": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"minLength":{"value":3}}},
            "description": {"dataType":"string","required":true,"validators":{"minLength":{"value":3}}},
            "id": {"dataType":"string","required":true},
            "done": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
// ...
```

Great!

Now all there’s left is to register these routes.

The generated `routes.ts` exposes `RegisterRoutes` function, which accepts the
Express app, so it’s just a formality:

```ts
// app.ts

import express, { Express } from "express";

import { RegisterRoutes } from "./api/routes";

export const app: Express = express();

app.use(express.json());
RegisterRoutes(app);
```

That’s it!

—

We now have a fully working application that generated its documentation and
routes. In the future, I’ll show you how to utilize the Swagger file to generate
a fully typed API client for the frontend.

Happy coding!

---

- [Code in the repo](https://github.com/tomekbuszewski/openapi-demo);
- [TSOA official repo](https://github.com/lukeautry/tsoa/tree/master).
