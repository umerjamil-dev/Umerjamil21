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
import AddReservation from '../pages/AddReservation'

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
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
