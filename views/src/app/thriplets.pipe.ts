import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thriplets'
})
export class ThripletsPipe implements PipeTransform {

  transform(value: any) {
    return value.filter((v,i) => i%3==0).map((v,i) => [value[i*3], value[i*3+1], value[i*3+2]])
  }

}
