import React from 'react';
import { 
  useDisclosure,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay
 } from '@chakra-ui/react';

import { Button } from "@chakra-ui/react";

type AuthModalProps = {
  
};

const AuthModal:React.FC<AuthModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This is Modal BOdy</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;