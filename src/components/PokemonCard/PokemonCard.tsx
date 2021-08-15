import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';

import cardClasses from './PokemonCard.module.css';
import { useSelector } from 'react-redux';
import { pokemonAPI } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { PokemonType } from '../../types/types';
import Preloader from '../../common/Preloader/Preloader';

type PropsType = {
  pokemon?: PokemonType;
  id: number;
};

const PokemonCard: React.FC<PropsType> = React.memo((props) => {
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

  if (!picture) {
    return <Preloader />;
  }

  return (
    <div className={cardClasses.card}>
      <Card
        onClick={() => goToPokemon(id)}
        hoverable
        style={{
          margin: '0 auto',
          width: '80%',
          borderRadius: '0 10px 0 10px',
        }}
        cover={<img className={cardClasses.pokemonImg} alt="example" src={`${picture}`} />}
      >
        <Meta title={`${pokemon?.name}`} style={{ textAlign: 'center' }} />
      </Card>
    </div>
  );
});

export default PokemonCard;
