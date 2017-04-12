

import {
    SimpleChanges
} from '@angular/core';


export abstract class ComponentBase
{
    /* Most Common Life cycle hooks for easy access.
     * more documentation at https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
     */

    private ngOnChanges(changes:SimpleChanges):void {this.propertiesChanged(changes)}

    private ngOnInit():void {this.initialized()}

    private ngDoCheck():void {this.updated()}

    private ngOnDestroy():void {this.destroyed()}

    private ngAfterViewInit():void {this.creationComplete()}

    private ngAfterViewChecked():void {this.viewUpdated()}

    private ngAfterContentInit():void {this.dynamicContentCreationComplete()}

    private ngAfterContentChecked():void{this.dynamicContentUpdated()}


    /*called after component is initialized, keep in mind the children of components are not yet created*/
    protected initialized():void{}

    /*called after all child components are created thus giving access to the @viewChild component references*/
    protected creationComplete():void{}

    /*called after dynamic contents set into <ng-content></ng-content> is created  */
    protected dynamicContentCreationComplete():void{}

    /*called after dynamic contents set into <ng-content></ng-content> is created  */
    protected dynamicContentUpdated():void{}

    // Only called if there is an [input] variable  on the which is changed by a parent view.
    protected propertiesChanged(changes:SimpleChanges):void{}

    // Beware! Called frequently!
    // called when any property on the instance is changed
    protected updated():void{}

    // Beware! Called frequently!
    /*called  if the view is updated on the screen, aka a data change triggering view update*/
    protected viewUpdated():void{}

    /*called after component is destroyed or removed from the document*/
    protected destroyed():void{}
}