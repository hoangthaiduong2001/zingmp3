import actionTyes from "../actions/actionTypes";


const initState = {
    homeData: [],
    test: 'hello'
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTyes.GET_HOME:
            return state
    
        default:
            return state
    }
}

export default appReducer