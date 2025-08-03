import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import ProtectedRoute from '../src/components/common/ProtectedRoute';
import Layout from '../src/components/layout/Layout';
import Login from '../src/pages/auth/Login';
import Register from '../src/pages/auth/Register';
import Dashboard from '../src/pages/dashboard/Dahsboard';
import Users from '../src/pages/dashboard/Users';
import Products from '../src/pages/dashboard/Products';
import '../src/styles/globals.css';
import i18n from "./i18n/i18n";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route 
                        path="/users" 
                        element={
                          <ProtectedRoute requiredRoles={['admin', 'manager']}>
                            <Users />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/products" element={<Products />} />
                      <Route 
                        path="/analytics" 
                        element={
                          <ProtectedRoute requiredRoles={['admin', 'manager']}>
                            <div className="text-center py-12">
                              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Analitik Sayfası
                              </h2>
                              <p className="text-gray-600">
                                Bu sayfa yakında eklenecek...
                              </p>
                            </div>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/settings" 
                        element={
                          <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                              Ayarlar Sayfası
                            </h2>
                            <p className="text-gray-600">
                              Bu sayfa yakında eklenecek...
                            </p>
                          </div>
                        } 
                      />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-4">Sayfa bulunamadı</p>
                    <a 
                      href="/dashboard" 
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Dashboard'a dön
                    </a>
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
