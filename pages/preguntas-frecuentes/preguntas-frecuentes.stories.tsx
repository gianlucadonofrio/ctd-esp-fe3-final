import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Faqs from "./index.page";

export default {
  title: "Pages/PreguntasFrecuentes",
  component: Faqs,
} as ComponentMeta<typeof Faqs>;

const Template: ComponentStory<typeof Faqs> = (args) => <Faqs {...args} />;
export const Default = Template.bind({});
Default.args = {};
