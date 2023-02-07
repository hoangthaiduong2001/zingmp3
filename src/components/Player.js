import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";

const { AiFillHeart, AiOutlineHeart, BsThreeDots, MdSkipNext, MdSkipPrevious, CiRepeat, BsPlayFill, BsPauseFill, CiShuffle } = icons;
const Player = () => {
  const { curSongId } = useSelector((state) => state.music);
  const [songInfo, setsongInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await apis.apiGetDetailSong(curSongId);
      if (response.data.err === 0) {
        setsongInfo(response.data.data);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  const handleTogglePlaying = () => { 
    setIsPlaying(prve => !prve)
  }

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3  items-center">
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
        <div className="flex gap-4 pl-3">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex flex-col items-center gap-2 justify-center py-2">
        <div className="flex gap-8 items-center justify-center">
          <span className='cursor-pointer' title="Bật phát ngẫu nhiên"><CiShuffle size={24}/></span>
          <span className='cursor-pointer'><MdSkipNext size={24}/></span>
          <span 
          className="p-1 border hover:text-main-500 border-gray-700 rounded-full cursor-pointer"
          onClick={handleTogglePlaying}
          >
            {isPlaying ? <BsPauseFill size={30}/> : <BsPlayFill size={30}/>}
          </span>
          <span className='cursor-pointer'><MdSkipPrevious size={24}/></span>
          <span className='cursor-pointer' title="Bật phát lại tất cả"><CiRepeat size={24}/></span>
        </div>
        <div>
          progress
        </div>
      </div>
      <div className="w-[30%] flex-auto">Volumn</div>
    </div>
  );
};

export default Player;
