import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { Note } from '../shared/note.model'

@Component({
 selector: 'app-note',
  templateUrl: './note.component.html',
   styleUrls: ['./note.component.css']
 })

 export class NoteComponent implements OnInit {
   noteDetails=Note;
   constructor(private userService: UserService, private router:Router) { }

 ngOnInit() {
    this.userService.getUserProfile().subscribe(
       res => {
         this.noteDetails = res['note'];
       },
      err => { 
        console.log(err);
       }
     );
  }
   onLogout(){
     this.userService.deleteToken();
     this.router.navigate(['/login']);   } }
