export type PokemonType = {
  abilities: Array<AbilitiesType>;
  BaseExperience: number;
  forms: Array<GeneralType>;
  gameIndices : Array<GameIndicesType>;
  height: number;
  heldItems: Array<HeldItemsType>;
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves : Array<MovesType>;
  name: string;
  order: number;
  species: GeneralType;
  sprites : SpritesType;
  stats: Array<StatsType>;
  types: Array<PokemonSpeciesType>
  weight: number;
};

type AbilitiesType = {
  ability: Array<GeneralType>;
  isHidden: boolean;
  slot: number;
}

type GeneralType = {
  name: string;
  url : string;
}

export type GameIndicesType = {
  gameIndex: number;
  version: GeneralType;
}

type HeldItemsType = {
  item : GeneralType;
  versionDetails: Array<VersionDetailsType>;
}

type VersionDetailsType = {
  rarity: string;
  version: GeneralType;
}

type MovesType = {
  move : GeneralType;
  versionGroupDetails: Array<VersionGroupDetailsType>;
}

type VersionGroupDetailsType = {
  levelLearnedAt: number;
  moveLearnMethod: GeneralType;
  versionGroup: GeneralType;
}

type SpritesType = {
  backDefault: string;
  backFemale: string;
  backShiny: string;
  backShinyFemale: string;
  frontDefault: string;
  frontFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
  other: OtherSpritesType;
  versions: VersionsSpriteType;
}

type OtherSpritesType = {
  dreamWorld: DreamWorldType;
  officialArtwork : {
    frontDefault: string;
  }
}

type DreamWorldType = {
  frontDefault: string;
  frontFemale: string;
}

type VersionsSpriteType = {
  generationI: generationIType;
  generationII: generationIIType;
  generationIII: generationIIIType;
  generationIV: generationIVType;
  generationV: generationVInterface;
  generationVI: generationVIType;
  generationVII: generationVIIType;
  generationVIII: generationVIIIType;
}

type generationIType = {
  redBlue: GenerationIColorType;
  yellow:  GenerationIColorType;
}

type GenerationIColorType = {
  backDefault: string;
  backGray: string;
  frontDefault: string;
  frontGray: string;
}

type generationIIType = {
  crystal: GenerationII_IIIColorType;
  gold: GenerationII_IIIColorType;
  silver: GenerationII_IIIColorType;
}

type GenerationII_IIIColorType = {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

type generationIIIType = {
  emerald: EmeraldColorType;
  fireredLeafgreen : GenerationII_IIIColorType;
  rubySapphire: GenerationII_IIIColorType;
}

type EmeraldColorType = {
  backDefault: string;
  backShiny: string;
}

type generationIVType = {
  diamondPearl: GenerationIV_VColorType;
  heartgoldSoulsilver: GenerationIV_VColorType;
  platinum: GenerationIV_VColorType;
}

type GenerationIV_VColorType = {
  backDefault: string;
  backFemale: string;
  backShiny: string;
  backShinyFemale: string;
  frontDefault: string;
  frontFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
}

// Наследование интерфейсом типа BlackWhiteType

interface generationVInterface extends BlackWhiteType{
  animated: GenerationIV_VColorType;
}

type BlackWhiteType = {
  blackWhite: BlackWhiteType;
}

type generationVIType = {
  omegarubyAlphasapphire: omegarubyAlphasapphireType;
  xY: omegarubyAlphasapphireType;
}

type omegarubyAlphasapphireType = {
  frontDefault: string;
  frontFemale: string;
  frontShiny: string;
  frontShinyFemale: string;
}

type generationVIIType = {
  icons: GenerationVII_VIIIColorType;
  ultraSunUltraMoon : omegarubyAlphasapphireType
}

type GenerationVII_VIIIColorType = {
  frontDefault: string;
  frontFemale: string;
}

type generationVIIIType = {
  icons: GenerationVII_VIIIColorType;
}

type StatsType = {
  baseStat: number;
  effort: number;
  stat: GeneralType;
}

type PokemonSpeciesType = {
  slot: number;
  type: GeneralType;
}