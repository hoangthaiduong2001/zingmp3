import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { SongLoanding } from './'
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
  TbRepeatOnce,
  BsMusicNoteList,
  BiVolumeMute
} = icons;
var intervalId;
const Player = ( {setIsShowRightSideBar} ) => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setsongInfo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadedSource, setIsLoadedSource] = useState(true)
  const [isVolumn, setisVolumn] = useState(100)
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackef = useRef();

  useEffect(() => {
    setIsLoadedSource(false)
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true)
      if (res1.data.err === 0) {
        setsongInfo(res1.data.data); 
        dispatch(actions.setCurSongData(res1.data.data))
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        setCurSeconds(0);
        toast.warn(res2.data.msg);
        thumbRef.current.style.css = `right: 100%`;
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 100);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if(isShuffle){
        handleRandomSong()
      } else if(repeatMode){
        repeatMode === 1 ? handleRepeatOne() : handleNextSong()
      } else {
        audio.pause()
        dispatch(actions.play(false))
      }
    }
    audio.addEventListener('ended', handleEnded)

  return () => {
    audio.removeEventListener('ended', handleEnded)
  }
  }, [audio, repeatMode, isShuffle])

  useEffect(() => {
    audio.volume = isVolumn / 100
  }, [isVolumn])

  const handleTogglePlaying = async () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };
  const hanldeClickProgessbar = (e) => {
    const trackRect = trackef.current.getBoundingClientRect()
    const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = percent * songInfo.duration / 100
    setCurSeconds(Math.round(percent * songInfo.duration / 100))
  }

  const handleNextSong = () => {
    if(songs){
      let currentSongIndex
      songs.forEach((item, index) => {
        if(item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handlePrveSong = () => {
    if(songs){
      let currentSongIndex
      songs.forEach((item, index) => {
        if(item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handleRandomSong = () => {
      dispatch(actions.setCurSongId(songs[Math.round(Math.random() * songs?.length) - 1].encodeId))
      dispatch(actions.play(true))
    }

  const handleRepeatOne = () => {
    audio.play()
  }

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
          <span 
          className={`cursor-pointer ${isShuffle ? 'text-main-500' : 'text-black'}`}
          title="Bật phát ngẫu nhiên"
          onClick={() => setIsShuffle(prve => !prve)}
          >
            <CiShuffle size={24} />
          </span>
          <span className={`${!songs ? 'text-gray-400' : 'cursor-pointer'}`}
          onClick={handlePrveSong}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={handleTogglePlaying}
          >
            { !isLoadedSource ? <SongLoanding /> : isPlaying ? ( <BsPauseFill size={30} />) : ( <BsFillPlayFill size={30} />)}
          </span>
          <span className={`${!songs ? 'text-gray-400' : 'cursor-pointer'}`}
          onClick={handleNextSong}
          >
            <MdSkipNext size={24} />
          </span>
          <span 
          className={`cursor-pointer ${repeatMode && 'text-main-500'}`}
          title="Bật phát lại tất cả"
          onClick={() => setRepeatMode(prve => prve === 2 ? 0 : prve + 1)}
          >
            {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
          </span>
        </div>
        <div className="w-full mb-2 flex items-center justify-center gap-3 text-xs">
          <span className="pb-1">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div 
          className="w-3/5 h-[3px] hover:h-[8px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)] cursor-pointer"
          onClick={hanldeClickProgessbar}
          ref={trackef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]"
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
        <span className="cursor-pointer flex">
          <span onClick={() => setisVolumn(prve => prve == 0 ? 100 : 0)}>{isVolumn > 0 ? <BiVolumeFull size={16} /> : <BiVolumeMute />}</span>
          <input 
            type="range" 
            step={1} 
            min={0} 
            max={100}
            value={isVolumn}
            onChange={(e) => setisVolumn(e.target.value)}
          />
        </span>
        <span onClick={() => setIsShowRightSideBar(prve => !prve)} title="Danh sách phát" className="cursor-pointer p-1 rounded-sm bg-main-500 opacity-90 hover:opacity-100">
          <BsMusicNoteList size={16}/>
        </span>
      </div>
    </div>
  );
};

export default Player;
