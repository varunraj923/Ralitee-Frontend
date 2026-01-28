'use client';

const StatCard = ({ icon: Icon, title, value, change, trend }) => {
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={`text-sm font-semibold mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {change} from last month
            </p>
          )}
        </div>
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
          isPositive ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {Icon && <Icon className={`h-6 w-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
