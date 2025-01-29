---
slug: 2019-02-17-high-level-view-and-logic-separation-in-react
pubdate: 2019-02-17
title: High level view and logic separation in React
published: true
summary:
  One of React’s greatest strengths is the ability to separate the view from the
  logic. I like to take it a step further and create two separated _components_,
  one harboring view, and one – logic.
tags: javascript, react
---

One of React’s greatest strengths is the ability to separate the view from the
logic. I like to take it a step further and create two separated _components_,
one harboring view, and one – logic.

On the first sight, this might sound like an overhead. _Why should I create two
files, when I can just utilize `render` method._ While true, this approach has
many benefits. For starters, it allows two people to work on one thing
simultaneously. One, a junior, can write styles and JSX markup, while a more
experienced developer can write its logic handling. Another valid point is a
separation of concerns – an entire view can be replaced without even touching
the files with logic inside, as long as they use the same props.

So, how do I approach such thing? Simple, really.

First thing is, I define the state. _The component should_ things, like
– respond to mouse hover, distinguish its state between active and dormant and
display text passed to it. Next, I write the logic. Most often this is a class
with some internal methods:

```jsx
// containers/Thing/index.js

import View from "@src/ui/Thing";

class Thing extends React.Component {
  state = {
    active: false,
    hovered: false,
  };

  setActiveState = () => this.setState({ active: !this.state.active });

  setHoveredState = () => this.setState({ hovered: !this.state.hovered });

  render() {
    return (
      <View
        active={this.state.active}
        hovered={this.state.hovered}
        onClick={this.setActiveState}
        onMouseEnter={this.setHoveredState}
        onMouseLeave={this.setHoveredState}
        text={this.props.text}
      />
    );
  }
}
```

So much for logic. There can be a lot more, of course, but for the sake of
illustration, it will suffice.

Next, the view.

```jsx
// ui/Thing/index.js

const Thing = (props) => {
  const { active, hovered, onClick, onMouseEnter, onMouseLeave, text } = props;

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: active ? "tomato" : "transparent",
        color: hovered ? "yellow" : "black",
      }}
    >
      {text}
    </div>
  );
};
```

Again, this is it. Very simple and concise.

This pattern works great in teams with junior and middle developers, as they can
work on the target goal while not staying behind due to either lack of knowledge
in more complex logic matters, or to lack of interest in writing views.

—

- A minimal example can be seen on
  [CodeSandbox](https://codesandbox.io/s/3y7nl6z7mm);
- Full example of this architecture can be found in
  [my project](https://github.com/tomekbuszewski/Videoplayer).
