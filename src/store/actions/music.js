import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid)  => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid: sid
})

export const play = (flag)  => ({
    type: actionTypes.PLAY,
    flag
})

export const music = (flag)  => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum = (flag)  => ({
    type: actionTypes.SET_ALBUM,
    flag
})

export const setPlaylist = (songs)  => ({
    type: actionTypes.PLAYLIST,
    songs
})

// export const fetchDetailSong = (pid) => async (dispatch) => {
//     try {
//         const reponse = await apis.apiGetDetailPlaylist(pid)
//         if(reponse?.data.err === 0){
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: reponse.data?.data.song?.items
//             })
//         }
//     } catch (error) {
//         dispatch({
//            type: actionTypes.PLAYLIST,
//            songs: null
//         })
//     }
// }