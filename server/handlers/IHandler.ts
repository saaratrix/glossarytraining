export interface IHandler<T> {
  /**
   * Get all items from a table
   * @return {Promise<T[]>}
   */
  all(): Promise<T[]>;

  /**
   * Get specific item based on id
   * @param {number | string} id
   * @return {Promise<T>}
   */
  get(id: number|string): Promise<T>;

  /**
   * Add an entity to database.
   * This should also set the id on the entity if succesful
   * @param {T} entity
   * @return {Promise<boolean>}
   */
  add(entity: T): Promise<boolean>;

  /**
   * Update an entity in the database
   * @param {T} entity
   * @return {Promise<boolean>}
   */
  update(entity: T): Promise<boolean>;

  /**
   * Removes an entity from the database
   * @param {T} entity
   * @return {Promise<boolean>}
   */
  remove(entity: T): Promise<boolean>;

  /**
   * Validate the entity
   * @param {T} entity
   * @return {boolean}
   */
  isEntityValid(entity: T, validateId: boolean): boolean;
}
