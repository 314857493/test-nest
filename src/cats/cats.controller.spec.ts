import { Test, TestingModule } from '@nestjs/testing';
import { CatDto } from './cat.dto';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('cat should be create', async () => {
    expect.assertions(1);
    const response = await controller.create({ name: 'cat', age: 12 });
    const schema = {
      code: 1,
      data: {
        name: 'cat',
        age: 12,
      },
      message: 'success',
    };
    await expect(response).toEqual(schema);
  });

  it('cats should be find', async () => {
    expect.assertions(2);
    await controller.create({ name: 'cat', age: 12 });
    await controller.create({ name: 'cat2', age: 12 });
    const response = await controller.find();
    const schema = {
      code: 1,
      data: [
        {
          name: 'cat',
          age: 12,
          id: expect.any(Number),
          createAt: expect.any(String),
        },
        {
          name: 'cat2',
          age: 12,
          id: expect.any(Number),
          createAt: expect.any(String),
        },
      ],
      message: 'success',
    };
    await expect(response).toEqual(schema);
    const oneResponse = await controller.find('cat2');
    const oneSchema = {
      code: 1,
      data: [
        {
          name: 'cat2',
          age: 12,
          id: expect.any(Number),
          createAt: expect.any(String),
        },
      ],
      message: 'success',
    };
    await expect(oneResponse).toEqual(oneSchema);
  });

  it('cat should be find', async () => {
    expect.assertions(1);
    await controller.create({ name: 'cat', age: 12 });
    const response = await controller.findOne('cat');
    const schema = {
      code: 1,
      data: {
        name: 'cat',
        age: 12,
        id: expect.any(Number),
        createAt: expect.any(String),
      },
      message: 'success',
    };
    await expect(response).toEqual(schema);
  });

  it('cat should be create and delete', async () => {
    expect.assertions(2);
    await controller.create({ name: 'cat', age: 12 });
    const findResponse = await controller.findOne('cat').data;
    const findSchema = {
      name: 'cat',
      age: 12,
      id: expect.any(Number),
      createAt: expect.any(String),
    };
    await expect(findResponse).toEqual(findSchema);
    const deleteData = { id: findResponse.id } as CatDto;
    const deleteResponse = await controller.deleteOne(deleteData);
    const deleteSchema = {
      code: 1,
      data: true,
      message: 'success',
    };
    await expect(deleteResponse).toEqual(deleteSchema);
  });

  it('cat should be create and update', async () => {
    expect.assertions(2);
    await controller.create({ name: 'cat', age: 12 });
    const findResponse = await controller.findOne('cat').data;
    const findSchema = {
      name: 'cat',
      age: 12,
      id: expect.any(Number),
      createAt: expect.any(String),
    };
    await expect(findResponse).toEqual(findSchema);
    const updateData = {
      id: findResponse.id,
      name: 'cataaa',
      age: 13,
    } as CatDto;
    const updateResponse = await controller.updateOne(updateData);
    const updateSchema = {
      code: 1,
      data: {
        id: updateData.id,
        name: updateData.name,
        age: updateData.age,
        createAt: findResponse.createAt,
      },
      message: 'success',
    };
    await expect(updateResponse).toEqual(updateSchema);
  });
});
