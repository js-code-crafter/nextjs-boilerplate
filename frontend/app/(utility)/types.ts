import dayjs from "dayjs";

/**
 * Represents the status of a to-do item.
 * Possible values are:
 * - "todo": The task has not yet been started.
 * - "inProgress": The task is currently being worked on.
 * - "done": The task has been completed.
 */
export type Status = "todo" | "inProgress" | "done";

/**
 * Represents a single to-do item.
 */
export type ToDo = {
  /**
   * Unique identifier for the to-do item.
   */
  id: number;

  /**
   * The title or description of the to-do item.
   */
  title: string;

  /**
   * A list of tags associated with the to-do item, useful for categorization.
   */
  tags: string[] | string;

  /**
   * The deadline for the to-do item, represented as a string (e.g., ISO 8601 format).
   */
  deadline: string | dayjs.Dayjs;

  /**
   * The current status of the to-do item, using the Status type.
   */
  status: Status;

  /**
   * The timestamp representing when the to-do item was created.
   */
  createdAt: string;

  /**
   * The timestamp representing the last time the to-do item was updated.
   */
  updatedAt: string;
};

/**
 * Represents a response containing a list of to-do items.
 */
export type ToDoList = {
  /**
   * Indicates whether the request to retrieve the to-do list was successful.
   */
  success: boolean;

  /**
   * An array of to-do items.
   */
  data: ToDo[];

  /**
   * The total number of to-do items available.
   */
  totalCount: number;

  /**
   * The number of pages available based on the pagination (if applicable).
   */
  pageCount: number;
};

/**
 * Represents a validation error that may occur during form submissions or data processing.
 */
export type ValidationError = {
  /**
   * A descriptive message about the validation error.
   */
  message: string;

  /**
   * The key or field name associated with the validation error.
   */
  key: string;

  /**
   * An optional value that may contain the input value that failed validation.
   */
  value?: string; // Optional field; may not be present for all validation errors.
};
