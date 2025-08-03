import { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatNumber, formatDate } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const stats = [
    {
      id: 1,
      name: 'Toplam Kullanıcı',
      value: 1249,
      change: +12.5,
      changeType: 'increase',
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Toplam Ürün',
      value: 89,
      change: +4.3,
      changeType: 'increase',
      icon: Package,
      color: 'green'
    },
    {
      id: 3,
      name: 'Satışlar',
      value: 45000,
      change: -2.1,
      changeType: 'decrease',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      id: 4,
      name: 'Büyüme',
      value: 23.4,
      change: +8.2,
      changeType: 'increase',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Yeni kullanıcı kaydı',
      user: 'Ahmet Yılmaz',
      time: '2 dakika önce',
      type: 'user'
    },
    {
      id: 2,
      action: 'Ürün güncellendi',
      user: 'Sistem',
      time: '15 dakika önce',
      type: 'product'
    },
    {
      id: 3,
      action: 'Sipariş tamamlandı',
      user: 'Mehmet Kaya',
      time: '1 saat önce',
      type: 'order'
    },
    {
      id: 4,
      action: 'Rapor oluşturuldu',
      user: 'Sistem',
      time: '2 saat önce',
      type: 'report'
    }
  ];

  const topProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      sales: 234,
      revenue: 234000,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=50&h=50&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'MacBook Pro',
      sales: 156,
      revenue: 312000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=50&h=50&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      sales: 423,
      revenue: 105750,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=50&h=50&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'iPad Air',
      sales: 89,
      revenue: 89000,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=50&h=50&fit=crop&crop=center'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t("welcome")}, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          İşte bugünün özeti ve sisteminizin genel durumu.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id} hover className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.name === 'Satışlar' 
                      ? formatNumber(stat.value, { currency: 'TRY' })
                      : stat.name === 'Büyüme'
                      ? `${stat.value}%`
                      : formatNumber(stat.value)
                    }
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(stat.change)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">bu ay</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[stat.color]}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Background decoration */}
              <div className={`absolute -right-4 -top-4 h-16 w-16 ${colorClasses[stat.color]} opacity-10 rounded-full`}></div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card 
          title="Son Aktiviteler" 
          className="lg:col-span-2"
          headerAction={
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
        >
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
                <Button variant="ghost" size="xs">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button variant="outline" size="sm" fullWidth>
              Tümünü Gör
            </Button>
          </div>
        </Card>

        {/* Top Products */}
        <Card 
          title="En Çok Satan Ürünler"
          headerAction={
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
        >
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {index + 1}
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.sales} satış • {formatNumber(product.revenue, { currency: 'TRY' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
