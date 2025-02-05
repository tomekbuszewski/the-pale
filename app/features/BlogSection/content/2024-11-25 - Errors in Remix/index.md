---
slug: 2024-11-25-handling-errors-in-remix
title: Handling errors in Remix
summary:
  It took some time for me to realize that an error is the same information as a
  success. Not what I expect or want, but a valid, fully-fledged information
  nonetheless.
pubdate: 2024-11-25
tags: remix, react, errors, best-practices
youtube: https://youtu.be/Uuw19eVquXk
---

Alright, we’re getting further and further into this Remix thing. Today we’re
looking at error handling. And let me just tell you right off the bat, Remix has
some great error handling! So if you’re interested, let’s dive in.

---

I will be using just the built-in stuff, so you can use my Slowcore Stack, but
you can also create an empty default Remix project, or use your own thing.

## A bit about errors

Before we jump into coding, I want to talk a bit about errors in general. They
are often treated as something bad and either masked with statements like
`try { ... } catch { return; }` or simply ignored. It took some time for me to
realize that an error is the same information as a success. Not what I expect or
want, but a valid, fully-fledged information nonetheless. That’s why it is so
important to both _throw good errors_ and _handle them properly_.

And that’s what we’re doing today!

## Starting with throwing errors

Right, so our project is running. Let’s create a new page, call it `hello.tsx`
and put there a bit of text. Nothing fancy, just

```tsx
// ./app/routes/hello.tsx

export default function Hello() {
  return <div>Hello there!</div>;
}
```

Now, let’s throw an error in there. Right in the component.

```tsx
throw new Error("Well crap");
```

And, as you can see, we’ve got a huge error stack. Going all the way from React
DOM to our file. And notice that we’re actually getting our line and file
properly marked. If you remember working with early versions of Webpack, you’ll
appreciate this. It could’ve been “Error in line 345”, when the file has five
lines.

So we have our stack, cool. But showing these details on production isn’t safe,
right? So let’s build and run the app.

On production it only shows that there was an error. That’s really great, one
security concern less to worry about. But what now? Can we take it further?

Well, yes and no. As always.

We need to start by exporting an additional component, called `ErrorBoundary`
right in our route:

```tsx
export function ErrorBoundary() {
  return <div className="bg-red-100 p-10 text-red-900">Error</div>;
}
```

The main problem is, if you’ll throw the error directly in the document, the
server will render properly (and will render the error), but the client will
omit the `head` section almost entirely and by this, you will not get any
styling. In exchange, you’ll get a hydration error, because the DOM tree will
differ.

Okay, so how we can circumvent this?

Most of the time you won’t really throw an error in your component. A function
will throw, an effect, a hook. But writing `throw new Error` in the body doesn’t
seem like the best idea anyway.

What you want here is to _avoid throwing errors that will be rendered on the
server_. It’s simply a poor practice to do this, because:

- this error might (and likely is) temporary;
- it leaves user without any possible action (apart from leaving your app);
- it might get indexed.

Instead, you want to render the error only for the client and, ideally, allow
the user to seemingly retry.

To throw in the client, simply do it someplace where server doesn’t have access
to. For example, in `useEffect`:

```tsx
export default function Hello() {
  useEffect(() => {
    throw new Error("asd");
  }, []);

  return <div>Hello World</div>;
}
```

Remix is smart enough to catch the error thrown in the effect, so you’re
completely fine.

Okay, but what if something inside the component will throw? Something that I
cannot control? There is a quick solution for that. Catch the error and update
your state!

```tsx
export default function Hello() {
  const [error, setError] = useState<Error | unknown>();

  useEffect(() => {
    try {
      if (Math.random() > 0.5) {
        throw new Error("Oh no! I've been thrown in an effect!");
      }
    } catch (e: unknown) {
      setError(e);
    }
  }, []);

  return <div>Hello World</div>;
}
```

Nothing happens when you enter the page, nothing is thrown. That’s because we
caught the error safely. So, what now? We need to add the handling of this
state:

```tsx
if (error instanceof Error) {
  throw error;
}

if (typeof error === "string") {
  throw new Error(error);
}
```

And that’s it! Now, if you refresh your page several times, you should randomly
see _fully styled_ error, or a proper “Hello World”.

## Getting error messages

Throwing and catching errors is cool, but the real gist is to know, what error
really occurred. Remix provides some tools to make it happen:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();
  let message = "We've encountered a problem, please try again. Sorry!";

  if (error instanceof Error) {
    message = error.message;
  }

  if (isRouteErrorResponse(error)) {
    message = error.data;
  }

  return <div className="bg-red-100 p-10 text-red-900">{message}</div>;
}
```

Cool, that takes care of the message. We can obviously change it, as errors tend
to contain rather technical details. But that’s up to you!

Right, but there are two types of errors there, right? How can I know which
one’s which? For us now, to learn how to handle this, let’s add some text help:

```tsx
if (error instanceof Error) {
  message = "Error: " + error.message;
}

