import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--surface)] flex font-inter">
      <Sidebar />
      <div className="flex-1 ml-72 relative">
        <Topbar />
        <main className="p-12 max-w-[1600px] mx-auto min-h-screen">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
