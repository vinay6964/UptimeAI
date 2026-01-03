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
        padding: [5, 10],
        backgroundColor: '#2b3137', // GitHub Tooltip Dark
        borderColor: '#2b3137',
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
        right: 0,      // Align legend to the right
        bottom: 0,     // Stick to bottom
        itemWidth: 10, // Small squares for legend
        itemHeight: 10,
        text: ['More', 'Less'], // Text on ends
        textGap: 5,
        pieces: [
           { min: 10, color: '#216e39' }, 
           { min: 7, max: 9, color: '#30a14e' },
           { min: 4, max: 6, color: '#40c463' },
           { min: 1, max: 3, color: '#9be9a8' },
           { value: 0, color: '#ebedf0' }
        ],
        textStyle: { color: '#768390', fontSize: 12 } 
      },
      calendar: {
        top: 20,    // Reduce top gap
        left: 30,   // Space for Day labels
        right: 5,
        bottom: 25,
        cellSize: [11, 11], // Exact GitHub square size
        range: [startDate, endDate],
        itemStyle: {
          borderWidth: 2,      // Gap between squares
          borderColor: '#0d1117' // Match your background color (hidden gap)
        },
        splitLine: { show: false }, // Remove month divider lines
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 1, // Start Monday
          nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''], // GitHub style: only Mon/Wed/Fri
          color: '#768390',
          fontSize: 10,
          margin: 5
        },
        monthLabel: {
          color: '#768390',
          fontSize: 10,
          position: 'start', // Align month text to start of month
          margin: 5
        }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: data,
        itemStyle: {
          borderRadius: 2 // Tiny rounding like GitHub
        }
      }
    };
  }
}