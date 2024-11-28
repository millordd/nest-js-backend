import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { Op } from 'sequelize';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(Goods) private goodsModel: typeof Goods) {}

  async searchByName(name?: string): Promise<Goods[]> {
    if (!name) {
      // If no name is provided, return all goods
      return await this.goodsModel.findAll();
    }
  
    // Perform a search if a name is provided
    return await this.goodsModel.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Case-insensitive search
        },
      },
    });
  }
  
  
  async create(data: Partial<Goods>): Promise<Goods> {
    return this.goodsModel.create(data);
  }

  async update(id: number, data: Partial<Goods>): Promise<Goods> {
    const item = await this.goodsModel.findByPk(id);
    return item.update(data);
  }

  async delete(id: number): Promise<void> {
    const item = await this.goodsModel.findByPk(id);
    await item.destroy();
  }
}
