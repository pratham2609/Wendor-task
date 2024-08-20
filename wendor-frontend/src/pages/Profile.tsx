import { useEffect, useState } from "react";
import ContainerWrapper from "../components/Global/ContainerWrapper";
import ProfileView from "../components/Profile/Profile";
import UpdatePassword from "../components/Profile/UpdatePassword";


export default function Profile() {
    const [view, setView] = useState("profile");
    useEffect(() => {
        document.title = "Wendor Shop | Products"
    }, [])
    return (
        <ContainerWrapper>
            <div className='w-full h-[80vh] flex flex-col xl:gap-10 md:gap-8 gap-6 lg:pt-10 md:pt-8 pt-0'>
                <div className='flex flex-col gap-5'>
                    <h1 className="font-bold xl:text-4xl lg:text-[32px] md:text-[28px] text-2xl">
                        Profile
                    </h1>
                    <div className="flex items-center gap-5 font-medium text-xl justify-start">
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
