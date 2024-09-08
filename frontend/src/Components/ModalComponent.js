import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ModalComponent({ isOpen, onOpen, onClose, content }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="none" justify="center" gap="10px" m={3}>
        {content}
        <Button width="100%" onClick={onClose}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
