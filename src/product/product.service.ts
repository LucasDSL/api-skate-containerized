import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findById(id: string): Promise<Product> {
    try {
      return this.productRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  add(product: ProductDto): Product {
    try {
      const newProduct = this.productRepository.create(product);
      this.productRepository.save(newProduct);
      return newProduct;
    } catch {
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    this.productRepository.delete(product);
  }

  async update(product: ProductDto, id: string): Promise<void> {
    const oldProduct = await this.findById(id);
    this.productRepository.save(Object.assign(oldProduct, product));
  }
}
