import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

export default function DrawerComponent({ heading = "", children, isDrawerOpen = false, setIsDrawerOpen = () => { } }: {
    heading: string;
    children: React.ReactNode;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (value: boolean) => void;
}) {
    return (
        <Drawer
            isOpen={isDrawerOpen}
            placement={"left"}
            size={"sm"}
            onClose={() => setIsDrawerOpen(false)}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{heading}</DrawerHeader>

                <DrawerBody>
                    {children}
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}