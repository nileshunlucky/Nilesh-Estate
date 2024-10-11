import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/about.jsx'
import SignIn from './pages/SignIn.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import PrivateRoute from './components/privateRoute.jsx'
import Profile from './pages/Profile.jsx'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SignUp from './pages/SignUp.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Listing from './pages/Listing.jsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
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
        path: '/sign-in',
        element: <SignIn />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/create-listing',
            element: <CreateListing />
          },
          {
            path: '/update-listing/:listingId',
            element: <UpdateListing />
          },
        ]
      },
      {
        path: '/listing/:listingId',
        element: <Listing />
      }
    ],
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
