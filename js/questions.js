/**
 * Ngân hàng câu hỏi - Được tạo tự động từ Excel
 * Tổng số câu hỏi: 371
 * 
 * Phân loại:
 *   - ATD: 59 câu
 *   - NMD: 78 câu
 *   - PCCC: 64 câu
 *   - QT_ATD: 105 câu
 *   - TBA: 65 câu
 */

const QUESTION_BANK = [
  {
    "question": "Theo Luật PCCC & CNCH 2024, nhà máy thủy điện thuộc loại hình cơ sở nào sau đây",
    "options": [
      "Không thuộc diện quản lý PCCC",
      "Cơ sở nguy hiểm cháy, nổ",
      "Cơ sở có nguy hiểm cháy, nổ cao",
      "Cơ sở đặc biệt nguy hiểm cháy, nổ"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 1
  },
  {
    "question": "Người đứng đầu nhà máy thủy điện chịu trách nhiệm cao nhất về công tác PCCC & CNCH là:",
    "options": [
      "Trưởng ca vận hành",
      "Đội trưởng PCCC cơ sở",
      "Tổng giám đốc",
      "Cán bộ an toàn"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 2
  },
  {
    "question": "Lực lượng PCCC cơ sở tại nhà máy thủy điện do ai thành lập?",
    "options": [
      "Cơ quan Công an",
      "UBND cấp xã , phường",
      "Người đứng đầu cơ sở",
      "Ban quản lý dự án"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 3
  },
  {
    "question": "Nội dung nào không thuộc trách nhiệm của cơ sở theo Luật 2024?",
    "options": [
      "Tổ chức huấn luyện PCCC & CNCH",
      "Trang bị phương tiện PCCC",
      "Trực tiếp điều tra nguyên nhân cháy",
      "Xây dựng phương án chữa cháy"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 4
  },
  {
    "question": "Hồ sơ quản lý PCCC của nhà máy không bao gồm nội dung nào?",
    "options": [
      "Phương án chữa cháy, CNCH",
      "Biên bản huấn luyện PCCC",
      "Báo cáo tài chính nhà máy",
      "Nhật ký kiểm tra an toàn PCCC"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 5
  },
  {
    "question": "Theo Luật PCCC & CNCH 2024, nguyên tắc ưu tiên cao nhất khi xảy ra sự cố là:",
    "options": [
      "Bảo vệ tài sản",
      "Duy trì sản xuất",
      "Cứu người",
      "Bảo vệ môi trường"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 6
  },
  {
    "question": "Việc tự kiểm tra an toàn PCCC&CNCH định kỳ tại nhà máy do ai thực hiện?",
    "options": [
      "Cảnh sát PCCC&CNCH",
      "Đội PCCC&CNCH cơ sở",
      "UBND xã",
      "Người đứng đầu cơ sở hoặc người được phân công nhiệm vụ về công tác PCCC&CNCH"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 7
  },
  {
    "question": "Nội dung nào về PCCC&CNCH bắt buộc phải phổ biến cho toàn bộ người lao động?",
    "options": [
      "Nội quy lao động",
      "Quy chế tiền lương",
      "Nội quy PCCC & CNCH",
      "Nội quy bảo vệ"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 8
  },
  {
    "question": "Nhà máy thủy điện phải tổ chức diễn tập phương án PCCC & CNCH với tần suất tối thiểu",
    "options": [
      "6 tháng/lần",
      "1 năm/lần",
      "2 năm/lần",
      "2 năm/lần"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 9
  },
  {
    "question": "Trường hợp thay đổi công nghệ, công suất làm tăng nguy cơ cháy nổ, cơ sở phải:",
    "options": [
      "Không cần làm gì",
      "Báo cáo Sở Công thương",
      "Rà soát, cập nhật phương án PCCC&CNCH",
      "Chỉ huấn luyện lại công nhân"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 10
  },
  {
    "question": "Khu vực nào có nguy cơ cháy cao nhất trong nhà máy thủy điện?",
    "options": [
      "Nhà điều hành",
      "Phòng họp",
      "Gian máy – máy phát",
      "Khuôn viên ngoài trời"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 11
  },
  {
    "question": "Nguyên nhân cháy phổ biến tại nhà máy thủy điện là:",
    "options": [
      "Rò rỉ dầu bôi trơn",
      "Phóng điện, chập điện",
      "Quá nhiệt tại các ổ trục",
      "Tất cả các đáp án trên"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 12
  },
  {
    "question": "Dầu cách điện trong máy biến áp thuộc nhóm chất cháy nào?",
    "options": [
      "Chất rắn",
      "Chất lỏng dễ cháy",
      "Khí cháy",
      "Chất không cháy"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 13
  },
  {
    "question": "Biện pháp phòng cháy đối với máy biến áp là:",
    "options": [
      "Treo biển cấm lửa",
      "Hệ thống thu gom dầu sự cố",
      "Trang bị hệ thống chữa cháy",
      "Tất cả các đáp án trên"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 14
  },
  {
    "question": "Khi phát hiện mùi khét tại máy phát, hành động đúng là:",
    "options": [
      "Tiếp tục vận hành",
      "Báo ngay trưởng ca và xử lý theo quy trình",
      "Mở cửa thông gió",
      "Dùng nước làm mát"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 15
  },
  {
    "question": "Hệ thống cáp điện tập trung cần được:",
    "options": [
      "Bọc gỗ",
      "Bọc vật liệu dễ cháy",
      "Bảo vệ bằng vật liệu chống cháy",
      "Không cần bảo vệ"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 16
  },
  {
    "question": "dầu, mỡ bôi trơn phải bố trí:",
    "options": [
      "Gần phòng điều khiển",
      "Chung với kho vật tư",
      "Tách biệt, đảm bảo khoảng cách an toàn",
      "Trong gian máy"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 17
  },
  {
    "question": "Yếu tố nào làm cháy lan nhanh trong nhà máy",
    "options": [
      "Trần cao",
      "Gió đối lưu mạnh",
      "Kết cấu bê tông",
      "Độ ẩm cao"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 18
  },
  {
    "question": "Việc hút thuốc trong khu vực nhà máy",
    "options": [
      "Được phép mọi nơi",
      "Được phép trong gian máy",
      "Chỉ được phép nơi quy định",
      "Không cần quy định"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 19
  },
  {
    "question": "Chất chữa cháy không phù hợp cho đám cháy thiết bị điện đang mang điện là:",
    "options": [
      "Khí CO₂",
      "Bột khô",
      "Khí sạch",
      "Nước"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 20
  },
  {
    "question": "Bình chữa cháy CO₂ phù hợp nhất để chữa cháy:",
    "options": [
      "Kim loại",
      "Gỗ",
      "Thiết bị điện",
      "Than đá"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 21
  },
  {
    "question": "Bình chữa cháy xách tay phải được kiểm tra định kỳ tối thiểu:",
    "options": [
      "1 năm/lần",
      "6 tháng/lần",
      "3 tháng/lần",
      "Hàng tháng"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 22
  },
  {
    "question": "Hệ thống báo cháy tự động có chức năng chính là:",
    "options": [
      "Dập tắt đám cháy",
      "Phát hiện và cảnh báo sớm",
      "Thoát khói",
      "Cấp nước"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 23
  },
  {
    "question": "Lối thoát nạn trong nhà máy phải:",
    "options": [
      "Khóa khi hết ca",
      "Luôn thông thoáng, có biển chỉ dẫn",
      "Dùng làm kho tạm",
      "Không cần chiếu sáng"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 24
  },
  {
    "question": "Đèn chiếu sáng sự cố hoạt động khi:",
    "options": [
      "Có người đi lại",
      "Mất điện lưới",
      "Trời tối",
      "Không được phép bật"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 25
  },
  {
    "question": "Hệ thống chữa cháy cố định thường dùng cho máy biến áp là:",
    "options": [
      "Nước phun",
      "Bọt chữa cháy",
      "Cát",
      "Khí CO₂ xách tay"
    ],
    "correct": 0,
    "category": "PCCC",
    "id": 26
  },
  {
    "question": "Áp lực nước chữa cháy trong hệ thống phải đảm bảo:",
    "options": [
      "Theo thiết kế được phê duyệt",
      "Theo ý người vận hành",
      "Càng thấp càng tốt",
      "Không cần quy định"
    ],
    "correct": 0,
    "category": "PCCC",
    "id": 27
  },
  {
    "question": "Việc bảo dưỡng hệ thống PCCC phải do:",
    "options": [
      "Bất kỳ ai",
      "Người lao động",
      "Đơn vị đủ năng lực và được giao nhiệm vụ thực hiện",
      "Đội bảo vệ"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 28
  },
  {
    "question": "Khi sử dụng bình bột chữa cháy, cần chú ý:",
    "options": [
      "Phun vào gốc lửa",
      "Phun từ trên xuống",
      "Đứng ngược chiều gió",
      "Cả A và C"
    ],
    "correct": 0,
    "category": "PCCC",
    "id": 29
  },
  {
    "question": "Phương tiện CNCH tại nhà máy thủy điện bao gồm:",
    "options": [
      "Áo phao, dây cứu nạn",
      "Xuồng, phao cứu sinh",
      "Thiết bị nâng, cắt",
      "Tất cả các đáp án trên"
    ],
    "correct": 3,
    "category": "PCCC",
    "id": 30
  },
  {
    "question": "Khi xảy ra cháy, người phát hiện đầu tiên phải",
    "options": [
      "Tự ý xử lý",
      "Bỏ chạy",
      "Báo động và báo cho lực lượng PCCC&CNCH",
      "Chờ chỉ đạo"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 31
  },
  {
    "question": "Số điện thoại báo cháy thống nhất hiện nay là:",
    "options": [
      "111",
      "113",
      "114",
      "115"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 32
  },
  {
    "question": "Phương án chữa cháy và cứu hộ cứu nạn của nhà máy phải được:",
    "options": [
      "Niêm yết công khai",
      "Cất trong két",
      "Không cần phổ biến",
      "Chỉ lãnh đạo biết"
    ],
    "correct": 0,
    "category": "PCCC",
    "id": 33
  },
  {
    "question": "Khi CNCH người bị nạn dưới nước, ưu tiên hàng đầu là:",
    "options": [
      "Bắt đối tượng",
      "Bảo vệ tài sản",
      "Đảm bảo an toàn cho người cứu",
      "Quay video"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 34
  },
  {
    "question": "Người không có nhiệm vụ khi xảy ra cháy phải:",
    "options": [
      "Tập trung xem",
      "Tham gia chữa cháy",
      "Di chuyển theo lối thoát nạn",
      "Ở lại làm việc"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 35
  },
  {
    "question": "Việc phối hợp với lực lượng Cảnh sát PCCC được thực hiện khi:",
    "options": [
      "Cháy nhỏ",
      "Cháy vượt khả năng cơ sở",
      "Luôn luôn",
      "Không cần thiết"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 36
  },
  {
    "question": "Sau khi dập tắt cháy, việc cần làm tiếp theo là:",
    "options": [
      "Khôi phục sản xuất ngay",
      "Bảo vệ hiện trường",
      "Dọn dẹp nhanh",
      "Che giấu sự cố"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 37
  },
  {
    "question": "Hồ sơ vụ cháy phải được lưu giữ để:",
    "options": [
      "Tham khảo",
      "Báo cáo cơ quan có thẩm quyền",
      "Không cần lưu",
      "Đối phó kiểm tra"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 38
  },
  {
    "question": "Huấn luyện PCCC & CNCH cho người lao động mới phải thực hiện:",
    "options": [
      "Sau 1 năm",
      "Khi có thời gian",
      "Trước khi bố trí làm việc",
      "Không cần"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 39
  },
  {
    "question": "Lực lượng PCCC&CNCH cơ sở hoạt động theo nguyên tắc:",
    "options": [
      "Tự phát",
      "Theo mệnh lệnh",
      "Phối hợp – hiệp đồng",
      "Không cần nguyên tắc"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 40
  },
  {
    "question": "Khi cháy dầu tràn, biện pháp ban đầu hiệu quả là:",
    "options": [
      "Dùng nước xối mạnh",
      "Dùng cát, bọt",
      "Dùng quạt thổi",
      "Dùng giẻ lau"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 41
  },
  {
    "question": "Người lao động có nghĩa vụ gì về PCCC?",
    "options": [
      "Không cần quan tâm",
      "Chỉ nghe phổ biến",
      "Chấp hành nội quy PCCC",
      "Giao cho bảo vệ"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 42
  },
  {
    "question": "Biển báo PCCC phải có đặc điểm:",
    "options": [
      "Nhỏ gọn",
      "Dễ nhìn, dễ hiểu",
      "Trang trí",
      "Không bắt buộc"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 43
  },
  {
    "question": "Khi phát hiện hành vi vi phạm PCCC, người lao động phải:",
    "options": [
      "Bỏ qua",
      "Báo người có trách nhiệm",
      "Quay video",
      "Không cần xử lý"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 44
  },
  {
    "question": "Việc cấm lửa, cấm hút thuốc nhằm mục đích:",
    "options": [
      "Tạo mỹ quan",
      "Giảm nguy cơ cháy",
      "Quản lý lao động",
      "Trang trí"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 45
  },
  {
    "question": "Diễn tập PCCC & CNCH nhằm mục đích:",
    "options": [
      "Hình thức",
      "Kiểm tra phản ứng và phối hợp",
      "Đối phó kiểm tra",
      "Không cần thiết"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 46
  },
  {
    "question": "Khi cháy xảy ra vào ban đêm, yếu tố nguy hiểm nhất là:",
    "options": [
      "Nhiệt độ",
      "Khói độc",
      "Ánh sáng",
      "Âm thanh"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 47
  },
  {
    "question": "Người chỉ huy chữa cháy ban đầu tại cơ sở là:",
    "options": [
      "Người phát hiện cháy",
      "Đội trưởng PCCC cơ sở",
      "Bảo vệ",
      "Bất kỳ ai"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 48
  },
  {
    "question": "Phương án CNCH phải phù hợp với yếu tố đặc thù nào của thủy điện?",
    "options": [
      "Núi cao, sông nước",
      "Đông dân cư",
      "Giao thông thuận lợi",
      "Nhà cao tầng"
    ],
    "correct": 0,
    "category": "PCCC",
    "id": 49
  },
  {
    "question": "Công tác PCCC & CNCH tại nhà máy thủy điện mang tính chất:",
    "options": [
      "Phong trào",
      "Đối phó",
      "Thường xuyên, liên tục",
      "Không quan trọng"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 50
  },
  {
    "question": "Trong ca trực đêm, phát hiện khói trắng và mùi khét tại khu vực máy biến áp chính, chưa có lửa. Hành động đúng nhất là",
    "options": [
      "Dùng nước xịt trực tiếp vào khu vực nghi có cháy",
      "Báo động, báo trưởng ca, cô lập điện theo quy trình",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 51
  },
  {
    "question": "Dầu cách điện từ máy biến áp bị rò rỉ và bốc cháy cục bộ tại mương thu dầu.Biện pháp xử lý ban đầu phù hợp nhất",
    "options": [
      "Dùng nước phun mạnh",
      "Dùng cát hoặc bọt chữa cháy",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 52
  },
  {
    "question": "Xảy ra cháy tại tủ điện điều khiển đang mang điện. Chất chữa cháy phù hợp nhất là",
    "options": [
      "Nước",
      "Bọt",
      "Bình CO₂ hoặc khí sạch",
      "Cát"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 53
  },
  {
    "question": "Một công nhân rơi xuống kênh dẫn nước trong quá trình kiểm tra.nguyên tắc ưu tiên khi CHCN là",
    "options": [
      "Nhảy xuống cứu ngay",
      "Gọi nhiều người hỗ trợ",
      "Đảm bảo an toàn cho người cứu",
      "Chờ lực lượng chuyên nghiệp"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 54
  },
  {
    "question": "Cháy xảy ra tại gian máy, khói dày, tầm nhìn kém. Biện pháp an toàn khi thoát nạn là",
    "options": [
      "Chạy nhanh theo cảm tính",
      "Cúi thấp, di chuyển theo lối thoát nạn",
      "Dùng thang máy",
      "Quay lại lấy tài sản"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 55
  },
  {
    "question": "Hệ thống báo cháy tự động phát tín hiệu nhưng chưa thấy lửa, cách xử lý đúng là",
    "options": [
      "Tắt chuông báo",
      "Xác minh ngay khu vực báo cháy",
      "Bỏ qua vì báo giả",
      "Chờ cháy rõ ràng"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 56
  },
  {
    "question": "Khi chữa cháy dầu tràn, việc không được làm là:",
    "options": [
      "Khoanh vùng đám cháy",
      "Sử dụng bọt chữa cháy",
      "Phun nước trực tiếp vào dầu",
      "Cô lập nguồn phát sinh"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 57
  },
  {
    "question": "Trong quá trình chữa cháy, phát hiện có người mắc kẹt trong gian máy, ưu tiên xử lý là",
    "options": [
      "Dập tắt hoàn toàn đám cháy",
      "Cứu người kết hợp đảm bảo an toàn",
      "Bảo vệ thiết bị",
      "Gọi lãnh đạo"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 58
  },
  {
    "question": "Cháy vượt quá khả năng xử lý của lực lượng PCCC&CNCH cơ sở. Hành động đúng là",
    "options": [
      "Tiếp tục tự chữa cháy",
      "Báo ngay Cảnh sát PCCC (114)",
      "Sơ tán rồi bỏ mặc",
      "Đóng kín khu vực"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 59
  },
  {
    "question": "Sau khi dập tắt cháy tại máy biến áp, việc cần làm tiếp theo là:",
    "options": [
      "Vận hành lại ngay",
      "Bảo vệ hiện trường, báo cáo",
      "Thu dọn nhanh",
      "Che chắn khu vực"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 60
  },
  {
    "question": "Phát hiện công nhân hút thuốc trong khu vực cấm lửa. Cách xử lý",
    "options": [
      "Nhắc miệng cho qua",
      "Không xử lý",
      "Yêu cầu chấm dứt và báo người có thẩm quyền",
      "Ghi hình đăng nhóm"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 61
  },
  {
    "question": "Trong lúc CNCH dưới nước, người cứu không có áo phao.hành động đúng là",
    "options": [
      "Vẫn xuống cứu ngay",
      "Chờ thêm người",
      "Trang bị đầy đủ phương tiện an toàn trước khi cứu",
      "Bỏ qua"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 62
  },
  {
    "question": "Cháy xảy ra ban đêm, mất điện toàn bộ nhà máy. Yếu tố nguy hiểm nhất cần đề phòng là:",
    "options": [
      "Nhiệt",
      "Khói độc và hoảng loạn",
      "Tiếng ồn",
      "Độ ẩm"
    ],
    "correct": 1,
    "category": "PCCC",
    "id": 63
  },
  {
    "question": "Lối thoát nạn bị che chắn bởi vật tư.theo quy định về PCCC&CNCH Phải",
    "options": [
      "Giữ tạm",
      "Chuyển vật tư sau",
      "Giải tỏa ngay, đảm bảo thông thoáng",
      "Không cần xử lý"
    ],
    "correct": 2,
    "category": "PCCC",
    "id": 64
  },
  {
    "question": "Theo Quy trình An toàn điện, mọi công việc khi thực hiện tại thiết bị và vật liệu điện, ở gần hoặc liên quan đến thiết bị điện và vật liệu điện mang điện (kể cả điện cảm ứng) đều phải:",
    "options": [
      "Thực hiện theo phiếu công tác và lệnh công tác.",
      "Thực hiện theo phiếu công tác.",
      "Thực hiện theo lệnh công tác.",
      "Thực hiện theo phiếu công tác hoặc lệnh công tác."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 65
  },
  {
    "question": "Những người chưa được huấn luyện, kiểm tra đạt yêu cầu Quy trình An toàn điện và các quy trình có liên quan, chưa biết rõ những việc sẽ phải làm thì:",
    "options": [
      "Cấm ra mệnh lệnh hoặc giao công việc.",
      "Có thể giao công việc đơn giản và có người kèm cặp.",
      "Giao việc và không cần kèm cặp",
      "Giao việc và có người kèm cặp"
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 66
  },
  {
    "question": "Những mệnh lệnh không đúng Quy trình An toàn điện và các quy trình có liên quan khác, có nguy cơ mất an toàn cho người hoặc thiết bị thì người nhận lệnh có quyền:",
    "options": [
      "Không chấp hành, nếu người ra lệnh không chấp thuận thì người nhận lệnh vẫn phải thực hiện và báo cáo với cấp trên.",
      "Không chấp hành, nếu người ra lệnh không chấp thuận thì người nhận lệnh phải thực hiện.",
      "Không chấp hành, nếu người ra lệnh không chấp thuận thì người nhận lệnh được quyền báo cáo với cấp trên.",
      "Không chấp hành, nếu người ra lệnh không chấp thuận thì người nhận lệnh vẫn phải thực hiện."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 67
  },
  {
    "question": "Khi phát hiện cán bộ, công nhân vi phạm Quy trình An toàn điện và các quy trình có liên quan khác, có nguy cơ đe dọa đến tính mạng con người hoặc mất an toàn đối với thiết bị, người phát hiện phải:",
    "options": [
      "Lập tức báo cáo với cấp có thẩm quyền.",
      "Lập tức ngăn chặn và báo cáo với cấp có thẩm quyền.",
      "Lập tức ngăn chặn.",
      "Không ngăn chặn"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 68
  },
  {
    "question": "Quản đốc, phó quản đốc phân xưởng (hoặc cấp tương đương), đội trưởng, đội phó đội sản xuất, kỹ thuật viên, kỹ sư trực tiếp sản xuất, công nhân (nhân viên) phải được huấn luyện,kiểm tra quy trình An toàn điện:",
    "options": [
      "Mỗi năm 01 lần",
      "Mỗi năm 02 lần.",
      "02 năm 01 lần.",
      "03 năm 01 lần."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 69
  },
  {
    "question": "Khi phát hiện có người bị điện giật, trong bất kỳ trường hợp nào người phát hiện cũng phải:",
    "options": [
      "Tìm biện pháp nhanh nhất để tách nạn nhân ra khỏi mạch điện.",
      "Tìm biện pháp nhanh nhất để cứu chữa người bị nạn.",
      "Tìm biện pháp nhanh nhất để tách nạn nhân ra khỏi mạch điện và cứu chữa người bị nạn.",
      "Tìm biện pháp để tách nạn nhân ra khỏi mạch điện và cứu chữa người bị nạn."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 70
  },
  {
    "question": "Biện pháp tổ chức để đảm bảo an toàn khi làm việc ở thiết bị điện bao gồm:",
    "options": [
      "Khảo sát, lập biên bản hiện trường (nếu cần thiết).",
      "Đăng ký công tác.",
      "Làm việc theo Phiếu công tác hoặc Lệnh công tác.",
      "Khảo sát, lập biên bản hiện trường (nếu cần thiết).Đăng ký công tác.Làm việc theo Phiếu công tác hoặc Lệnh công tác."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 71
  },
  {
    "question": "Phiếu công tác là:",
    "options": [
      "Giấy cho phép đơn vị công tác làm việc với thiết bị điện và phòng ngừa để không xảy ra tai nạn điện.",
      "Phiếu công tác do người được giao nhiệm vụ của đơn vị quản lý vận hành cấp.",
      "Giấy cho phép đơn vị công tác làm việc với thiết bị điện. Phiếu công tác do người được giao nhiệm vụ của đơn vị quản lý vận hành cấp.",
      "Phiếu công tác do người được giao nhiệm vụ của đơn vị sửa chữa cấp."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 72
  },
  {
    "question": "Khi làm việc theo phiếu công tác:",
    "options": [
      "Mỗi Phiếu công tác chỉ được cấp cho 01 đơn vị công tác để làm 01 công việc.",
      "Mỗi Phiếu công tác có thể cấp cho 02 đơn vị công tác để làm 02 công việc.",
      "Mỗi Phiếu công tác có thể cấp cho 02 đơn vị công tác để làm 03 công việc.",
      "Mỗi Phiếu công tác có thể cấp cho 01 đơn vị công tác để làm 02 công việc."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 73
  },
  {
    "question": "Người chỉ huy trực tiếp:",
    "options": [
      "Phải có bậc 4 an toàn điện trở lên;",
      "Được công nhận chức danh “Người chỉ huy trực tiếp”, hàng năm phải được huấn luyện về những nội dung có liên quan, kiểm tra đạt yêu cầu và được Giám đốc, Phó Giám đốc kỹ thuật cấp Công ty ra quyết định công nhận;",
      "Phải nắm vững thời gian, địa điểm, nội dung công việc được giao và các biện pháp an toàn phù hợp với yêu cầu của công việc;",
      "Phải có bậc 4 an toàn điện trở lên,Phải nắm vững thời gian, địa điểm, nội dung công việc được giao và các biện pháp an toàn phù hợp với yêu cầu của công việc;\nĐược công nhận chức danh “Người chỉ huy trực tiếp”,"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 74
  },
  {
    "question": "Trách nhiệm của người chỉ huy trực tiếp:",
    "options": [
      "Chuẩn bị, kiểm tra chất lượng của các dụng cụ, trang bị an toàn sử dụng trong khi làm việc; kiểm tra sơ bộ tình trạng sức khỏe, trang bị phương tiện bảo vệ cá nhân của nhân viên đơn vị công tác.",
      "Phân công người chuẩn bị, kiểm tra chất lượng của các dụng cụ, trang bị an toàn sử dụng trong khi làm việc; kiểm tra sơ bộ tình trạng sức khỏe, trang bị phương tiện bảo vệ cá nhân của nhân viên đơn vị công tác.",
      "Chuẩn bị, kiểm tra chất lượng của các dụng cụ, trang bị an toàn sử dụng trong khi làm việc; kiểm tra trang bị phương tiện bảo vệ cá nhân của nhân viên đơn vị công tác.",
      "Phân công người chuẩn bị, kiểm tra chất lượng của các dụng cụ sử dụng trong khi làm việc; kiểm tra sơ bộ tình trạng sức khỏe, trang bị phương tiện bảo vệ cá nhân của nhân viên đơn vị công tác."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 75
  },
  {
    "question": "Trách nhiệm của người chỉ huy trực tiếp:",
    "options": [
      "Chỉ huy mọi người đến đúng địa điểm (nơi) sẽ làm việc theo kế hoạch, chỉ dẫn cụ thể nhiệm vụ, nội dung công việc cho các nhân viên trong đơn vị công tác.",
      "Chỉ dẫn cho các nhân viên trong đơn vị công tác đến đúngđịa điểm (nơi) sẽ làm việc theo kế hoạch, yêu cầu mọi người tự tìm hiểu nhiệm vụ, nội dung công việc.",
      "Chỉ dẫn cho các nhân viên trong đơn vị công tác đến đúng địa điểm (nơi) sẽ làm việc theo kế hoạch,",
      "Chỉ huy mọi người đến đúng địa điểm (nơi) sẽ làm việc theo kế hoạch."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 76
  },
  {
    "question": "Trách nhiệm của người chỉ huy trực tiếp:",
    "options": [
      "Tại hiện trường cử 1 nhân viên đơn vị công tác có kinh nghiệm kiểm tra, tiếp nhận các biện pháp an toàn, các yếu tố nguy hiểm, nơi làm việcdo người cho phép giao và chỉ dẫn khi thực hiện việc cho phép làm việc.",
      "Tại hiện trường phải kiểm tra, tiếp nhận các biện pháp an toàn nơi làm việc do người cho phép giao và thực hiện các biện pháp an toàn cần thiết khác.",
      "Tại hiện trường cử 2 nhân viên đơn vị công tác có kinh nghiệm kiểm tra, tiếp nhận các biện pháp an toàn, các yếu tố nguy hiểm, nơi làm việcdo người cho phép giao và chỉ dẫn khi thực hiện việc cho phép làm việc.",
      "Tại hiện trường cử 1 nhân viên đơn vị công tác có kinh nghiệm kiểm tra, tiếp nhận các biện pháp an toàn, các yếu tố nguy hiểm, nơi làm việcdo người cho phép giao"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 77
  },
  {
    "question": "Tiếp đất nơi làm việc có cắt điện thì phải thực hiện như thế nào?",
    "options": [
      "Phải tiếp đất ngay sau khi thử hết điện.",
      "Tiếp đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến.",
      "Đảm bảo khoảng cách an toàn đối với phần còn mang điện và đảm bảo cho toàn bộ đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất.",
      "Phải tiếp đất ngay sau khi thử hết điện. Tiếp đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến,Đảm bảo khoảng cách an toàn đối với phần còn mang điện và đảm bảo cho toàn bộ đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 78
  },
  {
    "question": "Khi tạm ngừng công việc trong ngày để nghỉ giải lao (ăn trưa), đối với công việc cắt điện từng phần hoặc không cắt điện:",
    "options": [
      "Phải rút toàn bộ đơn vị công tác ra khỏi nơi làm việc, các biện pháp an toàn vẫn giữ nguyên, chỉ được vào làm việc trở lại khi được sự đồng ý của người chỉ huy trực tiếp hoặc người giám sát sau khi kiểm tra còn đấy đủ các biện pháp an toàn.",
      "Phải rút toàn bộ đơn vị công tác ra khỏi nơi làm việc, thao gỡ các biện pháp an toàn.",
      "Đơn vị công tác nghỉ ăn trưa tại chỗ, các biện pháp an toàn phải giữ nguyên.",
      "Phải trả lai vị trí công tác cho người cho phép."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 79
  },
  {
    "question": "Để tránh đóng điện nhầm vào thiết bị có người đang làm việc:",
    "options": [
      "Các bộ phận truyền động của dao cách ly phải khoá lại, chìa khoá phải do người cắt điện hay người trực ca vận hành giữ.",
      "Các bộ phận truyền động của dao cách ly phải khoá lại và treo biển báo an toàn, chìa khoá phải do người cắt điện hay người trực ca vận hành giữ.",
      "Phải cử người trông coi không cho ai đóng điện.",
      "Treo biển “Cấm mở! Có người đang làm việc” tại bộ phận truyền động."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 80
  },
  {
    "question": "Những người được phép tháo các biển báo ở bộ phận truyền động của máy cắt, DCL mà từ đó có thể đóng điện đến nơi làm việc là:",
    "options": [
      "Nhân viên của đơn vị QLVH thiết bị sau khi được sự cho phép của điều độ.",
      "Nhân viên thao tác (Người treo biển báo) hoặc người được chỉ định thay thế.",
      "Người của nhóm công tác thao khi thực hiện thủ tục kết thúc công tác.",
      "Cả 3 câu A, B và C đều đúng nhưng phải có trình độ an toàn bậc 5/5."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 81
  },
  {
    "question": "Cho phép MBA được vận hành lâu dài với điện áp cao hơn điện áp định mức trong điều kiện:",
    "options": [
      "Lâu dài 5% khi máy làm việc với điện áp định mức.",
      "Lâu dài 10% khi máy làm việc với điện áp định mức.",
      "Lâu dài 15% khi máy làm việc với điện áp định mức.",
      "Tuỳ theo quy định của nhà thiết kế nhưng không quá 5% điện áp định mức."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 82
  },
  {
    "question": "Khi được phân công làm nhiệm vụ giám sát an toàn điện đội công tác, người giám sát?",
    "options": [
      "Có thể uỷ quyền cho công nhân bậc cao trong đội công tác thực hiện nhiệm vụ giám sát thay.",
      "Phải luôn luôn có mặt tại nơi đội công tác làm việc.",
      "Có thể vắng mặt trong thời gian ngắn.",
      "Không phải thực hiện giám sát."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 83
  },
  {
    "question": "Trước khi cho đơn vị công tác vào làm việc ai chịu trách nhiệm giải thích về nội dung, trình tự thực hiện công việc và các biện pháp an toàn?",
    "options": [
      "Người chỉ huy trực tiếp.",
      "Người cấp phiếu.",
      "Người lãnh đạo công việc.",
      "Người cho phép."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 84
  },
  {
    "question": "Bắt đầu công việc ngày tiếp theo (phiếu công tác nhiều ngày) thủ tục phải thực hiện?",
    "options": [
      "Người CHTT đưa đội công tác ra nơi làm việc.",
      "Người cho phép và Người CHTT phải kiểm tra lại các biện pháp an toàn và thực hiện việc cho phép làm việc, ghi và ký vào mục 5 của phiếu công tác.",
      "Người CHTT cùng người cho phép tiến hành thủ tục bắt đầu ngày tiếp theo, còn nhân viên đội công tác ra nơi làm việc trước.",
      "Người CHTT cùng người cho phép tiến hành thủ tục bắt đầu ngày tiếp theo"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 85
  },
  {
    "question": "Người chỉ huy trực tiếp thực hiện việc tiếp đất di động và các biện pháp an toàn khác của đơn vị công tác (nếu có) vào thời điểm nào?",
    "options": [
      "Trước khi ký tiếp nhận nơi làm việc vào phiếu công tác.",
      "Sau khi ký tiếp nhận nơi làm việc vào phiếu công tác.",
      "Trước khi người cho phép ký vào mục 2 của phiếu công tác.",
      "Trong khi cùng người cho phép kiểm tra các biện pháp an toàn."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 86
  },
  {
    "question": "Khi thực hiện thủ tục cho phép làm việc có cắt điện, người cho phép phải làm gì để chứng minh là không còn điện ở các phần đã được cắt điện?",
    "options": [
      "Thông báo hết điện cho mọi người cùng nghe.",
      "Thông báo hết điện cho người chỉ huy trực tiếp, người lãnh đạo công việc và người giám sát an toàn điện (nếu có) cùng nghe.",
      "Dùng thiết bị thử chuyên dùng để khẳng định hết điện.",
      "Sau khi đã đủ các biện pháp an toàn rồi thì không cần thử để chứng minh hết điện."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 87
  },
  {
    "question": "Khi thực hiện việc cho phép làm việc, người cho phép chỉ dẫn về phạm vi được phép làm việc và những phần có điện ở xung quanh cho những người nào?",
    "options": [
      "Với người chỉ huy trực tiếp.",
      "Với người lãnh đạo công việc.",
      "Với người giám sát an toàn điện.",
      "Với tất cả những người tham gia đơn vị công tác."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 88
  },
  {
    "question": "Tại hiện trường khi thực hiện việc cho phép làm việc, người cho phép phải cùng với những người nào sau đây kiểm tra các biện pháp an toàn đã thực hiện?",
    "options": [
      "Với người chỉ huy trực tiếp.",
      "Với tất cả nhân viên đơn vị công tác.",
      "Người phối hợp cho phép.",
      "Với người cấp phiếu"
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 89
  },
  {
    "question": "Trong các trường hợp dưới đây, phiếu công tác phải được thực hiện như thế nào cho đúng quy định:",
    "options": [
      "Sau khi hoàn thành công việc, phiếu công tác được giao trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 1 tháng.",
      "Thực hiện theo đáp án 1 cho cả những phiếu công tác đã cấp nhưng không thực hiện.",
      "Trường hợp khi tiến hành công việc, nếu để xảy ra sự cố hoặc tai nạn thì phiếu công tác phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị.",
      "Sau khi hoàn thành công việc, phiếu công tác được giao trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 1 tháng.Trường hợp khi tiến hành công việc, nếu để xảy ra sự cố hoặc tai nạn thì phiếu công tác phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 90
  },
  {
    "question": "Khi làm việc ở gần nơi có điện bệ xe cần cẩu, xe thang và xe nâng di động phải thực hiện như thế nào?",
    "options": [
      "Các xe phải được nối đất.",
      "Không cần nối đất.",
      "Không có quy định.",
      "Mỗi xe quy định riêng."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 91
  },
  {
    "question": "Ai là người chịu trách nhiệm chính về chất lượng của các dụng cụ an toàn trong quá trình thực hiện công việc theo Phiếu công tác, Lệnh công tác.",
    "options": [
      "Người Lãnh đạo công việc.",
      "Người chỉ huy trực tiếp.",
      "Người cho phép đơn vị công tác vào làm việc.",
      "Nhân viên đơn vị công tác"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 92
  },
  {
    "question": "Khi kết thúc công tác, công việc nào trong các công việc sau đây phải làm sau cùng:",
    "options": [
      "Kiểm tra thu dọn rào chắn tạm thời và trả lại rào chắn vĩnh viễn hoặc biển báo vận hành nếu có.",
      "Tháo tiếp đất lưu động, rút những biện pháp an toàn do đơn vị công tác làm (nếu có) và cho nhân viên đơn vị công tác ra khỏi nơi làm việc tập kết ở vị trí an toàn.",
      "Kiểm tra đủ số người tham gia làm việc.",
      "Kiểm tra xem trên thiết bị, đường dây có gì còn sai sót vướng mắc không."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 93
  },
  {
    "question": "Biện pháp an toàn nào sau đây đúng khi kiểm tra chổi than máy phát đang vận hành:",
    "options": [
      "Kiểm tra chổi than khi máy đang chạy không mang găng tay cách điện.",
      "Cấm dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy.",
      "Kiểm tra chổi than khi máy đang chạy phải mang găng tay cách điện và cài chặt vào cổ tay.",
      "Cấm dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy.\nKiểm tra chổi than khi máy đang chạy phải mang găng tay cách điện và cài chặt vào cổ tay."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 94
  },
  {
    "question": "Khoảng cách an toàn từ vùng làm việc đến các phần mang điện 500 kV ở xung quanh khi không có rào chắn?",
    "options": [
      "1,5m.",
      "2,5m.",
      "4,0m.",
      "4,5m."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 95
  },
  {
    "question": "Lúc đang kéo vật nặng lên cao hay đưa xuống thấp:",
    "options": [
      "Phải bố trí người giám sát an toàn, không cho người đi lại và đứng xung quanh nơi làm việc.",
      "Cấm tuyệt đối không cho ai được đi lại và đứng xung quanh nơi làm việc.",
      "Chỉ có những người tham gia công tác mới được quyền đi lại xung quanh nơi làm việc.",
      "Chỉ có Tổ trưởng và giám sát an toàn mới được quyền đi lại xung quanh nơi làm việc."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 96
  },
  {
    "question": "Nếu không là nhân viên QLVH trực tiếp, có được vào trạm biến thế 1 mình hay không ?",
    "options": [
      "Được nhưng phải có bậc 5 an toàn.",
      "Được nhưng phải có tên danh sách đã được Lãnh đạo Công ty duyệt.",
      "Được nhưng phải có cả 2 điều kiện 1 và 2.",
      "Trong bất cứ trường hợp nào cũng không được vào trạm 1 mình."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 97
  },
  {
    "question": "Theo quy trình an toàn điện dây tiếp đất di động được quy định như thế nào là đúng:",
    "options": [
      "Là dây chuyên dùng, bằng đồng hoặc hợp kim trần (hoặc bọc nhựa trong), mềm, nhiều sợi; tiết diện phải chịu được tác dụng nhiệt học; tiết diện ≥ 16mm2",
      "Là dây chuyên dùng, bằng đồng hoặc hợp kim trần (hoặc bọc nhựa trong), mềm, nhiều sợi; tiết diện phải chịu được tác dụng điện động và nhiệt học; tiết diện ≥ 16mm2",
      "Là dây chuyên dùng, bằng đồng hoặc hợp kim trần (hoặc bọc nhựa trong), mềm, nhiều sợi; tiết diện phải chịu được tác dụng điện động và nhiệt học; tiết diện < 16mm2",
      "Là dây chuyên dùng, bằng đồng hoặc hợp kim trần (hoặc bọc nhựa trong), mềm, nhiều sợi; tiết diện phải chịu được tác dụng điện động; tiết diện < 16mm2"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 98
  },
  {
    "question": "Việc gây ngắn mạch các cọc bình ắc quy có dung lượng lớn có thể đưa đến:",
    "options": [
      "Hỏng bình ắc quy.",
      "Mất điện.",
      "Nổ bình ắcquy.",
      "Hỏng bình ắc quy, Mất điện. Nổ bình ắcquy."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 99
  },
  {
    "question": "Điều nào cấm sau đây khi làm việc trong phòng ắc quy:",
    "options": [
      "Hút thuốc.",
      "Sử dụng bật lửa, lò sưởi.",
      "Tắt quạt thông gió, thông hơi.",
      "Hút thuốc, Sử dụng bật lửa, lò sưởi, Tắt quạt thông gió, thông hơi."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 100
  },
  {
    "question": "Khi tiến hành công việc trên máy cắt có bộ điều khiển từ xa phải:",
    "options": [
      "Có lệnh cho phép tách máy cắt khỏi vận hành của cấp điều độ có quyền điều khiển; Thực hiện theo Phiếu công tác; Cắt nguồn điều khiển máy cắt;",
      "Cắt các dao cách ly trước và sau máy cắt;",
      "Treo biển báo: “Cấm đóng điện! Có người đang làm việc” vào khóa điều khiển máy cắt.",
      "Có lệnh cho phép tách máy cắt khỏi vận hành của cấp điều độ có quyền điều khiển; Thực hiện theo Phiếu công tác; Cắt nguồn điều khiển máy cắt; Cắt các dao cách ly trước và sau máy cắt; Treo biển báo: “Cấm đóng điện! Có người đang làm việc” vào khóa điều khiển máy cắt."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 101
  },
  {
    "question": "Khi máy cắt đang vận hành bình thường thì:",
    "options": [
      "Có thể làm việc nếu có Phiếu công tác và giám sát an toàn đầy đủ.",
      "Có thể lau chùi sứ cách điện bằng chổi lông gắn trên sứ cách điện.",
      "Cấm sửa chữa ở các máy cắt đang vận hành (kể cả việc lau sứ cách điện bằng thiết bị chuyên dùng).",
      "Cả hai nội dung A và B đều đúng."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 102
  },
  {
    "question": "Những công việc có cắt điện nhưng phải gỡ dây tiếp địa để công tác là:",
    "options": [
      "Kiểm tra hệ thống tiếp địa của hệ thống trạm.",
      "Củng cố lại tiếp đất của thiết bị hoặc cả hệ thống trạm.",
      "Kiểm tra cách điện của các thiết bị.",
      "Kiểm tra hệ thống tiếp địa của hệ thống trạm. Củng cố lại tiếp đất của thiết bị hoặc cả hệ thống trạm.. Kiểm tra cách điện của các thiết bị."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 103
  },
  {
    "question": "Trong biện pháp an toàn khi làm việc ở các trạm biến áp:",
    "options": [
      "Người làm nhiệm vụ kiểm tra các thiết bị điện hạ áp phải có bậc 1 an toàn điện trở lên.",
      "Người làm nhiệm vụ kiểm tra các thiết bị điện hạ áp phải có bậc 2 an toàn điện trở lên.",
      "Người làm nhiệm vụ kiểm tra các thiết bị điện hạ áp phải có bậc 3 an toàn điện trở lên.",
      "Người làm nhiệm vụ kiểm tra các thiết bị điện hạ áp phải có bậc 4 an toàn điện trở lên."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 104
  },
  {
    "question": "Dây dẫn cấp điện cho hệ thống chiếu sáng và dây dẫn cấp điện cho máy động lực:",
    "options": [
      "Dây điện đèn và dây điện máy đi chung trong một ống.",
      "Không được đi chung trong một ống.",
      "Được đi chung nhiều dây trong một ống nhưng dây phải được bọc cách điện.",
      "Được đi chung nhiều dây trong một ống."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 105
  },
  {
    "question": "Thử tải trọng định kỳ cho dây an toàn đang sử dụng quy định như thế nào?",
    "options": [
      "Thử chịu tải trọng 225kg trong 5 phút.",
      "Thử chịu tải trọng 300kg trong 5 phút.",
      "Đeo vào người rồi mắc vào vật chắc chắn và ngả người xem dây có hỏng không.",
      "Cả A và B"
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 106
  },
  {
    "question": "Đối với những công tác cần phải cắt điện, chỉ được phép làm việc sau khi:",
    "options": [
      "Cắt điện xong.",
      "Thử không còn điện thế.",
      "Thực hiện tiếp địa đầy đủ, đặt rào chắn, treo biển báo, tín hiệu.",
      "Treo biển cấm đóng điện."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 107
  },
  {
    "question": "Được phép tiến hành đặt tiếp đất di động:",
    "options": [
      "Sau khi cắt điện.",
      "Sau khi kiểm tra không còn điện.",
      "Nếu có giám sát an toàn.",
      "Nếu có hai người thực hiện."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 108
  },
  {
    "question": "Khi làm việc trên cao nếu cần sử dụng các dụng cụ làm việc như kềm, tuốc-nơ-vít, mỏ lếch, ... thì phải:",
    "options": [
      "Bỏ vào túi quần mang lên cùng với người.",
      "Tung lên bằng tay từng dụng cụ một.",
      "Bỏ vào bao đựng chuyên dùng mang lên cùng với người.",
      "Không được mang lên theo người."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 109
  },
  {
    "question": "Khi kiểm tra không còn điện thì phải thực hiện như thế nào cho đúng quy trình an toàn điện:",
    "options": [
      "Người thực hiện thao tác cắt điện đồng thời phải tiến hành kiểm tra không còn điện ở các thiết bị đã cắt điện.",
      "Kiểm tra không còn điện bằng thiết bị thử điện chuyên dùng phù hợp với điện áp danh định của thiết bị điện cần thử, như bút thử điện, còi thử điện; phải thử ở tất cả các pha và các phía vào, ra của thiết bị điện.",
      "Có thể căn cứ tín hiệu đèn, rơ le, đồng hồ để xác nhận thiết bị điện không còn điện; nhưng nếu đèn, rơ le, đồng hồ báo tín hiệu có điện thì phải xem như thiết bị vẫn có điện.",
      "Cả A và B"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 110
  },
  {
    "question": "Những biện pháp kỹ thuật chuẩn bị nơi làm việc phải cắt điện bao gồm: \na. Cắt điện và ngăn chặn có điện trở lại nơi làm việc.\nb. Đặt (làm) tiếp đất.\nc. Kiểm tra không còn điện\nd. Đặt (làm) rào chắn; treo biển báo, tín hiệu. Nếu cắt điện hoàn toàn thì không phải làm rào chắn.",
    "options": [
      "Theo trình tự a-b-c-d.",
      "Theo trình tự a-c-b-d.",
      "Theo trình tự a-c-d-b.",
      "Theo trình tự d-a-c-b."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 111
  },
  {
    "question": "Việc trao trả nơi làm việc, khóa phiếu và đóng điện phải thực hiện như thế nào là đúng quy định:",
    "options": [
      "Bàn giao trao trả nơi làm việc, khóa phiếu phải được tiến hành trực tiếp giữa đơn vị công tác và đơn vị quản lý vận hành thiết bị.",
      "Người chỉ huy trực tiếp ký vào Mục 6.1 kết thúc công tác.",
      "Người cho phép sau khi kiểm tra lại tại nơi làm việc không còn tiếp đất di động (nếu có) đảm bảo an toàn mới được ký khoá phiếu vào Mục 6.2 và thực hiện những việc của nhân viên vận hành (nếu được giao), báo cáo Trưởng ca ca trực vận hành nội dung công việc đã thực hiện.",
      "Bàn giao trao trả nơi làm việc, khóa phiếu phải được tiến hành trực tiếp giữa đơn vị công tác và đơn vị quản lý vận hành thiết bị.\nNgười chỉ huy trực tiếp ký vào Mục 6.1 kết thúc công tác, Người cho phép sau khi kiểm tra lại tại nơi làm việc không còn tiếp đất di động (nếu có) đảm bảo an toàn mới được ký khoá phiếu vào Mục 6.2 và thực hiện những việc của nhân viên vận hành (nếu được giao), báo cáo Trưởng ca ca trực vận hành nội dung công việc đã thực hiện."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 112
  },
  {
    "question": "Lắp và tháo tiếp đất phải thực hiện như thế nào:",
    "options": [
      "Lắp và tháo tiếp đất do hai người thực hiện, trong đó một người phải có bậc an toàn điện từ bậc 4 trở lên, người còn lại từ bậc 3 trở lên.",
      "Khi lắp tiếp đất phải đấu một đầu dây tiếp đất với đất trước, sau đó dùng sào cách điện (hoặc đeo găng tay cách điện đối với thiết bị điện hạ áp) để lắp đầu còn lại vào dây dẫn. Tháo tiếp đất làm ngược lại.",
      "Đầu dây đấu xuống đất phải bắt bằng bu-lông, cấm vặn xoắn. Nếu đấu vào tiếp đất của cột hoặc hệ thống nối đất chung thì phải cạo sạch rỉ chỗ đấu nối đất. Trường hợp nối đất cột bị hỏng, khó bắt bu-lông phải đóng cọc sắt (hoặc đồng) sâu 1,0m để làm tiếp đất.",
      "Cả A, B, C"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 113
  },
  {
    "question": "Khi làm việc ở những mạch đo lường, bảo vệ đang có điện phải áp dụng biện pháp an toàn sau đây:",
    "options": [
      "Tất cả các cuộn dây thứ cấp của máy biến dòng điện (TI) và máy biến điện áp (TU) phải có dây tiếp đất cố định;",
      "Cấm để hở mạch cuộn thứ cấp của máy biến dòng điện và để ngắn mạch cuộn thứ cấp máy biến điện áp.",
      "Cả A và B.",
      "Cả A, B và C đều sai."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 114
  },
  {
    "question": "Khi có nhiều tổ hay nhiều đơn vị công tác trên cùng một hệ thống đường dây, một trạm biến áp hay một công trường mà có người chỉ huy trực tiếp riêng biệt:",
    "options": [
      "Cấp chung một phiếu công tác và làm biện pháp an toàn chung cho tất cả các đơn vị.",
      "Mỗi đơn vị được cấp riêng 1 phiếu công tác và thực hiện những biện pháp an toàn phải riêng biệt.",
      "Phiếu công tác được cấp chung và phải cử ra một cán bộ có bậc an toàn điện cao giám sát toàn bộ khu vực.",
      "Phiếu công tác được cấp riêng cho mỗi đơn vị công tác, nhưng những biện pháp an toàn có thể phối hợp làm chung để tiết kiệm thời gian, trang bị nối đất và biển báo…"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 115
  },
  {
    "question": "Trong các trường hợp dưới đây, lệnh công tác phải được thực hiện như thế nào cho đúng quy định:",
    "options": [
      "Sau khi hoàn thành công việc lệnh công tác phải được lưu giữ ít nhất 1 tháng (kể cả những lệnh đã ban hành nhưng không thực hiện).",
      "Trường hợp khi tiến hành công việc, nếu để xảy ra sự cố hoặc tai nạn thì lệnh công tác phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị.",
      "Cả A và B.",
      "Cả A, B và C đều sai."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 116
  },
  {
    "question": "Sau khi hoàn thành công việc, thời gian lưu giữ lệnh công tác phải được ít nhất:",
    "options": [
      "15 ngày.",
      "30 ngày.",
      "60 ngày.",
      "90 ngày."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 117
  },
  {
    "question": "Người cấp phiếu công tác phải đáp ứng được các việc sau đây:",
    "options": [
      "Phải nắm vững về vận hành lưới điện hoặc nhà máy điện do đơn vị mình trực tiếp quản lý.",
      "Biết được nội dung công việc, điều kiện đảm bảo an toàn điện khi tiến hành công việc.",
      "Phải có bậc 5 an toàn điện, được công nhận chức danh “Người cấp phiếu công tác” theo quy định tại Khoản 1 Điều 28 Quy trình an toàn điện.",
      "Phải nắm vững về vận hành lưới điện hoặc nhà máy điện do đơn vị mình trực tiếp quản lý.Biết được nội dung công việc, điều kiện đảm bảo an toàn điện khi tiến hành công việc.Phải có bậc 5 an toàn điện, được công nhận chức danh “Người cấp phiếu công tác” theo quy định tại Khoản 1 Điều 28 Quy trình an toàn điện."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 118
  },
  {
    "question": "Trong các trường hợp dưới đây, phiếu công tác phải được thực hiện như thế nào cho đúng quy định:",
    "options": [
      "Sau khi hoàn thành công việc, phiếu công tác được giao trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 1 tháng.",
      "Thực hiện theo lựa chọn 1 cho cả những phiếu công tác đã cấp nhưng không thực hiện.",
      "Trường hợp khi tiến hành công việc, nếu để xảy ra sự cố hoặc tai nạn thì phiếu công tác phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị.",
      "Cả A, B, C"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 119
  },
  {
    "question": "Trong trường hợp phải cử riêng người giám sát an toàn điện cho đơn vị công tác thì tại hiện trường, sau khi ký cho phép, phiếu công tác được giao cho những người nào?",
    "options": [
      "Người cho phép giữ 01 bản và người giám sát an toàn điện giữ 01 bản.",
      "Người cho phép giữ 01 bản và người chỉ huy trực tiếp giữ 01 bản.",
      "Người chỉ huy trực tiếp giữ 01 bản và người giám sát an toàn điện giữ 01 bản.",
      "Người chỉ huy trực tiếp và người giám sát an toàn điện giữ chung 01 bản, còn người cho phép giữ riêng 01 bản."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 120
  },
  {
    "question": "Đơn vị quản lý vận hành phải làm gì sau khi có giấy đăng ký của đơn vị làm công việc:",
    "options": [
      "Lập kế hoạch để kết hợp công tác và đăng ký cắt điện với các cấp điều độ theo quy định (trường hợp có cắt điện).",
      "Thông báocắt điện cho đơn vị làm công việc để triển khai công việc khi đăng ký cắt điện đã được phê duyệt.",
      "Lập kế hoạch đăng ký cắt điện với các cấp điều độ theo quy định (trường hợp có cắt điện).",
      "Lập kế hoạch để kết hợp công tác và đăng ký cắt điện"
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 121
  },
  {
    "question": "Khi cấp phiếu công tác phải thực hiện theo những quy định nào sau đây:",
    "options": [
      "Theo đúng mẫu, nội dung ghi dễ hiểu, đủ và đúng theo yêu cầu công việc; cấm tẩy xóa, viết bằng bút chì, rách nát, nhòe chữ.",
      "Lập thành 02 bản, do người cấp phiếu trực tiếp ký và giao cho người cho phép mang đến hiện trường để làm thủ tục cho phép làm việc.",
      "Trường hợp người cho phép kiêm người chỉ huy trực tiếp thì được phép lập, sử dụng 01 bản và phải tuân thủ đầy đủ trình tự, thủ tục, nội dung công việc của các chức danh này.",
      "Theo đúng mẫu, nội dung ghi dễ hiểu, đủ và đúng theo yêu cầu công việc; cấm tẩy xóa, viết bằng bút chì, rách nát, nhòe chữ.\nLập thành 02 bản, do người cấp phiếu trực tiếp ký và giao cho người cho phép mang đến hiện trường để làm thủ tục cho phép làm việc."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 122
  },
  {
    "question": "Trình độ an toàn người Lãnh đạo công việc theo quy trình an toàn điện được quy định như thế nào?",
    "options": [
      "Bậc 3 an toàn trở lên.",
      "Bậc 4 an toàn trở lên.",
      "Bậc 5 an toàn.",
      "Tuỳ theo mức độ nguy hiểm của công việc mà có bậc an toàn cho phù hợp."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 123
  },
  {
    "question": "Tổ chức quản lý vận hành đường dây nhà máy cử công nhân đi đặt tiếp đất di động trong các trường hợp nào sau đây là đúng?",
    "options": [
      "02 người có bậc an toàn 3/5.",
      "03 người có bậc an toàn 2/5.",
      "01 người có bậc an toàn 5/5.",
      "02 người có bậc an toàn 3/5 và 4/5."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 124
  },
  {
    "question": "Khi cắt điện đường dây để cho đơn vị công tác vào làm việc trên đường dây, tại MC và dao cách ly của đường dây phải được cắt phải treo biển báo loại nào?",
    "options": [
      "“Cấm đóng điện, có người đang làm việc”.",
      "“Cấm vào, phía trên có điện”.",
      "“Dừng lại, có điện nguy hiểm chết người”.",
      "“Cấm đóng điện, có người đang làm việc trên đường dây”."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 125
  },
  {
    "question": "Tất cả các thiết bị lắp đặt trên hệ thống điện đều phải:",
    "options": [
      "Đặt tên, treo biển báo hướng dẫn theo đúng qui định.",
      "Phải đánh số ký hiệu thống nhất trong Ngành.",
      "Đặt tên thống nhất theo qui định của đơn vị quản lý hoặc theo địa dư.",
      "Gồm cả hai nội dung A và B mới đúng."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 126
  },
  {
    "question": "Theo Quy trình thao tác Hệ thống điện quốc gia, quy định thao tác đóng dao tiếp địa phải:",
    "options": [
      "Kiểm tra đường dây hoặc thiết bị điện đã mất điện bằng bút thử điện hoặc tín hiệu đèn.",
      "Kiểm tra đường dây hoặc thiết bị điện đã mất điện (căn cứ thông số điện áp) và trạng thái máy cắt, dao cách ly tại trung tâm điều khiển liên quan đã mở hoàn toàn.",
      "Kiểm tra đường dây hoặc thiết bị điện đã mất điện (căn cứ thông số điện áp) và trạng thái tại chỗ máy cắt, dao cách ly liên quan đã mở hoàn toàn.",
      "Kiểm tra đường dây hoặc thiết bị điện đã mất điện (căn cứ thông số dòng điện) và trạng thái tại chỗ máy cắt, dao cách ly liên quan đã mở hoàn toàn."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 127
  },
  {
    "question": "Theo Quy trình thao tác Hệ thống điện quốc gia, không cho phép dùng dao cách ly để tiến hành các thao tác có điện trong các trường hợp nào sau đây:",
    "options": [
      "Đóng và cắt điểm trung tính của các máy biến áp, kháng điện.",
      "Đóng và cắt chuyển đổi thanh cái khi máy cắt hoặc dao cách ly liên lạc thanh cái đã đóng.",
      "Đóng và cắt các cuộn dập hồ quang khi trong lưới điện có hiện tượng chạm đất.",
      "Đóng và cắt dao cách ly nối tắt thiết bị."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 128
  },
  {
    "question": "Theo Quy trình thao tác Hệ thống điện quốc gia, cho phép kiểm tra trạng thái máy cắt theo chỉ thị của tín hiệu và đo lường mà không cần kiểm tra chỉ thị trạng thái tại chỗ trong các trường hợp nào?",
    "options": [
      "Sau khi thao tác máy cắt, không thao tác dao cách ly hai phía của máy cắt này.",
      "Sau khi thao tác máy cắt, việc thao tác dao cách ly hai phía máy cắt được thực hiện bằng điều khiển tại chỗ",
      "Thực hiện thao tác xa hoặc thao tác trong điều kiện thời tiết xấu.",
      "Sau khi thao tác máy cắt, không thao tác dao cách ly hai phía của máy cắt này.\n Thực hiện thao tác xa hoặc thao tác trong điều kiện thời tiết xấu."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 129
  },
  {
    "question": "Theo Quy trình thao tác Hệ thống điện quốc gia, yêu cầu phải thực hiện nội dung “đọc kỹ phiếu thao tác và kiểm tra phiếu thao tác phải phù hợp với mục đích thao tác” là trách nhiệm của:",
    "options": [
      "Người thao tác.",
      "Người giám sát thao tác.",
      "Người ra lệnh thao tác.",
      "Người nhận lệnh thao tác."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 130
  },
  {
    "question": "Theo Quy trình thao tác Hệ thống điện quốc gia, quy định nhân viên vận hành không cần lập phiếu thao tác nhưng phải ghi chép đầy đủ các bước thao tác vào sổ nhật ký vận hành trước khi thực hiện thao tác là:",
    "options": [
      "Thao tác đơn giản có số bước thao tác không quá 02 bước.",
      "Thao tác không quá 03 bước và được thực hiện tại trung tâm điều khiển hoặc thao tác bằng điều khiển xa.",
      "Thao tác đơn giản có số bước thao tác không quá 04 bước.",
      "Thao tác đơn giản có số bước thao tác không quá 05 bước."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 131
  },
  {
    "question": "Khi thao tác sai hoặc gây ra sự cố, đơn vị thao tác phải?",
    "options": [
      "Ngừng ngay phiếu thao tác và báo cáo cho người ra lệnh biết. Việc thực hiện tiếp thao tác phải được tiến hành theo một phiếu mới.",
      "Ngừng ngay phiếu thao tác và hội ý để tiếp tục thao tác khắc phục lại thao tác sai sau đó báo cáo cho người ra lệnh biết.",
      "Báo cáo cấp trên trước khi thao tác khắc phục sai sót.",
      "Ghi bổ sung vào phiếu thao tác và báo cáo cấp trên."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 132
  },
  {
    "question": "Khi xử lý sự cố thiết bị điện do nhân viên vận hành thực hiện trong ca trực, hoặc những người khác thực hiện dưới sự giám sát của nhân viên vận hành thì có thể thực hiện theo:",
    "options": [
      "Phiếu công tác- nếu không phải thực hiện việc cho phép làm việc.",
      "Lệnh công tác- nếu không phải thực hiện việc cho phép làm việc.",
      "Lệnh công tác và phiếu thao tác.",
      "Cả A, B, C đều sai"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 133
  },
  {
    "question": "Lệnh công tác là lệnh viết ra giấy hoặc trực tiếp ra lệnh bằng lời nói (hay qua điện thoại, bộ đàm) để thực hiện công việc ở thiết bị điện và vật liệu điện mà không phải thực hiện việc cho phép làm việc như:",
    "options": [
      "Làm việc ở xa nơi có điện;",
      "Xử lý sự cố thiết bị do nhân viên vận hành thực hiện trong ca trực, hoặc những người khác thực hiện dưới sự giám sát của nhân viên vận hành;",
      "Làm việc ở thiết bị điện hạ áp trong một số trường hợp.",
      "Làm việc ở xa nơi có điện; Xử lý sự cố thiết bị do nhân viên vận hành thực hiện trong ca trực, hoặc những người khác thực hiện dưới sự giám sát của nhân viên vận hành; Làm việc ở thiết bị điện hạ áp trong một số trường hợp."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 134
  },
  {
    "question": "Phiếu thao tác phải được cấp khi cần thao tác đóng cắt thiết bị mang điện thế:",
    "options": [
      "Từ 1000 V trở lên.",
      "Từ 6600 V trở lên.",
      "Từ 380 V trở lên.",
      "Từ 15 KV trở lên"
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 135
  },
  {
    "question": "Người thao tác và giám sát phải có bậc an toàn:",
    "options": [
      "Người thao tác bậc 2 an toàn trở lên, người giám sát bậc 3 an toàn trở lên.",
      "Người thao tác bậc 2 an toàn trở lên, người giám sát do đơn vị trưởng duyệt.",
      "Người thao tác bậc 3 an toàn trở lên, người giám sát bậc 4 an toàn trở lên.",
      "Người giám sát phải cao hơn người thao tác một bậc an toàn."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 136
  },
  {
    "question": "Khi thao tác đóng cắt điện theo phiếu thao tác, người giám sát an toàn phải có trình độ an toàn:",
    "options": [
      "Bậc 3 an toàn trở lên.",
      "Bậc 4 an toàn trở lên.",
      "Có bậc an toàn cao hơn bậc an toàn của người trực tiếp thao tác một bậc.",
      "Bậc 3 hoặc bậc 4 an toàn trở lên tùy theo mức độ nguy hiểm của công việc"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 137
  },
  {
    "question": "Dao cách ly được phép thao tác có điện:",
    "options": [
      "Khi dòng điện thao tác nhỏ hơn dòng điện cho phép theo quy trình vận hành của dao cách ly đó do đơn vị quản lý vận hành ban hành.",
      "Các trường hợp dùng dao cách ly để tiến hành các thao tác có điện được quy định cụ thể trong Quy trình Thao tác hệ thống điện quốc gia.",
      "Cả 1 và 2.",
      "Cả A, B, C đều sai"
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 138
  },
  {
    "question": "Trong điều kiện vận hành bình thường người giám sát thao tác và người thao tác phải thực hiện những qui định nào?",
    "options": [
      "Người giám sát thao tác và người thao tác, sau khi xem xét không còn thắc mắc cùng ký vào phiếu, mang phiếu đến địa điểm thao tác.",
      "Tới nơi (vị trí) thao tác phải kiểm tra lại một lần nữa theo sơ đồ (nếu có) và đối chiếu vị trí thiết bị trên thực tế đúng với nội dung ghi trong phiếu, đồng thời kiểm tra xung quanh hay trên thiết bị còn gì trở ngại không, sau đó mới được phép thao tác.",
      "Phải bao gồm cả 1 và 2.",
      "Cả A, B, C đều sai"
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 139
  },
  {
    "question": "Trong điều kiện vận hành bình thường người giám sát thao tác và người thao tác phải thực hiện những qui định nào?",
    "options": [
      "Khi nhận phiếu thao tác phải đọc kỹ và kiểm tra lại nội dung thao tác theo sơ đồ, nếu chưa rõ thì phải hỏi lại người ra lệnh.n",
      "Nếu nhận lệnh bằng điện thoại thì người giám sát thao tác phải ghi đầy đủ lệnh đó và nhắc lại từng động tác trong điện thoại, ghi âm lại (nếu có), ghi tên người ra lệnh, nhận lệnh, ngày, giờ truyền lệnh vào phiếu thao tác, sổ nhật ký vận hành.",
      "Người giám sát thao tác và người thao tác, sau khi xem xét không còn thắc mắc cùng ký vào phiếu, mang phiếu đến địa điểm thao tác.",
      "Phải bao gồm cả A, B và C."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 140
  },
  {
    "question": "Trong quá trình thực hiện công việc, nếu thấy có việc phát sinh cần xử lý ở ngoài phạm vi được phép làm việc của phiếu công tác thì giải quyết như thế nào?",
    "options": [
      "Phải cấp phiếu công tác mới cho công việc đó.",
      "Người chỉ huy trực tiếp tổ chức biện pháp an toàn để thực hiện, ghi thêm vào phiếu đang làm.",
      "Người chỉ huy trực tiếp báo cho người cho phép biết và tổ chức biện pháp an toàn để thực hiện, đồng thời ghi thêm vào phiếu đang công tác.",
      "Cả A và B."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 141
  },
  {
    "question": "Khi gặp sự cố có thể gây nguy hiểm cho người hoặc hư hại thiết bị. Nhân viên vận hành được phép:",
    "options": [
      "Cắt điện ngay.",
      "Báo cho người phụ trách để xử lý.",
      "Cắt điện ngay sau đó phải báo cho nhân viên vận hành cấp trên và người phụ trách trực tiếp của mình biết nội dung những việc đã làm, sau đó ghi đầy đủ vào nhật ký vận hành.",
      "Chỉ được cắt điện khi có lệnh hoặc Phiếu theo qui trình."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 142
  },
  {
    "question": "Đối với thiết bị ngoài trời trong lúc mưa to nước chảy thành dòng trên thiết bị, dụng cụ an toàn hoặc đang có giông sét thì:",
    "options": [
      "Cấm đóng, cắt điện bằng sào thao tác và dao cách ly thao tác trực tiếp tại chỗ hoặc thay dây chì.",
      "Được phép đóng, cắt dao cách ly ở những đường dây không có điện.",
      "Cho phép đóng, cắt điện bằng sào thao tác và dao cách ly thao tác trực tiếp tại chỗ hoặc thay dây chì nếu mang đầy đủ găng tay cách điện và ủng cách điện.",
      "A và B đều đúng."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 143
  },
  {
    "question": "Thao tác đóng, cắt ở thiết bị điện cao áp, cần:",
    "options": [
      "1 người với thao tác đơn giản, có bậc an toàn điện 4/5",
      "Ít nhất phải do 2 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng). Người thao tác phải có bậc 3 an toàn điện trở lên, người giám sát thao tác phải có bậc 4 an toàn điện trở lên.",
      "Ít nhất phải do 2 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng), một người thao tác và một người giám sát thao tác. Người thao tác phải có bậc 3 an toàn điện trở lên, người giám sát thao tác phải có bậc 4 an toàn điện trở lên. Những người này phải hiểu rõ sơ đồ và vị trí của thiết bị tại hiện trường.",
      "2 người với thao tác đơn giản, có bậc an toàn điện 3/5 và 4/5."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 144
  },
  {
    "question": "Phiếu thao tác thực hiện xong:",
    "options": [
      "Phiếu thao tác thực hiện xong phải được lưu ít nhất 01 tháng.",
      "Phiếu thao tác thực hiện xong phải được lưu ít nhất 03 tháng.",
      "Trường hợp thao tác có liên quan đến sự cố, tai nạn thì các phiếu thao tác có liên quan phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị.",
      "Phiếu thao tác thực hiện xong phải được lưu ít nhất 03 tháng. \nTrường hợp thao tác có liên quan đến sự cố, tai nạn thì các phiếu thao tác có liên quan phải được lưu trong hồ sơ điều tra sự cố, tai nạn lao động của đơn vị"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 145
  },
  {
    "question": "Phương pháp hô hấp nhân tạo đặt nạn nhân nằm ngửa là phương pháp:",
    "options": [
      "Phải có 02 người mới thực hiện được",
      "Chỉ cần một người cấp cứu.",
      "Có thể một người hoặc hai người cùng phối hợp động tác với nhau",
      "Cả 3 ý trên đều sai."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 146
  },
  {
    "question": "Phương pháp cấp cứu hà hơi thổi ngạt kết hợp ép tim ngoài lồng ngực là phương pháp:",
    "options": [
      "Phải có 2 người mới thực hiện được.",
      "Chỉ cần một người cấp cứu.",
      "Có thể một người hoặc hai người cùng phối hợp động tác với nhau.",
      "Cả 3 ý trên đều sai."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 147
  },
  {
    "question": "Phương pháp hô hấp nhân tạo đặt nạn nhân nằm ngửa, người cấp cứu ngồi ở vị trí nào:",
    "options": [
      "Một người ngồi cạnh đầu nạn nhân, người kia xoạc chân 2 bên ngực nạn nhân.",
      "Một người ngồi bên cạnh giữ lưỡi. Người cứu ngồi phía đầu, cách đầu 20-30 cm.",
      "Hai người muốn ngồi đâu cũng được, làm sao cho thực hiện được động tác.",
      "Có thể chọn 1 trong 3 ý trên."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 148
  },
  {
    "question": "Phương pháp hà hơi thổi ngạt kết hợp ép tim ngoài lồng ngực, người cứu ấn mạnh tay làm lồng ngực nạn nhân bị nén xuống rồi buông tay ra để lồng ngực nạn nhân trở lại bình thường lặp lại các động tác trên bao nhiên lần trong một phút.",
    "options": [
      "Khoảng 45-60 lần/phút.",
      "Khoảng 60-75 lần/phút.",
      "Khoảng 80-100 lần/phút.",
      "Khoảng 100-120 lần/phút"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 149
  },
  {
    "question": "Phương pháp hà hơi thổi ngạt kết hợp ép tim ngoài lồng ngực, người cứu ấn mạnh tay làm lồng ngực nạn nhân bị nén xuống với chiều sâu bao nhiêu:",
    "options": [
      "Khoảng 1-2 cm.",
      "Khoảng 3-5 cm.",
      "Khoảng 5-6 cm.",
      "Có thể chọn 1 trong 3 ý trên."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 150
  },
  {
    "question": "Vận tốc cho phép đối với xe cần cẩu, xe thang, xe nâng di chuyển trong khu vực trạm điện?",
    "options": [
      "10km/h.",
      "20km/h.",
      "5km/h.",
      "Không hạn chế vận tốc."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 151
  },
  {
    "question": "Khi cấp cứu người bị điện giật, nếu nạn nhân được cứu chữa ngay trong phút đầu tiên thì khả năng cứu sống là:",
    "options": [
      "50%.",
      "68%.",
      "90%.",
      "98%."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 152
  },
  {
    "question": "Khi cấp cứu người bị điện giật, nếu nạn đến phút thứ 5 mới được cấp cứu thì khả năng cứu sống là:",
    "options": [
      "0%.",
      "15%.",
      "25%.",
      "30%."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 153
  },
  {
    "question": "Cấp cứu người bị điện giật:",
    "options": [
      "Nếu nạn nhân bị mất tri giác nhưng vẫn còn thở nhẹ, tim đập yếu thì lập tức đưa đến cơ quan y tế để theo dõi điều trị.",
      "Nếu nạn nhân bị mất tri giác nhưng vẫn còn thở nhẹ, tim đập yếu thì phải dùng nước lạnh xoa lên người nạn nhân.",
      "Có thể chọn 1 trong 2 cách 1, 2.",
      "Cả 2 ý A, B đều sai."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 154
  },
  {
    "question": "Cấp cứu người bị điện giật:",
    "options": [
      "Khi người bị điện giật đã tắt thở, tim ngừng đập thôi không cần thiết cứu chữa nữa.",
      "Gặp nạn nhân ở tình trạng như ý 1 phải đưa nạn nhân ra chỗ thoáng khí, ma sát toàn thân cho nóng lên và cho ngửi khí amôniắc để nạn nhân dần dần hồi tỉnh.",
      "Nếu tim nạn nhân ngừng đập, toàn thân co giật giống như chết thì phải đưa nạn nhân ra chỗ thoáng khí, nới rộng quần, áo, thắt lưng, moi rớt rãi trong mồm và kéo lưỡi (nếu lưỡi thụt vào). Tiến hành làm hô hấp nhân tạo, hà hơi thổi ngạt ngay, phải làm liên tục, kiên trì cho đến khi có ý kiến của y, bác sỹ quyết định mới thôi.",
      "Cả 3 ý A, B, C đều đúng."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 155
  },
  {
    "question": "Phương pháp cấp cứu đặt nạn nhân nằm sấp, người làm hô hấp phải ngồi:",
    "options": [
      "Bên cạnh sườn nạn nhân.",
      "Trên lưng nạn nhân.",
      "Sát đầu nạn nhân.",
      "Có thể chọn 1 trong 3 vị trí A, B, C"
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 156
  },
  {
    "question": "Phương pháp cấp cứu đặt nạn nhân nằm sấp người làm hô hấp phải dùng hai bàn tay để vào hai bên cạnh sườn nạn nhân, hai ngón tay cái để sát sống lưng, ấn tay đếm nhẩm “1-2-3” rồi lại từ từ thả tay ra, thẳng người đếm nhẩm”4-5-6”. Số lần như trên là:",
    "options": [
      "12 lần trong 1 phút",
      "14 lần trong 1 phút",
      "16 lần trong 1 phút",
      "Tuỳ thuộc sức khoẻ của người cứu."
    ],
    "correct": 0,
    "category": "QT_ATD",
    "id": 157
  },
  {
    "question": "Phương pháp hô hấp nhân tạo đặt nạn nhân nằm sấp là phương pháp:",
    "options": [
      "Phải có 2 người mới thực hiện được.",
      "Chỉ cần một người cấp cứu.",
      "Có thể một người hoặc hai người cùng phối hợp động tác với nhau",
      "Cả 3 ý trên đều sai."
    ],
    "correct": 1,
    "category": "QT_ATD",
    "id": 158
  },
  {
    "question": "Trong các cách cứu chữa dưới đây cách nào được coi là có hiệu quả và phổ biến nhất.",
    "options": [
      "Phương pháp hô hấp nhân tạo đặt nạn nhân nằm sấp.",
      "Phương pháp hô hấp nhân tạo đặt nạn nhân nằm ngửa.",
      "Phương pháp hà hơi thổi ngạt kết hợp ép tim ngoài lồng ngực.",
      "Cả ba như nhau"
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 159
  },
  {
    "question": "Khi nào quyết định dừng việc cứu chữa nạn nhân bị điện giật:",
    "options": [
      "Khi nạn nhân đã hồi tỉnh, nhịp tim và hơi thở đã bình thường",
      "Có ý kiến cho dừng của Y, Bác sỹ.",
      "Cả ý 1 và 2 đều đúng.",
      "Cả hai ý A, B đều sai."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 160
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Ai là người giao phiếu công tác cho người chỉ huy trực tiếp? Và giao khi nào?",
    "options": [
      "Người cấp phiếu giao cho người chỉ huy trực tiếp sau khi kiểm tra các biện pháp an toàn đã ghi đầy đủ trong phiếu công tác và ký phiếu.",
      "Nhân viên vận hành tại nơi công tác (hiện trường) giao phiếu công tác cho người chỉ huy trực tiếp sau khi kiểm tra các nội dung công việc và các biện pháp an toàn đã ghi đầy đủ trong phiếu công tác và ghi đầy đủ nội dung vào sổ nhật ký vận hành.",
      "Người cho phép giao phiếu công tác cho người chỉ huy trực tiếp tại hiện trường, sau khi kiểm tra các nội dung công việc và thực hiện đầy đủ các biện pháp an toàn đã ghi trong phiếu công tác, bàn giao hiện trường cho người chỉ huy trực tiếp và ghi đầy đủ nội dung công tác vào nhật ký vận hành.",
      "Người lãnh đạo công việc giao phiếu công tác cho người chỉ huy trực tiếp tại hiện trường sau khi kiểm tra đầy đủ các biện pháp an toàn."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 161
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Trách nhiệm nào sau đây là của người cấp phiếu công tác?",
    "options": [
      "Khi giao phiếu cho Người chỉ huy trực tiếp phải chỉ dẫn những yêu cầu cụ thể và những yếu tố nguy hiểm về an toàn điện tại nơi làm việc để Người chỉ huy trực tiếp hướng dẫn cho đơn vị công tác thực hiện để đảm bảo an toàn.",
      "Khi giao phiếu cho Người cho phép phải chỉ dẫn những yêu cầu cụ thể và những yếu tố nguy hiểm về an toàn điện tại nơi làm việc để Người cho phép hướng dẫn cho đơn vị công tác khi thực hiện việc cho phép làm việc để đảm bảo an toàn",
      "Cử Người cho phép thực hiện việc cho phép làm việc tại hiện trường (cho phép đơn vị công tác vào làm việc)",
      "Câu B, C đúng"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 162
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Trách nhiệm nào sau đây là của người cho phép?",
    "options": [
      "Nhận Phiếu công tác từ Người cấp phiếu, tiếp nhận sự điều hành, chỉ dẫn của trưởng ca (trực chính) ca trực vận hành của đơn vị để biết đầy đủ tình trạng vận hành của thiết bị nơi thực hiện công việc (nếu người cấp phiếu không phải là trưởng ca, trực chính ca trực vận hành), kiểm tra biện pháp an toàn và thực hiện việc cho phép làm việc tại hiện trường để cho đơn vị công tác vào làm việc.",
      "Nắm vững các quy định và những yêu cầu về an toàn điện tại nơi làm việc để giám sát đơn vị công tác đảm bảo an toàn về điện.",
      "Chỉ dẫn nơi làm việc, phạm vi được phép làm việc, những nơi (phần, thiết bị) có điện ở xung quanh và cảnh báo những nguy cơ gây ra mất an toàn cho toàn đơn vị công tác và người giám sát an toàn điện (nếu có) để họ biết và phòng tránh.Tiếp nhận lại Phiếu công tác và nơi làm việc do người chỉ huy trực tiếp bàn giao khi đơn vị công tác làm xong công việc; kiểm tra nội dung công việc, nơi làm việc, viết, ký khóa phiếu vào Phiếu công tác, giao trả lại phiếu cho người cấp phiếu.",
      "Câu A, C đúng"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 163
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Trách nhiệm nào sau đây là của người chỉ huy trực tiếp?",
    "options": [
      "Chịu trách nhiệm phối hợp hoạt động của các đơn vị công tác, khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện theo các phiếu công tác để đảm bảo an toàn.",
      "Trách nhiệm kiểm tra: tiếp nhận các biện pháp an toàn do người cho phép bàn giao và thực hiện các biện pháp an toàn cần thiết khác",
      "Trách nhiệm giám sát: phải có mặt giám sát liên tục tại nơi làm việc, Giám sát và có biện pháp để nhân viên đơn vị công tác không thực hiện những hành vi có thể gây tai nạn trong quá trình làm việc.",
      "Câu B và C đúng"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 164
  },
  {
    "question": "Khi nhân viên đơn vị công tác nhận thấy nguy cơ dẫn đến tai nạn như là cháy nổ hay thiếu khí oxy tại nơi làm việc thì phải báo ngay cho ai?",
    "options": [
      "Người lãnh đạo công việc.",
      "Tổ trưởng quản lý trực tiếp hoặc quản đốc phân xưởng sửa chữa.",
      "Người chỉ huy trực tiếp.",
      "Người giám sát an toàn."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 165
  },
  {
    "question": "Nếu làm việc ở nơi cắt điện từng phần hoặc không cắt điện thì khi nghỉ giải lao đơn vị công tác phải thực hiện như thế nào?",
    "options": [
      "Nghỉ tại chổ, nhưng phải tập trung không được đi lung tung.",
      "Tất cả mọi người trong đơn vị công tác phải rút ra khỏi khu vực làm việc, ngoại trừ người giám sát an toàn.",
      "Tất cả mọi người trong đơn vị công tác phải rút ra khỏi khu vực làm việc, ngoại trừ người chỉ huy trực tiếp.",
      "Tất cả mọi người trong đơn vị công tác phảidừng làm việc và các biện pháp an toàn phải được giữ nguyên."
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 166
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Nhân viên đơn vị công tác có quyền nào sau đây?",
    "options": [
      "Phản ánh với cấp trên nếu thấy người giám sát an toàn không có mặt tại nơi công tác.",
      "Từ chối thực hiện công việc khi thấy không đảm bảo an toàn, nếu người chỉ huy trực tiếp không chấp thuận thì báo cáo lên cấp trên để giải quyết.",
      "Yêu cầu được phổ biến các biện pháp an toàn và yếu tố nguy hiểm trước khi thực hiện công việc.",
      "Câu B, C đúng"
    ],
    "correct": 3,
    "category": "QT_ATD",
    "id": 167
  },
  {
    "question": "Theo Qui trình An toàn điện kèm theo Quyết định số 959/QĐ-EVN ngày 09/08/2018 qui định: Sau khi hoàn thành công việc, Phiếu công tác được giao trả cho ai?",
    "options": [
      "Người lãnh đạo công việc.",
      "Người cho phép làm việc.",
      "Người cấp phiếu công tác.",
      "Đơn vị công công tác."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 168
  },
  {
    "question": "Điện cao áp được quy ước là:",
    "options": [
      "Từ 600V trở lên.",
      "Từ 1000V trở lên.",
      "Trên 1000V.",
      "Từ 3000V trở lên."
    ],
    "correct": 2,
    "category": "QT_ATD",
    "id": 169
  },
  {
    "question": "Anh/ chị hãy giải thích thế nào là Người lãnh đạo công việc?",
    "options": [
      "Là người có trách nhiệm phân công công việc, chỉ huy và giám sát nhân viên đơn vị công tác trong suốt quá trình thực hiện công việc.",
      "Là người chỉ đạo chung khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện.",
      "Là người của đơn vị quản lý vận hành thực hiện việc cho phép đơn vị công tác vào làm việc ở tại hiện trường, khi hiện trường công tác đã đủ điều kiện đảm bảo an toàn.",
      "Là người của đơn vị công tác trực tiếp thực hiện công việc do người chỉ huy trực tiếp phân công."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 170
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Người chỉ huy trực tiếp?",
    "options": [
      "Là người có trách nhiệm phân công công việc, chỉ huy và giám sát nhân viên đơn vị công tác trong suốt quá trình thực hiện công việc",
      "Là người của đơn vị trực tiếp quản lý vận hành các thiết bị điện được giao nhiệm vụ cấp PCT",
      "Là người của đơn vị quản lý vận hành thực hiện việc cho phép đơn vị công tác vào làm việc ở tại hiện trường, khi hiện trường công tác đã đủ điều kiện đảm bảo an toàn",
      "Là người của đơn vị công tác trực tiếp thực hiện công việc do người chỉ huy trực tiếp phân công"
    ],
    "correct": 0,
    "category": "ATD",
    "id": 171
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Nhân viên đơn vị công tác?",
    "options": [
      "Là người của đơn vị quản lý vận hành thực hiện việc cho phép đơn vị công tác vào làm việc ở tại hiện trường, khi hiện trường công tác đã đủ điều kiện đảm bảo an toàn",
      "Là người có kiến thức về an toàn điện, được huấn luyện, chỉ định và thực hiện việc giám sát an toàn điện cho đơn vị công tác",
      "Là người của đơn vị công tác trực tiếp thực hiện công việc do người chỉ huy trực tiếp phân công",
      "Là người có trách nhiệm phân công công việc, chỉ huy và giám sát nhân viên đơn vị công tác trong suốt quá trình thực hiện công việc"
    ],
    "correct": 2,
    "category": "ATD",
    "id": 172
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Người cho phép?",
    "options": [
      "Là người chỉ đạo chung khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện",
      "Là người có trách nhiệm phân công công việc, chỉ huy và giám sát nhân viên đơn vị công tác trong suốt quá trình thực hiện công việc",
      "Là người của đơn vị công tác trực tiếp thực hiện công việc do người chỉ huy trực tiếp phân công",
      "Là người của đơn vị quản lý vận hành thực hiện việc cho phép đơn vị công tác vào làm việc ở tại hiện trường, khi hiện trường công tác đã đủ điều kiện đảm bảo an toàn"
    ],
    "correct": 3,
    "category": "ATD",
    "id": 173
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Đơn vị công tác?",
    "options": [
      "Là đơn vị thực hiện công việc sửa chữa, thí nghiệm, xây lắp,... Mỗi đơn vị công tác phải có ít nhất 02 người, trong đó phải có 01 người chỉ huy trực tiếp chịu trách nhiệm chung",
      "Là đơn vị có quyền và trách nhiệm cử ra đơn vị công tác để thực hiện công việc sửa chữa, thí nghiệm, xây lắp,…",
      "Là đơn vị trực tiếp thực hiện công việc quản lý, vận hành các thiết bị.",
      "Là đơn vị bên ngoài cử đến Công ty để tham quan, học tập và được hướng dẫn an toàn trước khi vào nhà máy"
    ],
    "correct": 0,
    "category": "ATD",
    "id": 174
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Đơn vị làm công việc?",
    "options": [
      "Là đơn vị trực tiếp thực hiện công việc quản lý, vận hành các thiết bị",
      "Là đơn vị có quyền và trách nhiệm cử ra đơn vị công tác để thực hiện công việc sửa chữa, thí nghiệm, xây lắp,…",
      "Là đơn vị bên ngoài cử đến Công ty để tham quan, học tập và được hướng dẫn an toàn trước khi vào nhà máy",
      "Là đơn vị thực hiện công việc sửa chữa, thí nghiệm, xây lắp,... Mỗi đơn vị công tác phải có ít nhất 02 người, trong đó phải có 01 người chỉ huy trực tiếp chịu trách nhiệm chung"
    ],
    "correct": 1,
    "category": "ATD",
    "id": 175
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Đơn vị quản lý vận hành?",
    "options": [
      "Là đơn vị thực hiện công việc sửa chữa, thí nghiệm, xây lắp,... Mỗi đơn vị công tác phải có ít nhất 02 người, trong đó phải có 01 người chỉ huy trực tiếp chịu trách nhiệm chung",
      "Là đơn vị có quyền và trách nhiệm cử ra đơn vị công tác để thực hiện công việc sửa chữa, thí nghiệm, xây lắp,…",
      "Là đơn vị trực tiếp thực hiện công việc quản lý, vận hành các thiết bị",
      "Là đơn vị bên ngoài cử đến Công ty để tham quan, học tập và được hướng dẫn an toàn trước khi vào nhà máy"
    ],
    "correct": 2,
    "category": "ATD",
    "id": 176
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Làm việc có cắt điện một phần?",
    "options": [
      "Là công việc phải áp dụng các biện pháp kỹ thuật hoặc tổ chức để đề phòng người và phương tiện, dụng cụ làm việc đến phần có điện với khoảng cách nhỏ hơn khoảng cách an toàn cho phép",
      "Là công việc làm ở thiết bị đang mang điện, có sử dụng các trang bị, dụng cụ chuyên dùng",
      "Là làm việc ở độ cao từ 2,0 m trở lên, được tính từ mặt đất (mặt bằng) đến điểm tiếp xúc của chân người thực hiện công việc",
      "Là công việc làm ở thiết bị chỉ có một phần được cắt điện để làm việc hoặc thiết bị được cắt điện hoàn toàn nhưng các lối đi ra phần phân phối ngoài trời hoặc thông sang phòng bên cạnh có điện vẫn mở cửa"
    ],
    "correct": 3,
    "category": "ATD",
    "id": 177
  },
  {
    "question": "Anh/ chị hiểu thế nào là làm việc trên cao?",
    "options": [
      "Làm việc trên cao là làm việc ở độ cao từ 1,0 m trở lên, được tính từ mặt đất (mặt bằng) đến điểm tiếp xúc của chân người thực hiện công việc.",
      "Làm việc trên cao là làm việc ở độ cao từ 1,5 m trở lên, được tính từ mặt đất (mặt bằng) đến điểm tiếp xúc của chân người thực hiện công việc.",
      "Làm việc trên cao là làm việc ở độ cao từ 2,0 m trở lên, được tính từ mặt đất (mặt bằng) đến điểm tiếp xúc của chân người thực hiện công việc.",
      "Làm việc trên cao là làm việc ở độ cao từ 0,5 m trở lên, được tính từ mặt đất (mặt bằng) đến điểm tiếp xúc của chân người thực hiện công việc."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 178
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Điện hạ áp?",
    "options": [
      "Là điện áp đến 1.000 V",
      "Là điện áp trên 1.000 V",
      "Là điện áp đến 2.000 V",
      "Là điện áp đến 6.000 V"
    ],
    "correct": 0,
    "category": "ATD",
    "id": 179
  },
  {
    "question": "Anh/chị hãy giải thích thế nào là Điện cao áp?",
    "options": [
      "Là điện áp dưới 1000 V",
      "Là điện áp trên 1.000 V",
      "Là điện áp = 1000 V",
      "Là điện áp = 220 V"
    ],
    "correct": 1,
    "category": "ATD",
    "id": 180
  },
  {
    "question": "Khi thao tác đóng, cắt điện ở thiết bị điện cao áp phải do mấy người thực hiện?",
    "options": [
      "Thao tác đóng, cắt điện ở thiết bị điện cao áp, phải do ít nhất 02 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng). Người thao tác phải có bậc 3 an toàn điện trở lên, người giám sát thao tác phải có bậc 4 an toàn điện trở lên.",
      "Thao tác đóng, cắt điện ở thiết bị điện cao áp, chỉ cần 01 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng), người này phải có bậc 4 an toàn điện trở lên và hiểu rõ sơ đồ và vị trí của thiết bị tại hiện trường",
      "Thao tác đóng, cắt điện ở thiết bị điện cao áp, phải do ít nhất 02 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng).  Người thao tác phải có bậc 2 an toàn điện trở lên, người giám sát thao tác phải có bậc 3 an toàn điện trở lên.",
      "Thao tác đóng, cắt điện ở thiết bị điện cao áp, phải do ít nhất 02 người thực hiện (trừ trường hợp thiết bị được trang bị đặc biệt và có quy trình thao tác riêng). Người thao tác phải là nhân viên đơn vị công tác có bậc 3 an toàn điện trở lên, người giám sát thao tác phải có bậc nghề là bậc 6 trở lên."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 181
  },
  {
    "question": "Dao cách ly được phép thao tác trong trường hợp nào sau đây?",
    "options": [
      "Dao cách ly được phép thao tác không điện hoặc thao tác có điện khi dòng điện thao tác nhỏ hơn dòng điện cho phép theo quy trình vận hành của dao cách ly do đơn vị quản lý vận hành ban hành.",
      "Dao cách ly được phép đóng, cắt trực tiếp tại chỗ ở ngoài trời trong lúc mưa to nước chảy thành dòng trên thiết bị, dụng cụ an toàn hoặc đang có giông sét với điều kiện phải có người giám sát tại chỗ.",
      "Dao cách ly được phép thao tác không điện hoặc thao tác có điện khi dòng điện thao tác lớn hơn dòng điện cho phép theo quy trình vận hành của dao cách ly do đơn vị quản lý vận hành ban hành.",
      "Dao cách ly được phép thao tác không điện hoặc thao tác có điện khi dòng điện thao tác lớn hơn dòng điện cho phép theo quy trình vận hành của dao cách ly do đơn vị quản lý vận hành ban hành nhưng phải có người giám sát an toàn bậc 4 an toàn điện trở lên."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 182
  },
  {
    "question": "Khi nào thì nhân viên vận hành được phép cắt các máy cắt, dao cách ly mà không phải có lệnh thao tác hoặc phiếu thao tác?",
    "options": [
      "Khi xảy ra tai nạn, sự cố hoặc có thể gây ra mất an toàn cho người và hư hỏng thiết bị.",
      "Khi đưa thiết bị từ sửa chữa vào vận hành và các Phiếu công tác liên quan đên thiết bị đã được khóa hết.",
      "Khi các Phiếu công tác liên quan đên thiết bị đã được khóa, nơi làm việc đã được đơn vi công tác bàn giao cho người cho phép làm việc.",
      "Khi nhân viên đơn vị công tác yêu cầu đóng điện để chạy thử và hiệu chỉnh thiết bị."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 183
  },
  {
    "question": "Phiếu thao tác thực hiện xong phải được lưu trong thời gian bao lâu?",
    "options": [
      "01 tháng.",
      "02 tháng.",
      "Ít nhất 03 tháng.",
      "Không cần lưu."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 184
  },
  {
    "question": "Bậc an toàn điện được chia thành bao nhiêu bậc?",
    "options": [
      "Bậc an toàn điện được chia thành 4 bậc đó là: 1/5; 2/5; 3/5; 4/5.",
      "Bậc an toàn điện được chia thành 7 bậc đó là: 1/7; 2/7; 3/7; 4/7; 5/7; 6/7; 7/7",
      "Bậc an toàn điện được chia thành 5 bậc đó là: 1/5; 2/5; 3/5; 4/5; 5/5.",
      "Bậc an toàn điện được chia thành 5 bậc đó là: 2/5; 3/5; 4/5; 5/5; 6/5."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 185
  },
  {
    "question": "Những biện pháp kỹ thuật chuẩn bị nơi làm việc phải cắt điện bao gồm những biện pháp nào?",
    "options": [
      "(1) Cắt điện và ngăn chặn có điện trở lại nơi làm việc; (2) Đăng ký công tác; (3) Đặt nối đất; (4) Đặt rào chắn; treo biển báo, tín hiệu. Nếu cắt điện hoàn toàn thì không phải làm rào chắn.",
      "(1) Cắt điện và ngăn chặn có điện trở lại nơi làm việc; (2) Kiểm tra không còn điện; (3) Làm việc theo PCT hoặc LCT; (4) Đặt rào chắn; treo biển báo, tín hiệu. Nếu cắt điện hoàn toàn thì không phải làm rào chắn.",
      "(1) Cắt điện và ngăn chặn có điện trở lại nơi làm việc; (2) Kiểm tra không còn điện; (3) Đặt nối đất; (4) Cho phép làm việc tại hiện trường.",
      "(1) Cắt điện và ngăn chặn có điện trở lại nơi làm việc; (2) Kiểm tra không còn điện; (3) Đặt nối đất; (4) Đặt rào chắn; treo biển báo, tín hiệu. Nếu cắt điện hoàn toàn thì không phải làm rào chắn."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 186
  },
  {
    "question": "Các biện pháp sau đây biện pháp nào là biện pháp tổ chức để đảm bảo an toàn khi làm việc?",
    "options": [
      "(1) Khảo sát, lập biên bản hiện trường, lập phương án thi công và biện pháp an toàn (nếu cần thiết); (2) Đăng ký công tác; (3) Làm việc theo PCT hoặc LCT; (4) Cho phép làm việc tại hiện trường; (5) Giám sát an toàn trong thời gian làm việc.",
      "(1) Cắt điện và ngăn chặn có điện trở lại nơi làm việc; (2) Đăng ký công tác; (3) Làm việc theo PCT hoặc LCT; (4) Cho phép làm việc tại hiện trường; (5) Giám sát an toàn trong thời gian làm việc; (6) Kiểm tra không còn điện; (7) Đặt nối đất.",
      "(1) Khảo sát, lập biên bản hiện trường, lập phương án thi công và biện pháp an toàn (nếu cần thiết); (2) Kiểm tra không còn điện; (3) Làm việc theo PCT hoặc LCT; (4) Cho phép làm việc tại hiện trường; (5) Giám sát an toàn trong thời gian làm việc.",
      "(1) Khảo sát, lập biên bản hiện trường, lập phương án thi công và biện pháp an toàn (nếu cần thiết); (2) Đăng ký công tác; (3) Đặt rào chắn; treo biển báo, tín hiệu. Nếu cắt điện hoàn toàn thì không phải làm rào chắn; (4) Giám sát an toàn trong thời gian làm việc."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 187
  },
  {
    "question": "Khoảng cách an toàn điện khi không có rào chắn đối với cấp điện áp từ 1 kV đến 15 kV là bao nhiêu m?",
    "options": [
      "0,3 m.",
      "0,7 m.",
      "0,4 m.",
      "0,5 m."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 188
  },
  {
    "question": "Khoảng cách an toàn điện khi không có rào chắn đối với cấp điện áp từ trên 15 kV đến 35 kV là bao nhiêu m ?",
    "options": [
      "0,5 m.",
      "0,6 m.",
      "1,0 m.",
      "0,7 m."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 189
  },
  {
    "question": "Khoảng cách an toàn điện khi không có rào chắn đối với cấp điện áp 220 kV là bao nhiêu m ?",
    "options": [
      "0,7 m.",
      "1,0 m.",
      "1,5 m.",
      "2,5 m."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 190
  },
  {
    "question": "Khi phải làm rào chắn thì Khoảng cách nhỏ nhất từ rào chắn đến phần mang điện đối với cấp điện áp từ 1 kV đến 15 kV là bao nhiêu m?",
    "options": [
      "0,35 m.",
      "0,1 m",
      "0,2 m.",
      "0,3 m."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 191
  },
  {
    "question": "Khi phải làm rào chắn thì Khoảng cách nhỏ nhất từ rào chắn đến phần mang điện đối với cấp điện áp trên 15 kV đến 35 kV là bao nhiêu m?",
    "options": [
      "0,2 m.",
      "0,6 m.",
      "0,4 m.",
      "0,5 m"
    ],
    "correct": 1,
    "category": "ATD",
    "id": 192
  },
  {
    "question": "Khi phải làm rào chắn thì Khoảng cách nhỏ nhất từ rào chắn đến phần mang điện đối với cấp điện áp 220 kV là bao nhiêu m?",
    "options": [
      "1,0 m.",
      "2,0 m.",
      "2,5 m.",
      "0,7 m."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 193
  },
  {
    "question": "Các yêu cầu khi cắt điện để làm công việc nào sau đây là đúng?",
    "options": [
      "Nếu cắt điện bằng máy cắt và dao cách ly có bộ truyền động điều khiển từ xa thì phải khoá mạch điều khiển các thiết bị này, bao gồm: cắt aptomat, gỡ cầu chì,...",
      "Người thao tác phải treo biển: “Cấm đóng điện! Có người đang làm việc” ở các bộ phận truyền động của các máy cắt, dao cách ly,... mà từ đó có thể đóng điện đến nơi làm việc.",
      "Cắt điện từng phần để làm việc phải giao cho người chỉ huy trực tiếp đơn vị công tác để ngăn ngừa khả năng nhầm lẫn, gây nguy hiểm cho đơn vị công tác.",
      "Phải ngăn chặn được những nguồn điện cao, hạ áp qua các máy biến áp lực, máy biến áp đo lường, máy phát điện khác có điện ngược trở lại gây nguy hiểm cho thiết bị đang vận hành."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 194
  },
  {
    "question": "Anh chị hãy chỉ ra yêu cầu khi cắt điện để làm công việc nào sau đây là đúng?",
    "options": [
      "Nếu cắt điện bằng máy cắt và dao cách ly có bộ truyền động điều khiển từ xa thì không được khoá mạch điều khiển các thiết bị này, bao gồm: cắt aptomat, gỡ cầu chì,...",
      "Người thao tác phải treo biển: “Cấm đóng điện! Có người đang làm việc” ở các bộ phận truyền động của các máy cắt, dao cách ly,... mà từ đó có thể đóng điện đến nơi làm việc.",
      "Cắt điện từng phần để làm việc phải giao cho người chỉ huy trực tiếp đơn vị công tác để ngăn ngừa khả năng nhầm lẫn, gây nguy hiểm cho đơn vị công tác.",
      "Phải ngăn chặn được những nguồn điện cao, hạ áp qua các máy biến áp lực, máy biến áp đo lường, máy phát điện khác có điện ngược trở lại gây nguy hiểm cho người làm việc."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 195
  },
  {
    "question": "Ai là người phải treo biển “Cấm đóng điện! Có người đang làm việc” ở các bộ phận truyền động của các máy cắt, dao cách ly...?",
    "options": [
      "Người thao tác.",
      "Người giám sát thao tác.",
      "Người chỉ huy trực tiếp đơn vị công tác.",
      "Nhân viên đơn vị công tác."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 196
  },
  {
    "question": "Người nào phải tiến hành kiểm tra không còn điện ở các thiết bị đã cắt điện?",
    "options": [
      "Nhân viên đơn vị công tác",
      "Người giám sát thao tác",
      "Người thực hiện thao tác cắt điện",
      "Người chỉ huy trực tiếp đơn vị công tác"
    ],
    "correct": 2,
    "category": "ATD",
    "id": 197
  },
  {
    "question": "Khi kiểm tra không còn điện ở thiết bị đã được cắt điện, việc gì sau đây bị cấm?",
    "options": [
      "Cấm Người thực hiện thao tác cắt điện tiến hành kiểm tra không còn điện ở các thiết bị đã cắt điện.",
      "Cấm kiểm tra không còn điện bằng thiết bị thử điện chuyên dùng phù hợp với điện áp danh định của thiết bị cần thử.",
      "Cấm căn cứ tín hiệu đèn, rơ le, đồng hồ để xác nhận thiết bị không còn điện, nhưng nếu đèn, rơ le, đồng hồ báo tín hiệu có điện thì phải xem như thiết bị vẫn có điện.",
      "Cấm dùng bút thử điện, còi thử điện để thử không còn điện ở tất cả các pha và các phía vào, ra của thiết bị."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 198
  },
  {
    "question": "Nơi làm việc có cắt điện, vị trí nối đất phải thực hiện như thế nào:",
    "options": [
      "Phải nối đất ngay sau khi kiểm tra không còn điện; Nối đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến; Đảm bảo khoảng cách an toàn đối với phần còn mang điện; Đảm bảo cho toàn bộ đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất.",
      "Phải nối đất ngay sau khi cắt điện; Nối đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến; Đảm bảo khoảng cách an toàn đối với phần còn mang điện; Đảm bảo cho toàn bộ đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất.",
      "Phải nối đất ngay sau khi cắt điện; Nối đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến; Đảm bảo khoảng cách an toàn đối với phần còn mang điện; Đảm bảo cho toàn bộ đơn vị công tác nằm ngoài vùng bảo vệ của nối đất.",
      "Phải nối đất ngay sau khi kiểm tra không còn điện; Nối đất ở tất cả các pha của thiết bị về phía có khả năng dẫn điện đến; Đảm bảo khoảng cách an toàn đối với phần đã cắt điện; Đảm bảo cho toàn bộ đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 199
  },
  {
    "question": "Trách nhiệm của việc nối đất tạo vùng an toàn khi làm việc được quy định như thế nào cho đúng?",
    "options": [
      "Tại hiện trường làm việc, người cho phép tổ chức thực hiện việc nối đất tạo vùng làm việc, người chỉ huy trực tiếp chịu trách nhiệm tổ chức thực hiện nối đất di động. Người cho phép và người chỉ huy trực tiếp phải khẳng định rõ các vị trí đã nối đất để tạo vùng an toàn sao cho đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất.",
      "Tại hiện trường làm việc, người cho phép tổ chức thực hiện việc nối đất di động, người chỉ huy trực tiếp chịu trách nhiệm tổ chức thực hiện nối đất tạo vùng làm việc. Người cho phép và người chỉ huy trực tiếp phải khẳng định rõ các vị trí đã nối đất để tạo vùng an toàn sao cho đơn vị công tác nằm trọn trong vùng bảo vệ của nối đất.",
      "Tại hiện trường làm việc, người cho phép tổ chức thực hiện việc nối đất tạo vùng làm việc, người chỉ huy trực tiếp chịu trách nhiệm tổ chức thực hiện nối đất di động. Người cho phép và người chỉ huy trực tiếp phải khẳng định rõ các vị trí đã nối đất để tạo vùng an toàn sao cho đơn vị công tác nằm ngoài vùng bảo vệ của nối đất.",
      "Tại hiện trường làm việc, người cho phép tổ chức thực hiện việc nối đất di động, người chỉ huy trực tiếp chịu trách nhiệm tổ chức thực hiện nối đất tạo vùng làm việc. Người cho phép và người chỉ huy trực tiếp phải khẳng định rõ các vị trí đã nối đất để tạo vùng an toàn sao cho đơn vị công tác nằm ngoài vùng bảo vệ của nối đất."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 200
  },
  {
    "question": "Các nối đất tạo vùng an toàn khi làm việc chỉ được tháo dỡ khi có sự đồng ý của ai?",
    "options": [
      "Của người chỉ huy trực tiếp.",
      "Của nhân viên đơn vị công tác.",
      "Của người cho phép làm việc.",
      "Của người cấp Phiếu công tác."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 201
  },
  {
    "question": "Đặt và tháo nối đất phải do mấy người thực hiện?",
    "options": [
      "Phải do 02 người thực hiện, trong đó một người phải có bậc an toàn điện từ bậc 4 trở lên, người còn lại từ bậc 2 trở lên.",
      "Phải do 01 người thực hiện, người đó phải có bậc 4 an toàn điện trở lên.",
      "Phải do 02 người thực hiện, hai người này phải có bậc an toàn điện từ bậc 3 trở lên.",
      "Phải do 02 người thực hiện, trong đó một người phải có bậc an toàn điện từ bậc 4 trở lên, người còn lại từ bậc 3 trở lên."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 202
  },
  {
    "question": "Khi đặt nối đất phải thực hiện như thế nào cho đúng?",
    "options": [
      "Khi đặt nối đất phải lắp một đầu dây nối đất với đất trước, sau đó lắp đầu còn lại vào thiết bị, đường dây; tháo nối đất làm theo trình tự ngược lại. Khi lắp/tháo nối đất di động người lắp/tháo phải dùng sào và găng cách điện.",
      "Khi đặt nối đất phải lắp một đầu dây nối đất với thiết bị trước, sau đó lắp đầu còn lại vào đất; tháo nối đất làm theo trình tự ngược lại. Khi lắp/tháo nối đất di động người lắp/tháo phải dùng sào và găng cách điện.",
      "Khi đặt nối đất phải lắp một đầu dây nối đất với đất trước, sau đó lắp đầu còn lại vào thiết bị, đường dây; tháo nối đất làm theo trình tự ngược lại. Khi lắp/tháo nối đất di động người lắp/tháo phải dùng sào và găng tay bảo hộ lao động.",
      "Khi đặt nối đất phải lắp một đầu dây nối đất với đất trước, sau đó lắp đầu còn lại vào thiết bị, đường dây; tháo nối đất làm theo trình tự như lắp nối đất. Khi lắp/tháo nối đất di động người lắp/tháo phải dùng đầy đủ bảo hộ lao động."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 203
  },
  {
    "question": "Việc nối đất di động do ai chịu trách nhiệm thực hiện?",
    "options": [
      "Người cho phép làm việc.",
      "Người cấp PCT.",
      "Người ra Lệnh công tác.",
      "Người chỉ huy trực tiếp."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 204
  },
  {
    "question": "Đối với lưới điện phân phối, theo quy định tiết diện dây nối đất di động là bao nhiêu mm2 ?",
    "options": [
      "Không được nhỏ hơn 16 mm2.",
      "Không được nhỏ hơn 15 mm2.",
      "Không được nhỏ hơn 10 mm2.",
      "Không được nhỏ hơn 6 mm2."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 205
  },
  {
    "question": "Ở bộ phận truyền động của máy cắt, dao cách ly mà từ đó đóng điện đến nơi làm việc phải treo biển gì ?",
    "options": [
      "Treo biển “Dừng lại! Có điện nguy hiểm chết người”.",
      "Treo biển “Cấm đóng điện! Có người đang làm việc”.",
      "Treo biển “Cấm lại gần! Có điện nguy hiểm chết người”.",
      "Treo biển “Cấm vào! Điện áp cao nguy hiểm chết người\"."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 206
  },
  {
    "question": "Trong Phiếu công tác bao gồm những chức danh nào sau đây?",
    "options": [
      "(1) Người cấp Phiếu công tác; (2) Người Lãnh đạo công việc; (3) Người chỉ huy trực tiếp; (4) Người cho phép làm việc; (5) Người giám sát an toàn điện; (6) Nhân viên đơn vị công tác.",
      "(1) Người cấp Phiếu công tác; (2) Người ra lện công tác; (3) Người chỉ huy trực tiếp; (4) Người cho phép làm việc; (5) Người giám sát an toàn điện; (6) Nhân viên đơn vị công tác.",
      "(1) Người cấp Phiếu công tác; (2) Người Lãnh đạo việc; (3) Người chỉ huy trực tiếp; (4) Người cho phép làm việc; (5) Người giám sát an toàn điện; (6) Người nhận lệnh công tác.",
      "(1) Người cấp Phiếu công tác; (2) Người Lãnh đạo việc; (3) Người ra lệnh công tác; (4) Người cho phép làm việc; (5) Người nhận lệnh công tác; (6) Nhân viên đơn vị công tác."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 207
  },
  {
    "question": "Đối với công việc phải khảo sát hiện trường thì Đơn vị làm công việc phải cử ai đi khảo sát hiện trường?",
    "options": [
      "Người đi khảo sát phải là những người sẽ được cử làm người cho phép làm việc hoặc người cấp Phiếu công tác (nếu có).",
      "Người đi khảo sát phải là những người sẽ được cử làm người chỉ huy trực tiếp hoặc người giám sát an toàn điện (nếu có).",
      "Người đi khảo sát phải là những người sẽ được cử làm nhân viên đơn vị công tác hoặc người thao tác thiết bị điện (nếu có).",
      "Người đi khảo sát phải là những người sẽ được cử làm người giám sát thao tác hoặc nhân viên vận hành quản lý thiết bị (nếu có)."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 208
  },
  {
    "question": "Thời gian hiệu lực của PCT được quy định như thế nào là đúng?",
    "options": [
      "Thời gian hiệu lực của PCT do người lãnh đạo công việc ghi nhưng không quá 30 ngày",
      "Thời gian hiệu lực của PCT do người cấp phiếu ghi nhưng không quá 30 ngày",
      "Thời gian hiệu lực của PCT do người cấp phiếu ghi nhưng không quá 35 ngày",
      "Thời gian hiệu lực của PCT do người cấp phiếu ghi nhưng không quá 40 ngày"
    ],
    "correct": 1,
    "category": "ATD",
    "id": 209
  },
  {
    "question": "Phiếu công tác được cấp như thế nào?",
    "options": [
      "Mỗi PCT chỉ được cấp cho 01 đơn vị công tác cho 02 công việc.",
      "Mỗi PCT chỉ được cấp cho 01 đơn vị công tác cho 03 công việc.",
      "Mỗi PCT chỉ được cấp cho 01 đơn vị công tác cho 01 công việc.",
      "Mỗi PCT chỉ được cấp cho 02 đơn vị công tác cho 01 công việc."
    ],
    "correct": 2,
    "category": "ATD",
    "id": 210
  },
  {
    "question": "Trong khi tiến hành công việc theo PCT, có được tự ý mở rộng phạm vi làm việc không? Nếu mở rộng phạm vi làm việc thì phải thực hiện như thế nào cho đúng?",
    "options": [
      "Trong khi tiến hành công việc theo PCT, không được tự ý mở rộng phạm vi làm việc. Nếu mở rộng phạm vi làm việc thì phải cấp LCT.",
      "Trong khi tiến hành công việc theo PCT được tự ý mở rộng phạm vi làm việc, Nếu mở rộng phạm vi làm việc thì phải bổ sung thêm nhân viên đơn vị công tác.",
      "Trong khi tiến hành công việc theo PCT,  được tự ý mở rộng phạm vi làm việc. Nếu mở rộng phạm vi làm việc thì không phải cấp PCT mới.",
      "Trong khi tiến hành công việc theo PCT, không được tự ý mở rộng phạm vi làm việc. Nếu mở rộng phạm vi làm việc thì phải cấp PCT mới."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 211
  },
  {
    "question": "Sau khi hoàn thành công việc, PCT được quản lý như thế nào?",
    "options": [
      "Sau khi hoàn thành công việc, PCT được trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 15 ngày (kể cả những phiếu đã cấp nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, PCT được trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 20 ngày (kể cả những phiếu đã cấp nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, PCT được trả cho người chỉ huy trực tiếp, lưu giữ ít nhất 30 ngày (kể cả những phiếu đã cấp nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, PCT được trả lại người cấp phiếu để kiểm tra, lưu giữ ít nhất 01 tháng (kể cả những phiếu đã cấp nhưng không thực hiện)"
    ],
    "correct": 3,
    "category": "ATD",
    "id": 212
  },
  {
    "question": "Sau khi hoàn thành công việc, LCT phải được lưu giữ trong thời gian bao lâu?",
    "options": [
      "Sau khi hoàn thành công việc, LCT phải được lưu giữ ít nhất 01 tháng (kể cả những lệnh đã ban hành nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, LCT phải được lưu giữ ít nhất 15 ngày (kể cả những lệnh đã ban hành nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, LCT phải được lưu giữ ít nhất 20 ngày (kể cả những lệnh đã ban hành nhưng không thực hiện)",
      "Sau khi hoàn thành công việc, LCT phải được lưu giữ trong thời gian 25 ngày (kể cả những lệnh đã ban hành nhưng không thực hiện)"
    ],
    "correct": 0,
    "category": "ATD",
    "id": 213
  },
  {
    "question": "Các công việc thực hiện theo PCT bao gồm những công việc nào?",
    "options": [
      "Làm việc cắt điện hoàn toàn; Làm việc có điện; Làm việc ở gần phần có điện.",
      "Làm việc cắt điện hoàn toàn; Làm việc có điện; Làm việc ở gần phần có điện; Làm việc ở xa nơi có điện.",
      "Làm việc cắt điện hoàn toàn; Làm việc có điện; Làm việc ở gần phần có điện; Xử lý sự cố thiết bị do nhân viên vận hành thực hiện trong ca.",
      "Làm việc cắt điện hoàn toàn; Làm việc có điện; Làm việc ở gần phần có điện; Công việc không cần phải thực hiện các biện pháp kỹ thuật chuẩn bị vị trí làm việc."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 214
  },
  {
    "question": "Những công việc sau đây, các công việc được phép thực hiện theo LCT ?",
    "options": [
      "(1) Làm việc cắt điện hoàn toàn; (2) Làm việc có điện; (3) Làm việc ở gần phần có điện .",
      "(1) Làm việc ở xa nơi có điện; (2) Xử lý sự cố thiết bị, đường dây do nhân viên vận hành thực hiện trong ca trực, hoặc những người khác thực hiện dưới sự giám sát của nhân viên vận hành.",
      "(1) Làm việc có điện; (2) Làm việc ở thiết bị, đường dây điện cao áp trong một số trường hợp do cấp có thẩm quyền của đơn vị quản lý thiết bị, đường dây quyết định.",
      "(1) Xử lý sự cố thiết bị, đường dây do nhân viên đơn vị công tác thực hiện trong ca trực; (2) Làm việc cắt điện hoàn toàn."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 215
  },
  {
    "question": "Theo Quy trình an toàn điện trong 01 PCT, 01 người được phép đảm nhận 02 chức danh nào sau đây?",
    "options": [
      "Người cấp phiếu công tác, Người Lãnh đạo công việc hoặc Người Lãnh đạo công việc, Người giám sát an toàn điện (nếu có)",
      "Người cấp phiếu công tác, Nhân viên đơn vị công tác hoặc Nhân viên đơn vị công tác, Người giám sát an toàn điện (nếu có)",
      "Người cấp phiếu công tác, Người chỉ huy trực tiếp hoặc Người cấp phiếu công tác, Người giám sát an toàn điện (nếu có)",
      "Người cấp phiếu công tác, Người Lãnh đạo công việc hoặc Người cấp phiếu công tác, Nhân viên đơn vị công tác"
    ],
    "correct": 2,
    "category": "ATD",
    "id": 216
  },
  {
    "question": "Theo Quy trình an toàn điện trong 01 PCT, 01 người được phép đảm nhận nhiều nhất 03 chức danh nào sau đây?",
    "options": [
      "Người cấp phiếu công tác, Người Lãnh đạo công việc, Người giám sát an toàn điện (nếu có).",
      "Người cấp phiếu công tác, Nhân viên đơn vị công tác, Người giám sát an toàn điện (nếu có).",
      "Người cấp phiếu công tác, Người giám sát thao tác, Người giám sát an toàn điện (nếu có).",
      "Người cấp phiếu công tác, Người cho phép, Người giám sát an toàn điện (nếu có)."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 217
  },
  {
    "question": "Lệnh công tác có các chức danh nào sau đây?",
    "options": [
      "(1) Người ra LCT (2) Người giám sát an toàn điện (3) Người chỉ huy trực tiếp (khi tổ chức thành đơn vị công tác), Người thi hành lệnh (khi thực hiện công việc một mình) (4) Nhân viên đơn vị công tác.",
      "(1) Người ra LCT (2) Người cấp Phiếu công tác (3) Người chỉ huy trực tiếp (khi tổ chức thành đơn vị công tác), Người thi hành lệnh (khi thực hiện công việc một mình) (4) Nhân viên đơn vị công tác.",
      "(1) Người ra LCT (2) Người cho phép làm việc (3) Người chỉ huy trực tiếp (khi tổ chức thành đơn vị công tác), Người thi hành lệnh (khi thực hiện công việc một mình) (4) Nhân viên đơn vị công tác.",
      "(1) Người ra LCT (2) Người cho phép làm việc (3) Người chỉ huy trực tiếp (khi tổ chức thành đơn vị công tác), Người thi hành lệnh (khi thực hiện công việc một mình) (4) Người cấp Phiếu công tác."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 218
  },
  {
    "question": "Người cấp PCT phải có bậc an toàn điện là bao nhiêu?",
    "options": [
      "Có bậc 5 an toàn điện",
      "Có bậc 4 an toàn điện",
      "Có bậc 3 an toàn điện",
      "Có bậc 6 an toàn điện."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 219
  },
  {
    "question": "Theo quy trình An toàn điện, Người cấp PCT phải đáp ứng yêu cầu nào sau đây mới được làm Người cấp PCT?",
    "options": [
      "Người cấp PCT phải là người của đơn vị quản lý vận hành; phải biết được nội dung công việc, điều kiện đảm bảo an toàn điện để đề ra đủ, đúng các biện pháp an toàn về điện cho đơn vị công tác. Có bậc 5 an toàn điện và được công nhận chức danh “Người cấp phiếu công tác”.",
      "Người cấp PCT phải là người của đơn vị làm công việc; phải biết được nội dung công việc, điều kiện đảm bảo an toàn điện để đề ra đủ, đúng các biện pháp an toàn về điện cho đơn vị công tác. Có bậc 5 an toàn điện và được công nhận chức danh “Người cấp phiếu công tác”.",
      "Người cấp PCT phải là người của đơn vị quản lý vận hành; phải biết được nội dung công việc, điều kiện đảm bảo an toàn điện để đề ra đủ, đúng các biện pháp an toàn về điện cho đơn vị công tác. Có bậc 4 an toàn điện và được công nhận chức danh “Người cấp phiếu công tác”.",
      "Người cấp PCT phải là người của đơn vị quản lý vận hành; phải biết được nội dung công việc, điều kiện đảm bảo an toàn điện để đề ra đủ, đúng các biện pháp an toàn về điện cho đơn vị công tác. Có bậc 5 an toàn điện và được công nhận chức danh “Người ra lệnh công tác”."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 220
  },
  {
    "question": "Tại nhà máy điện những ai được cấp Phiếu công tác?",
    "options": [
      "Tại các nhà máy điện, PCT do Quản đốc, Phó Quản đốc, Chuyên viên kỹ thuật cấp. Trưởng ca đương nhiệm cấp PCT trong trường hợp người cấp PCT vắng mặt, công việc đột xuất hoặc khi sự cố.",
      "Tại các nhà máy điện, PCT do Quản đốc, Phó Quản đốc, Kỹ thuật viên phân xưởng quản lý vận hành thiết bị cấp. Trưởng kíp điện đương nhiệm cấp PCT trong trường hợp người cấp PCT vắng mặt, công việc đột xuất hoặc khi sự cố.",
      "Tại các nhà máy điện, PCT do Quản đốc, Phó Quản đốc, Kỹ thuật viên phân xưởng sửa chữa thiết bị cấp. Trưởng ca đương nhiệm cấp PCT trong trường hợp người cấp PCT vắng mặt, công việc đột xuất hoặc khi sự cố.",
      "Tại các nhà máy điện, PCT do Quản đốc, Phó Quản đốc, Kỹ thuật viên phân xưởng quản lý vận hành thiết bị cấp. Trưởng ca đương nhiệm cấp PCT trong trường hợp người cấp PCT vắng mặt, công việc đột xuất hoặc khi sự cố."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 221
  },
  {
    "question": "Điều kiện để làm người cho phép là điều kiện nào sau đây?",
    "options": [
      "Người cho phép phải là nhân viên đơn vị công tác đang làm nhiệm vụ trong ca trực. Có bậc 4 an toàn điện trở lên và được công nhận chức danh “Người cho phép”.",
      "Người cho phép phải là nhân viên vận hành đang làm nhiệm vụ trong ca trực. Có bậc 4 an toàn điện trở lên và được công nhận chức danh “Người cho phép”.",
      "Người cho phép phải là nhân viên vận hành đang làm nhiệm vụ trong ca trực. Có bậc 3 an toàn điện trở lên và được công nhận chức danh “Người cho phép”.",
      "Người cho phép phải là nhân viên vận hành đang làm nhiệm vụ trong ca trực. Có bậc 5 an toàn điện trở lên và được công nhận chức danh “Người chỉ huy trực tiếp”."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 222
  },
  {
    "question": "Trách nhiệm của Người cho phép là:",
    "options": [
      "Chịu trách nhiệm phối hợp hoạt động của các đơn vị công tác, khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện theo các PCT để đảm bảo an toàn.",
      "Kiểm tra (hoặc thực hiện nếu được người cấp phiếu giao) việc thực hiện đủ, đúng các biện pháp an toàn tại hiện trường thuộc trách nhiệm của mình để chuẩn bị chỗ làm việc cho đơn vị công tác.",
      "Có mặt liên tục tại nơi làm việc, giám sát và có biện pháp để nhân viên đơn vị công tác không thực hiện những hành vi có thể gây tai nạn trong quá trình làm việc.",
      "Chấp hành nghiêm nhiệm vụ được phân công và có trách nhiệm tự bảo vệ để đảm bảo an toàn khi làm việc. Từ chối thực hiện công việc khi thấy không đảm bảo an toàn, nếu người chỉ huy trực tiếp không chấp thuận thì báo cáo lên cấp trên để giải quyết."
    ],
    "correct": 1,
    "category": "ATD",
    "id": 223
  },
  {
    "question": "Người cho phép, Người chỉ huy trực tiếp, Người giám sát an toàn điện phải có bậc an toàn điện là bậc mấy?",
    "options": [
      "Bậc 2 an toàn điện.",
      "Không quy định bậc an toàn điện.",
      "Bậc 4 an toàn điện trở lên.",
      "Bậc 3 an toàn điện trở lên"
    ],
    "correct": 2,
    "category": "ATD",
    "id": 224
  },
  {
    "question": "Người lãnh đạo công việc, Người cấp PCT, Người ra LCT phải có bậc an toàn điện là bậc mấy?",
    "options": [
      "Bậc 5 an toàn điện.",
      "Không quy định bậc an toàn điện.",
      "Bậc 4 an toàn điện trở lên.",
      "Bậc 3 an toàn điện trở lên."
    ],
    "correct": 0,
    "category": "ATD",
    "id": 225
  },
  {
    "question": "Anh/ chị hãy chỉ ra đâu là trách nhiệm của Người lãnh đạo công việc?",
    "options": [
      "Chịu trách nhiệm phối hợp hoạt động của các đơn vị công tác, khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện theo các PCT để đảm bảo an toàn.",
      "Có mặt liên tục tại nơi làm việc, giám sát và có biện pháp để nhân viên đơn vị công tác không thực hiện những hành vi có thể gây tai nạn trong quá trình làm việc",
      "Kiểm tra (hoặc thực hiện nếu được người cấp phiếu giao) việc thực hiện đủ, đúng các biện pháp an toàn tại hiện trường thuộc trách nhiệm của mình để chuẩn bị chỗ làm việc cho đơn vị công tác",
      "Chỉ huy điều hành đơn vị công tác thực hiện các công việc trong phạm vi cho phép làm việc theo PCT, bao gồm việc thực hiện các thủ tục, biện pháp an toàn nơi làm việc thuộc trách nhiệm của đơn vị công tác"
    ],
    "correct": 0,
    "category": "ATD",
    "id": 226
  },
  {
    "question": "Người ra LCT phải có bậc mấy an toàn điện?",
    "options": [
      "Bậc 4 an toàn điện",
      "Bậc 3 an toàn điện",
      "Bậc 2 an toàn điện",
      "Bậc 5 an toàn điện"
    ],
    "correct": 3,
    "category": "ATD",
    "id": 227
  },
  {
    "question": "Anh/ chỉ hãy chỉ ra đâu là trách nhiệm của Người ra LCT trong đáp án sau?",
    "options": [
      "Có mặt liên tục tại nơi làm việc, giám sát và có biện pháp để nhân viên đơn vị công tác không thực hiện những hành vi có thể gây tai nạn trong quá trình làm việc.",
      "Kiểm tra (hoặc thực hiện nếu được người cấp phiếu giao) việc thực hiện đủ, đúng các biện pháp an toàn tại hiện trường thuộc trách nhiệm của mình để chuẩn bị chỗ làm việc cho đơn vị công tác.",
      "Chịu trách nhiệm phối hợp hoạt động của các đơn vị công tác, khi công việc do nhiều đơn vị công tác của cùng một tổ chức hoạt động điện lực thực hiện theo các PCT để đảm bảo an toàn.",
      "Tiếp nhận báo cáo kết quả, thời gian hoàn thành sau khi thực hiện xong công việc từ người chỉ huy trực tiếp (hoặc người thi hành lệnh) và ghi vào sổ LCT theo quy định."
    ],
    "correct": 3,
    "category": "ATD",
    "id": 228
  },
  {
    "question": "Theo Quy trình An toàn điện quy định nối đất khi làm việc trong ngăn tủ phân phối như  thế nào?",
    "options": [
      "Phải nối đất ở thanh cái và xuất tuyến của ngăn này. Không cho phép làm việc trong ngăn tủ phân phối khi hàm tĩnh trên hoặc dưới ngăn tủ này chưa được nối đất.",
      "Phải đặt 02 bộ tiếp đât ở 02 vị trí liền kề gần nhất vị trí làm việc.",
      "Cho phép đặt nối đất ở đầu có nguồn cung cấp đến, đầu còn lại phải mở thiết bị đóng cắt.",
      "Cho phép làm việc trong ngăn tủ phân phối khi hàm tĩnh trên hoặc dưới ngăn tủ này đã được cắt điện."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 229
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định về kiểm tra không còn điện đối với thiết bị điện tại nhà máy điện, trạm điện, GIS, tủ hợp bộ hoặc thiết bị kiểu kín như thế nào?",
    "options": [
      "Cho phép kiểm tra không còn điện thông qua chỉ thị tại chỗ thiết bị đóng cắt (3 pha, tất cả các phía) và thông số điện áp (nếu có)",
      "Không cho phép căn cứ vào tín hiệu , đèn, đồng hồ, rơ le...",
      "Dùng sào gõ nhẹ vào đường dây, thanh cái...",
      "Cả 03 đáp án đều sai"
    ],
    "correct": 0,
    "category": "TBA",
    "id": 230
  },
  {
    "question": "Theo Quy trình An toàn điện quy định biện pháp an toàn cụ thể khi thao tác MC là ?",
    "options": [
      "Phải có kế hoạch và phương án kỹ thuật thi công",
      "Mọi thao tác đóng cắt máy cắt phải điều khiển từ xa. Cấm ấn nút thao tác ở ngay hộp điều khiển tại máy cắt khi đang có điện (trừ sự cố hoặc tai nạn).",
      "Phải có PCT; phải cắt các cầu dao cách ly trước và sau máy ngắt.Treo biển: “Cấm đóng điện! Có người đang làm việc ” vào khoá điều khiển máy ngắt.",
      "Phải có PTT và tiếp đất di động hai phía MC."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 231
  },
  {
    "question": "Theo Quy trình An toàn điện quy định nào không đúng (không phù hợp) trong biện pháp an toàn khi làm việc ở MC hợp bộ?",
    "options": [
      "Cho phép vào làm việc trong khoang ngăn MC khi còn điện hàm trên hoặc hàm dưới nhưng phải cử người GSATĐ.",
      "Không cho phép vào làm việc trong khoang ngăn MC nếu vẫn có điện hàm trên hoặc hàm dưới.",
      "Phải đóng và khóa cánh cửa tủ ngăn MC đó sau khi kéo MC ra ngoài.",
      "Treo biển “Cấm vào! Điện cao áp nguy hiểm chết người” cả phía trước và phía sau tủ máy cắt."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 232
  },
  {
    "question": "Theo Quy trình An toàn điện thì điều nào sau đây không cấm khi thao tác và vận hành tụ điện?",
    "options": [
      "Cấm dùng dao cách ly để đóng, cắt các tụ điện cao áp và lấy mẫu dầu khi tụ điện đang vận hành.",
      "Khi cắt tụ điện để sửa chữa thì phải phóng điện (xả điện tích) các tụ điện theo quy định, quy trình của Đơn vị QLVH.",
      "Cấm đặt tụ điện chung với TBA trong mọi trường hợp",
      "Khi phóng điện tích dư của tụ điện phải có điện trở hạn chế, sau đó mới phóng trực tiếp xuống đất để tránh hư hỏng tụ."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 233
  },
  {
    "question": "Theo Quy trình An toàn điện việc đóng và cắt các tụ điện cao áp được quy định như thế nào?",
    "options": [
      "Cấm dùng dao cách ly để đóng, cắt các tụ điện cao áp và lấy mẫu dầu khi tụ điện đang vận hành.",
      "Do hai người thực hiện. Có thể dùng dao cách ly để đóng, cắt các tụ điện cao áp.",
      "Do hai người có bậc ATĐ từ 4/5 trở lên thực hiện. Dùng dao cách ly để đóng, cắt các tụ điện cao áp và lấy mẫu dầu khi tụ điện đang vận hành.",
      "Do hai người thực hiện. Cấm dùng dao cách ly để đóng, cắt các tụ điện cao áp. Cho phép lấy mẫu dầu khi tụ điện đang vận hành."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 234
  },
  {
    "question": "Theo Quy trình An toàn điện thì trạm điện không người trực là ?",
    "options": [
      "Trạm điện mà nơi đó không có người trực vận hành tại chỗ. Việc theo dõi, giám sát các thông số vận hành, tình trạng thiết bị và thao tác các thiết bị điện được thực hiện tại chỗ do Đội TTLĐ thực hiện qua hệ thống điều khiển và hệ thống thông tin, viễn thông.",
      "Trạm điện mà nơi đó không có người trực vận hành tại chỗ. Việc thao tác các thiết bị điện được thực hiện từ Đội TTLĐ qua hệ thống điều khiển và hệ thống thông tin, viễn thông.",
      "Trạm điện mà nơi đó không có người trực vận hành tại chỗ. Việc theo dõi, giám sát các thông số vận hành, tình trạng thiết bị và thao tác các thiết bị điện được thực hiện từ xa qua Đội TTLĐ.",
      "Trạm điện mà nơi đó không có người trực vận hành tại chỗ. Việc theo dõi, giám sát các thông số vận hành, tình trạng thiết bị và thao tác các thiết bị điện được thực hiện từ xa."
    ],
    "correct": 3,
    "category": "TBA",
    "id": 235
  },
  {
    "question": "Theo Quy trình An toàn điện thì kiểm tra định kỳ tuần trạm điện không người trực (ít nhất 01 lần/tuần) bao gồm những nội dung gì?",
    "options": [
      "Do Nhân viên trực thao tác lưu động kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác.",
      "Do Nhân viên kỹ thuật của đơn vị kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác C. Do Trạm trưởng TBA 110kV kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác D. Do Đội trưởng Đội QLVH LĐCT kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "TBA",
    "id": 236
  },
  {
    "question": "Theo Quy trình An toàn điện thì kiểm tra định kỳ tháng trạm điện không người trực (ít nhất 01 lần/tháng) bao gồm những nội dung gì?",
    "options": [
      "Do Nhân viên kỹ thuật của đơn vị kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác",
      "Do Nhân viên trực thao tác lưu động kiểm tra phát nhiệt, phóng điện bề mặt cách điện.",
      "Do Trạm trưởng TBA 110kV kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác D. Do Đội trưởng Đội QLVH LĐCT kiểm tra tình trạng vận hành, phát hiện những bất thường của các hệ thống thiết bị điện, hệ thống chữa cháy, các hệ thống phụ trợ khác",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 237
  },
  {
    "question": "Theo Quy trình An toàn điện thì khi ghi chữ công tơ trong TBA, điều nào sau đây không đúng quy định ?",
    "options": [
      "Khi ghi chữ công tơ phải thực hiện theo LCT.",
      "Chỉ được đọc bằng mắt và ghi số. Không được đụng chạm đến thiết bị khác và phải ghi sổ nhật ký.",
      "Không được vào TBA ghi chữ công tơ khi trạm đang vận hành trong mọi trường hợp.",
      "Được phép vào buồng cao áp và những nơi có bộ phận dẫn điện trên cao hoặc che kín."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 238
  },
  {
    "question": "Theo Quy trình An toàn điện quy định về phối hợp vận hành đối với trạm điện không người trực như thế nào?:",
    "options": [
      "Cấp điều độ có quyền kiểm tra có trách nhiệm xây dựng và thống nhất quy trình phối hợp vận hành trạm điện KNT để hướng dẫn nhân viên vận hành trong thao tác và xử lý sự cố.",
      "ĐVQLVH có trách nhiệm xây dựng và thống nhất quy trình phối hợp vận hành trạm điện KNT để hướng dẫn nhân viên vận hành trong thao tác và xử lý sự cố.",
      "ĐVQLVH và cấp điều độ có quyền điều khiển có trách nhiệm xây dựng và thống nhất quy trình phối hợp vận hành trạm điện KNT để hướng dẫn nhân viên vận hành trong thao tác và xử lý sự cố.",
      "ĐVQLVH và cấp điều độ có quyền nắm thông tin và tham gia góp ý xây dựng quy trình phối hợp vận hành trạm điện KNT để nhân viên vận hành trong thao tác và xử lý sự cố."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 239
  },
  {
    "question": "Theo Quy trình An toàn điện thì thao tác trong trường hợp thời tiết xấu điều cấm nào đúng?",
    "options": [
      "Cấm đóng, cắt điện bằng khóa điều khiển máy cắt điện.",
      "Không cho phép thao tác tại chỗ thiết bị đóng cắt ngoài trời trong điều kiện thời tiết xấu (mưa tạo thành dòng chảy trên thiết bị điện, giông sét, ngập lụt, gió từ cấp 06 trở lên).",
      "Cấm đóng, cắt điện bằng bằng bất kỳ cách thức nào",
      "Cấm đóng, cắt điện bằng nguồn điều khiển thao tác từ xa."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 240
  },
  {
    "question": "Theo Quy trình An toàn điện, trong chế độ bình thường, các thao tác ở thiết bị điện cao áp phải thực hiện theo quy định nào?",
    "options": [
      "Theo Thông tư Quy định quy trình thao tác trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy trình Xử lý sự cố trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy trình Điều độ trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy phạm trang bị điện của Bộ Công Thương."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 241
  },
  {
    "question": "Theo Quy trình An toàn điện, trong chế độ sự cố, các thao tác khôi phục đường dây, thiết bị sau sự cố ở thiết bị điện cao áp phải thực hiện theo quy định nào?",
    "options": [
      "Theo Thông tư Quy định quy trình thao tác trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy trình Xử lý sự cố trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy trình Điều độ trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Theo Thông tư Quy định quy phạm trang bị điện của Bộ Công Thương."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 242
  },
  {
    "question": "Theo Quy trình An toàn điện, việc đóng, cắt trên cột bằng sào cách điện được phép thực hiện theo điều kiện nào?",
    "options": [
      "Khoảng cách từ phần dẫn điện thấp nhất của các thiết bị này đến người thao tác không nhỏ hơn 2,0m, người thao tác phải mang găng tay cách điện và đi ủng cách điện.",
      "Khoảng cách từ phần dẫn điện thấp nhất của các thiết bị này đến người thao tác không nhỏ hơn 3,0m, người thao tác phải mang găng tay cách điện.",
      "Khoảng cách từ phần dẫn điện thấp nhất của các thiết bị này đến người thao tác không nhỏ hơn 4,0m, người thao tác phải mang găng tay cách điện và đứng trên sàn thao tác.",
      "Khoảng cách từ phần dẫn điện thấp nhất của các thiết bị này đến người thao tác không nhỏ hơn 5,0m, người thao tác phải mang găng tay cách điện và đội mũ BHLĐ."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 243
  },
  {
    "question": "Theo Quy trình An toàn điện, thao tác tại chỗ, kéo ra/đưa vào vị trí vận hành thiết bị đóng cắt cao áp phải mang trang bị, DCAT nào?",
    "options": [
      "Đi ủng cách điện cao áp hoặc mang găng tay cách điện cao áp và đứng trên sàn thao tác phù hợp với cấp điện áp.",
      "Găng tay cách điện cao áp và đi ủng cách điện cao áp hoặc mang găng tay cách điện cao áp và đứng trên ghế gỗ khô.",
      "Găng tay cách điện cao áp và đi ủng cách điện cao áp hoặc mang găng tay cách điện cao áp và đứng trên ghế/thảm cách điện phù hợp với cấp điện áp.",
      "Găng tay cách điện cao áp và đi ủng cách điện cao áp hoặc mang găng tay cách điện cao áp và dùng sào thao tác phù hợp với cấp điện áp."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 244
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định nguyên tắc khi cắt điện để làm công việc thì phần thiết bị tiến hành công việc phải được nhìn thấy rõ đã cách ly khỏi các phần có điện từ mọi phía bằng cách ?",
    "options": [
      "Cắt máy cắt hợp bộ, kéo máy cắt hợp bộ ra vị trí thí nghiệm/sửa chữa; tháo cầu chì; tháo đầu cáp; tháo lèo dây dẫn.",
      "Phải nhìn thấy được khoảng hở của thiết bị đóng cắt (trừ trạm điện kiểu kín) hoặc tạo khoảng hở như: kéo máy cắt hợp bộ ra vị trí thí nghiệm/sửa chữa; tháo cầu chì; tháo đầu cáp; tháo lèo dây dẫn.",
      "Cắt DCL có bộ điều khiển từ xa. Phải nhìn thấy được khoảng hở của DCL",
      "Cắt cả các máy cắt trước và sau thiết bị sẽ tiến hành công việc"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 245
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định khi cắt điện để làm công việc thì phần thiết bị tiến hành công việc, để đảm bảo an toàn khi các nguồn khác xông tới nơi làm việc cần ?",
    "options": [
      "Đối với những máy phát điện của khách hàng phải cắt điện, không để phát lên lưới.",
      "Đối với những máy phát điện khác khi hoạt động phải tách riêng rẽ, hoàn toàn độc lập các pha.",
      "Đối với những máy phát điện khác khi hoạt động phải tách riêng rẽ, hoàn toàn độc lập (kể cả phần trung tính) với phần thiết bị đang có người làm việc.",
      "Không cho đấu chung máy phát khách hàng vào lưới kể cả trường hợp có CD đảo chiều."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 246
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định sau khi cắt điện để xác nhận thiết bị điện không còn điện phải ?",
    "options": [
      "Căn cứ tín hiệu đèn, rơ le, đồng hồ để xác nhận thiết bị điện không còn điện.",
      "Dùng thiết bị thử điện chuyên dùng phù hợp với điện áp danh định của thiết bị điện cần thử, như bút thử điện, còi thử điện; phải thử ở tất cả các pha và các phía vào, ra của thiết bị điện.",
      "Kiểm tra bằng mắt đầu vào và đầu ra của thiết bị đã cắt.",
      "Cả 3 đáp án trên (dưới) đều sai."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 247
  },
  {
    "question": "Theo Quy trình An toàn điện thì điều nào không đúng trong quy định thao tác xa dao tiếp địa?",
    "options": [
      "Mạch khoá liên động của dao tiếp địa (mạch logic giữa dao tiếp địa với dao cách ly và điện áp) đã được thí nghiệm, nghiệm thu và đưa vào vận hành.",
      "Phải xác định được ĐD hoặc thiết bị điện đã mất điện căn cứ thông số điện áp hoặc xác nhận của Nhân viên vận hành có mặt tại trạm điện, nhà máy điện.",
      "Phải xác định được trạng thái tại chỗ máy cắt, dao cách ly liên quan đã mở hoàn toàn và thử hết điện tại chỗ bằng bút thử điện phù hợp với điện áp",
      "Phải xác định được trạng thái tại chỗ máy cắt, dao cách ly liên quan đã mở hoàn toàn thông qua xác nhận của Nhân viên vận hành tại nơi đặt thiết bị đóng cắt hoặc camera giám sát vận hành."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 248
  },
  {
    "question": "Theo Quy trình An toàn điện, khi công tác trong TBA, điều kiện (về tổ chức) để mở cửa lưới vào kiểm tra thiết bị đang vận hành là ?",
    "options": [
      "Phải có hai người có bậc an toàn điện từ bậc 3 trở lên.",
      "Do người có bậc 3 an toàn điện trở lên thực hiện.",
      "Bắt buộc phải có hai người có bậc an toàn điện từ bậc 4 trở lên.",
      "Phải có hai người, người giám sát phải có bậc an toàn điện từ bậc 3 trở lên, người kiểm tra từ bậc 2 trở lên."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 249
  },
  {
    "question": "Theo Quy trình An toàn điện, khi mở cửa lưới vào kiểm tra thiết bị đang vận hành các TBA cần thực hiện BPKTAT gì?",
    "options": [
      "Quan sát kỹ phần mang điện để đảm bảo khoảng cách an toàn. Khi có giông sét không được kiểm tra các trạm ngoài trời.",
      "Quan sát kỹ phần mang điện để đảm bảo khoảng cách an toàn. Khi có giông sét được kiểm tra các trạm ngoài trời nhưng không được thao tác.",
      "Khi có giông sét không được kiểm tra các trạm ngoài trời. Chú ý quan sát kỹ phần mang điện cao áp.",
      "Quan sát kỹ phần mang điện để đảm bảo khoảng cách an toàn. Khi có giông sét không được kiểm tra các trạm trong nhà."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 250
  },
  {
    "question": "Theo Quy trình An toàn điện quy định nhân viên trực thao tác lưu động phải kịp thời đến trạm điện, nhà máy điện không người trực để thực hiện những công việc đột xuất gì?",
    "options": [
      "Thao tác tại chỗ, làm các biện pháp an toàn bàn giao hiện trường cho lực lượng chữa cháy chuyên nghiệp trong trường hợp xảy ra sự cố cháy nổ.",
      "Thao tác tại chỗ, làm các biện pháp an toàn bàn giao hiện trường cho ĐVCT trong trường hợp xảy ra sự cố cháy nổ.",
      "Thao tác tại chỗ, làm các biện pháp an toàn bàn giao hiện trường cho ĐVQLVH trong trường hợp xảy ra sự cố cháy nổ.",
      "Vệ sinh công nghiệp, làm các biện pháp an toàn bàn giao hiện trường cho lực lượng chữa cháy chuyên nghiệp trong trường hợp xảy ra sự cố cháy nổ."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 251
  },
  {
    "question": "Theo Quy trình An toàn điện quy định trạm điện không có người trực thường xuyên thì người cho phép phải là ?",
    "options": [
      "Nhân viên tổ TTLĐ có QLVH trạm điện không người trực đó.",
      "Trưởng kíp điều khiển xa vận hành thiết bị đó (hoặc được cấp có thẩm quyền công nhận là nhân viên vận hành thiết bị đó), nhân viên tổ TTLĐ.",
      "Điều độ viên đương ca chỉ huy vận hành thiết bị đó (hoặc được cấp có thẩm quyền công nhận là nhân viên vận hành thiết bị đó), nhân viên tổ TTLĐ.",
      "Lãnh đạo đơn vị trực tiếp vận hành thiết bị đó (hoặc được cấp có thẩm quyền công nhận là nhân viên vận hành thiết bị đó), nhân viên tổ TTLĐ."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 252
  },
  {
    "question": "Theo Quy trình An toàn điện, thiết bị GIS (Gas Insulated System) là hiết bị gì?",
    "options": [
      "Là thiết bị điện cách điện bằng khí SF6 áp lực cao, đặt trong buồng kim loại được nối đất.",
      "Là TBA thu gọn đặt trong buồng kim loại được cách điện với đất, cách điện cho các thiết bị chính của trạm bằng chất khí trơ.",
      "Là trạm thu gọn đặt trong buồng kim loại được nối đất, cách điện cho các thiết bị chính của trạm bằng chất khí không cháy.",
      "Là trạm thu gọn đặt trong ống cách điện, cách điện cho các thiết bị chính của trạm bằng không khí."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 253
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định trong chế độ bình thường, các thao tác ở thiết bị điện cao áp phải thực hiện theo văn bản nào?",
    "options": [
      "Thông tư Quy định quy trình thao tác trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Thông tư Quy định quy trình xử lý sự cố trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Thông tư Quy định quy trình điều đô trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Quy trình thao tác trong hệ thống điện khu vực lưới điện phân phối."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 254
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định trong chế độ sự cố, các thao tác ở thiết bị điện cao áp phải thực hiện theo văn bản nào?",
    "options": [
      "Thông tư Quy định quy trình thao tác trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Thông tư Quy định quy trình xử lý sự cố trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Thông tư Quy định quy trình điều đô trong hệ thống điện quốc gia của Bộ Công Thương.",
      "Quy trình xử lý sự cố trong hệ thống điện khu vực lưới điện phân phối."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 255
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định về thao tác thết bị GIS trong trường hợp vận hành bình thường như thế nào?",
    "options": [
      "Mọi thao tác phải thực hiện bằng điều khiển từ xa thông qua giao diện người máy hoặc hệ thống giám sát điều khiển. Thao tác tại chỗ chỉ được phép thực hiện khi GIS không có điện.",
      "Mọi thao tác phải thực hiện bằng điều khiển tại chỗ khi GIS không có điện.",
      "Mọi thao tác phải thực hiện bằng điều khiển từ xa thông qua trung tâm điều khiển. Thao tác tại chỗ chỉ được phép thực hiện khi GIS không có điện.",
      "Mọi thao tác phải thực hiện bằng điều khiển từ xa thông qua giao diện người máy hoặc hệ thống giám sát điều khiển."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 256
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định BPAT khi làm việc với thiết bị GIS, nội dung nào không đúng (không phù hợp)?",
    "options": [
      "Phải kiểm tra áp lực khí SF6, tình trạng rò SF6 trong quá trình vận hành hoặc sửa chữa. Khi phát hiện rò rỉ phải có biện pháp ngăn chặn và xử lý.",
      "Phải có Phương án TCTC và BPAT được cấp có thẩm quyền phê duyệt",
      "Khi cách ly thiết bị theo từng phân đoạn, tại mỗi điểm cách ly đều phải khóa và treo biển cảnh báo.",
      "Xác định GIS đã được cách ly phải thông qua chỉ thị tại chỗ 3 pha của thiết bị đóng cắt, thông số điện áp của thiết bị."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 257
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định treo biển báo, tín hiệu tại các van cách ly, tủ điều khiển tại chỗ như thế nào?",
    "options": [
      "Phải treo biển “Cấm đóng điện! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm thao tác! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm mở van! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm lại gần! Có người đang làm việc ” tại các thiết bị điện đã cắt."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 258
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung cơ bản nhận diện mối nguy khi hàn điện, hàn hơi là ?",
    "options": [
      "Điện giật do chạm, chập vào các bộ phận dẫn điện; Tai nạn giao thông; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Bỏng lạnh B. Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Bỏng lạnh; Cháy, nổ; Khói bụi.",
      "Điện giật do chạm mỏ hàn; Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng lạnh; Cháy, nổ.",
      "Điện giật do rò, chạm, chập vào các bộ phận dẫn điện; Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Cháy, nổ.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "TBA",
    "id": 259
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, đối với những người được phép tiến hành công tác hàn, điều kiện nào không đúng (không cần thiết)?",
    "options": [
      "Được đào tạo về chuyên môn về phóng chống thiên tai và cứu nạn cứu hộ.",
      "Được huấn luyện, bồi dưỡng nghiệp vụ phòng cháy chữa cháy và được cấp giấy chứng nhận huấn luyện nghiệp vụ phòng cháy và chữa cháy.",
      "Sử dụng đầy đủ các PTBVCN: mặt nạ có kính hàn, quần áo, mũ, găng tay bằng vật liệu khó cháy, cách điện và chịu được các tác động cơ học.",
      "Được đào tạo về chuyên môn, có chứng chỉ hoặc do cơ sở đào tạo hợp pháp cấp; Được huấn luyện, kiểm tra sát hạch về quy trình kỹ thuật an toàn - bảo hộ lao động và có thẻ an toàn."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 260
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, yêu cầu chung về thực hiện công tác hàn về khoảng cách an toàn như thế nào?",
    "options": [
      "Bảo đảm khoảng cách an toàn theo quy định.",
      "Khi hàn ở tầng trên, thì các tầng phía dưới (khi không có sàn chống cháy bảo vệ) phải dọn sạch các chất dễ cháy nổ trong bán kính không nhỏ hơn 5m.",
      "Di chuyển vật tư thiết bị, hàng hóa dễ cháy hoặc che chắn không để vảy hàn rơi xuống tối thiểu 10m",
      "Tất cả các đáp án trên (dưới) đều đúng."
    ],
    "correct": 3,
    "category": "TBA",
    "id": 261
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi hành điện, hàn hơi, điều cấm nào không đúng (không phù hợp)?",
    "options": [
      "Không được tiến hành đồng thời cả hàn hơi và hàn điện trong các thùng kín; B. Cấm hàn khi có các chất dễ bắt lửa như xăng, axêton, spirit trắng ở gần vị trí hàn.",
      "Cấm hàn ở khoảng cách dưới 5m so với vị trí để các chất dễ cháy nổ.",
      "Cấm hàn ở khoảng cách dưới 10m so với vị trí để các chất dễ cháy nổ.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "TBA",
    "id": 262
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về nối đất thiết bị hàn điện như thế nào?",
    "options": [
      "Phải nối đất phần kim loại của máy hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Phải nối đất phần kim loại của thiết bị, vật được hàn điện cũng như các kết cấu và sản phẩm hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Phải nối đất phần kim loại của thiết bị được hàn điện cũng như các kết cấu và sản phẩm hàn và máy hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Không phải nối đất phần kim loại của thiết bị được hàn điện cũng như các kết cấu và sản phẩm hàn, chỉ nối đất máy hàn theo quy định trước khi thiết bị được nối vào nguồn."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 263
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn điện ở nơi đông người cùng làm việc và người qua lại như thế nào?",
    "options": [
      "Phải lập rào chắn để ngăn và bảo vệ những người xung quanh.",
      "Phải có tấm chắn bằng vật liệu không cháy để ngăn và bảo vệ những người xung quanh.",
      "Phải đặt biển “Cấm vào ” để ngăn và bảo vệ những người xung quanh.",
      "Phải đặt biển “Cấm lại gần ” để ngăn và bảo vệ những người xung quanh."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 264
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn điện ở trên cao, nội dung nào không đúng?",
    "options": [
      "Hàn trên giàn giáo bằng gỗ, sàn của nó phải được phủ kín bằng tấm kim loại, các tông amiăng hay bằng những vật liệu khó cháy khác.",
      "Hàn điện ở tầng trên phải có biện pháp bảo vệ những người làm việc ở tầng dưới khỏi bị các giọt kim loại, các mẩu que hàn cháy dở văng hoặc rơi trúng vào người hay các vật dễ cháy ở phía dưới.",
      "Không cho phép hàn điện có bố trí 2 tầng; Phải có biện pháp bảo vệ khỏi bị các giọt kim loại, các mẩu que hàn cháy dở văng hoặc rơi trúng vào người hay các vật dễ cháy.",
      "Hàn điện trên cao mà không có giàn giáo người thợ hàn nhất thiết phải dùng dây đai an toàn bền nhiệt, có túi đựng dụng cụ, điện cực và các vật cháy dở."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 265
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vào làm việc với hệ thống ắc quy phải thực hiện trang phục BHLĐ nào?",
    "options": [
      "Mặc quần áo BHLĐ và đeo găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm.",
      "Đeo kính bảo vệ mắt và găng tay cách điện để bảo vệ cơ thể khỏi bị điện giât.",
      "Mặc quần áo chuyên dụng, đeo kính bảo vệ mắt và găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm.",
      "Mặc quần áo chuyên dụng, đeo kính hàn bảo vệ mắt và găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 266
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vào làm việc với hệ thống ắc quy phải chuẩn bị những vật liệu, hóa chất nào?",
    "options": [
      "Chuẩn bị a xít phù hợp với hệ thống ắc quy. Trang bị các chai cồn (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai dung dịch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị các chất lau rửa hệ hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt."
    ],
    "correct": 3,
    "category": "TBA",
    "id": 267
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trước khi vào làm việc với hệ thống ắc quy phải kiểm tra những nội dung gì?",
    "options": [
      "Phải kiểm tra phòng ắc quy đã được  thông gió để phòng ngừa bị ngộ độc hoặc cháy nổ do khí phát sinh từ hệ thống ắc quy.",
      "Kiểm tra a xít phù hợp với hệ thống ắc quy. Trang bị các chai cồn (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Kiểm tra chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai dung dịch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Kiểm tra các chất lau rửa hệ hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 268
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về ghi nhãn trên các bình chứa axít, chứa dung dịch axít, nước cất như thế nào?",
    "options": [
      "Ghi rõ trên thành bình từng loại bằng sơn chống gỉ.",
      "Ghi rõ trên thành bình từng loại bằng sơn chống axít.",
      "Ghi rõ, dán giấy tên trên thành bình từng loại.",
      "Ghi rõ trên thành bình từng loại bằng bút mực không xóa."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 269
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về bảo quản axít đậm đặc như thế nào?",
    "options": [
      "Phải để trong các buồng kín, ngoài axít ra không được phép để dung dịch trung hoà cùng; axít phải để trong các bình chuyên dùng bằng nhựa tổng hợp, thủy tinh hay sành sứ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng sắt mạ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng nhựa tổng hợp, thủy tinh hay sành sứ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng hợp kim nhôm có nắp đậy và quai xách."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 270
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định pha chế a xit như thế nào?",
    "options": [
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ nước cất theo đũa thuỷ tinh vào bình axít và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải dùng 2 vòi, cùng rót axít và nước cất vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ axít theo đũa sắt mạ vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ axít theo đũa thuỷ tinh vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt."
    ],
    "correct": 3,
    "category": "TBA",
    "id": 271
  },
  {
    "question": "Theo Theo Quy trình An toàn thủy, cơ, nhiệt, hóa thì điều cấm nào sau đây không đúng khi làm việc, sử dụng và pha chế ắc quy?",
    "options": [
      "Cấm hút thuốc, sử dụng bật lửa, lò sưởi trong buồng chứa ắc-quy B. Cấm để nước cất và dung dịch trung hoà ở chỗ cửa ra vào của buồng ắc-quy.",
      "Cấm đổ nước cất vào axít để pha chế thành dung dịch.",
      "Cấm rót axít vào nước cất để pha chế thành dung dịch.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "TBA",
    "id": 272
  },
  {
    "question": "Khi di chuyển, vận hành trong khu vực trạm, khoảng cách nhỏ nhất từ bất kỳ bộ phận nào của xe đến phần mang điện của trạm có cấp điện áp 22 kV là bao nhiêu?",
    "options": [
      "0,7 m.",
      "1,0 m.",
      "1,5 m.",
      "2,0 m."
    ],
    "correct": 1,
    "category": "TBA",
    "id": 273
  },
  {
    "question": "Trường hợp khẩn cấp không thể trì hoãn được (cháy hoặc có nguy cơ đe dọa đến tính mạng con người hoặc an toàn thiết bị) tại nhà máy điện hoặc lưới điện, nhân viên vận hành được phép?",
    "options": [
      "Ý 1 - Thao tác được thực hiện bằng điều khiển từ xa thông qua mạch nhị thứ hoặc màn hình điều khiển, các thao tác này không có nguy cơ gây tai nạn cho Nhân viên vận hành.",
      "Ý 2 - Xin lệnh các cấp điều độ liên quan để cắt các máy cắt và Dao cách ly để cô lập điểm sự cố, bất thường, tai nạn…",
      "Ý 3 - Sau khi xử lý xong, Nhân viên vận hành phải báo cáo ngay cho Nhân viên vận hành cấp trên trực tiếp.",
      "Cả Ý 1 và Ý 3 đều đúng"
    ],
    "correct": 3,
    "category": "TBA",
    "id": 274
  },
  {
    "question": "Sau khi làm việc xong, muốn đóng điện lại vào thiết bị đã cắt điện thì phải thỏa mãn các điều kiện nào sau đây?",
    "options": [
      "Đã khóa phiếu công tác, nếu thiết bị đóng điện có liên quan đến nhiều đơn vị công tác thì phải khóa tất cả các phiếu công tác, đảm bảo thiết bị sẽ đóng điện tuyệt đối an toàn.",
      "Nơi làm việc đã tháo biển báo và rào chắn tạm thời khi làm việc (nếu có), đặt lại rào chắn cố định.",
      "Tại nơi trực vận hành của đơn vị quản lý vận hành đã tháo hết các dấu hiệu báo có đơn vị công tác làm việc trên sơ đồ. Được phép đóng điện của cấp có quyền điều khiển thiết bị theo quy định.",
      "Tất cả các đáp án trên (dưới) đều đúng"
    ],
    "correct": 3,
    "category": "TBA",
    "id": 275
  },
  {
    "question": "Chỉ được thao tác thiết bị đóng cắt trên cột với cấp điện áp đến 35 kV bằng sào cách điện khi điều kiện khoảng cách từ phần dẫn điện thấp nhất của các thiết bị điện này đến người thao tác không nhỏ hơn?",
    "options": [
      "1m",
      "2m",
      "3m",
      "4m"
    ],
    "correct": 2,
    "category": "TBA",
    "id": 276
  },
  {
    "question": "Thanh cái, thiết bị điện tại nhà máy, trạm điện cho phép không cần nối đất di động nếu đủ điều kiện?",
    "options": [
      "Đã được cách ly hoàn toàn",
      "Đã khóa thiết bị đóng cắt liên quan để tránh thao tác nhầm.",
      "Đã được nối đất/tiếp địa cố định.",
      "Tất cả các đáp án trên (dưới) đều đúng"
    ],
    "correct": 3,
    "category": "TBA",
    "id": 277
  },
  {
    "question": "Trong quá trình đang làm việc trên thiết bị điện đã được cắt điện và nối đất, nếu người  chỉ huy trực tiếp phát hiện một dây nối đất bị đứt thì phải làm gì?",
    "options": [
      "Nối lại dây nối đất bằng tay và các dụng cụ mang theo (kìm, băng dán…).",
      "Vẫn để công nhân đang làm việc bình thường, tiến hành thực hiện sửa chữa và nối đất lại theo đúng quy định.",
      "Ngừng ngay công việc và yêu cầu công nhân đang làm việc trên đường dây xuống, tìm hiểu và xác định nguyên nhân rõ ràng.",
      "Yêu cầu về lấy nối đất khác để thay thế và cho tiếp tục làm việc."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 278
  },
  {
    "question": "Khi cắt thiết bị có điều khiển từ xa để công tác trên thiết bị đóng cắt này hoặc đường dây, thiết bị điện liên quan, để an toàn cần thực hiện?",
    "options": [
      "Chế độ điều khiển thiết bị từ xa/tại chỗ (Remote/local) của thiết bị đóng cắt phải được chuyển về vị trí tại chỗ (Local).",
      "Chế độ điều khiển thiết bị từ xa/tại chỗ (Remote/local) phải được chuyển về vị trí từ xa (Remote).",
      "Chế độ điều khiển thiết bị từ xa/tại chỗ (Remote/local) hiện ở trạng thái nào thì giữ nguyên trạng thái đó.",
      "Chế độ điều khiển thiết bị từ xa/tại chỗ (Remote/local) đặt ở trạng thái nào do người ra lệnh thao tác quyết định."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 279
  },
  {
    "question": "Trường hợp khẩn cấp không thể trì hoãn được (cháy hoặc có nguy cơ đe dọa đến tính mạng con người hoặc an toàn thiết bị), cho phép nhân viên vận hành thao tác 01 người với điều kiện nào sau đây?",
    "options": [
      "Không cần điều kiện, nhưng sau khi thao tác xong phải báo cáo ngay cho nhân viên vận hành cấp trên biết.",
      "Phải báo cáo cho nhân viên vận hành cấp trên biết và thực hiện theo mệnh lệnh.",
      "Thao tác bằng điều khiển từ xa thông qua mạch nhị thứ hoặc màn hình điều khiển, các thao tác này không có nguy cơ gây tai nạn cho nhân viên vận hành, sau khi xử lý xong phải báo ngay cho nhân viên vận hành cấp trên trực tiếp.",
      "Không được thao tác 01 người trong bất cứ trường hợp nào."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 280
  },
  {
    "question": "Trường hợp khẩn cấp không thể trì hoãn được (cháy hoặc có nguy cơ đe dọa đến tính mạng con người hoặc an toàn thiết bị), cho phép nhân viên vận hành thao tác 01 người với điều kiện nào sau đây?",
    "options": [
      "Trường hợp thao tác tại chỗ thiết bị điện, thiết bị chữa cháy hoặc thiết bị phụ trợ khác được hỗ trợ giám sát thao tác từ xa thông qua hệ thống camera giám sát vận hành. Người giám sát phải quan sát được toàn bộ thiết bị (phải kiểm tra lại xem tên thiết bị có đúng với tên thiết bị cần thao tác không) và người thao tác, giữ liên lạc liên tục với người thao tác trong quá trình thực hiện (người giám sát đọc lệnh, người thao tác trực tiếp nhắc lại lệnh và thực hiện bước thao tác theo lệnh).",
      "Không cho phép thao tác tại chỗ thiết bị trong bất cứ trường hợp nào.",
      "Không cần điều kiện, nhưng sau khi thao tác xong phải báo cáo ngay cho nhân viên vận hành cấp trên biết.",
      "Phải báo cáo cho nhân viên vận hành cấp trên biết và thực hiện theo mệnh lệnh."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 281
  },
  {
    "question": "Khi thực hiện thao tác xa, sau khi kiểm tra đủ điều kiện cần thực hiện thao tác, người giám sát và người thao tác thực hiện như thế nào là đúng?",
    "options": [
      "Người giám sát đọc tất cả các lệnh tháo tác xong, người thao tác tiến hành thực hiện xong trên màn hình HMI/SCADA. thì báo cáo lại.",
      "Người giám sát đọcđọc lệnh thao tác (tên thiết bị cần thao tác), người thao tác tiến hành thực hiện xong trên màn hình HMI/SCADA. thì báo cáo lại.",
      "Người giám sát đọc lệnh (tên phiếu thao tác hoặc tên đường dây, thiết bị điện cần thao tác), người thao tác nhắc lại lệnh và thực hiện thao tác đường dây, thiết bị điện trên màn hình HMI/SCADA.",
      "Không cần người giám sat, người thao tác tự xem và thực hiện xong thì báo cáo lại."
    ],
    "correct": 2,
    "category": "TBA",
    "id": 282
  },
  {
    "question": "Cho phép dùng dao cách ly để tiến hành các thao tác có điện khi dòng điện thao tác nhỏ hơn dòng điện cho phép theo quy trình vận hành dao cách ly do đơn vị quản lý vận hành ban hành trong các trường hợp nào sau đây?",
    "options": [
      "Đóng và cắt dao cách ly nối tắt thiết bị.",
      "Đóng và cắt không tải máy biến điện áp, máy biến dòng điện.",
      "Đóng và cắt điểm trung tính của các máy biến áp, kháng điện.",
      "Tất cả các đáp án trên (dưới) đều đúng"
    ],
    "correct": 3,
    "category": "TBA",
    "id": 283
  },
  {
    "question": "Những việc nào sau đây cho phép nhân viên vận hành không cần lập phiếu thao tác nhưng phải ghi chép đầy đủ các bước thao tác vào sổ nhật ký vận hành trước khi thực hiện thao tác?",
    "options": [
      "Ý 1 - Xử lý sự cố.",
      "Ý 2 - Khi thực hiện lệnh thao tác của Điều độ viên để cô lập trạm biến áp trung gian.",
      "Ý 3 - Thao tác đơn giản có số bước thao tác không quá 04 (bốn) bước.",
      "Cả Ý 1 và Ý 3 đều đúng."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 284
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày \n4/3/2025, khi tiến hành công việc gần hoặc trong hành lang bảo vệ đường \ndây dẫn điện trên không, khoảng cách an toàn phóng điện đối với cấp điện\n áp 220 kV là bao nhiêu m?",
    "options": [
      "4,0 m",
      "6,0 m",
      "8,0 m",
      "10,0 m"
    ],
    "correct": 0,
    "category": "TBA",
    "id": 285
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày 4/3/2025, \nkhi tiến hành công việc gần hoặc trong hành lang bảo vệ đường dây dẫn điện \ntrên không, khoảng cách an toàn phóng điện đối với cấp điện áp 500 kV là\n bao nhiêu m?",
    "options": [
      "4,0 m",
      "6,0 m",
      "8,0 m",
      "10,0 m"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 286
  },
  {
    "question": "Theo Quy trình An toàn điện, nội dung nào dưới đây là quy định đúng và được áp dụng để thực hiện nối đất khi làm việc ở trạm điện phân phối hoặc tủ phân phối?",
    "options": [
      "Khi làm việc trên thiết bị điện, phải cách ly thiết bị này ra khỏi lưới điện và nối đất tất cả các phía có thể có nguồn điện đến.",
      "Khi làm việc trên thiết bị điện đã cắt điện không phải cách ly thiết bị này ra khỏi lưới điện nhưng phải nối đất tất cả các phía có thể có nguồn điện đến.",
      "Các ngăn xuất tuyến, ngăn tủ phân phối phải có khóa riêng, chìa khóa do người cho phép giữ để tránh nhầm lẫn khi thực hiện công tác.",
      "Khi sửa chữa, vệ sinh toàn bộ thanh cái thì chỉ cần đặt một bộ nối đất trên phân đoạn thanh cái bất kỳ nhưng phải đóng cầu dao (hoặc máy cắt) liên lạc giữa các phân đoạn."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 287
  },
  {
    "question": "Theo Quy trình An toàn điện, nội dung nào dưới đây là quy định đúng và được áp dụng để thực hiện nối đất khi làm việc ở trạm điện phân phối hoặc tủ phân phối?",
    "options": [
      "Khi làm việc trong ngăn tủ phân phối, phải nối đất ở thanh cái và xuất tuyến của ngăn này trước khi thực hiện công việc. Không cho phép làm việc trong ngăn tủ phân phối khi hàm tĩnh trên hoặc dưới ngăn tủ này chưa được nối đất.",
      "Khi làm việc trong ngăn tủ phân phối, phải nối đất ở thanh cái và xuất tuyến của ngăn này trước khi thực hiện công việc. Không cho phép làm việc trong ngăn tủ phân phối khi hàm tĩnh trên hoặc dưới ngăn tủ này chưa được khóa liên động.",
      "Các ngăn xuất tuyến, ngăn tủ phân phối phải có khóa riêng, chìa khóa do người cho phép giữ để tránh nhầm lẫn khi thực hiện công tác.",
      "Các ngăn xuất tuyến, ngăn tủ phân phối phải có khóa riêng, chìa khóa do nhân viên vận hành giữ để tránh nhầm lẫn khi thực hiện công tác."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 288
  },
  {
    "question": "Theo Quy trình An toàn điện, nội dung nào dưới đây là quy định đúng và được áp dụng để thực hiện nối đất khi làm việc ở trạm điện phân phối hoặc tủ phân phối?",
    "options": [
      "(1). Khi sửa chữa, vệ sinh thanh cái, sửa phân đoạn nào thì phải đặt nối đất (cố định hoặc di động) trên phân đoạn đó. Nếu sửa toàn bộ các phân đoạn thì mỗi phân đoạn phải có một bộ nối đất.",
      "(2). Khi làm việc trong ngăn tủ phân phối, phải nối đất ở thanh cái và xuất tuyến của ngăn này trước khi thực hiện công việc. Không cho phép làm việc trong ngăn tủ phân phối khi hàm tĩnh trên hoặc dưới ngăn tủ này chưa được khóa liên động.",
      "(3). Khi làm việc trên thiết bị điện đã cắt điện không phải cách ly thiết bị này ra khỏi lưới điện nhưng phải nối đất tất cả các phía có thể có nguồn điện đến.",
      "Nội dung (1), (2), (3)."
    ],
    "correct": 0,
    "category": "TBA",
    "id": 289
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày \n4/3/2025, khoảng cách an toàn phóng điện đối với đường dây dẫn điện trên không điện áp 22 kV sử dụng dây trần là bao nhiêu?",
    "options": [
      "4,0 m",
      "2,0 m",
      "1,0 m",
      "3,0 m"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 290
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày 4/3/2025, chiều rộng hành lang bảo vệ an toàn đường dây dẫn điện trên không 220 kV được giới hạn bởi hai mặt thẳng đứng song song, cách dây ngoài cùng khi dây ở trạng thái tĩnh là bao nhiêu m?",
    "options": [
      "7,0 m",
      "6,0 m",
      "3,0 m",
      "4,0 m"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 291
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày 4/3/2025, tổ chức, cá nhân thực hiện công việc gần hành lang bảo vệ đường dây 110 kV phải bảo đảm thiết bị, dụng cụ không vi phạm khoảng cách an toàn phóng điện là bao nhiêu m?",
    "options": [
      "2,0 m",
      "4,0 m",
      "3,0 m",
      "6,0 m"
    ],
    "correct": 2,
    "category": "TBA",
    "id": 292
  },
  {
    "question": "Theo Nghị định 62/2025/NĐ-CP của Thủ tướng Chính phủ ban hành ngày 4/3/2025, đối với trạm điện 500 kV có tường rào cố định bao quanh, chiều cao hành lang bảo vệ được tính từ đáy móng sâu nhất đến điểm cao nhất của trạm cộng thêm bao nhiêu mét?",
    "options": [
      "2,0 m",
      "6,0 m",
      "3,0 m",
      "4,0 m"
    ],
    "correct": 1,
    "category": "TBA",
    "id": 293
  },
  {
    "question": "Theo Quy trình An toàn điện, việc bảo dưỡng chổi than khi động cơ điện đang làm việc, nội dung nào không bắt buộc phải thự c hiện?",
    "options": [
      "Nhân viên được đào tạo cho nhiệm vụ này và sử dụng các công cụ bảo vệ mặt và mắt, quần áo bảo hộ, đề phòng việc cuốn đi bởi các phần quay của động cơ điện; Sử dụng giày và thảm cách điện;",
      "Sử dụng giày, găng tay và thảm cách điện để làm việc. Không đồng thời tiếp xúc tay tới các phần mang điện của hai cực hoặc phần mang điện và phần được nối đất.",
      "Phải lập Phương án TCTC và BPAT mới được thực hiện",
      "Khi mài nhẵn vành của Rotor trong động cơ điện đang quay phải sử dụng các khuôn bằng vật liệu cách điện."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 294
  },
  {
    "question": "Theo Quy trình An toàn điện quy định về trang phục khi làm việc ở máy phát điện và máy bù đồng bộ như thế nào?",
    "options": [
      "Người làm việc phải mặc trang phục BHLĐ, đội mũ nhựa, đi ủng cách điện và găng tay cách điện.",
      "Người làm việc phải mặc gọn gàng, nữ giới phải đội mũ, tóc cuốn gọn",
      "Người làm việc phải mặc gọn gàng, đi ủng cách điện và găng tay cách điện D. Người làm việc phải mang găng tay cách điện, nữ giới phải đội mũ, tóc cuốn gọn và đứng trên thảm cách điện",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "NMD",
    "id": 295
  },
  {
    "question": "Theo Quy trình An toàn điện khi làm việc ở máy phát điện và máy bù đồng bộ cần kiểm tra nơi làm việc như thế nào?",
    "options": [
      "Phải kiểm tra nhiệt độ nơi làm việc và các thiết bị phụ theo đúng quy trình. Xung quanh máy phát hoặc máy bù không để quần, áo và bất cứ loại vật liệu nào có thể cuốn vào máy.",
      "Phải kiểm tra độ ồn nơi làm việc và các thiết bị phụ theo đúng quy trình. Xung quanh máy phát hoặc máy bù không được để bất cứ loại vật liệu nào.",
      "Phải kiểm tra ánh sáng nơi làm việc và các thiết bị phụ theo đúng quy trình. Xung quanh máy phát hoặc máy bù không để quần, áo và bất cứ loại vật liệu nào có thể cuốn vào máy.",
      "Phải kiểm tra sơ đồ nối điện các thiết bị phụ theo đúng quy trình. Xung quanh máy phát hoặc máy bù không để quần, áo và bất cứ loại vật liệu nào có thể cuốn vào máy."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 296
  },
  {
    "question": "Theo Quy trình An toàn điện khi kiểm tra chổi than khi máy đang chạy phải thực hiện như thế nào?",
    "options": [
      "Mang găng cách điện và đi ủng cách điện. Có thể dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy. nếu không có dòng điện kích từ thì vẫn được xem như đang có điện.",
      "Đi ủng cách cách điện. Cấm dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy. nếu không có dòng điện kích từ thì vẫn được xem như đang có điện.",
      "Phải dùng sào cách điện để thực hiện công việc. Cấm dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy. nếu không có dòng điện kích từ thì vẫn được xem như đang có điện.",
      "Mang găng cách điện và cài chặt vào cổ tay. Cấm dùng tay tiếp xúc đồng thời với hai cực tính khác nhau của máy. nếu không có dòng điện kích từ thì vẫn được xem như đang có điện."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 297
  },
  {
    "question": "Theo Quy trình An toàn điện, nếu máy phát, máy bù có điểm trung tính nối với điểm trung tính của máy phát, máy bù khác (hoặc của hệ thống) thì khi sửa chữa ở mạch Stator phải thực hiện như thế nào?",
    "options": [
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải đeo găng tay cách điện cao áp.",
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải đeo găng tay cách điện hạ áp.",
      "Không cần tách điểm trung tính ra khỏi hệ thống nhưng khi làm việc này phải đeo găng tay cách điện cao áp.",
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải mang đầy đủ quần áo BHLĐ."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 298
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định trong việc đo giá trị của điện áp dư và xác định thứ tự các pha các mạch Stator của máy phát quay không kích từ có thiết bị dập từ như thế nào?",
    "options": [
      "Không cho phép đo giá trị của điện áp dư và xác định thứ tự các pha.",
      "Các công việc này cần thực hiện bởi cán bộ kỹ thuật của đơn vị thí nghiệm điện.",
      "Các công việc này cần thực hiện bởi công nhân QLVH máy phát này.",
      "Các công việc này cần thực hiện bởi cán bộ kỹ thuật của nhà máy thủy điện."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 299
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định khi đo điện áp trên trục và trở kháng cách điện Rotor to của máy phát như thế nào?",
    "options": [
      "Cho phép tiến hành đo khi máy phát đang làm việc với yêu cầu có 02 người trình độ an toàn điện bậc 5.",
      "Không cho phép tiến hành đo điện áp trên trục và trở kháng cách điện Rotor to của máy phát đang làm việc.",
      "Cho phép tiến hành đo khi máy phát đang làm việc với yêu cầu có 02 người trình độ an toàn điện bậc 4 và bậc 5.",
      "Cho phép tiến hành đo khi máy phát đang làm việc với yêu cầu có 02 người trình độ an toàn điện bậc 3 và bậc 4."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 300
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định khi sửa chữa vành tiếp xúc của Rotor, vành góp của bộ kích từ máy phát như thế nào?",
    "options": [
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Startor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo PTT. Phải sử dụng các công cụ bảo vệ mặt và mắt khỏi các tác động cơ khí.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải xây dựng Phương án an toàn.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải sử dụng phương tiện cách điện cho người làm việc.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải sử dụng các công cụ bảo vệ mặt và mắt khỏi các tác động cơ khí."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 301
  },
  {
    "question": "Theo Quy trình An toàn điện, biện pháp an toàn nào không đúng khi bảo dưỡng các thiết bị chổi than khi máy phát đang làm việc.",
    "options": [
      "Khi làm việc phải đội mũ bảo vệ và sử dụng các công cụ bảo vệ mặt và mắt, quần áo được đóng cúc để tránh việc bị cuốn đi bởi các phần quay của máy móc; B. Sử dụng ủng cách điện, thảm cách điện và găng tay cách điện tránh tiếp xúc ngẫu nhiên các phần cơ  thể với các phần được nối đất; C. Không đồng thời chạm tay đến các phần mang điện của hai cực hoặc các phần mang điện và phần được nối đất.",
      "Phải cắt tải của máy phát, để máy phát chạy ở chế độ bù.",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "NMD",
    "id": 302
  },
  {
    "question": "Theo Quy trình An toàn điện khi làm việc ở động cơ điện cao áp điều cấm nào đúng?",
    "options": [
      "Cấm làm bất cứ công việc gì trong mạch của động cơ đang quay, trừ công việc thí nghiệm thực hiện theo phương án được phê duyệt.",
      "Cấm làm bất cứ công việc gì trong mạch của động cơ đang quay, kể cả công việc thí nghiệm thực hiện theo phương án được phê duyệt.",
      "Được  phép thí nghiệm mạch của động cơ đang quay nhưng phải thực hiện theo PCT.",
      "Cấm thí nghiệm mạch của động cơ đang quay trong mọi trườn g hợ  p."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 303
  },
  {
    "question": "Theo Quy trình An toàn điện, khi sửa chữa động cơ điện cao áp, BPAT nào không đúng (không phải áp dụng)?",
    "options": [
      "Cắt điện, khoá bộ phận truyền động của máy cắt và dao cách ly; treo biển cảnh báo “Cấm đóng điện! Có người đang làm việc” tại MC và DCL cấp điện cho động cơ;",
      "Không phải cắt điện động cơ để sửa chữa nếu khảo sát kỹ, thực hiện theo Phương án đã duyệt.",
      "Nếu động cơ có đặt chung điểm trung tính thì phải tách điểm trung tính ra khỏi hệ thống; D. Nếu đầu cáp của động cơ điện đã tháo rời thì các công việc tiến hành trên động cơ phải theo phương án được phê duyệt.",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "NMD",
    "id": 304
  },
  {
    "question": "Theo Quy trình An toàn điện, trước khi cho phép làm việc trên động cơ điện quay có các cơ cấu nối với chúng (máy hút khói, quạt, máy bơm,…) thì phải thực hiện các BPAT nào?",
    "options": [
      "Chốt, cánh quạt, tấm chắn phải được bắt chặt. Có biện pháp để hãm Rotor động cơ điện hoặc tháo các khớp li hợp.",
      "Có biện pháp để hãm Rotor động cơ điện hoặc tháo các khớp li hợp. Chốt, cánh quạt, tấm chắn phải được bắt chặt.",
      "Tay lái của van chặn (chốt, cánh quạt, tấm chắn) phải được khóa. Có biện pháp để hãm Rotor động cơ  điện hoặc tháo các khớp li hợp.",
      "Tay lái của van chặn (chốt, cánh quạt, tấm chắn) phải được khóa. Có biện pháp để chốt, cánh quạt, tấm chắn phải được bắt chặt."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 305
  },
  {
    "question": "Theo Quy trình An toàn điện, việc cắt điện để đảm bảo an toàn khi sửa chữa động cơ điện cao áp, quy định nào không bắt buộc phải áp dụng?",
    "options": [
      "Cắt điện nguồn điều khiển từ xa bằng tay và điều khiển tự động các động cơ điện của van chặn, máy điều hướng.",
      "Trên tay lái của chốt, tấm chắn, cánh quạt phải treo biển báo an toàn.",
      "Trên khóa, các nút ấn điều khiển động cơ điện của van chặn thì treo “Cấm đóng điện! Có người đang làm việc”.",
      "Đặt rào chắn, khoanh vùng công tác khi sửa chữa động cơ điện."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 306
  },
  {
    "question": "Theo Quy trình An toàn điện, điều kiện để thực hiện công việc trên động cơ điện đang quay là gì?",
    "options": [
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay mà không tiếp xúc với các phần mang điện và quay.",
      "Không cho phép thực hiện công việc trên động cơ điện đang quay trong mọi trườn g hợ  p.",
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay mà không tiếp xúc với các phần mang điện và vỏ động cơ.",
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay khi tiếp xúc với các phần mang điện và quay."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 307
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định treo biển báo, tín hiệu tại các van cách ly, tủ điều khiển tại chỗ như thế nào?",
    "options": [
      "Phải treo biển “Cấm đóng điện! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm thao tác! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm mở van! Có người đang làm việc ” tại vị trí thao tác.",
      "Phải treo biển “Cấm lại gần! Có người đang làm việc ” tại các thiết bị điện đã cắt."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 308
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, phần thiết bị tiến hành công việc phải được cách ly khỏi hệ thống để đảm bảo an toàn khi làm việc như thế nào?",
    "options": [
      "Phải được cách ly khỏi hệ thống từ mọi phía từ nguồn chính và những nguồn khác bằng cách đóng các van cách ly, mở các van xả đọng, xả khí; cắt nguồn lực, nguồn điều khiển các van.",
      "Phải được cách ly khỏi hệ thống từ mọi phía từ nguồn điện chính và những nguồn hơi, khí, hóa chất qua các đường ống; không cần cắt nguồn lực, nguồn điều khiển các van.",
      "Không cần phải cách ly khỏi hệ thống nhưng phải cắt nguồn hơi, khí, hóa chất qua các đường ống, van khác bằng cách cắt nguồn điện, cắt nguồn lực, nguồn điều khiển các van.",
      "Không cần phải cách ly khỏi hệ thống từ mọi phía có nguồn chính, nhưng những nguồn hơi, khí, hóa chất qua các đường ống, van khác phải được giám sát theo dõi."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 309
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định cấm trong việc cách ly thiết bị để sửa chữa như thế nào?",
    "options": [
      "Cấm cách ly thiết bị để sửa chữa chỉ bằng cách ly điều khiển đóng/mở van.",
      "Cấm cách ly thiết bị để sửa chữa chỉ bằng cách ly các van điện, van khí mà không cắt nguồn lực, nguồn điều khiển đóng/mở van.",
      "Cấm cách ly thiết bị để sửa chữa chỉ bằng cách ly các van điện, van khí.",
      "Cấm cách ly thiết bị để sửa chữa các van khí mà không cắt các van điện."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 310
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định trước khi cho Đơn vị công tác tiến hành công việc, phải khẳng định nội dung gì?",
    "options": [
      "Người cho phép phải đảm bảo thiết bị cần sửa chữa không còn áp lực, môi chất và nhiệt độ phải ở giá trị cho phép.",
      "NCHTT phải đảm bảo thiết bị cần sửa chữa không còn áp lực, môi chất và nhiệt độ phải ở giá trị cho phép.",
      "Người LĐCV phải đảm bảo thiết bị cần sửa chữa không còn điện, môi chất và nhiệt độ phải ở giá trị cho phép.",
      "Trưởng ca, kíp vận hành phải đảm bảo thiết bị cần sửa chữa không còn áp lực, môi chất và nhiệt độ phải ở giá trị cho phép."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 311
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung cơ bản về nhận diện mối nguy khi làm việc với thiết bị quay là:",
    "options": [
      "Người hoặc vật bị cuốn vào bộ phận chuyển động gây tai nạn hoặc sự cố thiết bị; Bộ phận, vật liệu bị rò điện.",
      "Người hoặc vật bị cuốn vào bộ phận chuyển động gây tai nạn hoặc sự cố thiết bị; Bộ phận, vật liệu gây va đập hoặc văng bắn vào người.",
      "Người hoặc vật bị chạm vào bộ phận có điện; Bộ phận, vật liệu gây va đập hoặc văng bắn vào người.",
      "Người hoặc vật bị cuốn vào bộ phận chuyển động gây tai nạn hoặc sự cố thiết bị; Ngã cao."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 312
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung nào không đúng (không cần thiết) trong quy định công tác chuẩn bị sửa chữa các thiết bị quay?",
    "options": [
      "Thiết bị đã dừng, động cơ và các thiết bị điện đã được cắt điện, các van đã được đặt đến vị trí an toàn cho việc thực hiện công việc sửa chữa.",
      "Các thiết bị liên quan phải được treo biển cấm thao thao tác, khóa an toàn (nếu có). Phải có các biển báo an toàn cho các động cơ điện đã được cắt điện và thiết bị khởi động để báo hiệu cấm đóng điện và vận hành các van.",
      "Thiết bị đã được kiểm định đúng quy định pháp luật, còn hạn kiểm định.",
      "Khu vực làm việc phải có biển báo “ Khu vực đang làm việc” hoặc các biển báo tương tự theo quy định hiện hành."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 313
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung nào không đúng (không cần thiết) trong quy định BPAT khi làm việc với các thiết bị quay?",
    "options": [
      "Phải có hàng rào an toàn với khoảng cách quy định. Nơi làm việc phải được vệ sinh sạch sẽ, ánh sáng phải đầy đủ.",
      "Các khớp nối trục phải có vỏ bảo vệ chắc chắn.",
      "Động cơ phải có dây tiếp địa, điểm đấu nối cáp điện phải có hộp bảo vệ chắc chắn, các gối đỡ phải được bôi trơn đầy đủ.",
      "Nơi làm việc phải có tường cách âm, chống ồn."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 314
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung nào không đúng (không cần thiết) trong quy định BPAT khi kiểm tra độ rung, nhiệt độ các gối đỡ?",
    "options": [
      "Thực hiện đúng theo quy trình vận hành và xử lý sự cố thiết bị điện và thiết bị quay.",
      "Khi phát hiện độ rung, nhiệt độ của các thiết bị vượt quá trị số tác động bảo vệ mà hệ thống bảo vệ không làm việc, C. Nhân viên vận hành cần thao tác ngừng khẩn cấp thiết bị để bảo vệ thiết bị đồng thời báo cáo cấp trên xin ý kiến xử lý.",
      "Thực hiện đúng theo quy trình vận hành của từng thiết bị",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 315
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi phát hiện các thiết bị quay bị cháy phải ?",
    "options": [
      "Kiểm tra thiết bị quay ngay. Cấm dùng cát mà phải dùng bình chữa cháy (CO2, MFZ) để dập lửa.",
      "Lập tức ngừng thiết bị, cắt điện. Cấm dùng cát mà phải dùng bình chữa cháy (CO2, MFZ) để dập lửa.",
      "Lập tức ngừng thiết bị, cắt điện. Dùng cát và bình chữa cháy (CO2, MFZ) để dập lửa.",
      "Báo cáo lãnh đạo đợn vị ngay. Dùng bình chữa cháy (CO2, MFZ) để dập lửa."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 316
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trong quá trình chạy thử hoặc cân chỉnh các thiết bị quay, khi nhận được tín hiệu nguy hiểm, cần ?",
    "options": [
      "Lập tức ngừng thiết bị, cắt điện. Người tham gia giám sát an toàn cho công tác sửa chữa ấn nút ngừng khi nhận được tín hiệu nguy hiểm của Người LĐCV.",
      "Sử dụng các nút ấn ngừng khẩn cấp. NCHTT ấn nút ngừng khi nhận được tín hiệu nguy hiểm của nhân viên ĐVCT.",
      "Sử dụng các nút ấn ngừng khẩn cấp. Cơ cấu này sẽ được một người tham gia giám sát an toàn cho công tác sửa chữa ấn nút ngừng khi nhận được tín hiệu nguy hiểm của Người CHTT.",
      "Sử dụng các nút ấn ngừng khẩn cấp. Cơ cấu này sẽ được Người cho phép ấn nút ngừng khi nhận được tín hiệu nguy hiểm của Người CHTT."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 317
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trước khi làm việc với máy cơ khí phải:",
    "options": [
      "Kiểm tra điện trở nối đất khu vực đặt máy, kiểm tra rò điện qua vỏ máy.",
      "Kiểm tra tình trạng kiểm định kỹ thuật an toàn của và chất lượng của máy vẫn còn trong tình trạng sử dụng tốt.",
      "Kiểm tra tình trạng, kỹ thuật an toàn của máy như: các bộ phận che chắn bảo vệ, dây tiếp đất, các loại dao, đá cắt mài vẫn còn trong tình trạng sử dụng tốt.",
      "Kiểm tra kỹ thuật an toàn của máy theo các quy trình vận hành cho chính máy cơ khí đó."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 318
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung nhận diện mối nguy khi làm việc với thiết bị nâng ?",
    "options": [
      "Điện giật, va đập trong quá trình nâng, di chuyển; Đổ, lật, nghiêng thiết bị nâng.",
      "Vật nặng rơi, va đập trong quá trình nâng, di chuyển; Tai nạn giao thông.",
      "Đuối nước, va đập trong quá trình nâng, di chuyển; Đổ, lật, nghiêng thiết bị nâng.",
      "Vật nặng rơi, va đập trong quá trình nâng, di chuyển; Đổ, lật, nghiêng thiết bị nâng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 319
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, giải pháp an toàn khi dùng hai hoặc nhiều thiết bị nâng để cùng nâng một tải trọng là ?",
    "options": [
      "Phải có sơ đồ buộc móc tải, sơ đồ di chuyển tải và chỉ rõ trình tự thực hiện các thao tác, yêu cầu về kích thước, vật liệu, công nghệ, các thiết bị phụ trợ.",
      "Phải có Phương án di chuyển tải và chỉ rõ trình tự thực hiện các thao tác, yêu cầu về kích thước, vật liệu, công nghệ, các thiết bị phụ trợ.",
      "Phải có hồ sơ lý lịch thiết bị nâng đầy đủ khi di chuyển tải và chỉ rõ trình tự thực hiện các thao tác, yêu cầu về kích thước, vật liệu, công nghệ, các thiết bị phụ trợ.",
      "Các thiết bị nang phải còn hạnh định thử nghiệm, lập kế hoạch thi công, chỉ rõ trình tự thực hiện các thao tác, yêu cầu về kích thước, vật liệu, công nghệ, các thiết bị phụ trợ."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 320
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vận hành thiết bị nâng, quy định cấm như thế nào?",
    "options": [
      "Cấm người đứng dưới hoặc giữa tải và chướng ngại vật, trừ đứng dưới độ vươn của cần trục,. Cấm nâng hạ tải trên thùng xe khi có người đang đứng trên thùng xe.",
      "Cấm người đứng dưới hoặc giữa tải và chướng ngại vật, bao gồm cả độ vươn của cần trục, trong bán kính quay của thiết bị nâng. Cấm nâng hạ tải trên thùng xe khi có người đang đứng trên thùng xe.",
      "Cấm người đứng dưới độ vươn của cần trục, trong bán kính quay của thiết bị nâng khi dây chằng bị đứt. Cấm nâng hạ tải trên thùng xe khi có người đang đứng trên thùng xe.",
      "Cấm người đứng dưới hoặc giữa tải và chướng ngại vật, bao gồm cả độ vươn của cần trục,. Cấm nâng hạ tải trên thùng xe khi không có người đang đứng trên thùng xe."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 321
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, thủ tục an toàn trước khi tiến hành công việc có sử dụng thiết bị nâng là gì?",
    "options": [
      "Tiến hành lập phương án thi công, phương án đảm bảo an toàn trong quá trình làm việc. Kiểm tra chất lượng thiết bị nâng.",
      "Tiến hành đánh giá rủi ro các công việc nâng, hạ và lập phương án đảm bảo an toàn trong quá trình làm việc.",
      "Tiến hành đánh giá rủi ro các công việc nâng, hạ và lập phương án thi công, phương án đảm bảo an toàn trong quá trình làm việc.",
      "Kiểm tra hồ sơ thiết bị nâng và lập phương án phương án thi công, phương án đảm bảo an toàn trong quá trình làm việc."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 322
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trong quá trình sử dụng xe cẩu, cầu trục, cần trục bánh lốp, nội dung nào không đúng (không phù hợp) quy định?",
    "options": [
      "Không cho phép người lên, xuống cầu trục, cần trục khi thiết bị đang hoạt động; Vừa dùng người đẩy hoặc kéo tải vừa cho cơ cấu nâng/hạ tải; Nâng, hạ và chuyển tải khi có người đứng ở trên tải.",
      "Không cho phép nâng tải có khối lượng vượt quá tải trọng cho phép; Để tải treo lơ lửng mà không có người điều khiển; Nâng tải trong tình trạng tải chưa ổn định hoặc chỉ móc một bên của móc kép;",
      "Không được nâng tải vùi dưới đất, bị các vật khác đè lên, bị liên kết bằng bu lông hoặc bê tông với các vật khác; Cẩu với, kéo lê tải trọng;",
      "Không cho phép thực hiện công việc khi chưa cắt điện các đường dây, thiết bị điện xung quanh nơi làm việc."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 323
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trong quá trình sử dụng xe cẩu, cầu trục, cần trục bánh lốp, quy định các nội dung cấm như thế nào?",
    "options": [
      "Cấm người không phận sự đi trong hành lang an toàn thiết bị đang hoạt động; Cấm sử dụng thiết bị nâng tải để nâng người.",
      "Cấm người không phận sự đi trong hành lang an toàn thiết bị đang hoạt động; Cấm sử dụng thiết bị nâng tải để nâng người quá tải trọng cho phép của thiết bị.",
      "Cấm người không phận sự đi trong hành lang an toàn khi thiết bị ngừng hoạt động; Cấm sử dụng thiết bị nâng tải để nâng người.",
      "Cấm các phương tiện không phận sự đi trong hành lang an toàn thiết bị đang hoạt động; Cấm sử dụng thiết bị nâng tải để nâng người."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 324
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trước khi hạ tải xuống khoang, hầm, phải thực hiện BPAT nào?",
    "options": [
      "Phải hạ móc tải xuống vị trí thấp nhất để kiểm tra số vòng cáp còn lại trên tang. Nếu số vòng cáp còn lại trên tang lớn hơn 2,5 vòng thì mới được phép nâng, hạ tải.",
      "Phải hạ móc không tải xuống vị trí thấp nhất để kiểm tra số vòng cáp còn lại trên tang. Nếu số vòng cáp còn lại trên tang lớn hơn 1,5 vòng thì mới được phép nâng, hạ tải.",
      "Phải hạ móc không tải xuống vị trí cao nhất để kiểm tra số vòng cáp còn lại trên tang. Nếu số vòng cáp còn lại trên tang lớn hơn 1,0 vòng thì mới được phép nâng, hạ tải.",
      "Phải hạ cần xuống vị trí thấp nhất để kiểm tra số vòng cáp còn lại trên tang. Nếu số vòng cáp còn lại trên tang lớn hơn 2,0 vòng thì mới được phép nâng, hạ tải."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 325
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, chỉ được phép hạ tải xuống vị trí đã định với điều kiện nào?",
    "options": [
      "Nơi đó đã tháo bỏ dây treo các kết cấu, bộ phận lắp ráp khỏi móc, khi các kết cấu và bộ phận đó đã được cố định chắc chắn và ổn định.",
      "Nơi đó đã được loại trừ được khả năng rơi, đổ hoặc trượt khi các kết cấu và bộ phận đó đã được cố định chắc chắn và ổn định.",
      "Nơi đó đã được loại trừ được khả năng rơi, đổ hoặc trượt; Đã tháo bỏ dây treo các kết cấu, bộ phận lắp ráp khỏi móc, khi các kết cấu và bộ phận đó đã được cố định chắc chắn và ổn định.",
      "Có phương án loại trừ được khả năng rơi, đổ hoặc trượt; tháo bỏ dây treo các kết cấu, bộ phận lắp ráp khỏi móc, khi các kết cấu và bộ phận đó đã được cố định chắc chắn và ổn định."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 326
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, người buộc móc tải chỉ được phép đến gần tải khi nào?",
    "options": [
      "Khi tải đã hạ đến độ cao không lớn hơn 0,5 m tính từ mặt sàn chỗ người móc tải đứng.",
      "Khi tải đã hạ đến độ cao không lớn hơn 1,5 m tính từ mặt sàn chỗ người móc tải đứng.",
      "Khi tải đã hạ đến độ cao không lớn hơn 02 m tính từ mặt sàn chỗ người móc tải đứng.",
      "Khi tải đã hạ đến độ cao không lớn hơn 01 m tính từ mặt sàn chỗ người móc tải đứng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 327
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, phải ngừng hoạt động của cầu trục, cần trục khi nào?",
    "options": [
      "Khi phát hiện các vết nứt ở những chỗ quan trọng của kết cấu kim loại, biến dạng dư của kết cấu kim loại; Phanh của bất kỳ một cơ cấu nào bị hỏng; Móc, cáp, ròng rọc, tang bị mòn, bị rạn nứt.",
      "Khi phát hiện các vết nứt ở những chỗ quan trọng của kết cấu kim loại, biến dạng dư của kết cấu kim loại; Phanh của bất kỳ một cơ cấu nào bị hỏng; thiết bị không còn hạnh định thử nghiệm.",
      "Khi không phát hiện các vết nứt ở những chỗ quan trọng của kết cấu kim loại, biến dạng dư của kết cấu kim loại; Phanh, móc, cáp, ròng rọc, tang bị mòn, bị rạn nứt.",
      "Khi phát hiện các nguy hiểm tại buồng điều khiển thết bị; Phanh của bất kỳ một cơ cấu nào bị hỏng; Móc, cáp, ròng rọc, tang bị mòn, bị rạn nứt."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 328
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, việc quản lý xe cẩu, cầu trục, cần trục như  thế nào?",
    "options": [
      "Cử người theo dõi sửa chữa, thay thế các chi tiết, bộ phận đã bị hư hỏng, mòn quá quy định cho phép.",
      "Phải có sổ để theo dõi bảo dưỡng định kỳ; theo dõi sửa chữa, thay thế các chi tiết, bộ phận đã bị hư hỏng, mòn quá quy định cho phép.",
      "Phải có sổ để theo dõi mức tiêu hao nhiên liệu và kiểm tra các chi tiết, bộ phận đã bị hư hỏng, mòn quá quy định cho phép.",
      "Quản đốc phân xường xe phải theo dõi sửa chữa, thay thế các chi tiết, bộ phận đã bị hư hỏng, mòn quá quy định cho phép."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 329
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định tốc độ vận hành xe nâng hàng như  thế nào?",
    "options": [
      "Trong phạm vi công trường xe phải chạy với tốc độ ≤ 15km/h; Khi chạy trên đường thẳng trong kho ≤ 12km/h; Qua quãng đường ngoặt hoặc vòng phải chạy với tốc độ ≤ 5km/h.",
      "Trong phạm vi công trường xe phải chạy với tốc độ ≤ 5km/h; Khi chạy trên đường thẳng trong kho ≤ 3km/h; Qua quãng đường ngoặt hoặc vòng phải chạy với tốc độ ≤ 5km/h.",
      "Trong phạm vi công trường xe phải chạy với tốc độ ≤ 10km/h; Khi chạy trên đường thẳng trong kho ≤ 6km/h; Qua quãng đường ngoặt hoặc vòng phải chạy với tốc độ ≤ 5km/h.",
      "Trong phạm vi công trường xe phải chạy với tốc độ ≤ 20km/h; Khi chạy trên đường thẳng trong kho ≤ 10km/h; Qua quãng đường ngoặt hoặc vòng phải chạy với tốc độ ≤15km/h."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 330
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trong các điều cấm sau đây, điều cấm nào không đúng khi sử dụng xe nâng hàng?",
    "options": [
      "Cấm sử dụng xe nâng hàng để nâng người lên cao hoặc chở người.Hạ thấp càng nâng khi di chuyển; Đứng hoặc làm việc trước hoặc dưới càng nâng khi xe đang vận hành;",
      "Cấm nâng các kiện hàng phía dưới không có kẽ hở cần thiết để đưa càng nâng vào lấy hàng, xếp hàng lên đống không có tấm kê để rút càng ra.",
      "Cấm nâng hàng đi vào nơi có nền không ổn định; Nâng các kiện hàng phía dưới không có kẽ hở cần thiết để đưa càng nâng vào lấy hàng; Xếp hàng lên đống không có tấm kê để rút càng ra.",
      "Cấm vận hành xe nâng hàng khi chưa chằng buộc chắc chắn và không có người giữ thăng bằng cho hàng cần nâng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 331
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về trọng lượng của hàng nâng như  thế nào?",
    "options": [
      "Phải được phân bố đều trên hai càng nâng và phần nhô ra ở  phía trước không được vượt quá 1/3 độ dài của càng nâng.",
      "Phải được phân bố đều trên hai càng nâng và phần nhô ra ở  phía trước không được vượt quá 1/2 độ dài của càng nâng.",
      "Phải được phân bố đều trên hai càng nâng và phần nhô ra ở  phía trước không được vượt quá 1/4 độ dài của càng nâng.",
      "Phải được phân bố đều trên hai càng nâng và phần nhô ra ở phía trước không được vượt quá 2/3 độ dài của càng nâng."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 332
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi sử dụng xe nâng hàng có lắp thêm cần để nâng và di chuyển, phải thực hiện động tác nào?",
    "options": [
      "Không được nhấc bổng hàng lên rồi mới di chuyển. Khi di chuyển phải có biện pháp chống hàng lắc lư. Cấm kéo hoặc đẩy hàng trên đống xuống.",
      "Phải nhấc bổng hàng lên rồi mới di chuyển. Khi di chuyển phải có biện pháp chống hàng lắc lư. Cấm kéo hoặc đẩy hàng trên đống xuống.",
      "Phải nhấc bổng hàng lên rồi mới di chuyển. Khi chưa di chuyển phải có biện pháp chống hàng lắc lư. Cấm kéo hoặc đẩy hàng trên đống xuống.",
      "Khi di chuyển phải có biện pháp chống hàng lắc lư. Cho phép kéo hoặc đẩy hàng trên đống xuống với điều kiện phải có kê lót đảm bảo an toàn."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 333
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, xe nâng chỉ được di chuyển khi nào?",
    "options": [
      "Khung xe nghiêng hết về phía trước và cơ cấu nâng hàng đã được nâng lên cách mặt đất ít nhất bằng độ lớn của gầm xe với đường.",
      "Khung xe nghiêng hết về phía sau và cơ cấu nâng hàng đã được nâng lên cách mặt đất ít nhất bằng độ lớn của thành xe với đường.",
      "Khung xe nghiêng hết về phía sau và cơ cấu nâng hàng đã được nâng lên cách mặt đất ít nhất bằng độ lớn của gầm xe với đường.",
      "Khung xe nghiêng hết về phía sau và cơ cấu nâng hàng đã được nâng lên cách mặt đất ít nhất 01 mét"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 334
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về quản lý xe nâng hàng như thế nào?",
    "options": [
      "Mỗi chủng loại xe nâng hàng phải có quy trình vận hành an toàn; Có sổ theo dõi quá trình bảo trì, bảo dưỡng, sửa chữa định kỳ.",
      "Mỗi xe nâng hàng phải có quy trình vận hành an toàn; cử người theo dõi quá trình bảo trì, bảo dưỡng, sửa chữa định kỳ.",
      "Mỗi xe nâng hàng phải có quy trình vận hành an toàn; hàng ngàyngười vận hành xe phải theo dõi quá trình bảo trì, bảo dưỡng, sửa chữa định kỳ.",
      "Mỗi xe nâng hàng phải có quy trình vận hành an toàn; Có sổ theo dõi quá trình bảo trì, bảo dưỡng, sửa chữa định kỳ."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 335
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vận hành xe nâng người, điều cấm nào đúng?",
    "options": [
      "Cấm vận hành nơi có các phương tiện di động khác đang làm việc; Cấm rời khỏi sàn thao tác; Cấm sử dụng xe nâng người sai mục đích và chở người khi tiến hành di chuyển/tham gia giao thông.",
      "Cấm vận hành nơi có các phương tiện di động khác đang làm việc; Cấm đứng trên sàn thao tác khi xe đang nâng; Cấm sử dụng xe nâng người sai mục đích.",
      "Cấm rời khỏi sàn thao tác; Cấm sử dụng xe nâng người sai mục đích và chở người khi tiến hành di chuyển/tham gia giao thông.",
      "Cấm vận hành nơi có các phương tiện di động khác đang làm việc; Cấm rời khỏi sàn thao tác; Cấm chở người khi tiến hành di chuyển/tham gia giao thông."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 336
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về quản lý xe nâng người như thế nào?",
    "options": [
      "Đơn vị sử dụng phải lập sổ theo dõi tình trạng của xe, nhật trình sử dụng.",
      "Đơn vị sử dụng phải lập nhật ký theo dõi tình trạng của xe, nhật trình sử dụng.",
      "Đơn vị sử dụng phải cử người theo dõi tình trạng của xe, nhật trình sử dụng.",
      "Đơn vị sử dụng phải lập nhật ký theo dõi tình trạng sự cố của xe."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 337
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định những nội dung kiểm tra trước  khi sử dụng pa lăng xích kéo tay thì nội dung nào không đúng (không phù hợp)?",
    "options": [
      "Pa lăng còn đang trong thời hạn kiểm định; B. Trục, cóc hãm, dây xích, móc phải đảm bảo an toàn mớ i cho phé p sử dụng;",
      "Vị trí treo pa lăng phải rộng rãi, không gần đường giao thông và đô thị.",
      "Vật cần nâng phù hợ p với tải trọng cho phé p của pa lăng; Vị trí treo pa lăng phải chắc chắn, chịu được toàn bộ tải trọng.",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "NMD",
    "id": 338
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định kiểm tra tải trọng khi sử dụng pa lăng xích kéo tay như thế nào?",
    "options": [
      "Khi nâng tải trọng lên vị trí khoảng 10cm phải dừng lại để kiểm tra an toàn mới được  nâng tiế p; B. Khi nâng tải trọng lên vị trí khoảng 30cm phải dừng lại để kiểm tra an toàn mới được  nâng tiế p; C. Khi nâng tải trọng lên vị trí khoảng 50cm phải dừng lại để kiểm tra an toàn mới được  nâng tiế p;",
      "Khi nâng tải trọng lên vị trí khoảng 20cm phải dừng lại để kiểm tra an toàn mới được  nâng tiế p;",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 1,
    "category": "NMD",
    "id": 339
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, điều cấm nào không đúng trong quy định khi sử dụng pa lăng xích kéo tay?",
    "options": [
      "Cấm kiểm tra an toàn khi bắt đầu nâng tait trọng lên.",
      "Cấm để dây xích bị xoắn hay thắt nút, vận hành pa lăng khi chốt móc bị hỏng; C. Cấm treo vật nặng lơ lửng trên pa lăng khi không có người giám sát; Cấm dùng xích của pa lăng để quàng vào vật cần nâng; D. Nâng tải trọng lớn hơn giá trị cho phé p của pa lăng; Để người đứng dưới tải trọng",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 340
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định khi sử dụng xích kéo tay như thế nào?",
    "options": [
      "Khi dây xích khi bị đứt không được nối mà phải thay thế bằng xích mớ i.",
      "Không được tự chế, lắ p động cơ điện để điều khiển pa lăng xích; Không đượ c kéo quá nhanh vì sẽ làm cho tải trọng bị lắc trong quá trình nâng hạ.",
      "Không dùng xích của pa lăng để quàng vào vật cần nâng.",
      "Tất cả các đáp án trên (dưới) đều đúng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 341
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, nội dung cơ bản nhận diện mối nguy khi hàn điện, hàn hơi là ?",
    "options": [
      "Điện giật do chạm, chập vào các bộ phận dẫn điện; Tai nạn giao thông; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Bỏng lạnh B. Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Bỏng lạnh; Cháy, nổ; Khói bụi.",
      "Điện giật do chạm mỏ hàn; Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng lạnh; Cháy, nổ.",
      "Điện giật do rò, chạm, chập vào các bộ phận dẫn điện; Bức xạ có hại do hồ quang điện; Khí, bụi độc hại; Bỏng do hạt kim loại nóng chảy, kim loại có nhiệt độ cao; Cháy, nổ.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 342
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, đối với những người được phép tiến hành công tác hàn, điều kiện nào không đúng (không cần thiết)?",
    "options": [
      "Được đào tạo về chuyên môn về phóng chống thiên tai và cứu nạn cứu hộ.",
      "Được huấn luyện, bồi dưỡng nghiệp vụ phòng cháy chữa cháy và được cấp giấy chứng nhận huấn luyện nghiệp vụ phòng cháy và chữa cháy.",
      "Sử dụng đầy đủ các PTBVCN: mặt nạ có kính hàn, quần áo, mũ, găng tay bằng vật liệu khó cháy, cách điện và chịu được các tác động cơ học.",
      "Được đào tạo về chuyên môn, có chứng chỉ hoặc do cơ sở đào tạo hợp pháp cấp; Được huấn luyện, kiểm tra sát hạch về quy trình kỹ thuật an toàn - bảo hộ lao động và có thẻ an toàn."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 343
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, yêu cầu chung về thực hiện công tác hàn về khoảng cách an toàn như thế nào?",
    "options": [
      "Bảo đảm khoảng cách an toàn theo quy định.",
      "Khi hàn ở tầng trên, thì các tầng phía dưới (khi không có sàn chống cháy bảo vệ) phải dọn sạch các chất dễ cháy nổ trong bán kính không nhỏ hơn 5m.",
      "Di chuyển vật tư thiết bị, hàng hóa dễ cháy hoặc che chắn không để vảy hàn rơi xuống tối thiểu 10m",
      "Tất cả các đáp án trên (dưới) đều đúng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 344
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi hành điện, hàn hơi, điều cấm nào không đúng (không phù hợp)?",
    "options": [
      "Không được tiến hành đồng thời cả hàn hơi và hàn điện trong các thùng kín; B. Cấm hàn khi có các chất dễ bắt lửa như xăng, axêton, spirit trắng ở gần vị trí hàn.",
      "Cấm hàn ở khoảng cách dưới 5m so với vị trí để các chất dễ cháy nổ.",
      "Cấm hàn ở khoảng cách dưới 10m so với vị trí để các chất dễ cháy nổ.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 345
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn trong các thùng kín (trong không gian hạn chế) như thế nào?",
    "options": [
      "Phải có đèn chiếu sáng đặt ở bên ngoài hoặc dùng đèn di động cầm tay, điện áp không lớn hơn 36V.",
      "Phải dùng biến áp cách ly cho đèn chiếu sáng và đặt máy biến áp ở bên ngoài thùng kín.",
      "Cấm dùng biến áp tự ngẫu để hạ áp.",
      "Tất cả các đáp án trên (dưới) đều đúng."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 346
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về nối đất thiết bị hàn điện như thế nào?",
    "options": [
      "Phải nối đất phần kim loại của máy hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Phải nối đất phần kim loại của thiết bị, vật được hàn điện cũng như các kết cấu và sản phẩm hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Phải nối đất phần kim loại của thiết bị được hàn điện cũng như các kết cấu và sản phẩm hàn và máy hàn theo quy định trước khi thiết bị được nối vào nguồn.",
      "Không phải nối đất phần kim loại của thiết bị được hàn điện cũng như các kết cấu và sản phẩm hàn, chỉ nối đất máy hàn theo quy định trước khi thiết bị được nối vào nguồn."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 347
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn trong các thùng kín bằng kim loại như thế nào?",
    "options": [
      "Máy hàn phải để ngoài, thợ hàn phải được trang bị mũ bảo hộ lao động, giầy hoặc thảm cách điện và găng tay cao su. mặt nạ phòng độc có dây mềm dẫn không khí.",
      "Máy hàn phải để trong thùng, thợ hàn phải được trang bị mũ bảo hộ lao động, giầy hoặc thảm cách điện và găng tay cao su. mặt nạ phòng độc có dây mềm dẫn không khí.",
      "Thợ hàn phải được trang bị mũ bảo hộ lao động, giầy hoặc thảm cách điện và găng tay cao su. mặt nạ phòng độc có dây mềm dẫn không khí.",
      "Máy hàn phải để ngoài, thợ hàn phải được trang bị bộ quần áo chống cháy và bình thở ô xy."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 348
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn điện ở nơi đông người cùng làm việc và người qua lại như thế nào?",
    "options": [
      "Phải lập rào chắn để ngăn và bảo vệ những người xung quanh.",
      "Phải có tấm chắn bằng vật liệu không cháy để ngăn và bảo vệ những người xung quanh.",
      "Phải đặt biển “Cấm vào ” để ngăn và bảo vệ những người xung quanh.",
      "Phải đặt biển “Cấm lại gần ” để ngăn và bảo vệ những người xung quanh."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 349
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định BPAT khi hàn điện ở trên cao, nội dung nào không đúng?",
    "options": [
      "Hàn trên giàn giáo bằng gỗ, sàn của nó phải được phủ kín bằng tấm kim loại, các tông amiăng hay bằng những vật liệu khó cháy khác.",
      "Hàn điện ở tầng trên phải có biện pháp bảo vệ những người làm việc ở tầng dưới khỏi bị các giọt kim loại, các mẩu que hàn cháy dở văng hoặc rơi trúng vào người hay các vật dễ cháy ở phía dưới.",
      "Không cho phép hàn điện có bố trí 2 tầng; Phải có biện pháp bảo vệ khỏi bị các giọt kim loại, các mẩu que hàn cháy dở văng hoặc rơi trúng vào người hay các vật dễ cháy.",
      "Hàn điện trên cao mà không có giàn giáo người thợ hàn nhất thiết phải dùng dây đai an toàn bền nhiệt, có túi đựng dụng cụ, điện cực và các vật cháy dở."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 350
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vào làm việc với hệ thống ắc quy phải thực hiện trang phục BHLĐ nào?",
    "options": [
      "Mặc quần áo BHLĐ và đeo găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm.",
      "Đeo kính bảo vệ mắt và găng tay cách điện để bảo vệ cơ thể khỏi bị điện giât.",
      "Mặc quần áo chuyên dụng, đeo kính bảo vệ mắt và găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm.",
      "Mặc quần áo chuyên dụng, đeo kính hàn bảo vệ mắt và găng tay cao su để bảo vệ cơ thể khỏi bị ảnh hưởng do axít hoặc kiềm."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 351
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, khi vào làm việc với hệ thống ắc quy phải chuẩn bị những vật liệu, hóa chất nào?",
    "options": [
      "Chuẩn bị a xít phù hợp với hệ thống ắc quy. Trang bị các chai cồn (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai dung dịch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị các chất lau rửa hệ hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Chuẩn bị chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 352
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, trước khi vào làm việc với hệ thống ắc quy phải kiểm tra những nội dung gì?",
    "options": [
      "Phải kiểm tra phòng ắc quy đã được  thông gió để phòng ngừa bị ngộ độc hoặc cháy nổ do khí phát sinh từ hệ thống ắc quy.",
      "Kiểm tra a xít phù hợp với hệ thống ắc quy. Trang bị các chai cồn (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Kiểm tra chất trung hoà phù hợp với hệ thống ắc quy. Trang bị các chai dung dịch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt.",
      "Kiểm tra các chất lau rửa hệ hệ thống ắc quy. Trang bị các chai nước sạch (để phun rửa mắt) để đề phòng khi bị dung dịch điện phân bắn vào mắt."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 353
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về ghi nhãn trên các bình chứa axít, chứa dung dịch axít, nước cất như thế nào?",
    "options": [
      "Ghi rõ trên thành bình từng loại bằng sơn chống gỉ.",
      "Ghi rõ trên thành bình từng loại bằng sơn chống axít.",
      "Ghi rõ, dán giấy tên trên thành bình từng loại.",
      "Ghi rõ trên thành bình từng loại bằng bút mực không xóa."
    ],
    "correct": 1,
    "category": "NMD",
    "id": 354
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định về bảo quản axít đậm đặc như thế nào?",
    "options": [
      "Phải để trong các buồng kín, ngoài axít ra không được phép để dung dịch trung hoà cùng; axít phải để trong các bình chuyên dùng bằng nhựa tổng hợp, thủy tinh hay sành sứ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng sắt mạ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng nhựa tổng hợp, thủy tinh hay sành sứ có nắp đậy và quai xách.",
      "Phải để trong các buồng riêng, ngoài axít ra chỉ được phép để dung dịch trung hoà; axít phải để trong các bình chuyên dùng bằng hợp kim nhôm có nắp đậy và quai xách."
    ],
    "correct": 2,
    "category": "NMD",
    "id": 355
  },
  {
    "question": "Theo Quy trình An toàn thủy, cơ, nhiệt, hóa, quy định pha chế a xit như thế nào?",
    "options": [
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ nước cất theo đũa thuỷ tinh vào bình axít và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải dùng 2 vòi, cùng rót axít và nước cất vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ axít theo đũa sắt mạ vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt.",
      "Khi pha chế axít thành dung dịch phải rót từng tia nhỏ axít theo đũa thuỷ tinh vào bình nước cất và luôn luôn khuấy để toả nhiệt tốt."
    ],
    "correct": 3,
    "category": "NMD",
    "id": 356
  },
  {
    "question": "Theo Theo Quy trình An toàn thủy, cơ, nhiệt, hóa thì điều cấm nào sau đây không đúng khi làm việc, sử dụng và pha chế ắc quy?",
    "options": [
      "Cấm hút thuốc, sử dụng bật lửa, lò sưởi trong buồng chứa ắc-quy B. Cấm để nước cất và dung dịch trung hoà ở chỗ cửa ra vào của buồng ắc-quy.",
      "Cấm đổ nước cất vào axít để pha chế thành dung dịch.",
      "Cấm rót axít vào nước cất để pha chế thành dung dịch.",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 357
  },
  {
    "question": "Trường hợp khẩn cấp không thể trì hoãn được (cháy hoặc có nguy cơ đe dọa đến tính mạng con người hoặc an toàn thiết bị) tại nhà máy điện hoặc lưới điện, nhân viên vận hành được phép?",
    "options": [
      "Ý 1 - Thao tác được thực hiện bằng điều khiển từ xa thông qua mạch nhị thứ hoặc màn hình điều khiển, các thao tác này không có nguy cơ gây tai nạn cho Nhân viên vận hành.",
      "Ý 2 - Xin lệnh các cấp điều độ liên quan để cắt các máy cắt và Dao cách ly để cô lập điểm sự cố, bất thường, tai nạn,….",
      "Ý 3 - Sau khi xử lý xong, Nhân viên vận hành phải báo cáo ngay cho Nhân viên vận hành cấp trên trực tiếp.",
      "Cả Ý 1 và Ý 3 đều đúng"
    ],
    "correct": 3,
    "category": "NMD",
    "id": 358
  },
  {
    "question": "Sau khi làm việc xong, muốn đóng điện lại vào thiết bị đã cắt điện thì phải thỏa mãn các điều kiện nào sau đây?",
    "options": [
      "Đã khóa phiếu công tác, nếu thiết bị đóng điện có liên quan đến nhiều đơn vị công tác thì phải khóa tất cả các phiếu công tác, đảm bảo thiết bị sẽ đóng điện tuyệt đối an toàn.",
      "Nơi làm việc đã tháo biển báo và rào chắn tạm thời khi làm việc (nếu có), đặt lại rào chắn cố định.",
      "Tại nơi trực vận hành của đơn vị quản lý vận hành đã tháo hết các dấu hiệu báo có đơn vị công tác làm việc trên sơ đồ. Được phép đóng điện của cấp có quyền điều khiển thiết bị theo quy định.",
      "Tất cả các đáp án trên (dưới) đều đúng"
    ],
    "correct": 3,
    "category": "NMD",
    "id": 359
  },
  {
    "question": "Chỉ được thao tác thiết bị đóng cắt trên cột với cấp điện áp đến 35 kV bằng sào cách điện khi điều kiện khoảng cách từ phần dẫn điện thấp nhất của các thiết bị điện này đến người thao tác không nhỏ hơn?",
    "options": [
      "1m",
      "2m",
      "3m",
      "4m"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 360
  },
  {
    "question": "Máy biến áp đang vận hành, cho phép thực hiện những công việc nào sau đây?",
    "options": [
      "Điều chỉnh bằng tay nấc phân áp của bộ điều áp không tải.",
      "Tháo dây trung tính MBA để củng cố và sửa chữa tiếp đất.",
      "Lấy mẫu dầu máy biến áp (Chú ý kiểm tra nối đất vỏ máy trước).",
      "Tất cả các đáp án trên (dưới) đều đúng"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 361
  },
  {
    "question": "Thanh cái, thiết bị điện tại nhà máy, trạm điện cho phép không cần nối đất di động nếu đủ điều kiện?",
    "options": [
      "Đã được cách ly hoàn toàn B. Đã khóa thiết bị đóng cắt liên quan để tránh thao tác nhầm.",
      "Đã được nối đất/tiếp địa cố định.",
      "Tất cả các đáp án trên (dưới) đều đúng",
      "Đáp án D"
    ],
    "correct": 2,
    "category": "NMD",
    "id": 362
  },
  {
    "question": "Yêu cầu nào sau đây là sai khi làm việc ở rotor tổ máy?",
    "options": [
      "Nhiệt độ tại vị trí làm việc không quá 34OC, nếu không giảm được nhiệt độ phải có biện pháp thông gió cục bộ.",
      "Các cửa để ra vào làm việc phải đặt rào chắn và treo biển cảnh báo theo quy định.",
      "Tổ máy dừng, thực hiện biện pháp chống quay, đã cô lập về điện máy phát từ mọi phía.",
      "Người làm việc phải thực hiện đầy đủ các trang bị phương tiện bảo vệ cá nhân theo quy định và có sức khỏe tốt."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 363
  },
  {
    "question": "Theo Quy trình An toàn điện, việc bảo dưỡng chổi than khi động cơ điện đang làm việc, nội dung nào không bắt buộc phải thự c hiện?",
    "options": [
      "Phải lập Phương án TCTC và BPAT mới được thực hiện",
      "Nhân viên được đào tạo cho nhiệm vụ này và sử dụng các công cụ bảo vệ mặt và mắt, quần áo bảo hộ, đề phòng việc cuốn đi bởi các phần quay của động cơ điện; Sử dụng giày và thảm cách điện; C. Sử dụng giày, găng tay và thảm cách điện để làm việc. Không đồng thời tiếp xúc tay tới các phần mang điện của hai cực hoặc phần mang điện và phần được nối đất.",
      "Khi mài nhẵn vành của Rotor trong động cơ điện đang quay phải sử dụng các khuôn bằng vật liệu cách điện.",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 364
  },
  {
    "question": "Theo Quy trình An toàn điện quy định về trang phục khi làm việc ở máy phát điện và máy bù đồng bộ như thế nào?",
    "options": [
      "Người làm việc phải mặc gọn gàng, nữ giới phải đội mũ, tóc cuốn gọn",
      "Người làm việc phải mặc trang phục BHLĐ, đội mũ nhựa.",
      "Người làm việc phải mặc gọn gàng, đi ủng cách điện, nữ giới phải đội mũ, tóc cuốn gọn D. Người làm việc phải mang găng tay cách điện, nữ giới phải đội mũ, tóc cuốn gọn",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 365
  },
  {
    "question": "Theo Quy trình An toàn điện, nếu máy phát, máy bù có điểm trung tính nối với điểm trung tính của máy phát, máy bù khác (hoặc của hệ thống) thì khi sửa chữa ở mạch Stator phải thực hiện như thế nào?",
    "options": [
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải đeo găng tay cách điện cao áp.",
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải đeo găng tay cách điện hạ áp.",
      "Không cần tách điểm trung tính ra khỏi hệ thống nhưng khi làm việc này phải đeo găng tay cách điện cao áp.",
      "Phải tách điểm trung tính ra khỏi hệ thống, làm việc này phải đeo găng tay, đi ủng cách điện cao áp."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 366
  },
  {
    "question": "Theo Quy trình An toàn điện, quy định khi sửa chữa vành tiếp xúc của Rotor, vành góp của bộ kích từ máy phát như thế nào?",
    "options": [
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải sử dụng các công cụ bảo vệ mặt và mắt khỏi các tác động cơ khí.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo PTT. Phải sử dụng các công cụ bảo vệ mặt và mắt khỏi các tác động cơ khí.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor, mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải xây dựng Phương án an toàn.",
      "Cho phép tiến hành tiện và mài các vành tiếp xúc của Rotor , mài vành góp của bộ kích từ máy phát khi sửa chữa theo mệnh lệnh. Phải sử dụng phương tiện cách điện cho người làm việc."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 367
  },
  {
    "question": "Theo Quy trình An toàn điện, biện pháp an toàn nào không đúng khi bảo dưỡng các thiết bị chổi than khi máy phát đang làm việc ?",
    "options": [
      "Phải cắt tải của máy phát, để máy phát chạy ở chế độ bù.",
      "Khi làm việc phải đội mũ bảo vệ và sử dụng các công cụ bảo vệ mặt và mắt, quần áo được đóng cúc để tránh việc bị cuốn đi bởi các phần quay của máy móc; C. Sử dụng ủng cách điện, thảm cách điện và găng tay cách điện tránh tiếp xúc ngẫu nhiên các phần cơ thể với các phần được nối đất; D. Không đồng thời chạm tay đến các phần mang điện của hai cực hoặc các phần mang điện và phần được nối đất.",
      "Đáp án C",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 368
  },
  {
    "question": "Theo Quy trình An toàn điện, khi sửa chữa động cơ điện cao áp, BPAT nào không đúng (không phải áp dụng) ?",
    "options": [
      "Không phải cắt điện động cơ để sửa chữa nếu khảo sát kỹ, thực hiện theo Phương án đã duyệt.",
      "Cắt điện, khoá bộ phận truyền động của máy cắt và dao cách ly; treo biển cảnh báo “Cấm đóng điện!",
      "Nếu động cơ có đặt chung điểm trung tính thì phải tách điểm trung tính ra khỏi hệ thống; D. Nếu đầu cáp của động cơ điện đã tháo rời thì các công việc tiến hành trên động cơ phải theo phương án được phê duyệt.",
      "Đáp án D"
    ],
    "correct": 0,
    "category": "NMD",
    "id": 369
  },
  {
    "question": "Theo Quy trình An toàn điện, việc cắt điện để đảm bảo an toàn khi sửa chữa động cơ điện cao áp, quy định nào không bắt buộc phải áp dụng?",
    "options": [
      "Đặt rào chắn, khoanh vùng công tác khi sửa chữa động cơ điện.",
      "Cắt điện nguồn điều khiển từ xa bằng tay và điều khiển tự động các động cơ điện của van chặn, máy điều hướng.",
      "Trên tay lái của chốt, tấm chắn, cánh quạt phải treo biển báo an toàn.",
      "Trên khóa, các nút ấn điều khiển động cơ điện của van chặn thì treo “Cấm đóng điện! Có người đang làm việc”."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 370
  },
  {
    "question": "Theo Quy trình An toàn điện, điều kiện để thực hiện công việc trên động cơ điện đang quay là gì?",
    "options": [
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay mà không tiếp xúc với các phần mang điện và quay.",
      "Không cho phép thực hiện công việc trên động cơ điện đang quay trong mọi trườn g hợ  p.",
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay mà không tiếp xúc với các phần mang điện và vỏ động cơ.",
      "Cho phép thực hiện công việc theo mệnh lệnh trên động cơ điện đang quay khi tiếp xúc với các phần mang điện và quay."
    ],
    "correct": 0,
    "category": "NMD",
    "id": 371
  }
];

const CATEGORIES_INFO = {
  "PCCC": 64,
  "QT_ATD": 105,
  "ATD": 59,
  "TBA": 65,
  "NMD": 78
};

function getRandomQuestions(totalQuestions = 30, settings = null) {
  if (!settings) {
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(totalQuestions, shuffled.length));
  }

  // Định nghĩa thứ tự các category
  const categoryOrder = ['PCCC', 'QT_ATD', 'ATD', 'TBA', 'NMD'];

  let selectedQuestions = [];

  // Chọn câu hỏi theo thứ tự category
  for (const category of categoryOrder) {
    const count = settings[category] || 0;
    if (count <= 0) continue;

    const categoryQuestions = QUESTION_BANK.filter(q => q.category === category);
    // Xáo trộn câu hỏi trong category
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    // Thêm vào mảng kết quả (giữ nguyên thứ tự category)
    selectedQuestions = selectedQuestions.concat(shuffled.slice(0, Math.min(count, shuffled.length)));
  }

  // Nếu thiếu câu hỏi, bổ sung từ các category còn lại
  if (selectedQuestions.length < totalQuestions) {
    const selectedIds = new Set(selectedQuestions.map(q => q.id));
    const remaining = QUESTION_BANK.filter(q => !selectedIds.has(q.id));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    selectedQuestions = selectedQuestions.concat(shuffled.slice(0, totalQuestions - selectedQuestions.length));
  }

  // KHÔNG xáo trộn lại - giữ nguyên thứ tự theo category
  return selectedQuestions.slice(0, totalQuestions);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK, CATEGORIES_INFO, getRandomQuestions };
}
