import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { AuthenticationModel } from '../../../authentication/authentication.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public cartService = inject(CartService);

  public user?: AuthenticationModel;
  public numberOfItems = 0;
  public action = '';

  ngOnInit() {
    console.log('user', this.user)
    console.log('user.token', this.user?.token)

  }
}
