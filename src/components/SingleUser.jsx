import React from 'react'
//Komponent przyjmujacy first_name, last oraz debt, ktory ma wypisac
const SingleUser = (props) => {
    // console.log(props)
    return (
        <div>
            <tr>
                <td>Imię : </td><td>{props.first_name}</td><td>Nazwisko: </td><td>{props.last_name}</td>
                <td>Bilans : </td>
                <td >{props.debt}</td>
                
            </tr>

        </div>
    )
}

export default SingleUser
