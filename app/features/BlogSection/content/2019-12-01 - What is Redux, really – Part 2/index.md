---
slug: 2019-12-01-what-is-redux-really-part-2
title: What is Redux, really? – Part 2
pubdate: 2019-12-01
summary: Let's see what Redux – the state manager for React – is all about.
tags: javascript
---

[Last time](/writings/2019-11-18-what-is-redux-really-part-1) I talked about
state management in general. Now let's see what Redux – the state manager for
React – is all about.

## Recap

To take full advantage of this article, it's important to remember what is a
state manager. **It's a tool that allows to both read and write information
about the application**. You can use it to inform one module about changes in
the other one without making too much fuss.

## Two fundaments of Redux – Actions and Reducers

Redux operates with many terms, such as store, state, dispatchers, selectors
etc. But the most important are actions and reducers.

### Action – request the change

Actions are the building blocks of an interactive state. **They are responsible
for "telling" the state how to change**.

Here's an exemplary action that will change an order state from "awaiting" to
"shipped":

```javascript
const SET_ORDER_SHIPPED = "SET_ORDER_SHIPPED";
{ type: SET_ORDER_SHIPPED, payload: 123 }
```

Now let's explain what is happening here. `type` is the name of action that is
being executed, and `payload` is the required information. Here, our `type` is
`SET_ORDER_SHIPPED` and `payload` is `123` – our product's ID. In human terms,
it would sound like "Change order 123 status to Shipped".

> **Why defining types as variables rather than strings?**\
> It's tempting to create action types as text, but this can generate problems
> in reducers. You have to be sure that there's no typos anywhere. Defining a
> constant name once and then using it in both action and reducer prevents such
> problems.

#### Dynamic actions – or, created actions

It's very easy to dispatch an action that has all the fields defined. But it's
very cumbersome to create an action for every item, for example:

```javascript
const SET_ORDER_1_SHIPPED = { type: "SET_ORDER_SHIPPED", payload: 1 };

const SET_ORDER_2_SHIPPED = { type: "SET_ORDER_SHIPPED", payload: 2 };
```

What we need here is an **action creator**. Something that will generate the
action basing on some terms.

What is important about action creators is that they need to be pure functions.
Meaning, every time an action is created, the result (and the reducer result)
has to be exactly the same. They cannot interfere with anything from the
outside.

So, let's create an action creator for our shipping:

```javascript
const setShipped = (id) => {
  return {
    type: SET_ORDER_SHIPPED,
    payload: id,
  };
};
```

Now, running `setShipped(123)` will create an action that we want:

```javascript
{ type: SET_ORDER_SHIPPED, payload: 123 }
```

#### What happens after an action is fired?

In Redux, actions aren't really "fired". They are being _dispatched_. Actually,
you have to dispatch them. Basically, it looks like this: you click a button
`Mark the order as Shipped`. Action `SET_ORDER_SHIPPED` is being **dispatched**
and reducer receives it. After processing, the change is reflected in the store.

### Reducer – make the change

Action alone is nothing. Who knows what `SET_ORDER_SHIPPED` means? Well, we
should know. And our reducer should as well.

**Reducer is responsible for receiving that action call and applying the
change**. Most of the time, it's in a form of `switch` statement:

```javascript
switch(action.type) {
  case SET_ORDER_SHIPPED:
    return state.map(order => {
      if (order.id === action.payload) {
        return { ...order, status: "SHIPPED" }
      } else {
        return order;
      }
    });
  }

  default: {
    return state;
  }
}
```

What's important for reducers it that they always have to return the state. The
whole application relies on it, and if something goes wrong, it will crash.

## States and store – what's the difference?

Redux operates on two very important concepts – states and store. **They are
not, by any means, interchangeable**.

**There are multiple states**. Every module can have its own state. They are
responsible for housing all the information and make it available to the app.
Example of states:

```javascript
const orders = [
  { id: 1, items: [9, 8, 7], client: 234, status: "SHIPPED" },
  { id: 12, items: [8, 7, 6], client: 214, status: "AWAITING_PAYMENT" },
  { id: 123, items: [1], client: 345, status: "AWAITING_PAYMENT" },
];

const clients = [
  { id: 1, firstName: "Frank", lastName: "Ocean", addresses: [1] },
  { id: 12, firstName: "Marky", lastName: "Mark", addresses: [9, 8] },
  { id: 234, firstName: "John", lastName: "Smith", addresses: [2, 3, 5] },
];

const items = [
  { id: 1, name: "Lamp", description: "..." },
  { id: 2, name: "Desk", description: "..." },
  { id: 3, name: "Bulb", description: "..." },
];
```

States can be very good information storages. If you need to display items in
various places in your store, a single source of data is a good idea.

**There is always a single store**. It's built with states, with every state
being a separate entity. Example of store:

```javascript
const store = {
  orders,
  items,
  clients,
};
```

Since there is only one store, it houses all the states and has an API that
allows the app to interact with them.

**You never modify the state directly**. It always has to done via the store.

### Single-state store

There is an option to have only one state, for example, housing only `orders`.
While perfectly fine, it will probably result in two things – either growing to
the point where it will be very hard to maintain, or being a very small
collection of information that would work stored someplace else.

In my opinion, creating a single-state store is pointless. If you need to store
very little information, keep it someplace else. If you don't know, how much
data you'll store, create a multi-state store. It will scale much better, and
refactoring single-state to multi-state can be tedious.

## Conclusion

I hope this clears out Redux in general a bit. I know this is a lot of
information, so I've prepared a code sample for this part. In there you'll find
a working examples of an action, a reducer, state and store.

- [Code sample on CodeSandBox](https://codesandbox.io/s/redux-pt2-dotee).

In the next part I'll explain how this all blends in React ecosystem.
