import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckedListService {

   
  public list : any[] =[];
  public listID:any[] = [];

  private subject: BehaviorSubject<any[]>;
  private listIDs:BehaviorSubject<any[]>;

  constructor() {
    this.subject = new BehaviorSubject(this.list);
    this.listIDs = new BehaviorSubject(this.listID);
  }
 
  

  public setList(checkedlist:any,listID:any ) {
    this.list = checkedlist;
    this.listID = listID 
  }

  
 
}