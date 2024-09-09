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
import { accentTwo, textColor1 } from "../themeSettings";

function ModalComponent({ isOpen, onOpen, onClose, content }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="none"
        justify="center"
        gap="10px"
        m={3}
        position="relative"
      >
        {content}
        <Button width="100%" onClick={onClose} borderRadius="20px">
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
