import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user =>{
        const agree = window.confirm(`aponi ki delete korte chan ay User ke: ${user.name}`);
        if(agree){
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0 ){
                    const remainingUser = displayUsers.filter(usr =>usr._id !== user._id);
                    setDisplayUsers(remainingUser);
                    toast.success('delete Successfully')
                }
            })
        }
    }
    return (
        <div>
            <h2>User Length {displayUsers.length}</h2>
            {
                displayUsers.map(user => <p key={user._id} style={{border: '1px solid black', borderRadius: '15px', padding:'10px'}}>{user.name} {user.email} <Link to={`update/${user._id}`}><button>Update</button></Link> <button onClick={()=> handleDelete(user)}>delete</button></p>)
            }
        </div>
    );
};

export default Home;