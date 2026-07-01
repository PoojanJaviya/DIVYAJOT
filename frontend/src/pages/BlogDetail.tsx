import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '@/services/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatDate } from '@/utils/helpers';

interface Post {
  id: string; title: string; slug: string; content: string;
  excerpt: string; category: string; publishedAt: string; views: number;
  author?: { name: string };
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost]       = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${slug}`)
      .then(res => setPost(res.data.blog))
      .catch(() => setPost({
        id: '1', slug: slug!, title: 'Blog Post',
        excerpt: 'An inspiring story from the field.',
        content: '<p>This blog post is coming soon. Please check back later.</p>',
        category: 'Impact Story', publishedAt: new Date().toISOString(), views: 0,
      }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner fullscreen />;
  if (!post) return <div className="pt-32 text-center text-gray-400">Post not found</div>;

  return (
    <>
      <Helmet>
        <title>{post.title} – DIVYAJOT</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="pt-18 bg-gradient-to-br from-teal-700 to-teal-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/blog" className="text-white/70 hover:text-white text-sm mb-4 inline-block">← Back to Blog</Link>
          <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wide mb-4">{post.category}</span>
          <h1 className="font-poppins font-extrabold text-3xl md:text-4xl leading-tight mb-4">{post.title}</h1>
          <div className="flex gap-4 text-white/70 text-sm">
            <span>📅 {formatDate(post.publishedAt)}</span>
            {post.author && <span>✍️ {post.author.name}</span>}
            <span>👁 {post.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-lg prose-teal max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 pt-8 border-t border-gray-200 flex gap-3">
            <Link to="/blog" className="btn-secondary text-sm py-2">← All Posts</Link>
            <Link to="/donate" className="btn-primary text-sm py-2">❤️ Support Our Work</Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
