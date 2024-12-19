import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SelectedProductComponent } from './products/selected-product/selected-product.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'selected-product/:productId', component: SelectedProductComponent },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
