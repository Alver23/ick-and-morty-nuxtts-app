import { IPagination } from '@server/api/shared/pagination/domain/entities/pagination';
import { ICharacterBase } from '@server/api/characters/domain/entities/character-base';
import { ICharacterLocation } from '@server/api/characters/domain/entities/character-location';
import { ICharacterOrigin } from '@server/api/characters/domain/entities/character-origin';

interface ICharacter extends ICharacterBase {
  species: string;
  location: ICharacterLocation;
  origin: ICharacterOrigin;
}

export interface ICharacterList {
  pagination: IPagination;
  items: ICharacter[];
}
