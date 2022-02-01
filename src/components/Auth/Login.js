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
      <article className="dark p-5 text-dark">
        <h1>projects to complete</h1>
      </article>
      <Container>
        <Card className="m-2 mt-5 border-dark text-center loginCard">
          <Card.Header className="dark text-white">
            <h2>login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button onClick={() => handleAuth()} className="btn btn-dark">
              login w/ Github
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}