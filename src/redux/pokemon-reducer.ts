
import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonType } from '../types/types';

const SET_POKEMON = 'app/SET_POKEMON';
// const ADD_POKEMON = 'app/ADD_POKEMON'

export type InitialStateType = typeof initialState;

const initialState = {
  currentPokemon: null as PokemonType | null,
  pokemons: null as Array<PokemonType> | null,
};

const pokemonReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_POKEMON: {
      return {
        ...state,
        currentPokemon: action.currentPokemon,
      };
    }
    default:
      return state;
  }
};

const actions = {
 setPokemon: (currentPokemon : PokemonType) => ({ type: SET_POKEMON, currentPokemon} as const),
//  addPokemon: (pokemon : PokemonType) => ({ type: ADD_POKEMON, pokemons : pokemon} as const),
};

export const setPokemon = (id: number) : ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>>=> async (dispatch: any) => {
  const pokemon = await pokemonAPI.getPokemon(id);
  dispatch(actions.setPokemon(pokemon));
};

export default pokemonReducer;