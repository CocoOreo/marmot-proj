import { User } from "types/user";
import { http } from "utils/http";

const localStorageKey = '__auth_provider_token__';


export const getToken = () => {
    return window.localStorage.getItem(localStorageKey)
}

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user?.token || '')
    return user
}

export const register = (data: { username: string; password: string }) => {
    return http('register', {
        method: "POST",
        data
    }).then(res => {
        return handleUserResponse(res);
    }).catch(error => {
        throw new Error(error)
    });
};

export const login = (data: { username: string, password: string }) => {
    // send http request
    return http('login', {
        method: 'POST',
        data
    }).then(res => {
        // then call handleUserResponse
        return handleUserResponse(res)
    }).catch(error => {
        throw new Error(error)
    })
}

export const logout = async () => {
    window.localStorage.removeItem(localStorageKey)
}