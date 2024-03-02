import {animate, state, style, transition, trigger} from '@angular/animations';

export const cardToggle = trigger('cardToggle', [
  state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
  state('expanded', style({height: '*'})),
  transition('collapsed => expanded', animate('300ms ease-in-out')),
  transition('expanded => collapsed', animate('300ms ease-in-out'))
]);
