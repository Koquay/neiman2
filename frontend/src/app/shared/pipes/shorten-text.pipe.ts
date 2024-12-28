import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
  standalone: true
})
export class ShortenTextPipe implements PipeTransform {

  transform(text: string, ...args: unknown[]): unknown {
    const newValue = text.substring(0, 40) + '...'
    return newValue;
  }


}
