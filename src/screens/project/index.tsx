import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { PanelScreen } from 'screens/panel'
export const ProjectScreen = () => {
    return (
        <div>
            Project Screen
            <div>
                <Link to={`panel`}>Panel</Link>
            </div>
            <div>
                <Link to={`epic`}>Epic</Link>
            </div>
            <Routes>
                <Route path={'panel'} element={<PanelScreen />}/>
                <Route path ={'epic'} element={<EpicScreen />}/>
                <Navigate replace={true} to={`${window.location.pathname}/panel`} />
            </Routes>
        </div>
    )
}