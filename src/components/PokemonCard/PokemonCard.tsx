import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';

import cardClasses from './PokemonCard.module.css';
import { useSelector } from 'react-redux';
import { pokemonAPI } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { PokemonType } from '../../types/types';

type PropsType = {
  pokemon?: PokemonType;
  id: number;
};

const PokemonCard: React.FC<PropsType> = (props) => {
  const history = useHistory();
  const offset = useSelector((state: AppStateType) => state.app.offset);

  const goToPokemon = (id: number) => {
    history.push({
      pathname: `/pokemon/${id}`,
    });
  };

  const { pokemon, id } = props;
  const [picture, setPicture] = useState('');
  useEffect(() => {
    async function getPicture(id: number) {
      const response = await pokemonAPI.getPokemonPicture(id);
      setPicture(response);
    }

    getPicture(id);
  }, [id, offset]);

  return (
    <div className={cardClasses.card}>
      <Card
        onClick={() => goToPokemon(id)}
        hoverable
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'aquamarine',
          width: '200px',
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
          borderRadius: '0 10px 0 10px',
        }}
        cover={<img className={cardClasses.pokemonImg} alt="example" src={`${picture}`} />}
      >
        <Meta title={`${pokemon?.name}`} style={{ textAlign: 'center' }} />
      </Card>
    </div>
  );
};

export default PokemonCard;
