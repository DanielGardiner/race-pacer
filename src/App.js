import logo from './logo.svg';
import './App.css';
import './styles/bootstrap-custom-colors.scss';
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button variant="primary" className="mt-3">My button</Button>
      </header>
    </div>
  );
}

export default App;
