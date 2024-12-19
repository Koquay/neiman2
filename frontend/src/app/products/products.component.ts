import { Component,  } from '@angular/core';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductGalleryComponent } from "./product-gallery/product-gallery.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductSidebarComponent,
    ProductGalleryComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
 
}