if (isRouteErrorResponse(error)) {
  message = "Route error: " + error.data;
}
```

Right, but our error is of the first kind, `instanceof Error`. How to trigger
the second one?

JavaScript is a funny language. It allows us to throw anything, literally. So to
get an actual _route_ error, we must… throw a proper `Response` object in a
server function:

```tsx
export function loader() {
  throw new Response("I am thrown in the loader function", { status: 500 });
}
```

Unfortunately, this _will_ render on the server. So use this sparingly and only
as the last resort.

### Recovering from errors

If you go through Sentry or any other error monitoring software, you’ll notice
that most errors are rare and happens once. If your server has a hiccup, or if
there was a connection error. It’s rarely by an actual bug in the software and
more often than not, trying again solves the issue. So, let’s add a “retry”
button for our users. Hey, maybe it’ll help!

```tsx
return (
  <div className="bg-red-100 p-10 text-red-900">
    {message}
    <button
      onClick={() => window.location.reload(true)}
      className="p-1 bg-white"
    >
      Try again
    </button>
  </div>
);
```

This way, we’re allowing users to refresh the page. Just like pressing “Refresh”
in the browser, but instead of making user “press the power button”, we’re
handling it internally, making it seems like we know what we’re doing. UX, baby!

> I am joking there for a bit, but it’s true. Think of when you need to restart
> something manually, reach out to the button and press it. And then, think of
> when your system tells you “Oh no, I’ve crashed, click here to recover.” Feels
> nicer, doesn’t it?

If you know that your API or database tends to have “breaks", consider adding a
short timeout, just to let the good folks know that you’re rebooting the
“machine”:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();
  const [restarting, setRestarting] = useState(false);
  let message = "We've encountered a problem, please try again. Sorry!";

  if (error instanceof Error) {
    message = "Error: " + error.message;
  } else if (isRouteErrorResponse(error)) {
    message = "Route error: " + error.data;
  }

  function retry() {
    setRestarting(true);

    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }

  return (
    <div className="bg-red-100 p-10 text-red-900">
      {restarting ? "Restarting the app..." : message}
      <button
        onClick={retry}
        className="p-1 bg-white disabled:opacity-50"
        disabled={restarting}
      >
        Try again
      </button>
    </div>
  );
}
```

## Error nesting

One of the best things we can do while encountering errors is to handle it
gracefully, instead of killing the entire app. That’s why Remix allows us to
nest errors. So if our one subpage is broken, we can just render the error
there, instead of taking the entire screen.

Let’s add an `Outlet` to the `hello.tsx` route and create a subpage:

```tsx
// ./app/routes/hello.tsx

...

export default function Hello() {
  ...
  return (
    <div>
      Hello World
      <hr className="my-10" />
      <Outlet />
    </div>
  );
}
```

And the subpage:

```tsx
// ./app/routes/hello.$name.tsx

import { useParams } from "@remix-run/react";
import { useEffect } from "react";

export function ErrorBoundary() {
  return <div className="bg-yellow-100 text-yellow-900 p-5 rounded">Error</div>;
}

export default function Hello() {
  const { name } = useParams();

  return <div>Hello, {name}</div>;
}
```

If we enter `hello/anyname`, we’re getting a good render. But what if one
resource is broken? Literally, let’s call it broken:

```tsx
export default function Hello() {
  const { name } = useParams();

  useEffect(() => {
    if (name === "broken") {
      throw new Error();
    }
  }, [name]);

  return <div>Hello, {name}</div>;
}
```

That’s great. Error is handled properly just in the children, the main page is
intact and can still operate.

## Not found!

The oldest tr… I mean, error in the book. The “not found”, the 404, the holy
grail of error handling. If you’re handling this correctly, you’re three
quarters in.

By default, Remix renders simply a “404 Not Found” page with 404 status. It’s
adequate, but we can jazz it up.

“I’ll just pop a `404.tsx` and be done”, you think to yourself. Nah, nothing
like that. This thing isn’t as simple in Remix, as you need to export an
`ErrorBoundary` from the `root.tsx` file:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();
  let message = "";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        message = "Page not found";
        break;

      case 500:
        message = "Server error";
        break;

      default:
        message = "We've encountered a problem, please try again. Sorry!";
        break;
    }
  }

  return (
    <div className="h-dvh flex items-center justify-center">{message}</div>
  );
}
```

This is a catch-all for all errors unhanded lower in hierarchy. So for example,
if one of our pages don’t have an error boundary defined, it will go up to its
parent, and so on. And if no page has the boundary, it’ll eventually end up in
`root.tsx`. To test this, create any route and throw there. For example:

```tsx
// ./routes/bam.tsx

export function loader() {
  throw new Response("Not found", { status: 404 });
}

export default function NotFound() {
  return <div className="text-center p-10">Bam</div>;
}
```

And that’s that.

—

Error handling is a crucial functionality in any production-grade application.
With Remix’s error catching mechanisms and flexible nesting, you can make sure
that users are getting the proper experience and can retry, rather than just
quit you app altogether.
