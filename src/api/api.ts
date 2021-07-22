import axios from 'axios';
import { PokemonType } from '../types/types';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const pokemonAPI = {
  async getPokemonPicture(id = 1) {
    const res = await instance.get(
      `pokemon/${id}/`,
    );
    return res.data.sprites.front_default;
  },
  async getPokemons() {
    const res = await instance.get(
      `pokemon/`,
    );
    return res.data.results;
  },
  async getCount() {
    const res = await instance.get(
      `pokemon/`,
    );
    return res.data.count;
  },
};
