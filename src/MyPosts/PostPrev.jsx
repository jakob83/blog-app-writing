import styled from 'styled-components';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useState } from 'react';
const PostContainer = styled(Link)`
  position: relative;
  text-decoration: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: transform 0.2s;
  max-width: 600px;
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: scale(1.02);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(transparent, #f9f9f9);
  }

  & img,
  div,
  p {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

const FormsContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  gap: 10px;
`;
const UploadCont = styled.div``;

const UploadBtn = styled.button`
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s ease;
  border: 2px solid black;
  &:hover {
    border: 2px solid #2da322;
  }
`;
const TakeDownBtn = styled(UploadBtn)`
  &:hover {
    border: 2px solid #ac7018;
  }
`;
const DeleteCont = styled(UploadCont)``;
const DeleteBtn = styled(UploadBtn)`
  &:hover {
    border: 2px solid #c62828;
  }
`;
function PostPrev({ title, author, content, id, isPublished, setRefresh }) {
  const [error, setError] = useState(null);
  const [newIsPublished, setNewIsPublished] = useState(isPublished);

  let parsedContent = parse(content);

  async function handlePublishToggle(e) {
    e.preventDefault();
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ isPublished: !newIsPublished }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to update post');
        return;
      }
      const updatedPost = await res.json();
      setNewIsPublished(updatedPost.isPublished);
      if (!updatedPost) {
        setError('Failed to update post');
        return;
      }
    } catch (error) {
      setError(error.error || error.message || 'An error occurred');
    }
  }
  async function handleDelete(e) {
    e.preventDefault();
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to update post');
        return;
      }
      const deletedPost = await res.json();
      if (!deletedPost) {
        setError('Failed to update post');
        return;
      }
      setRefresh((old) => {
        return old + 1;
      });
    } catch (error) {
      setError(error.error || error.message || 'An error occurred');
    }
  }

  return (
    <PostContainer to={`/posts/${id}`}>
      <h2>{title}</h2>
      <p>
        by <i>{author.username}</i>
      </p>
      {parsedContent}
      <FormsContainer>
        <UploadCont>
          {newIsPublished ? (
            <TakeDownBtn onClick={handlePublishToggle}>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L13.2934 9.29237C12.9018 9.10495 12.4631 9 12 9C11.0941 9 10.282 9.40154 9.73188 10.0364C9.81721 10.0127 9.90713 10 10 10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12C9.57566 12 9.21306 11.7357 9.06782 11.3627C9.0234 11.5681 9 11.7813 9 12C9 12.4631 9.10495 12.9018 9.29237 13.2934L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L8.39334 17.0209C9.41615 17.6007 10.6208 18 12 18C15.8632 18 18.3567 14.8671 19.3211 13.4107L19.3639 13.3465C19.5748 13.031 19.8565 12.6098 19.8565 12C19.8565 11.3902 19.5748 10.969 19.3639 10.6535L19.3211 10.5893C18.9071 9.96417 18.2114 9.03014 17.2466 8.16758L19.7071 5.70711ZM15.4462 9.96803L14.7076 10.7066C14.895 11.0982 15 11.5369 15 12C15 13.6569 13.6569 15 12 15C11.5369 15 11.0982 14.895 10.7066 14.7076L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C11.6289 16 11.2576 15.9548 10.8904 15.8741C11.2444 15.9551 11.6145 16 12 16C12.3857 16 12.7561 15.9551 13.1103 15.874C12.7429 15.9548 12.3714 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803Z"
                    fill="#e29520"
                  ></path>
                  <path
                    d="M12 6C12.8009 6 13.5429 6.13465 14.2247 6.36111L12.5546 8.03119C12.3735 8.01074 12.1886 8 12 8C9.79087 8 8 9.79086 8 12C8 12.1861 8.0127 12.3692 8.03729 12.5485L5.75955 14.8262C5.29473 14.2965 4.93355 13.7952 4.67895 13.4107L4.63614 13.3465C4.42519 13.031 4.14355 12.6098 4.14355 12C4.14355 11.3902 4.42519 10.969 4.63614 10.6535L4.67895 10.5893C5.64331 9.13292 8.13685 6 12 6Z"
                    fill="#e29520"
                  ></path>
                  <path
                    d="M12 8C12.1846 8 12.3693 8.01117 12.5534 8.03234L12.5485 8.03729C12.3692 8.01271 12.1861 8 12 8Z"
                    fill="#e29520"
                  ></path>
                </g>
              </svg>
            </TakeDownBtn>
          ) : (
            <UploadBtn onClick={handlePublishToggle}>
              <svg
                fill="#15580f"
                width="24px"
                height="24px"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H12V12H30A6,6,0,0,0,30,0H6A5.9966,5.9966,0,0,0,0,6V90a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"></path>{' '}
                    <path d="M90,0H66a6,6,0,0,0,0,12h9.5156L37.7578,49.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L84,20.4844V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"></path>{' '}
                  </g>
                </g>
              </svg>
            </UploadBtn>
          )}
        </UploadCont>
        <DeleteCont>
          <DeleteBtn onClick={handleDelete}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#c41c1c"
                  d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                ></path>
              </g>
            </svg>
          </DeleteBtn>
        </DeleteCont>
        {error && (
          <p style={{ color: 'red' }}>
            {error}
            <button
              onClick={(e) => {
                e.preventDefault();
                setError(null);
              }}
            >
              X
            </button>
          </p>
        )}
      </FormsContainer>
    </PostContainer>
  );
}

export default PostPrev;
