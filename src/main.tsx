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
import { Bounce, ToastContainer } from 'react-toastify';
import RedirectAuthenticated from './components/hocs/RedirectAuthenticated.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import Sidebar from './components/layouts/Sidebar.tsx';
const router = createBrowserRouter([
  {
    element: (
      <RedirectAuthenticated>
        <Base />
      </RedirectAuthenticated>
    ),
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
        <Sidebar />
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
  <PersistGate loading={null} persistor={persistStore(store)}>
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </StrictMode>,
    </Provider>
  </PersistGate>
)
