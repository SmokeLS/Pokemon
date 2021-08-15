import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonType } from '../types/types';
import { Dispatch } from 'react';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';
const SET_COUNT = 'app/SET_COUNT';
const SET_OFFSET = 'app/SET_OFFSET';
const SET_IS_LOADING = 'app/SET_IS_LOADING';
const SET_PAGE_SIZE = 'app/SET_PAGE_SIZE';
const SET_GLOBAL_ERROR = 'app/SET_GLOBAL_ERROR';
const SET_NOT_FOUND_PAGE = 'app/SET_NOT_FOUND_PAGE';

export type InitialStateType = typeof initialState;

const initialState = {
  offset: 0,
  pageSize: 0,
  pokemons: null as Array<PokemonType> | null,
  count: 0,
  isLoading: true,
  globalError: false,
  notFoundPage: false,
};

type DispatchType = Dispatch<ActionsType<typeof actions>>;

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
    case SET_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.pageSize,
      };
    }
    case SET_GLOBAL_ERROR: {
      return {
        ...state,
        globalError: action.globalError,
      };
    }
    case SET_NOT_FOUND_PAGE: {
      return {
        ...state,
        notFoundPage: action.notFoundPage,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  initializedPokemons: (pokemons: Array<PokemonType>) => ({ type: SET_INITIALIZED_SETTINGS, pokemons } as const),
  initializedCount: (pokemonCount: number) => ({ type: SET_COUNT, count: pokemonCount } as const),
  setOffset: (offset: number) => ({ type: SET_OFFSET, offset } as const),
  setIsLoading: (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading } as const),
  setPageSize: (pageSize: number) => ({ type: SET_PAGE_SIZE, pageSize } as const),
  setGlobalError: (isError: boolean) => ({ type: SET_GLOBAL_ERROR, globalError: isError} as const),
  setNotFoundPage: (notFoundPage: boolean) => ({ type: SET_NOT_FOUND_PAGE, notFoundPage} as const),
};

export const setInitializedPokemon =
  (
    offset: number = initialState.offset,
    pageSize: number = initialState.pageSize,
  ): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> =>
  async (dispatch) => {
    try {
      dispatch(actions.setIsLoading(true));
      if (pageSize < 6) {
        pageSize = 6;
      }
      if (pageSize > 36) {
        pageSize = 36;
      }
      const pokemons = await pokemonAPI.getPokemons(offset, pageSize);
      dispatch(actions.initializedPokemons(pokemons));    
      dispatch(actions.setOffset(offset));
      dispatch(actions.setPageSize(pageSize));
    } catch (error) {
      console.error(error);
      dispatch(actions.setGlobalError(true));
    } finally {
      dispatch(actions.setIsLoading(false));
    }
  };

export const setInitializedCount =
  (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> => async (dispatch: DispatchType) => {
    const pokemonCount = await pokemonAPI.getCount();
    dispatch(actions.initializedCount(pokemonCount));
  };

export default appReducer;
