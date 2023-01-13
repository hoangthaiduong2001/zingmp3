import actionTyes from "./actionTypes";
import * as apis from '../../apis'

export const getHome = () => async (dispatch) => {
    try {
        const response = await apis.getHome()

        if(response?.data.err === 0){
            dispatch({
                type: actionTyes.GET_HOME,
                homeData: response.data.data.items
            })
        } else{
            dispatch({
                type: actionTyes.GET_HOME,
                homeData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTyes.GET_HOME,
            homeData: null
        })
    }
}