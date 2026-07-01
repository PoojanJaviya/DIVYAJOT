import React, { useState } from 'react';
import { Outlet, Link, NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ADMIN_NAV = [
  { icon: '📊', label: 'Dashboard',  path: '/admin'           },
  { icon: '💰', label: 'Donations',  path: '/admin/donations' },
  { icon: '🤝', label: 'Volunteers', path: '/admin/volunteers'},
  { icon: '📅', label: 'Events',     path: '/admin/events'    },
  { icon: '🖼️', label: 'Gallery',   path: '/admin/gallery'   },
  { icon: '📝', label: 'Blog',       path: '/admin/blog'      },
  { icon: '📩', label: 'Contacts',   path: '/admin/contacts'  },
];

const AdminLayout: React.FC = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) return <LoadingSpinner fullscreen />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 transition-all duration-300 flex flex-col flex-shrink-0`}>
        <div className={`h-16 flex items-center gap-3 px-4 border-b border-white/10 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">SS</div>
          {sidebarOpen && <span className="font-poppins font-bold text-white text-sm">Admin Panel</span>}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/" className={`flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors duration-200 ${!sidebarOpen && 'justify-center'}`}>
            <span>🌐</span>
            {sidebarOpen && 'View Site'}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(o => !o)} className="text-gray-500 hover:text-gray-800">
            ☰
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome, <strong>{user?.name}</strong></span>
            <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 transition-colors">
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
