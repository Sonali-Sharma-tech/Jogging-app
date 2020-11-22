import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Entries;
  public found:boolean=false;
  public averageSpeed=0;
  public total_distance=0;
  constructor(private serviceObj : ServiceService) { }

  ngOnInit(): void {
    if(this.serviceObj.initEntry()){
      this.found=true;
   this.Entries = this.serviceObj.getEntries();//load all entries
   this.getAverageSpeed();//get average speed
  
   console.log(this.Entries);
    }

  }
  //find average speedS
  getAverageSpeed() {
    let total_time=0;
this.Entries.forEach(element => {
      this.total_distance = this.total_distance + parseInt(element.distance);
      element.starttime = new Date(element.starttime);
       element.endtime = new Date(element.endtime);
      
let diff =(element.endtime.getTime() - element.starttime.getTime()) / 1000;
      diff /= 60*60;
      
     let CalctimeValue= Math.abs(Math.round(diff))
      total_time = total_time + CalctimeValue;
    });
    this.averageSpeed = (this.total_distance/ total_time);
    if(isNaN(this.averageSpeed)){
      this.averageSpeed = 0;
    }
    
  }
  //on click of 'X' it delete entry 
  deleteEntry(Entry){
    this.serviceObj.deleteEntries(Entry);
    window.location.reload();
  }

}
