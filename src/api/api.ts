import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

type CountResponse = {
  count: number;
};

type PokemonPictureResponse = {
  sprites: {
    front_default: string;
  };
};

export const pokemonAPI = {
  async getPokemonPicture(id : number = 1,offset : number = 0) {
    const res = await instance.get<PokemonPictureResponse>(
      `pokemon/${id}/`,
    );

    return res.data.sprites.front_default;
  },
  async getPokemons(offset: number = 0, limit : number = 20) {    
    const res = await instance.get(
      `pokemon/?offset=${offset}&limit=${limit}`,
    );

    return res.data.results;
  },
  async getPokemon(id: number = 1) {
    const res = await instance.get(
      `pokemon/${id}`,
    );
    return res.data;
  },
  async getCount() {
    const res = await instance.get<CountResponse>(
      `pokemon/`,
    );
    return res.data.count;
  },
  async getPokemonSpeciesCount() {
    const res = await instance.get<CountResponse>(
      `pokemon-species/`,
    );
    return res.data.count;
  },
  async getPokemonSpecies(id: number = 1) {
    const res = await instance.get(
      `pokemon-species/${id}`,
    );
    return res.data;
  },
  async getPokemonAbility(url: string) {
    const res = await instance.get(
      url
    );
    return res.data;
  }
};
