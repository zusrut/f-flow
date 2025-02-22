import { inject, Injectable } from '@angular/core';
import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { InitializeDragSequenceRequest } from './initialize-drag-sequence-request';
import { FDraggableDataContext } from '../../../f-draggable';

@Injectable()
@FExecutionRegister(InitializeDragSequenceRequest)
export class InitializeDragSequenceExecution implements IExecution<InitializeDragSequenceRequest, void> {

  private _fDraggableDataContext = inject(FDraggableDataContext);

  public handle(request: InitializeDragSequenceRequest): void {
    this._fDraggableDataContext.reset();
  }
}
