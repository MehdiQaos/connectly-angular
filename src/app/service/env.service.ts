import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  get ApiUrl(): string {
    return environment.apiUrl;
  }
}
