function NhanVien(manv, tennv, chucvu, hesochucvu, luongcoban, sogiolam) {
    this.maNhanVien = manv;
    this.tenNhanVien = tennv;
    this.chucVu = chucvu;
    this.heSoChucVu = hesochucvu;
    this.luongCoBan = luongcoban;
    this.soGioLamTrongThang = sogiolam;

    this.tinhLuong = function () { //input diemToan,diemLy,diemHoa
        //this trong đối tượng hoặc lớp đối tượng thì => trỏ về đối tượng hoặc lớp đối tượng đó
        var luong = Number(this.heSoChucVu) * this.luongCoBan;
        return luong;
    };
    this.xepLoai = function () {
        var gioLam = Number(this.soGioLamTrongThang);
        var xepLoai = '';
        if (gioLam > 120) {
            xepLoai = 'Nhân viên xuất sắc';
        } else if (gioLam > 100) {
            xepLoai = 'Nhân viên giỏi';
        } else if (gioLam > 80) {
            xepLoai = 'Nhân viên khá';
        } else if (gioLam > 50) {
            xepLoai = 'Nhân viên trung bình';
        } else {
            xepLoai = 'Không xác định';
        }
        return xepLoai;

    }
}