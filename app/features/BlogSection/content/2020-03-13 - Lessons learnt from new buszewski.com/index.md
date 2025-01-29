---
slug: 2020-03-13-lessons-learnt-from-new-buszewski.com
title: Lessons learnt from new buszewski.com
summary: It is so overengineered.
pubdate: 2020-03-13
featuredImage: header.jpg
tags: react, typescript, frontend
---

I’ve been building my new portfolio for four years, with different designs and
technology stacks. And I’ve learnt quite a few things from it.

For starters, I’ll say that this iteration stands on Gatsby (so, React) and
Styled Components, written in TypeScript. Data is sourced from local files in
Markdown.

Before I’ll tell you, what did I learn, I will tell you, why did I choose to do
things this way.

I’ve been fan of **React** for quite some time. More than four years, in current
front-end world this seems like forever. I’ve started experimenting in 2015,
using in 2016 and this is my go-to framework for UI ever since.

**Gatsby** was a natural choice for a React fan, so I didn’t even spent much
time on alternatives. Perhaps I should. But since it had all that I like,
including GraphQL and Markdown sourcing almost out of the box, I was bought.

**Styled Components**. The standard for styling next-gen web app, isn’t it? All
the CSS-in-JS glory, ease of props handling, editor support. Everything is here.

And **TypeScript**. Actual standard for any serious JavaScript development, plus
it really saved my ass more than couple of times in the past. It was a
no-brainer.

So, why am I not fully satisfied?

Because it’s overengineered. Holy fuck, **it is so overengineered**, I am angry
at myself for doing such a rookie mistake.

Let’s start from the beginning. I wanted to build views from components, so
naturally, I’ve created a design system (with atomic design methodology) in
Storybook.

Now, Storybook is really a great tool. And using it does help to have isolated
components. But it also requires writing stories for every piece of code. Let’s
take a look at a very simple `blockquote` element.

> For reminder, it looks like this

First, code:

```tsx
/**
 * @author tomek
 * @since 2020-02-26 10:27:24
 */

import * as React from "react";
import styled, { StyledComponentBase } from "styled-components";
import { theme } from "@ui";
import { ColorContext } from "@ui/Atoms/Section/Section";
import { Paragraph } from "@ui/Atoms";

type BlockquoteType = string &
  StyledComponentBase<"blockquote", any, {}, never>;

const Blockquote: BlockquoteType = styled.blockquote`
  opacity: 0.65;
  margin-bottom: 3rem;
  margin-left: 1rem;
  padding: 0 1rem;
  border-left: 1rem solid ${() =>
      `var(--section-${React.useContext(ColorContext)}-highlight)`};

  & > ${Paragraph}:first-of-type {
    font-size: 2rem;
  }

  ${theme.breakpoints.desktop} {
    grid-column-start: 3;
    grid-column-end: 7;
    margin-left: 1.5rem;
  }
`;

export { Blockquote };
```

And story:

```tsx
import * as React from "react";

import { text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import { Blockquote } from "./";

storiesOf("Atoms/Blockquote", module).add("Normal", () => (
  <Blockquote>{text("Example text", "Hello")}</Blockquote>
));
```

While I know, this is super short, please note that this is basically **styling
an element** in React and Styled Components way. Everything is a component,
right? Looks kinda tedious, doing this for, like, ten elements? Or more? Yeah,
it is tedious and in a long way, boring.

Don’t get me wrong, while building a big, really big application, like we did in
4Finance or Batmaid, this totally makes sense. But here? It’s way overblown.
Unfortunately, it came to me a bit too late, so there was no point of going
back.

Next thing that really slowed me down was, in fact, TypeScript. Why? Because
everything has to be typed.

For those who are familiar with GraphQL, the problem may be well known. If you
want to use queries as data source, you have to write the entire interface for
it. It may look like this:

```tsx
export interface IBlogEntry {
  title: string;
  pubdate: string;
  slugPubdate: string;
  summary: string;
  slug: string;
  featuredImage: null | any;
  photo?: null | any;
}

export interface IBlogNode {
  entry: {
    id: string;
    entry: IBlogEntry;
    fields: {
      slug: string;
    };
  };
}
```

As you can see, I’ve succumbed and used `any`. It wasn’t like this from the
beginning, I actually had it typed, but as I changed the goddamn `featuredImage`
query, I had to keep track in the interface. And it was so fucking tiresome, one
evening I decided to just `any` it and be done.

Again, having typed such things is great. When you use it more than once. Here,
it was just more work that wasn’t beneficial at all. Perhaps there is a magical
tool that creates interfaces from GraphQL schema (if you know it, tell me,
**please**). But for now, it’ll be like that, until I’ll have the time and
willpower to change it. (So, like, never).

Last, but not least, is Gatsby. I know you can clone a starter and roll with it
within seconds. Yes, but as I like to have control over what I do, I prefer to
actually build the stack. So, `gatsby new spastic` (yes, I named it after a
[Squarepusher song][1]) and then, well, plugins. I want TypeScript – plugin. I
want Styled Components – plugin. I want PrismJS – plugin. I need to catch inner
links – plugin. Google fonts – plugin. There is plugin for everything. Why this
is bad? Because sometimes it would be easier just to do it manually. But, given
how fragile can Gatsby be, it’s safer to stick to community-developed addons.
Especially, when there is tempering with Webpack involved.

There is one extra thing that I’ve decided not to do at the beginning. Tests.
Yes, the guy that talks about testing, coverage and TDD all the time didn’t do
tests. Why? It is very simple – there is nothing to test, really. There is no
logic in here, apart from a couple of `if` statements. Only actual tests that
could be used here are E2E or visual regressions, but, again, given the size of
this project, I chose to discard them.

—

Given all these, there was actually one thing that spawned the entire complain.
File sizes. I know that current front-end is resource-heavy. But, for crying out
loud, I’ve used only couple of additional plugins, namely Styled Components and
React Markdown. And it’s goddamn gigantic. In total, it pulls over 350 KB of
just JavaScript.

—

So, all that being said, what this actually fun? Yes, yes it was. After I
configured everything, set up Storybook alongside TypeScript and Gatsby, added a
plugin to resolve paths and spent a lot of time on configuration, it was really
nice to work on this project.

**What I would do differently**? I would use a different framework for this,
maybe Jekyll or Hugo. I would refrain from using React and Styled Components in
favor of pure JavaScript (or VUE) with SCSS. Turning off the entire JS doesn’t
really trip the page of anything. Header doesn’t hide, and links not SPA-like,
without a nice animation. But apart from it? Works normally.

Perhaps, when I’ll be really bored, I will rewrite this using a simpler stack.

[1]: https://en.wikipedia.org/wiki/Go_Plastic
