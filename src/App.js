import './App.css';
import Createpost from './components/Createpost';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<SignUp/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/user/:userId" element={<UserProfile/>}></Route>
        <Route exact path="/createPost" element={<Createpost/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
