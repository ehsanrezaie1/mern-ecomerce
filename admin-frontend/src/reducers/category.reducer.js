import { categoryConstants } from "../actions/constants"


const initState = {
    categories:[],
    loading: false,
    error:null
   // message: '',
   
}

export default (state = initState, action)=>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories:action.payload.categories
            }
            break;
    }
    return state;     
}