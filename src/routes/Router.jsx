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
import UpdateLead from '../pages/UpdateLead'
import AddCustomer from '../pages/AddCustomer'
import CustomerDetail from '../pages/CustomerDetail'
import UpdateCustomer from '../pages/UpdateCustomer'
import CustomerProfile from '../pages/CustomerProfile'
import AddBooking from '../pages/AddBooking'
import AddPayment from '../pages/AddPayment'
import AddReservation from '../pages/AddReservation'
import Packages from '../pages/Packages'
import AddPackage from '../pages/AddPackage'
import PackageDetail from '../pages/PackageDetail'
import UpdatePackage from '../pages/UpdatePackage'
import LiveBooking from '../pages/LiveBooking'
import Operations from '../pages/Operations'
import ProtectedRoute from '../componenets/ProtectedRoute'

import Reports from '../pages/Reports'
import ManageUsers from '../pages/ManageUsers'
import Profile from '../pages/settings/Profile'
import Visa from '../pages/Visa'
import Hotels from '../pages/Hotels'
import Flights from '../pages/Flights'
import Transport from '../pages/Transport'

import CompanyParams from '../pages/settings/CompanyParams'
import Roles from '../pages/settings/Roles'
import Permissions from '../pages/settings/Permissions'
import AssignPermissions from '../pages/settings/AssignPermissions'
import MasterTypes from '../pages/settings/MasterTypes'
import ApiConfig from '../pages/settings/ApiConfig'
import Subscription from '../pages/settings/Subscription'

// Stub imports for operations and reports
const Staff = () => <div className="p-10 font-bold text-slate-400">Staff Management</div>;
const Logistics = () => <div className="p-10 font-bold text-slate-400">Logistics Feed</div>;
const BookingAnalytics = () => <div className="p-10 font-bold text-slate-400">Booking Analytics</div>;
const PaymentReports = () => <div className="p-10 font-bold text-slate-400">Payment Reports</div>;
const SalesPerformance = () => <div className="p-10 font-bold text-slate-400">Sales Performance</div>;

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
        <Route path="/leads/:id/edit" element={<ProtectedRoute><Layout><UpdateLead /></Layout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Layout><Customers /></Layout></ProtectedRoute>} />
        <Route path="/customers/add" element={<ProtectedRoute><Layout><AddCustomer /></Layout></ProtectedRoute>} />
        <Route path="/customers/:id" element={<ProtectedRoute><Layout><CustomerDetail /></Layout></ProtectedRoute>} />
        <Route path="/customers/:id/edit" element={<ProtectedRoute><Layout><UpdateCustomer /></Layout></ProtectedRoute>} />
        <Route path="/customer-profile/:id" element={<ProtectedRoute><Layout><CustomerProfile /></Layout></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><Layout><Calculator /></Layout></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Layout><Bookings /></Layout></ProtectedRoute>} />
        <Route path="/bookings/add" element={<ProtectedRoute><Layout><AddBooking /></Layout></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><Layout><Reservations /></Layout></ProtectedRoute>} />
        <Route path="/reservations/add" element={<ProtectedRoute><Layout><AddReservation /></Layout></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Layout><Payments /></Layout></ProtectedRoute>} />
        <Route path="/payments/add" element={<ProtectedRoute><Layout><AddPayment /></Layout></ProtectedRoute>} />
        
        {/* Operations */}
        <Route path="/operations" element={<ProtectedRoute><Layout><Operations /></Layout></ProtectedRoute>} />
        <Route path="/operations/staff" element={<ProtectedRoute><Layout><Staff /></Layout></ProtectedRoute>} />
        <Route path="/operations/logistics" element={<ProtectedRoute><Layout><Logistics /></Layout></ProtectedRoute>} />
        
        {/* Reports */}
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/reports/bookings" element={<ProtectedRoute><Layout><BookingAnalytics /></Layout></ProtectedRoute>} />
        <Route path="/reports/payments" element={<ProtectedRoute><Layout><PaymentReports /></Layout></ProtectedRoute>} />
        <Route path="/reports/sales" element={<ProtectedRoute><Layout><SalesPerformance /></Layout></ProtectedRoute>} />

        {/* Isolated Settings Pages */}
        <Route path="/settings/company" element={<ProtectedRoute><Layout><CompanyParams /></Layout></ProtectedRoute>} />
        <Route path="/settings/roles" element={<ProtectedRoute><Layout><Roles /></Layout></ProtectedRoute>} />
        <Route path="/settings/permissions" element={<ProtectedRoute><Layout><Permissions /></Layout></ProtectedRoute>} />
        <Route path="/settings/assign-permissions" element={<ProtectedRoute><Layout><AssignPermissions /></Layout></ProtectedRoute>} />
        <Route path="/settings/master-types" element={<ProtectedRoute><Layout><MasterTypes /></Layout></ProtectedRoute>} />
        <Route path="/settings/api" element={<ProtectedRoute><Layout><ApiConfig /></Layout></ProtectedRoute>} />
        <Route path="/settings/subscription" element={<ProtectedRoute><Layout><Subscription /></Layout></ProtectedRoute>} />
        
        <Route path="/settings/users" element={<ProtectedRoute><Layout><ManageUsers /></Layout></ProtectedRoute>} />
        <Route path="/settings/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        
        <Route path="/reservations/visa" element={<ProtectedRoute><Layout><Visa /></Layout></ProtectedRoute>} />
        <Route path="/reservations/hotels" element={<ProtectedRoute><Layout><Hotels /></Layout></ProtectedRoute>} />
        <Route path="/reservations/flights" element={<ProtectedRoute><Layout><Flights /></Layout></ProtectedRoute>} />
        <Route path="/reservations/transport" element={<ProtectedRoute><Layout><Transport /></Layout></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><Layout><Packages /></Layout></ProtectedRoute>} />
        <Route path="/packages/add" element={<ProtectedRoute><Layout><AddPackage /></Layout></ProtectedRoute>} />
        <Route path="/packages/:id" element={<ProtectedRoute><Layout><PackageDetail /></Layout></ProtectedRoute>} />
        <Route path="/packages/:id/edit" element={<ProtectedRoute><Layout><UpdatePackage /></Layout></ProtectedRoute>} />
        <Route path="/live-booking" element={<ProtectedRoute><Layout><LiveBooking /></Layout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
