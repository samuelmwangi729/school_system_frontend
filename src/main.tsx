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
import CreateInstitution from './components/pages/Protected/institution/CreateInstitution.tsx';
import Institutions from './components/pages/Protected/institution/Institutions.tsx';
import Institution from './components/pages/Protected/institution/Institution.tsx';
import Examinations from './components/pages/Protected/Examinations/Examinations.tsx';
import Create from './components/pages/Protected/Examinations/Create.tsx';
import Subjects from './components/pages/Protected/Subjects/Subjects.tsx';
import CreateSubject from './components/pages/Protected/Subjects/CreateSubject.tsx';
import Classes from './components/pages/Protected/InstitutionClasses/Classes.tsx';
import CreateClasses from './components/pages/Protected/InstitutionClasses/CreateClasses.tsx';
import Teachers from './components/pages/Protected/Teachers/Teachers.tsx';
import AddTeachers from './components/pages/Protected/Teachers/AddTeachers.tsx';
import Profile from './components/pages/Protected/Profile.tsx';
import Bulk from './components/pages/Protected/Students/Bulk.tsx';
import Student from './components/pages/Protected/Students/Student.tsx';
import Students from './components/pages/Protected/Students/Students.tsx';
import Results from './components/pages/Protected/Results/Results.tsx';
import AddResults from './components/pages/Protected/Results/AddResults.tsx';
import BulkResults from './components/pages/Protected/Results/BulkResults.tsx';
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
      },
      {
        path:'institution/create',
        element:<CreateInstitution/>
      },
      {
        path:'institutions',
        element:<Institutions/>
      },
      {
        path:'institution/single/:institution',
        element:<Institution/>
      },
      {
        path:'examinations',
        element:<Examinations/>
      },
      {
        path:'exam/create',
        element:<Create/>
      },
      {
        path:'subjects',
        element:<Subjects/>
      },
      {
        path:'subject/create',
        element:<CreateSubject/>
      },
      {
        path:'classes',
        element:<Classes/>
      },
      {
        path:'classes/create',
        element:<CreateClasses/>
      },
      {
        path:'teachers',
        element:<Teachers/>
      },
      {
        path:'teachers/add',
        element:<AddTeachers/>
      },
      {
        path:'profile',
        element:<Profile/>
      },
      {
        path:'students',
        element:<Students/>
      },
      {
        path:'student/add',
        element:<Student/>
      },
      {
        path:'students/add/bulk',
        element:<Bulk/>
      },
      {
        path:'results',
        element:<Results/>
      },
      {
        path:'results/add',
        element:<AddResults/>
      },
      {
        path:'results/add/bulk',
        element:<BulkResults/>
      },
    ]
  }
])
//this is the root of the state management in the app
//gave me headache for days hehe
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
      </StrictMode>
    </Provider>
  </PersistGate>
)
