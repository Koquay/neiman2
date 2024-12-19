import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductSidebarService {

  public productSidebarSignal = signal<ProductSidebarData>(new ProductSidebarData() );

  public updateSidebarData = (productSidebarData: ProductSidebarData) => {
    this.productSidebarSignal.set({... productSidebarData} );
    console.log('ProductSidebarService.productSidebarSignal', this.productSidebarSignal())
  };
}

export class ProductSidebarData {
  categories = {
    title: 'Category',
    currentCategory: 'All Men',
    categories: [
      {
        name: 'All Men',
        checked: false,
      },
      {
        name: 'Clothing',
        checked: false,
      },
      {
        name: 'Shoes',
        checked: false,
      },
      {
        name: 'Designers',
        checked: false,
      },
      {
        name: 'Accessories',
        checked: false,
      },
      {
        name: 'Jewelery',
        checked: false,
      },
    ],
  };

  priceFilter = {
    title: 'Price',
    priceRange: [
      {
        range: { low: 1, high: 500 },
        label: 'Under $500',
        checked: false,
      },
      {
        range: { low: 500, high: 1000 },
        label: '$500 - $1000',
        checked: false,
      },
      {
        range: { low: 1000, high: 2000 },
        label: '$1000 - $2000',
        checked: false,
      },
      {
        range: { low: 2000, high: 3000 },
        label: '$2000 - $3000',
        checked: false,
      },
      {
        range: { low: 3000, high: 4000 },
        label: '$3000 - $4000',
        checked: false,
      },
      {
        range: { low: 4000, high: 111111111 },
        label: 'Over $4000',
        checked: false,
      },
    ],
  };

  ratings = {
    title: 'Ratings',
    ratings: [
    {
        rating: 5,
        checked: false,
        },
        {
        rating: 4,
        checked: false,
        },
        {
        rating: 3,
        checked: false,
        },
        {
        rating: 2,
        checked: false,
        },
        {
        rating: 1,
        checked: false,
        },
                        
    ],
};


  colors = {
    title: 'Color',
    colors: [
      {
        color: 'Black',
        icon: 'far fa-circle',
        checked: false,
      },
      {
        color: 'Brown',
        icon: 'far fa-circle',
        checked: false,
      },
      {
        color: 'Gray',
        icon: 'far fa-circle',
        checked: false,
      },
      {
        color: 'Blue',
        icon: 'far fa-circle',
        checked: false,
      },
      {
        color: 'Purple',
        icon: 'far fa-circle',
        checked: false,
      },
      {
        color: 'Red',
        icon: 'far fa-circle',
        checked: false,
      },
    ],
  };

  pageNo = 1;
  pageSize = 8;
  // pageSizeOptions = [5, 10, 15];
}
