import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab('Signup')
        } else if (location.pathname === '/Login') {
            setActiveTab('AddCustomer')
        } else if (location.pathname === '/eventCreate/:userId') {
            setActiveTab('Event')
        }
    }, [location])

    return (
        <div>           
            <div>
                <Link to="/Login">
                    <button onClick={() => setActiveTab("login")} >Next</button>
                </Link> 
                <Link to="/eventCreate/:userId">
                    <button onClick={() => setActiveTab("event")} >Next</button>
                </Link>
            </div>
        </div>
    );
}

export default Header;