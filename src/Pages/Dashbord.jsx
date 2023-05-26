
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import Spinner from "./Spinner"
export default function Dashord() {
  const token = localStorage.getItem('ACCESS_TOKEN');
    const [todos, setTodo] = useState([]);
     const [loading, setLoading] = useState(true);
      useEffect(() => {
      const config = {
          headers: {
             Authorization:`Bearer ${token}`
         }
    }
       
     axiosClient.get('/todos', config)
         .then((response) => {
         setTodo(response.data);
          setLoading(false);
        <Navigate to="/"/>
        })
        .catch((err) => {
        console.log('Error from ShowBookList', err);
      });
    }, [])

    return (
    <>
     <section className='content'>
        {loading ? (
        <div>
          <Spinner />
        </div>
        ) : todos.length > 0 ? (
             <div className='todos'>
            {todos.map((todo) => (
              <TodoItem key={todo._id} id={todo._id} todo={todo}/>
             ))}               
            </div>
      ) : (
        <div>
        <p>No todos found.</p>
        <Link to="/todoadd">Add now</Link>
        </div>
      )}
     </section>
 </>
  )
}

