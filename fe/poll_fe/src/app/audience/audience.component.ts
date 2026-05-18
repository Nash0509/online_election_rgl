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

  ngOnInit(): void {
    const votedId = sessionStorage.getItem('votedFor');
    if (votedId) {
      this.hasVoted = true;
      this.votedFor = parseInt(votedId, 10);
    }

    this.socketService.getNominees().subscribe(data => {
      this.nominees = data;
    });
  }

  castVote(id: number): void {
    if (this.hasVoted) return;
    
    this.socketService.castVote(id);
    
    sessionStorage.setItem('votedFor', id.toString());
    this.hasVoted = true;
    this.votedFor = id;
  }
}
