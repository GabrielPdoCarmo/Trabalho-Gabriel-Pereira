// src/pages/CardDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Spinner, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomButton from '../components/Button'; // Importe o componente de botão
import '../css/CardDetails.css'; // Importe o arquivo CSS para estilização adicional


const CardDetails = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
                setCard(response.data.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <Box className="card-details-container">
            {card && (
                <div className="card-details-content">
                    <Image src={card.card_images[0].image_url} alt={card.name} />
                    <div className="card-details-info">
                        <Text ><strong>Nome:</strong> {card.name}</Text>
                        <Text ><strong>Descrição:</strong> {card.desc}</Text>
                        <Text ><strong>Ataque:</strong> {card.atk}</Text>
                        <Text ><strong>Defesa:</strong> {card.def}</Text>
                        <Text ><strong>Nível:</strong> {card.level}</Text>
                        <Text ><strong>Tipo:</strong> {card.type}</Text>
                        <Text ><strong>Atributo:</strong> {card.attribute}</Text>
                        <CustomButton label="Voltar" onClick={() => navigate('/cards')} />
                    </div>
                </div>
            )}
        </Box>
    );
};

export default CardDetails;
