---
slug: 2019-02-26-module-pattern-in-javascript
pubdate: 2019-02-26
title: Module pattern in JavaScript
published: true
summary:
  A module is a construct somewhat similar to a singleton class. It has only one
  instance and exposes its members, but it doesn’t have any kind of internal
  state.
tags: javascript, design-patterns
---

A module is a construct somewhat similar to a singleton class. It has only one
instance and exposes its members, but it doesn’t have any kind of internal
state.

## Defining a module

Module is created as an IIFE (immediately invoked function expression) with a
function inside:

```js
const SomeModule = (function () {})();
```

Everything within the body of said function is bound to that module and can be
seen by each other. Modules emulates „public” and „private” methods by creating
mentioned earlier scope and exposing only those things that are declared.

> Private methods or functions are members of given entity than can be seen only
> within said entity. Public ones can be accessed from the outside of given
> entity.

Let us try and create a module with a private function inside.

```js
const Formatter = (function () {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
})();
```

As you can see, there is a simple `log` function that will log received message.
How to execute it? `Formatter.log`?

```js
Formatter.log("Hello");
```

Can you guess what it produces?
`Uncaught TypeError: Cannot read property 'log' of undefined`. Why is that?
Because our module doesn’t return anything, so it is actually `undefined`, even
though the code inside will execute.

```js
const Formatter = (function () {
  console.log("Start");
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
})();
```

This will log `Start`, because this function has been fired, and as you know,
functions doesn’t have to always return something.

So, now we know that **accessing a module is actually accessing whatever it
returns**.

The `log` function can be treated as a private one. It can be accessed from
within the module and other functions inside can execute it. Let’s try!

```js
const Formatter = (function () {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };
})();
```

Hey, wait a minute, pal! That’s another function within the module that I can’t
access!

## Exposing a module

Yes, this is another function that isn’t accessible to us. But, knowing what
we’ve learned earlier about accessing the module, we can easily solve this! You
already know what to do? Exactly, return this function! But, do not return a
single function (although it is possible), return an object with it!

```js
const Formatter = (function () {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };

  return {
    makeUppercase,
  };
})();
```

Now, we can use the `makeUppercase` function as we normally would:

```js
console.log(Formatter.makeUppercase("tomek"));
```

What’s the result?

```
> Start
> [1551191285526] Logger: Making uppercase
> TOMEK
```

Modules can house not only functions, but arrays, objects and primitives as
well.

```js
const Formatter = (function () {
  let timesRun = 0;

  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  const setTimesRun = () => {
    log("Setting times run");
    ++timesRun;
  };

  const makeUppercase = (text) => {
    log("Making uppercase");
    setTimesRun();
    return text.toUpperCase();
  };

  return {
    makeUppercase,
    timesRun,
  };
})();
```

Let’s execute it:

```js
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.timesRun);
```

As expected, `0` is shown. But note that this can be overwritten from outside.

```js
Formatter.timesRun = 10;
console.log(Formatter.timesRun);
```

Now console logs `10`. This shows that everything publicly exposed can be
changed from the outside. This is one of the biggest module pattern drawbacks.

Reference types works differently. Here, you can define it and it will be
populated as you go.

```js
const Formatter = (function () {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  const timesRun = [];

  const makeUppercase = (text) => {
    log("Making uppercase");
    timesRun.push(null);
    return text.toUpperCase();
  };

  return {
    makeUppercase,
    timesRun,
  };
})();

console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.timesRun.length);
```

It will log `3`, after saying my name three times in uppercase.

## Declaring module dependencies

I like to treat modules as closed entities. Meaning, they reside within
themselves and nothing more is needed for them to exist. But sometimes you may
want to work with, for example, DOM or `window` global object.

To achieve that, module may have dependencies. Let’s try to write a function
that will write a message to our requested HTML element.

```js
const Formatter = (function () {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };

  const writeToDOM = (selector, message) => {
    document.querySelector(selector).innerHTML = message;
  };

  return {
    makeUppercase,
    writeToDOM,
  };
})();

Formatter.writeToDOM("#target", "Hi there");
```

It works out of the box (assuming that we have an element with id `target` in
our DOM). Sounds great, but `document` is available only when the DOM is
accessible. Running the code on a server would produce an error. So, how to make
sure that we’re good to go?

One of the options is to check whether `document` exists.

```js
const writeToDOM = (selector, message) => {
  if (!!document && "querySelector" in document) {
    document.querySelector(selector).innerHTML = message;
  }
};
```

And this pretty much takes care of everything, but I don’t like it. Now the
module really depends on something from the outside. It’s „I will go only if my
friend will go too” scenario. It has to be like this?

No, of course not.

We can declare our module’s dependencies and inject them as we go.

```js
const Formatter = (function (doc) {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };

  const writeToDOM = (selector, message) => {
    if (!!doc && "querySelector" in doc) {
      doc.querySelector(selector).innerHTML = message;
    }
  };

  return {
    makeUppercase,
    writeToDOM,
  };
})(document);
```

Let’s follow it step by step. At the top, there is an argument to our function.
Then, it is used in `writeToDOM` method, instead our `document`. In the end,
right in the last line, we are adding `document`. Why? **Those are the arguments
our module will be invoked with**. Why I changed the argument name in the
module? I don’t like to shadow variables.

This is a great opportunity for testing, of course. Now, rather than relying on
whether our testing tools have DOM simulator or something similar, we can insert
a mock. But we need to insert it during our definition, not later. This is
fairly simple, you just need to write a mock and place is as a „spare”:

```js
const documentMock = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),
}))();

const Formatter = (function (doc) {
  const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  };

  const writeToDOM = (selector, message) => {
    doc.querySelector(selector).innerHTML = message;
  };

  return {
    makeUppercase,
    writeToDOM,
  };
})(document || documentMock);
```

I even removed the check inside `makeUppercase`, because it’s not needed
anymore.

—

Module pattern is a very common one, and – as you can see – very good at that. I
often try to write modules first, then – if needed – classes.
