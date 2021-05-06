import React from 'react'
import logo from '../images/cash.jpg';

const Header = () => {
    return (
        <div>
            <h1 className="font-weight-bold display-3 text-center">Reckonings App</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom : '30px'}}>
                <img src={logo} style={{width: '20%', height: 'auto'}}/>
            </div>
        </div>
    )
}

export default Header;
