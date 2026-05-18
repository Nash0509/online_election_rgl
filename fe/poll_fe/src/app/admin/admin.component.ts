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

  ngOnInit(): void {
    this.socketService.getNominees().subscribe(data => {
      this.nominees = data;
      this.updateChartAndStats(data);
    });
  }

  getLeadingCandidate(): Nominee | null {
    if (!this.nominees || this.nominees.length === 0) return null;
    return this.nominees.reduce((prev, current) => 
      (prev.votes > current.votes) ? prev : current
    );
  }

  private updateChartAndStats(data: Nominee[]): void {
    this.totalVotes = data.reduce((sum, n) => sum + n.votes, 0);

    const labels = data.map(n => n.name);
    const votes = data.map(n => n.votes);

    this.chartData = {
      labels: labels,
      datasets: [
        { 
          data: votes, 
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
