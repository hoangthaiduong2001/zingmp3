import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsFillPlayFill,
  BsPauseFill,
  CiShuffle,
  RxVideo,
  GiMicrophone,
  BiWindows,
  BiVolumeFull,
} = icons;
const Player = () => {
  const audioEl = new Audio()
  const { curSongId, isPlaying } = useSelector(state => state.music);
  const [songInfo, setsongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setsongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    dispatch(actions.play(true));
    audioEl.src = source;
    audioEl.load();
    audioEl.play();
  }, [curSongId]);

  const handleTogglePlaying = () => {
    if (isPlaying) {
      dispatch(actions.play(false));
      audioEl.pause();
    } else {
      dispatch(actions.play(true));
      audioEl.play();
    }
  };

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-gray-500 text-xs">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-3 text-gray-600">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex flex-col items-center gap-2 justify-center py-2">
      <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <CiShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={handleTogglePlaying}
          >
            {isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>
        <div>progress</div>
      </div>
      <div className="w-[30%] flex-auto flex items-center justify-center gap-6 text-gray-600">
        <span className="cursor-pointer">
          <RxVideo size={16} />
        </span>
        <span className="cursor-pointer">
          <GiMicrophone size={16} />
        </span>
        <span className="cursor-pointer" title="Chế độ cửa sổ">
          <BiWindows size={16} />
        </span>
        <span className="cursor-pointer">
          <BiVolumeFull size={16} />
        </span>
      </div>
    </div>
  );
};

export default Player;
