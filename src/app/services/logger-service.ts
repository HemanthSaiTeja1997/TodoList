import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
logWithError(message:string,error:any):void{
  console.error('Error:', error);
    console.log('Message:', message);
}
}
