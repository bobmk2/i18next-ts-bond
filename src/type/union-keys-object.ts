export type UnionKeysObject = {
  [key: string]: true | UnionKeysObject;
};
