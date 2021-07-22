import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';

import cardClasses from './PokemonCard.module.css';
import { useSelector } from 'react-redux';
import { pokemonAPI } from '../../api/api';

const PokemonCard = (props: any) => {
  const { pokemon, id, setPokemon } = props;
  const [picture, setPicture] = useState(null);
  useEffect(() => {
    async function getPicture(id: number) {
      const response = pokemonAPI.getPokemonPicture(id);
      setPicture(await response);
    }

    getPicture(id);
  }, []);

  return (
    <div className={cardClasses.card}>
      {pokemon ? (
        <Card
          hoverable
          style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', height: '100%' }}
          cover={<img className={cardClasses.pokemonImg} alt="example" src={`${picture}`} />}
        >
          <Meta title={`${pokemon.name}`} style={{ textAlign: 'center' }} />
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default PokemonCard;
