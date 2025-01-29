---
slug: 2018-12-23-facade-pattern-in-javascript
pubdate: 2018-12-23
title: Facade pattern in JavaScript
published: true
summary:
  When building an application, we often face problems with external APIs. One
  has simple methods, other has them very complicated. Unifying them under one
  common interface is one of uses of the facade pattern.
tags: design-patterns, javascript
---

When building an application, we often face problems with external APIs. One has
simple methods, other has them very complicated. Unifying them under one common
interface is one of uses of the facade pattern.

Let's imagine we're building an application that displays information about
movies, TV shows, music and books. For each of these we have a different vendor.
They are implemented using various methods, have various requirements etc. We
have to remember or keep noted how to query each type.

Or do we?

Facade pattern solves such problems. This is a common interface that have the
same methods no matter what it used underneath.

I have prepared four different implementations of a resource serving:

```js
class FetchMusic {
  get resources() {
    return [
      { id: 1, title: "The Fragile" },
      { id: 2, title: "Alladin Sane" },
      { id: 3, title: "OK Computer" },
    ];
  }

  fetch(id) {
    return this.resources.find((item) => item.id === id);
  }
}

class GetMovie {
  constructor(id) {
    return this.resources.find((item) => item.id === id);
  }

  get resources() {
    return [
      { id: 1, title: "Apocalypse Now" },
      { id: 2, title: "Die Hard" },
      { id: 3, title: "Big Lebowski" },
    ];
  }
}

const getTvShow = function (id) {
  const resources = [
    { id: 1, title: "Twin Peaks" },
    { id: 2, title: "Luther" },
    { id: 3, title: "The Simpsons" },
  ];

  return resources.find((item) => item.id === 1);
};

const booksResource = [
  { id: 1, title: "Ulysses" },
  { id: 2, title: "Ham on Rye" },
  { id: 3, title: "Quicksilver" },
];
```

They are named using different patterns, they are implemented better, worse,
require more or less work. Because I didn't want to overcomplicate, I used
simple examples with common response format. But nevertheless, this illustrates
the problem well.

## Design of our facade

To create a facade, first thing we need to know every aspect of every vendor. If
one would require additional authorization, more parameters etc., this has to be
implemented. This is an extra, and can be discarded when used with vendor that
doesn't need it.

**The building block of a facade is common interface**. No matter which resource
you want to query, you should only use one method. Of course, underneath it,
there may lay more, but the public access should be limited and easy to use.

First, we're ought to decide the shape of the public API. For this example, a
single getter should be enough. The only distinction here is the media type
– book, movie etc. So the type will be our foundation.

Next, the common things among resources. Every one is queryable by ID. So, our
getter should accept one parameter, an ID.

# Building our facade

(I've decided to use a class for this, but this is not a requirement. Module
consisting of object literal or even a collection of functions would probably
suffice. Nevertheless, I like this notation.)

```js
class CultureFasade {
  constructor(type) {
    this.type = type;
  }
}
```

For starters, we define the type in the constructor. This means, that each of
the facade instance will return different one. I know this might seem redundant,
but it's more convenient that using a single instance of function and pass more
arguments every time.

Okay, so the next thing is to define our public and private methods. For noting
the "private" ones, I used the famous `_` instead of the `#`, because CodePen
doesn't support it yet.

As we said earlier, the only public method should be our getter.

```js
class CultureFacade {
  constructor(type) {
    this.type = type;
  }

  get(id) {
    return id;
  }
}
```

The base implementation (a skeleton) is there. Now, let's move to the actual
_meat_ of our class – private getters.

First off, we need to identify how each resource is queried:

- Music requires a new instance and then passing and ID within the method `get`;
- Movie's each instance returns the data, requires ID during initialization;
- TV Show is just a single function that accepts an ID and returns the data;
- Books are just a resource, we need to query it ourselves.

I know this step seemed tedious and unnecessary, but note that now we don't
really have to figure out anything. **The conceptual phase is very important
during the design and build process**.

Okay, music, go.

```js
class CultureFacade {
  ...

  _findMusic(id) {
    const db = new FetchMusic();
    return db.fetch(id);
  }
}
```

We've created a simple method that does exactly what we've described earlier.
The remaining three will be just a formality.

