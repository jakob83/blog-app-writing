import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostContainer = styled(Link)`
  text-decoration: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 600px;
  width: 100%;
  &:hover {
    transform: scale(1.02);
  }
`;

function PostPrev({ title, author, content, id }) {
  return (
    <PostContainer to={`/posts/${id}`}>
      <h2>{title}</h2>
      <i>{author.username}</i>
      <p>{content.length > 200 ? content.slice(0, 200) + '...' : content}</p>
    </PostContainer>
  );
}

export default PostPrev;
