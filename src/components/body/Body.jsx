// eslint-disable-next-line no-unused-vars
import React ,{useState }from 'react';
import Login from "./body-component/login"
import Signup from "./body-component/singup"
import {Typography} from "@material-tailwind/react";



const LoginForm = () => {

  const [signIn , setSignIn] = useState(true);
  function changeStateHandle(){
    setSignIn(!signIn);
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 pointer-events-none">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm pointer-events-auto">
        {signIn ? <Login /> : <Signup />}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900" onClick={changeStateHandle} >
          {signIn ? "login" : "sign up"}
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default LoginForm;
