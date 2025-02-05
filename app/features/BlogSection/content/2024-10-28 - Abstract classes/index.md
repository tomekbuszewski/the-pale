---
slug: 2024-10-28-abstract-classes-interfaces-and-types-in-typescript
title: Abstract classes, interfaces, and types in TypeScript
summary:
  TypeScript, while being “only” a superset of JavaScript, provides quite robust
  system of typing. But, when to use what?
pubdate: 2024-10-28
tags: typescript, abstract, interface, type
youtube: https://youtu.be/yTt2OZTFmLs
---

TypeScript, while being “only” a superset of JavaScript, provides quite robust
system of typing. But, when to use what?

---

Before we go deep, a quick reminder, what is a class in general. It is something
like a very robust blueprint of whatever functionality we want to achieve, which
also can exist multiple times in a single program. That means, if we have a
class named `Person`, there’s no problem of having it fired up several times
with _different insides_. The basis of classes, and object-oriented programming
in general, is the possibility to instantiate and extend. There are tons and
tons of rules about how you should and shouldn’t create your classes, but I will
not dive there now, as it’s not the video about it.

## Abstract classes

The word “abstract”, in English, has a few meanings. Most importantly, it can be
_a summary_, and a _theoretical illustration_ of a concept. This fits perfectly
with our problem today. Abstract classes are exactly this – a theoretical
summary of what we want. It’s like describing someone your idea, so they can
create it.

A simple example of an abstract class might look like this:

```ts
abstract class AbstractEmployee {
  abstract getName(): string;
  abstract getSalary(): number;
}
```

Note that this doesn’t have any actual logic, it’s just typed methods. Remember,
a description of what you want.

Now, to utilize it, we need to _extend_ it to add the “meat”:

```ts
class Employee extends AbstractEmployee {
  getName(): string {
    return "Steve";
  }

  getSalary(): number {
    return 1000;
  }
}
```

Right, cool, but why having these abstracts, if you have to write everything
anyway, right? It’s a valid question, and the answer is simple: cleanliness. You
have a blueprint out of which you build up. Plus, it’s easy to verify an idea
using a minimal example from an abstract class, rather than reviewing the whole
implementation.

But wait, there’s more!

The cool thing about abstract classes is that they can actually have a sprinkle
of an actual logic. Let’s say, you want to create an employee blueprint, and you
know that every class that will extend it, will share the same set of fields and
methods, like name and salary. But, you want to leave calculating bonuses for
all the managers to define themselves. So, you can create an abstract that will
implement all that you need:

```ts
abstract class AbstractEmployee {
  protected name: string;
  protected salary: number;

  public getName(): string {
    return this.name;
  }

  public getSalary(): number {
    return this.salary;
  }

  public giveRaise(): void {
    this.salary += this.calculateBonus();
  }

  abstract calculateBonus(): number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
}
```

As you can see, only `calculateBonus` is defined as `abstract` method, others
are regular ones. Using this is quite easy:

```ts
class Employee extends AbstractEmployee {
  calculateBonus(): number {
    return super.getSalary() * 0.1;
  }
}
```

We’ve only defined one method, everything else is already provided. Then, we can
have another class in a similar vein:

```ts
class CLevel extends AbstractEmployee {
  calculateBonus(): number {
    return super.getSalary() * 2;
  }
}
```

> The word “super” is similar to “this”, but instead of accessing _this
> instance_, it accesses the parent _which is being extended_.

This way, we can have many variants of the same base with the same methods.
Sure, we could have a regular `BaseEmployee` class and define `calculateBonus`
as a method throwing an error by default. But why do hacks, if we already have
the tool to do this right?

## Interfaces

If you thing of the word “interface”, I am sure you see some kind of a device or
tool to _interact_ with something else. For example, a keyboard is a Human
Interface Device, so a device that provides an interface for humans. But not
only that, a display is also an interface, but instead of receiving, it provides
an output. The same is with programming.

An interface _defines how you can use particular class_. A bit like an abstract
class:

```ts
interface IEmployee {
  getName(): string;
  getSalary(): number;
}
```

It can also contain regular fields if needed, but most of the time, when talking
object-oriented programming, you’ll have methods.

Alright, so what’s the difference between this and abstract classes? You can
probably guess: interfaces don’t allow for any logic. With an abstract class, as
you remember, we can leave some fields up to the user, and define some to reduce
the repetitiveness of work. In here, all we can do is describe how it should
work.

To mimic the `AbstractEmployee` class using an interface, we would do this:

```ts
interface IEmployee {
  getName(): string;
  getSalary(): number;
  giveRaise(): void;
  calculateBonus(): number;
}
```

and then implement this as follows:

```ts
class Employee implements IEmployee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getName(): string {
    return this.name;
  }

  getSalary(): number {
    return this.salary;
  }

  giveRaise(): void {
    this.salary += this.calculateBonus();
  }

  calculateBonus(): number {
    return this.salary * 0.1;
  }
}
```

As you can see, it’s a mix of our abstract (with defined all the repetitive
fields) and our actual implementation, with `calculateBonus` also having a body.

So, to summarize, abstract classes are better suited for being a base of
something that will differ slightly between each variant, interface is for
things that all the implementation leave to the developer.

## Type

Okay, we’ve gone through object-oriented stuff. Exciting, right? Now, let’s see
what’s the most common member of TypeScript’s typing family has to offer. We’re
talking about the `type`.

Type is a very broad term and it can do almost everything: describe a simple
primitive:

```ts
type Result = number;

function sum(a: number, b: number): Result {
  return a + b;
}
```

describe an entire function:

```ts
type SumFunction = (a: number, b: number) => number;

const sum: SumFunction = (a, b) => a + b;
```

join two other types:

```ts
interface ISimpleCalc {
  add: (a: number, b: number) => number;
}

interface IComplexCalc {
  multiply: (a: number, b: number) => number;
}

type Calc = ISimpleCalc & IComplexCalc;
```

exclude things from a type:

```ts
interface IGreeter {
  sayHello(): string;
  sayGoodbye(): string;
}

type OnlyHappyThings = Omit<IGreeter, "sayGoodbye">;
```

and even create an optional type:

```ts
interface StudioAlbum {
  songs: string[];
  artist: string;
  title: string;
  released: Date;
}

interface LiveAlbum {
  songs: string[];
  artist: string;
  title: string;
  recorded: Date;
}

type Album = StudioAlbum | LiveAlbum;

const album: Album = {
  songs: ["song1", "song2"],
  artist: "artist",
  title: "title",
  recorded: new Date(),
};
```

So, when to use type? When interface or primitive don’t fit. Simple as that.

—

TypeScript has a very robust typing system, and knowing when to use what can be
overwhelming. I hope this video helped you getting the grasp of the basic
typing.
