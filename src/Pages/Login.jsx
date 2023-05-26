import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import {useStateContext} from "../context/ContextProvider";
import { createRef } from "react";
import {toast} from 'react-toastify'

const Login = () => {
      const {setUser, setToken} = useStateContext()
      const emailRef = createRef()
      const passwordRef = createRef()
    
     const onSubmit = (ev) => {
        ev.preventDefault()
         const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
         }
         
      axiosClient.post('/users/login', payload)
      .then(({data}) => {
         setUser(data.user)
         setToken(data.token);
         const {user} = data
          toast.success(`Welcome back ${user.name}`)
      })
        
      .catch(err => {
          const response = err.response;
          toast.error(response)
          if (response && response.status === 422) {
             toast.error(`Error ${response.status} Unprocessable Content`)
          } else if (response && response.status === 400) {
              toast.error(`Error ${response.status} Bad Request`)
           }
      })
    }

    return (
        <div className="animated fadeInDown">
            <form onSubmit={onSubmit} autoComplete="current-password">
             <h2 className="title">Login into your account</h2>
            <br />
                <br />
              <div className="img_logo"></div>
            <input ref={emailRef} type="email" name="email" placeholder="Email" />
            <input ref={passwordRef} name="password" type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/register">Create an account</Link>
            </p>
        </form>
      </div>
     
  )
}

export default Login