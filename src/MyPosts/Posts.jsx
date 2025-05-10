import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import PostPrev from './PostPrev';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';

const PostsCont = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  justify-items: center;
`;

function Posts() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('Not authenticated');
        return;
      }
      const { id } = jwtDecode(jwtToken);

      try {
        const res = await fetch(`${apiUrl}/users/${id}/posts`);
        const json = await res.json();
        setPosts(json);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }

    fetchPosts();
  }, [apiUrl, refresh]); // run once when component mounts

  return (
    <>
      <Header />
      <PostsCont>
        {posts ? (
          posts.map((post) => (
            <PostPrev
              key={post.id}
              author={post.author}
              title={post.title}
              content={post.content}
              isPublished={post.isPublished}
              id={post.id}
              setRefresh={setRefresh}
            />
          ))
        ) : (
          <p>Loading posts...</p>
        )}
      </PostsCont>
    </>
  );
}

export default Posts;
