import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";

import {
  Content,
  Footer,
  Header,
  Layout,
  LayoutProps,
  Sidebar,
} from "..";

import { IconButton } from "../../buttons";
import { BiMenu } from "react-icons/bi";

export default {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Structure: Story<LayoutProps> = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <Layout>
      <Sidebar open={open}>This is a sidebar</Sidebar>

      <Layout>
        <Header>
          <IconButton
            icon={BiMenu}
            size="sm"
            onClick={() => setOpen(!open)}
          />
          This is the header
        </Header>
        <Layout>
          <Content>
            <div style={{ height: 1300 }}>This is the content</div>
          </Content>
          <Footer>This is the footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
