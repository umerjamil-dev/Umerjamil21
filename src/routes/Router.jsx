import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../componenets/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Leads from '../pages/Leads'
import LeadDetail from '../pages/LeadDetail'
import Customers from '../pages/Customers'
import Calculator from '../pages/Calculator'
import Bookings from '../pages/Bookings'
import Payments from '../pages/Payments'
import Reservations from '../pages/Reservations'
import AddLead from '../pages/AddLead'
import AddCustomer from '../pages/AddCustomer'
import AddBooking from '../pages/AddBooking'
import AddPayment from '../pages/AddPayment'
import AddReservation from '../pages/AddReservation'
import Packages from '../pages/Packages'
import AddPackage from '../pages/AddPackage'
import LiveBooking from '../pages/LiveBooking'
import Operations from '../pages/Operations'
import ProtectedRoute from '../componenets/ProtectedRoute'

import Reports from '../pages/Reports'
import Settings from '../pages/Settings'
import ManageUsers from '../pages/ManageUsers'
import Profile from '../pages/settings/Profile'
import Visa from '../pages/Visa'
import Hotels from '../pages/Hotels'
import Flights from '../pages/Flights'
import Transport from '../pages/Transport'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><Layout><Leads /></Layout></ProtectedRoute>} />
        <Route path="/leads/add" element={<ProtectedRoute><Layout><AddLead /></Layout></ProtectedRoute>} />
        <Route path="/leads/:id" element={<ProtectedRoute><Layout><LeadDetail /></Layout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Layout><Customers /></Layout></ProtectedRoute>} />
        <Route path="/customers/add" element={<ProtectedRoute><Layout><AddCustomer /></Layout></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><Layout><Calculator /></Layout></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Layout><Bookings /></Layout></ProtectedRoute>} />
        <Route path="/bookings/add" element={<ProtectedRoute><Layout><AddBooking /></Layout></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><Layout><Reservations /></Layout></ProtectedRoute>} />
        <Route path="/reservations/add" element={<ProtectedRoute><Layout><AddReservation /></Layout></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Layout><Payments /></Layout></ProtectedRoute>} />
        <Route path="/payments/add" element={<ProtectedRoute><Layout><AddPayment /></Layout></ProtectedRoute>} />
        <Route path="/operations" element={<ProtectedRoute><Layout><Operations /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
        <Route path="/settings/users" element={<ProtectedRoute><Layout><ManageUsers /></Layout></ProtectedRoute>} />
        <Route path="/settings/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/reservations/visa" element={<ProtectedRoute><Layout><Visa /></Layout></ProtectedRoute>} />
        <Route path="/reservations/hotels" element={<ProtectedRoute><Layout><Hotels /></Layout></ProtectedRoute>} />
        <Route path="/reservations/flights" element={<ProtectedRoute><Layout><Flights /></Layout></ProtectedRoute>} />
        <Route path="/reservations/transport" element={<ProtectedRoute><Layout><Transport /></Layout></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><Layout><Packages /></Layout></ProtectedRoute>} />
        <Route path="/packages/add" element={<ProtectedRoute><Layout><AddPackage /></Layout></ProtectedRoute>} />
        <Route path="/live-booking" element={<ProtectedRoute><Layout><LiveBooking /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
