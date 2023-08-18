import bcrypt from "bcrypt";
import {Service} from "typedi";

export interface IEncryptor {
  hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>;

  compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}

@Service()
class Encryptor implements IEncryptor {
  private encryptor = bcrypt;

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return this.encryptor.compare(data, encrypted);
  }

  hash(data: string | Buffer, saltOrRounds: string | number): Promise<string> {
    return this.encryptor.hash(data, saltOrRounds);
  }
}

export default Encryptor;
