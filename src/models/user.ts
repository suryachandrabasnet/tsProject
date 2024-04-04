import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelizeConnection";

enum UserRole {
  User = 'user',
  Admin = 'admin'
}

class User extends Model {
  public id!: number;
  public uuid!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: number;
  public password!: string;
  public role!: UserRole;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(UserRole.User, UserRole.Admin),
      allowNull: false,
      defaultValue: UserRole.User,
      validate: {
        isIn: {
          args: [Object.values(UserRole)],
          msg: "Invalid role. Allowed roles are 'user' and 'admin'."
        }
      }
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  }
);

export default User;
