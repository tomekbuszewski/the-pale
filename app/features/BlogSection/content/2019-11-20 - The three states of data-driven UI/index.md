---
slug: 2019-11-20-the-three-states-of-data-driven-ui
title: The three states of data-driven UI
pubdate: 2019-11-20
summary:
  How should our UI behave, when our logic doesn't really know, whether there
  will be any actual data?
tags: react, ui, frontend
---

How should our UI behave, when our logic doesn't really know, whether there will
be any actual data?

I remember the times, when there was no such issue as "not knowing" about the
data in the UI. We knew, and if it was there – we imported the template. If not
– we didn't even display the section responsible. It was all server rendered and
handled by a simple `if` condition.

```twig
{% if comments %}
  {% include "comments.html" with comments %}
{% endif %}
```

And that was it, really.

We can have similar approach today. Why not? In our React app, it would be as
easy as to write

```javascript
comments && <Comments />;
```

This is a **binary state**. True or false, 1 or 0. Nothing more to it.

## The third state

As clarified before, two states are `true` – there is some data, or `false` –
there is not. **But we can expand it, have an ambiguous in-the-middle** one:

```javascript
const STATE = {
  OK: "OK",
  FETCHING: "FETCHING",
  NO_DATA: "NO_DATA",
};
```

This will allow us to have more complex rendering and provide user with the
actual information about what is happening.

Assuming the backend returns a JSON array, code can look like this:

```javascript
const Comments = (props) => {
  const [fetchState, setFetchState] = React.useState(STATE.FETCHING);
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await props.fetchComments({ id: props.id });
      setFetchState(data.length > 0);
    })();
  }, []);

  if (fetchState === STATE.OK) {
    return comments.map((comment) => <Comment key={comment.id} {...comment} />);
  }

  if (fetchState === STATE.NO_DATA) {
    return <NoData message="No comments for this post" />;
  }

  return <Loading />;
};
```

We are using very extensive render fragment – two `if`s and one default
`return`. This is mostly for clarity, as this could be written in a shorter way.
It now demonstrates purely, what will be displayed when. And, we could have more
states, for example, when fetching will not be successful.

This approach is far better than basing on state derived from data. We could
check `comments` array for length, and even turn it into `null` when fetch
returns no result. But this introduces a risky type change – we'd transform an
array into a `null`. We'd have to check this type every time we would like to do
an operation on this value. This is far too error prone.

## Conclusion

This is very basic and very simple example of how UI should be treated with
async data. Displaying endless spinners when there's nothing fetched is very bad
practice and should be avoided. With this approach, you can have cleaner and
more intuitive UI and UX.
