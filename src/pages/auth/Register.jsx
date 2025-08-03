import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { validators } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when form data changes
  useEffect(() => {
    if (error) {
      clearError();
    }
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({});
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!validators.required(formData.name)) {
      errors.name = 'Ad Soyad gereklidir';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Ad Soyad en az 2 karakter olmalıdır';
    }

    if (!validators.required(formData.email)) {
      errors.email = 'Email adresi gereklidir';
    } else if (!validators.email(formData.email)) {
      errors.email = 'Geçerli bir email adresi girin';
    }

    if (formData.phone && !validators.phone(formData.phone)) {
      errors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (!validators.required(formData.password)) {
      errors.password = 'Şifre gereklidir';
    } else if (!validators.password(formData.password)) {
      errors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (!validators.required(formData.confirmPassword)) {
      errors.confirmPassword = 'Şifre tekrarı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Hesap oluşturun
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Zaten hesabınız var mı?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Giriş yapın
            </Link>
          </p>
        </div>

        {/* Register form */}
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <Input
              label="Ad Soyad"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ad Soyadınızı girin"
              required
              fullWidth
              leftIcon={<User className="h-5 w-5" />}
              error={formErrors.name}
              disabled={isLoading}
            />

            <Input
              label="Email adresi"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@email.com"
              required
              fullWidth
              leftIcon={<Mail className="h-5 w-5" />}
              error={formErrors.email}
              disabled={isLoading}
            />

            <Input
              label="Telefon numarası"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+90 5XX XXX XX XX"
              fullWidth
              leftIcon={<Phone className="h-5 w-5" />}
              error={formErrors.phone}
              disabled={isLoading}
              helperText="Opsiyonel"
            />

            <Input
              label="Şifre"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="En az 6 karakter"
              required
              fullWidth
              leftIcon={<Lock className="h-5 w-5" />}
              error={formErrors.password}
              disabled={isLoading}
            />

            <Input
              label="Şifre tekrarı"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Şifrenizi tekrar girin"
              required
              fullWidth
              leftIcon={<Lock className="h-5 w-5" />}
              error={formErrors.confirmPassword}
              disabled={isLoading}
            />

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                <Link
                  to="/terms"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Kullanım şartlarını
                </Link>{' '}
                ve{' '}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-500"
                >
                  gizlilik politikasını
                </Link>{' '}
                kabul ediyorum
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              Hesap Oluştur
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          Bu bir demo uygulamasıdır. Gerçek veriler kullanmayın.
        </div>
      </div>
    </div>
  );
};

export default Register;
