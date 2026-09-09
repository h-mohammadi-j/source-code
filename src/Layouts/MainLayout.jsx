import { Outlet } from "react-router-dom"
import Mobile from "../components/Mobile"
// import Sidebar from "../components/Sidebar"
import Modal from "../components/Modal"

import UserNotif from "../components/UserNotif"


const MainLayout = () => {
  
  return (
    <div className="flex text-white">
        <Mobile />

        {/* <Sidebar /> */}

        <main className="bg-[var(--main-bg)] w-full h-screen ">
            <UserNotif />
            <Outlet />
            
        </main>
    </div>
  )
}

export default MainLayout