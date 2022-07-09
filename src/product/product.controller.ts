import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  add(@Body() product: ProductDto) {
    return this.productService.add(product);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post('update/:id')
  update(@Body() product: ProductDto, @Param('id') id: string) {
    return this.productService.update(product, id);
  }
}
