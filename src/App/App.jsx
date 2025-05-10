import { useEffect, useState } from 'react';
import Post from './PostPrev';
import './App.css';
import Header from '../Header/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100%;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const NewPostLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  return (
    <>
      <Header />
      <HomePage>
        <WelcomeText>
          <h1>Welcome to the Tsagga Blog Writing App!</h1>
          <p>
            Dive into a world of creativity and expression with our Blog App.
            Whether you're here to share your unique stories, insightful
            thoughts, or groundbreaking ideas, this is the perfect platform for
            you. Write, publish, and connect with a community of like-minded
            individuals who are eager to explore your perspective. Let your
            voice be heard and inspire others with your words!
          </p>
        </WelcomeText>
        <img
          src="pics/coding.jpg"
          alt="coding"
          style={{ width: '300px', height: '200px', borderRadius: '10px' }}
        />
        <NewPostLink to="/posts/new">Write a New Post</NewPostLink>
      </HomePage>
    </>
  );
}

export default App;
