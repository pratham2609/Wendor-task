import DrawerComponent from '../Provider/Drawer'
import DashboardNav from './DashboardNav';

export default function DashboardNavDrawer({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    return (
        <DrawerComponent isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} heading='Wendor'>
            <DashboardNav />
        </DrawerComponent>
    )
}
