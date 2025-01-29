---
slug: 2019-01-20-relational-(and-immutable)-models-as-persistence-layer
pubdate: 2019-01-20
title: Relational (and immutable) models as persistence layer
published: true
summary:
  Keeping data in application state is a very common thing. But maintaining its
  size and complexity may be a challenge. Unless we make it flat.
tags: javascript, immutable, immutablejs, data models
---

Keeping data in application state is a very common thing. But maintaining its
size and complexity may be a challenge. Unless we make it flat.

## Problem we are aiming to solve

Most of the time, when keeping data in a store, it is somewhat thrown together,
an array of objects. For example:

```js
[
  { id: 1, title: "Title" },
  { id: 2, title: "Title 2" },
];
```

And this is fine for a small collection with no nested data. But image a more
complex example, a blog:

```js
[
  {
    id: 1,
    title: "Hello",
    tags: [
      { tag: "Tag 1", slug: "tag-1" },
      { tag: "Tag 2", slug: "tag-2" },
    ],
    categories: [
      { category: "Category 1", slug: "category-1" },
      { category: "Category 2", slug: "category-2" },
    ],
  },
];
```

While still very readable, it creates a problem. No matter what I would like to
display, I have to fetch all the data. I don't really need tags or categories on
listing. Or, if I just want to list all the categories, I would have to:

1. Loop through all the posts;
2. Extract the `categories` objects;
3. Combine that data into a new table (in a state or temporarily somewhere).

Seems like a lot to do.

That's where flat models come in handy.

## Relation-based flat models

When having data that is different in type, relations are a great thing. You
might know it from SQL tables.

**Posts:**

| id  | category | title   |
| :-- | :------- | :------ |
| 1   | 1        | "Hello" |

**Categories:**

| id  | name              | slug              |
| :-- | :---------------- | :---------------- |
| 1   | "Welcoming posts" | "welcoming-posts" |

Very simple and straightforward. It can be easily mirrored as JavaScript
objects:

```js
{
  posts: [
    { id: 1, category: 1, title: "Hello" },
  ],
  categories: [
    { id: 1, name: "Welcoming posts", slug: "welcoming-posts" },
  ],
}
```

Using this model, we are only keeping the data we actually need. If we want to
display solely the post list, we use `posts` collection. And if we need to query
something, we just look it up in another collection, for example:

```js
const data = {
  posts: [{ id: 1, category: 1, title: "Hello" }],
  categories: [{ id: 1, name: "Welcoming posts", slug: "welcoming-posts" }],
};

class Post {
  constructor(id) {
    this.id = id;
  }

  getPost() {
    return data.posts.find((post) => post.id === this.id);
  }

  getDetailedPost() {
    const post = this.getPost();
    const category = data.categories.find(
      (category) => category.id === post.category
    );

    return {
      ...post,
      category,
    };
  }
}
```

While this is perfectly fine solution, necessity to write filters every time is
not that nice.

## Enter Immutable.js

> This section assumes that you know at least about immutable maps and lists. If
> not, things may seem unclear.

The question of immutability when it comes to data is quite vast. I won't really
talk much about it to avoid obscuring the text, but I will show you, why I use
it very often when creating models similar to ours.

First, let's redefine our model a bit:

```js
const immutableData = Map({
  posts: Map({
    items: Map(),
    collection: List(),
  }),
  categories: Map({
    items: Map(),
    collection: List(),
  }),
});
```

It's easy to see that we are repeating a pattern here. This is purely by design.
Using the same notation everywhere, we are making sure that every object will be
accessible on the same terms.

Let me take a minute to explain, why we have split entity model in two sections.
`items` will be a map `{ id: { content } }` and `collection` will be a simple
list of `[id, id]`. That way we will be able to easily grab an item knowing its
id without writing filters.

So let us build such model with existing data. I will refer to `data` object
defined earlier in the text.

First, we need to extract the IDs from given objects.

For convenience, I've converted the data to maps first:

```js
const immutablePosts = fromJS(data.posts);
const immutableCategories = fromJS(data.categories);
```

Now we need functions to extract the required values. First, we need an
`[id, id]` list. Let's write it:

```js
const extractIds = (input) =>
  input.reduce((acc, item) => acc.push(item.get("id")), List());
```

Next, we need to have a `{ id: { content } }` relation. That's a map:

```js
const extractElements = (input) =>
  input.reduce((acc, item) => acc.set(item.get("id"), item), Map());
```

And that's it. Now we can create the entire database:

```js
const immutableData = Map({
  posts: Map({
    items: extractElements(immutablePosts),
    collection: extractIds(immutablePosts),
  }),
  categories: Map({
    items: extractElements(immutableCategories),
    collection: extractIds(immutableCategories),
  }),
});
```

Now, when we have an entire database, let's try to get an item:

```js
const item = immutableData.getIn(["posts", "items", 1]);
```

I know this may seem long at first glance, but look at its pureness. It's so
easily to tell what exactly is going on. The same goes for listing all the
items:

```js
const items = immutableData
  .getIn(["posts", "collection"])
  .map((item) => immutableData.getIn(["posts", "items", item]));
```

Pretty easy, eh? Of course in real life applications, you'd build helpers for
this, to avoid writing this for the whole time. Such helper may be a class, that
will work just like `Post` created earlier:

```js
class ImmutablePost {
  constructor(id) {
    this.id = id;
  }

  getPost() {
    return immutableData.getIn(["posts", "items", this.id]);
  }

  getDetailedPost() {
    const post = this.getPost();
    const category = immutableData.getIn([
      "categories",
      "items",
      post.get("category"),
    ]);

    return post.set("category", category);
  }
}
```

Now getting a single post is to simply `new ImmutablePost(1);`.

> Did you notice that on the surface, those classes are the same? That's because
> [they are both a facade](https://dev.to/tomekbuszewski/facade-pattern-in-javascript-3on4)!

## Conclusion

I think this shows pretty well how to use flat data models instead of nested
ones. Adding ImmutableJS into the mix helps a lot, but introduces another level
of complexity. So if this isn't something you're familiar with, consider leaving
it out for now, to avoid headaches.

---

- [Entire code on CodePen](https://codepen.io/tomekbuszewski/pen/VgZZvM?editors=0010);
- [ImmutableJS Home Page](https://facebook.github.io/immutable-js/);
