import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to Myshop</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
