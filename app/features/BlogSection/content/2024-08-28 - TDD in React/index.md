---
slug: 2024-08-28-test-driven-development-in-react
title: Test-driven Development in React
pubdate: 2024-08-28
tags: react, tdd, testing
summary:
  Test-driven Development is one of the best techniques for writing code. It not
  only raises confidence of delivery by providing tests for everything, but it
  also streamlines development. And using it with React is quite pleasant!
youtube: https://youtu.be/jUczl62-J84
---

Test-driven Development is one of the best techniques for writing code. It not
only raises confidence of delivery by providing tests for everything, but it
also streamlines development. And using it with React is quite pleasant!

I will be using my
[React Starter](https://buszewski.com/writings/2024-08-21-introducing-my-react-starter),
but feel free to use even an empty React application created with Vite. I
describe how to set up a project from scratch
[in another post](https://buszewski.com/writings/2024-08-13-design-systems-in-react-scaffolding-and-setup-part-0).

## A bit of theory

Test-driven Development is a way of writing code that prioritizes testing. We
first write test suite, which will fail, and then implement the functionalities.
After everything works, we can refactor the code to make sure it’s up to the
standards.

The best thing about TDD for me is the fact that all tests are scenarios. For
example, if we want our component to

- accept children;
- offer embolden and italic options;
- emit something on click.

we can use this as test cases, like so:

```ts
it("should accept children", ...);
it("should offen embolden and italic options", ...);
it("should emit an event on click", ...);
```

That way we not only have all requirements written down, but we have tests that
meets these.

Test-driven Development is normally described as a cycle of three:

- test;
- implement
- refactor.

As mentioned, first we write the test, then we implement the solution, and
lastly we polish it up.

> If you are interested, I have a
> [piece about TDD in JS](https://buszewski.com/writings/2019-01-09-test-driven-development-in-javascript).

## What we’re building?

I’ll play a typical product owner here.

> We need a sign in feature. A client should pass their username and password,
> this should be checked against our database and, if all is good, we should
> display the success message. If it’s not good, we show the error. To avoid
> enumeration, we always show the same error. No designs are specified as of
> yet, it will be provided later.

Before you get smart, no, you can’t say “we won’t implement without visuals” and
call it a day. I am a really stubborn product owner.

Jokes aside, we know what to do. Simple form, two inputs and a button. On submit
the creds are being pushed to the backend, it responds with either 200 (for OK)
or 401 (for not OK). Sounds simple, I’d say two weeks should suffice.

Wait, but I am not charing by the hour here. Okay, let’s do it now.

## Writing tests for small components

As mentioned earlier, I am using my starter, so for having an Input component,
I’ll generate the atom with

```bash
~ npm run generate:ui;
```

and will name it “input”.

Great, now let’s decide what it should do? Definitely should

- properly render;
- display a default value;
- emit an event when the value changes;
- change the type, for example to “password”.

So, we should have four tests. Let’s go!

```tsx
// ./src/ui/atoms/Input/Input.test.tsx

describe("UI / atom / Input", () => {
  it("should render", () => {});

  it("should render with value", () => {});

  it("should emit change event", () => {});

  it("should change input type", () => {});
});
```

As my friend Shlomo used to said, GOOD! Moving on, to implementation:

```tsx
// ./src/ui/atoms/Input/Input.test.tsx

import type { ChangeEvent } from "react";

import { fireEvent, render } from "@testing-library/react";

import Input from "./Input";

describe("UI / atom / Input", () => {
  const PLACEHOLDER = "Hello, World!";

  it("should render", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder={PLACEHOLDER} />
    );

    expect(getByPlaceholderText(PLACEHOLDER)).not.toBeNull();
    expect(
      getByPlaceholderText(PLACEHOLDER) instanceof HTMLInputElement
    ).toBeTruthy();
  });

  it("should render with value", () => {
    const text = "example";
    const { getByPlaceholderText } = render(
      <Input placeholder={PLACEHOLDER} defaultValue={text} />
    );

    expect(getByPlaceholderText(PLACEHOLDER).getAttribute("value")).toBe(text);
  });

  it("should emit change event", () => {
    const changeFn: (input: string) => void = vitest.fn();

    const { getByPlaceholderText } = render(
      <Input
        placeholder={PLACEHOLDER}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeFn(e.target.value)
        }
      />
    );

    fireEvent.change(getByPlaceholderText(PLACEHOLDER), {
      target: { value: "example" },
    });

    expect(changeFn).toHaveBeenCalledWith("example");
  });

  it("should change input type", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder={PLACEHOLDER} type="password" />
    );

    expect(getByPlaceholderText(PLACEHOLDER).getAttribute("type")).toBe(
      "password"
    );
  });
});
```

Tests done, let’s run it!

Yeah, they broke. Completely normal. Let’s fix it! The good thing is, most of
the code is handled for us by the browser, so all we need to do is to make sure
all is fine type-wise:

```tsx
// ./src/ui/atoms/Input/Input.tsx

import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  type?: string;
}

export default function Input({ type = "text", ...props }: Props) {
  return <input type={type} {...props} />;
}
```

I am adding the `type` props, as for some reason it’s not being picked up, even
though it is defined (`node_modules/typescript/lib/lib.dom.d.ts:11237`).

Running tests now works perfectly!

Great, we’re almost done with the small components. But boy, do I have a cracker
saved for last.

Each interface needs a text component, right? Let’s create one that’ll have
customizable tags!

```tsx
// ./src/ui/atoms/Text/Text.test.tsx

import { render } from "@testing-library/react";

import Text from "./Text";

describe("UI / atom / Text", () => {
  const TEXT = "Hello";

  it("should render properly", () => {
    const { getByText } = render(<Text>{TEXT}</Text>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it("should change the tag accordingly", () => {
    const heading = render(<Text variant="heading">{TEXT}</Text>);
    const regular = render(<Text>{TEXT}</Text>);
    const listItem = render(<Text variant="list">{TEXT}</Text>);

    expect(heading.container.querySelector("h2")).toBeInTheDocument();
    expect(regular.container.querySelector("p")).toBeInTheDocument();
    expect(listItem.container.querySelector("li")).toBeInTheDocument();
  });

  it("should allow to force the tag", () => {
    const { container } = render(<Text as="h1">{TEXT}</Text>);

    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("should make the text bold", () => {
    const { container } = render(<Text bold>{TEXT}</Text>);

    expect(container.querySelector(".font-bold")).toBeInTheDocument();
  });

  it("should make the text italic", () => {
    const { container } = render(<Text italic>{TEXT}</Text>);

    expect(container.querySelector(".italic")).toBeInTheDocument();
  });

  it("should change the color of the text", () => {
    const { container } = render(<Text color="red">{TEXT}</Text>);

    expect(container.querySelector(".text-red")).toBeInTheDocument();
  });
});
```

Lengthy! But it’s extremely flexible and type-safe bad boy. Implementation
relies mostly of TypeScript wizardly (inspired by
[Gabin at StackOverflow](https://stackoverflow.com/a/66568474/1409674)):

```tsx
// ./src/ui/atoms/Text/Text.tsx

import type {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  JSX,
} from "react";

interface Props<T extends ElementType>
  extends HTMLAttributes<JSX.IntrinsicElements> {
  variant?: "heading" | "list" | "paragraph";
  as?: T;
  bold?: boolean;
  italic?: boolean;
  color?: string;
}

type ReturnProps<P extends ElementType> = Props<P> &
  Omit<ComponentPropsWithoutRef<P>, keyof Props<P>>;

export default function Text<T extends ElementType = "p">({
  variant,
  bold,
  italic,
  className,
  as,
  ...rest
}: ReturnProps<T>) {
  const classNames = [className];
  let Tag: ElementType;

  switch (variant) {
    case "heading":
      Tag = "h2";
      break;
    case "list":
      Tag = "li";
      break;
    case "paragraph":
    default:
      Tag = "p";
      break;
  }

  if (as) {
    Tag = as;
  }

  if (bold) {
    classNames.push("font-bold");
  }

  if (italic) {
    classNames.push("italic");
  }

  if (rest.color) {
    classNames.push(`text-${rest.color}`);
  }

  return <Tag className={classNames.join(" ")} {...rest} />;
}
```

Great, we’re done with small components. Let’s create something bigger now and
see how we can utilize already written tests!

## Testing larger components

Every input should have an accessible `label` element next to it, right? So
instead of pairing `Text` and `Input` atoms all the time, let’s create a
molecule that’ll do it for us!

```bash
~ npm run generate:ui;
```

A molecule, also named `Input` is ready. As always, we need it to:

- render properly;
- allow to pass properties to the input;
- allow to pass properties to the label.

Everything else, like reacting to input, was already tested, so we _only test
what’s new_.

```tsx
// ./src/ui/molecules/Input/Input.test.tsx

import { render } from "@testing-library/react";

import Input from "./Input";

describe("UI / molecule / Input", () => {
  const LABEL = "Hello";

  it("should render properly", () => {
    const { container } = render(<Input label={LABEL} />);

    expect(container.querySelector("input")).toBeInTheDocument();
    expect(container.querySelector("label")).toBeInTheDocument();
  });

  it("should allow classes for input", () => {
    const { container } = render(
      <Input label={LABEL} className="test-class" />
    );

    expect(container.querySelector("input")).toHaveClass("test-class");
  });

  it("should allow classes for label", () => {
    const { container } = render(
      <Input label={LABEL} labelClassName="test-class" />
    );

    expect(container.querySelector("label")).toHaveClass("test-class");
  });
});
```

Implementation is actually really simple, as it’s mostly composition:

```tsx
// ./src/ui/molecules/Input/Input.tsx

import type { HTMLProps } from "react";

import { Input as BaseInput, Text } from "@ui/atoms";

interface Props extends HTMLProps<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

export default function Input({
  label,
  labelClassName,
  className,
  ...rest
}: Props) {
  const labelClassNames = [labelClassName, "block"];
  const inputClassNames = [className, "border", "rounded", "p-2"];

  if (!label) {
    console.warn(
      "[MOLECULES/INPUT] If you are not using a label, use Atoms/Input instead."
    );
  }

  return (
    <div className="mb-2">
      {label && (
        <Text
          className={labelClassNames.join(" ")}
          as="label"
          htmlFor={rest.name}
        >
          {" "}
          {label}
        </Text>
      )}

      <BaseInput className={inputClassNames.join(" ")} {...rest} />
    </div>
  );
}
```

Tests ran? All green? Perfect then! So now, let’s create an entire organism for
the sign in. We will, again, test only the new things.

It should:

- render both username and password inputs;
- on submit emit username and password;
- should render error message when a prop is passed;
- should render success message when a prop is passed;
- should render loading message when a prop is passed.

Sounds simple enough. Again, with the exception of business logic for sending
the credentials, this is just composition.

```tsx
// ./src/ui/organisms/SignIn/SignIn.text.tsx

import { fireEvent, render } from "@testing-library/react";

import SignIn from "./SignIn";

describe("UI / organism / SignIn", () => {
  const USERNAME_LABEL = "Username";
  const PASSWORD_LABEL = "Password";

  const defaultSubmitFn = vitest.fn();

  it("should render username and password input", () => {
    const { getByLabelText } = render(<SignIn onSubmit={defaultSubmitFn} />);

    expect(getByLabelText(USERNAME_LABEL)).toBeInTheDocument();
    expect(getByLabelText(PASSWORD_LABEL)).toBeInTheDocument();
  });

  it("should emit username and password on submit", () => {
    const USERNAME = "username";
    const PASSWORD = "password";

    const handleSubmit = vitest.fn();

    const { getByLabelText, getByText } = render(
      <SignIn onSubmit={handleSubmit} />
    );

    fireEvent.change(getByLabelText(USERNAME_LABEL), {
      target: { value: USERNAME },
    });

    fireEvent.change(getByLabelText(PASSWORD_LABEL), {
      target: { value: PASSWORD },
    });

    getByText("Submit").click();

    expect(handleSubmit).toHaveBeenCalledWith({
      username: USERNAME,
      password: PASSWORD,
    });
  });

  it("should render error message", () => {
    const ERROR_MESSAGE = "Error message";

    const { getByRole } = render(
      <SignIn onSubmit={defaultSubmitFn} error={ERROR_MESSAGE} />
    );

    const alert = getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert.innerText).toBe(ERROR_MESSAGE);
  });

  it("should render loading state", () => {
    const { getByTestId } = render(
      <SignIn onSubmit={defaultSubmitFn} loading />
    );

    expect(getByTestId("loading")).toBeInTheDocument();
  });

  it("should render success", () => {
    const { getByRole } = render(<SignIn onSubmit={defaultSubmitFn} success />);

    expect(getByRole("alert")).toBeInTheDocument();
  });
});
```

```tsx
// ./src/ui/organisms/SignIn/SignIn.tsx

import type { FormEvent, FormEventHandler } from "react";

import { useRef } from "react";
import { Button, Loading, Text } from "@ui/atoms";
import { Input } from "@ui/molecules";

interface Props
  extends Omit<FormEventHandler<HTMLFieldSetElement>, "onSubmit"> {
  onSubmit: (data: {
    username: string;
    password: string;
  }) => void | Promise<void>;
  error?: string;
  loading?: boolean;
  success?: boolean;
}

export default function SignIn({
  onSubmit,
  error,
  loading,
  success,
  ...rest
}: Props) {
  const credentials = useRef({ username: "", password: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (credentials.current.username && credentials.current.password) {
      try {
        await onSubmit(credentials.current);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleChange(value: string) {
    return (e: FormEvent<HTMLInputElement>) => {
      credentials.current = {
        ...credentials.current,
        [value]: e.currentTarget.value,
      };
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Text as="div" role="alert" className="text-red-500 bg-red-50">
          {error}
        </Text>
      )}

      {loading && <Loading data-testid="loading">Loading...</Loading>}

      {success && (
        <Text as="div" role="alert" className="text-green-500 bg-green-50">
          Sign in success
        </Text>
      )}

      <fieldset {...rest}>
        <Text as="legend" className="text-xl bold mb-3">
          Sign in
        </Text>

        <Input
          label="Username"
          name="username"
          id="username"
          disabled={loading ?? success}
          onChange={handleChange("username")}
        />
        <Input
          label="Password"
          name="password"
          id="password"
          type="password"
          disabled={loading ?? success}
          onChange={handleChange("password")}
        />

        <Button type="submit" className="rounded p-2 bg-blue-300 text-blue-900">
          Submit
        </Button>
      </fieldset>
    </form>
  );
}
```

One thing here! ESLint’s “no misused promises” will emit an error, because on
L#49 we are passing an async function, and `onSubmit` on form wants a
synchronous function (returning `void`, not `Promise<void>`). We can “hack” this
by disabling checking such things:

```js
// ./eslint.config.js

rules: {
  ...,
  "@typescript-eslint/no-misused-promises": [
    "error",
    { checksVoidReturn: { attributes: false } },
  ],
}
```

…or you can simply suppress the error with
`// eslint-disable-next-line @typescript-eslint/no-misused-promises`. Up to you.

## Testing an actual feature

All right, we have all the UI, let’s write the feature. Again, I’ll generate
one:

```bash
~ npm run generate:feature
```

This generator does not generate a test, so I’ll create the file.

Testing a business-critical feature will require us to double some of the tests,
simply because we will be testing how it _integrates_ with our UI.

It is important to avoid testing the actual implementation – it’s something that
might change in the future, and our tests should tell whether the change broke
something or not. For example, if we write a test checking whether the URL we
are calling is `/auth/sign-in`, and in the future we’ll change it to
`/auth/login`, our tests will fail for the wrong reason. If we will change the
protocol to GraphQL from REST, our tests, again, will fail for the long reason.
_Always test what the users sees, not what they execute_.

Our only requirements for the feature are:

- display the success message if all’s good;
- display the error message if there’s an error.

By saying “all’s good”, we mean “payload was sent to the backend and it returned
200”.

```tsx
// ./src/features/SignIn/SignIn.test.tsx

import { act, fireEvent, render, waitFor } from "@testing-library/react";

import SignIn from "./SignIn";

function setup() {
  const renderResult = render(<SignIn />);
  const emailInput = renderResult.getByLabelText("Username");
  const passwordInput = renderResult.getByLabelText("Password");
  const submitButton = renderResult.getByText("Submit");

  return {
    ...renderResult,
    emailInput,
    passwordInput,
    submitButton,
  };
}

describe("Feature / SignIn", () => {
  const VALID_EMAIL = "hello@buszewski.com";
  const VALID_PASSWORD = "password";

  it("should show success message after successful sign in", async () => {
    const { getByText, emailInput, passwordInput, submitButton } = setup();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    act(() => {
      fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
      submitButton.click();
    });

    await waitFor(() => {
      expect(getByText("Sign in success")).toBeInTheDocument();
    });
  });

  it("should show error message after unsuccessful sign in", async () => {
    const { getByText, emailInput, passwordInput, submitButton } = setup();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    act(() => {
      fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: "wrong-password" } });
      submitButton.click();
    });

    await waitFor(() => {
      expect(getByText("Sign in failed")).toBeInTheDocument();
    });
  });
});
```

Only two tests. We could go for more, capture the moment it displays the
“Loading” state, but to cut down on an already lengthy material, I am going with
the minimum.

Implementation is, again, mostly composition, apart from the actual business
logic:

```tsx
// ./src/features/SignIn/SignIn.tsx

import { useState } from "react";
import { API_URL } from "@config/consts.ts";
import { SignIn as View } from "@ui/organisms";

function useSignIn() {
  const [state, setState] = useState<
    undefined | "loading" | "error" | "success"
  >();

  async function signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    setState("loading");

    try {
      const request = await fetch(`${API_URL}/auth/sign-in`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!request.ok) {
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setState("error");
    }
  }

  return { state, signIn };
}

export default function SignIn() {
  const { state, signIn } = useSignIn();

  return (
    <View
      onSubmit={signIn}
      loading={state === "loading"}
      error={state === "error" ? "Sign in failed" : undefined}
      success={state === "success"}
    />
  );
}
```

Okay, let’s run it!

Ohhhh, doesn’t work. Whyyyyyy?

Right, we don’t actually have the backend defined. But that’s not a problem,
let’s mock it.

```tsx
// ./mocks/signin/signin.ts

import { API_URL } from "@config/consts.ts";
import { http, HttpResponse } from "msw";

const signIn = http.post(`${API_URL}/auth/sign-in`, async ({ request }) => {
  const { password } = (await request.json()) as { password: string };

  if (password.includes("wrong")) {
    return new HttpResponse("Sign in failed", { status: 401 });
  }

  return new HttpResponse("Sign in successful", { status: 200 });
});

export const signin = [signIn];
```

Writing a simple mock that’ll return 200 unless the password includes the word
“wrong” should solve the problem. Let’s enable it.

```ts
// ./mocks/handlers.ts

import { signin } from "./signin/signin.ts";

export const handlers = [...signin];
```

Let’s run the tests again. Working!

## Clarifications

This piece takes a lot of shortcuts.

- For starters, you should never test against strings – that’s what imports and
  content dictionaries are for.
- Using a native `fetch` and `useSignIn` hook works here, but it’s not a
  scalable solution, so replacing it with something like React Query is
  recommended.
- Hardcoding URIs is a terrible idea, and it should be either handled by client
  generated from Swagger, or at least by a dictionary, similarly to strings.

I took these liberties to focus on the main problem – TDD in React – and not to
spend too much time polishing things around. It would require either a very
lengthy and quite boring video, or significant jumps which would just be bad to
watch or read.

—

Test-driven Development, as mentioned earlier, is a great way to develop your
applications. It takes more time, but awards you with tested software you can
push further with confidence.

—

Git repository:
[https://github.com/tomekbuszewski/react-tdd](https://github.com/tomekbuszewski/react-tdd)
