import React, { useState } from "react";
//
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Spacer,
  Center,
} from "@chakra-ui/react";
//
import { Dna } from "react-loader-spinner";

export default function LoadingModal() {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        size={"xs"}
        isCentered
        finalFocusRef={null}
      >
        <ModalOverlay bg="Alpha.300" backdropFilter="blur(1px)" />
        <ModalContent>
          <ModalBody>
            <Center>
              <Spacer />
              <Text fontSize={"30"}>🛠️</Text>
              <Spacer />
              <Dna
                height="80"
                width="80"
                visible={true}
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <Spacer />
              <Text fontSize={"30"}>🚀</Text>
              <Spacer />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
