// src/components/CustomButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';
import '../css/Button.css'; // Importe o arquivo CSS para estilização adicional

const CustomButton = ({ label, onClick, colorScheme = 'blue', size = 'md', ...props }) => {
  return (
    <Button
      className="custom-button" // Adiciona a classe CSS para estilização
      colorScheme={colorScheme}
      size={size}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
