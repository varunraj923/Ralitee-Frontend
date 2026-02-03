'use client';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Bell, Settings, LogOut, User, Search } from 'lucide-react';
import { logout } from '../../../api/adminApi';
import { clearAuthData } from '../../../redux/slices/authSlice';

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Clear Redux state immediately
      dispatch(clearAuthData());

      // Call logout API (clears backend session/cookie)
      await logout();

      // Redirect to login page
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API fails, state is cleared, so redirect anyway
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Left Section - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-6 ml-8">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Settings */}
          <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg">
            <Settings className="h-5 w-5" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200" />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">Admin</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 text-slate-600 hover:text-red-600 transition-colors hover:bg-red-50 rounded-lg"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
