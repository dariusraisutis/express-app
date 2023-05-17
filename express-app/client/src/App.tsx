import './App.css';
import Login from './components/Login';

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

function App() {
  return (
    <>
      <div className="App">
        <Login />
      </div>
    </>
  );
}

export default App;
