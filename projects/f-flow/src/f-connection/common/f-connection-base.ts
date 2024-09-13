import { Directive, ElementRef } from '@angular/core';
import { ILine, IPoint, LineExtensions, PointExtensions } from '@foblex/2d';
import { IHasHostElement } from '@foblex/core';
import { Subject } from 'rxjs';
import { EFConnectionBehavior } from './e-f-connection-behavior';
import { EFConnectionType } from './e-f-connection-type';
import { IHasConnectionColor } from './i-has-connection-color';
import { IHasConnectionFromTo } from './i-has-connection-from-to';
import { IHasConnectionText } from './i-has-connection-text';
import { IConnectionPath } from './f-path';
import { IConnectionGradient } from './f-gradient';
import { FConnectionDragHandleComponent } from './f-drag-handle';
import { FConnectionSelectionComponent } from './f-selection';
import { IConnectionText } from './f-connection-text';
import { IHasStateChanges } from '../../i-has-state-changes';
import { FMarkerBase } from '../f-marker';
import { EFConnectableSide } from '../../f-connectors';
import { FConnectionFactory } from '../f-connection-builder';
import {
  ICanChangeConnectionVisibility,
  ISelectable,
  mixinChangeConnectionSelection,
  mixinChangeConnectionVisibility
} from './mixins';

const MIXIN_BASE = mixinChangeConnectionSelection(
  mixinChangeConnectionVisibility(
    class {
      constructor(
        public hostElement: HTMLElement
      ) {
      }
    }));

@Directive()
export abstract class FConnectionBase extends MIXIN_BASE
  implements IHasHostElement, ISelectable,
             ICanChangeConnectionVisibility,
             IHasStateChanges, IHasConnectionColor,
             IHasConnectionFromTo, IHasConnectionText {

  public abstract override fId: string;

  public abstract fStartColor: string;

  public abstract fEndColor: string;

  public abstract fOutputId: string;

  public abstract fInputId: string;

  public abstract fRadius: number;

  public abstract fOffset: number;

  public path: string = '';

  public line: ILine = LineExtensions.initialize();

  public readonly stateChanges: Subject<void> = new Subject<void>();

  public abstract fDraggingDisabled: boolean;

  public abstract override fSelectionDisabled: boolean;

  public abstract boundingElement: HTMLElement | SVGElement;

  public abstract fBehavior: EFConnectionBehavior;

  public abstract fType: EFConnectionType;

  public abstract fDefs: ElementRef<SVGDefsElement>;

  public abstract fMarkers: FMarkerBase[];

  public abstract fPath: IConnectionPath;

  public abstract fGradient: IConnectionGradient;

  public abstract fDragHandle: FConnectionDragHandleComponent;

  public abstract fSelection: FConnectionSelectionComponent;

  public abstract fTextComponent: IConnectionText;

  public abstract fText: string;

  public abstract fConnectionCenter: ElementRef<HTMLDivElement>;

  private penultimatePoint: IPoint = PointExtensions.initialize();

  protected constructor(
    elementReference: ElementRef<HTMLElement>,
    private cFactory: FConnectionFactory
  ) {
    super(elementReference.nativeElement);
  }

  public initialize(): void {
    this.fPath.initialize();
    this.fGradient.initialize();
    this.redraw();
  }

  public isContains(element: HTMLElement | SVGElement): boolean {
    return (this.hostElement.firstChild?.lastChild as HTMLElement).contains(element);
  }

  public setLine(source: IPoint, sourceSide: EFConnectableSide, target: IPoint, targetSide: EFConnectableSide): void {
    this.line = LineExtensions.initialize(source, target);
    const pathResult = this.getPathResult(source, sourceSide, target, targetSide);
    this.path = pathResult.path;
    this.penultimatePoint = pathResult.penultimatePoint || source;
    this.fConnectionCenter?.nativeElement?.setAttribute('style', this.getTransform(pathResult.connectionCenter));
  }

  private getPathResult(source: IPoint, sourceSide: EFConnectableSide, target: IPoint, targetSide: EFConnectableSide): any {
    const radius = this.fRadius > 0 ? this.fRadius : 0;
    const offset = this.fOffset > 0 ? this.fOffset : 1;
    return this.cFactory.handle(
      {
        type: this.fType,
        payload: { source, sourceSide, target, targetSide, radius, offset }
      }
    );
  }

  private getTransform(position: IPoint): string {
    return `position: absolute; pointerEvents: all; transform: translate(-50%, -50%); left: ${ position.x }px; top: ${ position.y }px`;
  }

  public redraw(): void {
    this.fPath.setPath(this.path);
    this.fSelection.setPath(this.path);
    this.fGradient.redraw(this.line);
    this.fDragHandle.redraw(this.penultimatePoint, this.line.point2);
    this.fTextComponent.redraw(this.line);
  }
}
