import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thriplets'
})
export class ThripletsPipe implements PipeTransform {

  transform(value: any) {
    return value.filter((v,i) => i%6==0).map((v,i) => [value[i*6], value[i*6+1], value[i*6+2], value[i*6+3], value[i*6+4], value[i*6+5]])
  }

}
