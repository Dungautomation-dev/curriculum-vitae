/**
 * Curriculum Vitae (CV Creator) - 10 Authentic Industry Profiles
 * Default: Kỹ Sư Điện (Nguyễn Văn An)
 * 10 ngành nghề phong phú với dữ liệu thực tế chuyên sâu
 * Author: Dung Automation
 */

const CV_SAMPLE_PROFILES = (function () {

  // 1. NGÀNH KỸ THUẬT - ĐIỆN - TỰ ĐỘNG HÓA (MẶC ĐỊNH KHI MỞ TRANG)
  const ELECTRICAL_ENGINEER_DEFAULT = {
    profileId: 'electrical-engineer',
    industryId: 'electrical-tech',
    templateId: 'tpl-001',
    skillRatingMode: 'percentage',
    language: 'vi',
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
    summary: 'Kỹ sư Điện với hơn 5 năm kinh nghiệm chuyên sâu trong thiết kế hệ thống điện động lực, lập trình điều khiển PLC/SCADA và giám sát thi công cơ điện M&E cho các nhà máy công nghiệp và tòa nhà cao tầng. Am hiểu tường tận các tiêu chuẩn kỹ thuật an toàn điện IEC, TCVN và NFPA. Định hướng phát triển thành Chuyên gia Trưởng Quản lý Cơ Điện (M&E Project Manager) mang lại các giải pháp năng lượng tối ưu, an toàn và tiết kiệm chi phí cho doanh nghiệp.',
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
    hardSkills: [
      { id: 'hs-1', name: 'Lập trình PLC Siemens S7-1200 / S7-1500 & TIA Portal', rating: 95, stars: 5 },
      { id: 'hs-2', name: 'Thiết kế sơ đồ điện EPLAN Electric P8 & AutoCAD Electrical', rating: 90, stars: 5 },
      { id: 'hs-3', name: 'Giao diện HMI & Hệ thống giám sát SCADA WinCC / Ignition', rating: 85, stars: 4 },
      { id: 'hs-4', name: 'Thiết kế tủ điện động lực & điều khiển MSB, MDB, MCC, ATS', rating: 92, stars: 5 },
      { id: 'hs-5', name: 'Tính toán ngắn mạch & phân phối điện Dialux, ETAP', rating: 80, stars: 4 },
      { id: 'hs-6', name: 'Tiêu chuẩn an toàn điện IEC 60364, TCVN & NFPA 70', rating: 88, stars: 4 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Kỹ năng giải quyết sự cố kỹ thuật khẩn cấp tại hiện trường' },
      { id: 'ss-2', name: 'Quản lý tiến độ dự án & phối hợp đa bộ môn (Cơ - Điện - Xây dựng)' },
      { id: 'ss-3', name: 'Kỹ năng giao tiếp & thuyết trình giải pháp kỹ thuật trước chủ đầu tư' }
    ],
    strengths: [
      { id: 'st-1', name: 'Tỉ mỉ, cẩn trọng tuyệt đối với an toàn tính mạng & thiết bị điện' },
      { id: 'st-2', name: 'Khả năng đọc hiểu tài liệu datasheet và tiêu chuẩn tiếng Anh chuyên ngành tốt' },
      { id: 'st-3', name: 'Chịu được áp lực tiến độ cao, sẵn sàng bám sát hiện trường thi công' },
      { id: 'st-4', name: 'Chủ động cập nhật công nghệ tự động hóa và năng lượng xanh mới' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Nghiên cứu mạch vi điều khiển IoT (ESP32/Arduino) điều khiển nhà thông minh' },
      { id: 'hb-2', name: 'Đọc tạp chí kỹ thuật Tự động hóa và Năng lượng tái tạo' },
      { id: 'hb-3', name: 'Chơi cờ vua rèn luyện tư duy phân tích chiến thuật' },
      { id: 'hb-4', name: 'Tập chạy bộ marathon cự ly 10km rèn luyện sức bền' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Chứng Chỉ Hành Nghề Giám Sát Thi Công Cơ Điện Hạng II', issuer: 'Sở Xây Dựng Hà Nội', year: '2022' },
      { id: 'cert-2', name: 'Chứng Chỉ Kỹ Sư Lập Trình Tự Động Hóa Siemens PLC Certified', issuer: 'Siemens Vietnam Training Center', year: '2021' },
      { id: 'cert-3', name: 'Chứng Chỉ Huấn Luyện An Toàn Điện Nhóm 3', issuer: 'Cục An Toàn Lao Động', year: '2023' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Hệ Thống Tự Động Hóa Trạm Xử Lý Nước Thải Tập Trung KCN Yên Phong',
        role: 'Chủ trì thiết kế & Lập trình điều khiển chính',
        period: '04/2023 - 11/2023',
        tech: 'Siemens S7-1500, WinCC Unified, Biến tần Danfoss FC-202, Profinet Industrial',
        description: 'Tự động hóa hoàn toàn quy trình xử lý nước 5.000m3/ngày đêm, cảnh báo sự cố qua SMS/Email, giảm thiểu 4 nhân công vận hành thủ công.'
      },
      {
        id: 'prj-2',
        name: 'Thi Công Hệ Thống Trạm Biến Áp & Điện Động Lực Tòa Nhà TechPark Tower',
        role: 'Kỹ sư giám sát trưởng hạng mục Điện',
        period: '01/2022 - 10/2022',
        tech: 'Máy biến áp khô 2500kVA, Tủ trung thế RMU Schneider, Máy phát điện Cummins 1750kVA',
        description: 'Bàn giao đúng hạn 100% công tác đóng điện thử nghiệm, không xảy ra bất kỳ sự cố mất an toàn lao động nào.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Nhân Viên Xuất Sắc Nhất Năm 2023 (Best Employee of the Year)', organization: 'Công Ty CP Kỹ Thuật & Cơ Điện VinaTech', year: '2023' },
      { id: 'awd-2', title: 'Giải Ba Cuộc Thi Sáng Tạo Robot Sinh Viên BK-Robocon 2018', organization: 'Trường Đại Học Bách Khoa Hà Nội', year: '2018' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ (Native)' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo kỹ thuật & giao tiếp (TOEIC 780)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Trần Quốc Tuấn', title: 'Giám Đốc Kỹ Thuật • VinaTech Corp', contact: 'tuan.tq@vinatech-me.com.vn | 0913 888 999' }
    ]
  };

  // 2. NGÀNH CÔNG NGHỆ THÔNG TIN - LẬP TRÌNH VIÊN (IT & SOFTWARE)
  const IT_DEVELOPER_DATA = {
    profileId: 'it-developer',
    industryId: 'it-software',
    templateId: 'tpl-002',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'TRẦN MINH ĐỨC',
      jobTitle: 'SENIOR FULLSTACK DEVELOPER & TECH LEAD',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'duc.tran.dev@gmail.com',
      phone: '0977 889 900',
      address: 'Thanh Xuân, Hà Nội, Việt Nam',
      dateOfBirth: '20/11/1995',
      gender: 'Nam',
      website: 'https://github.com/duc-tran-dev',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Độc thân'
    },
    summary: 'Senior Fullstack Developer với hơn 6 năm kinh nghiệm phát triển các nền tảng ứng dụng web quy mô lớn, thương mại điện tử và giải pháp FinTech xử lý hàng triệu giao dịch mỗi ngày. Chuyên sâu về React, Node.js, kiến trúc Microservices và hạ tầng đám mây AWS. Đam mê tối ưu hóa hiệu năng, clean code và xây dựng đội ngũ kỹ thuật tự chủ, linh hoạt theo chuẩn Agile/Scrum.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Khoa Học Máy Tính & Công Nghệ Phần Mềm',
        school: 'Trường Đại Học Công Nghệ – ĐHQG Hà Nội (UET)',
        period: '2013 - 2017',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.55 / 4.0',
        description: 'Đề tài nghiên cứu: "Tối ưu hóa phân tán dữ liệu thời gian thực trong kiến trúc vi dịch vụ Microservices sử dụng Apache Kafka và Redis".'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Senior Fullstack Engineer & Team Lead',
        company: 'VinaPay FinTech Platform Corp',
        period: '05/2021 - Hiện tại',
        location: 'Hà Nội',
        description: '• Dẫn dắt đội ngũ 10 kỹ sư phát triển cổng thanh toán phục vụ 3.2 triệu người dùng hoạt động hàng tháng (MAU).\n• Giảm thời gian phản hồi API trung bình từ 320ms xuống 68ms nhờ tối ưu Redis caching và cơ chế xử lý hàng đợi RabbitMQ.\n• Triển khai thành công hạ tầng Kubernetes (EKS) và tự động hóa toàn bộ CI/CD Pipeline bằng GitHub Actions, giúp giảm 80% thời gian phát hành phiên bản.'
      },
      {
        id: 'exp-2',
        position: 'Fullstack Web Developer',
        company: 'Nexus Software Solutions Global',
        period: '07/2017 - 04/2021',
        location: 'Hà Nội',
        description: '• Xây dựng hệ thống SaaS quản lý kho đa kênh cho thị trường Nhật Bản sử dụng Next.js, TypeScript và PostgreSQL.\n• Tái cấu trúc mã nguồn Frontend sang React Hooks & Redux Toolkit, tăng 40% hiệu suất render trang và giảm kích thước bundle 35%.\n• Hướng dẫn chuyên môn và trực tiếp review code cho hơn 12 lập trình viên Fresher & Junior.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'TypeScript, JavaScript (ES6+), Node.js, NestJS', rating: 95, stars: 5 },
      { id: 'hs-2', name: 'React.js, Next.js, Redux Toolkit, TailwindCSS', rating: 92, stars: 5 },
      { id: 'hs-3', name: 'PostgreSQL, MySQL, MongoDB, Redis, Prisma ORM', rating: 88, stars: 4 },
      { id: 'hs-4', name: 'Docker, Kubernetes, AWS (S3, EC2, RDS, Lambda)', rating: 85, stars: 4 },
      { id: 'hs-5', name: 'Kiến trúc Microservices, RESTful API, GraphQL & Kafka', rating: 90, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Tư duy thuật toán, giải quyết vấn đề kỹ thuật phức tạp (Problem Solving)' },
      { id: 'ss-2', name: 'Khả năng lãnh đạo kỹ thuật (Technical Leadership) & Mentoring' },
      { id: 'ss-3', name: 'Làm việc nhóm linh hoạt theo quy trình Agile / Scrum' }
    ],
    strengths: [
      { id: 'st-1', name: 'Khả năng tự nghiên cứu và tiếp thu công nghệ mới nhanh chóng' },
      { id: 'st-2', name: 'Cam kết viết mã sạch (Clean Code), có kiểm thử tự động (Unit Test)' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Đóng góp cho các dự án mã nguồn mở trên GitHub' },
      { id: 'hb-2', name: 'Đọc sách công nghệ và tham gia các hội thảo Dev Community' }
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' },
      { id: 'cert-2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Cloud Native Computing Foundation', year: '2022' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Hệ Thống Ví Điện Tử Đa Nền Tảng FastWallet Pro',
        role: 'Tech Lead & Kiến trúc sư hệ thống chính',
        period: '02/2023 - 12/2023',
        tech: 'Next.js 14, NestJS, PostgreSQL, Kafka, Redis, Docker, AWS EKS',
        description: 'Xử lý ổn định 4.500 giao dịch/giây (TPS) vào khung giờ cao điểm, đáp ứng tiêu chuẩn an toàn bảo mật tài chính PCI-DSS Level 1.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top 3 Giải Lập Trình Hackathon Toàn Quốc 2023', organization: 'Hiệp hội Phần mềm Vinasa', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'IELTS 7.5 (Làm việc trực tiếp khách hàng US/EU)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Hoàng Văn Nam', title: 'CTO • FastWallet Tech', contact: 'nam.hoang@fastwallet.vn' }
    ]
  };

  // 3. NGÀNH KINH DOANH - BÁN HÀNG (SALES & BUSINESS DEVELOPMENT)
  const SALES_MANAGER_DATA = {
    profileId: 'sales-manager',
    industryId: 'business-sales',
    templateId: 'tpl-003',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'HOÀNG THỊ MAI LINH',
      jobTitle: 'B2B ENTERPRISE SALES MANAGER',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'mailinh.salesb2b@gmail.com',
      phone: '0915 678 890',
      address: 'Quận 1, TP. Hồ Chí Minh',
      dateOfBirth: '12/04/1994',
      gender: 'Nữ',
      website: 'https://linkedin.com/in/mailinh-sales-expert',
      driverLicense: 'Hạng B1',
      maritalStatus: 'Độc thân'
    },
    summary: 'Chuyên gia Quản lý Bán hàng B2B với 7 năm kinh nghiệm xuất sắc trong lĩnh vực giải pháp công nghệ doanh nghiệp và dịch vụ tài chính. Đã từng dẫn dắt đội ngũ kinh doanh mang về doanh số hơn 65 tỷ VNĐ/năm, vượt chỉ tiêu KPI liên tục 4 năm liên tiếp. Sở hữu mạng lưới quan hệ sâu rộng với các tập đoàn đa quốc gia và kỹ năng đàm phán hợp đồng giá trị lớn.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Quản Trị Kinh Doanh Quốc Tế',
        school: 'Trường Đại Học Ngoại Thương (FTU2)',
        period: '2012 - 2016',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.52 / 4.0',
        description: 'Chuyên ngành Kinh doanh Quốc tế, Chủ nhiệm CLB Doanh nhân tương lai.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Trưởng Phòng Kinh Doanh Doanh Nghiệp (B2B Sales Head)',
        company: 'Tập Đoàn Giải Pháp Phần Mềm MegaCorp Global',
        period: '01/2021 - Hiện tại',
        location: 'TP. Hồ Chí Minh',
        description: '• Quản trị đội ngũ 14 nhân sự Sales B2B, quản lý pipeline khách hàng Enterprise trị giá hơn 120 tỷ VNĐ.\n• Đạt doanh thu 68.5 tỷ VNĐ trong năm 2023, vượt 135% chỉ tiêu năm đề ra của Hội đồng quản trị.\n• Đàm phán và ký kết thành công 5 hợp đồng chiến lược cấp tập đoàn với ngân hàng và tập đoàn bán lẻ hàng đầu.'
      },
      {
        id: 'exp-2',
        position: 'Chuyên Viên Cao Cấp Phát Triển Khách Hàng Trọng Tâm (Key Account Manager)',
        company: 'Công Ty Dịch Vụ Đám Mây & Viễn Thông TelTech',
        period: '06/2016 - 12/2020',
        location: 'TP. Hồ Chí Minh',
        description: '• Phát triển và chăm sóc danh mục 45 khách hàng trọng điểm thuộc khối Ngân hàng và Bảo hiểm.\n• Tăng tỷ lệ duy trì khách hàng (Retention Rate) lên 94% và thúc đẩy doanh thu bán thêm (Upsell) tăng 35% mỗi năm.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Đàm phán & Chốt hợp đồng lớn (Enterprise Deal Closing)', rating: 96, stars: 5 },
      { id: 'hs-2', name: 'Quản lý quan hệ khách hàng & CRM Salesforce, HubSpot', rating: 92, stars: 5 },
      { id: 'hs-3', name: 'Xây dựng chiến lược mở rộng thị trường & Kênh phân phối', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Dự báo doanh số, phân tích chỉ tiêu KPI & Pipeline Funnel', rating: 88, stars: 4 },
      { id: 'hs-5', name: 'Thuyết trình giải pháp & Pitching tài trợ', rating: 94, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Giao tiếp thuyết phục và thấu cảm tâm lý khách hàng sắc bén' },
      { id: 'ss-2', name: 'Khả năng truyền cảm hứng và dẫn dắt đội ngũ kinh doanh áp lực cao' },
      { id: 'ss-3', name: 'Xây dựng và duy trì mạng lưới đối tác chiến lược bền vững' }
    ],
    strengths: [
      { id: 'st-1', name: 'Mục tiêu rõ ràng, định hướng kết quả (Result-Oriented) mạnh mẽ' },
      { id: 'st-2', name: 'Khả năng thích ứng linh hoạt và giải quyết khiếu nại khách hàng khéo léo' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Đánh golf giao lưu kết nối đối tác' },
      { id: 'hb-2', name: 'Tham gia các diễn đàn kinh tế và đọc sách chiến lược kinh doanh' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Certified Sales Executive (CSE)', issuer: 'SMEI Quốc Tế', year: '2022' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Dự Án Số Hóa Vận Hành Toàn Diện Ngân Hàng ACB Khối Doanh Nghiệp',
        role: 'Trưởng nhóm tư vấn thương mại & Đàm phán hợp đồng',
        period: '03/2023 - 09/2023',
        tech: 'Hợp đồng ERP Cloud 3 năm trị giá 22.8 tỷ VNĐ',
        description: 'Vượt qua 4 đối thủ cạnh tranh quốc tế để giành quyền triển khai gói giải pháp chuyển đổi số toàn diện.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top Sales Performer of the Year Toàn Quốc', organization: 'MegaCorp Global', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo đàm phán quốc tế (TOEIC 920)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Đặng Lê Minh', title: 'Phó Tổng Giám Đốc Kinh Doanh • MegaCorp', contact: 'minh.dang@megacorp.vn' }
    ]
  };

  // 4. NGÀNH MARKETING - TRUYỀN THÔNG SỐ (MARKETING & GROWTH)
  const MARKETING_LEAD_DATA = {
    profileId: 'marketing-lead',
    industryId: 'marketing-media',
    templateId: 'tpl-004',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'LÊ PHƯƠNG THẢO',
      jobTitle: 'SENIOR DIGITAL MARKETING & GROWTH LEAD',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'phuongthao.growth@gmail.com',
      phone: '0903 456 789',
      address: 'Đống Đa, Hà Nội',
      dateOfBirth: '05/09/1995',
      gender: 'Nữ',
      website: 'https://linkedin.com/in/phuongthao-growth',
      driverLicense: 'Hạng B1',
      maritalStatus: 'Độc thân'
    },
    summary: 'Senior Digital Marketing & Growth Lead với hơn 6 năm kinh nghiệm thực chiến trong hoạch định chiến lược tiếp thị đa kênh (Omnichannel), quản lý ngân sách quảng cáo hơn 15 tỷ VNĐ/năm và tối ưu hóa tỷ lệ chuyển đổi ROI cho các thương hiệu FMCG và E-Commerce. Sở hữu tư duy phân tích dữ liệu chuyên sâu kết hợp khả năng sáng tạo nội dung dẫn đầu xu hướng TikTok & Social Media.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Tiếp Thị & Truyền Thông Marketing Tích Hợp',
        school: 'Trường Đại Học Kinh Tế Quốc Dân (NEU)',
        period: '2013 - 2017',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.58 / 4.0',
        description: 'Thủ khoa chuyên ngành Marketing Tích hợp (IMC).'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Trưởng Nhóm Tăng Trưởng Số (Growth Marketing Lead)',
        company: 'VinaCosmetics Beauty E-Commerce',
        period: '04/2021 - Hiện tại',
        location: 'Hà Nội',
        description: '• Quản lý ngân sách Digital Ads 1.2 tỷ VNĐ/tháng trên các kênh Meta, TikTok Ads và Google Performance Max.\n• Tăng trưởng doanh thu kênh online 220% YoY, giảm chi phí thu nạp khách hàng mới (CAC) 28% và tăng chỉ số ROAS lên 4.8x.\n• Xây dựng kênh TikTok thương hiệu đạt hơn 1.2 triệu người theo dõi và 15 video đạt xu hướng triệu view.'
      },
      {
        id: 'exp-2',
        position: 'Chuyên Viên Hiệu Suất Quảng Cáo (Performance Marketing Specialist)',
        company: 'Ogilvy One Agency Vietnam',
        period: '08/2017 - 03/2021',
        location: 'Hà Nội',
        description: '• Trực tiếp tối ưu chiến dịch quảng cáo đa kênh cho hơn 15 khách hàng doanh nghiệp trong ngành F&B và Bất động sản.\n• Thực hiện A/B Testing liên tục hàng trăm mẫu quảng cáo creative, giúp cải thiện tỷ lệ nhấp chuột (CTR) từ 1.8% lên 3.6%.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Meta Ads, TikTok Ads & Google Ads (Search, Shopping, PMax)', rating: 96, stars: 5 },
      { id: 'hs-2', name: 'Tối ưu hóa công cụ tìm kiếm (SEO) & Content Strategy', rating: 88, stars: 4 },
      { id: 'hs-3', name: 'Phân tích dữ liệu Google Analytics 4, Looker Studio, Mixpanel', rating: 92, stars: 5 },
      { id: 'hs-4', name: 'Tối ưu tỷ lệ chuyển đổi (CRO) & Automation Email Marketing', rating: 85, stars: 4 },
      { id: 'hs-5', name: 'Chiến dịch truyền thông Viral, KOLs / KOCs Booking', rating: 90, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Nhạy bén với các trào lưu nội dung xu hướng mới (Trend-spotting)' },
      { id: 'ss-2', name: 'Tư duy ra quyết định dựa trên dữ liệu định lượng (Data-Driven)' },
      { id: 'ss-3', name: 'Kỹ năng phối hợp nhịp nhàng giữa đội ngũ Thiết kế, Content và Ads' }
    ],
    strengths: [
      { id: 'st-1', name: 'Khả năng sáng tạo không giới hạn và tư duy tăng trưởng bứt phá' },
      { id: 'st-2', name: 'Khả năng quản lý ngân sách chặt chẽ, tối ưu từng đồng chi phí' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Sáng tạo nội dung video ngắn chia sẻ mẹo làm đẹp và phong cách sống' },
      { id: 'hb-2', name: 'Nhiếp ảnh đường phố và thiết kế đồ họa cảm hứng' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Google Ads Search & Measurement Professional', issuer: 'Google Skillshop', year: '2023' },
      { id: 'cert-2', name: 'Meta Certified Media Buying Professional', issuer: 'Meta Blueprint', year: '2022' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Chiến Dịch Ra Mắt Dòng Sản Phẩm Son Hữu Cơ GreenLip Mega Viral',
        role: 'Giám đốc chiến dịch truyền thông',
        period: '08/2023 - 11/2023',
        tech: 'TikTok Live Shopping, Meta Reels, KOC Affiliate Network',
        description: 'Cháy hàng 50.000 cây son chỉ sau 48 giờ mở bán trên TikTok Shop, doanh số cán mốc 12 tỷ VNĐ.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Chiến Dịch Tiếp Thị Sáng Tạo Của Năm (MMA Smarties Awards Bronze)', organization: 'Mobile Marketing Association', year: '2022' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'IELTS 7.0 (Thành thạo công việc)' }
    ],
    references: [
      { id: 'ref-1', name: 'Bà Nguyễn Hà My', title: 'CMO • VinaCosmetics', contact: 'my.nguyen@vinacosmetics.vn' }
    ]
  };

  // 5. NGÀNH TÀI CHÍNH - KẾ TOÁN - NGÂN HÀNG (FINANCE & AUDIT)
  const FINANCE_ANALYST_DATA = {
    profileId: 'finance-analyst',
    industryId: 'finance-accounting',
    templateId: 'tpl-005',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'PHẠM QUỐC HUY, CFA',
      jobTitle: 'SENIOR FINANCIAL ANALYST & INVESTMENT MANAGER',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'quochuy.cfa@gmail.com',
      phone: '0982 334 455',
      address: 'Quận 3, TP. Hồ Chí Minh',
      dateOfBirth: '28/02/1993',
      gender: 'Nam',
      website: 'https://linkedin.com/in/quochuy-cfa',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Đã kết hôn'
    },
    summary: 'Chuyên gia Phân tích Tài chính & Quản lý Đầu tư với hơn 8 năm kinh nghiệm tại các công ty kiểm toán Big 4 và quỹ đầu tư tư nhân (Private Equity). Thành thạo lập mô hình tài chính định giá doanh nghiệp (DCF, LBO, Multiples), thẩm định dự án M&A và quản trị cấu trúc vốn tối ưu. Đã hoàn thành toàn bộ chứng chỉ CFA Level III và chứng chỉ Kiểm toán viên Nhà nước (CPA Vietnam).',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Tài Chính Doanh Nghiệp & Ngân Hàng',
        school: 'Trường Đại Học Kinh Tế TP. Hồ Chí Minh (UEH)',
        period: '2011 - 2015',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.65 / 4.0',
        description: 'Chuyên ban Phân tích Đầu tư Chứng khoán, Giải Nhất NCKH Cấp Trường.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Trưởng Phòng Phân Tích & Thẩm Định Đầu Tư',
        company: 'Quỹ Đầu Tư Khởi Nghiệp VinaCapital Partner',
        period: '06/2020 - Hiện tại',
        location: 'TP. Hồ Chí Minh',
        description: '• Chủ trì thẩm định tài chính (Financial Due Diligence) và định giá cho hơn 25 thương vụ đầu tư công nghệ và logistics.\n• Trực tiếp đàm phán điều khoản thoái vốn thành công mang lại tỷ suất lợi nhuận hoàn vốn (IRR) 26.5% cho danh mục đầu tư.\n• Xây dựng và quản lý danh mục tài sản ủy thác trị giá hơn 80 triệu USD.'
      },
      {
        id: 'exp-2',
        position: 'Trưởng Nhóm Kiểm Toán Cấp Cao (Senior Auditor)',
        company: 'Ernst & Young Vietnam (EY Vietnam)',
        period: '09/2015 - 05/2020',
        location: 'TP. Hồ Chí Minh',
        description: '• Phụ trách kiểm toán báo cáo tài chính theo chuẩn mực IFRS và VAS cho các doanh nghiệp niêm yết trên sàn HOSE.\n• Rà soát hệ thống kiểm soát nội bộ, phát hiện các rủi ro trọng yếu về thuế và dòng tiền, tư vấn tái cấu trúc cho ban điều hành.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Lập mô hình tài chính dự phóng & Định giá DCF, LBO', rating: 98, stars: 5 },
      { id: 'hs-2', name: 'Thẩm định tài chính M&A và Soát xét rủi ro đầu tư', rating: 94, stars: 5 },
      { id: 'hs-3', name: 'Chuẩn mực kế toán quốc tế IFRS & Chuẩn mực VAS', rating: 92, stars: 5 },
      { id: 'hs-4', name: 'Phần mềm ERP SAP, Oracle Financials & Power BI', rating: 88, stars: 4 },
      { id: 'hs-5', name: 'Phân tích chứng khoán, quản trị vốn lưu động và rủi ro thanh khoản', rating: 90, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Tư duy logic sắc bén, kỷ luật với từng con số tài chính' },
      { id: 'ss-2', name: 'Kỹ năng trình bày báo cáo phân tích trước Hội đồng Đầu tư' },
      { id: 'ss-3', name: 'Bảo mật thông tin thương vụ kinh doanh tuyệt đối' }
    ],
    strengths: [
      { id: 'st-1', name: 'Cẩn trọng, tỉ mỉ và trung thực tuyệt đối trong nghề nghiệp' },
      { id: 'st-2', name: 'Khả năng chịu áp lực cao trong các kỳ hạn thương vụ nước rút' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Theo dõi thị trường tài chính toàn cầu qua Bloomberg Terminal' },
      { id: 'hb-2', name: 'Chơi tennis và đọc sách lịch sử tài chính' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Chartered Financial Analyst (CFA) Charterholder', issuer: 'CFA Institute (Hoa Kỳ)', year: '2021' },
      { id: 'cert-2', name: 'Chứng Chỉ Kiểm Toán Viên Nhà Nước (CPA Vietnam)', issuer: 'Bộ Tài Chính', year: '2019' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Thương Vụ M&A Mua Lại 65% Cổ Phần Chuỗi Nhà Thuốc Dược Phẩm An Tâm',
        role: 'Trưởng nhóm thẩm định tài chính',
        period: '01/2023 - 08/2023',
        tech: 'Giá trị thương vụ 32 triệu USD',
        description: 'Định giá chính xác EBITDA, phát hiện khoản nợ tiềm tàng 1.8 triệu USD giúp Quỹ đàm phán giảm giá mua thành công.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top 10 Chuyên Viên Phân Tích Tài Chính Trẻ Xuất Sắc', organization: 'Hiệp hội CFA Vietnam Community', year: '2022' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo chuyên ngành Tài chính quốc tế (IELTS 8.0)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Michael Vũ', title: 'Managing Director • VinaCapital', contact: 'michael.vu@vinacapital.com' }
    ]
  };

  // 6. NGÀNH Y TẾ - BÁC SĨ - DƯỢC PHẨM (HEALTHCARE & MEDICAL)
  const MEDICAL_DOCTOR_DATA = {
    profileId: 'medical-doctor',
    industryId: 'medical-health',
    templateId: 'tpl-006',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'BÁC SĨ ĐỖ TUẤN NGHĨA',
      jobTitle: 'BÁC SĨ CHUYÊN KHOA I - NỘI TỔNG QUÁT',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'bs.dotuannghia@gmail.com',
      phone: '0912 889 911',
      address: 'Hoàn Kiếm, Hà Nội',
      dateOfBirth: '14/10/1990',
      gender: 'Nam',
      website: 'https://bacsituannnghia.vn',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Đã kết hôn'
    },
    summary: 'Bác sĩ Chuyên khoa I Nội tổng quát với hơn 9 năm công tác thực hành lâm sàng tại các bệnh viện tuyến đầu trung ương. Chuyên sâu về chẩn đoán và điều trị bệnh lý tim mạch, chuyển hóa, nội tiết và hô hấp người lớn. Tận tâm với y đức, cam kết đem lại phác đồ điều trị cá thể hóa an toàn và khoa học theo chuẩn y học thực chứng quốc tế (Evidence-Based Medicine).',
    education: [
      {
        id: 'edu-1',
        degree: 'Bác Sĩ Chuyên Khoa I (CKI) - Nội Khoa',
        school: 'Trường Đại Học Y Hà Nội',
        period: '2018 - 2020',
        score: 'Tốt nghiệp loại Giỏi',
        description: 'Luận văn tốt nghiệp: "Đánh giá hiệu quả phối hợp thuốc hạ áp và kiểm soát đường huyết ở bệnh nhân đái tháo đường typ 2 có biến chứng tim mạch".'
      },
      {
        id: 'edu-2',
        degree: 'Bác Sĩ Đa Khoa Hệ Chính Quy 6 Năm',
        school: 'Trường Đại Học Y Hà Nội',
        period: '2008 - 2014',
        score: 'Tốt nghiệp loại Khá Giỏi',
        description: 'Thực tập lâm sàng toàn diện tại Bệnh viện Bạch Mai và Bệnh viện Hữu nghị Việt Đức.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Bác Sĩ Điều Trị Chính - Khoa Nội Tổng Hợp',
        company: 'Bệnh Viện Đa Khoa Quốc Tế Vinmec Times City',
        period: '03/2021 - Hiện tại',
        location: 'Hà Nội',
        description: '• Trực tiếp thăm khám, hội chẩn và điều trị ngoại trú, nội trú cho hơn 3.500 lượt bệnh nhân mỗi năm.\n• Chủ trì hội chẩn liên chuyên khoa các ca bệnh phức tạp có nhiều bệnh lý nền kết hợp.\n• Tham gia ban chỉ đạo cập nhật quy trình an toàn người bệnh và tiêu chuẩn chất lượng bệnh viện quốc tế JCI.'
      },
      {
        id: 'exp-2',
        position: 'Bác Sĩ Khám Chữa Bệnh Khoa Nội',
        company: 'Bệnh Viện Hữu Nghị Việt Tiệp',
        period: '09/2014 - 02/2021',
        location: 'Hải Phòng',
        description: '• Trực cấp cứu và điều trị bệnh nhân nội trú khoa Tim mạch - Nội tiết.\n• Xử trí cấp cứu kịp thời hàng trăm ca suy hô hấp cấp, nhồi máu cơ tim cấp và tăng huyết áp ác tính.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Khám lâm sàng, chẩn đoán & Phác đồ điều trị Nội khoa', rating: 98, stars: 5 },
      { id: 'hs-2', name: 'Đọc kết quả điện tâm đồ (ECG), siêu âm tim và X-quang phổi', rating: 92, stars: 5 },
      { id: 'hs-3', name: 'Xử trí cấp cứu nội khoa ban đầu (CPR, đặt nội khí quản)', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Tư vấn dinh dưỡng, lối sống & Quản lý bệnh mãn tính', rating: 95, stars: 5 },
      { id: 'hs-5', name: 'Nghiên cứu y học lâm sàng và viết bài báo khoa học', rating: 85, stars: 4 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Lắng nghe, thấu hiểu và truyền đạt thông tin y khoa bình dị cho bệnh nhân' },
      { id: 'ss-2', name: 'Điềm tĩnh, quyết đoán trước các tình huống cấp cứu nguy kịch' },
      { id: 'ss-3', name: 'Tác phong y đức mẫu mực, tôn trọng đồng nghiệp và gia đình người bệnh' }
    ],
    strengths: [
      { id: 'st-1', name: 'Tận tâm chu đáo, đặt sức khỏe người bệnh lên hàng đầu' },
      { id: 'st-2', name: 'Liên tục cập nhật hướng dẫn điều trị mới của AHA, ESC, ADA' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Tham gia các chuyến khám bệnh tình nguyện vùng cao' },
      { id: 'hb-2', name: 'Chạy bộ và bơi lội rèn luyện thể lực bền bỉ' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Chứng Chỉ Hành Nghề Khám Bệnh, Chữa Bệnh Khám Chuyên Khoa Nội', issuer: 'Bộ Y Tế Việt Nam', year: '2016' },
      { id: 'cert-2', name: 'Chứng Chỉ Siêu Âm Tim & Mạch Máu Căn Bản', issuer: 'Viện Tim Mạch Quốc Gia Việt Nam', year: '2019' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Đề Tài Nghiên Cứu Ứng Dụng Tele-Medicine Tư Vấn Bệnh Nhân Tăng Huyết Áp Từ Xa',
        role: 'Chủ nhiệm nhánh đề tài nghiên cứu',
        period: '06/2022 - 12/2022',
        tech: 'Nghiên cứu thử nghiệm trên 400 bệnh nhân mãn tính',
        description: 'Tăng tỷ lệ tuân thủ điều trị của bệnh nhân từ 62% lên 88%, giảm đáng kể tỷ lệ nhập viện do biến chứng tim mạch.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Thầy Thuốc Trẻ Tiêu Biểu Bệnh Viện Vinmec', organization: 'Hệ thống Y tế Vinmec', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Giao tiếp y khoa & Đọc hiểu tạp chí The Lancet, NEJM (IELTS 7.0)' }
    ],
    references: [
      { id: 'ref-1', name: 'PGS. TS. Trần Văn Hùng', title: 'Cố vấn chuyên môn cao cấp • Vinmec Times City', contact: 'hung.tv@vinmec.com' }
    ]
  };

  // 7. NGÀNH GIÁO DỤC - GIẢNG VIÊN - ĐÀO TẠO (EDUCATION & TRAINING)
  const EDUCATOR_DATA = {
    profileId: 'educator-lecturer',
    industryId: 'education-training',
    templateId: 'tpl-007',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'THẠC SĨ VŨ THU TRANG',
      jobTitle: 'GIẢNG VIÊN NGÔN NGỮ ANH & CHUYÊN GIA SƯ PHẠM',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'thutrang.vu.edu@gmail.com',
      phone: '0979 223 344',
      address: 'Cầu Giấy, Hà Nội',
      dateOfBirth: '18/06/1993',
      gender: 'Nữ',
      website: 'https://vuthutrang-ielts.vn',
      driverLicense: 'Hạng B1',
      maritalStatus: 'Độc thân'
    },
    summary: 'Thạc sĩ Lý luận & Phương pháp Giảng dạy Tiếng Anh (TESOL) với hơn 7 năm kinh nghiệm giảng dạy tại các trường đại học quốc tế và trung tâm ngoại ngữ hàng đầu. Điểm số IELTS 8.5 (9.0 Listening, 9.0 Reading). Chuyên gia biên soạn giáo trình chuẩn Cambridge, áp dụng phương pháp học chủ động (Active Learning) và công nghệ số vào lớp học truyền cảm hứng cho hơn 5.000 học viên.',
    education: [
      {
        id: 'edu-1',
        degree: 'Thạc Sĩ Phương Pháp Giảng Dạy Tiếng Anh (MA in TESOL)',
        school: 'University of Nottingham (UK) • Hợp tác ĐH Hà Nội',
        period: '2017 - 2019',
        score: 'Tốt nghiệp Xuất Sắc (Distinction)',
        description: 'Luận văn đạt giải thưởng Học thuật: "Ứng dụng kỹ thuật AI và Gamification nhằm nâng cao động lực học ngôn ngữ thứ hai".'
      },
      {
        id: 'edu-2',
        degree: 'Cử Nhân Sư Phạm Tiếng Anh',
        school: 'Trường Đại Học Sư Phạm Hà Nội',
        period: '2011 - 2015',
        score: 'Tốt nghiệp loại Xuất Sắc • GPA: 3.82 / 4.0',
        description: 'Giải Nhất Nghiên cứu Khoa học Sinh viên Toàn quốc năm 2014.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Giảng Viên Chính & Điều Phối Chương Trình Tiếng Anh Học Thuật',
        company: 'Trường Đại Học Anh Quốc Việt Nam (BUV)',
        period: '09/2020 - Hiện tại',
        location: 'Hà Nội',
        description: '• Trực tiếp giảng dạy học phần Academic Writing & Research Skills cho sinh viên khối ngành Kinh doanh Quốc tế.\n• Đổi mới phương pháp đánh giá sinh viên bằng E-Portfolio, đạt chỉ số hài lòng của sinh viên (Student Evaluation) 4.92/5.0.\n• Biên soạn ngân hàng đề thi chuẩn khảo thí quốc tế theo khung tham chiếu châu Âu CEFR.'
      },
      {
        id: 'exp-2',
        position: 'Chuyên Gia Luyện Thi IELTS & Quản Lý Chất Lượng Học Thuật',
        company: 'Tổ Chức Giáo Dục Quốc Tế Summit Education',
        period: '08/2015 - 08/2020',
        location: 'Hà Nội',
        description: '• Dẫn dắt các lớp IELTS Master 7.5+, giúp hơn 200 học viên đạt mục tiêu 7.5 - 8.5 để du học Mỹ, Anh, Úc.\n• Đào tạo kỹ năng sư phạm và phương pháp chữa bài cho đội ngũ 25 trợ giảng và giáo viên trẻ.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Giảng dạy Tiếng Anh học thuật EAP & Luyện thi IELTS', rating: 98, stars: 5 },
      { id: 'hs-2', name: 'Thiết kế chương trình khung & Biên soạn giáo trình chuẩn Cambridge', rating: 95, stars: 5 },
      { id: 'hs-3', name: 'Ứng dụng EdTech, LMS Canvas, Kahoot & AI Teaching Tools', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Đo lường & Đánh giá khảo thí ngôn ngữ chuẩn CEFR', rating: 92, stars: 5 },
      { id: 'hs-5', name: 'Tổ chức hội thảo kỹ năng mềm và hướng nghiệp học sinh', rating: 88, stars: 4 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Khả năng truyền cảm hứng học tập mạnh mẽ và kiên nhẫn với học viên' },
      { id: 'ss-2', name: 'Kỹ năng thuyết trình trước đám đông và điều phối lớp học sôi nổi' },
      { id: 'ss-3', name: 'Giao tiếp liên văn hóa tinh tế và tôn trọng sự đa dạng' }
    ],
    strengths: [
      { id: 'st-1', name: 'Nhiệt huyết với sự nghiệp giáo dục, chuẩn mực trong từng bài giảng' },
      { id: 'st-2', name: 'Không ngừng học hỏi và thử nghiệm các mô hình giáo dục tiên tiến' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Viết blog chia sẻ phương pháp học tiếng Anh tự nhiên' },
      { id: 'hb-2', name: 'Đọc tiểu thuyết văn học Anh cổ điển và chơi piano' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Chứng Chỉ IELTS Quốc Tế Overall 8.5', issuer: 'British Council Vietnam', year: '2023' },
      { id: 'cert-2', name: 'Chứng Chỉ Giảng Dạy Tiếng Anh Quốc Tế CELTA (Pass A)', issuer: 'Cambridge Assessment English', year: '2019' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Dự Án Khóa Học Trực Tuyến "IELTS Writing Task 2 - Critical Thinking 8.0"',
        role: 'Tác giả & Giảng viên độc quyền',
        period: '01/2023 - 09/2023',
        tech: 'Hơn 3.500 học viên đã đăng ký tham gia',
        description: 'Giúp 78% học viên nâng band điểm môn Writing từ 6.0 lên tối thiểu 7.0 sau 3 tháng luyện tập theo phương pháp tư duy phản biện.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Giảng Viên Của Năm (Inspirational Lecturer of the Year)', organization: 'British University Vietnam', year: '2022' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Gần như bản ngữ (C2 Proficiency - IELTS 8.5)' }
    ],
    references: [
      { id: 'ref-1', name: 'TS. David Miller', title: 'Trưởng Khoa Ngôn Ngữ • BUV', contact: 'david.m@buv.edu.vn' }
    ]
  };

  // 8. NGÀNH THIẾT KẾ - ĐỒ HỌA - SÁNG TẠO (DESIGN & UI/UX)
  const DESIGNER_DATA = {
    profileId: 'designer-uiux',
    industryId: 'design-creative',
    templateId: 'tpl-008',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'NGUYỄN BẢO NAM',
      jobTitle: 'SENIOR PRODUCT DESIGNER & BRAND STRATEGIST',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'baonam.design@gmail.com',
      phone: '0936 123 789',
      address: 'Ba Đình, Hà Nội',
      dateOfBirth: '25/07/1996',
      gender: 'Nam',
      website: 'https://behance.net/baonam-design',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Độc thân'
    },
    summary: 'Senior Product Designer (UI/UX) với 6 năm kinh nghiệm thiết kế trải nghiệm người dùng cho các ứng dụng di động FinTech, SaaS và E-Commerce với hơn 5 triệu người dùng tích cực. Bậc thầy về xây dựng Design System đồng nhất trên đa nền tảng, nghiên cứu hành vi người dùng (User Research) và tạo nguyên mẫu tương tác (Micro-interactions) tinh tế. Luôn cân bằng giữa tính thẩm mỹ đột phá và mục tiêu kinh doanh chuyển đổi.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Thiết Kế Đồ Họa & Đa Phương Tiện',
        school: 'Trường Đại Học Mỹ Thuật Công Nghiệp Hà Nội',
        period: '2014 - 2019',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.60 / 4.0',
        description: 'Đồ án tốt nghiệp: "Xây dựng hệ thống nhận diện thương hiệu số và trải nghiệm ứng dụng bảo tồn văn hóa di sản Việt Nam" (Thủ khoa ngành).'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Senior UI/UX & Design System Lead',
        company: 'Grab Financial Vietnam',
        period: '02/2021 - Hiện tại',
        location: 'Hà Nội',
        description: '• Chủ trì thiết kế lại toàn bộ quy trình thanh toán Checkout & E-Wallet, giúp tăng tỷ lệ hoàn tất giao dịch (Conversion Rate) thêm 14.8%.\n• Xây dựng và duy trì thư viện Design System hơn 800 components trên Figma, rút ngắn 40% thời gian phối hợp giữa Designer và Developer.\n• Thực hiện các phiên Usability Testing định kỳ hàng tuần với khách hàng thực tế để phát hiện và loại bỏ các điểm nghẽn trải nghiệm (Friction Points).'
      },
      {
        id: 'exp-2',
        position: 'UI/UX & Brand Designer',
        company: 'VCCorp Interactive Studio',
        period: '06/2018 - 01/2021',
        location: 'Hà Nội',
        description: '• Thiết kế giao diện cho hơn 8 trang tin điện tử và cổng báo chí lớn với hàng triệu lượt truy cập mỗi ngày.\n• Thiết kế hàng trăm bộ ấn phẩm Visual Branding, Key Visual và infographic dữ liệu công phu.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Figma, FigJam, Sketch, Adobe XD & Design System Management', rating: 98, stars: 5 },
      { id: 'hs-2', name: 'Adobe Creative Suite (Photoshop, Illustrator, After Effects)', rating: 92, stars: 5 },
      { id: 'hs-3', name: 'Nghiên cứu người dùng (User Research, Usability Testing, Personas)', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Thiết kế tương tác Micro-interactions, Prototyping Pro (Protopie)', rating: 88, stars: 4 },
      { id: 'hs-5', name: 'Hiểu biết nền tảng Frontend HTML5, CSS3, Flexbox & Grid', rating: 85, stars: 4 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Tư duy thiết kế lấy người dùng làm trung tâm (User-Centric Design)' },
      { id: 'ss-2', name: 'Kỹ năng bảo vệ ý tưởng thiết kế và thuyết phục Stakeholders' },
      { id: 'ss-3', name: 'Tỉ mỉ đến từng điểm ảnh (Pixel-Perfect) và phối màu hài hòa' }
    ],
    strengths: [
      { id: 'st-1', name: 'Cảm quan thẩm mỹ hiện đại, cập nhật nhanh xu hướng thiết kế toàn cầu' },
      { id: 'st-2', name: 'Tác phong làm việc nhanh gọn, linh hoạt, tôn trọng deadline' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Khám phá các bảo tàng nghệ thuật và triển lãm thiết kế đương đại' },
      { id: 'hb-2', name: 'Vẽ tranh ký họa số trên iPad Proctreate' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Google UX Design Professional Certificate', issuer: 'Google Career Certificates', year: '2022' },
      { id: 'cert-2', name: 'Nielsen Norman Group (NN/g) UX Certified', issuer: 'Nielsen Norman Group', year: '2023' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Dự Án Redesign Siêu Ứng Dụng Tài Chính Số FastPay App 3.0',
        role: 'Trưởng nhóm thiết kế sản phẩm chính',
        period: '03/2023 - 10/2023',
        tech: 'Figma, ProtoPie, UserZoom Testing Platform',
        description: 'Đạt giải thưởng Thiết kế Ứng dụng xuất sắc nhất tại Tech Awards 2023, số lượng đánh giá 5 sao trên App Store tăng từ 4.1 lên 4.8 sao.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top 1 Giải Thưởng Thiết Kế Giao Diện UI/UX Toàn Quốc', organization: 'Vietnam Design Association', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'IELTS 7.0 (Thành thạo trao đổi thiết kế quốc tế)' }
    ],
    references: [
      { id: 'ref-1', name: 'Bà Đặng Phương Linh', title: 'Head of Product • Grab Financial', contact: 'linh.dang@grab.com' }
    ]
  };

  // 9. NGÀNH KHÁCH SẠN - DU LỊCH - F&B (HOSPITALITY & MANAGEMENT)
  const HOSPITALITY_MANAGER_DATA = {
    profileId: 'hospitality-manager',
    industryId: 'hospitality-service',
    templateId: 'tpl-009',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'ĐẶNG HOÀNG YẾN',
      jobTitle: 'HOTEL OPERATIONS MANAGER (5-STAR LUXURY)',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'hoangyen.hospitality@gmail.com',
      phone: '0909 334 556',
      address: 'Sơn Trà, Đà Nẵng',
      dateOfBirth: '09/03/1992',
      gender: 'Nữ',
      website: 'https://linkedin.com/in/hoangyen-hospitality',
      driverLicense: 'Hạng B2',
      maritalStatus: 'Độc thân'
    },
    summary: 'Chuyên gia Quản lý Vận hành Khách sạn & Khu nghỉ dưỡng cao cấp 5 sao với 9 năm kinh nghiệm lãnh đạo. Đã từng điều hành đội ngũ hơn 160 nhân sự tại các tập đoàn quản lý khách sạn quốc tế hàng đầu (Marriott International, AccorHotels). Chuyên sâu về nâng tầm trải nghiệm khách hàng (Guest Satisfaction Score 94%+), tối ưu chi phí vận hành GOP và kiểm định chất lượng theo tiêu chuẩn khắt khe của Forbes Travel Guide.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Quản Trị Du Lịch & Khách Sạn Quốc Tế',
        school: 'Học Viện Blue Mountains (Úc) • Chi nhánh Châu Á',
        period: '2010 - 2014',
        score: 'Tốt nghiệp Xuất Sắc',
        description: 'Chuyên ngành Quản trị Vận hành Khách sạn và Resort Quốc tế.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Giám Đốc Vận Hành Khách Sạn (Operations Manager)',
        company: 'Sheraton Grand Danang Resort & Convention Center',
        period: '05/2020 - Hiện tại',
        location: 'Đà Nẵng',
        description: '• Trực tiếp điều phối và kiểm soát chất lượng vận hành của 5 bộ phận chủ lực: Tiền sảnh (Front Office), Buồng phòng, Ẩm thực (F&B), An ninh và Spa.\n• Đưa chỉ số hài lòng của khách hàng (GSS) đạt vị trí Top 3 toàn khu vực Đông Nam Á trong hệ thống Marriott.\n• Tối ưu hóa chi phí vận hành định kỳ, tiết kiệm 1.8 tỷ VNĐ/năm nhưng vẫn giữ vững chuẩn mực 5 sao quốc tế.'
      },
      {
        id: 'exp-2',
        position: 'Trưởng Bộ Phận Tiền Sảnh (Front Office Manager)',
        company: 'Sofitel Legend Metropole Hanoi',
        period: '08/2015 - 04/2020',
        location: 'Hà Nội',
        description: '• Quản lý trực tiếp đội ngũ 45 nhân viên lễ tân, quan hệ khách hàng VIP và dịch vụ hành lý.\n• Trực tiếp đón tiếp và phục vụ an toàn chu đáo cho hơn 20 đoàn nguyên thủ quốc gia và các chính khách quốc tế đến thăm Việt Nam.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Quản lý vận hành khách sạn 5 sao chuẩn quốc tế & Tiêu chuẩn Forbes', rating: 96, stars: 5 },
      { id: 'hs-2', name: 'Hệ thống quản lý khách sạn Opera PMS, Fidelio & Micros POS', rating: 94, stars: 5 },
      { id: 'hs-3', name: 'Kiểm soát chi phí vận hành, dự báo doanh thu RevPAR & GOP', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Đào tạo dịch vụ khách hàng cao cấp và quy chuẩn phục vụ VIP', rating: 95, stars: 5 },
      { id: 'hs-5', name: 'Xử lý khủng hoảng dịch vụ và bồi thường thiệt hại chuyên nghiệp', rating: 92, stars: 5 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Nghệ thuật giao tiếp quý phái, phong thái hiếu khách nồng hậu (Hospitality Spirit)' },
      { id: 'ss-2', name: 'Kỹ năng giải quyết khiếu nại khách hàng xuất sắc, biến thách thức thành sự hài lòng' },
      { id: 'ss-3', name: 'Khả năng lãnh đạo truyền lửa và giữ chân nhân tài dịch vụ' }
    ],
    strengths: [
      { id: 'st-1', name: 'Tỉ mỉ đến từng chi tiết nhỏ nhất trong bài trí không gian và trải nghiệm giác quan' },
      { id: 'st-2', name: 'Khả năng chịu áp lực cao trong các mùa cao điểm du lịch và sự kiện hội nghị lớn' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Khám phá ẩm thực fine-dining và tìm hiểu văn hóa trà đạo' },
      { id: 'hb-2', name: 'Du lịch trải nghiệm các khách sạn boutique độc đáo trên thế giới' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Certified Hotel Administrator (CHA)', issuer: 'American Hotel & Lodging Educational Institute', year: '2021' },
      { id: 'cert-2', name: 'Chứng Chỉ Vệ Sinh An Toàn Thực Phẩm HACCP Lead Auditor', issuer: 'Tổ chức BSI', year: '2020' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Dự Án Đón Tiếp Phục Vụ Hội Nghị Thượng Đỉnh Kinh Tế Cấp Cao APEC',
        role: 'Tổng điều phối vận hành lưu trú & F&B',
        period: '09/2022 - 11/2022',
        tech: 'Quy mô 1.200 đại biểu quốc tế từ 21 nền kinh tế',
        description: 'Được Bộ Ngoại Giao trao tặng Bằng khen vì thành tích xuất sắc và an toàn tuyệt đối trong công tác lễ tân đối ngoại.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Nhà Quản Lý Khách Sạn Xuất Sắc Của Năm (Hotelier of the Year)', organization: 'Hiệp hội Khách sạn Việt Nam', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo lưu loát chuẩn khách sạn quốc tế (IELTS 8.0)' },
      { id: 'lang-3', name: 'Tiếng Pháp', level: 'Giao tiếp tốt trong công việc (B1)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Jean-Pierre Martin', title: 'Tổng Giám Đốc (General Manager) • Sheraton Danang', contact: 'jp.martin@marriott.com' }
    ]
  };

  // 10. NGÀNH NHÂN SỰ - TUYỂN DỤNG - HÀNH CHÍNH (HR & PEOPLE OPS)
  const HR_MANAGER_DATA = {
    profileId: 'hr-manager',
    industryId: 'hr-administration',
    templateId: 'tpl-010',
    skillRatingMode: 'percentage',
    language: 'vi',
    personalInfo: {
      fullName: 'BÙI THỊ THU HÀ',
      jobTitle: 'SENIOR HRBP & TALENT ACQUISITION MANAGER',
      avatarUrl: 'assets/images/avatar-electrical-engineer.jpg',
      email: 'thuha.hrbp@gmail.com',
      phone: '0916 778 990',
      address: 'Hai Bà Trưng, Hà Nội',
      dateOfBirth: '03/11/1991',
      gender: 'Nữ',
      website: 'https://linkedin.com/in/thuha-hrbp-lead',
      driverLicense: 'Hạng B1',
      maritalStatus: 'Đã kết hôn'
    },
    summary: 'Chuyên gia Quản trị Nhân sự Đối tác Kinh doanh (HRBP) với hơn 9 năm kinh nghiệm xây dựng chiến lược nhân tài, phát triển văn hóa doanh nghiệp và thiết lập khung năng lực cho các tập đoàn quy mô trên 2.000 nhân sự. Am hiểu sâu sắc Luật Lao động Việt Nam, thành thạo xây dựng hệ thống đãi ngộ tổng thể (C&B) 3P và chuyển đổi số quy trình quản trị nhân lực HRIS.',
    education: [
      {
        id: 'edu-1',
        degree: 'Cử Nhân Luật Kinh Tế & Quản Trị Nhân Lực',
        school: 'Trường Đại Học Luật Hà Nội (HLU)',
        period: '2009 - 2013',
        score: 'Tốt nghiệp loại Giỏi • GPA: 3.56 / 4.0',
        description: 'Chuyên sâu Luật Lao động, Giải Ba Sinh viên Nghiên cứu Khoa học cấp Bộ.'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        position: 'Trưởng Phòng Nhân Sự Đối Tác Chiến Lược (Senior HRBP Lead)',
        company: 'Tập Đoàn Viễn Thông & Công Nghệ MobiFone Global',
        period: '08/2020 - Hiện tại',
        location: 'Hà Nội',
        description: '• Đồng hành chiến lược cùng Ban Tổng Giám đốc trong việc tái cấu trúc tổ chức và hoạch định nguồn nhân lực (Workforce Planning) cho 1.800 cán bộ nhân viên.\n• Thiết kế và triển khai khung năng lực chuyên môn kết hợp hệ thống đánh giá hiệu suất OKRs & KPIs định kỳ, tăng năng suất lao động 18%.\n• Giảm tỷ lệ biến động nhân sự chủ chốt (Turnover Rate) từ 19% xuống còn 8.2% trong 2 năm liên tiếp.'
      },
      {
        id: 'exp-2',
        position: 'Trưởng Nhóm Tuyển Dụng Nhân Tài C-Level (Headhunter & Talent Acquisition Lead)',
        company: 'Navigos Group (VietnamWorks)',
        period: '02/2014 - 07/2020',
        location: 'Hà Nội',
        description: '• Thực hiện săn đầu người (Headhunting) thành công hơn 80 vị trí Giám đốc điều hành, Giám đốc tài chính và Giám đốc công nghệ cho các tập đoàn đa quốc gia.\n• Xây dựng thương hiệu nhà tuyển dụng (Employer Branding) và mở rộng mạng lưới cơ sở dữ liệu ứng viên cấp cao.'
      }
    ],
    hardSkills: [
      { id: 'hs-1', name: 'Chiến lược nhân sự HRBP, Tái cấu trúc tổ chức & Kế hoạch nhân lực', rating: 96, stars: 5 },
      { id: 'hs-2', name: 'Tuyển dụng nhân sự cấp cao C-Level & Headhunting', rating: 94, stars: 5 },
      { id: 'hs-3', name: 'Hệ thống lương thưởng đãi ngộ 3P (Position, Person, Performance)', rating: 90, stars: 5 },
      { id: 'hs-4', name: 'Luật Lao động Việt Nam, Giải quyết tranh chấp & Quan hệ lao động', rating: 95, stars: 5 },
      { id: 'hs-5', name: 'Triển khai phần mềm nhân sự HRIS (Workday, SAP SuccessFactors, Base.vn)', rating: 88, stars: 4 }
    ],
    softSkills: [
      { id: 'ss-1', name: 'Kỹ năng lắng nghe thấu cảm, gắn kết và giải quyết mâu thuẫn nội bộ khéo léo' },
      { id: 'ss-2', name: 'Khả năng kết nối chiến lược giữa nhu cầu kinh doanh và năng lực con người' },
      { id: 'ss-3', name: 'Tác phong chính trực, công tâm và bảo mật tuyệt đối' }
    ],
    strengths: [
      { id: 'st-1', name: 'Thấu hiểu sâu sắc tâm lý con người trong môi trường công sở' },
      { id: 'st-2', name: 'Định hướng giải pháp thực tế, cân bằng lợi ích giữa người lao động và chủ doanh nghiệp' }
    ],
    hobbies: [
      { id: 'hb-1', name: 'Đọc sách tâm lý học hành vi và phát triển bản thân' },
      { id: 'hb-2', name: 'Tham gia các diễn đàn hướng nghiệp cho sinh viên mới ra trường' }
    ],
    certifications: [
      { id: 'cert-1', name: 'Senior Professional in Human Resources – International (SPHRi)', issuer: 'HRCI (Hoa Kỳ)', year: '2022' },
      { id: 'cert-2', name: 'Chứng Chỉ Chuyên Gia Khung Năng Lực & Đánh Giá Năng Lực', issuer: 'Viện Quản Trị Nhân Sự PACE', year: '2020' }
    ],
    projects: [
      {
        id: 'prj-1',
        name: 'Dự Án Số Hóa Quản Trị Nhân Sự & Văn Hóa Doanh Nghiệp "OneMobi"',
        role: 'Chủ nhiệm dự án chuyển đổi số nhân sự',
        period: '02/2022 - 11/2022',
        tech: 'Quy mô áp dụng toàn quốc 2.000 nhân viên',
        description: 'Tự động hóa 100% quy trình chấm công, tính lương và tuyển dụng Onboarding, tiết kiệm 450 giờ công hành chính mỗi tháng.'
      }
    ],
    awards: [
      { id: 'awd-1', title: 'Top 50 Giám Đốc Nhân Sự Trẻ Truyền Cảm Hứng (Vietnam HR Awards)', organization: 'Báo Lao Động & Xã Hội', year: '2023' }
    ],
    languages: [
      { id: 'lang-1', name: 'Tiếng Việt', level: 'Bản ngữ' },
      { id: 'lang-2', name: 'Tiếng Anh', level: 'Thành thạo đàm phán nhân sự quốc tế (TOEIC 880)' }
    ],
    references: [
      { id: 'ref-1', name: 'Ông Nguyễn Đình Toàn', title: 'Phó Tổng Giám Đốc • MobiFone Global', contact: 'toan.nd@mobifone.vn' }
    ]
  };

  // Map of 10 industry sample profiles
  const PROFILES_MAP = {
    'electrical-tech': ELECTRICAL_ENGINEER_DEFAULT,
    'it-software': IT_DEVELOPER_DATA,
    'business-sales': SALES_MANAGER_DATA,
    'marketing-media': MARKETING_LEAD_DATA,
    'finance-accounting': FINANCE_ANALYST_DATA,
    'medical-health': MEDICAL_DOCTOR_DATA,
    'education-training': EDUCATOR_DATA,
    'design-creative': DESIGNER_DATA,
    'hospitality-service': HOSPITALITY_MANAGER_DATA,
    'hr-administration': HR_MANAGER_DATA
  };

  // Industry metadata helper
  const INDUSTRY_META = [
    { id: 'electrical-tech', name: 'Kỹ Sư Điện & Tự Động Hóa (Mặc định)', icon: 'fa-solid fa-bolt', profile: ELECTRICAL_ENGINEER_DEFAULT },
    { id: 'it-software', name: 'CNTT & Lập Trình Viên', icon: 'fa-solid fa-code', profile: IT_DEVELOPER_DATA },
    { id: 'business-sales', name: 'Kinh Doanh & Quản Lý Sales', icon: 'fa-solid fa-briefcase', profile: SALES_MANAGER_DATA },
    { id: 'marketing-media', name: 'Marketing & Truyền Thông Số', icon: 'fa-solid fa-bullhorn', profile: MARKETING_LEAD_DATA },
    { id: 'finance-accounting', name: 'Tài Chính, Kế Toán & Ngân Hàng', icon: 'fa-solid fa-calculator', profile: FINANCE_ANALYST_DATA },
    { id: 'medical-health', name: 'Y Tế, Bác Sĩ & Sức Khỏe', icon: 'fa-solid fa-stethoscope', profile: MEDICAL_DOCTOR_DATA },
    { id: 'education-training', name: 'Giáo Dục & Giảng Viên', icon: 'fa-solid fa-graduation-cap', profile: EDUCATOR_DATA },
    { id: 'design-creative', name: 'Thiết Kế Đồ Họa & UI/UX', icon: 'fa-solid fa-palette', profile: DESIGNER_DATA },
    { id: 'hospitality-service', name: 'Khách Sạn & Du Lịch F&B', icon: 'fa-solid fa-bell-concierge', profile: HOSPITALITY_MANAGER_DATA },
    { id: 'hr-administration', name: 'Nhân Sự & Tuyển Dụng HRBP', icon: 'fa-solid fa-users-gear', profile: HR_MANAGER_DATA }
  ];

  return {
    PROFILES_MAP,
    INDUSTRY_META,
    getDefaultProfile: () => JSON.parse(JSON.stringify(ELECTRICAL_ENGINEER_DEFAULT)),
    getProfileByIndustry: (indId) => {
      const p = PROFILES_MAP[indId] || PROFILES_MAP['electrical-tech'];
      return JSON.parse(JSON.stringify(p));
    }
  };
})();
