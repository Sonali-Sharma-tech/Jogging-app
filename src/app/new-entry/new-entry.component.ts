import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent implements OnInit {
  public NewForm: FormGroup;
  public mobile:Boolean=false;
  public submitted: boolean = false;
  public date: Date = new Date(2000, 2, 10);
  public ST: Date = new Date(2000, 2, 10, 10, 30, 0);
  public ED: Date = new Date(2000, 2, 10, 10, 30, 0);
  public array_of_month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  //constructor
  constructor(private fb: FormBuilder, private serviceObj: ServiceService) { }
  ngOnInit(): void {
    //checking for smaller screens
    if (window.screen.width < 1024) { // 768px portrait
      this.mobile = true;
    }
    this.NewForm = this.fb.group({
      ST: ['', Validators.required],
      date: ['', Validators.required],
      distance: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*')])],
      ED: ['',
        Validators.required],

    });

  }

  /*on click of submit button this method is called
   to get data from the form fields*/
  saveDetails(): void {

    this.submitted = true;


    if (this.NewForm.invalid) {
      Swal.fire({
        text: 'Please fill all fields',
        type: 'warning',
        showConfirmButton: true,

        confirmButtonColor: '#ffe600'
      })
      return;

    }
    if((this.ST.getTime())>=(this.ED.getTime()))
     { 
       Swal.fire({
      text: 'End Time should be greater than Start Time',
      type: 'warning',
      showConfirmButton: true,

      confirmButtonColor: '#ffe600'
    })
    return;}


    Swal.fire({
    
      text: "Do you want to save the form data",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#ffe600'
    })
      .then((willDelete) => {

        if (willDelete.value) {
          Swal.fire({
            text: 'Success',
            type: 'Success',
            showConfirmButton: true,
      
            confirmButtonColor: '#ffe600'
          })
      
          let dis = this.NewForm.controls['distance'].value;
          this.serviceObj.addDataToList(this.date,dis,this.ST,this.ED);
          window.location.reload();

        } else {
          Swal.fire("Fail");
          this.NewForm.reset();
        }

        console.log(willDelete);
      });



  }
  addData() {
    console.log("ST" + this.ST);
    console.log("ED" + this.ED);
    console.log("date" + this.date);
    console.log("distance" + this.NewForm.controls['distance'].value);

  }
  get f() { return this.NewForm.controls; }


}
