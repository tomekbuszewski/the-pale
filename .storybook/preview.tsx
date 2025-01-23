import "@app.scss";
import { BrowserRouter } from "react-router";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist+Mono:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <Story />
        </>
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
