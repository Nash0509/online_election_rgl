import { Component, OnInit } from '@angular/core';
import { SocketService, Nominee } from '../services/socket.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  nominees: Nominee[] = [];
  totalVotes: number = 0;

  public chartType: ChartType = 'bar';
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Votes', 
        backgroundColor: 'rgba(138, 43, 226, 0.7)',
        borderColor: 'rgba(138, 43, 226, 1)',
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };
  
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.getNominees().subscribe((data: any) => {
      this.nominees = data;
      this.updateChart(data);
    });
  }

  getLeadingCandidate() {
    if (!this.nominees.length) return null;
    let lead = this.nominees[0];
    for(let n of this.nominees) {
      if(n.votes > lead.votes) {
        lead = n;
      }
    }
    return lead;
  }

  updateChart(data: any) {
    let sum = 0;
    data.forEach((x: any) => sum += x.votes);
    this.totalVotes = sum;

    let lbls = data.map((x: any) => x.name);
    let vals = data.map((x: any) => x.votes);

    this.chartData = {
      labels: lbls,
      datasets: [
        { 
          data: vals, 
          label: 'Votes',
          backgroundColor: 'rgba(138, 43, 226, 0.7)',
          borderColor: 'rgba(138, 43, 226, 1)',
          borderWidth: 1,
          borderRadius: 8
        }
      ]
    };
  }
}
