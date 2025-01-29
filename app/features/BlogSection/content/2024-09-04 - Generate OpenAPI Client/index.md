---
slug: 2024-09-04-how-to-generate-a-client-from-openapi-schema
title: How to generate a client from OpenAPI schema
pubdate: 2024-09-04
tags: openapi, api, react, typescript
summary:
  Using API generators is the best way to make sure we follow the documentation.
  No missed types or misspelled endpoints, no double-checking what is the
  payload or what will be returned. Just pure bliss.
youtube: https://youtu.be/3LIk2Tu1-9I
---

Last time I’ve shown how to decorate (pun intended) your Express application
with OpenAPI. Now let’s see how to use these docs on the frontend!

For a few years I’ve been happily using Ferdi Koomen’s
[OpenAPI TypeScript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen),
but, as it turns out, due to lack of time, author himself suggests
[Hey API](https://github.com/hey-api), which we’ll use today.

## What we will need?

The whole process is actually very quick. One thing we need to start, is, well,
the OpenAPI file. If you followed my
[OpenAPI Express](https://www.youtube.com/watch?v=AzAr4TpNbmI) video, you’ll
have one right there for you. If not – it’s cool, any file will do.

For the sake of clearness and to have a bit more methods than just the ones
we’ve done it the aforementioned video, I’ll use
[FakeRESTApi](https://fakerestapi.azurewebsites.net/index.html). To get the
schema, click on the link under the title (or
[here](https://fakerestapi.azurewebsites.net/swagger/v1/swagger.json)) and save
it somewhere.

Then, to use the generated client, we need the project. I’ll just drop the empty
Vite and React one.

```bash
~ npm create vite@latest -- --template react-ts;
cd react-ts; npm i;
```

Now, let’s move the Swagger file to our project. You can put it wherever, I’ll
use the `docs` directory.

## Generating the Client

Now that we have all in place, it’s time to start. To begin, install the
generator and the fetch client it uses:

```bash
~ npm install @hey-api/client-fetch && npm install @hey-api/openapi-ts -D
```

Note that the first dependency is not installed as development package – it will
be used publicly.

Next, we’ll want to configure the generator. While it has its defaults, I
suggest creating a configuration for it and run it programatically:

```ts
// ./scripts/apigen.ts

import { createClient } from "@hey-api/openapi-ts";

try {
  await createClient({
    client: "@hey-api/client-fetch",
    input: "./docs/swagger.json",
    output: "./src/api",
  });
} catch (e) {
  console.error("Error generating API client", e);
}
```

Let’s go through the file from the top. First, we import the function and wrap
it in `try/catch` block. Then, the config is rather straightforward:

- `client` is what we want to be used for fetching, currently there’s Fetch and
  Axios. I prefer the former, as it’s simply a native one;
- `input` is where the file lies. Remember to set it **relatively to where the
  script will be run** from, **not relative** to where it resides;
- `output` is where the generated files are to be generated.

And now we need to run this TypeScript file. There’s plenty of options, like
`ts-node` or, relatively new, `tsx`. I’ll go with the former:

```bash
~ npm i -D tsx
```

This will install the `tsx` package, so we can go with

```bash
~ tsx ./scripts/apigen.ts
```

I suggest adding this to `package.json` as a script to have easy access:

```json
// ./package.json

"scripts": {
  "generate:api": "tsx ./scripts/apigen.ts"
}
```

## What is all this?

Cool, so we now have three new files. But, what are they?

Going from the top:

- `schemas.gen.ts` are the JSON schema took from the Swagger. It’s something
  you’ll use for input validation. For example, if you’d have input length or a
  particular format defined, you could use it.
- `services.gen.ts` is the meat of our newly generated code. Every endpoint has
  its own, fully typed, function we can invoke to make the call.
- `types.gen.ts` are, well, types. Every component and endpoint defined in the
  OpenAPI file will have its reflection here.

For convenience, everything is re-exported from the `index` file.

## Using the Client

All right, we have all this generated, let’s put it to work!

First, we need to configure the client. We need to put the actual base URL of
our API. This is useful if we want to make it bound to the environment, or for
testing.

> For brevity, I’ll mostly work in `App.tsx` for now

So, let’s do it:

```tsx
// ./src/App.tsx

import { client } from "./api";

client.setConfig({
  baseUrl: "https://fakerestapi.azurewebsites.net",
});
```

And that’s that. Simple, right? It’s the default client, will be used
everywhere, unless we tell the service otherwise.

### Fetching the data

Great, so now let’s try to get some data! Start by defining a container for the
data using `useState`. But what type should it have? Thanks to the generator,
that’s not our concern. We will use `getApiV1Activities` to get all activities,
which returns `GetApiV1ActivitiesResponse`. So that’s what we’ll use:

```tsx
// ./src/App.tsx

function App() {
  const [activities, setActivities] = useState<GetApiV1ActivitiesResponse>();
  ...
```

And to fetch the data, I’ll use quick and dirty `useEffect`. I know it’s not the
best thing, but hey, it gets the job done.

```tsx
useEffect(() => {
  if (activities) return;

  (async () => {
    const { data } = await getApiV1Activities();
    setActivities(data);
  })();
}, [activities]);
```

> Fun fact: this effect, if not blocked by L#2, would run infinitely, since
> `activites` are always different (which is by design of the API we’re using,
> this is not a normal scenario). That’s why I am freezing it by returning early
> if anything’s fetched.

`getApiV1Activities`, like every generated function, returns four things:

- `data`, well, the data we’re fetching;
- `error`, the error that can happen (which is also typed if you look into the
  service!);
- `request` is the `Request` object defining what we’ve just fired;
- `response` is, similar to the above, `Response` object defining what came back
  (including status, headers etc).

All right, let’s use it!

```tsx
if (activities && activities.length > 0) {
  return (
    <ul>
      {activities?.map((activity) => (
        <li key={activity.id}>
          <h3>{activity.title}</h3>
          <p>{activity.dueDate}</p>
          <span>{activity.completed}</span>
        </li>
      ))}
    </ul>
  );
}

return <div>Fetching...</div>;
```

In here, we’re checking if the data is loaded and has its length greater than 0,
and if so, we render the list. If not, we’re displaying the loading state. Let’s
check if it is working!

And if you see 30 items on the list, it does!

### Modifying the data

Alright, fetching is easy! Let’s do something real challenging, like deleting!
We’re, again, covered by the generator, so if we look into
`deleteApiV1ActivitiesById`, we’ll see what it does.

And… it returns `unknown`, which is a typical behavior for `DELETE` verb. Not
the best, but typical. This means, we’ll have to do our filtering on the
frontend _or_ refetch the data on delete. Due to the small amounts of data and a
simple mechanism (which will be simply removing the object with a corresponding
`id` field), I pick the former.

Let’s start by defining a state that will lock our UI while the transaction will
be taking place:

```tsx
const [loading, setLoading] = useState(false);
```

and create the actual function we’ll invoke on click:

```tsx
async function deleteActivity(id: number) {
  try {
    setLoading(true);

    await deleteApiV1ActivitiesById({ path: { id } });

    setActivities((current) => {
      if (!current) return current;
      return current.filter((activity) => activity.id !== id);
    });
  } catch {
    console.error("Failed to delete activity");
  } finally {
    setLoading(false);
  }
}
```

As you can see, `deleteApiV1ActivitiesById` takes fully typed parameters here.
But, since it does not return anything, we have to do the filtering ourselves.
As mentioned, quite an easy procedure.

> I am using the callback function here, as it’s the safest bet – it makes sure
> we are operating on the latest data we have.

Okay, let’s expand the UI:

```tsx
{
  activities.map((activity) => {
    const onDelete = () => deleteActivity(activity.id as number);

    return (
      <li key={activity.id}>
        <h3>{activity.title}</h3>
        <p>{activity.dueDate}</p>
        <span>{activity.completed}</span>
        <hr />
        {typeof activity.id === "number" && (
          <button onClick={onDelete} disabled={loading}>
            Delete
          </button>
        )}
      </li>
    );
  });
}
```

> I like to define function that’ll be used in loops outside, but that’s a
> preference. I honestly didn’t measure any performance differences between this
> and defining an inline lambda within the loop.

Cool, let’s hit it! And if you can click on “Delete” and see it disappears,
you’re golden!

## Moving API to a hook

One thing I like to have in my projects is order. Back to school vibes, huh? One
way to have it is to move things we’re using often into hooks. Creating an API
hook is not really that much work. Let’s start by creating a new file:

```ts
// ./hooks/useApi.ts

export const useApi = () => {};
```

To make sense of using it, let’s add some functionalities. For example, I’d like
to be able to change the client config when invoking the hook. Let’s add this!

```ts
// ./hooks/useApi.ts

export const useApi = (override: Config = {}) => {
  const config: Config = {
    baseUrl: "https://fakerestapi.azurewebsites.net",
  };

  client.setConfig({ ...config, ...override });
};
```

Okay, so now we need to return something. Services, of course! And let’s export
the types while we’re at it, so everything will be kept in the same place (at
least virtually).

```ts
// ./hooks/useApi.ts

import { client } from "../api";
import * as services from "../api/services.gen.ts";
export * from "../api/types.gen.ts";
import { Config } from "@hey-api/client-fetch";

export const useApi = (override: Config = {}) => {
  const config: Config = {
    baseUrl: "https://fakerestapi.azurewebsites.net",
  };

  client.setConfig({ ...config, ...override });

  return services;
};
```

Now, to change the implementation:

```tsx
// ./src/App.tsx

function App() {
  const api = useApi();

  ...

  useEffect(() => {
	  if (activities) return;

	  (async () => {
	    const { data } = await api.getApiV1Activities();
	    setActivities(data);
	  })();
	}, [activities, api]);

	async function deleteActivity(id: number) {
	  try {
	    setLoading(true);

	    await api.deleteApiV1ActivitiesById({ path: { id } });

	    setActivities((current) => {
	      if (!current) return current;
	      return current.filter((activity) => activity.id !== id);
	    });
	  } catch {
	    console.error("Failed to delete activity");
	  } finally {
	    setLoading(false);
	  }
	}

...
```

That’s basically all we need to change. Just add the `api.` prefix, since we’re
executing it from the hook. And if the browser still returns what it should,
we’re home!

## Bonus: formatting

Speaking of order, there’s nothing better than having all the code formatted
accordingly to our standards. (I realize I start to sound weird.) Hey API allows
us to use a formatting tool on the generated files! And while I know (and use)
about postscripts and that we could do `postgenerate:api` and throw Prettier
there, why would we, if the generator can do it for us?

To apply the formatter, go to the script we’ve created at the start and change
the `output` to an object:

```ts
// ./scripts/apigen.ts

try {
  await createClient({
    client: "@hey-api/client-fetch",
    input: "./docs/swagger.json",
    output: {
      path: "./src/api",
      format: "prettier",
    },
  });
} catch (e) {
  console.error("Error generating API client", e);
}
```

Now, running the generator will yield an additional comment:

```bash
✨ Running Prettier
```

and the sources will no longer be the hard to read one-liners.

—

Using API generators is the best way to make sure we follow the documentation.
No missed types or misspelled endpoints, no double-checking what is the payload
or what will be returned. Just pure bliss.

---

Git repo:
[https://github.com/tomekbuszewski/react-openapi-gen](https://github.com/tomekbuszewski/react-openapi-gen)
