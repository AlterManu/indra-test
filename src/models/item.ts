export enum ItemType {
  ROW = "ROW",
  ITEM = "ITEM",
}

export interface ItemModel {
  id: number;
  name: string;
  image: string;
  price: string;
}

export enum templates {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export interface RowModel {
  id: number;
  items: ItemModel[];
  template: templates;
}

export const templateTypes = {
  FIRST: { index: 0, place: "start" },
  SECOND: { index: 1, place: "center" },
  THIRD: { index: 2, place: "end" },
};

export const templatesIndexes = [
  templates.FIRST,
  templates.SECOND,
  templates.THIRD,
];

export enum modes {
  EDITOR = "EDITOR",
  LIVE = "LIVE",
}
