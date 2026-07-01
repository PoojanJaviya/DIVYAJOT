import React from 'react';
import StatCard from '@/components/ui/StatCard';
import { STATS } from '@/utils/constants';

const StatsBar: React.FC = () => (
  <section className="bg-teal-500">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/20">
        {STATS.map(stat => (
          <StatCard
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            sub={stat.sub}
            dark
          />
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
