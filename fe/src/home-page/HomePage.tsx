import React from 'react';
import Header from '../components/common/Header';
import CategoryMenu from './Menu/CategoryMenu';
import Cards from './Cards/Cards';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Phan 1 */}
      <Header />
      <CategoryMenu />
      {/* Phan 2 */}
      <Cards />


    </>
  );
};

export default React.memo(HomePage);