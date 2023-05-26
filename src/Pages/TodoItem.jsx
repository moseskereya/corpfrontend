import axiosClient from "../axios-client";
import { toast } from 'react-toastify'
function TodoItem({ todo, id }) {
    const OnDelete = async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
         const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
           }
            try {
                const response = await axiosClient.delete(`/todos/${id}`, config);
                console.log(response.data);
                window.location.reload();
                toast.success('Todo Deleted Successfully');
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 422 || status === 400) {
                        toast.error(data.message);
             }
          }
     }
 }

    return (
 
         <div className='todo'>
            <div>{new Date(todo.createdAt).toLocaleString('en-US')}</div>
                <h5>{todo.text}</h5>
            <button onClick={() => OnDelete()} className='close'>
                X
            </button>
          </div>
  )
}

export default TodoItem