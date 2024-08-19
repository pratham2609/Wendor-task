import { useState } from "react";
import ProfileView from "../../components/Dashboard/Profile/Profile";
import UpdatePassword from "../../components/Dashboard/Profile/UpdatePassword";

export default function Settings() {
  const [view, setView] = useState("profile");
  return (
    <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-5 items-center'>
      <div className='flex items-center w-full justify-between'>
        <h2 className='urbanist font-medium text-4xl'>
          Profile Settings
        </h2>
        <div className="flex items-center gap-4 h-full">
          <button onClick={() => setView("profile")} className={`font-medium px-4 rounded-md py-1.5 text-lg ${view === "profile" ? "text-pink" : ""}`}>Profile</button>
          <button onClick={() => setView("password")} className={`font-medium px-4 py-1.5 rounded-md text-lg ${view === "password" ? "text-pink" : ""}`}>Security</button>
        </div>
      </div>
      {view === "profile" ? <ProfileView /> : <UpdatePassword />}
    </section>
  )
}
