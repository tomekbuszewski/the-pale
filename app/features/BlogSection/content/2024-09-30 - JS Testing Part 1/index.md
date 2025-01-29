---
slug: 2024-09-30-javascript-testing-crash-course-part-1
title: JavaScript Testing Crash Course – Part 1
summary:
  In today’s development, writing tests is a crucial skill. Let's see how we can
  start with testing JavaScript applications.
pubdate: 2024-09-30
tags: javascript, testing
youtube: https://youtu.be/_4CQEFd40fs
---

Last time when I spoke about testing, I went straight to the meat about TDD. Now
I want to take a step back and talk about basics, from the purpose of testing,
through setting up the environment, to writing basic tests, and, eventually in
the future, creating full suites.

This is aimed at people who want to learn how to test JavaScript applications,
or have some questions regarding the matter, or simply need a refresher.

In today’s development, writing tests is a crucial skill. But, before we dive
into “how”, let’s talk about the “why”.

## Why should I test my code?

When you create something, anything, like a calculator (foreshadowing), or a
TODO app, you need to see if it works. You can do it quickly by running it and
clicking around. But doing this every few seconds when you change something is
really tedious. And, once you’re done working on a single functionality, you’ll
move further, right? And how to make sure that what you’re doing won’t break
anything somewhere else?

You can manually test every change, but it’s boring, time- and energy-consuming.
You can, instead, write a test to check it for you.

Tests are usually divided into three groups:

- **unit tests**: the smallest ones, easiest to write and run, these check _one
  functionality_ of a _single component_, for example “if a button is
  clickable”;
- **integration tests**: these are bigger, and they test how components
  _integrate with each other_, for example “if clicking this button triggers
  that change”;
- **end-to-end (e2e)**: these are the biggest and also the most time-consuming
  tests. They emulate user environment (such as browser) to manually go through
  your application.

There are tons of testing pyramids out there, but the gist is: first, the unit
tests, then the integration ones, then e2e. It goes from the cheapest to the
most expensive.

### Cheap, expensive? What does it mean?

We live (mostly) in capitalism. Everything’s bottom line has assigned a monetary
cost: your time, your computer’s power consumption, your remote environment
(like CI) working time.

We can say that the test is _cheap_, if writing and running it takes little
time. If it can be written in a few minutes and running it takes around 1
millisecond, it’s a cheap test. For example, this:

```ts
it("should add 2 and 2", () => {
  expect(sum(2, 2)).toBe(4);
});
```

It’s quick to write and quick to run.

Of course a lot of this relies on the code we are testing. If our `sum` function
has to perform an API call and run some LLM to get you your `4`, it won’t be
that cheap. But, if it would require that much, **it wouldn’t be a unit test**.

When tests require more work around it, like making sure that API calls are
reproduced and all the vendors are mocked (don’t worry about this for now), we
say that this test is _expensive_. It requires a lot of time to write and
prepare everything (data, environment, mocks) around it, and more than a few
milliseconds to run. Like this one:

```ts
it("should fetch the data", async () => {
  const { data } = await getArticles();
  expect(data).toMatchObject(mockData);
});
```

Notice the `mockData` variable. It’s something we need to prepare beforehand,
and to make our application think it’s the real deal. We would integrate more
than one thing into our tests, hence **making it an integration one**.

## How to prepare my project?

Theory out of the way, we can dive into practice. We won’t build a large
project, as I want this to be as easy to comprehend as possible. We will make a
simple “sum” function, so that, after submitting two numbers, will return their
sum. Nothing fancy.

Let’s start by initializing an empty project using Vite.

```bash
npm create vite@latest -- --template vanilla
```

Note that I am using the `vanilla` template, so it’s only JavaScript. Now, let’s
add Vitest:

```bash
npm i -D vitest;
```

And, that’s that. The initial setup is done.

## The anatomy of a test

I believe the best way to learn is by doing. So let’s try to write a function
that will add two numbers together. For example:

```js
// ./src/sum/sum.js

function sum(a, b) {
  return a + b;
}
```

This will take two numbers and sum them. Okay, so how can we test this? The best
tests reflects the _usage_, not the _implementation_. So we should just test if
it actually works! To write a test, create a new file in the same directory and
name it `[filename].test.js`. So, for our `sum.js` it will be `sum.test.js`.

Every test consists of three elements: preparation, execution and expectation:

