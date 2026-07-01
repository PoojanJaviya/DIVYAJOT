import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminLayout from '@/components/layout/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AuthProvider } from '@/context/AuthContext';

// Lazy-loaded public pages
const Home         = lazy(() => import('@/pages/Home'));
const About        = lazy(() => import('@/pages/About'));
const Causes       = lazy(() => import('@/pages/Causes'));
const Activities   = lazy(() => import('@/pages/Activities'));
const Impact       = lazy(() => import('@/pages/Impact'));
const Volunteer    = lazy(() => import('@/pages/Volunteer'));
const Donate       = lazy(() => import('@/pages/Donate'));
const Gallery      = lazy(() => import('@/pages/Gallery'));
const Transparency = lazy(() => import('@/pages/Transparency'));
const Blog         = lazy(() => import('@/pages/Blog'));
const BlogDetail   = lazy(() => import('@/pages/BlogDetail'));
const Contact      = lazy(() => import('@/pages/Contact'));
const NotFound     = lazy(() => import('@/pages/NotFound'));

// Admin pages
const AdminDashboard  = lazy(() => import('@/pages/admin/Dashboard'));
const AdminDonations  = lazy(() => import('@/pages/admin/Donations'));
const AdminVolunteers = lazy(() => import('@/pages/admin/Volunteers'));
const AdminEvents     = lazy(() => import('@/pages/admin/Events'));
const AdminGallery    = lazy(() => import('@/pages/admin/Gallery'));
const AdminBlog       = lazy(() => import('@/pages/admin/Blog'));
const AdminContacts   = lazy(() => import('@/pages/admin/Contacts'));
const AdminLogin      = lazy(() => import('@/pages/admin/Login'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner fullscreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index           element={<Home />} />
            <Route path="about"    element={<About />} />
            <Route path="causes"   element={<Causes />} />
            <Route path="activities" element={<Activities />} />
            <Route path="impact"   element={<Impact />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="donate"   element={<Donate />} />
            <Route path="gallery"  element={<Gallery />} />
            <Route path="transparency" element={<Transparency />} />
            <Route path="blog"     element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact"  element={<Contact />} />
            <Route path="*"        element={<NotFound />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index               element={<AdminDashboard />} />
            <Route path="donations"    element={<AdminDonations />} />
            <Route path="volunteers"   element={<AdminVolunteers />} />
            <Route path="events"       element={<AdminEvents />} />
            <Route path="gallery"      element={<AdminGallery />} />
            <Route path="blog"         element={<AdminBlog />} />
            <Route path="contacts"     element={<AdminContacts />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
