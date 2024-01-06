import { Like } from "typeorm";
import { Karyawan } from "../../models/karyawan.model";
import { configSource } from "../../db/config";
import { HttpExceptionNotFound } from "../../errors/handler.error";

export class KaryawanService {
  private karyawanModel = configSource.getRepository(Karyawan);

  public async getKaryawan(
    search: string,
    page: number,
    pageSize: number,
    sort_by: "ASC" | "DESC"
  ): Promise<{
    data: Karyawan[];
    count: number;
    currentPage: number;
    totalPage: number;
  }> {
    const take = pageSize;
    const skip = (page - 1) * pageSize;

    const [data, count] = await this.karyawanModel.findAndCount({
      select: ["id", "nama", "alamat", "nip", "photo"],
      where: [
        {
          nama: Like(`%${search}%`),
        },
      ],
      take,
      skip,
      order: {
        insert_at: sort_by,
      },
    });

    const currentPage = page;
    const totalPage = Math.ceil(count / pageSize);

    return { data, count, currentPage, totalPage };
  }

  public async createKaryawan(karyawan: {
    nip: string;
    nama: string;
    alamat: string;
    photo: string;
    gend: "L" | "P";
    tgl_lahir: Date;
    username_admin: string;
  }) {
    const getLastDataKaryawan = await this.karyawanModel.find({
      order: {
        insert_at: "DESC",
      },
      take: 1,
      select: ["id", "nip"],
    });

    const getNumberLastNip = parseInt(getLastDataKaryawan[0].nip.slice(4)) + 2;
    const nip = `${new Date().getFullYear()}${getNumberLastNip}`;

    return await this.karyawanModel.save({
      nip,
      nama: karyawan.nama,
      alamat: karyawan.alamat,
      photo: karyawan.photo,
      gend: karyawan.gend,
      tgl_lahir: new Date(karyawan.tgl_lahir),
      update_by: karyawan.username_admin,
      id: getLastDataKaryawan[0].id + 1,
    });
  }

  public async updateKaryawan(
    karyawan: {
      nama: string;
      alamat: string;
      photo: string;
      gend: "L" | "P";
      tgl_lahir: Date;
      username_admin: string;
    },
    nip: string
  ) {
    const checkNip = await this.karyawanModel.findOne({
      where: {
        nip,
      },
    });

    if (!checkNip) {
      throw new HttpExceptionNotFound("Karyawan tidak ditemukan".toUpperCase());
    }

    if (karyawan.photo !== "") {
      await this.karyawanModel.update({ nip }, { photo: karyawan.photo });
    }

    return await this.karyawanModel.update(
      { nip },
      {
        nama: karyawan.nama,
        alamat: karyawan.alamat,
        gend: karyawan.gend,
        tgl_lahir: karyawan.tgl_lahir
          ? new Date(karyawan.tgl_lahir)
          : karyawan.tgl_lahir,
        update_by: karyawan.username_admin,
      }
    );
  }

  public async nonaktifKaryawan(
    username_admin: string,
    nip: string,
    status: number
  ): Promise<void> {
    const checkNip = await this.karyawanModel.findOne({
      where: {
        nip,
      },
    });

    if (!checkNip) {
      throw new HttpExceptionNotFound("Karyawan tidak ditemukan".toUpperCase());
    }

    await this.karyawanModel.update(
      { nip },
      {
        status,
        update_by: username_admin,
      }
    );
  }
}
