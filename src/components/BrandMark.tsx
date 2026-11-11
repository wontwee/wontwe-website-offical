import React from 'react';

export type BrandMarkVariant = 'horizontal' | 'monogram' | 'stacked';

interface BrandMarkProps {
  className?: string;
  variant?: BrandMarkVariant;
  height?: number;
  responsiveMobileMonogram?: boolean;
}

/**
 * Official WONTWE Brand Identity component rendering the original extracted
 * W monogram, complete WONTWE wordmark (with signature purple W), and "YES WE DO." lockup.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  variant = 'horizontal',
  height = 28,
  responsiveMobileMonogram = false,
}) => {
  if (variant === 'monogram') {
    return (
      <picture className={`w-brand-picture ${className}`} style={{ display: 'inline-block' }}>
        <source srcSet="/brand/wontwe-monogram.webp" type="image/webp" />
        <img
          src="/brand/wontwe-monogram.png"
          alt="WONTWE monogram"
          width={596}
          height={444}
          style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </picture>
    );
  }

  if (variant === 'stacked') {
    return (
      <picture className={`w-brand-picture ${className}`} style={{ display: 'inline-block' }}>
        <source srcSet="/brand/wontwe-lockup-full.webp" type="image/webp" />
        <img
          src="/brand/wontwe-lockup-full.png"
          alt="WONTWE — YES WE DO."
          width={908}
          height={706}
          style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </picture>
    );
  }

  // Clean horizontal navigation lockup: standalone W monogram + official WONTWE wordmark
  return (
    <span
      className={`w-brand-horizontal ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.72rem',
      }}
    >
      <picture style={{ display: 'inline-block', flexShrink: 0 }}>
        <source srcSet="/brand/wontwe-monogram.webp" type="image/webp" />
        <img
          src="/brand/wontwe-monogram.png"
          alt="WONTWE"
          width={596}
          height={444}
          style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </picture>

      <picture
        className={responsiveMobileMonogram ? 'w-brand-wordmark-hide-compact' : ''}
        style={{ display: 'inline-block', flexShrink: 0 }}
      >
        <source srcSet="/brand/wontwe-wordmark.webp" type="image/webp" />
        <img
          src="/brand/wontwe-wordmark.png"
          alt="WONTWE wordmark"
          width={908}
          height={136}
          style={{
            height: `${Math.round(height * 0.64)}px`,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </picture>
    </span>
  );
};
