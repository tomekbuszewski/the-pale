import { fireEvent, render } from "@testing-library/react";

import Switch from "./Switch";

describe("UI / molecules / Switch", () => {
  const items = [
    { label: "First", href: "1" },
    { label: "Second", href: "2" },
    { label: "Third", href: "3" },
  ];

  it("renders all items as buttons", () => {
    const { getByText } = render(
      <Switch items={items} onChange={vitest.fn()} />,
    );

    items.forEach((item) => {
      expect(getByText(item.label)).toBeInTheDocument();
    });
  });

  it("selects first item by default", () => {
    const handleChange = vitest.fn();
    render(<Switch items={items} onChange={handleChange} />);

    expect(handleChange).toHaveBeenCalledWith(items[0].href);
  });

  it("calls onChange when clicking different items", () => {
    const handleChange = vitest.fn();
    const { getByText } = render(
      <Switch items={items} onChange={handleChange} />,
    );

    fireEvent.click(getByText(items[1].label));
    expect(handleChange).toHaveBeenCalledWith(items[1].href);

    fireEvent.click(getByText(items[2].label));
    expect(handleChange).toHaveBeenCalledWith(items[2].href);
  });

  it("passes through HTML props to container", () => {
    const { container } = render(
      <Switch
        items={items}
        onChange={vitest.fn()}
        data-testid="switch"
        className="test-class"
      />,
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveAttribute("data-testid", "switch");
    expect(div).toHaveClass("test-class");
  });
});
