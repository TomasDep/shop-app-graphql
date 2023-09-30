import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
  ) {}

  public async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItem);
  }

  public findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  public async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    return item;
  }

  public async update(
    id: string,
    updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    return this.itemsRepository.save(item);
  }

  public async remove(id: string): Promise<Item> {
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
    return { ...item, id };
  }
}
