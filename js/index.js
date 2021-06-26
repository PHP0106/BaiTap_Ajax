const min_number = 4;
const max_number = 6;
const min_salary = 1000000;
const max_salary = 20000000;
const min_hour = 50;
const max_hour = 150;



var kiemTraDuLieu = new Validation();

function getNhanVienApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    });

    promise.then(function (result) {
        console.log(result.data);
        renderTableNhanVien(result.data);
    });

    promise.catch(function (errors) {
        console.log('errors', errors);
    })
}

getNhanVienApi();


function renderTableNhanVien(arrNV) {
    var content = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nv = arrNV[index];

        var nhanVien = new NhanVien(nv.maNhanVien, nv.tenNhanVien, nv.chucVu, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);
        var trNhanVien = `
                        <tr>
                            <td>${nhanVien.maNhanVien}</td>
                            <td>${nhanVien.tenNhanVien}</td>
                            <td>${nhanVien.chucVu}</td>
                            <td>${nhanVien.luongCoBan}</td>
                            <td>${nhanVien.tinhLuong()}</td>
                            <td>${nhanVien.soGioLamTrongThang}</td>
                            <td>${nhanVien.xepLoai()}</td>
                            <td><button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                            </td>
                            <td><button class="btn btn-primary" onclick="suaThongTin('${nhanVien.maNhanVien}')">Sửa
                            </button></td>
                            
                        </tr>`
            ;
        content += trNhanVien;
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}

document.querySelector('#btnThemNhanVien').onclick = function (event) {
    event.preventDefault();

    //Lấy thông tin người dùng nhập vào theo format data backend yêu cầu
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    nhanVien.heSoChucVu = tinhHeSoChucVu(nhanVien.chucVu);
    console.log('nhanVien', nhanVien);

    var valid = true; //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLam', 'Số giờ làm trong tháng');
    // (2): Kiểm tra định dạng
    // (2.1): Kiểm tra tất cả là ký tự (allLetter)

    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // (2.2): Kiểm tra tất cả là ký tự (allNumber)
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanVien.maNhanVien, '#error_allNumber_maNhanVien', 'Mã nhân viên') 
    & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản') 
    & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_allNumber_soGioLam', 'Số giờ làm trong tháng');



    // Kiểm tra giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_min_max_value_luongCoBan', min_salary, max_salary, 'Lương Cơ Bản')
    & kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_min_max_value_soGioLam', min_hour, max_hour, 'Số giờ làm trong tháng');

    //Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maNhanVien', min_number, max_number, 'Mã nhân viên');

    if(!valid) {
        return;
    }

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien', //Đường dẫn backend yêu cầu
        method: 'POST', //Phương thức backend yêu cầu
        data: nhanVien //Dữ liệu gửi đi phải đúng định dạng
    })
    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Load lại table từ api get layThongTinNhanVien
        getNhanVienApi();
    })

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error.reponse.data);
    })


}

function xoaNhanVien(maNhanVienClick) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE'
    });
    promise.then(function (result) {
        console.log('result', result.data);
        //Xoá thành công load lại table
        getNhanVienApi();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })

}

function suaThongTin(maNhanVien) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    });

    promise.then(function (result) {
        console.log(result.data);
        var nhanVien = result.data;
        //Load dữ liệu lên các input
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.chucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLam').value = nhanVien.soGioLamTrongThang;
    });

    promise.then(function (result) {
        console.log(result.data);
    })
    document.querySelector('#btnLuuThongTin').disabled = false;
    document.querySelector('#btnThemNhanVien').disabled = true;


}


document.querySelector('#btnLuuThongTin').onclick = function (event) {
    event.preventDefault();

    //Lấy thông tin người dùng sau khi sửa đổi trên giao diện
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.chucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLam').value;
    nhanVien.heSoChucVu = tinhHeSoChucVu(nhanVien.chucVu);
    
    var valid = true; //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương cơ bản') 
    & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLam', 'Số giờ làm trong tháng');
    // (2): Kiểm tra định dạng
    // (2.1): Kiểm tra tất cả là ký tự (allLetter)

    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên');
    // (2.2): Kiểm tra tất cả là ký tự (allNumber)
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanVien.maNhanVien, '#error_allNumber_maNhanVien', 'Mã nhân viên') 
    & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.luongCoBan, '#error_allNumber_luongCoBan', 'Lương cơ bản') 
    & kiemTraDuLieu.kiemTraTatCaSo(nhanVien.soGioLamTrongThang, '#error_allNumber_soGioLam', 'Số giờ làm trong tháng');



    // Kiểm tra giá trị
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_min_max_value_luongCoBan', min_salary, max_salary, 'Lương Cơ Bản')
    & kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_min_max_value_soGioLam', min_hour, max_hour, 'Số giờ làm trong tháng');

    //Kiểm tra độ dài
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_min_max_length_maNhanVien', min_number, max_number, 'Mã nhân viên');

    if(!valid) {
        return;
    }

    //Gọi api
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    });

    promise.then(function (result) {
        console.log('result', result.data);
        //Gọi lại api lấy danh sách load lại dữ liệu mới
        getNhanVienApi();
    })

    promise.catch(function (error) {
        console.log(error.response.data)
    })
    document.querySelector('#btnThemNhanVien').disabled = false;
    document.querySelector('#btnLuuThongTin').disabled = true;
    document.querySelector('#maNhanVien').value = null;
    document.querySelector('#tenNhanVien').value = null;
    document.querySelector('#chucVu').value = null;
    document.querySelector('#luongCoBan').value = null;
    document.querySelector('#soGioLam').value = null;

}






tinhHeSoChucVu = function (chucVu) {
    var heSo = '';
    if (chucVu === 'Giám đốc') {
        heSo = 3;
    } else if (chucVu === 'Quản lý') {
        heSo = 2;
    } else {
        heSo = 1;
    }
    return heSo;
}