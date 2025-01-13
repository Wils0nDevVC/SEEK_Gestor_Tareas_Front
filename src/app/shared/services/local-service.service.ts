import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() {
  }

  setJsonValue(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  getJsonValue(key: string) : any {
    return localStorage.getItem(key) ;
  }

  clearToken() {
    return localStorage.clear();
  }

  clearKey(key: string) {
    return localStorage.removeItem(key);
  }

  getKey() : string[] {
    let keyValue : any = []
    for ( let [key] of Object.entries(localStorage)) {
      keyValue.push(key)
    }
    return keyValue
  }

}