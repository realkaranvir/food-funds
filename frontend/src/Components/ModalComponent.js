import React from "react";
import { Button, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { accentOne, primaryColor, textColor3 } from "../themeSettings";

function ModalComponent({ isOpen, onOpen, onClose, content }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        sx={{
          backdropFilter: "blur(5px)", // Blur the background of the modal
        }}
      />
      <ModalContent bg="none" gap="10px" m={3} boxShadow="none">
        {content}
        <Button
          width="100%"
          onClick={onClose}
          borderRadius="0"
          borderWidth="3px"
          borderColor={accentOne}
          color={textColor3}
          bg={primaryColor}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
