import { Field, Float, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  public name: string;
  @Field(() => Float)
  @IsPositive()
  public quantity: number;
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public quantityUnits?: string;
}
