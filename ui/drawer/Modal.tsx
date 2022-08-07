import React, { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  Text,
  ModalBodyProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { MdReadMore } from "react-icons/md";
interface CustomModalProps extends ModalProps {
  modalTitle: string;
  controls?: ReactNode;
  modalBodyProps?: ModalBodyProps;
  disableCloseButton?: boolean;
  altActionComponent?: JSX.Element;
}

const CustomModal = ({
  controls,
  modalTitle,
  children,
  modalBodyProps,
  altActionComponent,
  disableCloseButton,
  ...rest
}: CustomModalProps) => {
  return (
    <Modal {...rest} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text tabIndex={0} as="h2">
            {modalTitle}
          </Text>
          {altActionComponent ? altActionComponent : null}
          <ModalCloseButton
            marginInlineStart="1ch"
            pos="initial"
            borderRadius="md"
            minW={10}
            h={10}
          />
        </ModalHeader>

        <ModalBody {...modalBodyProps}>{children}</ModalBody>
        <ModalFooter> {controls} </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

export const AltActionButton = React.forwardRef(
  (props: IconButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <IconButton ref={ref} {...props} icon={<MdReadMore />} />
  )
);
