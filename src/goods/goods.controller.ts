import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { Goods } from './goods.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  
@Get('search')
@UseGuards(JwtAuthGuard)
async search(@Query('name') name?: string): Promise<Goods[]> {
  try {
    console.log('Searching goods with name:', name);
    return await this.goodsService.searchByName(name);
  } catch (error) {
    console.error('Error in GoodsController:', error);
    throw new InternalServerErrorException('Error processing search');
  }
}

  @Post()
  create(@Body() data: Partial<Goods>): Promise<Goods> {
    return this.goodsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Goods>): Promise<Goods> {
    return this.goodsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.goodsService.delete(id);
  }
}
