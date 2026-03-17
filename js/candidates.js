/**
 * Danh sách thí sinh - Được tạo từ Excel
 * Tổng số: 60 thí sinh
 */

const CANDIDATES_LIST = [
  { "name": "Nguyễn Thanh Trà", "password": "PXVH@01", "department": "PXVH" },
  { "name": "Trần Thanh Vĩ", "password": "PXVH@02", "department": "PXVH" },
  { "name": "Huỳnh Minh Hòa", "password": "PXVH@03", "department": "PXVH" },
  { "name": "Phan Văn Nghĩa", "password": "PXVH@04", "department": "PXVH" },
  { "name": "Nguyễn Xuân Cường", "password": "PXVH@05", "department": "PXVH" },
  { "name": "Nguyễn Thiện Thế", "password": "PXVH@06", "department": "PXVH" },
  { "name": "Vũ Nguyên Sỹ", "password": "PXVH@07", "department": "PXVH" },
  { "name": "Vũ Văn Ngọc", "password": "PXVH@08", "department": "PXVH" },
  { "name": "Trần Văn Nghĩa", "password": "PXVH@09", "department": "PXVH" },
  { "name": "Nguyễn Văn Hiển", "password": "PXVH@10", "department": "PXVH" },
  { "name": "Lê Văn Lương", "password": "PXVH@11", "department": "PXVH" },
  { "name": "Nguyễn Mạnh Cường", "password": "PXVH@12", "department": "PXVH" },
  { "name": "Đinh Đình Nhẫn", "password": "PXVH@13", "department": "PXVH" },
  { "name": "Nguyễn Xuân Thắng", "password": "PXVH@14", "department": "PXVH" },
  { "name": "Nguyễn Trung Nghĩa", "password": "PXVH@15", "department": "PXVH" },
  { "name": "Vũ Văn Bảo", "password": "PXVH@16", "department": "PXVH" },
  { "name": "Đặng Văn Trình", "password": "PXVH@17", "department": "PXVH" },
  { "name": "Nguyễn Xuân Đại", "password": "PXVH@18", "department": "PXVH" },
  { "name": "Nguyễn Đức Khang", "password": "PXVH@19", "department": "PXVH" },
  { "name": "Dương Hoàng Phong", "password": "PXVH@20", "department": "PXVH" },
  { "name": "Lê Tuấn Nguyễn Tuấn", "password": "PXVH@21", "department": "PXVH" },
  { "name": "Trần Ngọc Chiến", "password": "PXVH@22", "department": "PXVH" },
  { "name": "Trương Hoàng Phúc", "password": "PXVH@23", "department": "PXVH" },
  { "name": "Nguyễn Bá Lâm", "password": "PXVH@24", "department": "PXVH" },
  { "name": "Chu Văn Hạnh", "password": "PXVH@25", "department": "PXVH" },
  { "name": "Đỗ Văn Định", "password": "PXVH@26", "department": "PXVH" },
  { "name": "Phạm Trọng Hùng", "password": "PXVH@27", "department": "PXVH" },
  { "name": "Lê Anh Duy", "password": "PXVH@28", "department": "PXVH" },
  { "name": "Lê Đình Hoàng", "password": "PXVH@29", "department": "PXVH" },
  { "name": "Hoàng Ngọc Bích", "password": "PXVH@30", "department": "PXVH" },
  { "name": "Hoàng Ngọc Sơn", "password": "PXVH@31", "department": "PXVH" },
  { "name": "Lê Đình Hào", "password": "PXVH@32", "department": "PXVH" },
  { "name": "Lê Quang Hải", "password": "PXVH@33", "department": "PXVH" },
  { "name": "Nguyễn Viết Lãm", "password": "PXVH@34", "department": "PXVH" },
  { "name": "Điểu Anh Giăng", "password": "PXVH@35", "department": "PXVH" },
  { "name": "Phan Tấn Đạt", "password": "PXVH@36", "department": "PXVH" },
  { "name": "Lê Mạnh Dũng", "password": "PXVH@37", "department": "PXVH" },
  { "name": "Nguyễn Ngọc Hiến", "password": "PXVH@38", "department": "PXVH" },
  { "name": "Nguyễn Thế Anh", "password": "PXVH@39", "department": "PXVH" },
  { "name": "Hoàng Sỹ Quý", "password": "PXSC@40", "department": "PXSC" },
  { "name": "Phạm Năm", "password": "PXSC@41", "department": "PXSC" },
  { "name": "Nguyễn Trọng Long", "password": "PXSC@42", "department": "PXSC" },
  { "name": "Hồ Văn Bang", "password": "PXSC@43", "department": "PXSC" },
  { "name": "Võ Trúc Sơn", "password": "PXSC@44", "department": "PXSC" },
  { "name": "Nguyễn Mạnh Linh", "password": "PXSC@45", "department": "PXSC" },
  { "name": "Đậu Minh Sáng", "password": "PXSC@46", "department": "PXSC" },
  { "name": "Nguyễn Văn Dũng", "password": "PXSC@47", "department": "PXSC" },
  { "name": "Hồ Đình Thêm", "password": "PXSC@48", "department": "PXSC" },
  { "name": "Phạm Văn Ninh", "password": "PXSC@49", "department": "PXSC" },
  { "name": "Trịnh Công Sơn", "password": "PXSC@50", "department": "PXSC" },
  { "name": "Hồ Tiếng Đồng", "password": "PXSC@51", "department": "PXSC" },
  { "name": "Trần Minh Đức", "password": "PXSC@52", "department": "PXSC" },
  { "name": "Đậu Văn Giáp", "password": "PXSC@53", "department": "PXSC" },
  { "name": "Lê Minh Đạo", "password": "PXSC@54", "department": "PXSC" },
  { "name": "Phạm Văn Thắng", "password": "PXSC@55", "department": "PXSC" },
  { "name": "Nguyễn Thành Nhân", "password": "PXSC@56", "department": "PXSC" },
  { "name": "Nguyễn Thanh Tú", "password": "PXSC@57", "department": "PXSC" },
  { "name": "Trần Công Toán", "password": "PXSC@58", "department": "PXSC" },
  { "name": "Trần Văn Khánh", "password": "PXSC@59", "department": "PXSC" },
  { "name": "Nguyễn Công Cường", "password": "PXSC@60", "department": "PXSC" }
];

function validateCandidate(name, password) {
  const candidate = CANDIDATES_LIST.find(c => c.name === name);
  if (!candidate) return { valid: false, error: 'Không tìm thấy thí sinh' };
  if (candidate.password !== password) return { valid: false, error: 'Mật khẩu không đúng' };
  return { valid: true, department: candidate.department, name: candidate.name };
}

function getCandidateNames() {
  return CANDIDATES_LIST.map(c => c.name);
}
