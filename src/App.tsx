import React, { useEffect } from 'react';
import './App.css';
import { Header } from './Header/Header';
import { Options } from './Options/Options';
import { MainPage } from './MainPage/MainPage';
import { Authors } from './Authors/Authors';
import { BookPage } from './BookPage/BookPage';
import { Cart } from './Cart/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { changeOrder } from './store/actions/orderActions';
import { useAppDispath, useAppSelector } from './store';
import { OrderProps } from './Book/BookTypes';
import { Authorization } from './Authorization/Authorization';
import { EditPage } from './EditPage/EditPage';
import { UserPage } from './UserPage/UserPage';
import { Registration } from './Registration/Registration';


function App() {
  const dispath = useAppDispath();
  const userInfo = useAppSelector((state) => state.tokenR.user)
  const orderInfo = useAppSelector((state) => state.orderR.order)

  const getOrder = () => {
    fetch('/orders/?username=' + userInfo.username + '&status=N', 
    { 
      method: 'get', 
      mode: "cors",
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + userInfo.access, 
      }
    })
    .then((response) => {
        if (response.statusText === "Unauthorized" && !response.ok)
          throw new Error("no auth")
        return response.json()
    })
    .then((data: Array<OrderProps>) => {
        dispath(changeOrder({
            id: data[0].id,
            user_id: 1,
            username: data[0].username,
            count: data[0].count,
            price: 0,
            p_date: data[0].p_date.toString(),
            status: data[0].status
        }));
    })
    .catch((error) => {
    })
  }

  useEffect(() => {
    if (userInfo.access !== "")
      getOrder();
  }, [userInfo.username, orderInfo.username])

  return (
    <div>
      <BrowserRouter basename='/'>
        <Header />
        <Options />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/best" element={<MainPage />} />
          <Route path="/new" element={<MainPage />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/publishers" element={<MainPage />} />
          <Route path="/series" element={<MainPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/user/cart" element={<Cart />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/editbook/:id" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
