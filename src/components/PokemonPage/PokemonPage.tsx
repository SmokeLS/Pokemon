import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { setPokemon } from '../../redux/pokemon-reducer';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {};

const PokemonPage: React.FC<PropsType> = (props) => {
  const params = useParams<{ id: string }>();
  const pokemon = useSelector((state: AppStateType) => state.pokemon.currentPokemon);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!params.id) {
      history.push('/pokemons');
    }

    dispatch(setPokemon(params.id as unknown as number));
  }, [history, params, dispatch]);

  return (
    <div>
      <div>
        <img src={`${pokemon?.sprites.front_default}`} alt="pokemon" />
      </div>
      <div>id: {pokemon?.id}</div>

      <div>name: {pokemon?.name}</div>

      <div>height: {pokemon?.height}</div>

      <div>weight: {pokemon?.weight}</div>

      <div>order: {pokemon?.order}</div>

      <div>is default: {pokemon?.is_default ? 'yes' : 'no'}</div>

      <div>
        <NavLink to={`/pokemon-species/${pokemon?.id}/`}>species</NavLink>
      </div>

      {/* <div>
        <NavLink to={`/pokemon-form/${pokemon?.id}/`}>forms</NavLink>
      </div>

      <div>
        <NavLink to={`/pokemon/${pokemon?.id}/encounters`}>location area encounters</NavLink>
      </div> */}

      <div>
        abilities:{' '}
        {pokemon?.abilities.map((item) => (
          <>{item.ability.name} </>
        ))}
      </div>

      <div>
        stats:
        <div>
          {pokemon?.stats.map((item) => (
            <div>
              {item.stat.name} : {item.base_stat}{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
