export interface DefualtInformation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * These fields will be shown in header, and not among the form fields
 */
export const defaultInformationFields = ['id'];

/**
 * These fields will be automatically formatted as date
 */
export const dateFields = [];
