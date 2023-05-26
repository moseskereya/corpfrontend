import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Notfound from './Pages/Notfound';
import DefaultLayout from './assets/components/DefaultLayout';
import GuestLayouts from "./assets/components/GuestLayouts"
import Dashbord from "./Pages/Dashbord"
import Contact from './Pages/Contact';
import ProjectDetail from './Pages/ProjectDetail';
import TodoForm from "./Pages/TodoForm"
 
const router = createBrowserRouter([
     {
        path: '/',
        element: <DefaultLayout />,

        children: [
          {
            path: '/',
            element: <Navigate to="/darshbord"/>
            },
           {
             path: '/contact',
             element: <Contact/>
            },
            {
             path: '/project/:Id',
             element: <ProjectDetail/>
            },

            {
             path: '/darshbord',
             element: <Dashbord/>
            },
              {
             path: '/todoadd',
             element: <TodoForm/>
            },

        ]
    },

    {
    path: '/',
    element: <GuestLayouts />,
      children: [
            {
             path: '/login',
             element: <Login/>
            },
            {
             path: '/register',
             element: <Signup/>
            }
        ]
    },
    {
        path: '*',
        element: <Notfound/>
    }
])

export default router;