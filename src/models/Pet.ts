export interface Pet {
  _id: string;
  type: string;
  name: string;
  image: string;
  price: number;
  expStats: number;
  hungerStats: number;
  happinessStats: number;
  luckyBoost: number;
  lvlRequirement: number;
  prevPetRequirement: string;
  __v: number;
}

export interface GuildPet {
  _id: string;
  guildId: string;
  name: string;
  lvl: number;
  exp: number;
  hunger: number;
  happiness: number;
  lastFed: string;      // ISO date string
  lastPlayed: string;   // ISO date string
  pet: Pet;             // populated Pet document
  __v: number;
}
