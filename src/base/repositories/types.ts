import {Model, WhereOptions} from "sequelize";
import {MakeNullishOptional} from "sequelize/types/utils";

interface IBaseRepository<T extends Model> {
    findAll: () => Promise<T[]>;
    findOneByValue: (obj: WhereOptions) => Promise<T | null>;
    findOneById: (id: string) => Promise<T | null>;
    create: (obj: MakeNullishOptional<T["_creationAttributes"]> | undefined) => Promise<T | null>;
    deleteByValue: (obj: WhereOptions, forceDelete?: boolean) => Promise<number>
    deleteById: (id: string,forceDelete?: boolean) => Promise<number>

}

export default IBaseRepository;