- **preparation** is doing everything “around” the test, like importing,
  preparing data etc.;
- **execution** is what you run, so how you execute your code;
- **expectation** is what do you expect your code to do.

This can also be described as “given” – “when” – “then”.

> Given X function with Y parameters, when I execute is, then I should get Z.

All right, so let’s try to write one!

First, the preparation. Our `sum` function is not exposed anywhere, so it won’t
be available for our tests. We need to `export` it:

```js
// ./src/sum/sum.js

export function sum(a, b) {
  return a + b;
}
```

Now, we can import it in our test.

```js
// ./src/sum/sum.test.js

import { sum } from "./sum.js";
```

You might’ve heard about “describe” and “it” statements, and these are perfectly
valid, but for writing _suites_. For now, let’s just write a simple test.

How should we test this function? What do we execute and expect? Well, if my
math is correct, `2+2` should give `4`. So let’s try to write a test that will
_execute_ `2+2` and we will expect it to yield `4`.

```js
// ./src/sum/sum.test.js

import { sum } from "./sum.js";

test("add 2 and 2", () => {
  // execution
  const result = sum(2, 2);

  // expectation
  expect(result).toEqual(4);
});
```

All right, so we have our test. Okay, so how do we run it? By calling `vitest`,
just like you would call `npm`.

```bash
~ vitest

 FAIL  src/sum/sum.test.js [ src/sum/sum.test.js ]
ReferenceError: test is not defined
 ❯ src/sum/sum.test.js:5:1
      3| import { sum } from "./sum.js";
      4|
      5| test("add 2 and 2", () => {
       | ^
      6|   // execution
      7|   const result = sum(2, 2);
```

Oh, great. Vitest isn’t currently configured to be in our global space, so we
need to import the missing files.

```js
// ./src/sum/sum.test.js

import { test, expect } from "vitest";
import { sum } from "./sum.js";

test("add 2 and 2", () => {
  // execution
  const result = sum(2, 2);

  // expectation
  expect(result).toEqual(4);
});
```

Let’s try again!

```bash
~ vitest

 RERUN  src/sum/sum.test.js x1

 ✓ src/sum/sum.test.js (1)
   ✓ add 2 and 2

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  09:51:36
   Duration  7ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

Works! You might’ve noticed that the command didn’t finish and is awaiting
something. `Waiting for file changes` means it’s running in _watch mode_, so
every change you’ll make will be automatically reflected. If we add another
test, adding 3 and 3:

```js
test("add 3 and 3", () => {
  // execution
  const result = sum(3, 3);

  // expectation
  expect(result).toEqual(6);
});
```

…it will re-run:

```bash
 ✓ src/sum/sum.test.js (2)
   ✓ add 2 and 2
   ✓ add 3 and 3
```

As you see, this wasn’t that hard! But you know what’s really cool?

## Refactoring the code without touching tests

There’s a rule for writing tests saying that they shouldn’t need maintenance.
This means, if you change your code, the test should still work. Let’s see if
our tests are rock-solid like this.

The way to do this, is to change the _body_ of our `sum` function without
changing its _signature_.

> Function signature is describing what function accepts and what does it
> return.

Our `sum` signature is `(number, number) => number`. This means, it accepts
**two parameters**, both **numbers**, and returns a **number**.

Okay. so let’s rewrite this. Since we have a full function (declared as
`function sum(a, b) { ... }`) rather than a lambda (which is declared as
`sum = (a, b) => a+b;`), we have the access to `arguments` variable. It is an
object that houses all the parameters we pass to our function. In our case, that
would be:

```
{
  "0": 2,
  "1": 2,
}
```

But this is an object, and we only need values from it. The easiest would be to
throw `Object.values(arguments)` and carry on. And how do we sum all that’s in
the array? With a loop. We can use `reduce` or `for` or whatever construct you
prefer. To make it simple and easy, I’ll just throw `for`:

```js
export function sum(a, b) {
  const args = Object.values(arguments);
  let sum = 0;

  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }

  return sum;
}
```

And what do you know, it works! The test runs just fine without any changes,
even though we’ve rewritten our function entirely. This is a good test: it
checks the functionality, but not the implementation.

—

I hope you found this helpful. This is just an introduction to our longer
testing course, and I will continue with testing more complex code, mocking API
responses and testing the entire app in the next parts!

Thanks for watching and happy testing!
