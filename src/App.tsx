import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'querystring';

import Preloader from './common/Preloader/Preloader';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Main from './components/Main/Main';
import MenuNavigation from './components/MenuNavigation/MenuNavigation';
import { AppStateType } from './redux/redux-store';
import { setInitializedCount, setInitializedPokemon } from './redux/app-reducer';
import NotFoundPage from './components/Pages/NotFoundPage';
import Error from './common/Error/Error';
import { setPokemonSpeciesCount } from './redux/pokemon-species-reducer';

type PropsType = {
  setInitializedPokemon: (offset: number, pageSize: number) => void;
  setInitializedCount: () => void;
};

type queryParamsType = {
  offset?: string;
  limit?: string;
};

const App: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const count = useSelector((state: AppStateType) => state.app.count);
  const isLoading = useSelector((state: AppStateType) => state.app.isLoading);
  const offset = useSelector((state: AppStateType) => state.app.offset);
  const pageSize = useSelector((state: AppStateType) => state.app.pageSize);
  const globalError = useSelector((state: AppStateType) => state.app.globalError);
  const parsed = queryString.parse(history.location.search.substr(1));

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));

    let offsetSearch = 0;
    let pageSizeSearch = 24;

    if (parsed.offset) offsetSearch = Number(parsed.offset);
    if (parsed.limit) pageSizeSearch = Number(parsed.limit);

    dispatch(setInitializedPokemon(offsetSearch, pageSizeSearch));
    dispatch(setInitializedCount());
    dispatch(setPokemonSpeciesCount());
  }, [history, dispatch]);

  useEffect(() => {
    const query: queryParamsType = {};

    if (offset !== 0) query.offset = String(offset);
    if (pageSize) query.limit = String(pageSize);

    if (history.location.pathname === `/pokemons` && (query.limit || query.offset)) {
      history.push({
        pathname: '/pokemons',
        search: queryString.stringify(query),
      });
    }
  }, [history, offset, pageSize]);

  if (globalError) return <Error />;

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <MenuNavigation count={count} pokemonPageSize={parsed.limit} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/pokemons" />
        </Route>
        <Route path="/pokemon/:id?" exact render={() => <PokemonPage />} />
        <Route path="/pokemons" exact render={() => <Main count={count} />} />
        <Route path="*" render={() => <NotFoundPage />} />
      </Switch>
    </>
  );
};

export default App;
