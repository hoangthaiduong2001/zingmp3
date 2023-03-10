import React, { useState, memo, useEffect } from "react";
import icons from "../ultis/icons";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import { apiGetDetailPlaylist } from "../apis";
import Scrollbars from "react-custom-scrollbars-2";

const { ImBin2 } = icons;
const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState();
  const { curSongData, curAlbumId, isPlaying, recentSongs } = useSelector(
    (state) => state.music
  );
  // console.log(curSongData)
  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId);
    if (response?.data?.err === 0)
      setPlaylist(response?.data?.data?.song?.items);
  };
  useEffect(() => {
    curAlbumId && fetchDetailPlaylist();
  }, []);
  useEffect(() => {
    if (curAlbumId && isPlaying) fetchDetailPlaylist();
  }, [curAlbumId, isPlaying]);
  console.log(recentSongs)
  return (
    <div className="flex flex-col text-xs w-full h-full">
      <div className="h-[70px] flex-none py-[14px] px-2 gap-8 flex items-center justify-between">
        <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            className={`py-[5px] px-[5px] ${
              !isRecent && "bg-main-100"
            } flex flex-1 justify-center items-center  rounded-l-full rounded-r-full`}
            onClick={() => setIsRecent((prve) => !prve)}
          >
            Danh sách phát
          </span>
          <span
            className={`py-[5px] px-[5px] ${
              isRecent && "bg-main-100"
            } flex flex-1 justify-center items-center  rounded-l-full rounded-r-full`}
            onClick={() => setIsRecent((prve) => !prve)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 rounded-full hover:bg-main-100 cursor-pointer">
          <ImBin2 size={14} />
        </span>
      </div>
      {isRecent ? (
        <div>Nghe gan day</div>
      ) : (
        <div className="w-full flex-auto flex flex-col px-2">
          <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SongItem
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData?.artistsNames}
              sid={curSongData?.encodeId}
              sm
              style="bg-main-500 text-white"
            />
            <div className="flex flex-col text-black pt-[15px] px-2 pb-[5px]">
              <span className="text-sm font-bold">Tiếp theo</span>
              <span className="opacity-70 text-xs flex gap-1">
                <span>Từ Playlist</span>
                <span className="font-semibold text-main-500">
                  {curSongData?.album?.title.length > 30
                    ? `${curSongData?.album?.title.slice(0, 30)}...`
                    : curSongData?.album?.title}
                </span>
              </span>
            </div>
            {playlist && (
              <div className="fex flex-auto flex-col">
                {playlist?.map((item) => (
                  <SongItem
                    key={item?.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    sm
                  />
                ))}
              </div>
            )}
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

export default memo(SidebarRight);
