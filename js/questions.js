/**
 * Ngân hàng câu hỏi mẫu
 * 
 * HƯỚNG DẪN BẢO MẬT:
 * 1. Trong môi trường production, nên lưu câu hỏi ở backend/database
 * 2. Có thể mã hóa Base64 để tăng tính bảo mật cơ bản
 * 3. Xem xét sử dụng Firebase hoặc backend API để lưu trữ
 * 
 * CẤU TRÚC CÂU HỎI:
 * {
 *   id: number,           // ID duy nhất
 *   question: string,     // Nội dung câu hỏi
 *   options: string[],    // Mảng 4 đáp án
 *   correct: number,      // Index đáp án đúng (0-3)
 *   category: string      // Danh mục (optional)
 * }
 */

const QUESTION_BANK = [
    {
        id: 1,
        question: "Theo Quy trình An toàn điện thì trường hợp nào Người chỉ huy trực tiếp được giữ lại PCT khi nghỉ hết ngày làm việc?",
        options: [
            "Không cho phép giữ lại PCT trong mọi trường hợp.",
            "Làm việc trong TBA nhiều ngày liên tục.",
            "Làm việc trên đường dây, nếu nơi làm việc ở quá xa nơi trực vận hành và được sự thống nhất từ trước giữa ĐVLCV với ĐVQLVH.",
            "Làm việc trên máy phát hoặc máy bù đồng bộ nhiều ngày liên tục."
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 2,
        question: "Theo quy trình an toàn điện, khi đưa dụng cụ, vật liệu lên cao để làm việc được quy định như thế nào?",
        options: [
            "Phải dùng dây trực tiếp hoặc qua puly để kéo lên, hạ xuống, người ở dưới phải giữ một đầu dây và không đứng gần sát vị trí làm việc tính theo phương thẳng đứng.",
            "Có thể mang theo người hoặc chuyển tay qua người khác.",
            "Dùng dây trực tiếp kéo lên hạ xuống không cần qua puly.",
            "Tất cả các phương án trên."
        ],
        correct: 0,
        category: "An toàn điện"
    },
    {
        id: 3,
        question: "Trực vận hành Điện lực cấp số PCT, quản lý số PCT theo đơn vị nào?",
        options: [
            "Trực vận hành Điện lực cấp số PCT, quản lý số PCT theo Điện lực.",
            "Đội trưởng, Trưởng phòng cấp số PCT, quản lý số PCT theo Đội, Phòng thuộc Điện lực.",
            "Trực vận hành Điện lực cấp số PCT, quản lý số PCT theo cấp Đội, Phòng thuộc Điện lực."
        ],
        correct: 0,
        category: "Quản lý vận hành"
    },
    {
        id: 4,
        question: "Khi tiến hành công việc trên thiết bị điện, yêu cầu bắt buộc nào sau đây phải được thực hiện?",
        options: [
            "Cắt điện, khóa và treo biển báo cấm đóng điện.",
            "Kiểm tra không còn điện.",
            "Tiếp đất bảo vệ.",
            "Tất cả các yêu cầu trên."
        ],
        correct: 3,
        category: "An toàn điện"
    },
    {
        id: 5,
        question: "Theo quy trình an toàn điện, người được giao nhiệm vụ chỉ huy trực tiếp công việc phải có trách nhiệm gì?",
        options: [
            "Chỉ huy, giám sát đơn vị công tác trong suốt quá trình tiến hành công việc.",
            "Ký xác nhận vào PCT khi nhận được PCT.",
            "Kiểm tra các biện pháp an toàn trước khi tiến hành công việc.",
            "Tất cả các nhiệm vụ trên."
        ],
        correct: 3,
        category: "An toàn điện"
    },
    {
        id: 6,
        question: "Khoảng cách an toàn điện với đường dây cao áp từ 110kV đến 220kV là bao nhiêu?",
        options: [
            "1.0 mét",
            "1.5 mét",
            "2.0 mét",
            "2.5 mét"
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 7,
        question: "Phiếu công tác (PCT) được cấp cho mỗi đơn vị công tác và có giá trị trong thời gian bao lâu?",
        options: [
            "Không quá 3 ngày.",
            "Không quá 5 ngày.",
            "Không quá 7 ngày.",
            "Không quá 10 ngày."
        ],
        correct: 2,
        category: "Quản lý vận hành"
    },
    {
        id: 8,
        question: "Tiếp đất bảo vệ khi làm việc trên đường dây cao áp phải được thực hiện như thế nào?",
        options: [
            "Chỉ cần tiếp đất một phía của nơi làm việc.",
            "Phải tiếp đất hai phía nơi làm việc, đảm bảo nơi làm việc nằm giữa hai bộ tiếp đất.",
            "Không cần tiếp đất nếu đã cắt điện.",
            "Tiếp đất từ xa đến gần nơi làm việc."
        ],
        correct: 1,
        category: "An toàn điện"
    },
    {
        id: 9,
        question: "Người lao động làm công việc vận hành, thí nghiệm, sửa chữa... đường dây và thiết bị điện phải có bằng an toàn bậc mấy trở lên?",
        options: [
            "Bậc 1/5",
            "Bậc 2/5",
            "Bậc 3/5",
            "Bậc 4/5"
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 10,
        question: "Khi phát hiện có người bị điện giật, hành động đầu tiên cần làm là gì?",
        options: [
            "Gọi điện thoại báo cấp cứu ngay.",
            "Tách nạn nhân ra khỏi nguồn điện một cách nhanh nhất và an toàn nhất.",
            "Hô hấp nhân tạo cho nạn nhân.",
            "Đưa nạn nhân đến bệnh viện."
        ],
        correct: 1,
        category: "Sơ cứu điện"
    },
    {
        id: 11,
        question: "Theo quy định, việc kiểm tra định kỳ thiết bị bảo vệ cá nhân phải được thực hiện như thế nào?",
        options: [
            "Mỗi tháng một lần.",
            "Mỗi 3 tháng một lần.",
            "Mỗi 6 tháng một lần.",
            "Mỗi năm một lần."
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 12,
        question: "Biển báo an toàn điện 'CẤM ĐÓNG ĐIỆN! CÓ NGƯỜI LÀM VIỆC' thuộc loại biển báo nào?",
        options: [
            "Biển báo cấm.",
            "Biển báo chỉ dẫn.",
            "Biển báo nguy hiểm.",
            "Biển báo nhắc nhở."
        ],
        correct: 0,
        category: "Biển báo an toàn"
    },
    {
        id: 13,
        question: "Khi làm việc trên cao từ 3m trở lên, người lao động bắt buộc phải sử dụng thiết bị bảo hộ nào?",
        options: [
            "Mũ bảo hộ.",
            "Giày bảo hộ.",
            "Dây đai an toàn.",
            "Găng tay cách điện."
        ],
        correct: 2,
        category: "Bảo hộ lao động"
    },
    {
        id: 14,
        question: "Điện áp an toàn cho người trong điều kiện bình thường không được vượt quá bao nhiêu vôn?",
        options: [
            "12V",
            "24V",
            "36V",
            "48V"
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 15,
        question: "Theo quy trình, việc cấp lệnh công tác được thực hiện bằng hình thức nào?",
        options: [
            "Chỉ bằng văn bản.",
            "Chỉ bằng miệng.",
            "Bằng văn bản hoặc bằng miệng tùy theo tính chất công việc.",
            "Bằng tin nhắn điện tử."
        ],
        correct: 2,
        category: "Quản lý vận hành"
    },
    {
        id: 16,
        question: "Người chỉ huy trực tiếp (NCHTT) phải có bậc an toàn tối thiểu là bậc mấy?",
        options: [
            "Bậc 3/5",
            "Bậc 4/5",
            "Bậc 5/5",
            "Bậc 2/5"
        ],
        correct: 1,
        category: "An toàn điện"
    },
    {
        id: 17,
        question: "Khi thao tác trên lưới điện cao áp, thứ tự thao tác đúng khi cắt điện là gì?",
        options: [
            "Cắt máy cắt trước, sau đó cắt dao cách ly.",
            "Cắt dao cách ly trước, sau đó cắt máy cắt.",
            "Có thể thực hiện theo bất kỳ thứ tự nào.",
            "Cắt cầu chì trước, sau đó cắt máy cắt và dao cách ly."
        ],
        correct: 0,
        category: "Thao tác điện"
    },
    {
        id: 18,
        question: "Găng tay cách điện hạ áp được sử dụng cho điện áp đến bao nhiêu vôn?",
        options: [
            "500V",
            "1000V",
            "3000V",
            "6000V"
        ],
        correct: 1,
        category: "Bảo hộ lao động"
    },
    {
        id: 19,
        question: "Quy định về khoảng cách an toàn tối thiểu khi làm việc gần đường dây điện 22kV là bao nhiêu?",
        options: [
            "0.7 mét",
            "1.0 mét",
            "1.5 mét",
            "2.0 mét"
        ],
        correct: 0,
        category: "An toàn điện"
    },
    {
        id: 20,
        question: "Theo quy định, một PCT có thể được gia hạn tối đa bao nhiêu lần?",
        options: [
            "1 lần",
            "2 lần",
            "3 lần",
            "Không giới hạn"
        ],
        correct: 1,
        category: "Quản lý vận hành"
    },
    {
        id: 21,
        question: "Khi hô hấp nhân tạo cho nạn nhân bị điện giật, tần suất thổi ngạt là bao nhiêu lần/phút?",
        options: [
            "8-10 lần/phút",
            "12-16 lần/phút",
            "18-20 lần/phút",
            "20-25 lần/phút"
        ],
        correct: 1,
        category: "Sơ cứu điện"
    },
    {
        id: 22,
        question: "Thiết bị nào sau đây KHÔNG thuộc danh mục thiết bị bảo vệ cá nhân khi làm việc với điện?",
        options: [
            "Găng tay cách điện",
            "Ủng cách điện",
            "Mũ bảo hộ thông thường",
            "Sào cách điện"
        ],
        correct: 2,
        category: "Bảo hộ lao động"
    },
    {
        id: 23,
        question: "Theo quy định, đơn vị quản lý vận hành có trách nhiệm gì khi bàn giao hiện trường?",
        options: [
            "Kiểm tra lại các biện pháp an toàn đã thực hiện.",
            "Cho phép đơn vị công tác bắt đầu làm việc.",
            "Cùng đại diện đơn vị công tác kiểm tra và ký vào PCT.",
            "Tất cả các nhiệm vụ trên."
        ],
        correct: 3,
        category: "Quản lý vận hành"
    },
    {
        id: 24,
        question: "Dòng điện bao nhiêu mA đi qua cơ thể người có thể gây nguy hiểm đến tính mạng?",
        options: [
            "10mA",
            "25mA",
            "50mA",
            "100mA"
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 25,
        question: "Trong trường hợp nào được phép đóng điện trở lại mà không cần thu hồi PCT?",
        options: [
            "Khi có lệnh của cấp trên.",
            "Khi xảy ra sự cố khẩn cấp cần khôi phục điện.",
            "Không có trường hợp nào được phép.",
            "Khi đội trưởng đồng ý."
        ],
        correct: 2,
        category: "Quản lý vận hành"
    },
    {
        id: 26,
        question: "Bút thử điện hạ áp thường được sử dụng để kiểm tra điện áp trong phạm vi nào?",
        options: [
            "Đến 250V",
            "Đến 500V",
            "Đến 1000V",
            "Đến 1500V"
        ],
        correct: 1,
        category: "Dụng cụ an toàn"
    },
    {
        id: 27,
        question: "Khi có sự cố điện xảy ra, thứ tự ưu tiên xử lý là gì?",
        options: [
            "Khắc phục sự cố, bảo vệ người, bảo vệ thiết bị.",
            "Bảo vệ người, bảo vệ thiết bị, khắc phục sự cố.",
            "Bảo vệ thiết bị, bảo vệ người, khắc phục sự cố.",
            "Báo cáo cấp trên, bảo vệ người, khắc phục sự cố."
        ],
        correct: 1,
        category: "Xử lý sự cố"
    },
    {
        id: 28,
        question: "Theo quy định, nhân viên đơn vị công tác khi làm việc có điện phải mặc trang phục như thế nào?",
        options: [
            "Mặc quần áo thường ngày.",
            "Mặc quần áo bảo hộ lao động theo đúng quy định.",
            "Mặc quần áo tùy ý, miễn sao thoải mái.",
            "Không có quy định cụ thể."
        ],
        correct: 1,
        category: "Bảo hộ lao động"
    },
    {
        id: 29,
        question: "Điện trở nối đất của hệ thống tiếp đất an toàn trong trạm biến áp thường phải đạt giá trị bao nhiêu?",
        options: [
            "Không quá 0.5 Ohm",
            "Không quá 1 Ohm",
            "Không quá 4 Ohm",
            "Không quá 10 Ohm"
        ],
        correct: 2,
        category: "An toàn điện"
    },
    {
        id: 30,
        question: "Khi làm việc gần thiết bị điện cao áp đang vận hành, phải tuân thủ nguyên tắc nào?",
        options: [
            "Chỉ cần cảnh giác, không có quy định cụ thể.",
            "Giữ khoảng cách an toàn và có người giám sát.",
            "Có thể làm việc một mình nếu có kinh nghiệm.",
            "Không được phép làm việc trong mọi trường hợp."
        ],
        correct: 1,
        category: "An toàn điện"
    }
];

// Fix mojibake Vietnamese strings (UTF-8 bytes interpreted as Latin-1)
function fixMojibake(str) {
    if (typeof str !== 'string') return str;
    if (!/[ÃÂÄ]/.test(str)) return str;
    try {
        const bytes = Uint8Array.from(str, ch => ch.charCodeAt(0));
        return new TextDecoder('utf-8').decode(bytes);
    } catch (err) {
        try {
            return decodeURIComponent(escape(str));
        } catch (err2) {
            return str;
        }
    }
}

const NORMALIZED_QUESTION_BANK = QUESTION_BANK.map((q) => ({
    ...q,
    question: fixMojibake(q.question),
    options: Array.isArray(q.options) ? q.options.map(fixMojibake) : q.options,
    category: fixMojibake(q.category)
}));

/**
 * Hàm random và lấy câu hỏi cho bài thi
 * @param {number} count - Số lượng câu hỏi cần lấy
 * @returns {Array} - Mảng câu hỏi đã được random
 */
function getRandomQuestions(count = 30) {
    const shuffled = [...NORMALIZED_QUESTION_BANK].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Hàm mã hóa câu hỏi (Base64) - cho bảo mật cơ bản
 * @param {Array} questions - Mảng câu hỏi
 * @returns {string} - Chuỗi đã mã hóa
 */
function encodeQuestions(questions) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(questions))));
}

/**
 * Hàm giải mã câu hỏi
 * @param {string} encoded - Chuỗi đã mã hóa
 * @returns {Array} - Mảng câu hỏi
 */
function decodeQuestions(encoded) {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTION_BANK, getRandomQuestions, encodeQuestions, decodeQuestions };
}
