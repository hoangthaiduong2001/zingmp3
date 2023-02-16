import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { Lists } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions"

const Album = () => {
  const { title, pid } = useParams();
  const [playlistData, setplaylistData] = useState({});
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setplaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
      }
    };
    fetchDetailPlaylist();
  }, [pid]);
  return (
    <div className="flex gap-8 w-full h-full px-[59px] mb-40">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <img
          src={playlistData?.thumbnailM}
          className="w-full object-contain rounded-md shadow-md"
        />
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[18px] font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-[13px]">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 text-center items-center justify-center text-gray-500 text-[13px]">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-[13px]">{`${playlistData?.like} người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto border border-blue-500">
          <span className="text-sm">
            <span className="text-gray-600">Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists
            totalDuration={playlistData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
