import React from 'react';
import { NavBar } from '../../ui/components/NavBar';

export const HomeComponent = () => {
  const userName = localStorage.getItem("name");
  return (
    <div style={{ fontSize: '30px' }}>
      <b>Bienvenido {userName}</b>
</div>

  );
};
