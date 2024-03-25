import { DBEntity, DBPayload } from './types';

export abstract class GenericBD<T extends DBEntity, K extends DBPayload> {
  abstract create: (payload: T) => Promise<T>;
  abstract findAll: () => Promise<T[]>;
  abstract findOne: (id: string) => Promise<T>;
  abstract update: (id: string, payload: K) => Promise<T>;
  abstract delete: (id: string) => void;
}
