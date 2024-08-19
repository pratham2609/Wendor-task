import { useState } from "react";
import ContainerWrapper from "../components/Global/ContainerWrapper";
import ProfileView from "../components/Profile/Profile";
import UpdatePassword from "../components/Profile/UpdatePassword";


export default function Profile() {
    const [view, setView] = useState("profile");
    return (
        <ContainerWrapper>
            <div className='w-full h-[80vh] pt-10 gap-10 flex flex-col'>
                <div className='flex flex-col gap-5'>
                    <h1 className="font-bold xl:text-4xl lg:text-[32px] text-[28px]">
                        Profile
                    </h1>
                    <div className="flex items-center gap-2 font-medium text-xl justify-start">
                        <button onClick={() => setView("profile")} className={`${view === "profile" && "text-pink"}`}>Profile</button>
                        <button onClick={() => setView("security")} className={`${view === "security" && "text-pink"}`}>Security</button>
                    </div>
                </div>
                <div className="w-full h-[70vh] flex justify-center">
                    {view === "profile" ? <ProfileView /> : <UpdatePassword />}
                </div>
            </div>

        </ContainerWrapper>
    )
}
