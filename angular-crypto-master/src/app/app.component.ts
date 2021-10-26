import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  objectKeys = Object.keys;
  cryptos: any;
  timestamps: any;
  prices: any;
  currentPrice: any;
  limitList = new Array();


  constructor(private _data: DataService) {

  }

  ngOnInit() {
    this._data.getPrices()
      .subscribe(res => {
        this.cryptos = res;
        //this.getCurrentPrice();
        console.log(res);
      });
       
    
    setTimeout(() => this._data.getPrices().subscribe(res => {
      this.cryptos = res;
      //this.getCurrentPrice();
      this.applyLimit(5.00);

      //console.log(res);
    }), 5000);   


    
  }

  applyLimit(test: any){
    
    let limit = 5.00;
    for(let crypto of this.cryptos) {
      //console.log(crypto);
      
      if(crypto.price <= test){
        this.limitList.push(crypto);
      }
      
    }
    console.log("LIMIT APPLIED");
    console.log(this.limitList);
  }
  //GET CURRENT PRICE ONLY USED FOR SPARKLINE API
  getCurrentPrice() {
    for(let i=0; i<this.cryptos.length; i++){
      //this.timestamps = this.cryptos[i].timestamps;
      this.prices = this.cryptos[i].prices;
      this.cryptos[i].currentPrice = this.cryptos[i].prices[this.prices.length - 1];
      //console.log(this.cryptos[i].currentPrice);
    }
  }

  ngOnDestroy(){
  }
}
