import { animate, animateChild, query, stagger, style, transition, trigger } from "@angular/animations"

const FADE_IN_ANIMATION = [
    style({ opacity: 0, filter: 'blur(6px)' }),
    animate('200ms', style({ opacity: 1, filter: 'blur(0px)' }))
  ]

export const STAGGER_CHILDREN = [
  trigger('animationContainer', [
    transition('* => *', [
      query('@*', stagger('50ms', animateChild()), {optional: true}),
    ])
  ])
];

export const CHILD_FADE_IN_AND_OUT = [
  trigger('animate', [
    transition(':enter', FADE_IN_ANIMATION)
  ])
];