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
} from "@chakra-ui/react";

const CustomModal = ({
  controls,
  modalTitle,
  children,
  ...rest
}: CustomModalProps) => {
  return (
    <Modal {...rest} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter> {controls} </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

interface CustomModalProps extends ModalProps {
  modalTitle: string;
  controls?: ReactNode;
}
