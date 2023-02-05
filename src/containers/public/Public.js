import React from "react";
import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight, Header } from "../../components";

const Public = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] min-h-screem flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-500">
          <div className="h-[70px] px-[59px] flex items-center mb-5">
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="w-[329px] hidden 1100:flex flex-none border border-blue-500 animate-slide-left">
          <SidebarRight />
        </div>
      </div>
      <div className="flex-none h-[90px]">
        <Player />
      </div>
    </div>
  );
};

export default Public;
