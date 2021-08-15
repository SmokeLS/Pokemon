import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { AbilityType } from '../types/types';
import { Dispatch } from 'react';

const SET_POKEMON_ABILITY = 'pokemon-ability/SET_POKEMON_SPECIES';
const SET_IS_LOADING = 'pokemon-ability/SET_IS_LOADING';
const SET_ERROR = 'pokemon-ability/SET_ERROR';

export type InitialStateType = typeof initialState;

type DispatchType = Dispatch<ActionsType<typeof actions>>;

const initialState = {
  pokemonAbility: null as AbilityType | null,
  isLoading: true,
  isError: false,
};

const pokemonAbilityReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_POKEMON_ABILITY: {
      return {
        ...state,
        pokemonAbility: action.pokemonAbility,
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
    default:
      return state;
  }
};

const actions = {
  setPokemonAbility: (pokemonAbility: AbilityType) => ({ type: SET_POKEMON_ABILITY, pokemonAbility } as const),
  setIsLoading: (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading } as const),
  setError: (isError: boolean) => ({ type: SET_ERROR, isError } as const),
};

export const setPokemonAbility =
  (url: string): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> =>
  async (dispatch: DispatchType) => {
    try {
      dispatch(actions.setIsLoading(true));
      const pokemonSpecies = await pokemonAPI.getPokemonAbility(url);
      dispatch(actions.setPokemonAbility(pokemonSpecies));
    } catch (error) {
      console.error(error);
      dispatch(actions.setError(true));
    } finally {
      dispatch(actions.setIsLoading(false));
    }
  };

export default pokemonAbilityReducer;
