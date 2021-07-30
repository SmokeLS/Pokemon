
import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonSpeciesType } from '../types/types';

const SET_POKEMON_SPECIES = 'app/SET_POKEMON_SPECIES';

export type InitialStateType = typeof initialState;

const initialState = {
  pokemonSpecies: null as PokemonSpeciesType | null,
};

const pokemonSpeciesReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_POKEMON_SPECIES: {
      return {
        ...state,
        pokemonSpecies: action.pokemonSpecies,
      };
    }
    default:
      return state;
  }
};

const actions = {
 setPokemonSpecies: (pokemonSpecies : PokemonSpeciesType) => ({ type: SET_POKEMON_SPECIES, pokemonSpecies} as const),
};

export const setPokemonSpecies = (id: number) : ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>>=> async (dispatch: any) => {
  const pokemonSpecies = await pokemonAPI.getPokemonSpecies(id);
  dispatch(actions.setPokemonSpecies(pokemonSpecies));
};

export default pokemonSpeciesReducer;