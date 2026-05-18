import { Component, OnInit } from '@angular/core';
import { SocketService, Nominee } from '../services/socket.service';

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.scss']
})
export class AudienceComponent implements OnInit {
  nominees: Nominee[] = [];
  hasVoted: boolean = false;
  votedFor: number | null = null;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    let votedId = sessionStorage.getItem('votedFor');
    if (votedId) {
      this.hasVoted = true;
      this.votedFor = Number(votedId);
    }

    this.socketService.getNominees().subscribe((res: any) => {
      this.nominees = res;
    });
  }

  castVote(id: any) {
    if (this.hasVoted) return;
    
    this.socketService.castVote(id);
    
    sessionStorage.setItem('votedFor', String(id));
    this.hasVoted = true;
    this.votedFor = id;
  }
}
