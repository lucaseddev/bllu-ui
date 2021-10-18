import { Box } from "components/box";
import { IconButton, Button } from "components/buttons";
import { Flex } from "components/flex";
import {
  Modal,
  ModalChildFunction,
  ModalProps,
} from "components/modal";
import isFunction from "is-function";
import React, { useEffect, useRef, useState } from "react";

import { BiX } from "react-icons/bi";

export interface DialogProps extends ModalProps {
  header?: React.ReactNode;

  onComplete: () => void;
  confirmLabel: string;
  cancelLabel?: string;

  danger?: boolean;
}

export const Dialog = React.memo(function (props: DialogProps) {
  const {
    header,
    children,
    confirmLabel,
    cancelLabel = "Cancelar",
    danger,
    ...rest
  } = props;

  const [
    buttonRef,
    setButtonRef,
  ] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef) {
      buttonRef?.focus();
    }
  }, [buttonRef]);

  return (
    <Modal {...rest} tabIndex={0}>
      {({ close }) => (
        <Box minw={300} rounded={3}>
          <Flex.Container
            direction="column"
            alignItems="stretch"
            spacing={0}
          >
            <Flex.Item>
              {/* Header */}
              <Box my={8} mx={6}>
                <Flex.Container alignItems="center" spacing={0}>
                  <Flex.Item sm>{header}</Flex.Item>
                  <Flex.Item>
                    <IconButton
                      onClick={close}
                      icon={BiX}
                      appearance="link"
                    />
                  </Flex.Item>
                </Flex.Container>
              </Box>
            </Flex.Item>

            <Flex.Item>
              {/* Content */}
              <Box mx={6} my={3}>
                {(isFunction(children) &&
                  (children as ModalChildFunction)({ close })) ||
                  children}
              </Box>
            </Flex.Item>

            <Flex.Item>
              {/* Footer */}
              <Box my={8} mx={6}>
                <Flex.Container justifyContent="flex-end" spacing={2}>
                  <Flex.Item>
                    <Button
                      ref={setButtonRef}
                      tabIndex={-1}
                      appearance="secondary"
                      onClick={close}
                    >
                      {cancelLabel}
                    </Button>
                  </Flex.Item>
                  <Flex.Item>
                    <Button danger={danger || false}>
                      {confirmLabel}
                    </Button>
                  </Flex.Item>
                </Flex.Container>
              </Box>
            </Flex.Item>
          </Flex.Container>
        </Box>
      )}
    </Modal>
  );
});
