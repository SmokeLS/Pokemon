export type PokemonType = {
  abilities: Array<AbilitiesType>;
  base_experience: number;
  forms: Array<GeneralType>;
  game_indices : Array<GameIndicesType>;
  height: number;
  held_items: Array<HeldItemsType>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves : Array<MovesType>;
  name: string;
  order: number;
  species: GeneralType;
  sprites : SpritesType;
  stats: Array<StatsType>;
  types: Array<PokemonTypesType>
  weight: number;
};

export type GeneralType = {
  name: string;
  url : string;
}

type AbilitiesType = {
  ability: GeneralType;
  is_hidden: boolean;
  slot: number;
}

export type GameIndicesType = {
  game_indices: number;
  version: GeneralType;
}

type HeldItemsType = {
  item : GeneralType;
  version_details: Array<VersionDetailsType>;
}

type VersionDetailsType = {
  rarity: string;
  version: GeneralType;
}

type MovesType = {
  move : GeneralType;
  version_group_details: Array<VersionGroupDetailsType>;
}

type VersionGroupDetailsType = {
  level_learned_at: number;
  move_learn_method: GeneralType;
  version_group: GeneralType;
}

type SpritesType = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: OtherSpritesType;
  versions: VersionsSpriteType;
}

type OtherSpritesType = {
  dream_world: DreamWorldType;
  official_artwork : {
    front_default: string;
  }
}

type DreamWorldType = {
  front_default: string;
  front_female: string;
}

type VersionsSpriteType = {
  generationI: GenerationIType;
  generationII: GenerationIIType;
  generationIII: GenerationIIIType;
  generationIV: GenerationIVType;
  generationV: GenerationVInterface;
  generationVI: GenerationVIType;
  generationVII: GenerationVIIType;
  generationVIII: GenerationVIIIType;
}

type GenerationIType = {
  red_blue: GenerationIColorType;
  yellow:  GenerationIColorType;
}

type GenerationIColorType = {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

type GenerationIIType = {
  crystal: GenerationII_IIIColorType;
  gold: GenerationII_IIIColorType;
  silver: GenerationII_IIIColorType;
}

type GenerationII_IIIColorType = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

type GenerationIIIType = {
  emerald: EmeraldColorType;
  firered_leafgreen : GenerationII_IIIColorType;
  ruby_sapphire: GenerationII_IIIColorType;
}

type EmeraldColorType = {
  back_default: string;
  back_shiny: string;
}

type GenerationIVType = {
  diamond_pearl: GenerationIV_VColorType;
  heartgold_soulsilver: GenerationIV_VColorType;
  platinum: GenerationIV_VColorType;
}

type GenerationIV_VColorType = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

// Наследование интерфейсом типа BlackWhiteType

interface GenerationVInterface extends BlackWhiteType{
  animated: GenerationIV_VColorType;
}

type BlackWhiteType = {
  black_white: BlackWhiteType;
}

type GenerationVIType = {
  omegaruby_alphasapphire: OmegarubyAlphasapphireType;
  'x-y': OmegarubyAlphasapphireType;
}

type OmegarubyAlphasapphireType = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

type GenerationVIIType = {
  icons: GenerationVII_VIIIColorType;
  ultra_sun_ultra_moon : OmegarubyAlphasapphireType
}

type GenerationVII_VIIIColorType = {
  front_default: string;
  front_female: string;
}

type GenerationVIIIType = {
  icons: GenerationVII_VIIIColorType;
}

type StatsType = {
  base_stat: number;
  effort: number;
  stat: GeneralType;
}

type PokemonTypesType = {
  slot: number;
  type: GeneralType;
}

export type PokemonSpeciesType = {
  base_happiness: number;
  capture_rate: number;
  color: GeneralType;
  egg_groups: Array<GeneralType>;
  evolution_chain: {
    url: string;
  }  
  evolves_from_species: GeneralType;
  flavor_text_entries: Array<FlavorTextEntriesType>;
  forms_switchable: boolean;
  gender_rate: number;
  genera: Array<GeneraType>;
  generation: GeneralType;
  growth_rate: GeneralType;
  habitat: GeneralType;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  order: number;
  pal_park_encounters: Array<PalParkEncountersType>;
  poxedex_number: Array<PokedexNumbers>;
  varieties : Array<VarietiesType>;
}

type FlavorTextEntriesType = {
  flavor_text: string;
  language: GeneralType;
  version_group: GeneralType;
}

type GeneraType = {
  genus: string;
  language: GeneralType;
}

type PalParkEncountersType = {
  area: GeneralType;
  base_score: number;
  rate: number;
}

type PokedexNumbers = {
  entry_number: number;
  poxedex: GeneralType;
}

type VarietiesType = {
  is_default: boolean;
  pokemon: GeneralType;
}

export type AbilityType = {
  effect_changes: Array<EffectType>;
  effect_entries: Array<EffectEntriesAbilityType>;
  flavor_text_entries: Array<FlavorTextEntriesType>;
  generation: GeneralType;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Array<NamesType>;
  pokemon: Array<PokemonAbilityType>
}

type EffectEntriesAbilityType = {
  effect: string;
  language: GeneralType;
  short_effect: string;
}

type EffectType = {
  effect_entries: Array<EffectEntriesType>;
  version_group: GeneralType;
}

type EffectEntriesType = {
  effect: string;
  language: GeneralType;
}

type NamesType = {
  language: GeneralType;
  name: string;
}

type PokemonAbilityType = {
  is_hidden: boolean;
  pokemon: GeneralType;
  slot: number;
}