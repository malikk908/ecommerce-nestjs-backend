class CreateItemDto {   
    productId: number;  
    quantity: number;
  }

export class CreateOrderDto {
    email: string;
    name: string;
    items: CreateItemDto[];
}
