import React, { useEffect, useState } from 'react';

import { connect, useSelector } from 'react-redux';
import { setInitializedPokemon, setInitializedCount } from './redux/app-reducer';
import { compose } from 'redux';
import PokemonCard from './components/PokemonCard/PokemonCard';
import { AppStateType } from './redux/redux-store';
import Preloader from './common/Preloader/Preloader';

// type PropsType = {
//   requestUsers: (id: number) => void;
// };

// : React.FC<PropsType>

type PropsType = {
  pokemons: any;
  setInitializedPokemon: any;
  setInitializedCount: any;
  // setPokemon: any;
};

const App: React.FC<PropsType> = (props) => {
  //  const count = useSelector((state: any) => state.app.count);
  const pokemons = useSelector((state: AppStateType) => state.app.pokemons);

  let [portionNumber, setPortionNumber] = useState(1);

  const { setInitializedPokemon, setInitializedCount } = props;

  useEffect(() => {
    setInitializedPokemon();
    setInitializedCount();
  }, [setInitializedPokemon, setInitializedCount]);

  const pages: Array<number> = [];

  const pageSize: number = 20;
  //  const totalCount: number = 1;
  //  const portionCount: number = Math.ceil(totalCount / pageSize);

  const leftBorderPagination: number = (portionNumber - 1) * pageSize + 1;
  const rightBorderPagination: number = portionNumber * pageSize;

  for (let i = leftBorderPagination; i <= rightBorderPagination; i++) {
    pages.push(i);
  }

  if (!pokemons) {
    return <Preloader />;
  }

  return pages.map((item) => <PokemonCard pokemon={pokemons[item - 1]} id={item} />);
};

const mapStateToProps = (state: AppStateType) => {
  return {};
};

export default compose(connect(mapStateToProps, { setInitializedPokemon, setInitializedCount }))(App);
