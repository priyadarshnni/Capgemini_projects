import { CommonModule } from '@angular/common';
import { 
Component,
Input,
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy,
SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.component.html',
  styleUrl: './order-child.component.css'
})
export class OrderChildComponent implements
OnChanges,
OnInit,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
@Input() orderData: any;

logs: string[] = [];

log(message: string) {
  this.logs.push(`${new Date().toLocaleTimeString()}: ${message}`);
}
ngOnChanges(changes: SimpleChanges){
  this.log(' ngOnChanges - Input Data changed'); 
}

ngOnInit() {
  this.log(' ngOnInit - Component initialized'); 
}

ngDoCheck(){
  this.log(' ngDoCheck - Change detection'); 
}

ngAfterContentInit(){
  this.log(' ngAfterContentInit - Content initialized'); 
}
ngAfterContentChecked(){
  this.log(' ngAfterContentChecked - Content checked');
}

ngAfterViewInit(){
  this.log(' ngAfterViewInit - View initialized');
}
ngAfterViewChecked(){
  this.log(' ngAfterViewChecked - View checked');
}

ngOnDestroy(){
  this.log(' ngOnDestroy - Component destroyed');
}
  
}
