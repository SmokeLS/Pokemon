import { applyMiddleware, combineReducers, createStore, compose, Action } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './app-reducer';
import pokemonReducer from './pokemon-reducer';
import pokemonSpeciesReducer from './pokemon-species-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  pokemon: pokemonReducer,
  pokemonSpecies: pokemonSpeciesReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>;

export type ThunkActionType<T extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, T>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.store = store;

export default store;
