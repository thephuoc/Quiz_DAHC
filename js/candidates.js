/**
 * Danh sách thí sinh - Được tạo từ Excel
 * Tổng số: 40 thí sinh
 */

const CANDIDATES_LIST = [
  {
    "name": "Trương Hoàng Phúc",
    "password": "PXVH@01",
    "department": "PXVH"
  },
  {
    "name": "Trần Thanh Vĩ",
    "password": "PXVH@02",
    "department": "PXVH"
  },
  {
    "name": "Vũ Nguyên Sỹ",
    "password": "PXVH@03",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Xuân Cường",
    "password": "PXVH@04",
    "department": "PXVH"
  },
  {
    "name": "Lê Tuấn Nguyễn Tuấn",
    "password": "PXVH@05",
    "department": "PXVH"
  },
  {
    "name": "Trần Văn Nghĩa",
    "password": "PXVH@06",
    "department": "PXVH"
  },
  {
    "name": "Phạm Trọng Hùng",
    "password": "PXVH@07",
    "department": "PXVH"
  },
  {
    "name": "Vũ Văn Bảo",
    "password": "PXVH@08",
    "department": "PXVH"
  },
  {
    "name": "Lê Đình Hoàng",
    "password": "PXVH@09",
    "department": "PXVH"
  },
  {
    "name": "Điểu Anh Giăng",
    "password": "PXVH@10",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Ngọc Hiến",
    "password": "PXVH@11",
    "department": "PXVH"
  },
  {
    "name": "Đinh Thanh Tùng",
    "password": "PXVH@12",
    "department": "PXVH"
  },
  {
    "name": "Doãn Thế Anh",
    "password": "PXVH@13",
    "department": "PXVH"
  },
  {
    "name": "Lê Thái Phương",
    "password": "PXVH@14",
    "department": "PXVH"
  },
  {
    "name": "Lê Văn Lương",
    "password": "PXVH@15",
    "department": "PXVH"
  },
  {
    "name": "Đinh Đình Nhẫn",
    "password": "PXVH@16",
    "department": "PXVH"
  },
  {
    "name": "Hoàng Ngọc Sơn",
    "password": "PXVH@17",
    "department": "PXVH"
  },
  {
    "name": "Dương Hoàng Phong",
    "password": "PXVH@18",
    "department": "PXVH"
  },
  {
    "name": "Mạch Duy Đức",
    "password": "PXVH@19",
    "department": "PXVH"
  },
  {
    "name": "Phan Tấn Đạt",
    "password": "PXVH@20",
    "department": "PXVH"
  },
  {
    "name": "Vũ Văn Ngọc",
    "password": "PXVH@21",
    "department": "PXVH"
  },
  {
    "name": "Lê Quang Hải",
    "password": "PXVH@22",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Đức Hùng",
    "password": "PXSC@23",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Xuân Đại",
    "password": "PXSC@24",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Trung Nghĩa",
    "password": "PXSC@25",
    "department": "PXSC"
  },
  {
    "name": "Đỗ Văn Định",
    "password": "PXSC@26",
    "department": "PXSC"
  },
  {
    "name": "Đặng Văn Trình",
    "password": "PXSC@27",
    "department": "PXSC"
  },
  {
    "name": "Lê Đình Hào",
    "password": "PXSC@28",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Mạnh Cường",
    "password": "PXSC@29",
    "department": "PXSC"
  },
  {
    "name": "Huỳnh Minh Hòa",
    "password": "PXSC@30",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Thanh Trà",
    "password": "PXSC@31",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Bá Lâm",
    "password": "PXSC@32",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Văn Hiển",
    "password": "PXSC@33",
    "department": "PXSC"
  },
  {
    "name": "Hoàng Ngọc Bích",
    "password": "PXSC@34",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Thiện Thế",
    "password": "PXSC@35",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Viết Lãm",
    "password": "PXSC@36",
    "department": "PXSC"
  },
  {
    "name": "Trần Ngọc Chiến",
    "password": "PXSC@37",
    "department": "PXSC"
  },
  {
    "name": "Chu Văn Hạnh",
    "password": "PXSC@38",
    "department": "PXSC"
  },
  {
    "name": "Phan Văn Nghĩa",
    "password": "PXSC@39",
    "department": "PXSC"
  },
  {
    "name": "Nguyễn Xuân Thắng",
    "password": "PXSC@40",
    "department": "PXSC"
  }
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
