---
slug: 2020-02-10-don't-forget-to-forget-your-code
title: Don’t forget to forget your code
pubdate: 2020-02-10
summary:
  How often do you find yourself coming back to the code you’ve written a few
  months ago?
tags: programming, work-culture
---

How often do you find yourself coming back to the code you’ve written a few
months ago?

I am a very forgetful person. I remember the basics, like David Bowie’s
discography, _At Seventeen_ lyrics and my wife’s phone number…-ish. But apart
from that – nothing. Forgetfulness is my second nature and, even though I
struggled at first, I have accepted and embraced it.

Forgetting to buy flour is one thing. Forgetting why did I write this particular
code is something completely different. And while groceries have lists, I
couldn’t find anything similar for my work. Until I had an epiphany.

Back at 2016, I was working on [parkiet.com](https://parkiet.com). As a senior
developer, I have written hundreds of lines of code for the project. Some more
important than others, but all required for _something_. And that _something_
had escaped me more than I’d like to remember (which I don’t, duh).

I knew that something has to be done. But what?

## Write documentation?

Great idea. And I wrote long paragraphs of JSDoc, quite often longer that it
required. But problem with this was very evident – I really had to write
additional lines, which were a) expensive, and b) boring. Plus, if I didn’t do
this right after (or even before) writing the actual body of function, I might
have had a problem of recollecting all the caveats such code had.

After couple of tried, I’ve decided to strip the docs from all the descriptions
that were either vague or simply unnecessary. Basically, only type notes left.

## Write thoughtful documentation!

I never like the expression „my code is my documentation”. No, your code is
_your code_, your documentation is _your documentation_. With languages that
lacks real types (in that example, JavaScript), thinking that something that:

```js
function counter(acp, r) {
  if (acp.size) {
    return r + acp.size;
  }

  return r + 1;
}
```

will document itself is just reckless. So, how to turn this code into something
more decent? A simple JSDoc would help:

```js
/**
 * Function that sums current entities or increases the counter by 1;
 *
 * @param {Object} acp - object holding incoming value data;
 * @param {number} [acp.size] - value of current entity;
 * @param {r} r - current value
 * @returns {number}
 */
function counter(acp, r) {
  if (acp.size) {
    return r + acp.size;
  }

  return r + 1;
}
```

Adding these comments is making this code looks cleaner – even though I didn’t
change a single line!

What’s also cool, JSDoc can be then extracted into a static documentation! And
may look, for example,
[like this](https://softwarebrothers.github.io/admin-bro-dev/Column.html).

## Write tests

Importance of writing tests is something I can’t stress enough. But, apart from
the evident gain, it also helps to understand the code we are writing.

Let me take that simple function I have written before (`counter`) and test it!

```js
describe("Counter tests", () => {
  it("should sum the values from entites with current one", () => {
    expect(counter({ size: 1 }, 0)).toBe(1);
    expect(counter({ size: 1 }, 1)).toBe(2);
  });

  it("should increase the current value by 1 if no apc is given", () => {
    expect(counter({}, 0).toBe(1);
    expect(counter({}, 1).toBe(2);
  });
});
```

These two simple tests are basically giving all the functionality away. And it’s
super-simple to understand, thanks to great syntax provided by Jest (and by a
lot of other test tools). In general, testing frameworks aim to make writing
tests easy (that’s why they stay on the market) and tests themselves readable. A
good test will always be easy to read.

## Use typed language

I remember being very anti TypeScript or Flow. I thought that they only make me
write more code to have the same result. And this actually is true – these
„types” are being removed upon transpilation, so they do not pose any additional
value to the client.

But! They pose a huge addition to the developers! While properly used JSDoc can
solve a lot of problems, TypeScript and Flow have the advantage of editors
support. Let me write `counter` function in TypeScript, really quick:

```ts
interface IEntityConfig {
  size?: number;
}

function counter(acp: IEntityConfig, r: number): number {
  if (acp.size) {
    return r + acp.size;
  }

  return r + 1;
}
```

Not much have changed, but it seems clearer. Now I know, what may come inside
`acp`, what `r` is and what the function will return. Of course, this simple
example doesn’t show a lot, but it is still illustrational.

## Name your code properly

I’ve wanted to make this the last point. Because this is the most important
thing. Naming functions and variables is hard, but it pays. Watch me change that
crappy `counter` into a proper piece of code:

```js
function increaseEntitiesCount(entity, currentState) {
  if (entity.size) {
    return currentState + entity.size;
  }

  return currentSize + 1;
}
```

See? No TypeScript, no JSDoc, no tests even. And yet, this is readable and
clear.

## Conclusion

Remembering is hard. That’s why I prefer to make things so obvious, I don’t have
to _remember_ what they do or what they even are. I will know this, when I read
what I’ve written.
