---
slug: 2018-12-31-default-styles-in-storybook-with-styled-components
pubdate: 2018-12-31
title: Default styles in Storybook with Styled Components
published: true
summary:
  Recently I was building a Storybook for my new project. While I enjoy the
  encapsulation it provides, global styles such as resets are still a common
  thing. Even though it doesn't change much, I still wanted to have them in my
  every Story.
tags: styled-components, react, javascript, storybook
---

Recently I was building a Storybook for my new project. While I enjoy the
encapsulation it provides, global styles such as resets are still a common
thing. Even though it doesn't change much, I still wanted to have them in my
every Story.

## Global reset

My global styles are created using
[styled-reboot](https://github.com/alexruzzarin/styled-reboot), an addition to
[Styled Components](https://www.styled-components.com/). It's a configurable
Bootstrap reset – something I was looking for a quite some time.

The code itself looks pretty simple:

```js
import { createGlobalStyle } from "styled-components";
import reboot from "styled-reboot";

import design from "./";

const options = {
  bodyColor: design.brand("violet"),
  bodyBg: design.brand("white"),
  fontSizeBase: "8px",
  linkColor: design.brand("base"),
  linkHoverColor: design.brand("base"),
};

const GlobalStyle = createGlobalStyle`
  ${reboot(options)}
`;

export default GlobalStyle;
```

This gives us a component that we can place similar to every other. For example,
like this:

```jsx
import GlobalStyle from "../globalStyle";

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <div>Hello</div>
  </React.Fragment>
);
```

Great stuff, but how can I use it within my Stories?

## Storybook

I use Storybook as my prime environment for developing UI. So it's obvious I
want it to reflect the actual outcome as much as possible. Incorporation of
global reset is a must here.

My first approach was to simply add `<GlobalStyle />` component to each story,
like this:

```jsx
storiesOf("UI", module).add("Button", () => (
  <React.Fragment>
    <GlobalStyle />
    <Button type="button">Hello</Button>
  </React.Fragment>
));
```

While this certainly works, it gives me an additional overhead. I have to
remember to include the reset, import it every time etc.

I am too lazy for this. I had to figure out something better.

Then I remembered the
[Decorators](https://storybook.js.org/addons/introduction/) option Storybook
provides!

> Decorators are wrapper components or Storybook decorators that wrap a story.
>
> —
> <cite>[Intro to Addons](https://storybook.js.org/addons/introduction/)</cite>

So, writing such decorator is the only thing left.

## Writing the decorator

All of the additional code for Storybook lies within `config.js` file, mostly in
`.storybook` directory (if not stated otherwise). Mine was looking like this:

```jsx
import { configure } from "@storybook/react";

const req = require.context("../../", true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
```

Simple scanning for stories. So, next thing is to add the decorator.

```jsx
import { addDecorator, configure } from "@storybook/react";

import * as React from "react";
import GlobalStyle from ".../ui/globalStyle";

const req = require.context("../../", true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

const withGlobal = (cb) => (
  <React.Fragment>
    <GlobalStyle />
    {cb()}
  </React.Fragment>
);

addDecorator(withGlobal);
configure(loadStories, module);
```

Let's talk it over.

First, we import `addDecorator` function, it will be responsible for applying
our add-on to the system.

Second, we import React, as we will create a little bit of JSX, and the style
created earlier.

Next step is creating the decorator itself. Simple function with one argument. I
wrapped it in [`React.Fragment`](https://reactjs.org/docs/fragments.html) which
allows for using multiple children without creating extra DOM elements. If
you're using React in version lower than 16, consider `div` as a neutral
wrapper.

The last step is to apply the decorator using `addDecorator`.

Simple as that. What is super important, is to declare the `configure` execution
as the last command.

Now, additional CSS code will be added to each of your Stories without any
further edits.
