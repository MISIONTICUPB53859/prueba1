import './App.css';
import Router from './config/Router';
import SkynetContextProvider from './context/SkynetContext';
import  UserContextProvider  from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <SkynetContextProvider>
        <Router />
      </SkynetContextProvider>
    </UserContextProvider>
  );
}

export default App;
