import { Component } from '@angular/core';
import { DataService } from './data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
  <h1 [class]="titleClass">{{ title }}</h1>
  <img src="{{ angularLogo }}">
  <img [src]="angularLogo">
  <img bind-src="angularLogo" [ngStyle]="imgStyles">
  <h3 [ngClass]="titleClasses">Event Binding</h3>
  <button (click)="myEvent($event)">My Button</button>
  <p>{{ someProperty }}</p>
  <p [@myAwesomeAnimation]='state' (click)="animateMe()">I will animated...</p>
  `,
  styles: [`
  h1 {
    text-decoration:underline;
  }
  img{
    width:50px;
  }
  .red-title {
    color:red;
  }
  .large-title {
    font-size:4em;
  }
  p {
    width:200px;
    background:lightgray;
    margin: 100px auto;
    text-align:center;
    padding:20px;
    font-size:1.5em;
  }
  `],
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
      transition('small <=> largge', animate('300ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(35px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))),
    ]),
  ]
})

export class AppComponent {

  state: string = 'small';

  constructor(private dataService: DataService) {

  }

  title = 'app works!';

  angularLogo = 'https://angular.io/assets/images/logos/angular/angular.svg';

  titleClass = 'red-title';

  titleClasses = {
    'red-title': false,
    'large-title': true
  };

  imgStyles = {
    'width': '100px',
    'display': 'block'
  };

  someProperty: string = '';

  ngOnInit() {
    console.log(this.dataService.cars);

    this.someProperty = this.dataService.myData();
  }

  myEvent(event) {
    console.log(event);
  }

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}
