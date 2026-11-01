import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css"


import '@fontsource-variable/roboto/wght.css';
import '@fontsource-variable/nunito/wght.css';


import MyTripsPage from './pages/MyTripsPage/MyTripsPage';
import TripPage from './pages/TripPage/TripPage';
import myTripsLoader from './pages/MyTripsPage/myTripsLoader'

import { tripLoader } from './pages/TripPage/tripLoader';
import { myTripsPageAction } from './pages/MyTripsPage/myTripsPageAction';
import { newTripPageAction } from './pages/TripPage/tripPageActions';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MyTripsPage,
    loader: myTripsLoader,
    action: myTripsPageAction,
  },
  {
    path: "/trip/:tripId",
    Component: TripPage,
    loader: tripLoader,
    action: newTripPageAction
  },
]);

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
