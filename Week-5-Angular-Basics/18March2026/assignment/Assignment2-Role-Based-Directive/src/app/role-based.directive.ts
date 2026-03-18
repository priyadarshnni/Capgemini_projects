import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRoleBased]',
  standalone: true
})
export class RoleBasedDirective implements OnChanges {
  @Input() appRoleBased: string = '';
  @Input() userRole: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.appRoleBased === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
