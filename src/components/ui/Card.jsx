import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  padding = 'default',
  shadow = 'default',
  hover = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-lg border transition-all duration-200';
  
  const variants = {
    default: 'border-gray-200',
    outlined: 'border-gray-300',
    elevated: 'border-gray-100',
    glass: 'backdrop-blur-sm bg-white/80 border-white/20'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : '';

  const cardClasses = [
    baseClasses,
    variants[variant],
    shadows[shadow],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  const bodyPadding = paddings[padding];

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {(title || subtitle || headerAction) && (
        <div className={`border-b border-gray-200 ${bodyPadding} pb-4 ${headerClassName}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="ml-4 flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={`${bodyPadding} ${title || subtitle || headerAction ? 'pt-4' : ''} ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 ${bodyPadding} pt-4 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

// Card bileşenleri
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

export default Card;
