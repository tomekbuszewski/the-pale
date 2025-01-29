---
slug: 2024-11-11-intro-to-remix
title: Intro to Remix
summary:
  The landscape of current React full-stack frameworks is pretty much dominated
  by Next.js. But I never quite liked it, and always felt it’s too complex for
  its own good. So recently I’ve started to use Remix.
pubdate: 2024-11-11
tags: react, remix, full-stack, framework
youtube: https://youtu.be/rn4UiGBbuXc
---

The landscape of current React full-stack frameworks is pretty much dominated by
Next.js. But I never quite liked it, and always felt it’s too complex for its
own good. So recently I’ve started to use Remix.

If you were here in 2020, you might remember that the launch of Remix was quite
the event. But back then it was a paid solution. And it had a pretty hefty price
tag as well, with $250 for an “indie” license and a whopping $1000 for an
enterprise one
([as Nader Dabit said back then](https://dev.to/dabit3/a-first-look-at-remix-run-449a),
I really don’t remember). This proven to be rather ineffective strategy, because
in October 2021 Remix went fully open-source, and one year after that, it got
bought by Shopify.

But enough of that history lesson!

## What is a full-stack React framework?

As mentioned, Remix is a full-stack framework. This means, it executes both
backend and frontend code. This is used mostly to render the React application
on the server and send it to the consumer, rather than render everything on the
client. It is both faster and more SEO-friendly, but comes with a cost. Most
notably, it is no longer a collection of static files, but a living application
that needs a server. It also adds a bit of overhead and limitations, like
`useEffect` not being active on the server or having to check what environment
we’re using. And this is where Remix come in.

## Getting started with Remix

As will all modern, mature tools, Remix can be initialized with a single
command:

```bash
~ npx create-remix@latest
```

That’s it, if you want the basics. And for now, we do want basics. It will ask
you a few things, like the project name (and directory), whether to initialize a
new git repo and whether to install dependencies. After all that is done, all
that’s left is to enter the directory named after your project and run

```bash
~ npm run dev
```

It runs the whole application in a development mode with hot reloading, Tailwind
and Vite config ready to go. Basically, you can start writing your app right
now.

But, before you do, let’s walk through our new project.

### Entry files

First, you will notice two files: `entry.server` and `entry.client`. This is
Remix’ way of differentiating whether given file should be ran on the server, on
the client, or (if no suffix is passed) on both.

Opening `entry.client` does not give us any gasps, it’s just a hydration file.

> React uses “hydration” mechanism to virtualize the document the server
> rendered and attach itself to it, so all the JavaScript can be executed
> against it.

`entry.server` is a bit more interesting, but it’s more of a scaffolding. It has
bot detection and can decide what to render. Function `handleRequest` checks the
visitor and if it decides that it’s a crawler or other bot, it runs
`handleBotRequest`, otherwise `handleBrowserRequest`. Fun fact is, both
functions are the same for now. IDE even warns us about it. But these functions
can be expanded and we can, for example, block all bots, reduce its traffic, or
serve different content. But I would advice against doing that last thing, as it
might end in search engines sandboxing you, if they find you serve different
content to its crawlers and to regular users.

Then we have the `root` file, which is, again, a rather simple React component.
It is responsible for the default layout the app will have, including `<head>`
and `<body>` elements. One thing to notice is, it includes `Meta`, `Links` and
`Scripts` components. These are responsible for injecting all the data our
routes will provide, for example different meta tags or style links.

## Routes

Okay, so let’s dive into the meat of Remix – the routing. And by default, this
system is quite baffling to me, to be frank. It uses flat structure with file
name as route params. For example, if we want to have `/hello` that will
redirect us to `/hello/{name}`, this is the structure:

```bash
/routes
|- hello.$name.tsx
|- hello._index.tsx
```

If we want to go deeper, let’s say, we want to have categories and
subcategories, it will be even funnier: `categories.$category.$subcategory.tsx`.
Thankfully, there is a rather simple solution to this: Remix Flat Routes
package. To install it, we need to go with:

```bash
npm install -D remix-flat-routes
```

And now the documentation is a bit outdated, as it still refers the
`remix.config.js`. What we actually need to do, is to update `vite.config.ts`:

```ts
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      routes: (defineRoutes) => flatRoutes("routes", defineRoutes),
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
```

And now we can use nested routes:

```bash
/routes
|- /hello2+
|-- $name.tsx
|-- _index.tsx
```

What’s cool is that we can also create layouts for every route. Let’s create a
`_layout.tsx` file:

```tsx
import { useOutlet } from "@remix-run/react";

export default function Layout() {
  const outlet = useOutlet();
  return <main style={{ padding: "1rem", background: "#ddd" }}>{outlet}</main>;
}
```

And now every route under `/hello2/` will have a padding and a grey background.

We can also define layouts in a flat way, but quite honestly, it looks terrible:

```bash
/routes
|- hello._hello.$name.tsx // This is the main subpage
|- hello._hello.tsx // This is the layout file
|- hello._index.tsx // This is the redirection
```

I know that the nested is not perfect, with the `+` as a suffix, but it still
beats the dotted filenames. But, if you don’t feel like it, you can stay with
the basic, default structure. The choice is all yours.

## Data fetching

Alright, let’s get to the good stuff! Everyone knows that fetching data on the
server, serving and revalidating it is the hard part. But, quite surprisingly,
Remix makes it really easy, even if a bit limited.

To start, let’s create a new route, and call it `jokes`:

```tsx
// ./routes/jokes.tsx

export default function Jokes() {
  return <div>My funny jokes</div>;
}
```

> I am using a flat route because it won’t have any other routes or layouts.

Right, so there is an API that serves the best jokes on the Internet:
[Official Joke API](https://official-joke-api.appspot.com/jokes/random/10). So
let’s fetch ten random bits and render it.

The first thing is to understand how data is loaded in Remix. It does _not_ load
within components, but within routes. So every route can load data, but if you
want a component to use it, you must pass it through as a prop. Basically,
components cannot fetch on their own, if you want to have the data on the
server. This is the biggest flaw of Remix if you ask me. I _assume_ that when
[React Server Components](https://react.dev/reference/rsc/server-components)
will be finalized with React 19, Remix (or, by then, React Router 7) will
utilize it.

Okay, so let’s move on. Fetching the data is actually quite simple, as it boils
down to exporting an async `loader` function:

```tsx
export async function loader() {}
```

If we run this though, we’ll get an error. Loader always has to return
something. And the best would be, to return JSON. Luckily, Remix has you
covered:

```tsx
export async function loader() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/random/10"
  );
  const jokes = await response.json();

  return json({ jokes });
}
```

And let’s use this data. For that, we’ll need the `useLoaderData` hook:

```tsx
export default function Jokes() {
  const data = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data.jokes)}</pre>;
}
```

Note the `typeof loader` type. It shows that we have an object with `jokes` in
it. Unfortunately, this is not magic and `jokes` is defined as `any`. But we can
type it ourselves.

```tsx
interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export async function loader() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/random/10"
  );
  const jokes = (await response.json()) as Joke[];

  return json({ jokes });
}
```

Adding `as` is often seen as a hack, so we can do something else, namely pass
the type to the generic `useLoaderData`:

```tsx
const data = useLoaderData<{ jokes: Joke[] }>();
```

This forces us to define everything that `loader` returns, but we get it fully
typed, instead of assigned to `any`. Whatever way you chose, both will give you
proper results.

### Error handling

Okay, that’s perfect, but what if our server breaks? Or the response will
change? `loader` allows us to catch errors using `try/catch` statement:

```tsx
export async function loader() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/jokes/random/10"
    );
    const jokes = await response.json();

    return json({ jokes });
  } catch (error) {
    return json({ error: (error as Error).message }, 500);
  }
}
```

All we need to do now is to handle it in the render:

```tsx
export default function Jokes() {
  const data = useLoaderData<{ jokes: Joke[] } | { error: string }>();

  if ("error" in data) {
    return <div style={{ background: "red" }}>{data.error}</div>;
  }

  return (
    <ul>
      {data.jokes.map((joke) => (
        <li key={joke.id}>
          <strong>{joke.setup}</strong>
          <p>{joke.punchline}</p>
        </li>
      ))}
    </ul>
  );
}
```

And that’s it!

## Sending data

Cool, so fetching is done. How about sending some forms? Remix handles this as
well, and in a similarly seamless way.

First, we need to export `action` async function. It has one parameter (object)
of `ActionFunctionArgs` type, which then has `request` item, which we can
utilize:

```tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData.get("name"));

  return null;
}
```

Hey, you can say, FormData is browser-only! Well, yes, but Remix patches it, so
you don’t have to worry about where your code will be executed.

> I realize this sounds like I am being sponsored by Remix, but I am not, I am
> just truly happy with how many problems it solves.

And the form that we need has to be imported from Remix:

```tsx
import { Form } from "@remix-run/react";

export default function FormPage() {
  return (
    <Form method="post">
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
    </Form>
  );
}
```

Okay, let’s try to submit this! And you can see in the network inspector that it
actually does a fetch in browser, but points to our page. That’s how Remix
handles web transactions that are bound to the server, so your API is never
seen. If you will do a client-side fetch, your API will be exposed.

Of course we can now take this form data, send it somewhere and return
something! So let’s make a simple function that will capitalize our input.

```tsx
function toUpper(str: string) {
  return str.toUpperCase();
}
```

That’s some senior code, everything SOLID.

Right, so our action now returns:

```tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name === "string") {
    return json({ name: toUpper(name) });
  }

  return json({ error: "Name is required" }, { status: 400 });
}
```

and in our main function, we now use `useActionData`, which works very similarly
to `useLoaderData`:

```tsx
const data = useActionData<{ name: string } | { error: string }>();
```

So let’s now edit the render, and if nothing has been received, we’ll display
the form, otherwise we’ll resolve to either result or error:

```tsx
export default function FormPage() {
  const data = useActionData<{ name: string } | { error: string }>();

  if (!data) {
    return (
      <Form method="post">
        <label>
          Uppercasify this name:
          <input type="text" name="name" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    );
  }

  if ("error" in data) {
    return <div>{data?.error || "Error!"}</div>;
  }

  if ("name" in data) {
    return <div>Uppercased: {data.name}</div>;
  }
}
```

---

That’s all for the Remix intro. As you can see, the framework has rather little
footprint and is very easy to use. The only thing I am worried about is the fact
that it will soon be merged with (or rather, absorbed by) React Router. Creators
promise easy migration, but as someone who lived through React Router migrations
before, I will stack on ani-stress balls a week before I sit to it.

Join me next week, where I’ll show you my Remix template with Atomic Design and
feature-based structure.
