import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Container, Card } from "react-bootstrap";
import { useHistory } from 'react-router';

export default function Login() {
  //the below syntax is what we need to use to import the authenticate function into this component from the Context Provider (authProvider component)
  const { authenticate } = useAuth();
  const history = useHistory();

async function handleAuth(){
    await authenticate();
    history.push('/');
}

  return (
    <div className="login">
      <article className="bg-info mb-5 p-5 text-dark">
        <h1>Welcome to ResourcePlus!</h1>
      </article>
      <Container>
        <Card className="m-2 border-dark text-center">
          <Card.Header className="bg-dark text-white">
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button onClick={() => handleAuth()} className="btn btn-dark">
              Login w/ Github
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}