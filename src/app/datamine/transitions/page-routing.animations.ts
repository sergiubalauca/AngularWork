import { AnimationBuilder, AnimationController, NavController, Animation } from '@ionic/angular';

export const enterAnimations = (baseEl: HTMLElement, opts?: any): Animation => {
    const animationCtrl = new AnimationController();

    const rootAnimation = animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(250)
        .iterations(1)
        .easing('ease-in')
        .fromTo('transform', 'translateX(-900px)', 'translateX(0px)')
        .fromTo('opacity', '0', '1');

    if (opts.direction === 'forward') {
        return animationCtrl.create()
            .addElement(opts.enteringEl)
            .duration(250)
            .iterations(1)
            .easing('ease-in')
            .fromTo('transform', 'translateX(900px)', 'translateY(0px)')
            .fromTo('opacity', '0.8', '1');
    }
    else {
        const leavingAnimation = animationCtrl.create()
            .addElement(opts.leavingEl)
            .duration(250)
            .iterations(1)
            .easing('ease-out')
            .fromTo('transform', 'translateX(0px)', 'translateX(750px)')
            .fromTo('opacity', '0.75', '0.0');

        return animationCtrl.create().addAnimation([rootAnimation, leavingAnimation]);
    }
};
