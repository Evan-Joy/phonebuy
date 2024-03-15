import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('PRODUCT')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({summary:'Create new product'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary:'Get list product'})
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'Get product by id'})
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({summary:'Update a product by id'})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Delete a product by id'})
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
