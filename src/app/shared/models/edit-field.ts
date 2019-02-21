import { EditFieldType } from "../enums/edit-field-type.enum";

export interface EditField {
  label: string;
  key: string;
  required: boolean;
  type: EditFieldType;
  // A possible list, for example for a <select> type
  list?: any[];
  // The key to use for a list item
  listKey?: string;
}
