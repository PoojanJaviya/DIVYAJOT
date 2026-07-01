import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatDate } from '@/utils/helpers';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  publishedAt: string;
  views: number;
}

// Fallback static data
const STATIC_POSTS: Post[] = [
  { id: '1', title: 'How One Scholarship Changed Three Generations in a Tribal Family', slug: 'scholarship-tribal-family', excerpt: 'Kavita, the first engineer in her village, credits DIVYAJOT\'s support as the turning point.', category: 'Impact Story', publishedAt: '2024-11-15', views: 1240 },
  { id: '2', title: 'Winter Relief 2024: 1,200 Blankets Distributed in 3 Days',         slug: 'winter-relief-2024',       excerpt: 'Our biggest winter relief operation yet, covering 18 locations with 400 volunteers in a coordinated city-wide drive.', category: 'Activity Report', publishedAt: '2024-12-02', views: 890 },
  { id: '3', title: 'Mobile Health Camp Brings Doctors to 22 Villages',                  slug: 'mobile-health-camp',       excerpt: 'Partnering with Dr. Mehta\'s clinic, our October camp served 680 patients in a single weekend.', category: 'Healthcare', publishedAt: '2024-10-28', views: 760 },
];

const CAT_COLORS: Record<string, string> = {
  'Impact Story':    'bg-teal-50 text-teal-600',
  'Activity Report': 'bg-blue-50 text-blue-600',
  'Healthcare':      'bg-green-50 text-green-600',
  'Education':       'bg-amber-50 text-amber-700',
};

const Blog: React.FC = () => {
  const [posts, setPosts]     = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs')
      .then(res => setPosts(res.data.blogs || STATIC_POSTS))
      .catch(() => setPosts(STATIC_POSTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog & News – DIVYAJOT</title>
        <meta name="description" content="Latest news, impact stories, and activity updates from DIVYAJOT." />
      </Helmet>

      <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl mb-5">Blog & News</h1>
          <p className="text-white/80 text-lg">Stories, reports, and updates from the field.</p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge="Latest" title="Stories from the Field" />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="card overflow-hidden group"
                >
                  <div className="h-48 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-5xl">
                    📰
                  </div>
                  <div className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${CAT_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                      {post.category}
                    </span>
                    <h3 className="font-poppins font-bold text-gray-900 text-base mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-3 text-xs text-gray-400 pt-3 border-t border-gray-100">
                      <span>📅 {formatDate(post.publishedAt)}</span>
                      <span>👁 {post.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
