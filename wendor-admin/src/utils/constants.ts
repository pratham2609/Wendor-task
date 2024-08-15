import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IconType } from "react-icons";
import { BsInboxesFill, BsBoxes } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";


interface DashboardNavItems {
    name: string;
    url: string;
    icon: IconType;
}

export const dashboardNavs: DashboardNavItems[] = [
    {
        name: 'dashboard',
        url: '/dashboard',
        icon: MdDashboard
    },
    {
        name: 'products',
        url: '/products',
        icon: BsBoxes
    },
    {
        name: 'inventory',
        url: '/inventory',
        icon: BsInboxesFill
    },
    {
        name: 'companies',
        url: '/companies',
        icon: HiOfficeBuilding
    },
    {
        name: 'settings',
        url: '/settings',
        icon: IoSettingsOutline
    },
]