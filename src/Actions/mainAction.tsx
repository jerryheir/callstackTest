import { BASE_URL, GITHUB_AUTH_CONFIG, GITHUB_USER_URL } from "../config";
import { 
    RUN_LOGIN,
    LOADING_SEARCH,
    SORT_REPO,
    SEARCH_GITHUB,
    CHANGE_ROWS,
    MOVE_LIST,
    GET_USER,
    RUN_LOGOUT,
    SHOW_MODAL,
    TOGGLE_ORDER
} from "./types";
import * as Keychain from 'react-native-keychain';
import Auth0 from 'react-native-auth0';
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';
const FILTER_ARRAY = require('../config/sorting.json');

const auth0 = new Auth0(GITHUB_AUTH_CONFIG);

export const runLogin = () => async (dispatch: any) => {
    const response = await auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .catch(error=>{
        console.log(error)
        return false;
    })
    if (response && response.accessToken){ // Guarding
        dispatch(getUser(response.accessToken));
        await Keychain.setGenericPassword('', response.accessToken);
        dispatch({
            type: RUN_LOGIN,
            payload: response
        })
        return true;
    } else {
        return false;
    }
}

export const getUser = (accessToken: String) => async (dispatch: any) => {
    const userResult = await fetch(GITHUB_USER_URL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(res=>res.json())
    .catch((err)=>{
        console.log(err);
        return false;
    })
    if (userResult){
        dispatch(sortRepo(FILTER_ARRAY[2]));
        dispatch({
            type: GET_USER,
            payload: userResult
        })
        return true;
    }
    return userResult;
}

export const loadingSearch = () => async (dispatch: any, getState: Function) => {
    const { loading } = getState().main;
    dispatch({
        type: LOADING_SEARCH,
        payload: !loading
    })
}

export const sortRepo = (object: any) => async (dispatch: any, getState: Function) => {
    const ASCENDING = "Ascending";
    const { repos } = getState().main;
    switch(true){
        case (object.title === "ID"):
            const idArray = repos.sort((a: any,b: any) => ((object.order === ASCENDING) ? (a.id - b.id) : (b.id - a.id)));
            return dispatch({
                type: SORT_REPO,
                payload: { repos: idArray, sorted: object }
            })
        case (object.title === "Repo"):
            const repoArray = repos.sort((a: any,b: any) => ((object.order === ASCENDING) ? (a.name.localeCompare(b.name)) : (b.name.localeCompare(a.name))));
            return dispatch({
                type: SORT_REPO,
                payload: { repos: repoArray, sorted: object }
            })
        case (object.title === "Name"):
            const ownerArray = repos.sort((a: any,b: any) => ((object.order === ASCENDING) ? (a.owner.login.localeCompare(b.owner.login)) : (b.owner.login.localeCompare(a.owner.login))));
            return dispatch({
                type: SORT_REPO,
                payload: { repos: ownerArray, sorted: object }
            })
        case (object.title === "Stars"):
            const starArray = repos.sort((a: any,b: any) => ((object.order === ASCENDING) ? (a.stargazers_count - b.stargazers_count) : (b.stargazers_count - a.stargazers_count)));
            return dispatch({
                type: SORT_REPO,
                payload: { repos: starArray, sorted: object }
            })
        case (object.title === "Time"):
            const timeArray = repos.sort((a: any,b: any) => ((object.order === ASCENDING) ? ((+moment(new Date(a.created_at)).format('YYYYMMDD')) - (+moment(new Date(b.created_at)).format('YYYYMMDD'))) : ((+moment(new Date(b.created_at)).format('YYYYMMDD')) - (+moment(new Date(a.created_at)).format('YYYYMMDD')))));
            return dispatch({
                type: SORT_REPO,
                payload: { repos: timeArray, sorted: object }
            })
        default:
            return console.log(object, 'IMPOSSIBLE_INPUT');
    }
}

export const searchGithub = (query: String, o?: String) => async (dispatch: any) => {
    try {
        dispatch(loadingSearch());
        const order = o ? o : 'asc';
        const cachedArray = await AsyncStorage.getItem(`${query}*******${order}`);
        if (cachedArray) {
            const array = JSON.parse(cachedArray);
            dispatch({
                type: SEARCH_GITHUB,
                payload: array
            })
            dispatch(loadingSearch());
            return true;
        }
        const response = await fetch(`${BASE_URL}q=${query}&order=${order}&page=1&per_page=100`, {
            method: 'GET',
        })
        .then(res=>res.json())
        .catch(error=>{
            console.log(error)
            return false;
        })
        if (response && response.items.length >= 0){
            await AsyncStorage.setItem(`${query}*******${order}`, JSON.stringify(response.items));
            dispatch({
                type: SEARCH_GITHUB,
                payload: response.items
            })
        }
        dispatch(loadingSearch());
        return true;
    } catch(err){
        return false;
    }
}

export const changeRowsRendered = (number: Number) => async (dispatch: any) => {
    dispatch({
        type: CHANGE_ROWS,
        payload: number
    })
}

export const move = (boolean: Boolean) => async (dispatch: any, getState: Function) => {
    const { position, rowsRendered, repos, totalPageNumber, pageNumber } = getState().main;
    if ((boolean === true && totalPageNumber === pageNumber) || (boolean === false && pageNumber <= 1)) return false;
    const pgNumber = (boolean === true) ? pageNumber + 1 : pageNumber - 1;
    const pos = (boolean === true) ? (position + rowsRendered) : (position - rowsRendered);
    const vRepos = repos.slice(pos, (pos+ rowsRendered));
    const object = {
        pageNumber: pgNumber,
        position: pos,
        viewRepos: vRepos
    }
    dispatch({
        type: MOVE_LIST,
        payload: object
    })
}

export const toggleOrder = () => async (dispatch: any, getState: Function) => {
    const { order } = getState().main;
    dispatch({
        type: TOGGLE_ORDER,
        payload: order === 'asc' ? 'desc' : 'asc'
    })
}

export const showModal = () => async (dispatch: any, getState: Function) => {
    const { open } = getState().main;
    dispatch({
        type: SHOW_MODAL,
        payload: !open
    })
}

export const runLogout = () => async (dispatch: any) => {
    const response = await auth0
    .webAuth
    .clearSession()
    .catch((error: any)=>{
        console.log(error)
        return false;
    })
    if (response){
        await Keychain.resetGenericPassword();
    }
    dispatch({
        type: RUN_LOGOUT
    })
}
