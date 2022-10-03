import React, { FC, ReactElement } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from "@chakra-ui/react";

export const BaseModal: FC<{ content: ReactElement | string; title: string; isOpen: boolean; onClose: () => void }> =
({ content, title, isOpen, onClose }) => {
    const color = useColorModeValue("primary.900", "primary.300");
    const colorInverse = useColorModeValue("primary.300", "primary.900");
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} motionPreset={"slideInRight"} size="xs">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        backgroundColor={colorInverse}
                    >{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody backgroundColor={color}>
                        {content}
                    </ModalBody>

                    <ModalFooter backgroundColor={colorInverse}>
                        <Button mr={3} onClick={onClose} color={color}>{"Close"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};