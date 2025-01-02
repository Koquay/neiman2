import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../product.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  private url = '/api/product/search/1';

  private httpClient = inject(HttpClient)

  public searchProducts = (searchField: string) => {
    const params = new HttpParams({
      fromObject: { searchField },
    });

    return this.httpClient.get<ProductModel[]>(this.url, { params }).pipe(
      tap(searchResults => {
        console.log('searchResults', searchResults)
      })
    )
  };
}
