---
slug: 2024-12-02-developing-accessible-react-forms-without-the-headache
title: Developing accessible React forms without the headache
short-title: accessible forms
summary:
  Some time ago I’ve embarked on a journey to find a decent headless UI system
  that will lift the form problem of my back.
pubdate: 2024-12-02
tags: react, accessibility, web-development
youtube: https://youtu.be/qdbc8DwEqsM
---

Whenever I sit to do another project with custom UI, there’s the cool part,
namely styling, animations and microinteractions, and the boring part, that’s
the markup. Plus, most of the time I leave accessibility for last, and
eventually forget about it.

---

Some time ago I’ve embarked on a journey to find a decent headless UI system
that will lift this problem of my back.

## Requirements

First and foremost, it should provide proper markup and satisfy Aria patterns
outline by Web Accessibility Initiative. Most problems is coming with forms, so
that was a must. To have buttons, labels, selects, everything you can think of
when you’re asking for user input – handled. Next, I wanted to be able to
seamlessly integrate and control these elements, so events like `onSubmit` and
props like `isDisabled` (or adjacent, naming wasn’t really a requirement) should
be provided. Last, but not least, it should be well documented.

I realize this is a tall order, that’s why my search took some time. I went
through several blog posts, Reddit discussions and videos, and eventually,
arrived at React Aria. I found that it has everything I need.

> Recently I’ve also found that Headless UI, the library by the Tailwind folks,
> is now version 2. and looks stellar. I haven’t looked at it yet though.

## Preparation

I will create an empty React and TypeScript project using Vite:

```bash
~ pnpm create vite
```

This will give me, like I’ve said, an empty project with some basic outlines and
styling. I will be removing these, as I want to see how the components are
rendered without any styles besides the browser ones. How things like custom
dropdowns and such are handled.

All that’s left is to add React Aria:

```bash
~ pnpm add -D react-aria-components
```

## Building a simple form

Let’s start by building a form with a select, an input and a bit of validation.
Basically the goal is:

> Create a form that asks for a favorite album and song by David Bowie. Albums
> should be predefined. Both answers are mandatory to submit the form.

Let’s start by defining the data we will use. Normally these things would arrive
from your backend, but’s for the sake of speed, I will just define them as a
static array:

```tsx
const albums = [
  { id: "low", name: "Low" },
  {
    id: "heroes",
    name: '"Heroes"',
  },
  {
    id: "lodger",
    name: "Lodger",
  },
  {
    id: "station-to-station",
    name: "Station to Station",
  },
  {
    id: "outside",
    name: "Outside",
  },
];
```

Right, so a form. React Aria offers a `Form` component, so let’s import it.

```tsx
import { Form } from "react-aria-components";
```

It has the basic `onSubmit` prop (and all the props you’d expect from a regular
`form` element), so we can define it:

```tsx
function App() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    console.table(Object.fromEntries(formData));
  }

  return <Form onSubmit={handleSubmit}></Form>;
}
```

Now, we want to add a `select` field. Again, React Aria offers such component,
so we can import it as `Select`. But there’s a caveat in here: it won’t convert
regular `option` tags into semantic ones, nor does it offer such. Nope, we
basically need to create a dropdown by ourselves. This is a bold choice from the
creators, but it makes sense, given how hard it is to style such native
elements.

The whole thing starts with the aforementioned `Select`, that has a `Label`
inside and… a `Button`, serving as the main element when the thing is inactive,
and as the option indicator. Then, we must define a `Popover` and a `ListBox`. I
know it sounds complex, but bare with me. `ListBox` accepts an array of objects
(with `id` key required) and can render its content using `ListBoxItem`
component. The whole thing looks like this:

```tsx
<Select name="favAlbum">
  <Label>Favorite album:</Label>
  <Button>
    <SelectValue />
    <span aria-hidden="true">▼</span>
  </Button>
  <Popover>
    <ListBox items={albums}>
      {(album) => <ListBoxItem>{album.name}</ListBoxItem>}
    </ListBox>
  </Popover>
</Select>
```

This gives us, well, a rather regular select with an arrow. Funny that it’s uses
browser language. It can be, obviously, customized. React Aria is using a bit
forgotten pattern of render props. Basically you put a function that outputs JSX
rather than the raw JSX as children. Observe:

```tsx
<SelectValue>
  {({ defaultChildren, isPlaceholder }) =>
    isPlaceholder ? "Select an album" : defaultChildren
  }
</SelectValue>
```

Most elements from React Aria uses this pattern, which is, again a bold choice
in today’s landscape. But again, a valid one.

Right, so we have the select. Works fine, although unstyled looks poor. Doesn’t
matter for now though. The only problem for me is the fact that it renders as a
dropdown on mobile as well. Normally, iOS and Android has their own UI to handle
selects.

Now, let us add the validation for this field. If you remember from my
[text about browser-native validation](https://buszewski.studio/writings/2024-10-14-form-validation-in-the-browser/),
you know that the basics can be handled here. This is as simple as adding
`isRequired` to the select field:

```tsx
<Select name="favAlbum" isRequired>
  ...
```

Now, to display the error, within the field (but doesn’t matter where exactly),
we need to put `FieldError` component. By default, it displays predefined
message, but we can modify this! This component also uses render props pattern
and exposes some values, namely, validation errors! So doing this:

```tsx
<FieldError>
  {({ validationDetails }) => {
    if (validationDetails.valueMissing) {
      return "Provide a value!";
    }

    return "There's been an error!";
  }}
</FieldError>
```

allows us to adjust the error message. `validationDetails` provides, well,
details, such as the reason of error, for example, here it’s `valueMissing`, but
can also be `tooShort` if we want certain length or not matching the pattern
that we’ve specified.

Right, so select is done, let’s try with a regular input. A lot less complex,
it’s basically just three small components (four, if you want error message):

```tsx
<TextField type="text" name="name" isRequired>
  <Label>Favorite song</Label>
  <Input />
  <FieldError />
</TextField>
```

This is literally it, we have our input properly placed. I really like that I
don’t have to worry about id’s and names, because React Aria takes care of it
for me. I just need to put one on the top, to be able to identify it later.

And last, but not least, the button. So again, pretty simple thing:

```tsx
<Button type="submit">Submit</Button>
```

As you probably guesses, this button also has render props, and we can find out,
for example, if it is being disabled, pressed, pending etc. Or we can just throw
a text in there.

### Handling form submission

This is not React Aria-specific thing, but works here seamless. So, our Form has
`onSubmit`, like any form, and emits a function with `FormEvent` parameter. We
can, obviously, intercept this:

```tsx
function handleSubmit(event: FormEvent) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  console.table(Object.fromEntries(formData));
}

return (
  <Form onSubmit={handleSubmit}>
    ...
```

`preventDefault` stops from, well, doing the default thing, which is to submit
the form (in this case, just by putting the values in the URL) and reloading the
page. Instead, we’re extracting the form data and can see all that we’ve put
there. Obviously, `console.table` is just for demonstration, normally you’d have
some way of sending this data to your API.

—

Building UI is complex, but building UI that is also accessible is way harder.
That’s why tools like React Aria are such a great help for everyone trying to
build an inclusive application. I know that I haven’t fully explored the library
here, but rather scratched the surface. It has much more things, for example
hooks allowing you to build your own components. I strongly suggest you check it
out!
