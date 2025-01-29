---
slug: 2019-10-24-immutable-records-as-object-factories
title: Immutable Records as object factories
pubdate: 2019-10-24
summary:
  Objects in JavaScript are quite flexible. This means, they can be altered in
  many ways, sometimes accidentally. What to do, when you need to guarantee the
  consistency?
tags: javascript, data-structures
---

Objects in JavaScript are quite flexible. This means, they can be altered in
many ways, sometimes accidentally. What to do, when you need to guarantee the
consistency?

## Problem with bare objects

Regular objects are pretty simple, they look like this:

```js
const myCategory = {
  title: "Hello",
  slug: "hello",
};

console.log(myCategory);
// { title: "Hello", slug: "hello" }
```

Unfortunately, nothing really stops us from deleting something from it:

```js
delete myCategory.slug;

console.log(myCategory);
// { title: "Hello" }
```

What if our other code relies on this property? What if the template looks like
this:

```js
<a href={`/categories/${myCategory.slug}`}>{myCategory.title}</a>
```

It will be broken, best case – tests will fail. Worse – rendering will break and
user won't be able to use the app.

## Mitigating missing properties in objects

There are some ways to fix such issues. For starters, we may refrain ourselves
from deleting properties. But seriously, we can have a default value in our
template:

```js
<a href={`/categories/${myCategory.slug || "#"}`}>{myCategory.title}</a>
```

This helps only a bit. The link will be there, HTML will be valid, but the app
is still useless. We could have a default category instead of `#`, but this is
even worse – link "Recipes" would lead to "/categories/default".

Another way is to generate a slug when needed:

```js
<a href={`/categories/${myCategory.slug || slugify(myCategory.title)}`}>
  {myCategory.title}
</a>
```

This works well, but it is on-demand. We have to remember to add this condition
everywhere. On the post listing template, on the post template, on category
listing, footer etc. It is very cumbersome.

## Immutable `Record` to the rescue

Immutable JS is one of my favorite libraries out there. A bit scary at the
beginning, after getting use to it, it makes development of data structures a
breeze.

One of the best features of Immutable JS is `Record`. Record is simply a Map
with guaranteed keys.

Guaranteed how? Well, they won't magically appear – we have to provide them, but
only once. They are the default values of our Record. So, let's use Record to
mitigate the missing slug problem!

Okay, let's start with an interface for our input:

```typescript
interface ISimpleCategory {
  title: string;
  slug?: string;
}
```

We've declared `slug` as optional. But we want our Record to have it always, so
let's extend it:

```typescript
interface ISimpleCategoryRecord extends ISimpleCategory {
  slug: string;
}
```

Okay, so interfaces are defined, great. Now the implementation:

```typescript
import { Record } from "immutable";

const slugify = (input: string): string =>
  input.replace(/ /g, "-").toLowerCase();

const CategoryFactory = (
  input: ISimpleCategory
): Record<ISimpleCategoryRecord> => {
  return Record<ISimpleCategoryRecord>({
    title: input.title,
    slug: input.slug || slugify(input.title),
  })(input);
};

const catA = CategoryFactory({ title: "Testing here" });
console.log(catA.get("slug")); // "testing-here"
```

Let's go through it, step by step.

First, we've imported `Record` from `immutable`, as this is the only vendor
we'll use.

Next, we have created some util function to replace every space with a small
dash (`-`) and to make the string lowercase. This is a super-basic slug
implementation.

Now, we have created a `CategoryFactory` function that receives a single
parameter – `input` with the interface `ISimpleCategory`. Inside this function,
we simply returned a `Record` with interface `ISimpleCategoryRecord`, that has
`slug` as mandatory. Now, whenever using an entity created with this factory, we
will receive typehints – here, about what fields are available for us.

> I know this isn't a very clean function, since it relies on an external
> vendor, but this is for demonstration purposes only.

The most interesting here is the body of our `Record`. Please note the `slug`
field. It either takes our input's `slug`, or creates its own with `slugify`.
This way we always know, that we'll get both `title` and `slug`, as long as we
will provide the former.

### Bonus part: Factory without an external dependency

Like I've said earlier, usage of `slugify` is purely for demonstration. But I
wouldn't be myself, if I left it that way. So let's create a variant that can
have `slugify` passed as a parameter. It can be called a simple dependency
injection, great for testing, for example. Looks like this:

```typescript
function CategoryFactoryWithDepsInjectConstructor(
  slugify: (inp: string) => string
) {
  return function createRecord(input: ISimpleCategory) {
    return Record<ISimpleCategoryRecord>({
      title: input.title,
      slug: input.slug || slugify(input.title),
    })(input);
  };
}
```

Let's go through it real fast. First thing – `function` notation instead of
`const` have more clarity. It looks cleaner and more concise. Next thing is,
first parameter is not our `input` with `ISimpleCategory` interface, but a
`slugify` function. Why? Because we're using currying here, so we will have a
function returning a function. Only then we created `createRecord`, that is our
actual factory. The rest is as it was.

Okay, so how do we run it? Actually very simple, but we don't want to inject
`slugify` every time we use this. This is counter-productive, and I am a lazy
person. So, let's create an instance of this function with this vendor bound:

```typescript
const CategoryFactoryWithDepsInject =
  CategoryFactoryWithDepsInjectConstructor(slugify);
```

How is this different from the one we've used previously? Well,
`CategoryFactoryWithDepsInject` is not, but
`CategoryFactoryWithDepsInjectConstructor` differs greatly. And we can use both!
So, for example, we'll get the former in our normal production codebase, but the
latter in testing, and inject something else instead of our "utility" function.
Or, we could create a more complex variant with different variant of `slugify`
injected.

But, frankly, this is beyond the point.

## Conclusion

Working with data in JavaScript is not always easy. Missing properties are a
pain and seeing `undefined` when querying for a value can be troublesome, to say
the least. Fortunately, Records are great and can very easily help us mitigate
most of the issues.

## Links

- [full source at CodeSandbox](https://codesandbox.io/s/red-sound-nehsr);
- [official documentation](https://immutable-js.github.io/immutable-js/docs/#/Record).
