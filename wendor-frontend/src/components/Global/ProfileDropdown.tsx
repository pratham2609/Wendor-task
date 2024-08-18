import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileDropdown() {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuthContext();
    return (
        <Dropdown className="poppins">
            <DropdownTrigger>
                <button className='font-bold text-white capitalize bg-teal h-8 w-8 rounded-full flex items-center justify-center'>{user?.fullName[0]}</button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile dropdown">
                <DropdownItem key={"profile"} onClick={() => navigate("/profile")}>Profile</DropdownItem>
                <DropdownItem key={"add"} onClick={() => navigate("/orders")}>Orders</DropdownItem>
                <DropdownItem key={"logout"} className="bg-danger text-white" onClick={() => {
                    handleLogout();
                }}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
