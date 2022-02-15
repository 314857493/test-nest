import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { CatDto } from './cat.dto';
import { CatsService } from './cats.service';

interface response {
  code: number;
  data: any;
  message: string;
}

// 请求接口为/api/cats
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // get 通过query中的name进行查找，name没有的时候查找全量数据
  @Get()
  find(@Query('name') name?: string): response {
    const result = this.catsService.find(name);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  @Get('error')
  @HttpCode(400)
  async error() {
    return {
      code: 400,
      data: 'something err',
      message: 'error',
    };
  }

  // get 通过param中的name进行查找 查找单独数据
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

  // post 通过CatDto进行接受 接受后生成
  @Post()
  async create(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.create(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  // post 通过/update来更新数据
  @Post('update')
  async updateOne(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.updateOne(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }

  // post 通过/delete来删除数据
  @Post('delete')
  async deleteOne(@Body() cat: CatDto): Promise<response> {
    const result = this.catsService.deleteOne(cat);
    return {
      code: 1,
      data: result,
      message: 'success',
    };
  }
}
