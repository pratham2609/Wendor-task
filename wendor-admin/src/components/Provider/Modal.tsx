import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { EditIcon } from "../Icons";


interface ModalProviderProps {
    children: React.ReactNode;
    action: () => void;
    title: string;
    loading?: boolean;
    btnText?: string;
    full?: boolean;
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    fullScreen?: boolean;
}
export default function ModalProvider({
    children,
    action,
    title,
    loading,
    btnText,
    full = true,
    fullScreen = false,
    isOpen,
    setIsOpen
}: ModalProviderProps) {
    return (
        <>
            {btnText && (btnText === "edit" ? <button onClick={() => setIsOpen(true)} className="text-lg text-default-400 active:opacity-50">
                <EditIcon />
            </button> : <Button className="bg-black text-white font-medium" onPress={() => setIsOpen(true)}>{btnText}</Button>)}
            <Modal size={full ? "full" : "2xl"} style={{ width: !fullScreen && "70vw", height: fullScreen ? "100vh" : full ? "90vh" : "auto", borderRadius: "20px" }} isDismissable isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
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
        </>
    );
}
