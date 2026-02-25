import { useState, useEffect } from "react";
import {
  Package,
  Tag,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";
import AdminLayout from "../layout/AdminLayout";
import StatsCard from "../components/StatsCard";
import { getDashboardData } from "../../../api/adminApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardData();

        setStats({
          totalProducts: res.data.totalProducts || 0,
          totalCategories: res.data.totalCategories || 0,
        });
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Welcome to your ecommerce admin panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard
            icon={Package}
            title="Total Products"
            value={loading ? "—" : stats.totalProducts}
            change="—"
            trend="up"
          />

          <StatsCard
            icon={Tag}
            title="Total Categories"
            value={loading ? "—" : stats.totalCategories}
            change="—"
            trend="up"
          />

          {/* Placeholder cards */}
          <StatsCard
            icon={ShoppingCart}
            title="Total Orders"
            value="—"
            change="—"
            trend="up"
          />

          <StatsCard
            icon={Users}
            title="Total Customers"
            value="—"
            change="—"
            trend="up"
          />

          <StatsCard
            icon={TrendingUp}
            title="Revenue"
            value="—"
            change="—"
            trend="up"
          />
        </div>

        {/* Recent Orders placeholder */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Orders
            </h2>
          </div>

          <div className="p-6 text-slate-600">
            Recent orders will appear here once orders API is added.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
