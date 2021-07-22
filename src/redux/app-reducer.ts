
import { ActionsType, AppStateType } from './redux-store';
import { pokemonAPI } from './../api/api';
import { ThunkAction } from 'redux-thunk';
import { PokemonType } from '../types/types';

const SET_INITIALIZED_SETTINGS = 'app/SET_INITIALIZED_SETTINGS';
const SET_COUNT = 'app/SET_COUNT';
// const SET_POKEMON = 'app/SET_POKEMON';

type InitialStateType = typeof initialState;

const initialState = {
  currentPokemon: null as PokemonType | null,
  pokemons: null as Array<PokemonType> | null,
  count: 0,
};

const appReducer = (state = initialState, action: ActionsType<typeof actions>): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SETTINGS: {
      return {
        ...state,
        pokemons: action.pokemons,
      };
    }
    // case SET_POKEMON: {
    //   return {
    //     ...state,
    //     currentPokemon: action.currentPokemon,
    //   };
    // }
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
  initializedSettings: (pokemons : any) => ({ type: SET_INITIALIZED_SETTINGS, pokemons } as const),
  initializedCount: (pokemonCount : number) => ({ type: SET_COUNT, count: pokemonCount} as const),
  // setPokemon: (currentPokemon : any) => ({ type: SET_POKEMON, currentPokemon} as const),
};

export const setInitializedPokemon = (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>> => async (dispatch) => {
  const pokemons = await pokemonAPI.getPokemons();
  dispatch(actions.initializedSettings(pokemons));
};

// export const setPokemon = (id: number) => async (dispatch: any) => {
//   const pokemon = await pokemonAPI.getPokemon(id);
//   dispatch(actions.initializedSettings(pokemon));
// };

export const setInitializedCount = (): ThunkAction<void, AppStateType, unknown, ActionsType<typeof actions>>=> async (dispatch: any) => {
  const pokemonCount = await pokemonAPI.getCount();
  dispatch(actions.initializedCount(pokemonCount));
};


export default appReducer;