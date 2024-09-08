/* eslint-disable no-unused-vars */

import React , {useState}from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const [loginData , setLoginData] = useState({username:"" , password:""})
    const [legitLogin ,setLegitLogin] = useState(true)
    const [errorLogin , seterrorLogin] = useState("")
    const navigate = useNavigate();

    function submitHandle(e){
        e.preventDefault();

        if (loginData.username === "asd" && loginData.password === "asd") {
            navigate('/program-page'); // Redirect to another page 
        }else if (loginData.username === "asd" && loginData.password !== "asd"){
            seterrorLogin("Incorrect Password !")
            setLegitLogin(false);
        }else if (loginData.username !== "asd" && loginData.password === "asd"){
            seterrorLogin("Incorrect Username !")
            setLegitLogin(false);
        }else{
            seterrorLogin("Incorrect Username & Password !");
            setLegitLogin(false);
        }
    }
    function changHandle(e){
        const {name,value} = e.target
        setLoginData((prev)=>{
            if(name==="username"){
                return ({
                    username:value,
                    password:prev.password
                })
            }else if (name==="password"){
                return ({
                    username : prev.username ,
                    password : value
                })
            }
        })
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form method="GET" onSubmit={submitHandle}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                    type="username"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={changHandle}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={changHandle}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    />
                </div>
                {legitLogin ? "":                 
                    <div className='mt-1 mb-1'>
                        <p className='text-red-600'>{errorLogin}</p>
                    </div>
                }
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Log In
                </button>
            </form>
        </div>
        
    )
}

export default Login;