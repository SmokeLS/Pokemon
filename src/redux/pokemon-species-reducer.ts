import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonSpeciesType } from '../types/types';
import { Dispatch } from 'react';

const SET_POKEMON_SPECIES = 'pokemon-species/SET_POKEMON_SPECIES';
const SET_IS_LOADING = 'pokemon-species/SET_IS_LOADING';
const SET_ERROR = 'pokemon-species/SET_ERROR';
const SET_COUNT = 'pokemon-species/SET_COUNT';

export type InitialStateType = typeof initialState;

type DispatchType = Dispatch<ActionsType<typeof actions>>;

const initialState = {
  pokemonSpecies: null as PokemonSpeciesType | null,
  isLoading: true,
  isError: false,
  count: 0,
};

const pokemonSpeciesReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_POKEMON_SPECIES: {
      return {
        ...state,
        pokemonSpecies: action.pokemonSpecies,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        isError: action.isError,
      };
    }
    case SET_COUNT: {
      return {
        ...state,
        count: action.count,
      };
    }
    default:
      return state;
  }
};

const actions = {
  setPokemonSpecies: (pokemonSpecies: PokemonSpeciesType | null) => ({ type: SET_POKEMON_SPECIES, pokemonSpecies } as const),
  setIsLoading: (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading } as const),
  setError: (isError: boolean) => ({ type: SET_ERROR, isError } as const),
  setCount: (count: number) => ({ type: SET_COUNT, count } as const),
};

export const setPokemonSpecies =
  (id: number | null): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> =>
  async (dispatch: DispatchType) => {
    try {
      if (id === null) {
        dispatch(actions.setPokemonSpecies(null));
      } else {
        dispatch(actions.setIsLoading(true));
        const pokemonSpecies = await pokemonAPI.getPokemonSpecies(id);
        dispatch(actions.setPokemonSpecies(pokemonSpecies));
      }
    } catch (error) {
      console.error(error);
      dispatch(actions.setError(true));
    } finally {
      dispatch(actions.setIsLoading(false));
    }
  };

export const setPokemonSpeciesCount =
  (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> => async (dispatch: DispatchType) => {
    const pokemonSpecies = await pokemonAPI.getPokemonSpeciesCount();
    dispatch(actions.setCount(pokemonSpecies));
  };

export default pokemonSpeciesReducer;
