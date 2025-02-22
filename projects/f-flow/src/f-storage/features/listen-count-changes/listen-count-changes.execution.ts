import { inject, Injectable } from '@angular/core';
import { FExecutionRegister, IExecution } from '@foblex/mediator';
import { ListenCountChangesRequest } from './listen-count-changes-request';
import { FComponentsStore } from '../../../f-storage';
import { debounceTime, FChannelHub, notifyOnStart } from '../../../reactivity';

@Injectable()
@FExecutionRegister(ListenCountChangesRequest)
export class ListenCountChangesExecution implements IExecution<ListenCountChangesRequest, FChannelHub> {

  private _fComponentsStore = inject(FComponentsStore);

  public handle(request: ListenCountChangesRequest): FChannelHub {
    return new FChannelHub(this._fComponentsStore.countChanges$)
      .pipe(notifyOnStart(), debounceTime(1));
  }
}

