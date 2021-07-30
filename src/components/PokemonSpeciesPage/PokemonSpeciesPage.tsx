import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import { setPokemonSpecies } from '../../redux/pokemon-species-reducer';

type PropsType = {};

const PokemonSpeciesPage: React.FC<PropsType> = (props) => {
  const params = useParams<{ id: string }>();
  const pokemonSpecies = useSelector((state: AppStateType) => state.pokemonSpecies.pokemonSpecies);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!params.id) {
      history.push('/pokemons');
    }

    dispatch(setPokemonSpecies(params.id as unknown as number));
  }, [history, params, dispatch]);

  return (
    <div>
      <div>base_happiness : {`${pokemonSpecies?.base_happiness}`}</div>
      <div>capture_rate : {`${pokemonSpecies?.capture_rate}`}</div>
      <div>gender_rate : {`${pokemonSpecies?.gender_rate}`}</div>
      <div>has_gender_differences : {`${pokemonSpecies?.has_gender_differences}`}</div>
      <div>color: {`${pokemonSpecies?.color.name}`}</div>
      egg_groups:{' '}
      {pokemonSpecies?.egg_groups.map((item) => (
        <div>{item.name}</div>
      ))}
      <div>
        genera :{' '}
        {pokemonSpecies?.genera.map((item) => (
          <>{item.language.name === 'en' ? item.genus : ''}</>
        ))}
      </div>
      <div>generation: {`${pokemonSpecies?.generation.name}`}</div>
      {pokemonSpecies?.is_baby ? <div>Baby</div> : ''}
      {pokemonSpecies?.is_mythical ? <div>mythical</div> : ''}
      {pokemonSpecies?.is_legendary ? <div>legendary</div> : ''}
    </div>
  );
};

export default PokemonSpeciesPage;
