import {Link, Navigate} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import {toast} from 'react-toastify'
import Notfound from "./Notfound";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
   const { setUser, setToken } = useStateContext()
   const [errors, setErrors] = useState(null)


  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
      }
      
    axiosClient.post('users/register', payload)
      .then(({data}) => {
         setUser(data.user)
         setToken(data.token);
         toast.success('User Created Successfully')
      })
        
      .catch(err => {
        const response = err.response;
          if (response && response.status === 422) {
              setErrors(response.data.message)
                 toast.error(`Error ${response.status} Unprocessable Content`)
          } else if (response && response.status === 400) {
              setErrors(response.data.message)
               toast.error(`Error ${response.status} Bad Request`)
        } else if (response && response.status === 404) {
             <Navigate to={Notfound}/>
         }
      })
  }


  return (
    <div className="animated fadeInDown">
      <div>
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for Free</h1>
           <div className="img_logo"></div>
          <p>{errors}</p>
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="btn btn-block">Signup</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}