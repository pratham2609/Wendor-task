import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";


interface ModalProviderProps {
    children: React.ReactNode;
    action: () => void;
    title: string;
    loading?: boolean;
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}
export default function ModalProvider({
    children,
    action,
    title,
    loading,
    isOpen,
    setIsOpen
}: ModalProviderProps) {
    return (
        <Modal size={"lg"} isDismissable isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 capitalize">{title}</ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button isLoading={loading} disabled={loading} className="bg-teal text-white" onPress={action}>
                                Done
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
