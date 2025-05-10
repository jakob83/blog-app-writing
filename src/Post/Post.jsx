import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Header from '../Header/Header';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SubmitButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Form = styled.form`
  margin: auto;
  margin-bottom: 50px;
  padding: 2px 2px;
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
`;
const BackButton = styled(Link)`
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover svg path {
    fill: #d32f2f;
  }
  svg path {
    transition: fill 0.2s ease;
  }
`;
const Message = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-align: center;
`;

const UploadForm = styled.form`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  margin: 20px auto;
`;

const UploadBtn = styled.button`
  margin: 0 20px;
  background-color: #208d17;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #15580f;
  }
`;
const TakeDownBtn = styled(UploadBtn)`
  background-color: #e29520;
  &:hover {
    background-color: #ac7018;
  }
`;
const DeleteForm = styled(UploadForm)``;
const DeleteBtn = styled(UploadBtn)`
  background-color: #d32f2f;
  &:hover {
    background-color: #c62828;
  }
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;
const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + params.id;
        const res = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          return setError(errorData.error || 'Something went wrong');
        }
        const data = await res.json();
        setPost(data);
      } catch (error) {
        setError(error.msg || error.error || 'Something went wrong');
      }
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e, newIsPublished) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + params.id;
    const { title, content } = post;
    console.log(post);
    try {
      const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          isPublished:
            newIsPublished == undefined ? post.isPublished : newIsPublished,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return setError(errorData.error || 'Something went wrong');
      }
      // Check if post toggle was clicked by user
      // Because then we dont wanna navigate to posts
      if (newIsPublished !== undefined) {
        const data = await res.json();
        setPost(data);
        return setError(null);
      }
      navigate('/posts');
      return setError(null);
    } catch (error) {
      return setError(error.msg || 'Something went wrong');
    }
  };

  const handleDelete = async (e) => {
    const confirmation = confirm(
      'Are you sure you want to permanently delete thi Post?'
    );
    if (!confirmation) {
      // Prevent the form from submitting if the user cancels
      return;
    }
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL + '/posts/' + params.id;
    try {
      const res = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return setError(errorData.error || 'Something went wrong');
      }
      navigate('/posts');
    } catch (error) {
      return setError(error.msg || error.error || 'Something went wrong');
    }
  };
  console.log(import.meta.env.VITE_TINY_API_KEY);
  return (
    <>
      <Header />
      <TopSection>
        <BackButton to="/posts">
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z"
                fill="#34d399"
              ></path>
            </g>
          </svg>
        </BackButton>
        <Message>Edit your post below:</Message>
      </TopSection>
      <UploadForm onSubmit={(e) => handleSubmit(e, !post.isPublished)}>
        {post &&
          (post.isPublished ? (
            <TakeDownBtn type="submit">Take down</TakeDownBtn>
          ) : (
            <UploadBtn type="submit">Publish</UploadBtn>
          ))}
      </UploadForm>
      <DeleteForm onSubmit={handleDelete}>
        <DeleteBtn type="submit">Delete</DeleteBtn>
      </DeleteForm>
      <Form onSubmit={handleSubmit}>
        <Label>Post Title</Label>
        <Input
          type="text"
          placeholder="Post Title"
          required
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          value={post ? post.title : ''}
        />
        <Editor
          apiKey={import.meta.env.VITE_TINY_API_KEY} // Ensure API key is correct
          onEditorChange={(content) => setPost({ ...post, content })}
          value={post ? post.content : ''}
          init={{
            height: 500,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | image | help', // Add the image button to the toolbar
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            // Allow image uploads (optional, if you have a server for uploads)
            images_upload_url: import.meta.env.VITE_API_URL + '/upload', // URL to your upload endpoint
          }}
        />
        <SubmitButton type="submit">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>save_line</title>{' '}
              <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="File" transform="translate(-576.000000, -96.000000)">
                  <g
                    id="save_line"
                    transform="translate(576.000000, 96.000000)"
                  >
                    <path
                      d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                      id="MingCute"
                      fillRule="nonzero"
                    ></path>
                    <path
                      d="M6,2 C4.89543,2 4,2.89543 4,4 L4,20 C4,21.1046 4.89543,22 6,22 L18,22 C19.1046,22 20,21.1046 20,20 L20,6.41421 C20,5.88378 19.7893,5.37507 19.4142,5 L17,2.58579 C16.6249,2.21071 16.1162,2 15.5858,2 L6,2 Z M6,4 L15.5858,4 L18,6.41421 L18,20 L6,20 L6,4 Z M16.2383,10.793 C16.6289,10.4025 16.6289,9.76934 16.2383,9.37881 C15.8478,8.98829 15.2147,8.98829 14.8241,9.37881 L10.5815,13.6215 L9.16727,12.2072 C8.77675,11.8167 8.14358,11.8167 7.75306,12.2072 C7.36253,12.5978 7.36253,13.2309 7.75306,13.6215 L9.80367,15.6721 C10.2332,16.1016 10.9297,16.1016 11.3593,15.6721 L16.2383,10.793 Z"
                      id="形状"
                      fill="#000000"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </SubmitButton>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
    </>
  );
}

export default Post;
