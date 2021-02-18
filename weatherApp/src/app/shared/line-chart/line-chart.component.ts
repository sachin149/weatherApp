import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
  chartDataX;
  minTempData;
  maxTempData;
  
  lineChart;
  data = [];
  
  
  constructor(private commonservice: CommonService) {
    
   }

  ngOnInit(): void {
    
    this.commonservice.chart.subscribe((data) => {
      this.chartDataX = data.chartDataX;
      this.maxTempData = data.maxTempData;
      this.minTempData = data.minTempData;
      console.log(this.lineChart);
      this.createChart();
    }); 
    
  }

  createChart() {
    this.lineChart = new Chart('canvas',{
      type: 'line',
      data: {
        labels: this.chartDataX,

        datasets: [
          {
            data : this.minTempData,
            borderColor: '#3cb371',  
            backgroundColor: "#0000",
          },
          {
            data : this.maxTempData,
            borderColor: '#3cb371',  
            backgroundColor: "#0000",
          }

        ]
      },
      options: {
        responsive: true,
        
        legend: {  
          display: false  
        },
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true,
            ticks: {
              beginAtZero: true
            }  
          }],  
        }
      }
    })
  }
 
}
