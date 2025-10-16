import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Base from './components/layouts/Base.tsx';
import Dashboard from './components/pages/auth/Dashboard.tsx';
import Home from './components/pages/Home.tsx';
import About from './components/pages/About.tsx';
import Portfolio from './components/pages/Portfolio.tsx';
import NotFound from './components/pages/NotFound.tsx';
import Demo from './components/pages/Demo.tsx';
import Contact from './components/pages/Contact.tsx';
import Login from './components/pages/auth/Login.tsx';
import Register from './components/pages/auth/Register.tsx';
import ResetPassword from './components/pages/auth/Reset.tsx';
import Protect from './components/hocs/Protect.tsx';

const router = createBrowserRouter([
  {
    element: <Base />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      },
      {
        path: 'demo',
        element: <Demo />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'reset',
        element: <ResetPassword />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }, {
    element: (
      <Protect>
        <Base />
      </Protect>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </Provider>
)
