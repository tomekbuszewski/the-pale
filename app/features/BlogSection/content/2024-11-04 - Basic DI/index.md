---
slug: 2024-11-04-basics-of-dependency-injection-in-typescript
title: Basics of Dependency Injection in TypeScript
summary:
  Object-oriented programming has a lot of rules. But these aren’t just to have
  something to talk about during code reviews or to flex on which book from 1994
  or 2008 you’ve read.
pubdate: 2024-11-04
tags: typescript, oop, di
youtube: https://youtu.be/iCcVX7GUgHg
---

Object-oriented programming has a lot of rules. But these aren’t just to have
something to talk about during code reviews or to flex on which book from 1994
or 2008 you’ve read. They actually make sense, and one of the most important is
to have loose coupling.

## What is coupling?

Coupling sounds a bit funny, but it really makes sense. What would you describe
as a “strong couple”? A relation between two entities (people, objects, terms)
that is highly cross-dependent. At least one party relies on the other,
sometimes to a point where they cannot exist on their own. For example, humans
and oxygen have a very tight coupling. We cannot exist without it, and, as far
as I know, there’s no suitable, long-term substitute.

But there’s also loose coupling, which is a bit of an opposite. I am right now
using a glass, so we are bound by use-being used coupling. But nothing stops me
from using another glass, a mug, a jar or even a platter to drink from it. This
means, I am more dependant on _a drinking vessel_ rather than this particular
one. So, if I have anything that can

- hold liquid;
- can be picked up;
- can be tilted to allow the liquid to flow;

it will do just fine.

Let’s jump to the IDE to demonstrate exactly what I mean.

## Preparation

As always, I am creating a new Vite project:

```bash
~ npm create vite@latest
```

with template Vanilla and usage of TypeScript. Then, I am throwing in `tsx` and
`vitest`:

```bash
~ npm install -D tsx vitest
```

Both are development dependencies.

## Building classes with loose coupling

If you remember my piece on
[abstracts and interfaces in TypeScript](https://buszewski.com/writings/2024-10-28-abstract-classes-interfaces-and-types-in-typescript),
you probably know where we’re going.

Yup, we’re going to define an interface. But first, let’s build a regular class.
I want to create a human, and as any seasoned IT specialist, I am doing this
with my computer.

```ts
export class Human {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }

  public takeASip() {
    console.log(`${this.name} takes a sip from a glass of water`);
  }
}
```

All right, we have a class that we can instantiate and make it drink water and
say hello. That’s great, but not very flexible, isn’t it? Not everyone is nice
and will say “Hello, my name is…” when approached. Some will just stare blankly
at you until you retreat. Same with drinking: can this “person” only drink from
one glass? Only water? What kind of miserable existence is this?

> When this video hits, it won’t be Spooktober anymore, so I won’t do any
> Frankenstein-related jokes. But, you know, creating artificial human, misery
> and despair in late gothic/romantic, crimson-soaked period. I also have a
> _Frankenstein_ novel with its cover depicting the Creature scratching his
> butt.

So what can we do to make this new human’s life more bearable? Or at least, more
interesting? Let’s start by changing the greeting scenario. And let’s make this
person a bit indecisive while we’re at it:

```ts
export class Human {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  private decide() {
    return Math.random() > 0.5;
  }

  public sayHello() {
    if (this.decide()) {
      console.log(`Hello, my name is ${this.name}`);
    } else {
      console.log(`${this.name} just stares menacingly`);
    }
  }

  public takeASip() {
    console.log(`${this.name} takes a sip from a glass of water`);
  }
}
```

Okay, that’s great, but now, every human created from this blueprint will be the
same. I am not an HR specialist, so I don’t want everyone to be the same.

So, what can we do to make this better?

Well, we could extend this class with `GrumpyHuman extends Human` and so forth,
but this will lead to a lot of mess. Eventually we’ll have tons of classes that
we will use once or twice. And when we will add more to our mixture, like
sipping, it will grow tremendously!

Fear not, dependency injection is here to save a lot of you.

> Please note that I am not using any DI framework for these simple examples. If
> you would like me to do more complex, advanced DI thing with frameworks like
> TSyringe, let me know!

## Making a class more flexible

What we have to do first, is to make our class actually “injectable”. To do so,
we need to _decouple_ it. This simply means, we need to take the methods and
values that we want to control, and move them into a separate class (or
function, or whatever else, this is TypeScript.) I’ll start with extracting the
greeting part:

```ts
interface IGreeting {
  sayHappyHello(name: string): void;
  sayGrumpyHello(name: string): void;
}

export class Human {
  protected name: string;
  protected greeting: IGreeting;

  constructor(name: string, greeting: IGreeting) {
    this.name = name;
    this.greeting = greeting;
  }

  private decide() {
    return Math.random() > 0.5;
  }

  public sayHello() {
    if (this.decide()) {
      this.greeting.sayHappyHello(this.name);
    } else {
      this.greeting.sayGrumpyHello(this.name);
    }
  }

  public takeASip() {
    console.log(`${this.name} takes a sip from a glass of water`);
  }
}
```

So what we have here is an interface, and then a class `Human` that has it as a
parameter. Very cool, very cool. Following along, we will now create the
`Greeting` class:

```ts
interface IGreeting {
  sayHappyHello(name: string): void;
  sayGrumpyHello(name: string): void;
}

class Greeting implements IGreeting {
  sayHappyHello(name: string) {
    console.log(`Hi, my name is ${name}`);
  }

  sayGrumpyHello(name: string) {
    console.log(`${name} just stares menacingly`);
  }
}

export class Human {
  protected name: string;
  protected greeting: IGreeting;

  constructor(name: string, greeting: IGreeting) {
    this.name = name;
    this.greeting = greeting;
  }

  private decide() {
    return Math.random() > 0.5;
  }

  public sayHello() {
    if (this.decide()) {
      this.greeting.sayHappyHello(this.name);
    } else {
      this.greeting.sayGrumpyHello(this.name);
    }
  }

  public takeASip() {
    console.log(`${this.name} takes a sip from a glass of water`);
  }
}

const John = new Human("John", new Greeting());
John.sayHello();
```

Okay, but that doesn’t really do much, doesn’t it? Well, it’s basically the same
as it was, I only had to type a lot more. That’s object-oriented programming for
you. But seriously, now we can create new greetings:

```ts
class FrenchGreeting implements IGreeting {
  sayHappyHello(name: string) {
    console.log(`Bonjour, je m'appelle ${name}`);
  }

  sayGrumpyHello(name: string) {
    console.log(`${name} regarde d'un air menaçant`);
  }
}

