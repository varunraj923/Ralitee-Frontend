import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      to: "/admin/dashboard",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Products",
      to: "/admin/products",
      badge: 12,
    },
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Add Product",
      to: "/admin/add-product",
    },
    {
      icon: <Tag className="h-5 w-5" />,
      label: "Categories",
      to: "/admin/categories",
      badge: 8,
    },
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Add Category",
      to: "/admin/add-category",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Ralitee</span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all group relative"
          >
            <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
              {item.icon}
            </span>

            {!isCollapsed && (
              <>
                <span className="text-sm font-medium">{item.label}</span>

                {item.badge && (
                  <span className="ml-auto text-xs font-semibold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        {!isCollapsed && (
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-2">
              Admin Panel v1.0
            </p>
            <p className="text-xs text-slate-500">
              Manage your ecommerce store
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
