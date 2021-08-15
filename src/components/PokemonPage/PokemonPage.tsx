import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Popover } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import { actions } from '../../redux/app-reducer';
import { setPokemonAbility } from '../../redux/pokemon-ability-reducer';
import { setPokemon } from '../../redux/pokemon-reducer';
import { setPokemonSpecies } from '../../redux/pokemon-species-reducer';
import { AppStateType } from '../../redux/redux-store';
import NotFoundPage from './../Pages/NotFoundPage';
import classes from './PokemonPage.module.css';

type PropsType = {};

const PokemonPage: React.FC<PropsType> = React.memo(() => {
  const params = useParams<{ id: string }>();
  const pokemon = useSelector((state: AppStateType) => state.pokemon.currentPokemon);
  const notFoundPage = useSelector((state: AppStateType) => state.app.notFoundPage);
  const isLoading = useSelector((state: AppStateType) => state.pokemon.isLoading);
  const pokemonSpecies = useSelector((state: AppStateType) => state.pokemonSpecies.pokemonSpecies);
  const pokemonSpeciesCount = useSelector((state: AppStateType) => state.pokemonSpecies.count);
  const pokemonAbility = useSelector((state: AppStateType) => state.pokemonAbility.pokemonAbility);
  const dispatch = useDispatch();
  const history = useHistory();

  const showAbility = (url: string) => {
    dispatch(setPokemonAbility(url));
  };

  const menuSpecies = (
    <Col xs={{ span: 24 }}>
      <Col>base_happiness : {`${pokemonSpecies?.base_happiness}`}</Col>
      <Col>capture_rate : {`${pokemonSpecies?.capture_rate}`}</Col>
      <Col>gender_rate : {`${pokemonSpecies?.gender_rate}`}</Col>
      <Col>has_gender_differences : {`${pokemonSpecies?.has_gender_differences}`}</Col>
      <Col>color: {`${pokemonSpecies?.color.name}`}</Col>
      egg_groups:{' '}
      {pokemonSpecies?.egg_groups.map((item, index) => (
        <Col key={index}>{item.name}</Col>
      ))}
      <Col>
        genera :{' '}
        {pokemonSpecies?.genera.map((item, index) => (
          <span key={index}>{item.language.name === 'en' ? item.genus : ''}</span>
        ))}
      </Col>
      <Col>generation: {`${pokemonSpecies?.generation.name}`}</Col>
      {pokemonSpecies?.is_baby ? <Col>Baby</Col> : ''}
      {pokemonSpecies?.is_mythical ? <Col>mythical</Col> : ''}
      {pokemonSpecies?.is_legendary ? <Col>legendary</Col> : ''}
    </Col>
  );

  const noSpecies = <Col xs={{ span: 24 }}>Currently it has no information</Col>;

  const menuAbilities = (
    <Col xs={{ span: 24 }}>
      {pokemonAbility?.flavor_text_entries.map((item, index) => {
        return item.language.name === 'en' ? (
          <div key={index}>
            <Text type="success">{`${item.version_group.name}`}</Text> :{' '}
            <Text type="danger">{`${item.flavor_text}`}</Text>
          </div>
        ) : (
          ''
        );
      })}
    </Col>
  );

  useEffect(() => {
    if (!params.id) {
      history.push('/pokemons');
    }

    if (isNaN(Number(params.id))) {
      dispatch(actions.setNotFoundPage(true));
    }

    dispatch(setPokemon(Number(params.id)));

    if (Number(params.id) <= pokemonSpeciesCount) {
      dispatch(setPokemonSpecies(Number(params.id)));
    }
    dispatch(setPokemonSpecies(null));
  }, [history, params, dispatch, pokemonSpeciesCount]);

  if (notFoundPage) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Col xs={{ span: 24 }}>
      <Col
        xs={{ span: 18, offset: 3 }}
        md={{ span: 12, offset: 6 }}
        lg={{ span: 10, offset: 7 }}
        xxl={{ span: 6, offset: 9 }}
      >
        <img className={`${classes.img}`} src={`${pokemon?.sprites.front_default}`} alt="pokemon" />
      </Col>
      <Col
        xs={{ span: 18, offset: 3 }}
        md={{ span: 12, offset: 6 }}
        lg={{ span: 6, offset: 9 }}
        style={{ fontSize: '18px' }}
      >
        <Col>
          <Text>id: {pokemon?.id}</Text>
        </Col>

        <Col>
          <Text>name: {pokemon?.name}</Text>
        </Col>

        <Col>
          <Text>height: {pokemon?.height}</Text>
        </Col>

        <Col>
          <Text>weight: {pokemon?.weight}</Text>
        </Col>

        <Col>
          <Text>order: {pokemon?.order}</Text>
        </Col>

        <Col>
          <Text>is default: {pokemon?.is_default ? 'yes' : 'no'}</Text>
        </Col>

        <Col>
          <Text>
            abilities:{' '}
            {pokemon?.abilities.map((item, index) => (
              <Popover key={index} placement="topLeft" content={menuAbilities} trigger="click">
                {' '}
                <span onMouseEnter={() => showAbility(item.ability.url)}>
                  {' '}
                  {index !== pokemon.abilities.length - 1 ? (
                    <span>
                      <span className={`${classes.ability}`}>{`${item.ability.name}`}</span>,
                    </span>
                  ) : (
                    <span>
                      <span className={`${classes.ability}`}>{`${item.ability.name}`}</span>.
                    </span>
                  )}
                </span>
              </Popover>
            ))}
          </Text>
        </Col>

        <Col>
          <Text>
            <Col>
              {pokemon?.stats.map((item, index) => (
                <Col key={index}>
                  {item.stat.name} : {item.base_stat}{' '}
                </Col>
              ))}
            </Col>
          </Text>
        </Col>

        <Col>
          <Popover content={pokemonSpeciesCount >= Number(params.id) ? menuSpecies : noSpecies}>
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Species <DownOutlined />
            </Button>
          </Popover>
        </Col>
      </Col>
    </Col>
  );
});

export default PokemonPage;
