import { UnionKeysObject } from "../type/union-keys-object";
import { ResourceLanguage } from "i18next";

/**
 * Recursively generate the union of keys from multiple objects.
 * If a key's value is an object, merge it recursively.
 *
 * @param objects Array of objects to merge.
 * @returns The union of keys as an object (each leaf is simply true).
 */
export function unionKeys(objects: ResourceLanguage[]): UnionKeysObject {
  const result: UnionKeysObject = {};
  for (const obj of objects) {
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = unionKeysMerge(result[key] as UnionKeysObject, obj[key] as ResourceLanguage);
          }
        } else {
          result[key] =
            typeof obj[key] === "object" && obj[key] !== null ? unionKeys([obj[key] as ResourceLanguage]) : true;
        }
      }
    }
  }
  return result;
}

function unionKeysMerge(union: UnionKeysObject, obj: ResourceLanguage): UnionKeysObject {
  const result: UnionKeysObject = { ...union };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      if (typeof obj[key] === "object" && obj[key] !== null && result[key] !== true) {
        result[key] = unionKeysMerge(result[key] as UnionKeysObject, obj[key] as ResourceLanguage);
      } else {
        result[key] = true;
      }
    } else {
      result[key] =
        typeof obj[key] === "object" && obj[key] !== null ? unionKeys([obj[key] as ResourceLanguage]) : true;
    }
  }
  return result;
}
