import * as bcrypt from "bcrypt";

import { Admin } from "../../models/admin.model";
import { AdminToken } from "../../models/admin_token.model";
import { configSource } from "../../db/config";
import { generateToken } from "../../utils/jwt.util";
import {
  HttpExceptionNotFound,
  HttpExceptionBadRequest,
} from "../../errors/handler.error";

export class AdminService {
  private adminModel = configSource.getRepository(Admin);
  private adminTokenModel = configSource.getRepository(AdminToken);

  public async getAdmins(): Promise<Admin[]> {
    return await this.adminModel.find({ select: ["id", "username"] });
  }

  public async createAdmin(admin: {
    username: string;
    password: string;
  }): Promise<Admin> {
    const checkUsername = await this.adminModel.findOne({
      where: {
        username: admin.username,
      },
    });

    if (checkUsername) {
      throw new HttpExceptionBadRequest("Username already exists");
    }

    const hashPassword = await bcrypt.hash(admin.password, 10);

    return await this.adminModel.save({
      username: admin.username,
      password: hashPassword,
    });
  }

  public async loginAdmin(admin: {
    username: string;
    password: string;
  }): Promise<string> {
    const checkUsername = await this.adminModel.findOne({
      where: {
        username: admin.username,
      },
    });

    if (!checkUsername) {
      throw new HttpExceptionNotFound("Username not found");
    }

    const checkPassword = await bcrypt.compare(
      admin.password,
      checkUsername.password.toString()
    );

    if (!checkPassword) {
      throw new HttpExceptionBadRequest("Password is incorrect");
    }

    const token = generateToken(
      {
        id: checkUsername.id,
        username: checkUsername.username,
      },
      "1d"
    );

    await this.adminTokenModel.save({
      id_admin: checkUsername.id,
      token: token,
      expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return token;
  }
}
