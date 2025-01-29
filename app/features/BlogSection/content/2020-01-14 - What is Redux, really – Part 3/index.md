---
slug: 2020-01-14-what-is-redux-really-part-3
title: What is Redux, really? – Part 3
pubdate: 2020-01-14
summary: Redux as the state manager in a React application
tags: javascript
---

Last time I've talked about Redux as a state manager. Now I want to talk about
Redux as the state manager in a React application.

## A need for state management in React applications

More often than not, [Redux is being coupled with React](asd), as it makes it
feel more like a working application rather than just a collection of linked
views. There is a trend of abstracting every possible action away from React's
own state to Redux's store. But this is rarely a good decision, as this data is
stored away and rarely accessed by more than one component.

Moving state up, making it accessible to more elements should be a decision made
on an actual need rather than anything else. For example, if your application
renders comments, what is the point in storing these anywhere else than in the
context of their parent post?

But, sooner or later, it all comes to a point where it actually makes sense to
abstract the state and make it global.

## Connecting Redux to React

Redux itself is framework-agnostic. It means that it can be used with whatever
other tooling there is. In the last article, I made a vanilla JS Redux
implementation and it works just fine.

For React, there is a special binding called `react-redux` that provides useful
functions to wrap existing components with Redux.

What is important to note here, is that even though this is a specific binding
for a specific framework, implementation of Redux itself remains the same across
all platforms. For this examples, I am using the code I've created the last
time.

First thing is, to wrap the app with `Provider` component. It will make that all
of its children will be able to access the store. It is as simple as

```js
const App = () => (
  <Provider store={store}>
    <ProductList />
  </Provider>
);
```

Now every component that resides inside `ProductList` can subscribe itself to
Redux store.

## Connecting components

This is slightly more complex, as Redux leaves a lot of decisions up to the
developer.

Every component can do two things – read state and dispatch actions. Not
everyone has to do both, though.

Passing data from Redux to the React components is done by a higher-order
component called `connect`. It decorates our instance with what we need.

> Higher-order components (or HOCs) are functions that return a new component
> enhanced with some logic or data.

Let's assume that we need to pass the state of one of reducer – `orders`. To do
this, we'll use a mapper function. It will accept an argument – our store – and
return **an object** consisting of what we want.

A state mapper function – commonly known as `mapStateToProps` or simply
`mapState` – is the first parameter of `connect`. It accepts two parameters,
with mandatory `state` and optional `ownProps`. I will omit the latter for
brevity. Please note that those parameters will be injected automatically, there
is no need to do this manually:

```javascript
const mapState = (state) => ({
  items: getOrders(store),
});
```

### Selectors

You can see here the `getOrders` function. This is a **selector**. It is
creating a facade to access the store without forcing the developers to know the
details of implementation. This way, you can change the store and only replace
the business logic without affecting the usage in components.

A simple selector can look like this:

```javascript
export const getOrders = (store) => store.orders;
```

All it does is simply exposing (parts of) our state to the consumer. It can have
more logic, filter or sort things. For example, we could have a selector called
`getShippedOrders` which would look like this:

```javascript
export const getShippedOrders = (store) =>
  store.orders.filter((order) => order.status === "SHIPPED");
```

### Accessing passed properties

As I've said before, `connect` is a higher-order component. Which means, it has
to accept our base component and then enhance it. To do it, we simply create a
new variable:

```javascript
const ProductListComponent = () => <div>Hello</div>;
const ProductList = connect(mapState)(ProductListComponent);
```

Now, we can use it in a regular view, just like a normal component.

But, how to access these new properties that we've injected? Well, those are
exposed as props! All we have to do is:

```javascript
const ProductListComponent = (props) => {
  console.log(props); // items: [{...}, {...}]
  return <div>Hello</div>;
};
const ProductList = connect(mapState)(ProductListComponent);
```

This data can be used within our view or passed down. A simple view utilizing
this can look like this:

```javascript
const ProductListContainer = (props) => (
  <List>
    {props.items.map((item) => {
      return <ListItem key={item.id}>Order #{item.id}</ListItem>;
    })}
  </List>
);
```

### Dispatching actions

Great, so now we have some data retrieved from the Redux store. But, as I said
previously, state management is not only reading, but also writing. In order to
write to state, an action has to be dispatched.

Dispatching is handled in a similar fashion to reading. `connect` accepts second
parameter – an object commonly known as `mapDispatchToProps` or `mapDispatch`.
It looks like this:

```javascript
const mapDispatch = {
  ship: setShipped,
};
```

This is the simplest example, simply assigning a function to a key in object.
Now our connected component, `ProductList`, looks like this:

```javascript
const ProductList = connect(mapState, mapDispatch)(ProductListComponent);
```

Now function `ship` is passed as a prop and can be executed:

```javascript
const ProductListContainer = (props) => (
  <List>
    {props.items.map((item) => {
      return (
        <ListItem key={item.id}>
          Order #{item.id}
          <Button onClick={() => props.ship(item.id)}>Ship it!</Button>
        </ListItem>
      );
    })}
  </List>
);
```

## Conclusion

As you can see, Redux blends very good in a React application, as it strongly
leverages composition.

- [Code sample on CodeSandbox](https://codesandbox.io/s/redux-pt3-9jiuf)
