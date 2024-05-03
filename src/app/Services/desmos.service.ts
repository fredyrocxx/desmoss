import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesmosService {

  constructor() { }

  private scriptLoaded = false;

  loadDesmosLibrary(callback: () => void) {
    if (!this.scriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
      script.onload = () => {
        this.scriptLoaded = true;
        callback();
      };
      document.body.appendChild(script);
    } else {
      callback();
    }
  }

}
