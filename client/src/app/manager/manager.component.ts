import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  public get userName(): string {
    return this.userService.getUser();
  }

  public onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
