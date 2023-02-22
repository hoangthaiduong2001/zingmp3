import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight, Header, Loading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const { isLoading } = useSelector(state => state.app);
  const [isShowRightSideBar, setIsShowRightSideBar] = useState(true);
  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] min-h-screem flex-none border border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto flex flex-col border border-red-500 relative">
          { isLoading && 
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-main-200 z-30 flex items-center justify-center">
            <Loading />
          </div>}
          <div className=" h-[70px] px-[59px] flex items-center">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{width: '100%', height: '100%'}}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowRightSideBar && (
          <div className="w-[329px] hidden 1100:flex flex-none border border-blue-500 animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px] z-50">
        <Player setIsShowRightSideBar={setIsShowRightSideBar}/>
      </div>
    </div>
  );
};

export default Public;
