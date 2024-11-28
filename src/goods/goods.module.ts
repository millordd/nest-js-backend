import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './goods.model';

@Module({
  imports: [SequelizeModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
