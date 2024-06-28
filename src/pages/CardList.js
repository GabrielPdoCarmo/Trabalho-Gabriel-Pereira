// src/pages/CardList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Image, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/Button'; // Importe o componente de botão
import '../css/CardList.css'; // Importe o arquivo CSS
import luneta from '../img/luneta.png'; // Importe a imagem da luneta
import carta from '../img/carta.png'; // Importe a imagem da luneta

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        setCards(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    if (indexOfLastCard < filteredCards.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Box className="card-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            backgroundImage: `url(${luneta})`,
            backgroundSize: '20px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '10px center',
            paddingLeft: '40px'
          }}
        />
      </div>
      <div className="card-list">
        {currentCards.map((card, index) => (
          <div key={card.id} className="card-item" onClick={() => navigate(`/card/${card.id}`)}>
            <Image src={card.card_images[0].image_url} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <CustomButton style={{
          backgroundImage: `url(${carta})`,
          backgroundSize: '20px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10px center',
          paddingLeft: '40px'
        }} label="Anterior" onClick={prevPage} disabled={currentPage === 1} />
        <CustomButton label="Próximo" style={{
          backgroundImage: `url(${carta})`,
          backgroundSize: '20px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'calc(100% - 10px) center',
          paddingRight: '40px'
        }} onClick={nextPage} disabled={indexOfLastCard >= filteredCards.length} />
      </div>
    </Box>
  );
};

export default CardList;
