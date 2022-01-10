import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push({
      ...cat,
      createAt: new Date().toDateString(),
      id: +new Date(),
    });
    return cat;
  }

  find(name?: string): Cat[] {
    if (name) {
      return this.cats.filter((item) => item.name === name);
    }
    return this.cats;
  }

  findOne(cat: Cat): Cat {
    const result = this.cats.find((item) => (item.name = cat.name));
    return result;
  }

  updateOne(cat: Cat): Cat {
    const result = this.cats.find((item) => {
      if (item.id == cat.id) {
        item.name = cat.name;
        item.age = cat.age;
      }
      return item.id == cat.id;
    });
    return result;
  }

  deleteOne(cat: Cat): boolean {
    const index = this.cats.findIndex((item) => item.id == cat.id);
    this.cats.splice(index, 1);
    return true;
  }
}
