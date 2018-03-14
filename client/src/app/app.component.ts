import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Stock Charts App';
  symbol: String = 'GOOGL';

  data: Object = {};

  public candle_ChartData = [];

  public candle_ChartCompaniesList = [
    {symbol: 'AAPL', name: 'Apple'},
    {symbol: 'PTR', name: 'PetroChina'},
    {symbol: 'BCH', name: 'Banco de Chile'},
    {symbol: 'CHA', name: 'China Telecom Corp.'},
    {symbol: 'HSBC', name: 'HSBC Holdings'},
    {symbol: 'CHL', name: 'China Mobile'},
    {symbol: 'TSM', name: 'Taiwan Semiconductor Manufacturing'},
    {symbol: 'MSFT', name: 'Microsoft'},
    {symbol: 'EC', name: 'Ecopetrol'},
    {symbol: 'AMZN', name: 'Amazon.com'},
    {symbol: 'AMS', name: 'Royal Dutch Shell'},
    {symbol: 'CEA', name: 'China Eastern Airlines Corp.'},
    {symbol: 'BABA', name: 'Alibaba Group'},
    {symbol: 'FB', name: 'Facebook'},
    {symbol: 'TM', name: 'Toyota'}
  ];

  constructor(private http: HttpClient){
    this.data = {};
    this.symbol = 'AAPL';
  }

  ngOnInit() {
    this.getStockData(this.symbol);
  }

  getStockData(symbol) {

    return this.http.get<any>('http://localhost:8000/stocks', { responseType: 'json', params: { symbol: symbol}, headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        data => {

          this.data = data.data

          this.candle_ChartData = [];
          this.candle_ChartData.push(['Date', 'Low', 'Opening value', 'Closing value', 'High']);

          for(var item in this.data){
            var self = this.data[item];
            this.candle_ChartData.push([self.date.split("T")['0'], self.low, self.open, self.close, self.high]);
          }

          return data
        },
        err => {
          console.log(err)
        })
  }

  onFormSubmit(){
    this.getStockData(this.symbol);
  }
}
