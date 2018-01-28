export interface IHandler<T> {
  /**
   * Get all items from a table
   * @return {Promise<T[]>}
   */
  all(): Promise<T[]>;

  /**
   * Get specific item based on id
   * @param {number | string} a_id
   * @return {Promise<T>}
   */
  get(a_id: number|string): Promise<T>;

  /**
   * Add an entity to database.
   * This should also set the id on the entity if succesful
   * @param {T} a_entity
   * @return {Promise<boolean>}
   */
  add(a_entity: T): Promise<boolean>;

  /**
   * Update an entity in the database
   * @param {T} a_entity
   * @return {Promise<boolean>}
   */
  update(a_entity: T): Promise<boolean>;

  /**
   * Removes an entity from the database
   * @param {T} a_entity
   * @return {Promise<boolean>}
   */
  remove(a_entity: T): Promise<boolean>;

  /**
   * Validate the entity
   * @param {T} a_entity
   * @return {boolean}
   */
  isEntityValid(a_entity: T, validateId: boolean): boolean;
}
