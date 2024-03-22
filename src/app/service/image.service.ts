import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  baseUrl;

  constructor(private envService: EnvService) {
    this.baseUrl = this.envService.ApiUrl + '/storage/images';
  }

  public getImageUrl(imageName: string | null) {
    if (!imageName) return null;
    return `${this.baseUrl}/${imageName}`;
  }
}
