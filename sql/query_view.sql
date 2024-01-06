CREATE VIEW karyawan_laluibnu AS
    SELECT nip, nama, alamat,  gend,  tgl_lahir 
    FROM karyawan
    WHERE nama LIKE '%ibnu%';

SELECT * from karyawan_laluibnu;

DROP VIEW IF EXISTS karyawan_laluibnu;

