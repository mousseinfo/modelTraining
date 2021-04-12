import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ThemePalette} from '@angular/material/core';
import {params} from '../params'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  public listparams: any;
  public test: any;
  public listcheck: boolean[];
  public listvaleurs: any;
  public currentParam: any;
  public valuenum: number=0;
  public valuetxt: any;

  // @Input() themeColor = "";


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { test:'ceci est un test',title: 'Hyperparams', cols: 2, rows: 1 },
          { test:'ceci est un test',title: 'Card 2', cols: 2, rows: 1 },
          { test:'ceci est un test',title: 'Card 3', cols: 2, rows: 1 },
          { test:'ceci est un test',title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { test:'ceci est un test',title: 'Hyperparams', cols: 2, rows: 1 },
        { test:'ceci est un test',title: 'Card 2', cols: 1, rows: 1 },
        { test:'ceci est un test',title: 'Card 3', cols: 1, rows: 2 },
        { test:'ceci est un test',title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  par: params[] = [
    {name: 'params1', value: '', options: []},
    {name: 'params2', value: '', options: []},
    {name: 'params3', value: '', options: []},
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.listparams = new Array();
    this.listcheck = new Array<boolean>();
  }
  @Input()
  checked: Boolean = false;

  autoRenew = true;

  addParams(){
    // this.currentParam = v;
    if(!this.listparams.includes(this.currentParam)){
      this.listparams.push(this.currentParam);
      this.listcheck.push(false);
      if(this.currentParam=="params1"){
        this.listvaleurs.push(this.valuenum);
      }else{
        this.listvaleurs.push(this.valuetxt);
      }
    }
    console.log(this.listparams);
    console.log(this.valuenum);

  }

  registerParam(v : string){
    this.currentParam = v;
  }

  getSelected(item : string){
    var i =this.listparams.indexOf(item);
    if(this.listcheck[i]==false){
      this.listcheck[i] = true;
      console.log(this.listcheck);
    }else{
      this.listcheck[i] = false;
      console.log(this.listcheck);
    }
  }

  deleteParameters(){
    var l = [];
    for (let i = 0; i < this.listcheck.length; i++) {
      console.log(this.listcheck[i]);
      if(this.listcheck[i]==true){
        l.push(i);
      }
    }
    console.log(l);

    for(let k = l.length-1; k>-1; k--){
      this.listcheck.splice(k, 1);
      this.listparams.splice(k,1);
    }
    l = [];
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }
}


