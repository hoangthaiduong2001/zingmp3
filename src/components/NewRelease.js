import { useState, useEffect } from "react"; 
import { useSelector } from "react-redux";
import { SongItem } from './'

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0)
  const [listSong, setListSong] = useState([])

  useEffect(() => {
    isActive ? setListSong(newRelease?.items?.others) : setListSong(newRelease?.items?.vPop)
  },[isActive, newRelease])
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{newRelease?.title}</h3>
        <span className="text-xs">TAT CA</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
           onClick={() => setIsActive(0)}
           type="button"
           className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 0 && 'bg-main-500 text-white'}`}
        >
            VIỆT NAM
        </button>
        <button
           onClick={() => setIsActive(1)}
           type="button"
           className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 1 && 'bg-main-500 text-white'}`}
        >
            QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {listSong?.map(item => (
          <SongItem 
            key={item.encodeId}
            thumbnail={item.thumbnail}
            title={item.title}
            artists={item.artistsNames}
            releaseDate={item.releaseDate}
            sid={item.encodeId}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
