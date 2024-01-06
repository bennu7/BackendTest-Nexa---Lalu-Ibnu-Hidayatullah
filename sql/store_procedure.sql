DELIMITER //
CREATE PROCEDURE sp_add_kary_laluibnu(
    IN p_nip VARCHAR(20),
    IN p_nama VARCHAR(50),
    IN p_alamat VARCHAR(100),
    IN p_gend VARCHAR(1),
    IN p_photo VARCHAR(100),
    IN p_tgl_lahir DATE,
    IN p_status VARCHAR(1),
    IN p_insert_by VARCHAR(50),
    IN p_api VARCHAR(100)
)
BEGIN
    DECLARE success TINYINT DEFAULT 1;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
        VALUES (p_insert_by, p_api, CONCAT('nip=', p_nip, '&nama=', p_nama, '&alamat=', p_alamat, '&gend=', p_gend, '&photo=', p_photo, '&tgl_lahir=', p_tgl_lahir, '&status=', p_status, '&insert_by=', p_insert_by), 'error', NOW());
    END;

    START TRANSACTION;

    IF (SELECT EXISTS (SELECT 1 FROM karyawan WHERE nip = p_nip)) THEN
        SET success = 0;
    ELSE
        INSERT INTO karyawan(nip, nama, alamat, gend, photo, tgl_lahir, status, update_by)
        VALUES (p_nip, p_nama, p_alamat, p_gend, p_photo, p_tgl_lahir, p_status, p_insert_by);
    END IF;

    IF success THEN
        COMMIT;
        INSERT INTO log_trx_api (user_id, api, request, response, insert_at)
        VALUES (p_insert_by, p_api, CONCAT('nip=', p_nip, '&nama=', p_nama, '&alamat=', p_alamat, '&gend=', p_gend, '&photo=', p_photo, '&tgl_lahir=', p_tgl_lahir, '&status=', p_status, '&insert_by=', p_insert_by), 'success', NOW());
    ELSE
        ROLLBACK;
    END IF;
END //
DELIMITER ;

call sp_add_kary_laluibnu('2024010101', 'ibnu biasa', 'jl. raya', 'L', 'photo.jpg', '1990-01-01', '1', 'laluibnu', '/api/karyawan');



