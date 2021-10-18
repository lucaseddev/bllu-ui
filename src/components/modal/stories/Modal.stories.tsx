import React, { Children, useState } from "react";
import { Meta, Story } from "@storybook/react";

import { Modal, ModalProps } from "..";
import { Button } from "../../buttons/Button";
import { Box } from "../../box";

export default {
  title: "Components/Modal",
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args: ModalProps) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setShow(true)}>Show Modal</Button>
      <Modal {...args} open={show} onClose={() => setShow(false)} />
    </React.Fragment>
  );
};

export const BasicModal = Template.bind({});
BasicModal.args = {
  children: ({ close }) => (
    <Box p={3}>
      <span>This is a modal with content.</span>
      <Button onClick={close}>Close Modal</Button>
    </Box>
  ),
};
