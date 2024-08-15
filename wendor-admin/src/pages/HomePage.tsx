/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    React.useEffect(() => {
        if (user.id !== "" && user.role === "admin") navigate("/dashboard");
        else navigate("/login");
    }, []);
    return (
        <div>HomePage</div>
    )
}
