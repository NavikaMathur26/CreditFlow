import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrandLogo({ className = '', size = 'md', onClick }) {
  const navigate = useNavigate();

  const heightMap = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
    xxl: 'h-22 sm:h-26',
  };

  const currentHeight = heightMap[size] || heightMap.md;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="CreditFlow Home"
      className={`inline-flex items-center select-none cursor-pointer group transition-all duration-200 hover:opacity-95 ${className}`}
    >
      <img
        src="/images/creditflowlogo.png"
        alt="CreditFlow"
        className={`${currentHeight} w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]`}
        loading="eager"
      />
    </div>
  );
}