...

const Jacques = new Human('Jacques', new FrenchGreeting());
Jacques.sayHello();
```

So you see, with one `Human` class, we’ve made two very different people. We can
obviously go further, for example, let’s try to create someone positive and
someone negative.

As you remember, we have `decide` method, which basically flips a coin. Works in
most situations, but not all. So, first let’s create a new interface:

```ts
interface IDecision {
  decide(): boolean;
}
```

and to make a decision, we will again use the randomness of the cosmos, but
we’ll tip it slightly according to our needs:

```ts
class HappyDecision implements IDecision {
  decide() {
    return Math.random() > 0.1;
  }
}

class UnhappyDecision implements IDecision {
  decide() {
    return Math.random() > 0.9;
  }
}
```

So now, `HappyDecision` will be positive 90% of the time, while
`UnhappyDecision` will be positive only 10% of the time.

```ts
interface IDecision {
  decide(): boolean;
}

class HappyDecision implements IDecision {
  decide() {
    return Math.random() > 0.1;
  }
}

class UnhappyDecision implements IDecision {
  decide() {
    return Math.random() > 0.9;
  }
}

export class Human {
  protected name: string;
  protected greeting: IGreeting;
  protected decision: IDecision;

  constructor(name: string, greeting: IGreeting, decision: IDecision) {
    this.name = name;
    this.greeting = greeting;
    this.decision = decision;
  }
  ...
```

This is all fine and well, but our `Human` class starts to grow. I mean, we’re
doing OOP, that’s normal, but we can just make a default `Decision` class:

```ts
class RegularDecision implements IDecision {
  decide() {
    return Math.random() > 0.5;
  }
}

export class Human {
  protected name: string;
  protected greeting: IGreeting;
  protected decision: IDecision;

