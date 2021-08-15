
import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonType } from '../types/types';
import { Dispatch } from 'react';

const SET_POKEMON = 'pokemon/SET_POKEMON';
const SET_IS_LOADING = 'pokemon/SET_IS_LOADING';

export type InitialStateType = typeof initialState;

type DispatchType = Dispatch<ActionsType<typeof actions>>;

const initialState = {
  currentPokemon: null as PokemonType | null,
  isLoading: true,
};

const pokemonReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_POKEMON: {
      return {
        ...state,
        currentPokemon: action.currentPokemon,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
};

const actions = {
 setPokemon: (currentPokemon : PokemonType) => ({ type: SET_POKEMON, currentPokemon} as const),
 setIsLoading: (isLoading: boolean) => ({type: SET_IS_LOADING,isLoading} as const)
};

export const setPokemon = (id: number) : ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>>=> async (dispatch: DispatchType) => {
  dispatch(actions.setIsLoading(true));
  const pokemon = await pokemonAPI.getPokemon(id);
  dispatch(actions.setPokemon(pokemon));
  dispatch(actions.setIsLoading(false));
};

export default pokemonReducer;