export enum CHARACTER_STATUS_TYPES {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export interface ICharacterBase {
  id: number;
  name: string;
  image: string;
  status: CHARACTER_STATUS_TYPES;
}
