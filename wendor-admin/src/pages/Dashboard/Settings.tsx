/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProfileView from "../../components/Dashboard/Profile/Profile";
import UpdatePassword from "../../components/Dashboard/Profile/UpdatePassword";
import { axiosInstance } from "../../utils/axiosInstance";
import { useAuthContext } from "../../context/AuthContext";

export default function Settings() {
  const [view, setView] = useState("profile");
  const { updateUser } = useAuthContext();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user");
        if (res.data.success) {
          updateUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
    document.title = "Wendor | Settings"
  }, []);
  return (
    <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-5 items-center'>
      <div className='flex items-center w-full justify-between'>
        <h2 className='urbanist font-medium xl:text-4xl lg:text-3xl text-2xl'>
          Profile Settings
        </h2>
        <div className="flex items-center xl:gap-4 lg:gap-3 gap-1 h-full">
          <button onClick={() => setView("profile")} className={`font-medium xl:px-4 lg:px-3 md:px-2 px-1 rounded-md py-1.5 xl:text-lg md:text-base text-sm ${view === "profile" ? "text-pink" : ""}`}>Profile</button>
          <button onClick={() => setView("password")} className={`font-medium xl:px-4 lg:px-3 md:px-2 px-1 py-1.5 rounded-md xl:text-lg md:text-base text-sm ${view === "password" ? "text-pink" : ""}`}>Security</button>
        </div>
      </div>
      {view === "profile" ? <ProfileView /> : <UpdatePassword />}
    </section>
  )
}
