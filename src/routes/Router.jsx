import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// nomal pages 
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
import BookingDetail from '../pages/BookingDetail'
import UpdateBooking from '../pages/UpdateBooking'
import AddPayment from '../pages/AddPayment'
import AddReservation from '../pages/AddReservation'
import Packages from '../pages/Packages'
import AddPackage from '../pages/AddPackage'
import PackageDetail from '../pages/PackageDetail'
import UpdatePackage from '../pages/UpdatePackage'
import LiveBooking from '../pages/LiveBooking'
import LiveHotelBooking from '../pages/LiveHotelBooking'
import Operations from '../pages/Operations'
import Assignment from '../pages/Assignment'
import LogisticsFeed from '../pages/LogisticsFeed'
import StaffManagement from '../pages/StaffManagement'
import ProtectedRoute from '../componenets/ProtectedRoute'

// Reports
import Reports from '../pages/Reports'
import ManageUsers from '../pages/ManageUsers'
import Profile from '../pages/settings/Profile'
import Visa from '../pages/Visa'
import Hotels from '../pages/Hotels'
import Flights from '../pages/Flights'
import Transport from '../pages/Transport'
import VisaDetail from '../pages/VisaDetail'
import HotelDetail from '../pages/HotelDetail'
import FlightDetail from '../pages/FlightDetail'
import TransportDetail from '../pages/TransportDetail'
// persnal Dashboard
import PersonalDashboard from '../pages/PersonalDashboard'
// settings
import CompanyParams from '../pages/settings/CompanyParams'
import Roles from '../pages/settings/Roles'
import Permissions from '../pages/settings/Permissions'
import AssignPermissions from '../pages/settings/AssignPermissions'
import MasterTypes from '../pages/settings/MasterTypes'
import ApiConfig from '../pages/settings/ApiConfig'
import Subscription from '../pages/settings/Subscription'

// Stub imports for operations and reports
import BookingAnalytics from '../pages/reports/BookingAnalytics';
import PaymentReports from '../pages/reports/PaymentReports';
import SalesPerformance from '../pages/reports/SalesPerformance';
import ServiceStatusReport from '../pages/reports/ServiceStatusReport';
import WhatsAppSystem from '../pages/WhatsAppSystem';
import EmailSystem from '../pages/EmailSystem';

