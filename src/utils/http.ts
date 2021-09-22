import { Config } from "types/config"
import * as auth from "auth-provider"
import qs from "qs"

const BASE_URL = process.env.REACT_APP_BASE_URL

export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config
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
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        }
    )
}