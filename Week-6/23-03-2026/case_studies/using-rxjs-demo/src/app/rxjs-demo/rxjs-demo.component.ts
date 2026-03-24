import { 
Component,
OnInit,
AfterViewInit,
ElementRef,
ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { of, fromEvent, BehaviorSubject } from 'rxjs';
import { map, filter, debounceTime, switchMap, mergeMap } from 'rxjs/operators';
import { error } from 'console';

@Component({
  selector: 'app-rxjs-demo',
  imports: [CommonModule],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.css'
})
export class RxjsDemoComponent implements OnInit, AfterViewInit {
  @ViewChild('clickBtn') ClickBtn!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;

  observableOutput: any[] = [];
  mapOutput: any[] = [];
  filterOutput: any[] = [];
  multiMapOutput: any[] = [];
  behaviorOutput: any[] = [];
  clickOutput: any[] = [];
  searchOutput: any[] = [];
  mergeMapOutput: any[] = [];

  loading =  false;

  constructor(private http: HttpClient) {}

  //Non DOM logic
  ngOnInit(): void {

    const observable$ = of(1, 2, 3, 4, 5);
    //observable
    observable$.subscribe(val => this.observableOutput.push(val));
    //map
    observable$.pipe(map(x => x * 10)).subscribe(res => this.mapOutput.push(res));

    //filter + map
    observable$.pipe(
      map(x => x % 2 === 0 ? x * 100 : null)
    ).subscribe(res =>{
      if(res !== null) {
        this.filterOutput.push(res);
      }
    });

    //multi map
    observable$.pipe(
      map(x => x + 1),
      map(x => x * 2),
      map(x => `Final: ${x}`)
    ).subscribe(res => this.multiMapOutput.push(res));

    //mergeMap
    of(1,2,3).pipe(
      mergeMap(id =>
        this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      )
    ).subscribe(res => 
      {
        this.mergeMapOutput.push(res);
  
      });

}
ngAfterViewInit(): void {
  //search with filter + debounceTime + switchMap
  fromEvent(this.searchBox.nativeElement, 'input').pipe(
    //wait for typing to stop
    debounceTime(500),
    //get input value
    map((event: any) => event.target.value.trim()),
    //allow only 3+ chars
    filter(text => text.length >= 3),
    //cancel previous API & call new one
    switchMap(text => {
      this.loading = true;

      return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?q=${text}`);
    })
  ).subscribe( {
    next: (res) => {
    this.searchOutput = res;
    this.loading = false;
  },
  error: () =>{
    this.searchOutput = [];
    this.loading = false;
  },
  complete: () => {
    console.log('Search Stream completed');
  }
  });
}
}