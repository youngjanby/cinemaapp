import { useEffect, useState } from 'react';
import ErrorAlert from './errors/Error';
import MainPage from './pages/mainPage/mainPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Details, { detailsLoader } from './pages/details/details';
import Header from './header/Header';
import Auth from './pages/auth/auth';
import ContextToken from './pages/auth/ContextToken';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Header />}>
  <Route path='/' element={<MainPage />} />
  <Route path='/details/:id' element={<Details />} loader={detailsLoader} />
  <Route path='/giveToken' element={<Auth placeholderButton='Получить токен' placeholderInput='Почта' />} />
  <Route path='/giveToken/sendToken' element={<Auth placeholderButton='Отправить' placeholderInput='Токен' />} />
  <Route path='*' element={<ErrorAlert />} />
  </Route>
))

/* <Route path='/favoritefilmes' element={<FilteredFilmes />} /> */
function App() {

  const [inputValue, setInputValue] = useState('') 
  const [tokenOrMail, setTokenOrMail] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', tokenOrMail)
  }, [tokenOrMail])
  
  let tokenState = {
    inputValue,
    tokenOrMail,
    setInputValue,
    setTokenOrMail
  }

    return (
        <ContextToken.Provider value={tokenState}>
          <RouterProvider router={router} />
        </ContextToken.Provider>
    )
}

export default App;
