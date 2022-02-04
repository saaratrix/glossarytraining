import { EditFieldType } from "../enums/edit-field-type.enum";

export interface EditField {
  label: string;
  key: string;
  required: boolean;
  type: EditFieldType;
  // The key to use for a dropdown list item
  listKey?: string;

  // List selection keys:
  /**
   * A possible list, for example for a <select> type
   */
  list?: any[];
  /**
   * @example
   * 'name'
   */
  listName?: string;
  /**
   * @example
   * 'name'
   */
  listTitle?: string;
  listSeparatorKey?: string;
}
