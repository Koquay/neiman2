import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  public pages: number[] = [];
  public pageNo = 1;
  public numberOfPages = 0;
  public pageSize = 8;
  @Output() pageChangeEvent = new EventEmitter<number>();

  @Input() set productCount(productCount: number) {
    //console.log('this.productCount', productCount)

    this.numberOfPages = Math.ceil(
      productCount / this.pageSize
    );

    this.pages = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
  }

  public getPage = (pageNo:number) => {
    this.pageNo = pageNo;
    this.pageChangeEvent.emit(this.pageNo)
  }

  public getAdjacentPage(direction:string) {
    console.log('pageNo', direction)
    if (direction === 'next') {
      if (this.pageNo < this.numberOfPages) {
        ++this.pageNo;
        this.pageChangeEvent.emit(this.pageNo);
      }
    } else if (direction === 'prev') {
      if (this.pageNo > 1) {
        --this.pageNo;
        this.pageChangeEvent.emit(this.pageNo);
      }
    }
  }
}
