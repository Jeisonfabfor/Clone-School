export class CreateProductDTO {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly images: string;
  readonly createAt: Date;
}
