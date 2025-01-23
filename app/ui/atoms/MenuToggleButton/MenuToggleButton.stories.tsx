import { useState } from "react";

import type { Meta } from "@storybook/react";

import MenuToggleButton from "./MenuToggleButton";

export const Primary = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <p>Status: {isOpen ? "Open" : "Closed"}</p>
      <MenuToggleButton
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default {
  title: "Atoms/MenuToggleButton",
  component: MenuToggleButton,
} satisfies Meta<typeof MenuToggleButton>;
