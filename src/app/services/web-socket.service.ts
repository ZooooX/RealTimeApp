import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  socket : any;
  //readonly url : string = '192.168.1.34:3000';
  readonly url : string = 'localhost:3000';

  constructor() {
    this.socket= io(this.url);
  }

  listen(eventName : string){
    return new Observable((subscriber) =>{
      this.socket.on(eventName, (data : any) =>{
        subscriber.next(data);
      })
    });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }

  removeAllListeners(eventName : string){
    this.socket.removeAllListeners(eventName);
  }
}
