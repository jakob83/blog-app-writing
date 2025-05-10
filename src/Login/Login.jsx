import styled from 'styled-components';
import Header from '../Header/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        return setError(errorData.error);
      }
      const jwtToken = await res.json();
      localStorage.setItem('jwtToken', jwtToken);
      navigate('/');
    } catch (error) {
      setError(error.error || 'An error occured');
    }
  }
  return (
    <>
      <Header />
      <LoginContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Login</Title>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit">Become Author</Button>
        </Form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </LoginContainer>
    </>
  );
}

export default Login;