const Router = () => {
  return (
    <>
    {/* Browser Router */}
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={ <ProtectedRoute permission="VIEW_DASHBOARD" > <Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/personal-dashboard" element={ <ProtectedRoute permission="VIEW_PERSONAL_DASHBOARD" > <Layout><PersonalDashboard /></Layout></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute permission="VIEW_LEADS"><Layout><Leads /></Layout></ProtectedRoute>} />
        <Route path="/leads/add" element={<ProtectedRoute permission="CREATE_LEADS"><Layout><AddLead /></Layout></ProtectedRoute>} />
        <Route path="/leads/:id" element={<ProtectedRoute permission="VIEW_LEADS"><Layout><LeadDetail /></Layout></ProtectedRoute>} />
        <Route path="/leads/:id/edit" element={<ProtectedRoute permission="CREATE_LEADS"><Layout><UpdateLead /></Layout></ProtectedRoute>} />
        <Route path="/emails/:id" element={<ProtectedRoute permission="VIEW_LEADS"><Layout><EmailSystem /></Layout></ProtectedRoute>} />
        <Route path="/emails/:id/:folder" element={<ProtectedRoute permission="VIEW_LEADS"><Layout><EmailSystem /></Layout></ProtectedRoute>} />
        <Route path="/whatsapp/:id" element={<ProtectedRoute permission="VIEW_LEADS"><Layout><WhatsAppSystem /></Layout></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute permission="VIEW_CUSTOMERS"><Layout><Customers /></Layout></ProtectedRoute>} />
        <Route path="/customers/add" element={<ProtectedRoute permission="VIEW_CUSTOMERS"><Layout><AddCustomer /></Layout></ProtectedRoute>} />
        <Route path="/customers/:id" element={<ProtectedRoute permission="VIEW_CUSTOMERS"><Layout><CustomerDetail /></Layout></ProtectedRoute>} />
        <Route path="/customers/:id/edit" element={<ProtectedRoute permission="VIEW_CUSTOMERS"><Layout><UpdateCustomer /></Layout></ProtectedRoute>} />
        <Route path="/customer-profile/:id" element={<ProtectedRoute permission="customer-profile"><Layout><CustomerProfile /></Layout></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute permission="USE_CALCULATOR"><Layout><Calculator /></Layout></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute permission="VIEW_BOOKINGS"><Layout><Bookings /></Layout></ProtectedRoute>} />
        <Route path="/bookings/add" element={<ProtectedRoute permission="CREATE_BOOKINGS"><Layout><AddBooking /></Layout></ProtectedRoute>} />
        <Route path="/bookings/:id" element={<ProtectedRoute permission="VIEW_BOOKINGS"><Layout><BookingDetail /></Layout></ProtectedRoute>} />
        <Route path="/bookings/:id/edit" element={<ProtectedRoute permission="CREATE_BOOKINGS"><Layout><UpdateBooking /></Layout></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute permission="VIEW_RESERVATIONS"><Layout><Reservations /></Layout></ProtectedRoute>} />
        <Route path="/reservations/add" element={<ProtectedRoute permission="CREATE_RESERVATIONS"><Layout><AddReservation /></Layout></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute permission="VIEW_PAYMENTS"><Layout><Payments /></Layout></ProtectedRoute>} />
        <Route path="/payments/add" element={<ProtectedRoute permission="CREATE_PAYMENTS"><Layout><AddPayment /></Layout></ProtectedRoute>} />
        
        {/* Operations */}
        <Route path="/operations" element={<ProtectedRoute permission="VIEW_OPERATIONS"><Layout><Operations /></Layout></ProtectedRoute>} />
        <Route path="/operations/assignment" element={<ProtectedRoute permission="VIEW_ASSIGNMENT"><Layout><Assignment /></Layout></ProtectedRoute>} />
        <Route path="/operations/staff" element={<ProtectedRoute permission="VIEW_OPERATIONS_STAFF"><Layout><StaffManagement /></Layout></ProtectedRoute>} />
        <Route path="/operations/logistics/:id?" element={<ProtectedRoute permission="VIEW_LOGISTICS"><Layout><LogisticsFeed /></Layout></ProtectedRoute>} />
        
        {/* Reports */}
        <Route path="/reports" element={<ProtectedRoute permission="VIEW_REPORTS"><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/reports/bookings" element={<ProtectedRoute permission="VIEW_BOOKING_ANALYTICS"><Layout><BookingAnalytics /></Layout></ProtectedRoute>} />
        <Route path="/reports/payments" element={<ProtectedRoute permission="VIEW_PAYMENT_REPORTS"><Layout><PaymentReports /></Layout></ProtectedRoute>} />
        <Route path="/reports/service-status" element={<ProtectedRoute permission="VIEW_SERVICE_STATUS_REPORT"><Layout><ServiceStatusReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/sales" element={<ProtectedRoute permission="VIEW_SALES_PERFORMANCE"><Layout><SalesPerformance /></Layout></ProtectedRoute>} />

        {/* Isolated Settings Pages */}
        <Route path="/settings/company" element={<ProtectedRoute permission="MANAGE_COMPANY"><Layout><CompanyParams /></Layout></ProtectedRoute>} />
        <Route path="/settings/roles" element={<ProtectedRoute permission="MANAGE_ROLES"><Layout><Roles /></Layout></ProtectedRoute>} />
        <Route path="/settings/permissions" element={<ProtectedRoute permission="MANAGE_PERMISSIONS"><Layout><Permissions /></Layout></ProtectedRoute>} />
        <Route path="/settings/assign-permissions" element={<ProtectedRoute permission="ASSIGN_PERMISSIONS"><Layout><AssignPermissions /></Layout></ProtectedRoute>} />
        <Route path="/settings/master-types" element={<ProtectedRoute permission="MANAGE_MASTER_TYPES"><Layout><MasterTypes /></Layout></ProtectedRoute>} />
        <Route path="/settings/api" element={<ProtectedRoute permission="MANAGE_API_SYNC"><Layout><ApiConfig /></Layout></ProtectedRoute>} />
        <Route path="/settings/subscription" element={<ProtectedRoute permission="MANAGE_SUBSCRIPTION"><Layout><Subscription /></Layout></ProtectedRoute>} />
        
        {/* users */}
        <Route path="/settings/users" element={<ProtectedRoute permission="MANAGE_USERS"><Layout><ManageUsers /></Layout></ProtectedRoute>} />
        <Route path="/settings/profile" element={<ProtectedRoute permission="MANAGE_PROFILE"><Layout><Profile /></Layout></ProtectedRoute>} />
        
        {/* reservations */}
        <Route path="/reservations/visa" element={<ProtectedRoute permission="VIEW_VISA"><Layout><Visa /></Layout></ProtectedRoute>} />
        <Route path="/reservations/visa/:id" element={<ProtectedRoute permission="VIEW_VISA"><Layout><VisaDetail /></Layout></ProtectedRoute>} />
        <Route path="/reservations/hotels" element={<ProtectedRoute permission="VIEW_HOTELS"><Layout><Hotels /></Layout></ProtectedRoute>} />
        <Route path="/reservations/hotels/:id" element={<ProtectedRoute permission="VIEW_HOTELS"><Layout><HotelDetail /></Layout></ProtectedRoute>} />
        <Route path="/reservations/flights" element={<ProtectedRoute permission="VIEW_FLIGHTS"><Layout><Flights /></Layout></ProtectedRoute>} />
        <Route path="/reservations/flights/:id" element={<ProtectedRoute permission="VIEW_FLIGHTS"><Layout><FlightDetail /></Layout></ProtectedRoute>} />
        <Route path="/reservations/transport" element={<ProtectedRoute permission="VIEW_TRANSPORT"><Layout><Transport /></Layout></ProtectedRoute>} />
        <Route path="/reservations/transport/:id" element={<ProtectedRoute permission="VIEW_TRANSPORT"><Layout><TransportDetail /></Layout></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute permission="VIEW_PACKAGES"><Layout><Packages /></Layout></ProtectedRoute>} />
        <Route path="/packages/add" element={<ProtectedRoute permission="VIEW_PACKAGES"><Layout><AddPackage /></Layout></ProtectedRoute>} />
        <Route path="/packages/:id" element={<ProtectedRoute permission="VIEW_PACKAGES"><Layout><PackageDetail /></Layout></ProtectedRoute>} />
        <Route path="/packages/:id/edit" element={<ProtectedRoute permission="VIEW_PACKAGES"><Layout><UpdatePackage /></Layout></ProtectedRoute>} />
        <Route path="/live-booking" element={<ProtectedRoute permission="VIEW_LIVE_FLIGHT"><Layout><LiveBooking /></Layout></ProtectedRoute>} />
        <Route path="/live-booking-Hotels" element={<ProtectedRoute permission="VIEW_LIVE_HOTEL"><Layout><LiveHotelBooking /></Layout></ProtectedRoute>} />
        
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router
