import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import { redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreatePost = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({ title, content: '', isPubslished: false }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return setError(errorData.error || 'Failed to create post');
      }
      const post = await res.json();
      if (!post) {
        return setError('Failed to create post');
      }
      return navigate('/posts/' + post.id);
    } catch (error) {
      return setError(error.error || error.message || 'An error occurred');
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Create a New Post</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Post Title"
            required
            onChange={handleTitleChange}
            value={title}
          />
          <Button type="submit">Create Post</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
      </Container>
    </>
  );
};

export default CreatePost;
