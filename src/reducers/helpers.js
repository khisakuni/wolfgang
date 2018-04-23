import _ from "lodash";

const objectToValuesList = obj => _.values(obj);

const objectToKeysList = obj => Object.keys(obj);

export const valuesListToObject = list => {
  return list.reduce((acc, value) => {
    acc[value.id] = value;
    return acc;
  }, {});
};

const orderByIndex = indexables => indexables.sort((a, b) => a.index - b.index);

export const orderObjectValuesByIndex = obj =>
  valuesListToObject(orderByIndex(objectToValuesList(obj)));

const filterById = (idList, deleteId) => idList.filter(id => id !== deleteId);

export const deleteById = (obj, id) => {
  return filterById(objectToKeysList(obj), id).reduce((acc, id) => {
    acc[id] = obj[id];
    return acc;
  }, {});
};
