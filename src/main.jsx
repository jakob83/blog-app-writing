import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Post from './Post/Post.jsx';
import Posts from './MyPosts/Posts.jsx';
import CreatePost from './CreatePost/CreatePost.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/signup',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/posts/new',
    element: <CreatePost />,
  },
  { path: '/posts/:id', element: <Post /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
