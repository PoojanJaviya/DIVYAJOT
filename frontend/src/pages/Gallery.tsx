import React from 'react';
import { Helmet } from 'react-helmet-async';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import SectionHeader from '@/components/ui/SectionHeader';

const CATEGORIES = ['All','Bhojan Seva','Health Camps','Education','Winter Relief','Women Programs','Animal Welfare'];

const Gallery: React.FC = () => (
  <>
    <Helmet>
      <title>Gallery – DIVYAJOT</title>
      <meta name="description" content="Photo and video gallery of DIVYAJOT's activities, events, and impact across Gujarat." />
    </Helmet>

    <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Gallery</h1>
        <p className="text-white/80 text-lg">Every photo tells a story of change — real people, real moments, real transformation.</p>
      </div>
    </div>

    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge="Moments of Impact" title="See Our Work in Pictures" />

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button key={c}
              className="px-4 py-2 rounded-full text-sm font-medium border-2 border-gray-200 bg-white text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all duration-200 first:border-teal-500 first:bg-teal-50 first:text-teal-600"
            >
              {c}
            </button>
          ))}
        </div>

        <GalleryGrid />

        <div className="text-center mt-10">
          <button className="btn-secondary">Load More Photos</button>
        </div>
      </div>
    </section>
  </>
);

export default Gallery;
