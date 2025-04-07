import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartFromTop from "./Pages/StartFromTop";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import About from "./Pages/About";
import WeddingAlbums from "./components/photography_components/WeddingAlbums";
import AlbumDetails from "./components/photography_components/AlbumDetails";
import VideoAlbums from "./components/film_components/VideoAlbums";
import VideoDetail from "./components/film_components/VideoDetail";
import Contact from "./Pages/Contact";
import Blogpage from "./components/blog_components/BlogPage";
import BlogDetail from "./components/blog_components/BlogDetail";
import UploadAlbum from "./UploadAlbum";
import AdminPanel from "./AdminPannel";
import EditAlbum from "./EditAlbum";
import Adminlogin from "./components/AdminPortal/Adminlogin";
import { ToastContainer } from 'react-toastify';

// Protected Route component
const ProtectedRoute = ({ children, isAdminRoute }) => {
  // Only check token for admin routes
  if (isAdminRoute) {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <ToastContainer/>
      <StartFromTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="photography" element={<WeddingAlbums />} />
          <Route path="album/:albumId" element={<AlbumDetails />} />
          <Route path="films" element={<VideoAlbums />} />
          <Route path="video/:videoId" element={<VideoDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blogpage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="upload" element={<UploadAlbum />} />
          <Route path="admin/login" element={<Adminlogin />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute isAdminRoute={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute isAdminRoute={true}>
                <EditAlbum />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;