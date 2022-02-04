export interface IHandler<T> {
  /**
   * Get all items from a table
   */
  all(): Promise<T[]>;

  /**
   * Get specific item based on id
   */
  get(id: number|string): Promise<T>;

  /**
   * Add an entity to database.
   * This should also set the id on the entity if successful.
   */
  add(entity: T): Promise<boolean>;

  /**
   * Update an entity in the database.
   */
  update(entity: T): Promise<boolean>;

  /**
   * Removes an entity from the database.
   */
  remove(entity: T): Promise<boolean>;

  /**
   * Validate the entity.
   * @param {T} entity
   * @param {boolean} validateId The id might be invalid if creating the entity so no need to always check it.
   */
  isEntityValid(entity: T, validateId: boolean): boolean;
}
