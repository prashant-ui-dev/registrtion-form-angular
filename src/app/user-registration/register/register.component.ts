import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, FormBuilder, Validators} from '@angular/forms';
import { SaveDataService } from 'src/app/save-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public imagePath:any;
  imageSrc?: string;
  imgURL: any;
  public message?: string;
  submitted = false;
  formdata:any;
  alertform:boolean =false;
  genders=['others','male','female'];

  get f(){
    return this.registerform.controls;
  }

  constructor(private fb :FormBuilder, private _users:SaveDataService) {
     this.formdata=[];
   }
  // validation
  
  registerform = this.fb.group(
    {
      FirstName:['' , [Validators.required, Validators.minLength(3)]], 
      midname:['' , [Validators.required, Validators.minLength(3)]], 
      lastname:['' , [Validators.required, Validators.minLength(3)]], 
      gender:['', [Validators.required]],
      postaladdress:['', [Validators.required, Validators.maxLength(200)]], 
      aadharnum:['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      pancard:['', [Validators.required ,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      photo:['', [Validators.required]],
      email: ['', [Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      docs:['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] 
    
    }
  );

// End here
  // public updatedata():void{
  //   // alert ("form data succesfully added");
  //   this.formdata.push(this.registerform.value );
  // }
 //preview image
  preview(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  
  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.registerform.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }


  // Users
Users:any=[
  {
    FirstName:'Prashant', 
      midname:'kumar', 
      lastname:'pal', 
      genders:'male', 
      postaladdress:'Noida, Jail',  
      aadharnum:'111122221111', 
      pancard:'BNZAA2318J', 
      photo:'', 
      email:'pal.prashant91@gmail.com', 
      docs:'', 
      phone: '9456046932',

  }

];
SaveUsers() {

  this.formdata.push(this.registerform.value );
  this._users.UserDetails(this.Users).subscribe(
    (response) => console.log(response),
    (err)=>console.log(err)
  )} 
  getUsers() {
    this._users.fetchUsers(this.Users).subscribe(

      (response)=>{
      // (err)=> console.log(err)
      const data =JSON.stringify(response)
      console.log(data)
      this.Users=JSON.parse(data)
    }
    )
  }
//  use this  - when test 
  formData() {
    this.registerform.patchValue({
      FirstName:'Prashant', 
      midname:'kumar', 
      lastname:'pal', 
      genders:'male', 
      postaladdress:'Noida, Jail',  
      aadharnum:'111122221111', 
      pancard:'BNZAA2318J', 
      photo:'', 
      email:'pal.prashant91@gmail.com', 
      docs:'', 
      phone: '9456046932'
    

    });
  }
  ngOnInit(): void {
  }
  OnSubmit(){
    if (this.registerform.invalid) {
        return;
    }
    if (this.registerform.valid) {
      this.alertform=true;
      this.submitted =true;
  }
  this.Users.push(this.registerform.value); 
  
  }
  deleteUsers(id:any){
    if (confirm('do you want to delete this user? then press ok')) {
        this.Users.splice(id,1);
    }
     
  }
  onReset() {
    this.submitted = false;
    this.alertform=false;
    this.registerform.reset();
  }


}
