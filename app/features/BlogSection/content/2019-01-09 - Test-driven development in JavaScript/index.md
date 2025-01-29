---
slug: 2019-01-09-test-driven-development-in-javascript
pubdate: 2019-01-09
title: Test-driven development in JavaScript
published: true
summary:
  Testing the code we are writing is crucial in the job. Even though there are
  teams that doesn't do tests at all, this is one of the most important parts of
  successful delivery.
tags: javascript, testing, tdd
---

Testing the code we are writing is crucial in the job. Even though there are
teams that doesn't do tests at all, this is one of the most important parts of
successful delivery.

There are many approaches to testing software. One of my favorite is TDD, short
for test-driven development. The reason it stands out is, it inverts the natural
(or so it seems) flow of writing first the logic and then the test. This
approach is, first the test, then the logic.

## Why TDD makes sense

At first, this may seem strange. Why test something that isn't working? Why
check the obvious? Think differently, think of setting requirements and
assumptions for your code. When you get a task, it compels you to break it in
the smallest pieces possible and write assumptions for it.

Take a Fibonacci sequence generator, for example. The goal is to create a
function that will accept one parameter and will return an array of numbers.
Pretty simple. What should we test?

- it should throw an error for parameter other than integer;
- it should return an array;
- it should throw an error when parameter is 0;
- it should return `[0]` when parameter is 1;
- it should return an array with integers in it;
- it should return `[0, 1, 1, 2]` with parameter being 4.

Take a look at that list. Six cases. Yes, six cases, not six lines of text.
These are easy transferrable to a test. Observe:

```js
it("should return an array", () => {
  expect(Array.isArray(fib(5))).toBeTruthy();
});
```

This notation is super simple and allows to plan in advance.

## The three cycles of test-driven development

One of the most important things in TDD is to create a cycle for yourself. It
consists of three stages – *red*, _green_ and _refactor_.

- the _red_ stage is writing the test and running it. It will fail and the IDE
  or any other runner will be red;
- the _green_ stage is writing the code for given test. It has to pass, but
  doesn't have to be well written;
- the _refactor_ stage is meant to get your code up to the standards;

By the end of the cycle your fraction of code should be tested and coded with
current (project) standards in mind. Keep in mind that those cycles should be
similar, if not the same, in length. Test-driven development works nice with the
[Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

How can this be presented? Let's try to write a case for returning an array.

First, we create a test (_red_):

```js
// index.test.js
const fib = require(".");

describe("fib tests", () => {
  it("should return an array", () => {
    expect(Array.isArray(fib(5))).toBeTruthy();
  });
});
```

Running it will fail, probably because we don't even have a `index.js` file, or
if we do – it doesn't have any content.

Let's start the _green_ phase.

```js
// index.js
const fib = (target) => {
  const collection = [];

  while (collection.length < target) {
    collection.push(null);
  }

  return collection;
};
```

This code works, running the test now will turn out fine, meaning it meets the
assumptions.

But, using `while` loop seems a little bit smelly. Perhaps we should use
functional paradigm and have a recursion! Let's _refactor_:

```js
const fib = (target, col = [0, 1]) => {
  if (col.length === target) {
    return col;
  }

  const newCollection = const newCollection = [...col, null];

  return fib(target, newCollection);
};
```

Result didn't change, but this code looks better. (I know I should make use of
TCO, but I didn't want to obscure the picture).

I won't write further tests here, you are free to do so by yourself. And you can
check your results or get a helping hand in my
[Codesandbox](https://codesandbox.io/s/llml7197yq).

## Conclusion

I have shown here the basic usage of test-driven development. It does give you
the glimpse of how this technique works and what benefits it brings. But to
really appreciate it, you should work with it for some time. And I strongly
encourage you to do so!

—

[Entire code and tests on Codesandbox](https://codesandbox.io/s/llml7197yq)
