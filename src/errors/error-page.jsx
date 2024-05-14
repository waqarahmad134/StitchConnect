import React from 'react'
import { useRouteError } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='h-screen'>
      <Header/>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Footer/>
    </div>
  );
}