```js
class CultureFacade {
  ...

  _findMusic(id) {
    const db = new FetchMusic();
    return db.fetch(id);
  }

  _findMovie(id) {
    return new GetMovie(id);
  }

  _findTVShow(id) {
    return getTvShow(id);
  }

  _findBook(id) {
    return booksResource.find(item => item.id === id);
  }
}
```

There, now we have all the methods to query our databases.

## Getting the public API

One of the most important things I've learned when working as a programmer is to
never rely on your vendors. You never know what might happen. They might get
attacked, shut down, your company may stop paying for the service etc.

Knowing this, our getter should be also using a kind of facade. It should _try_
to fetch the data, not assuming that it'll succeed.

So, let's write such method.

```js
class CultureFacade {
  ...

  get _error() {
    return { status: 404, error: `No item with this id found` };
  }

  _tryToReturn(func, id) {
    const result = func.call(this, id);

    return new Promise((ok, err) => !!result
      ? ok(result)
      : err(this._error));
  }
}
```

Let's stop here for a minute. As you can see, this method is also private. Why?
Public doesn't benefit from it. It require the knowledge of other private
methods. Next, it requires two parameters – `func` and `id`. While the latter is
quite obvious, the former is not. Okay, so this will accept a function (or
rather our class' method) to run. As you can see, the execution is being
assigned to `result` variable. Next, we're checking whether it succeed and we're
returning a `Promise`. Why such baroque construct? Promises are very easy to
debug and execute, with the `async/await` or even plain `then/catch` syntax.

Oh, and the error. Nothing big, just a getter returning a message. This can be
more elaborate, has more information etc. I didn't implement anything fancy,
since this doesn't really require it, and our vendors doesn't have any errors to
base upon either.

Okay, so what we have now? The private methods for querying vendors. Our inner
facade to try to query. And our public getter skeleton. Let's expand it into a
living being.

Since we're relying on predefined types, we'll use the ever-so-powerful `switch`
statement.

```js
class CultureFacade {
  constructor(type) {
    this.type = type;
  }

  get(id) {
    switch (this.type) {
      case "music": {
        return this._tryToReturn(this._findMusic, id);
      }

      case "movie": {
        return this._tryToReturn(this._findMovie, id);
      }

      case "tv": {
        return this._tryToReturn(this._findTVShow, id);
      }

      case "book": {
        return this._tryToReturn(this._findBook, id);
      }

      default: {
        throw new Error("No type set!");
      }
    }
  }
}
```

### A note about defining string types

Our types are written by hand. This isn't the best practice. It should be
defined aside, so no typo will cause the error. Why not, let's do it.

```js
const TYPE_MUSIC = "music";
const TYPE_MOVIE = "movie";
const TYPE_TV = "tv";
const TYPE_BOOK = "book";

class CultureFacade {
  constructor(type) {
    this.type = type;
  }

  get(id) {
    switch (this.type) {
      case TYPE_MUSIC: {
        return this._tryToReturn(this._findMusic, id);
      }

      case TYPE_MOVIE: {
        return this._tryToReturn(this._findMovie, id);
      }

      case TYPE_TV: {
        return this._tryToReturn(this._findTVShow, id);
      }

      case TYPE_BOOK: {
        return this._tryToReturn(this._findBook, id);
      }

      default: {
        throw new Error("No type set!");
      }
    }
  }
}
```

These types should be exported and then used application-wide.

## Usage

So, it seems that we're done here. Let's take it for a spin!

```js
const music = new CultureFacade(TYPE_MUSIC);
music
  .get(3)
  .then((data) => console.log(data))
  .catch((e) => console.error(e));
```

Very simple implementation using `then/catch`. It simply logs out the album we
were looking for, Radiohead's _OK Computer_ in this case. Great listen, by the
way.

Okay, but let's try to get an error as well. None of our vendors can really tell
anything when they don't have the requested resource. But we can!

```js
const movies = new CultureFacade(TYPE_MOVIE);
movie
  .get(5)
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
```

And what do we have here? Oh, the console throws an error, saying "No item with
this id found". Actually, it's a JSON-compliant object! Yeah!

—

The facade pattern, as you can see, can be very powerful when used properly. It
can be really beneficial when you have multiple similar sources, similar
operations etc., and want to unify the usage.

—

All the code is available on
[CodePen](https://codepen.io/tomekbuszewski/pen/jXVpMJ?editors=0010).
