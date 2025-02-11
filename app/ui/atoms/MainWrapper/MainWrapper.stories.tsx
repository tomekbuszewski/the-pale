import type { Meta, StoryObj } from "@storybook/react";

import MainWrapper from "./MainWrapper";

    export const Primary: StoryObj<typeof MainWrapper> = {
        args: {
        children: "Hello from Storybook",
        },
        };

        export default {
        title: "Atoms/MainWrapper",
        component: MainWrapper,
        } satisfies Meta<typeof MainWrapper>;
