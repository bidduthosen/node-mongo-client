import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = event =>{
        event.preventDefault();
        fetch(`http://localhost:5000/users/${user._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res =>res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                toast.success('Update profile done')
            }
        })
        
    }

    const handleInputChange = event =>{
        const filed = event.target.name;
        const value = event.target.value;
        const newUser = {...user};
        newUser[filed] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>Update Users: {storedUser.name}</h2>

            <form onSubmit={handleUpdateUser} className='userinfo'>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name="name" placeholder='Your Name'  required/>
                <br />
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.address} name="address" placeholder='address'  required/>
                <br />
                <input onChange={handleInputChange} type="email" defaultValue={storedUser.email} name="email" placeholder='Email' required/>
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default Update;