﻿# Auto Snap

## Description

This guide explains how to automatically snap connections when they are dropped near a connector, offering a comprehensive solution for building interactive flow-based diagrams. To implement this functionality, you need to add the `<f-snap-connection>` component inside the `<f-canvas>`. This component handles temporary connection display and snapping to the nearest connector when the threshold is reached.

## Example

::: ng-component <auto-snap></auto-snap> [height]="600"
[component.html] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/connections/auto-snap/auto-snap.component.html
[component.ts] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/connections/auto-snap/auto-snap.component.ts
[component.scss] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/connections/auto-snap/auto-snap.component.scss
[common.scss] <<< https://raw.githubusercontent.com/Foblex/f-flow/main/projects/f-examples/_flow-common.scss
:::



