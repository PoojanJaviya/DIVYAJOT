import React from 'react';

interface Props {
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

const LoadingSpinner: React.FC<Props> = ({ fullscreen, size = 'md' }) => {
  const spinner = (
    <div
      className={`${sizes[size]} border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin`}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
