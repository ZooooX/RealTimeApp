import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @ViewChild("sidenav", {static : true}) sidenav! : ElementRef;
  @ViewChild("main", {static : true}) main! : ElementRef;

  sidenavOpened : boolean = false;

  constructor(public auth : AuthService) { }

  ngOnInit(): void {
    
  }

  toggleSidenav(){
    if(this.sidenavOpened){
      this.main.nativeElement.style.width = '100%';
      this.sidenav.nativeElement.style.width = '0';
      this.main.nativeElement.style.marginLeft = '0';
      document.body.style.backgroundColor = "white";
      this.sidenavOpened = false;
    }
    else{
      this.sidenav.nativeElement.style.width = '250px';
      this.main.nativeElement.style.marginLeft = '250px';
      this.main.nativeElement.style.width = 'calc(100% - 250px)';
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      this.sidenavOpened = true;
    }
  }
}
