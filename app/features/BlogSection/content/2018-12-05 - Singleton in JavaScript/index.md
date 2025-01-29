---
slug: 2018-12-05-singleton-in-javascript
pubdate: 2018-12-05
title: Singleton in JavaScript
published: true
summary: A quick look on singleton pattern and its implementation in JS
tags: javascript, design-patterns
---

Singleton is one of the better-known patters in programming. While, by some,
seen as an anti-pattern, it is worth knowing something about it.

Creating such class isn't really hard, but has some caveats. Firstly, its
constructor has to return the instance. Secondly, such class cannot be extended
nor modified by any ancestor. Generally speaking, extending will only link to
the initial instance.

So, how to write a singleton class? First, we start like normal:

```js
class SingletonClass {
  constructor() {}
}
```

This is a standard class notation in ES2015 format. Please note the name and
remember it. While creating anything, and especially a singleton class, **choose
the name wisely**. Now I know that naming things is hard, but here we will be
using the name rather that the `this`.

Second step is to define the instance key within the class. Please note that
this is static value, **it refers to the class, not to the instance of the
class**.

```js
class SingletonClass {
  constructor() {
    if (!!SingletonClass.instance) {
      return SingletonClass.instance;
    }

    SingletonClass.instance = this;

    return this;
  }
}
```

Let's do some explaining. The `constructor` starts with checking whether
`SingletonClass.instance` exists. Why not `this`? Like I said earlier, we refer
to the class. This is its static value, not related to an instance. If the
condition is met, it means that the class has been already created sometime ago
and **that old instance can be returned** instead creating new one.

Next we're assigning `SingletonClass.instance` to `this`, meaning, we are
binding current instance to the class, coupling it.

Lastly, we return `this`. This can be confusing, but look up. We've returned
`SingletonClass.instance` before. Without this `return`, it would also work, but
it's a good practice to keep consist return from a method.

Okay, this is all fine and well, but how can we prove that creating new
instances is not possible? Well, good question. Let's enhance our class with
something to do, for example, let it return the name we give it (yeah,
programming!).

```js
class SingletonClass {
  constructor(name = "") {
    if (!!SingletonClass.instance) {
      return SingletonClass.instance;
    }

    SingletonClass.instance = this;

    this.name = name;

    return this;
  }

  getName() {
    return this.name;
  }
}
```

Let's create some instances now:

```js
const instanceOne = new SingletonClass("One");
const instanceTwo = new SingletonClass("Two");
const instanceThree = new SingletonClass();
```

Okay, simple as that. So, now we can log it:

```js
console.log(`Name of instanceOne is "${instanceOne.getName()}"`);
console.log(`Name of instanceTwo is "${instanceTwo.getName()}"`);
console.log(`Name of instanceThree is "${instanceThree.getName()}"`);
```

Can you guess, what those will log out?

> Name of instanceOne is "One"  
> Name of instanceTwo is "One"  
> Name of instanceThree is "One"

Why is that? Because it's singleton class! It always uses the one instance that
was created in the beginning. Try changing the order, move `instanceThree` above
`instanceOne`. What are those `console.log`s saying now?

Another thing is extending. This is a very popular feature of object-oriented
programming. Popular, misused, abused etc. Singletons, technically, can't be
extended, they don't have any ancestors. But, seeing is believing. Let's create
a new class that will extend the old one:

```js
class Extending extends SingletonClass {
  shoutName() {
    return this.name.toUpperCase();
  }
}
```

So, normally `Extending` should have two — `getName` derived from
`SingletonClass`, and `shoutName`, it's own. Let's see:

```js
const A = new Extending();

console.log("getName" in A);
console.log("shoutName" in A);
```

What do you see in the console?

> true  
> false

Why? Because the instance was created sometime ago, while we defined
`instanceOne`. The extension process can't even start, because `SingletonClass`
`constructor` returns the instance first thing.

The only way to extend a singleton class is to do it **before** any instance is
initiated. But this is an extreme anti-pattern, because you can't be sure that
someone will not use the base class before you do the extending. Sure, you can
extend it right after the declaration, but... why?

---

So, we now know how to create a class that has only one instance. Is it useful?
If you want to use the benefits of a class but without allowing to use it
freely. Sounds sarcastic, but isn't. Think of a logger. Why would you need to
create multiple loggers? You should just use one, and it can be build using
singleton. Think of caching database. You want all the data to be available
without thinking of sharing the state somewhere.

---

The entire code is available at my
[CodePen](https://codepen.io/tomekbuszewski/pen/mQYJbq?editors=0010), along with
an additional check for multiple instances for the non-believers.
