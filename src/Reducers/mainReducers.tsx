import { 
    RUN_LOGIN, 
    RUN_LOGOUT
} from '../Actions/types';

const initialState = {
    accessToken: ''
}

interface Action {
    type: String;
    payload?: any
}

export default function(state = initialState, action: Action) {
    switch (action.type) {
        case RUN_LOGIN:
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        case RUN_LOGOUT:
            return {
                ...state,
                accessToken: ''
            }
        default: 
            return state;
    }
}