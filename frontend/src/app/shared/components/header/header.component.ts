import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { AuthenticationModel } from '../../../authentication/authentication.model';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProductSearchComponent } from '../../../products/product-search/product-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ProductSearchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public authenticationService = inject(AuthenticationService);
  public cartService = inject(CartService);
  public user?: AuthenticationModel;
  public numberOfItems = 0;

  private authenticationEffect = effect(() => {
    this.user = this.authenticationService.authSignal();
  })

  private cartEffect = effect(() => {
    this.numberOfItems = this.cartService.cartSignal().length;
  })

  ngOnInit() {
    console.log('user', this.user)
    console.log('user.token', this.user?.token)

  }

  public signout = () => {
    this.authenticationService.signout();
  }
}