  constructor(name: string, greeting: IGreeting, decision?: IDecision) {
    this.name = name;
    this.greeting = greeting;
    this.decision = decision || new RegularDecision();
  }
```

This way, we’ll either provide our own mood, or the class will default to a coin
flip. Right, so let’s change `John` to be more grumpy:

```ts
const John = new Human("John", new Greeting(), new UnhappyDecision());
John.sayHello();
```

Now, running the code will result in John staring menacingly (statistically) 9
out of 10 times.

All that’s left is drinking. But I am leaving this up to you, I am sure you can
change it yourself!

## Usage in testing

What we did was great, but the real meat is testing. Let’s say we have a `Bank`
class, that connects to its API for making operations:

```ts
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface ITransactionResult {
  remaining: number;
  success: boolean;
}

interface IBankingApi {
  getBalanceFor(account: string): Promise<{ name: string; balance: number }>;
  transfer(
    accountFrom: string,
    accountTo: string,
    amount: number
  ): Promise<ITransactionResult>;
  withdraw(account: string, amount: number): Promise<ITransactionResult>;
}

class BankingApi implements IBankingApi {
  private wallet = getRandomNumber(100, 1000);

  private getDiff(amount: number): { amount: number; isPositive: boolean } {
    const result = this.wallet - amount;

    return {
      amount: result,
      isPositive: result > 0,
    };
  }

  async getBalanceFor(account: string) {
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomNumber(150, 200))
    );
    return { name: account, balance: this.wallet };
  }

  async transfer(_accountFrom: string, _accountTo: string, amount: number) {
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomNumber(100, 300))
    );
    const difference = this.getDiff(amount);

    if (difference.isPositive) {
      this.wallet = difference.amount;
      return { remaining: this.wallet, success: true };
    }

    return { remaining: this.wallet, success: false };
  }

  async withdraw(_account: string, amount: number) {
    await new Promise((resolve) =>
      setTimeout(resolve, getRandomNumber(100, 400))
    );
    const difference = this.getDiff(amount);

    if (difference.isPositive) {
      this.wallet = difference.amount;
      return { remaining: this.wallet, success: true };
    }

    return { remaining: this.wallet, success: false };
  }
}

export class Bank {
  protected api: IBankingApi;

  constructor(api: IBankingApi) {
    this.api = api;
  }

  async getBalance(account: string): Promise<number> {
    const result = await this.api.getBalanceFor(account);
    return result.balance;
  }

  async transfer(from: string, to: string, amount: number): Promise<boolean> {
    const result = await this.api.transfer(from, to, amount);

    if (result.success) {
      return result.success;
    }

    throw new Error(
      `${amount} cannot be transferred, remaining balance: ${result.remaining}`
    );
  }

  async withdraw(account: string, amount: number): Promise<boolean> {
    const result = await this.api.withdraw(account, amount);

    if (result.success) {
      return result.success;
    }

    throw new Error(
      `${amount} cannot be withdrawn, remaining balance: ${result.remaining}`
    );
  }
}
```

From the get-go you can see, there’s a lot happening. For starters, we never
know the actual balance until we check it (as `wallet` is randomized). Then,
every call in the API is a promise that can take some time to execute. These
obstacles are typical. Plus, if we want to test it, we would need an actual
account, right? And even if we could get an actual account with actual funds in
there (highly unlikely), we would still need to wait for everything.

But, instead, we can simply create a new class (a “mock”) that will replace the
banking API for us. Let’s start by defining a test:

```ts
import { test, expect } from "vitest";

import type { IBankingApi } from "./Bank.ts";
import { Bank } from "./Bank.ts";

test("can withdrawn money", async () => {
  const bank = new Bank();
  const result = await bank.withdraw("123", 100);
  expect(result).toBe(true);
});
```

As you see, `Bank` doesn’t have a parameter, so it will throw an error. So we
need to create a class that will satisfy its requirement:

```ts
class FullAccount implements IBankingApi {
  async getBalanceFor(_account: string) {
    return { balance: 1000, name: "Rich man" };
  }

  async transfer(_from: string, _to: string, _amount: number) {
    return { remaining: 900, success: true };
  }

  async withdraw(_account: string, _amount: number) {
    return { remaining: 900, success: true };
  }
}
```

and use it:

```ts
test("can withdrawn money", async () => {
  const bank = new Bank(new FullAccount());
  const result = await bank.withdraw("123", 100);
  expect(result).toBe(true);
});
```

Now, running the test takes a moment and returns the result we would expect. The
same goes for testing negative situations:

```ts
test("will throw if not enough money", async () => {
  const bank = new Bank(new EmptyAccount());
  await expect(bank.withdraw("123", 100)).rejects.toThrow();
});
```

Now, we can test out `Bank` class with all the conditions defined by our
requirements.

—

Dependency injection is a vast topic. But today you’ve learnt how to decouple
and replace classes, and that’s the most important part.

Happy coding!
