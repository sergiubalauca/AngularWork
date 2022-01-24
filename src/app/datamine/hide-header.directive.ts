import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
    selector: '[appHideToolbar]'
})
export class HideHeaderDirective implements OnInit {

    @Input('appHideToolbar') public toolbar: any;

    private toolbarHeigth = 45;

    public constructor(private renderer: Renderer2, private domCtrl: DomController) {

    }

    public ngOnInit(): void {
        console.log('TEST: ', this.toolbar.clientHeight);
        this.toolbar = this.toolbar;

        this.domCtrl.read(() => {
            this.toolbarHeigth = this.toolbar.clientHeight;
        });

        console.log('TEST1: ', this.toolbarHeigth);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostListener('ionScroll', ['$event']) public onContentScroll($event) {

        // <ion-toolbar class="ion-no-border" #toolbar > </ion-toolbar>
        //
        // <ion-content [scrollEvents]="true" [appHideToolbar]="toolbar" class="ion-padding">
        //     <app-dynamic-form [tableName]="tableName"></app-dynamic-form>
        //     <ion-fab horizontal="end" vertical="bottom" slot="fixed" class="ion-margin">
        //         <ion-fab-button disabled>
        //             <ion-icon class="icon-Save"></ion-icon>
        //         </ion-fab-button>
        //     </ion-fab>
        // </ion-content>

        let scrollTop = 1 - ($event.detail.scrollTop / 150);
        console.log(scrollTop);
        if (scrollTop < 0.55) {
            scrollTop = 0.50;
        }

        this.domCtrl.write(() => {
            // this.renderer.setStyle(this.toolbar, 'height', `${newOpacity}px`);
            // this.renderer.setStyle(this.toolbar, 'opacity', scrollTop);
        });
    }
}
