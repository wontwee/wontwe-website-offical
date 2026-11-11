import React from 'react';

interface OptimizedImageProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  webpSrc,
  fallbackSrc,
  alt,
  className = '',
  style,
  priority = false,
  width = 1920,
  height = 1080,
}) => {
  return (
    <picture style={{ display: 'block', width: '100%', height: '100%' }}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
};

