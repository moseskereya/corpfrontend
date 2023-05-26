import { useStateContext } from "../../context/ContextProvider"
import { Outlet, Navigate, Link } from "react-router-dom"
import axiosClient from "../../axios-client";
import { useEffect } from "react";

const DefaultLayout = () => {
  const {token, user, setUser, setToken } = useStateContext();
    if (!token) {
     return <Navigate to="/login"/>
    }
    const onlogOut = (ev) => {
        ev.preventDefault();
        axiosClient.post('/users/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        axiosClient.get('/users/me')
            .then(({ data }) => {
            setUser(data);
        })
    }, [])
    

  return (
    <div id="defaultLayout">
            <aside>
            <Link to="/">Darshbord</Link>
            <Link to="/contact">Contact</Link>
            <Link to="todoadd">Add Todo</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                      <Link>Corp</Link>
                  </div>
                  <div className="user_data">
                  <div>
                    {user? (
                        <p>Welcome, {user.name}</p>
                       ) : (
                        <p>No user information available.</p>
                      )}
                  </div>
                  <div>
                       <a href="#" onClick={onlogOut} className="btn-logout">Logout</a>
                    </div>
                  </div>
            
                </header> 
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
  )
}

export default DefaultLayout