import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Values {
  public input1: number;
  public input2: number;
  public total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public result = new Subject <Values>();
  result$ = this.result.asObservable();

  constructor() { }
  sendResult(values: Values): void{
    this.result.next(values);
  }

}
