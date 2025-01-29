import { IMinMaxPoint, IPoint } from '@foblex/2d';
import { fInject } from '../f-injector';
import { FComponentsStore } from '../../f-storage';

export class PointBoundsLimiter {

  private _fComponentsStore = fInject(FComponentsStore);

  private _vCellSize = this._fComponentsStore.fDraggable!.vCellSize;
  private _hCellSize = this._fComponentsStore.fDraggable!.hCellSize;

  constructor(
    private _onPointerDown: IPoint,
    private readonly _limit: IMinMaxPoint
  ) {
    this._validate(_limit);
  }

  public limit(difference: IPoint, adjustCellSize: boolean): IPoint {
    const { min, max } = this._limit;

    const { x, y } = this._cellSizeStrategies[+adjustCellSize](difference);

    return {
      x: this._clamp(x, min.x, max.x),
      y: this._clamp(y, min.y, max.y),
    };
  }

  private _cellSizeStrategies: Record<number, (difference: IPoint) => IPoint> = {
    0: this._skipCellSize.bind(this),
    1: this._applyCellSize.bind(this)
  };

  private _applyCellSize(difference: IPoint): IPoint {
    return {
      x: this._snapToGrid(this._onPointerDown.x + difference.x, this._hCellSize) - this._onPointerDown.x,
      y: this._snapToGrid(this._onPointerDown.y + difference.y, this._vCellSize) - this._onPointerDown.y
    };
  }

  private _skipCellSize(difference: IPoint): IPoint {
    return difference;
  }

  private _clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private _snapToGrid(value: number, cellSize: number): number {
    return Math.round(value / cellSize) * cellSize;
  }

  private _validate(limit: IMinMaxPoint): void {
    const { min, max } = limit;
    if (min.x > max.x || min.y > max.y) {
      throw new Error('Invalid restrictions: min values must be less than or equal to max values.');
    }
  }
}
