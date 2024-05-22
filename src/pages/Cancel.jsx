import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Cancel() {
    return (
      <>
        <Header />
        <div className="w-3/4 mx-auto py-20">
          <h1 className="text-4xl font-switzer font-semibold">Cancel didn;t execute</h1>
        </div>
        <Footer />
      </>
    );
  }
  