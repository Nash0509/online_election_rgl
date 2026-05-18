import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Nominee {
  id: number;
  name: string;
  votes: number;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  
  private nomineesSubject = new BehaviorSubject<Nominee[]>([]);

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('initialState', (data: Nominee[]) => {
      this.nomineesSubject.next(data);
    });

    this.socket.on('voteUpdated', (data: Nominee[]) => {
      this.nomineesSubject.next(data);
    });
  }

  getNominees(): Observable<Nominee[]> {
    return this.nomineesSubject.asObservable();
  }

  castVote(nomineeId: number): void {
    this.socket.emit('castVote', { nomineeId });
  }
}
