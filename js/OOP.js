


// var arrNhanVien = [];
// var kiemTraDuLieu = new Validation();
// document.querySelector('#btnThemNhanVien').onclick = function (event) {
//     event.preventDefault(); //Chặn sự kiện reload browser
//     {
//     var nhanVien = new NhanVien();
//     //Bước 1 Lấy thông tin người dùng nhập vào từ giao diện
//     nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
//     nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
//     nhanVien.
//     console.log('NhanVien', NhanVien);
//     //Bước 2: Tính điểm trung bình xếp loại
//     var diemTB = NhanVien.tinhDiemTrungBinh();
//     var xepLoaiSV = NhanVien.xepLoai();
//     //Bước 3: Hiển thị dữ liệu lên giao diện
//     document.querySelector('#txtMaNhanVien').innerHTML = NhanVien.maNhanVien;
//     document.querySelector('#txtTenNhanVien').innerHTML = NhanVien.tenNhanVien;
//     document.querySelector('#txtLoaiNhanVien').innerHTML = NhanVien.loaiNhanVien;
//     document.querySelector('#txtDiemTrungBinh').innerHTML = diemTB.toFixed(2);
//     document.querySelector('#txtXepLoai').innerHTML = xepLoaiSV;
//     }

//     //-----------------------------------Validation-------------------------------------

//     var valid = true; //.trim(): loại bỏ khoảng trống đầu và cuối của chuỗi
//     valid &= kiemTraDuLieu.kiemTraRong(NhanVien.maNhanVien,'#error_required_maNhanVien','Mã sinh viên') & kiemTraDuLieu.kiemTraRong(NhanVien.tenNhanVien,'#error_required_tenNhanVien','Tên sinh viên') & kiemTraDuLieu.kiemTraRong(NhanVien.email,'#error_required_email','Email') & kiemTraDuLieu.kiemTraRong(NhanVien.soDienThoai,'#error_required_soDienThoai','Số điện thoại') & kiemTraDuLieu.kiemTraRong(NhanVien.diemToan,'#error_required_diemToan','Điểm toán') &  kiemTraDuLieu.kiemTraRong(NhanVien.diemLy,'#error_required_diemLy','Điểm lý') &  kiemTraDuLieu.kiemTraRong(NhanVien.diemHoa,'#error_required_diemHoa','Điểm hoá') &  kiemTraDuLieu.kiemTraRong(NhanVien.diemRenLuyen,'#error_required_renLuyen','Điểm rèn luyện') ;

//     if(!valid) {
//         return;
//     }






//     //Thêm dữ liệu sinh viên vào mảng
//     arrNhanVien.push(NhanVien);
//     console.log('arrNhanVien', arrNhanVien);
//     //Tạo ra giao diện cho table bên dưới
//     //Gọi hàm tạo bảng từ mảng sinh viên
//     renderTableNhanVien(arrNhanVien); // đối số truyền vào hàm

//     //Gọi hàm lưu dữ liệu sinh viên vào localstorage
//     luuStorage();

// }

// function renderTableNhanVien(arrSV) { //input
//     //Từ mảng 
//     //arrSV = [{maNhanVien:1,tenNhanVien:'Nguyễn văn A},{maNhanVien:2,tenNhanVien:'Nguyễn văn B},{maNhanVien:3,tenNhanVien:'Nguyễn văn c}]
//     //Tạo thành 1 chuỗi <tr><td></td></tr>
//     var content = '';
//     for (var index = 0; index < arrSV.length; index++) {

//         var sv = arrNhanVien[index];
//         //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
//         var NhanVien = new NhanVien(sv.maNhanVien, sv.tenNhanVien, sv.diemRenLuyen, sv.loaiNhanVien, sv.diemToan, sv.diemLy, sv.diemHoa, sv.email, sv.soDienThoai);

//         //Từ đối tượng sinh viên => tạo ra thẻ tr
//         var trNhanVien = `
//                         <tr>
//                             <td>${NhanVien.maNhanVien}</td>
//                             <td>${NhanVien.tenNhanVien}</td>
//                             <td>${NhanVien.loaiNhanVien}</td>
//                             <td>${NhanVien.tinhDiemTrungBinh()}</td>
//                             <td>${NhanVien.diemRenLuyen}</td>
//                             <td>
//                             <button class="btn btn-danger" onclick="xoaNhanVien('${NhanVien.maNhanVien}')" >Xoá
//                             </button>
//                             <button class="btn btn-primary" onclick="suaThongTin('${NhanVien.maNhanVien}')" >chỉnh sửa
//                             </button>
//                             </td>
//                         </tr>
//         `;
//         content += trNhanVien;
//     }
//     //Dom đến thẻ tblNhanVien chèn chuỗi content vào innerHTML
//     document.querySelector('#tblNhanVien').innerHTML = content;
// }


// //Định nghĩa sự kiện cho nút xoá
// function xoaNhanVien(maSVClick) { //2
//     //0                                         1                                       2
//     //arrSV = [{maNhanVien:1,tenNhanVien:'Nguyễn văn A},{maNhanVien:2,tenNhanVien:'Nguyễn văn B},{maNhanVien:3,tenNhanVien:'Nguyễn văn c}]

