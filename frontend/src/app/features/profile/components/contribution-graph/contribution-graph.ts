import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts'; // <--- Import this
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-contribution-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule], // <--- Add Module here
  templateUrl: './contribution-graph.html',
  styleUrls: ['./contribution-graph.scss']
})
export class ContributionGraphComponent implements OnChanges {
  @Input() calendar: any;

  chartOption: EChartsOption = {}; // Configuration for the graph

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calendar'] && this.calendar) {
      this.initChart();
    }
  }

  initChart() {
    const data: [string, number][] = [];
    let startDate = '';
    let endDate = '';

    if (this.calendar?.weeks) {
      this.calendar.weeks.forEach((week: any) => {
        week.contributionDays.forEach((day: any) => {
          data.push([day.date, day.contributionCount]);
          if (!startDate) startDate = day.date;
          endDate = day.date;
        });
      });
    }

    this.chartOption = {
      tooltip: {
        position: 'top',
        confine: true,
        padding: [5, 10],
        backgroundColor: '#6e7681',
        borderColor: '#6e7681',
        textStyle: { color: '#ffffff' },
        formatter: (params: any) => {
          const date = new Date(params.data[0]);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const count = params.data[1];
          const label = count === 0 ? 'No contributions' : `${count} contributions`;
          return `${label} on ${dateStr}`;
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        type: 'piecewise',
        orient: 'horizontal',
        right: 0,
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        text: ['More', 'Less'],
        textGap: 5,
        textStyle: { color: '#768390', fontSize: 10 },
        pieces: [
          { min: 10, color: '#39d353' },
          { min: 7, max: 9, color: '#26a641' },
          { min: 4, max: 6, color: '#006d32' },
          { min: 1, max: 3, color: '#0e4429' },
          { value: 0, color: '#161b22' }
        ]
      },
      calendar: {
        top: 25,
        left: 30,
        right: 5,
        bottom: 25,
        cellSize: [13, 13], 
        range: [startDate, endDate],
        itemStyle: {
          color: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent'
        },
        splitLine: { show: false },
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 1,
          nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
          color: '#768390',
          fontSize: 9,
          margin: 5
        },
        monthLabel: {
          color: '#768390',
          fontSize: 9,
          position: 'start',
          margin: 5
        }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: data,
        itemStyle: {
          borderColor: '#0d1117',
          borderWidth: 2.5,
          borderRadius: 3
        }
      }
    };
  }
}