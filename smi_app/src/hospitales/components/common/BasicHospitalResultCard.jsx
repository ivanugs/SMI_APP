import React, { useState, useEffect } from 'react';
import './ResultCard.css';

export const BasicHospitalResultCard = ({ index, objeto, active }) => {
  const [isActive, setIsActive] = useState(active);



  const handleClick = () => {
    alert("Click")
  };

  return (
    <div
      className={`result-card ${isActive ? 'card-active' : ''} `}
      onClick={handleClick}
    >
      <div className="result-card__content">
        <h3 className={`result-card__title ${isActive ? 'card-active' : ''}`}>{objeto.nombre_de_la_unidad}</h3>
      </div>
    </div>
  );
};
