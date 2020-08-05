import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  input1: number;
  input2: number;
  total: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.result$.subscribe(
      (data) => {
        this.input1 = data.input1;
        this.input2 = data.input2;
        this.total = data.total;

        this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Result Pie Chart '
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}'
            },
            showInLegend: true
          }
        },
        exporting: {
          enabled: true
        },
        credits: {
          enabled: false
        },
        series:  [{
          name: 'Value',
          colorByPoint: true,
          data: [{
            name: 'Input1',
            y: this.input1,
            sliced: true,
            selected: true,
          }, {
            name: 'Input2',
            y: this.input2,
          }, {
            name: 'Result',
            y: this.total,
          }]
        }],
      };

       // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[0]['y']);
       // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[1]['y']);
      // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[2]['y']);

     //   Highcharts('container', this.chartOptions);

        HC_exporting(Highcharts);

        setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
    }
    );

    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Initial Pie Chart '
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}'
          },
          showInLegend: true
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series:  [{
        name: 'Value',
        colorByPoint: true,
        data: [{
          name: 'Input1',
          y: 1,
          sliced: true,
          selected: true
        }, {
          name: 'Input2',
          y: 1
        }, {
          name: 'Result',
          y: 1,
        }]
      }],
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

}
