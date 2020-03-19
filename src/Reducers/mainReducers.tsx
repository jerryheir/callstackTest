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
            const { repos, sorted } = action.payload
            return {
                ...state,
                sorted,
                repos,
                position: 0,
                reposLength: repos.length,
                totalPageNumber: parseInt((repos.length / state.rowsRendered).toFixed(0)),
                pageNumber: repos.length ? 1 : 0,
                viewRepos: repos.slice(0, state.rowsRendered),
            }
        case CHANGE_ROWS:
            const total = parseInt((state.repos.length / action.payload).toFixed(0));
            return {
                ...state,
                reposLength: state.repos.length,
                position: 0,
                rowsRendered: action.payload,
                totalPageNumber: total > 0 ? total : (total === 0 && state.repos.length) ? 1 : 0,
                pageNumber: state.repos.length > 0 ? 1 : 0,
                viewRepos: state.repos.slice(0, action.payload),
            }
        case MOVE_LIST:
            return {
                ...state,
                ...action.payload
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