import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from './routes/Create';
import Home from './routes/Home';
import Root from './routes/Root';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Welcome from './routes/Welcome';
import { fetchEvents, fetchUsers } from './api';
import Admin from './routes/Admin';

const baseURL = "http://localhost:5000";
// const baseURL = process.env.REACT_APP_API_BASE_URL;
// fix undefined


const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
          {
            path: "/create",
            element: <Create/>,
            loader() {
              return fetchUsers();
            },
          },
          {
            path: "/login",
            element: <Login/>,
            loader(){
              return fetchUsers();
            },
          },
    

      {
        path: "/home/:username",
        element: <Home />,

      },
      {
        path: "/profile/:username",
        element: <Profile/>
      },
      {
        path: "/admin", 
        element: <Admin/>,
        loader(){
          return fetchUsers();
        }
      }
    ],
  },
]);


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);



root.render(
  <StrictMode>
   

    <ColorModeScript />
    <RouterProvider router={router} />

  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
