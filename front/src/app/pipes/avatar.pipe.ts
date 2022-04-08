import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return env.apiUrl + '/uploads/' + value;
    }

    return '/assets/avatars/no_avatar.png';
  }

}
