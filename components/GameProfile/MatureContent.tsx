'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

const MatureContent = ({ notes }: { notes: string }) => {
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter()

    useEffect(() => {
        // onOpen()
    }, [])

    const handleClose = (onClose: any) => {
        onClose()
        router.back()
    }
    return (
        <>
            <Modal >
                {/* <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure ?</ModalHeader>
                            <ModalBody>
                                <p>
                                    {notes || 'Game may contains mature content'}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => handleClose(onClose)}>
                                    No
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent> */}
            </Modal>
        </>
    );
}

export default MatureContent
