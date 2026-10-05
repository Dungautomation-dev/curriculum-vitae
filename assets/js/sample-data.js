/**
 * Curriculum Vitae (CV Creator) - Sample Profiles Data
 * Default: Kỹ Sư Điện (Nguyễn Văn An) & Multi-industry presets
 * Author: Dung Automation
 */

const CV_SAMPLE_PROFILES = (function () {
  // Default Profile: Senior Electrical & Automation Engineer
  const ELECTRICAL_ENGINEER_DEFAULT = {
    profileId: 'electrical-engineer',
    industryId: 'electrical-tech',
    templateId: 'tpl-001',
    skillRatingMode: 'percentage', // 'percentage' | 'stars' | 'dots'
    language: 'vi',
    
    // Personal Details
    personalInfo: {
      fullName: 'NGUYỄN VĂN AN',
      jobTitle: 'KỸ SƯ ĐIỆN CÔNG NGHIỆP & TỰ ĐỘNG HÓA',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'nguyenvanan.ee@gmail.com',
      phone: '0988 123 456',
      address: 'Cầu Giấy, Hà Nội, Việt Nam',
      dateOfBirth: '15/08/1996',
      gender: 'Nam',
      website: 'https://linkedin.com/in/nguyenvanan-ee',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Độc thân'
    },

    // 1. Giới thiệu bản thân / Mục tiêu nghề nghiệp
    summary: 'Kỹ sư Điện với hơn 5 năm kinh nghiệm chuyên sâu trong thiết kế hệ thống điện động lực, lập trình điều khiển PLC/SCADA và giám sát thi công cơ điện M&E cho các nhà máy công nghiệp và tòa nhà cao tầng. Am hiểu tường tận các tiêu chuẩn kỹ thuật an toàn điện IEC, TCVN và NFPA. Định hướng phát triển thành Chuyên gia Trưởng Quản lý Cơ Điện (M&E Project Manager) mang lại các giải pháp năng lượng tối ưu, an toàn và tiết kiệm chi phí cho doanh nghiệp.',

    // 2. Học vấn
    education: [
      {
        id: 'edu-1',
        degree: 'Kỹ Sư Kỹ Thuật Điện (Chương trình Tiên tiến)',
        school: 'Đại Học Bách Khoa Hà Nội',
        period: '2014 - 2019',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.62 / 4.0',
        description: 'Đồ án tốt nghiệp: "Thiết kế và mô phỏng hệ thống điều khiển tự động hóa dây chuyền đóng gói sử dụng PLC Siemens S7-1200 kết hợp giám sát SCADA WinCC" (Điểm bảo vệ: 9.5/10).'
      },
      {
        id: 'edu-2',
        degree: 'Khóa Đào Tạo Chuyên Viên Thiết Kế M&E Tòa Nhà',
        school: 'Viện Đào Tạo Kỹ Thuật Ứng Dụng VinaMEP',
        period: '2019 - 2020',
        score: 'Chứng chỉ Xuất sắc',
        description: 'Thành thạo tính toán tải điện chiếu sáng, trạm biến áp, máy phát điện dự phòng và hệ thống chống sét lan truyền theo TCVN 9385:2012.'
      }
    ],

    // 3. Kinh nghiệm làm việc
    experience: [
      {
        id: 'exp-1',
        position: 'Kỹ Sư Trưởng Thiết Kế Điện & Tự Động Hóa',
        company: 'Công Ty Cổ Phần Kỹ Thuật & Cơ Điện VinaTech',
        period: '03/2023 - Hiện tại',
        location: 'Hà Nội',
        description: '• Chủ trì thiết kế sơ đồ nguyên lý 1 sợi, bản vẽ bố trí thiết bị và tủ bảng điện MSB, MDB, MCC cho 4 dự án nhà xưởng quy mô 20.000m2.\n• Trực tiếp lập trình hệ thống PLC Siemens S7-1500 điều khiển trạm bơm nước tuần hoàn và xử lý nước thải công nghiệp đạt hiệu suất vận hành 99.8%.\n• Lập bảng bóc tách khối lượng (BOQ), dự toán vật tư và phối hợp với chủ đầu tư thẩm định thiết kế kỹ thuật, tiết kiệm 12% chi phí cáp điện động lực.\n• Đào tạo và hướng dẫn chuyên môn thiết kế AutoCAD Electrical và EPLAN cho 6 kỹ sư trẻ.'
      },
      {
        id: 'exp-2',
        position: 'Kỹ Sư Giám Sát Thi Công Cơ Điện M&E',
        company: 'Tổng Công Ty Xây Dựng & Lắp Máy Thăng Long',
        period: '08/2020 - 02/2023',
        location: 'Bắc Ninh & Hà Nội',
        description: '• Giám sát lắp đặt trạm biến áp hợp bộ 2x2000kVA, hệ thống máy phát điện dự phòng Cummins 1500kVA và hệ thống chống sét tĩnh điện.\n• Quản lý nghiệm thu lắp đặt khay cáp điện (Cable Tray), hệ thống chiếu sáng công nghiệp và tủ phân phối tầng đúng tiến độ cam kết.\n• Đảm bảo 100% tuân thủ các quy tắc an toàn lao động, kiểm định điện trở đất đạt chuẩn R < 4 Ohm trước khi đóng điện bàn giao.'
      },
      {
        id: 'exp-3',
        position: 'Kỹ Sư Điện Thực Tập & Vận Hành Bảo Trì',
        company: 'Nhà Máy Chế Tạo Thiết Bị Điện ABB Việt Nam',
        period: '02/2019 - 07/2020',
        location: 'Bắc Ninh',
        description: '• Tham gia kiểm định chất lượng xuất xưởng tủ hạ thế và máy cắt không khí ACB, MCCB.\n• Thực hiện đo kiểm các thông số cách điện, tỷ số biến dòng biến áp và lập biên bản kiểm tra thử nghiệm (Factory Acceptance Test - FAT).'
      }
    ],

    // 4. Kỹ năng chuyên môn (Hard Skills) - Có thể hiển thị dạng %, Sao ⭐, hoặc Điểm chấm
    hardSkills: [
      { id: 'hs-1', name: 'AutoCAD Electrical & EPLAN Pro Panel', rating: 95, stars: 5 },
      { id: 'hs-2', name: 'Lập trình PLC Siemens S7-1200 / S7-1500 & TIA Portal', rating: 90, stars: 5 },
      { id: 'hs-3', name: 'Thiết kế hệ thống SCADA WinCC & Màn hình HMI', rating: 85, stars: 4 },
      { id: 'hs-4', name: 'Tiêu chuẩn an toàn điện IEC, TCVN, NFPA', rating: 95, stars: 5 },
      { id: 'hs-5', name: 'Bóc tách khối lượng (BOQ) & Dự toán hệ thống M&E', rating: 85, stars: 4 },
      { id: 'hs-6', name: 'Phần mềm mô phỏng hệ thống điện ETAP & MATLAB', rating: 80, stars: 4 },
      { id: 'hs-7', name: 'Đo kiểm điện trở đất, trạm biến áp & đóng cắt trung thế', rating: 90, stars: 5 }
    ],

    // 5. Kỹ năng mềm (Soft Skills)
    softSkills: [
      { id: 'ss-1', name: 'Quản lý dự án & tiến độ thi công công trình' },
      { id: 'ss-2', name: 'Xử lý sự cố kỹ thuật khẩn cấp & tư duy an toàn 100%' },
      { id: 'ss-3', name: 'Làm việc nhóm & điều phối liên bộ môn Xây dựng - Cơ khí - Điện' },
      { id: 'ss-4', name: 'Giao tiếp & thuyết trình giải pháp kỹ thuật trước chủ đầu tư' },
      { id: 'ss-5', name: 'Quản lý thời gian & phân công nhân lực hiện trường' }
    ],

    // 6. Ưu điểm / Thế mạnh (Strengths)
    strengths: [
      { id: 'st-1', name: 'Tỉ mỉ, cẩn trọng tuyệt đối với an toàn tính mạng & thiết bị điện' },
      { id: 'st-2', name: 'Khả năng đọc hiểu tài liệu datasheet và tiêu chuẩn tiếng Anh chuyên ngành tốt' },
      { id: 'st-3', name: 'Chịu được áp lực tiến độ cao, sẵn sàng bám sát hiện trường thi công' },
      { id: 'st-4', name: 'Chủ động cập nhật công nghệ tự động hóa và năng lượng xanh mới' }
    ],

    // 7. Sở thích (Hobbies)
    hobbies: [
      { id: 'hb-1', name: 'Nghiên cứu mạch vi điều khiển IoT (ESP32/Arduino) điều khiển nhà thông minh' },
      { id: 'hb-2', name: 'Đọc tạp chí Kỹ thuật Tự động hóa và Năng lượng tái tạo' },
      { id: 'hb-3', name: 'Chơi cờ vua rèn luyện tư duy phân tích chiến thuật' },
      { id: 'hb-4', name: 'Tập chạy bộ marathon cự ly 10km rèn luyện sức bền' }
    ],

    // 8. Chứng chỉ chuyên môn (Certifications)
    certifications: [
      {
        id: 'cert-1',
        name: 'Chứng Chỉ Hành Nghề Giám Sát Thi Công Cơ Điện Hạng II',
        issuer: 'Sở Xây Dựng Hà Nội',
        year: '2023 - 2028'
      },
      {
        id: 'cert-2',
        name: 'Chứng Nhận An Toàn Lao Động Vệ Sinh Lao Động (Nhóm 3)',
        issuer: 'Cục An Toàn Lao Động',
        year: '2024 - 2026'
      },
      {
        id: 'cert-3',
        name: 'Chứng Chỉ Lập Trình Điều Khiển PLC Siemens TIA Portal Chuyên Sâu',
        issuer: 'Trung Tâm Tự Động Hóa Bách Khoa',
        year: '2022'
      },
      {
        id: 'cert-4',
        name: 'Chứng Chỉ Tiếng Anh Quốc Tế TOEIC 780 Điểm',
        issuer: 'IIG Vietnam',
        year: '2023'
      }
    ],

    // 9. Dự án tiêu biểu (Key Projects)
    projects: [
      {
        id: 'prj-1',
        name: 'Hệ Thống Điện Động Lực & Tự Động Hóa Nhà Máy Dược Phẩm BioPharma',
        role: 'Kỹ Sư Trưởng Thiết Kế',
        period: '06/2023 - 01/2024',
        tech: 'AutoCAD Electrical, EPLAN, PLC Siemens S7-1500, SCADA WinCC, Tủ điện IP65',
        description: 'Thiết kế toàn bộ hệ thống tủ phân phối MSB 2500A, 12 tủ nhánh MCC và mạng truyền thông Profinet giám sát nhiệt độ phòng sạch đạt tiêu chuẩn GMP-WHO.'
      },
      {
        id: 'prj-2',
        name: 'Giám Sát Thi Công Cơ Điện Khách Sạn 5 Sao Grand Palace Hotel',
        role: 'Kỹ Sư Giám Sát Hiện Trường',
        period: '10/2021 - 12/2022',
        tech: 'Trạm biến áp 2x1600kVA, Máy phát điện Kohler, Hệ thống BMS, Chống sét Ingesco',
        description: 'Giám sát lắp đặt hoàn thiện trạm biến áp, lộ cáp ngầm trung thế 22kV và toàn bộ hệ thống phân phối điện năng 25 tầng khách sạn đúng tiến độ chất lượng.'
      }
    ],

    // 10. Giải thưởng & Thành tích (Awards & Honors)
    awards: [
      {
        id: 'awd-1',
        title: 'Kỹ Sư Tiêu Biểu Xuất Sắc Của Năm 2024',
        organization: 'Công Ty CP Kỹ Thuật VinaTech',
        year: '2024'
      },
      {
        id: 'awd-2',
        title: 'Giải Ba Cuộc Thi Sáng Tạo Robot Sinh Viên BK-Robocon',
        organization: 'Đại Học Bách Khoa Hà Nội',
        year: '2018'
      }
    ],

    // 11. Ngôn ngữ (Languages)
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ (Native)' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo kỹ thuật & giao tiếp (TOEIC 780)' }
    ],

    // 12. Người tham chiếu (References)
    references: [
      {
        id: 'ref-1',
        name: 'TS. Trần Quốc Hùng',
        title: 'Phó Trưởng Khoa Điện • ĐH Bách Khoa Hà Nội',
        contact: 'Email: hung.tq@hust.edu.vn • ĐT: 0912 345 678'
      },
      {
        id: 'ref-2',
        name: 'Ông Lê Đức Dũng',
        title: 'Giám Đốc Kỹ Thuật • VinaTech Corp',
        contact: 'Email: dung.le@vinatech.vn • ĐT: 0989 999 888'
      }
    ]
  };

  // Additional Industry Profiles for 1-Click Testing
  const IT_DEVELOPER_DATA = {
    profileId: 'it-developer',
    industryId: 'it-software',
    templateId: 'tpl-011',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'TRẦN MINH QUÂN',
      jobTitle: 'SENIOR FULLSTACK DEVELOPER (NODE.JS & REACT)',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'minhquan.dev@gmail.com',
      phone: '0977 888 999',
      address: 'Đống Đa, Hà Nội, Việt Nam',
      dateOfBirth: '20/11/1997',
      gender: 'Nam',
      website: 'https://github.com/minhquan-dev',
      driverLicense: 'Hạng A1, B2',
      maritalStatus: 'Độc thân'
    },
    summary: 'Lập trình viên Fullstack với hơn 6 năm kinh nghiệm phát triển các hệ thống Web quy mô lớn (High Traffic), kiến trúc Microservices và ứng dụng đám mây (AWS/GCP). Thành thạo React, Next.js, Node.js, TypeScript và tối ưu hóa cơ sở dữ liệu PostgreSQL/Redis. Đam mê mã nguồn mở và clean code.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Công Nghệ Thông Tin (Khoa Học Máy Tính)',
        school: 'Đại Học Công Nghệ - ĐHQG Hà Nội',
        period: '2015 - 2019',
        score: 'GPA: 3.55 / 4.0 • Xuất sắc',
        description: 'Nghiên cứu kiến trúc Microservices phân tán và thuật toán nén dữ liệu thời gian thực.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Senior Fullstack Engineer / Tech Lead',
        company: 'VinaPay Fintech Platform',
        period: '2022 - Hiện tại',
        location: 'Hà Nội',
        description: '• Xây dựng và mở rộng hệ thống cổng thanh toán phục vụ hơn 2.5 triệu người dùng hoạt động hàng tháng (MAU).\n• Tối ưu hóa độ trễ xử lý API từ 350ms xuống còn 65ms bằng Redis caching và kết nối bất đồng bộ RabbitMQ.\n• Dẫn dắt đội ngũ 8 lập trình viên áp dụng CI/CD tự động hóa trên AWS EKS.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'JavaScript / TypeScript & Node.js', rating: 95, stars: 5 },
      { id: 'hs-2', name: 'React.js, Next.js & Redux Toolkit', rating: 90, stars: 5 },
      { id: 'hs-3', name: 'PostgreSQL, MySQL, MongoDB & Redis', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Docker, Kubernetes, AWS & CI/CD Pipeline', rating: 85, stars: 4 },
      { id: 'hs-5', name: 'Kiến trúc Microservices, RESTful API & GraphQL', rating: 90, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Tư duy phản biện & giải quyết bài toán thuật toán hóc búa' },
      { id: 'ss-2', name: 'Kỹ năng lãnh đạo kỹ thuật (Technical Leadership) & Code Review' },
      { id: 'ss-3', name: 'Giao tiếp tiếng Anh lưu loát với đối tác nước ngoài' }
    ],
    strengths: [
      { id: 'st-1', name: 'Khả năng tự học công nghệ mới cực nhanh' },
      { id: 'st-2', name: 'Tôn chỉ viết mã sạch, dễ bảo trì và có tài liệu đầy đủ' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Đóng góp cho các dự án mã nguồn mở trên GitHub' },
      { id: 'hb-2', name: 'Chơi guitar acoustic giải tỏa căng thẳng' }
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Hệ Thống Ví Điện Tử Đa Nền Tảng FastWallet',
        role: 'Lead Architect',
        period: '2023 - 2024',
        tech: 'Next.js, Node.js NestJS, Kafka, PostgreSQL, Docker',
        description: 'Phát triển kiến trúc thanh toán xử lý 5,000 giao dịch/giây (TPS) bảo mật 2 lớp chuẩn PCI-DSS.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top 3 Giải Lập Trình Hackathon Toàn Quốc 2023', organization: 'Hiệp hội Phần mềm Vinasa', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'IELTS 7.5' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Hoàng Văn Nam', title: 'CTO • FastWallet Tech', contact: 'nam.hoang@fastwallet.vn' }
    ]
  };

  return {
    getDefaultProfile: () => JSON.parse(JSON.stringify(ELECTRICAL_ENGINEER_DEFAULT)),
    getProfileByIndustry: (indId) => {
      if (indId === 'it-software') {
        return JSON.parse(JSON.stringify(IT_DEVELOPER_DATA));
      }
      return JSON.parse(JSON.stringify(ELECTRICAL_ENGINEER_DEFAULT));
    }
  };
})();
