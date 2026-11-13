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
 * Supports seamless dark (night) and light (bright) mode assets.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  variant = 'horizontal',
  height = 28,
  responsiveMobileMonogram = false,
}) => {
  if (variant === 'monogram') {
    return (
      <span className={`w-brand-mark ${className}`} style={{ display: 'inline-flex' }}>
        <picture className="w-brand-dark">
          <source srcSet="/brand/wontwe-monogram.webp" type="image/webp" />
          <img
            src="/brand/wontwe-monogram.png"
            alt="WONTWE monogram"
            width={596}
            height={444}
            style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
          />
        </picture>
        <picture className="w-brand-light">
          <source srcSet="/brand/wontwe-monogram-light.webp" type="image/webp" />
          <img
            src="/brand/wontwe-monogram-light.png"
            alt="WONTWE monogram"
            width={596}
            height={444}
            style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
          />
        </picture>
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span className={`w-brand-mark ${className}`} style={{ display: 'inline-flex' }}>
        <picture className="w-brand-dark">
          <source srcSet="/brand/wontwe-lockup-full.webp" type="image/webp" />
          <img
            src="/brand/wontwe-lockup-full.png"
            alt="WONTWE — YES WE DO."
            width={908}
            height={706}
            style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
          />
        </picture>
        <picture className="w-brand-light">
          <source srcSet="/brand/wontwe-lockup-full-light.webp" type="image/webp" />
          <img
            src="/brand/wontwe-lockup-full-light.png"
            alt="WONTWE — YES WE DO."
            width={908}
            height={706}
            style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
          />
        </picture>
      </span>
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
      {/* Monogram */}
      <picture className="w-brand-dark" style={{ flexShrink: 0 }}>
        <source srcSet="/brand/wontwe-monogram.webp" type="image/webp" />
        <img
          src="/brand/wontwe-monogram.png"
          alt="WONTWE"
          width={596}
          height={444}
          style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
        />
      </picture>
      <picture className="w-brand-light" style={{ flexShrink: 0 }}>
        <source srcSet="/brand/wontwe-monogram-light.webp" type="image/webp" />
        <img
          src="/brand/wontwe-monogram-light.png"
          alt="WONTWE"
          width={596}
          height={444}
          style={{ height: `${height}px`, width: 'auto', objectFit: 'contain' }}
        />
      </picture>

      {/* Wordmark */}
      <picture
        className={`w-brand-dark ${responsiveMobileMonogram ? 'w-brand-wordmark-hide-compact' : ''}`}
        style={{ flexShrink: 0 }}
      >
        <source srcSet="/brand/wontwe-wordmark.webp" type="image/webp" />
        <img
          src="/brand/wontwe-wordmark.png"
          alt=""
          width={908}
          height={136}
          style={{
            height: `${Math.round(height * 0.64)}px`,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </picture>
      <picture
        className={`w-brand-light ${responsiveMobileMonogram ? 'w-brand-wordmark-hide-compact' : ''}`}
        style={{ flexShrink: 0 }}
      >
        <source srcSet="/brand/wontwe-wordmark-light.webp" type="image/webp" />
        <img
          src="/brand/wontwe-wordmark-light.png"
          alt=""
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
