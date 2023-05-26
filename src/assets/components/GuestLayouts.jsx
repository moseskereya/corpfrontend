import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider"

const GuestLayouts = () => {
     const {token } = useStateContext();
    if (token) {
     return <Navigate to="/"/>
    }
    return (
       <div className="login-signup-form animated fadeInDown">
          <div className="form">
             <Outlet/> 
          </div>
      </div>
  )
}

export default GuestLayouts