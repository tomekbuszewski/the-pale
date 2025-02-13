---
title: React Router 7 has Server Components?
short-title: React Router 7
slug: 2024-12-23-react-router-7-has-server-components
pubdate: 2024-12-23
tags: react, react-router, remix
summary:
  If you’ve been following the React world for a year or so, you might’ve heard
  about server components concept
youtube: https://youtu.be/xF6U1cFuwHM
---

A lot of things happened in the last days. React 19 was released, React Router 7
(which is Remix 3 as well) was released, _Soul Reaver Remaster_ got released. So
let’s talk about at least two of those things.

---

If you’ve been following the React world for a year or so, you might’ve heard
about server components concept. It’s a great concept, in which every React
component can be asynchronous _and_ rendered on the server. Right now, if you
want to have some async things, you have to rely on `Suspense` and some loading
states. Or do you?

> Thing I will be talking about here is very much an experiment and I don’t
> recommend using it on production!

## React Router 7 + React 19

Server Components is talked about mostly in the context of Next.js, which tries
to be on the bleeding edge and was implementing React 19 stuff way before it was
released and stable. But, as it turns out, there might be another option.

First, let’s install the newest React Router using pnpm:

```bash
~ pnpm create vite;
```

This will ask us a few things, obviously we select “React” and then “React
Router 7”. It’s installed as a framework by default, all we need to do is to
change `ssr` to `true` in `react-router.config`. And maybe add
`prerender: true`:

```ts
// ./react-router.config.ts
export default {
  prerender: true,
  ssr: true,
} satisfies Config;
```

> Prerendering is a technique known from static site generators like Gatsby and
> Astro. Instead of generating every response on the fly on the server, it
> creates a static file with all the markup and serves than.

Right, now we can run the development server and see how it goes:

```bash
~ pnpm run dev
```

Cool, everything works. As of now, React Router installs React 19 by default, so
we’re all set.

## Fetching the data in React Router 7

Normally, if you want to fetch some data (or execute any asynchronous code), you
should do this in `loader` or `action` function defined in the route, right?
Yes, right.

But what if we want to have components that will fetch the data themselves,
without the route giving them anything? Well, as it turns out, it’s quite
possible, albeit with a caveat.

To create a component that will work asynchronously, we must define it as
`async`:

```tsx
// ./app/todos/Todos.tsx

export default async function Todos() {
  return <div>No todos available.</div>;
}
```

And that’s a server component. If you place it on the page right now, it will
show. Let’s try:

```tsx
// ./app.routes/home.tsx

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Todos from "../todos/Todos";
import { Fragment } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Fragment>
      <Welcome />
      <Todos />
    </Fragment>
  );
}
```

All I did was to import `Todos` and placed it in the render. And we’re getting
“No todos available” on the screen. Let’s see if this text has been rendered on
the server. The easiest way is to check for page source.

```html
<div>No todos available.</div>
```

Yup, it’s certainly there.

Alright, but declaring an async component to render a static text is stupid,
even for late December.

So let’s add a function that will fetch some todos from JSONPlaceholder:

```tsx
// ./app/todos/Todos.tsx

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

async function getData(): Promise<Todo[]> {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  const result = await data.json();
  return result;
}
```

And let’s execute it:

```tsx
// ./app/todos/Todos.tsx

export default async function Todos() {
  const todos = await getData();

  if (todos && todos.length) {
    return (
      <ul className="max-w-[300px] w-full space-y-6 px-4 mx-auto">
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    );
  }

  return <div>No todos available.</div>;
}
```

Alright, save and let’s see what do we get. And it’s there! And it’s rendered on
the server:

```html
<ul class="max-w-[300px] w-full space-y-6 px-4 mx-auto">
  <li style="text-decoration:none">delectus aut autem</li>
</ul>
```

That’s quite cool, but also quite odd.

But, if we look into the network tab, there’s an infinite loop of fetching the
data.

Nah, it’s cool. Let’s move on.

Okay, in reality this is not cool. Not only we’re killing the API, but we’re
also making the client do these useless operations. This is one of the caveat
I’ve mentioned. Earlier we’ve used fetching in `useEffect` or had React Query or
whatever else, which controlled the data lifecycle. Now, there’s no such thing.

> I haven’t tried using this with any external library like mentioned React
> Query, perhaps it can solve this issue as well.

So, what we can do, is to create an in-memory cache to mitigate this problem.
Adding a simple empty array, filling it when we have the data and returning it
will do the trick:

```tsx
// ./app/todos/Todos.tsx

let cache: Todo[] = [];

async function getData(): Promise<Todo[]> {
  if (cache.length > 0) return cache;

  const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  const result = await data.json();
  cache = result;
  return result;
}
```

Now, if we go to the network tab, we’ll see that there’s only two or three
fetches. Still not perfect, as this code is executed on the client and the
`cache` variable is filled only after the data is fetched. But it’s also
something you’d often see on the client, so I don’t think this is _that much of
a deal_.

Alright, but there’s another caveat. If you go to the console, there’s actually
an error:

> async/await is not yet supported in Client Components, only Server Components.
> This error is often caused by accidentally adding `'use client'` to a module
> that was originally written for the server.

Kinda sucks to get it. React suggests using `"use server"` directive, which
should help, but unfortunately, it’s not working here. And I haven’t found a
solution to this yet.

But the good news is, this error does not halt the execution of JavaScript (you
can verify this by adding `onClick` to anything and simply clicking after the
error is shown). And it does not show on the production build.

Server components is an amazing concept. React Router officially does not
support it, but due to the fact that the layer between the framework and React
is so thin, there’s an option to put it in our project.

Do I recommend using it? Frankly, no. It generates an error and isn’t official,
so it might break, but it’s a great thing to know. I am more than certain this
will get standardized and patched into Router sooner than later.

This is the last entry I am doing this year. Starting Monday, I will go on
vacation to get some much needed rest. So, using this occasion, I wish you all
happy, lazy and lengthy Christmas and all that you want in the New Year.
