import "../app/app.css";
import { BrowserRouter } from "react-router";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
  },
};

export default preview;
