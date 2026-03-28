import React, { useEffect } from 'react'
import Router from './routes/Router'
import useAuthStore from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster position="top-right" />
      <Router />
    </>
  )
}

export default App
