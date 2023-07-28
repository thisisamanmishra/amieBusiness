import { useEffect, useState, forwardRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from "./pages/home/Home";
import SignIn from "./pages/login/signin";
import Signup from "./pages/login/signup";
import List from "./pages/list/List";
import AllList from './pages/AllBookings/AllList';
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "./style/dark.scss";
import { setError, clearError, clearSuccess } from './redux/slices/appSlice';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from './utils/ProtectedRoute';
import { Alert } from '@mui/material';
import { getRestaurantAction } from './redux/actions/restaurantAction';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const isAuthenticated = useSelector((state) => state.restaurantState.isAuthenticated);
  const { error, success } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const CustomAlert = forwardRef((props, ref) => <Alert elevation={6} variant="filled" {...props} ref={ref} />);

  useEffect(() => {
      dispatch(getRestaurantAction());

  }, [dispatch])

 

  useEffect(() => {
      if (error) {
          setIsErrorOpen(true);

      } else if (success) {
          setIsSuccessOpen(true);
      }

  }, [error, success]);

  const handleErrorClose = () => {
      setIsErrorOpen(false);
      dispatch(clearError());
  }

  const handleSuccessClose = () => {
      setIsSuccessOpen(false);
      dispatch(clearSuccess());
  }


  return (
    <HelmetProvider>
    <div className={darkMode ? "app dark" : "app"}>
    <Router>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/allbookings' element={<ProtectedRoute><AllList /></ProtectedRoute>} />
        <Route path='/booking' element={<ProtectedRoute><List /></ProtectedRoute>} />
        
      </Routes>
    </Router>
      
    </div>
  </HelmetProvider>
  );
}

export default App;




// Old Routes
// eslint-disable-next-line no-lone-blocks
{/* <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter> */}