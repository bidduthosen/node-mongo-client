import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './AddUser.css';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleAddUser = event =>{
        event.preventDefault();
        fetch('http://localhost:5000/users', {

            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                toast.success('Successfully toasted!')
                event.target.reset()
            }
        })
    }

    const handleSubmitBlur = event =>{
        const filed = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[filed] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>Please add a new User</h2>
            <form onSubmit={handleAddUser} className='userinfo'>
                <input onBlur={handleSubmitBlur} type="text" name="name" placeholder='Your Name'  required/>
                <br />
                <input onBlur={handleSubmitBlur} type="text" name="address" placeholder='address'  required/>
                <br />
                <input onBlur={handleSubmitBlur} type="email" name="email" placeholder='Email' required/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;