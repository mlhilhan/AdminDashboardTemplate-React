import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

const LanguageSelector = ({
  variant = 'dropdown', // 'dropdown' | 'compact' | 'flag-only'
  showLabel = true,
  className = '',
  position = 'bottom-right' // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dışarı tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Aktif dili bul
  const currentLanguage = SUPPORTED_LANGUAGES.find(
    lang => i18n.language.startsWith(lang.value)
  ) || SUPPORTED_LANGUAGES.find(lang => lang.value === 'tr');


  // Dil değiştir
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);

    // Analytics için dil değişikliğini kaydet (opsiyonel)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_change', {
        language: langCode
      });
    }
  };

  // Pozisyon class'ları
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      default:
        return 'top-full right-0 mt-2';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          aria-label={t('language')}
        >
          <img
            src={`https://flagcdn.com/w40/${currentLanguage.countryCode.toLowerCase()}.png`}
            alt={currentLanguage.label}
            className="w-5 h-3 object-cover rounded-sm"
          />
          <span className="font-medium text-gray-700">
            {currentLanguage.value.toUpperCase()}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className={`absolute ${getPositionClasses()} w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto`}>
            <div className="py-1">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.value}
                  onClick={() => changeLanguage(language.value)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${currentLanguage.value === language.value
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700'
                    }`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${language.countryCode.toLowerCase()}.png`}
                    alt={language.label}
                    className="w-5 h-3 object-cover rounded-sm"
                  />
                  <span>{language.label}</span>
                  {currentLanguage.value === language.value && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'flag-only') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 text-xl bg-white border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          aria-label={t('language')}
          title={currentLanguage.label}
        >
          <img
            src={`https://flagcdn.com/w40/${currentLanguage.countryCode.toLowerCase()}.png`}
            alt={currentLanguage.label}
            className="w-5 h-3 object-cover rounded-sm"
          />
        </button>

        {isOpen && (
          <div className={`absolute ${getPositionClasses()} w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto`}>
            <div className="py-1">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.value}
                  onClick={() => changeLanguage(language.value)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${currentLanguage.value === language.value
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700'
                    }`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${language.countryCode.toLowerCase()}.png`}
                    alt={language.label}
                    className="w-5 h-3 object-cover rounded-sm"
                  />
                  <span>{language.label}</span>
                  {currentLanguage.value === language.value && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm min-w-[140px]"
        aria-label={t('language')}
      >
        <img
          src={`https://flagcdn.com/w40/${currentLanguage.countryCode.toLowerCase()}.png`}
          alt={currentLanguage.label}
          className="w-5 h-3 object-cover rounded-sm"
        />
        {showLabel && (
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">{t('language')}</span>
            <span className="font-medium text-gray-700">
              {currentLanguage.label}
            </span>
          </div>
        )}
        <svg
          className={`w-4 h-4 ml-auto text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute ${getPositionClasses()} w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto`}>
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.value}
                onClick={() => changeLanguage(language.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${currentLanguage.value === language.value
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700'
                  }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${language.countryCode.toLowerCase()}.png`}
                  alt={language.label}
                  className="w-5 h-3 object-cover rounded-sm"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{language.label}</span>
                  <span className="text-xs text-gray-500 uppercase">
                    {language.value}
                  </span>
                </div>
                {currentLanguage.value === language.value && (
                  <svg className="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
