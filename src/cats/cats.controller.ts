import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CatDto } from './cat.dto';
import { CatsService } from './cats.service';
// import { Request } from 'express';

interface response {
  code: number;
  data: any;
  message: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  find(@Query('name') name?: string): response {
    const result = this.catsService.find(name);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  @Get(':name')
  findOne(@Param('name') name: string): response {
    const result = this.catsService.findOne({
      name,
    });
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  @Post()
  async create(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.create(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  @Post('/update')
  async updateOne(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.updateOne(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  @Post('/delete')
  async deleteOne(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.deleteOne(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }
}
