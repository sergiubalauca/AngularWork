import { trigger, transition, style, animate, } from '@angular/animations';
export const fader =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routeAnimations', [
        // route transition specifically for aPage to bPage
        transition('employee-details => add-todo', [
            // css styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('2400ms ease', style({ opacity: 1 }))
        ]),
        // route transition for * (any) to and from * (any)
        transition('* <=> *', [
            // css styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('600ms ease', style({ opacity: 1 }))
        ]),
    ]);