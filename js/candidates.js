/**
 * Danh sách thí sinh - Được tạo từ Excel
 * Tổng số: 40 thí sinh
 */

const CANDIDATES_LIST = [
  {
    "name": "Trương Hoàng Phúc",
    "birthDate": "01/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Trần Thanh Vĩ",
    "birthDate": "02/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Vũ Nguyên Sỹ",
    "birthDate": "03/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Xuân Cường",
    "birthDate": "04/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Tuấn Nguyễn Tuấn",
    "birthDate": "05/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Trần Văn Nghĩa",
    "birthDate": "06/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Phạm Trọng Hùng",
    "birthDate": "07/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Vũ Văn Bảo",
    "birthDate": "08/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Đình Hoàng",
    "birthDate": "09/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Điểu Anh Giăng",
    "birthDate": "10/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Ngọc Hiến",
    "birthDate": "11/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Đinh Thanh Tùng",
    "birthDate": "12/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Doãn Thế Anh",
    "birthDate": "13/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Thái Phương",
    "birthDate": "14/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Văn Lương",
    "birthDate": "15/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Đinh Đình Nhẫn",
    "birthDate": "16/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Hoàng Ngọc Sơn",
    "birthDate": "17/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Dương Hoàng Phong",
    "birthDate": "18/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Mạch Duy Đức",
    "birthDate": "19/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Phan Tấn Đạt",
    "birthDate": "20/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Vũ Văn Ngọc",
    "birthDate": "21/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Quang Hải",
    "birthDate": "22/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Đức Hùng",
    "birthDate": "23/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Xuân Đại",
    "birthDate": "24/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Trung Nghĩa",
    "birthDate": "25/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Đỗ Văn Định",
    "birthDate": "26/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Đặng Văn Trình",
    "birthDate": "27/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Lê Đình Hào",
    "birthDate": "28/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Mạnh Cường",
    "birthDate": "29/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Huỳnh Minh Hòa",
    "birthDate": "30/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Thanh Trà",
    "birthDate": "31/01/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Bá Lâm",
    "birthDate": "01/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Văn Hiển",
    "birthDate": "02/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Hoàng Ngọc Bích",
    "birthDate": "03/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Thiện Thế",
    "birthDate": "04/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Viết Lãm",
    "birthDate": "05/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Trần Ngọc Chiến",
    "birthDate": "06/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Chu Văn Hạnh",
    "birthDate": "07/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Phan Văn Nghĩa",
    "birthDate": "08/02/1990",
    "department": "PXVH"
  },
  {
    "name": "Nguyễn Xuân Thắng",
    "birthDate": "09/02/1990",
    "department": "PXVH"
  }
];

function validateCandidate(name, birthDate) {
    const candidate = CANDIDATES_LIST.find(c => c.name === name);
    if (!candidate) return { valid: false, error: 'Không tìm thấy thí sinh' };
    if (candidate.birthDate !== birthDate) return { valid: false, error: 'Ngày sinh không đúng' };
    return { valid: true, department: candidate.department, name: candidate.name };
}

function getCandidateNames() {
    return CANDIDATES_LIST.map(c => c.name);
}
