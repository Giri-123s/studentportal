/**
 * Custom Hook: useEditDialog
 * 
 * This hook manages the state for edit dialog modals, providing:
 * - Dialog open/closed state management
 * - Temporary data storage for form inputs
 * - Utility functions for opening, closing, and resetting dialogs
 * - Consistent pattern for all edit dialogs in the application
 * 
 * The hook follows React best practices and provides a clean API
 * for managing modal dialogs with form data.
 * 
 * @hook useEditDialog
 * @description Manages edit dialog state and temporary data for form inputs
 * @param {*} initialData - Initial data to populate the dialog form
 * @returns {Object} Object containing dialog state and utility functions
 * 
 * @example
 * const personalDialog = useEditDialog(personalData);
 * 
 * // Open dialog with current data
 * personalDialog.openDialog(personalData);
 * 
 * // Check if dialog is open
 * if (personalDialog.isOpen) { ... }
 * 
 * // Close dialog
 * personalDialog.closeDialog();
 * 
 * // Reset data to initial values
 * personalDialog.resetData();
 * 
 * @returns-object
 * - isOpen: boolean - Current dialog open state
 * - tempData: * - Temporary data for form inputs
 * - setTempData: Function - Function to update temporary data
 * - openDialog: Function - Opens dialog and sets initial data
 * - closeDialog: Function - Closes dialog
 * - resetData: Function - Resets data to initial values
 * 
 * @usage-pattern
 * 1. Initialize hook with initial data
 * 2. Use openDialog to open dialog with current data
 * 3. Use tempData for form inputs
 * 4. Use setTempData to update form values
 * 5. Use closeDialog to close dialog
 * 6. Use resetData if needed to restore initial values
 */
import { useState } from 'react';

const useEditDialog = (initialData) => {
  // State to control dialog visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // State to store temporary form data
  // This allows users to modify data without affecting the original until saved
  const [tempData, setTempData] = useState(initialData);

  /**
   * Opens the edit dialog and populates it with the provided data
   * 
   * @param {*} data - Data to populate the dialog form
   * @example
   * personalDialog.openDialog(currentPersonalData);
   */
  const openDialog = (data) => {
    setTempData(data);
    setIsOpen(true);
  };

  /**
   * Closes the edit dialog
   * 
   * @example
   * personalDialog.closeDialog();
   */
  const closeDialog = () => {
    setIsOpen(false);
  };

  /**
   * Resets the temporary data to the initial values
   * Useful for canceling edits or resetting forms
   * 
   * @example
   * personalDialog.resetData();
   */
  const resetData = () => {
    setTempData(initialData);
  };

  // Return the hook's public API
  return {
    isOpen,
    tempData,
    setTempData,
    openDialog,
    closeDialog,
    resetData
  };
};

export default useEditDialog; 