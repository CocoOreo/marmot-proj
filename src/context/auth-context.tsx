import React, { ReactNode, useContext, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "types/user";
import { http } from "utils/http";
import { useMount } from "utils/use-mount";
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
    const [user, setUser] = useState<User | null>(null)
    const login = (form: AuthForm) => {
        return auth.login(form).then(user => setUser(user))
    }
    const register = (form: AuthForm) => {
        return auth.register(form).then(user => setUser(user))
    }
    const logout = () => {
        return auth.logout().then(user => setUser(null))
    }

    useMount(() => {
        bootstrapUser().then(setUser)
    })

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