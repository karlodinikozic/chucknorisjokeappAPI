import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";
import { sequelize } from "../../database/config";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataType.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    modelName: "User",
    timestamps: true,
    paranoid: true, // Best Field name 😂  - Enables softDelete
    underscored: true,
  },
);
export { User };
