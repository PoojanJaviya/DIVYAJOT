import React from 'react';
const Blog: React.FC = () => (
  <div>
    <h1 className="font-poppins font-bold text-2xl text-gray-900 mb-2">Blog Management</h1>
    <p className="text-gray-500 text-sm mb-6">Create, edit, and publish blog posts and news articles.</p>
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
      <div className="text-5xl mb-4">📝</div>
      <p className="font-semibold">Rich text blog editor ready for integration.</p>
      <p className="text-sm mt-2">Connect to /api/blogs endpoint to create and manage articles.</p>
    </div>
  </div>
);
export default Blog;
