import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;
  @Column()
  @Field(() => String)
  public name: string;
  @Column()
  @Field(() => Float)
  public quantity: number;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  public quantityUnits?: string;
}
