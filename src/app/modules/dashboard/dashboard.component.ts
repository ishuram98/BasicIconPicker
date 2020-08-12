import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import {MatDialog} from '@angular/material/dialog';

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
  public icon ;
  // public val = 'icofont icofont-airplane';
  public val;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

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
    this.dashboardService.resultI$.subscribe(
      (iconn) => {
        if (iconn.search('icofont') === -1){
          console.log(this.icon);
          this.icon = iconn;
          this.val = iconn;
        }
        else{
          this.icon = '';
          this.val = iconn;
        }
      });

    this.PieChart();
  }

  public changeIcon(newIcon: string): void {
    this.dashboardService.resultI$.subscribe(
      (iconn) => {
        this.val = iconn;
      });
    // this.val = newIcon;
    // this.icon = newIcon;
}
public changeIconn(newIcon: string): void {

  // this.val = newIcon;
   this.icon = newIcon;
}

openDialog(): void {
  this.dialog.open(DialogElementsExampleDialog, {
    width: '300px', height: '250px',
  });
}

  PieChart(): void {
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

@Component({
  selector: 'app-dialog-box',
  templateUrl: 'dialogueBox.html',
  styleUrls: ['dialogueBoxCss.css']
})
// tslint:disable-next-line: component-class-suffix
export class DialogElementsExampleDialog {
  public ficon: string;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  public changeIcon(newIcon: string): void {
    this.ficon = newIcon;
    this.dashboardService.sendIcon(this.ficon);
}
}
