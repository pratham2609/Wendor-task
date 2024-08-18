import ModalProvider from '../Provider/Modal'

export default function DeleteModal({ title, action, isOpen, setIsOpen }: { title: string, action: () => void, isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    return (
        <ModalProvider title={title} action={action} full={false} isOpen={isOpen} setIsOpen={setIsOpen}>
            Are you sure you want to delete the above items? The product maybe related to different sales.
        </ModalProvider>
    )
}
