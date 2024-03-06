import { useEffect, useState } from "react";
//
import {
  IconButton,
  Box,
  Text,
  FormControl,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  Icon,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
//
import { MdDeleteForever } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
//
import deleteUserFile from "../../utils/deleteUserFile";

export default function DeleteFile({ uid, actualFilename, onFileDeleted }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filename, setFilename] = useState("");
  const toast = useToast();

  const deleteFile = async () => {
    if (filename && filename === actualFilename) {
      try {
        await deleteUserFile(uid, actualFilename); // You need to get the uid from somewhere
        toast({
          title: "File Deleted",
          description: `${actualFilename} has been deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onFileDeleted(); // Call the callback function
      } catch (error) {
        toast({
          title: "Error Deleting File",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } else {
      toast({
        title: "Wrong Filename",
        description: "Please enter correct filename to delete.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="red"
        variant="solid"
        onClick={onOpen} // Open the modal when the button is clicked
      >
        <Icon as={MdDeleteForever} boxSize={5} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        motionPreset="slideInTop"
        isOpen={isOpen}
        onClose={onClose}
        defaultIsOpen={true} // Open the modal by default
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader lineHeight={1.1} fontSize={"2xl"}>
            Are you Sure?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg={useColorModeValue("white", "gray.700")} rounded={"xl"}>
            <Text
              mt={-4}
              mb={2}
              fontSize={"md"}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              Type the filename in lowercase to confirm:
            </Text>
            <FormControl id="filename">
              <Input
                placeholder="Your file name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    deleteFile();
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              _hover={{
                bg: "red.500",
              }}
              rightIcon={<MdDeleteForever />}
              mr={3}
              onClick={deleteFile}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
