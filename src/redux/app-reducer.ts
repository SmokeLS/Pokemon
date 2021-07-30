import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonType } from '../types/types';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';
const SET_COUNT = 'app/SET_COUNT';
const SET_OFFSET = 'app/SET_OFFSET';
const SET_IS_LOADING = 'app/SET_IS_LOADING';

export type InitialStateType = typeof initialState;

const initialState = {
  offset: 0,
  pageSize: 20,
  pokemons: null as Array<PokemonType> | null,
  count: 0,
  isLoading: true,
};

const appReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SETTINGS: {
      return {
        ...state,
        pokemons: action.pokemons,
      };
    }
    case SET_COUNT: {
      return {
        ...state,
        count: action.count,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_OFFSET: {
      return {
        ...state,
        offset: action.offset,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  initializedSettings: (pokemons: any) => ({ type: SET_INITIALIZED_SETTINGS, pokemons } as const),
  initializedCount: (pokemonCount: number) => ({ type: SET_COUNT, count: pokemonCount } as const),
  setOffset: (offset: number) => ({ type: SET_OFFSET, offset } as const),
  setIsLoading: (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading } as const),
};

export const setInitializedPokemon =
  (
    offset: number = initialState.offset,
    pageSize: number = initialState.pageSize,
  ): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> =>
  async (dispatch) => {
    dispatch(actions.setIsLoading(true));
    const pokemons = await pokemonAPI.getPokemons(offset, pageSize);
    dispatch(actions.initializedSettings(pokemons));
    dispatch(actions.setIsLoading(false));
  };

export const setInitializedCount =
  (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> => async (dispatch: any) => {
    const pokemonCount = await pokemonAPI.getCount();
    dispatch(actions.initializedCount(pokemonCount));
  };

export default appReducer;
