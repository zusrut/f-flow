import { ClearSelectionExecution } from './clear-selection';
import { GetCurrentSelectionExecution } from './get-current-selection';
import { SelectExecution } from './select';
import { SelectAllExecution } from './select-all';
import { SelectAndUpdateNodeLayerExecution } from './select-and-update-node-layer';
import { GetCanBeSelectedItemsExecution } from './get-can-be-selected-items';

export const F_SELECTION_FEATURES = [

  ClearSelectionExecution,

  GetCanBeSelectedItemsExecution,

  GetCurrentSelectionExecution,

  SelectExecution,

  SelectAllExecution,

  SelectAndUpdateNodeLayerExecution
];
