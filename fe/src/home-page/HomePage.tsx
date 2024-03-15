import React from 'react';
import Header from '../components/common/Header';
import CategoryMenu from './Menu/CategoryMenu';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <CategoryMenu />

    </>
  );
};

export default React.memo(HomePage);