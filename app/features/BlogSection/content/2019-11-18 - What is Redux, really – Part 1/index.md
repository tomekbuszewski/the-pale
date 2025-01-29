---
slug: 2019-11-18-what-is-redux-really-part-1
title: What is Redux, really? – Part 1
pubdate: 2019-11-18
summary:
  Redux came to be a go-to solution for state management in React apps. It's
  also one of the most incomprehensible tools in the shed.
tags: javascript
---

Redux came to be a go-to solution for state management in React apps. It's also
one of the most incomprehensible tools in the shed.

## What is an application state?

To understand, how Redux works, first, we need to understand, what is an
application state.

In the smallest scale, application state can be a simple flag:

```javascript
const STATE = { API: "OK" };
```

This is a simple information that our API is available. Of course, this is very
exaggerated example, and most of the time, states are far more complex. But in
general, **state is a collection of (internal) information available to the
application**.

Knowing this, we can move along, to the state manager.

## What is a state manager?

State is nothing, if it is hardcoded. If you will simply define a flag with
`true`, and never change it, **it will be useless, because it won't reflect the
actual situation**. If our API will crash, we should be able to update the state
with the fact.

In the simplest terms, it would look like this:

```javascript
const STATE = { API: true };

const setApiState = (flag) => {
  STATE.API = flag;
};
```

This is, again, very simple example that you wouldn't find live (probably). But
it illustrate the point – state needs to be managed. We need to be able to
update it to reflect the current situation.

But writing is only a half of it. The second one is reading.

**The whole point of having a state is to inform our entire application of it**.
So, if one of our services detects that API is down, it fires the
`setApiState(false)` function, that we've declared before. And now, every other
part of the app should be able to read it:

```javascript
import { API } from "./state";

if (API) {
  fetch("...");
} else {
  alert("API is down");
}
```

This is a super simple of how the state can be used in both ways – writing and
reading.

## (Why) do I need this?

This is a question a few people ask. "Do I need a state manager?". **Quite often
you don't**. Having your state managed is like having an internal mail
department in your company. It's cool to have one, but is your
five-guys-in-a-room startup really needs it?

Picture this situation: you want to know how is your legal department works. In
scenario A, you have a mail department, in scenario B – you don't.

**Scenario A**: You write a letter, pass it to a mail department worker and
await reply. Someone from the legal writes an answer, dispatches it the same
route. You get the information. It says "It's okay".

**Scenario B**: You ask the legal guy, "hey, how's it going". He replies "It's
okay".

Image this happens in two companies – small startup based in a single room and
in a corporation with hundreds of employees around the globe. Which scenario
fits which company?

**Managing state is all about scale**.

If your application has a lot of modules which "speak" with each other, you need
a state manager. If you run a simple web page, you probably don't.

## Conclusion

I hope I've shed some light on what Redux is and at least made you ask yourself
"do I need it?". In the next part, I'll explain more in-depth how it works and
why it adopted so well into the React ecosystem.
