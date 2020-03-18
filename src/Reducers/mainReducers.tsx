import { 
    RUN_LOGIN, 
    LOADING_SEARCH,
    SEARCH_GITHUB,
    CHANGE_ROWS,
    RUN_LOGOUT,
    MOVE_LIST,
    GET_USER,
    SORT_REPO,
    TOGGLE_ORDER,
    SHOW_MODAL
} from '../Actions/types';

const initialState = {
    accessToken: '',
    profile: {},
    open: false,
    order: 'asc',
    sorted: {},
    loading: false,
    position: 0,
    rowsRendered: 5,
    repos: [],
    viewRepos: [],
    reposLength: 0,
    totalPageNumber: 0,
    pageNumber: 0
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
        case GET_USER:
            return {
                ...state,
                profile: action.payload
            }
        case LOADING_SEARCH:
            return {
                ...state,
                loading: action.payload
            }
        case SEARCH_GITHUB:
            console.log(SEARCH_GITHUB);
            return {
                ...state,
                repos: action.payload,
                position: 0,
                reposLength: action.payload.length,
                totalPageNumber: parseInt((action.payload.length / state.rowsRendered).toFixed(0)),
                pageNumber: action.payload.length ? 1 : 0,
                viewRepos: action.payload.slice(0, state.rowsRendered),
            }
        case SORT_REPO:
            return {
                ...state,
                sorted: action.payload.sorted,
                repos: action.payload.repos,
                position: 0,
                reposLength: action.payload.repos.length,
                totalPageNumber: parseInt((action.payload.repos.length / state.rowsRendered).toFixed(0)),
                pageNumber: action.payload.repos.length ? 1 : 0,
                viewRepos: action.payload.repos.slice(0, state.rowsRendered),
            }
        case CHANGE_ROWS:
            return {
                ...state,
                reposLength: state.repos.length,
                position: 0,
                rowsRendered: action.payload,
                totalPageNumber: parseInt((state.repos.length / action.payload).toFixed(0)),
                pageNumber: state.repos.length ? 1 : 0,
                viewRepos: state.repos.slice(0, action.payload),
            }
        case MOVE_LIST:
            return {
                ...state,
                viewRepos: action.payload.viewRepos,
                position: action.payload.position,
                pageNumber: action.payload.pageNumber
            }
        case TOGGLE_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case SHOW_MODAL:
            return {
                ...state,
                open: action.payload
            }
        case RUN_LOGOUT:
            return {
                ...state,
                accessToken: '',
                profile: {}
            }
        default: 
            return state;
    }
}