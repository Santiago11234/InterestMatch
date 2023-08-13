import React from 'react';
import ProfilePageCard from '../ProfilePageCard'; 
import Burger from '../../../Assets/Images/burger.jpeg';

const Vaca = ({userId}) => {
  return ( 
    <ProfilePageCard
      userId={userId}
      index={2}
      color="rgba(243, 118, 45, 1)"
    />
  );
};


export default Vaca;
