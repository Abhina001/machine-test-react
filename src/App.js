import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage';
// import HomePage from './Pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './Pages/HomePage';

function App() {

  function PrivateRoute({ children }) {
  const user = useSelector(state => state.auth.user);
  return user ? children : <Navigate to="/" replace />;

}
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
         <Route
        path="/homepage"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      </Routes>
      
     
    </div>
  );
}

export default App;
