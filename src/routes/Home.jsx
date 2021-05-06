import React from 'react'
import Header from '../components/Header'
import LogUser from '../components/LogUser'
import NoAccount from '../components/NoAccount'

const Home = () => {
    return (
        <div>
            <Header/>
            <div className="row">
                <div className="col">
                    <LogUser/>
                </div>
                <div className="col">
                    <NoAccount/>
                </div>
            </div>
        </div>
    )
}

export default Home
