import React, { Children, useState } from "react";
import { Meta, Story } from "@storybook/react";

import { Dialog, DialogProps } from "..";
import { Button } from "../../buttons/Button";
import { Box } from "../../box";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as Meta;

const Template: Story<DialogProps> = (args: DialogProps) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setShow(true)}>Show Dialog</Button>
      <Dialog
        open={show}
        confirmLabel="Confirmar"
        {...args}
        onClose={() => setShow(false)}
      />
    </React.Fragment>
  );
};

export const BasicDialog = Template.bind({});
BasicDialog.args = {
  header: "Just a simple dialog!",
  children: ({ close }) => (
    <Box p={3}>
      <span>This is a dialog with content.</span>
      <Button onClick={close}>Close dialog</Button>
    </Box>
  ),
};

export const DangerDialog = Template.bind({});
DangerDialog.args = {
  danger: true,
  header: "Delete Product",
  confirmLabel: "Delete",
  cancelLabel: "Cancel",
  children: (
    <Box p={3}>
      <span>
        Are you sure about deleting this? This action cannot be
        undone.
      </span>
    </Box>
  ),
};
