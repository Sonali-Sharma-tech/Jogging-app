import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public distance_value;
  public start_time;
  public end_time;
  public date_value;
  
  
 
  constructor() {
    
  }
  public addDataToList(date,distance,ST,ED){
    this.distance_value=distance;
    this.date_value=date;
    this.start_time=ST;
    this.end_time=ED;
    let newEntry =[
      {
        date : this.date_value,
        distance:this.distance_value,
        starttime:this.start_time,
        endtime:this.end_time
      }
    ]
    this.addEntries(newEntry);
  }
 
 //to check if local storage is null or not
  public initEntry(){
    if(localStorage.getItem('jog_entry') === null || localStorage.getItem('jog_entry') == undefined) {
      console.log('No Entry Found..');
      return false;
    }
    else{
      return true;
    }
  }
   //to load all the entries
  getEntries() {
    
   let jog_entry = JSON.parse(localStorage.getItem('jog_entry'));
    return jog_entry;
    }
  

  addEntries(newEntry) {
    if(localStorage.getItem('jog_entry') === null || localStorage.getItem('jog_entry') == undefined) {
      localStorage.setItem('jog_entry', JSON.stringify(newEntry));
     
    }
    else{
     let jog_entry = JSON.parse(localStorage.getItem('jog_entry'));
     // Add New Entry
     jog_entry.push(newEntry[0]);
     // Set New Entry
     localStorage.setItem('jog_entry', JSON.stringify(jog_entry));
    }
  }
  
  deleteEntries(Entry) {
    let jog_Entry = JSON.parse(localStorage.getItem('jog_entry'));

    for(let i = 0; i <jog_Entry.length; i++) {
     if(jog_Entry[i].distance == Entry) {
         jog_Entry.splice(i, 1);
     }
  }
  localStorage.setItem('jog_entry', JSON.stringify(jog_Entry));

  }

}
