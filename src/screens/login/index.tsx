import React, { FormEvent } from "react"

export const LoginScreen = () => {
    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        console.log(ev.currentTarget.elements)
        const username = (ev.currentTarget.elements[0] as HTMLInputElement).value
        const password = (ev.currentTarget.elements[1] as HTMLInputElement).value
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id={"username"}></input>
            </div>
            <div>
                <label htmlFor="password">Username</label>
                <input type="password" id={"password"}></input>
            </div>
            <button type={'submit'}>Sign In</button>
        </form>
    )
}