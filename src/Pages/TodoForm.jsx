import {createRef} from "react";
import axiosClient from "../axios-client";
import {toast} from 'react-toastify'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
export default function Dashord() {
  const textRef = createRef()
  const token = localStorage.getItem('ACCESS_TOKEN');
    const [setTodo] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      const config = {
          headers: {
             Authorization:`Bearer ${token}`
         }
    }
       
     axiosClient.get('/todos', config)
         .then((response) => {
         setTodo(response.data);
        })
        .catch((err) => {
        console.log('Error from Todo', err);
      });
    }, [])

    
  const onSubmit = async (ev) => {
    ev.preventDefault()
      const payload = { text: textRef.current.value }
      const config = {
          headers: {
             Authorization:`Bearer ${token}`
         }
      }

    try {
        const response = await axiosClient.post('/todos', payload, config);
        console.log(response.data);
        toast.success('Todo Created Successfully');
        navigate('/darshbord');
        } catch (error) {
            if (error.response) {
            const { status, data } = error.response;
            if (status === 422 || status === 400) {
                toast.error(data.message);
            } 
         }
        }
    };

  return (
     <div className="login-signup-form animated fadeInDown">
          <div className="form">
        <div className="animated fadeInDown">
             <form onSubmit={onSubmit} autoComplete="current-password">
                <h2 className="title">Add Todos </h2>
                <br />
                <div className="img_logo"></div>
                 <input type="text" ref={textRef} name='text'placeholder="Add your todo" />
                <button className="btn btn-block">Add Now</button>
            </form>
      </div>
     </div>
    </div>
  )
}

