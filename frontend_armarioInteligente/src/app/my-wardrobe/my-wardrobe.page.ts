import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-wardrobe',
  templateUrl: './my-wardrobe.page.html',
  styleUrls: ['./my-wardrobe.page.scss'],
  standalone: false
})
export class MyWardrobePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToUploadPhoto() {
    this.router.navigate(['tabs/my-wardrobe/uploadNewPhoto']);
  }
}
