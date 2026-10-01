import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css"


import '@fontsource-variable/roboto/wght.css';
import '@fontsource-variable/nunito/wght.css';


import MyTripsPage from './pages/MyTripsPage/MyTripsPage';
import TripPage from './pages/TripPage/TripPage';
import { newTripAction } from './pages/MyTripsPage/newTripAction';
import { tripLoader } from './pages/TripPage/tripLoader';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MyTripsPage,
    action: newTripAction,
  },
  {
    path: "/trip/:tripId",
    Component: TripPage,
    loader: tripLoader,
    // action: newActivityAction
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
