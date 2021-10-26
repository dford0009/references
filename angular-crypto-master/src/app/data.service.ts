import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  //API KEY
    API_KEY = '3bf912a7b4b0964faf3144537d8f5274';
    //
    //Base API_URL
    BASE_URL = 'https://api.nomics.com/v1/';
    //
    //Currency list Url
    CURRENCY_LIST = 'currencies/ticker?key=3bf912a7b4b0964faf3144537d8f5274&interval=1h,1d&convert=USD&per-page=100&page=1';
    //
    //Sparkline url
    SPARKLINE_URL = 'currencies/sparkline?key=3bf912a7b4b0964faf3144537d8f5274&ids=BCH,XLM,XRP&start=2018-04-14T00%3A00%3A00Z';
    //

  constructor(private _http: HttpClient) { }

  getPrices() {
    
    return this._http.get(this.BASE_URL + this.CURRENCY_LIST)
      .map(result => this.result = result);
  }


  

}
