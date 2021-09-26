import { Config } from "types/config"
import * as auth from "auth-provider"
import qs from "qs"
import { useAuth } from "context/auth-context"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig
    }
    // check the type of request
    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    return window.fetch(`${BASE_URL}/${endpoint}`, config).then(
        async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "Please Log in" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                console.log("error occurred")
                return Promise.reject(data);
            }
        }
    )
}

export const useHttp = () => {
    const { user } = useAuth()
    // Util Type
    return (...[endpoint, config]:Parameters<typeof http>) => {
        return http(endpoint, {
            ...config,
            token: user?.token
        })
    }
}