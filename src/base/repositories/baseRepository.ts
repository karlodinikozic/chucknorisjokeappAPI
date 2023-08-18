// repositories/BaseRepository.ts
import {Model, ModelStatic, WhereOptions} from "sequelize";
import {MakeNullishOptional} from "sequelize/types/utils";
import IBaseRepository from "./types";

export abstract class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected model: ModelStatic<T>;

  protected constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findOneByValue(obj: WhereOptions): Promise<T | null> {
    console.log(obj);
    return await this.model.findOne({ where: obj });
  }
  async findOneById(id: string) {
    const whereOptions: WhereOptions = { id } as WhereOptions;
    return await this.model.findOne({ where: whereOptions });
  }

  async create(
    obj: MakeNullishOptional<T["_creationAttributes"]> | undefined,
  ): Promise<T | null> {
    return this.model.create(obj);
  }

  async deleteByValue(obj: WhereOptions, forceDelete: boolean = false): Promise<number> {
    return this.model.destroy({ where: obj , force: forceDelete});
  }
  async deleteById(id: string, forceDelete: boolean  = false): Promise<number> {
    const whereOptions: WhereOptions = { id } as WhereOptions;
    return this.model.destroy({ where: whereOptions ,force: forceDelete});
  }
}
