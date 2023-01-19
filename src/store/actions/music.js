import actionTyes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid)  => ({
    type: actionTyes.SET_CUR_SONG_ID,
    sid: sid
})