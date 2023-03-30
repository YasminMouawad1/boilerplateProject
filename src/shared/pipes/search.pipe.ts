import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
 

export class SearchPipe implements PipeTransform {

  transform(usersList:any[], trem:string): any[] {
    //console.log(trem)
    return usersList.filter((user)=>user.name.includes(trem)); 
  }

} 

