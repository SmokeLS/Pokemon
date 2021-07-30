import { AppStateType } from "./redux-store";

export const getPokemonSprite = (state: AppStateType) => {
  return state.pokemon.currentPokemon?.sprites.front_default;
};
