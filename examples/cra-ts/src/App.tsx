import logo from './assets/logo.svg';
import './App.css';

const App: React.FC = () => (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className='App-link'
        href='https://reactjs.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn React
      </a>
    </header>
  </div>
);

// eslint-disable-next-line import/no-default-export
export default App;
