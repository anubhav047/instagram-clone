import './App.css';
import Login from './components/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
