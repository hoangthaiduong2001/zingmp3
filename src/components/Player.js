import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
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
var intervalId;
const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setsongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const dispatch = useDispatch();
  const thumbRef = useRef();

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
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else{
        setAudio(new Audio())
        dispatch(actions.play(false))
        setCurSeconds(0)
        toast.warn(res2.data.msg)
        thumbRef.current.style.css = `right: 100%`
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 100);
    }
  }, [audio, isPlaying]);

  const handleTogglePlaying = () => {
    if (isPlaying) {
      dispatch(actions.play(false));
      audio.pause();
    } else {
      dispatch(actions.play(true));
      audio.play();
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
        <div className="flex gap-8 justify-center items-center pt-5">
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
        <div className="w-full mb-2 flex items-center justify-center gap-3 text-xs">
          <span className="pb-1">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div className="w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]">
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span className="pb-1">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
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
