import React from 'react';
import Header from '../components/common/Header';
import CategoryMenu from './Menu/CategoryMenu';
import Cards from './Cards/Cards';
import CardCallApi from './Cards/CardsProp';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Phan 1 */}
      <Header />
      <CategoryMenu />
      {/* Phan 2 */}
      <Cards />
      {/* <CardCallApi /> */}
    </>
  );
};

export default React.memo(HomePage);