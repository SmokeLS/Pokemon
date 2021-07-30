import React, { EventHandler, useEffect, useState } from 'react';
import { NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { connect, useDispatch, useSelector } from 'react-redux';
import Preloader from './common/Preloader/Preloader';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Main from './components/Main/Main';
import PokemonSpeciesPage from './components/PokemonSpeciesPage/PokemonSpeciesPage';

import MenuNavigation from './components/MenuNavigation/MenuNavigation';
import { AppStateType } from './redux/redux-store';
import { setInitializedCount, setInitializedPokemon } from './redux/app-reducer';

type PropsType = {
  setInitializedPokemon: () => void;
  setInitializedCount: () => void;
};

const App: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const count = useSelector((state: AppStateType) => state.app.count);
  const isLoading = useSelector((state: AppStateType) => state.app.isLoading);

  useEffect(() => {
    dispatch(setInitializedPokemon());
    dispatch(setInitializedCount());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <MenuNavigation count={count} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/pokemons" />
        </Route>
        <Route path="/pokemon/:id?" render={() => <PokemonPage />} />
        <Route path="/pokemon-species/:id?" render={() => <PokemonSpeciesPage />} />
        <Route path="/pokemons" render={() => <Main count={count} />} />
        {/* <Route path="*" render={() => <NotFoundPage />} /> */}
      </Switch>
    </>
  );
};

export default App;
