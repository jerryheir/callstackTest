import { BASE_URL, GITHUB_AUTH_CONFIG } from "../config";
import { 
    RUN_LOGIN,
    RUN_LOGOUT
} from "./types";
import * as Keychain from 'react-native-keychain';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0(GITHUB_AUTH_CONFIG);

export const runLogin = () => async (dispatch: any) => {
    const response = await auth0
    .webAuth
    .authorize({scope: 'openid profile email'})
    .catch(error=>{
        console.log(error)
        return false;
    })
    if (response === false) return false;
    if (response && response.accessToken){ // Guarding
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

export const runLogout = () => async (dispatch: any) => {
    const response = await auth0
    .webAuth
    .clearSession({ federated: true })
    .catch((error: any)=>{
        console.log(error)
        return false;
    })
    console.log(response);
    await Keychain.resetGenericPassword();
    dispatch({
        type: RUN_LOGOUT
    })
}
