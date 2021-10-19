import _clonedeep from "lodash.clonedeep";

interface ILodashUtility {
  clone: (object: any) => any;
}

export const LodashUtility: ILodashUtility = {
  clone: (object: any): any => {
    return _clonedeep(object);
  }
}