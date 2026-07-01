import React from 'react';

interface Props {
  badge: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeader: React.FC<Props> = ({ badge, title, description, center }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <span className="section-badge">{badge}</span>
    <h2 className={`section-title text-3xl md:text-4xl mb-4 ${center ? '' : ''}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-gray-500 text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
