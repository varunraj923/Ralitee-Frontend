'use client';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