//     for (var i = arrNhanVien.length - 1; i >= 0; i--) {
//         //Tìm sinh viên được click trong mảng 
//         var sv = arrNhanVien[i];
//         if (sv.maNhanVien === maSVClick) {
//             //Tìm thấy
//             arrNhanVien.splice(i, 1); // Xử lý xoá  [1,2,3,4] splice(index_vị_trí_xoá,số lượng phần tử xoá từ index trở)

//         }
//     }
//     //Gọi hàm tạo table sinh viên
//     renderTableNhanVien(arrNhanVien);
//     luuStorage();
// }


// function suaThongTin(maSVClick) {

//     document.querySelector('#btnXacNhan').disabled = true;
//     document.querySelector('#btnLuuThongTin').disabled = false;
//     document.querySelector('#maNhanVien').disabled = true;
//     console.log('maSVClick', maSVClick);
//     //Tìm sinh viên trong mảng dựa vào mã sinh viên
//     for (var index = 0; index < arrNhanVien.length; index++) {
//         //Mỗi lần duyệt lấy ra 1 sinh viên
//         var NhanVien = arrNhanVien[index];
//         if (NhanVien.maNhanVien === maSVClick) {
//             //Tìm ra được sinh viên
//             document.querySelector('#maNhanVien').value = NhanVien.maNhanVien;
//             document.querySelector('#tenNhanVien').value = NhanVien.tenNhanVien;
//             document.querySelector('#email').value = NhanVien.email;
//             document.querySelector('#soDienThoai').value = NhanVien.soDienThoai;
//             document.querySelector('#loaiNhanVien').value = NhanVien.loaiNhanVien;
//             document.querySelector('#diemToan').value = NhanVien.diemToan;
//             document.querySelector('#diemLy').value = NhanVien.diemLy;
//             document.querySelector('#diemHoa').value = NhanVien.diemHoa;
//             document.querySelector('#diemRenLuyen').value = NhanVien.diemRenLuyen;
//         }
//     }
// }



// function luuStorage() {

//     //Trước khi lưu vào localstorage => chuyển dữ liệu cần lưu thành chuỗi
//     var sMangNhanVien = JSON.stringify(arrNhanVien);

//     //Lưu vào localstorage
//     localStorage.setItem('arrNhanVien', sMangNhanVien);

// }


// function layStorage() {

//     //Kiểm tra xem có storage đó hay k
//     if (localStorage.getItem('arrNhanVien')) {
//         var sMangNhanVien = localStorage.getItem('arrNhanVien');
//         arrNhanVien = JSON.parse(sMangNhanVien); // => Chuyển chuỗi lấy từ localstorage ra biến thành mảng gán vào biến arrNhanVien
//         //Gọi hàm tạo dữ liệu table lên giao diện
//         renderTableNhanVien(arrNhanVien);
//     }
// }
// //Gọi sau khi giao diện load

// layStorage();



// document.querySelector('#btnLuuThongTin').onclick = function () {
//     var NhanVienCapNhat = new NhanVien();
//     NhanVienCapNhat.maNhanVien = document.querySelector('#maNhanVien').value;
//     NhanVienCapNhat.tenNhanVien = document.querySelector('#tenNhanVien').value;
//     NhanVienCapNhat.loaiNhanVien = document.querySelector('#loaiNhanVien').value;
//     NhanVienCapNhat.diemToan = document.querySelector('#diemToan').value;
//     NhanVienCapNhat.diemLy = document.querySelector('#diemLy').value;
//     NhanVienCapNhat.diemHoa = document.querySelector('#diemHoa').value;
//     NhanVienCapNhat.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
//     NhanVienCapNhat.email = document.querySelector('#email').value;
//     NhanVienCapNhat.soDienThoai = document.querySelector('#soDienThoai').value;

//     console.log('svCapNhat', NhanVienCapNhat);

//     //tìm ra sinh viên trong mảng
//     for (var index = 0; index < arrNhanVien.length; index++) {
//         var NhanVien = arrNhanVien[index];
//         if (NhanVien.maNhanVien === NhanVienCapNhat.maNhanVien) {
//             //Cập nhật lại các giá trị sinh viên trong mảng từ dữ liệu sinh viên lấy từ input người dùng
//             NhanVien.tenNhanVien = NhanVienCapNhat.tenNhanVien;
//             NhanVien.loaiNhanVien = NhanVienCapNhat.loaiNhanVien;
//             NhanVien.diemToan = NhanVienCapNhat.diemToan;
//             NhanVien.diemLy = NhanVienCapNhat.diemLy;
//             NhanVien.diemHoa = NhanVienCapNhat.diemHoa;
//             NhanVien.diemRenLuyen = NhanVienCapNhat.diemRenLuyen;
//             NhanVien.loaiNhanVien = NhanVienCapNhat.loaiNhanVien;
//             NhanVien.email = NhanVienCapNhat.email;
//             NhanVien.soDienThoai = NhanVienCapNhat.soDienThoai;

//         }
//     }
//     //Sau khi cập nhật xong => Lưu vào localstorage và gọi hàm tạo lại table mới
//     luuStorage();
//     renderTableNhanVien(arrNhanVien);

//     //Mở lại các nút
//     document.querySelector('#btnLuuThongTin').disabled = true;
//     document.querySelector('#btnXacNhan').disabled = false;
//     document.querySelector('#maNhanVien').disabled = false;
// }