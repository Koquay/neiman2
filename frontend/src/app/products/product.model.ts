export class ProductModel {
    _id: string = '';
    designer: string = '';
    name: string = '';
    images: string[] = [];
    price: number = 0;
    discount: number = 0;
    rating: number = 0;
    category: string = '';
    attributes: [{ label: string, attribute: string }] = [{ label: '', 'attribute': '' }];
    colors: string[] = [];
    color: string = '';
    size: string = '';
    quantity = 1;
}



