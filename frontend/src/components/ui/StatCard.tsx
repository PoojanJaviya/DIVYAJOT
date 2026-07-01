import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Props {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
  dark?: boolean;
}

const StatCard: React.FC<Props> = ({ value, suffix = '', label, sub, dark }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="text-center py-12 px-8">
      <div className={`font-poppins font-extrabold leading-none mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}
        style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
      >
        {inView ? (
          <CountUp
            start={0}
            end={value}
            duration={2}
            separator=","
            useEasing
          />
        ) : '0'}
        <span className="text-amber-400">{suffix}</span>
      </div>
      <div className={`font-medium text-base ${dark ? 'text-white/80' : 'text-gray-700'}`}>{label}</div>
      {sub && <div className={`text-sm mt-1 ${dark ? 'text-white/50' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  );
};

export default StatCard;
