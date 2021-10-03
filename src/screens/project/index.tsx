import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { PannelScreen } from 'screens/pannel'
export const ProjectScreen = () => {
    return (
        <div>
            Project Screen
            <div>
                <Link to={`pannel`}>Pannel</Link>
            </div>
            <div>
                <Link to={`epic`}>Epic</Link>
            </div>
            <Routes>
                <Route path={'pannel'} element={<PannelScreen />}/>
                <Route path ={'epic'} element={<EpicScreen />}/>
                <Navigate to={`${window.location.pathname}/pannel`} />
            </Routes>
        </div>
    )
}