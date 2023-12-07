import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { JsondataService } from './jsondata.service';
import { HttpClientModule } from '@angular/common/http';
import { log } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  providers:[JsondataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'fe-sweetalert';
  constructor(private jsonplaceholder: JsondataService){}

   async deleteAlert(index:number){
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then(async (result) => {
  try{

  
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
      
    });
    this.jsonplaceholder.deletePost(index).subscribe(async (res: any) => {
      //  console.log('id',res);
      console.log(res);
      await  this.jsonData.splice(index, 1);
      // this.res.splice(index,1);
    });
  }}
  catch(err){


  
  // if (
  //   /* Read more about handling dismissals below */
  //   result.dismiss === Swal.DismissReason.cancel
  // ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your imaginary file is safe :)",
      icon: "error"
    });
    console.log(err);
    
  // }
  
}
});
  }

  public jsonData :any;
  ngOnInit(){
    this.jsonplaceholder.getDataApi().subscribe((result)=>{
      console.log(result);
      this.jsonData=result;
      
    })
  }
}
