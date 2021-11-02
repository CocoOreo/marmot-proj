import React, { ReactNode, useContext } from "react";
import * as auth from 'auth-provider'
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils/use-mount";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useQueryClient } from "react-query";
interface AuthForm {
    username: string;
    password: string;
}

const AuthContext = React.createContext<{
    user: User | null;
    login: (form: AuthForm) => Promise<void>;
    register: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | undefined>(undefined)

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, setData: setUser, run, error, isError, isIdle, isLoading, } = useAsync<User | null>()
    const queryClient = useQueryClient()
    const login = (form: AuthForm) => {
        return auth.login(form).then(user => setUser(user))
    }
    const register = (form: AuthForm) => {
        return auth.register(form).then(user => setUser(user))
    }
    const logout = () => {
        return auth.logout().then(user => {
            setUser(null)
            queryClient.clear()
        })
    }

    useMount(() => {
        run(bootstrapUser())
    })
    if (isIdle || isLoading) {
        return (<FullPageLoading />)
    }

    if (isError) {
        return (<FullPageErrorFallback error={error} />)
    }

    return (
        <AuthContext.Provider children={children} value={{ login, register, logout, user }} />
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('UseAutn can only be used in the scope of AuthProvider')
    }
    return context;
}