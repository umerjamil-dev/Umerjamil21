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

import Reports from '../pages/Reports'
import Settings from '../pages/Settings'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/leads" element={<Layout><Leads /></Layout>} />
        <Route path="/leads/add" element={<Layout><AddLead /></Layout>} />
        <Route path="/leads/:id" element={<Layout><LeadDetail /></Layout>} />
        <Route path="/customers" element={<Layout><Customers /></Layout>} />
        <Route path="/customers/add" element={<Layout><AddCustomer /></Layout>} />
        <Route path="/calculator" element={<Layout><Calculator /></Layout>} />
        <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
        <Route path="/bookings/add" element={<Layout><AddBooking /></Layout>} />
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
        <Route path="/reservations/add" element={<Layout><AddReservation /></Layout>} />
        <Route path="/payments" element={<Layout><Payments /></Layout>} />
        <Route path="/payments/add" element={<Layout><AddPayment /></Layout>} />
        <Route path="/operations" element={<Layout><Operations /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
        <Route path="/packages" element={<Layout><Packages /></Layout>} />
        <Route path="/packages/add" element={<Layout><AddPackage /></Layout>} />
        <Route path="/live-booking" element={<Layout><LiveBooking /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
