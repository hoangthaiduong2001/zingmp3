import { useState } from "react"; 
import { useSelector } from "react-redux";

const NewRelease = () => {
  const [isActive, setIsActive] = useState(0)
  const { newRelease } = useSelector((state) => state.app);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{newRelease?.title}</h3>
        <span className="text-xs">TAT CA</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
           type="button"
           className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 0 && 'bg-main-500 text-white'}`}
        >
            VietNam
        </button>
        <button
           type="button"
           className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActive === 1 && 'bg-main-500 text-white'}`}
        >
            VietNam
        </button>
      </div>
    </div>
  );
};

export default NewRelease;
