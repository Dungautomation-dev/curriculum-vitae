/**
 * Curriculum Vitae (CV Creator) - Unique Layout Archetypes & Theme Colors Engine
 * Khắc phục hoàn toàn trùng lặp bố cục: Mỗi mẫu là một kiến trúc trình bày độc nhất
 * Bổ sung hệ thống Màu Chủ Đạo tự do cho mọi CV
 * Author: Dung Automation
 */

const CV_TEMPLATES_CATALOG = (function () {

  // 1. 10 Ngành Nghề Trọng Điểm
  const INDUSTRIES = [
    {
      id: 'electrical-tech',
      name: 'Kỹ Sư & Kỹ Thuật Điện',
      nameEn: 'Engineering & Technology',
      icon: 'fa-solid fa-bolt',
      desc: 'Điện, Tự động hóa, Cơ điện M&E, Xây dựng, Điện tử viễn thông',
      badge: 'Kỹ Thuật'
    },
    {
      id: 'it-software',
      name: 'CNTT & Lập Trình Viên',
      nameEn: 'IT & Software Development',
      icon: 'fa-solid fa-code',
      desc: 'Frontend, Backend, Fullstack, Mobile App, DevOps, AI & Cloud',
      badge: 'Công Nghệ'
    },
    {
      id: 'business-sales',
      name: 'Kinh Doanh & Quản Lý Sales',
      nameEn: 'Business & Sales Management',
      icon: 'fa-solid fa-briefcase',
      desc: 'B2B/B2C Enterprise, Key Account, Giám sát kinh doanh',
      badge: 'Kinh Doanh'
    },
    {
      id: 'marketing-media',
      name: 'Marketing & Truyền Thông Số',
      nameEn: 'Marketing & Digital Media',
      icon: 'fa-solid fa-bullhorn',
      desc: 'Digital Marketing, Growth Lead, SEO, TikTok & Social Content',
      badge: 'Marketing'
    },
    {
      id: 'finance-accounting',
      name: 'Tài Chính, Kế Toán & Ngân Hàng',
      nameEn: 'Finance, Accounting & Banking',
      icon: 'fa-solid fa-calculator',
      desc: 'Kiểm toán Big 4, Phân tích đầu tư, Kế toán trưởng, Ngân hàng',
      badge: 'Tài Chính'
    },
    {
      id: 'medical-health',
      name: 'Y Tế, Bác Sĩ & Sức Khỏe',
      nameEn: 'Medical, Pharmacy & Healthcare',
      icon: 'fa-solid fa-stethoscope',
      desc: 'Bác sĩ chuyên khoa, Dược sĩ, Điều dưỡng, Quản lý y tế',
      badge: 'Y Tế'
    },
    {
      id: 'education-training',
      name: 'Giáo Dục, Đào Tạo & Giảng Viên',
      nameEn: 'Education, Training & Research',
      icon: 'fa-solid fa-graduation-cap',
      desc: 'Giảng viên đại học, Giáo viên IELTS, Chuyên gia đào tạo L&D',
      badge: 'Giáo Dục'
    },
    {
      id: 'design-creative',
      name: 'Thiết Kế Đồ Họa & UI/UX',
      nameEn: 'Design & Creative Arts',
      icon: 'fa-solid fa-palette',
      desc: 'Product Designer UI/UX, Graphic Design, Brand Identity',
      badge: 'Sáng Tạo'
    },
    {
      id: 'hospitality-service',
      name: 'Nhà Hàng, Khách Sạn & Du Lịch',
      nameEn: 'Hospitality, F&B & Tourism',
      icon: 'fa-solid fa-bell-concierge',
      desc: 'Quản lý vận hành 5 sao, F&B Manager, Lễ tân đối ngoại',
      badge: 'Dịch Vụ'
    },
    {
      id: 'hr-administration',
      name: 'Nhân Sự & Tuyển Dụng HRBP',
      nameEn: 'HR, Administration & Legal',
      icon: 'fa-solid fa-users-gear',
      desc: 'HRBP Manager, Headhunter C-Level, Quản trị văn hóa doanh nghiệp',
      badge: 'Nhân Sự'
    }
  ];

  // 2. 12 Kiểu Bố Cục Trình Bày Độc Bản (Hoàn toàn khác biệt về cấu trúc & vị trí các khối)
  const LAYOUT_STYLES = [
    {
      id: 'modern-sidebar',
      name: 'Cột Trái Hiện Đại (Left Sidebar)',
      desc: 'Thanh bên trái có nền màu nổi bật chứa ảnh, thông tin liên hệ và kỹ năng; Phần nội dung chính bên phải rộng rãi cho kinh nghiệm & học vấn.',
      icon: 'fa-solid fa-table-columns'
    },
    {
      id: 'right-sidebar',
      name: 'Cột Phải Tinh Tế (Right Sidebar)',
      desc: 'Cột chính bên trái ưu tiên hàng đầu cho hành trình sự nghiệp và các dự án lớn; Cột phụ thanh lịch bên phải chứa thông tin cá nhân & kỹ năng.',
      icon: 'fa-solid fa-table-columns fa-flip-horizontal'
    },
    {
      id: 'header-banner',
      name: 'Header Banner Toàn Chiều Rộng (Hero Banner)',
      desc: 'Khối tiêu đề tràn viền phía trên chứa Avatar lớn, tên và các chip liên hệ; Thân trang bên dưới phân 2 cột khoa học tỷ lệ 60/40.',
      icon: 'fa-solid fa-window-maximize'
    },
    {
      id: 'minimal-clean',
      name: 'Tối Giản Chuẩn Tuyển Dụng ATS (Swiss Clean)',
      desc: 'Phong cách tối giản Thụy Sĩ thanh lịch, font chữ tinh tế, đường nét hairline, khoảng thở rộng rãi, đạt điểm quét ATS cao nhất.',
      icon: 'fa-solid fa-bars-staggered'
    },
    {
      id: 'timeline-focus',
      name: 'Trục Thời Gian Trực Quan (Continuous Timeline)',
      desc: 'Trục dòng thời gian thẳng đứng liên kết xuyên suốt các mốc kinh nghiệm và học vấn với các chấm node phát sáng ấn tượng.',
      icon: 'fa-solid fa-timeline'
    },
    {
      id: 'bento-cards',
      name: 'Thẻ Khối Bento Hiện Đại (Modern Bento Grid)',
      desc: 'Bố cục chia các ô thẻ bo góc độc lập phong cách Bento UI hiện đại, mỗi phần học vấn, kỹ năng, dự án là một khối thẻ nổi bật.',
      icon: 'fa-solid fa-table-cells-large'
    },
    {
      id: 'executive-bold',
      name: 'Đẳng Cấp Quản Lý & Lãnh Đạo (Executive Serif)',
      desc: 'Khung viền đôi trang trọng bao quanh trang, tiêu đề căn giữa quý phái, font chữ Serif sang trọng chuẩn phong thái Giám đốc.',
      icon: 'fa-solid fa-award'
    },
    {
      id: 'compact-3col',
      name: '3 Cột Cô Đọng Thông Tin (Compact 3-Column)',
      desc: 'Khối header ngắn gọn phía trên, bên dưới chia đều 3 cột thông tin cô đọng: Cột 1 (Cá nhân), Cột 2 (Kinh nghiệm), Cột 3 (Kỹ năng & Dự án).',
      icon: 'fa-solid fa-grip-vertical'
    },
    {
      id: 'editorial-magazine',
      name: 'Tạp Chí Sáng Tạo (Editorial Magazine)',
      desc: 'Typography khổ lớn táo bạo, hộp trích dẫn mục tiêu toát lên cá tính nghệ thuật, bố cục bất đối xứng dành cho ngành sáng tạo.',
      icon: 'fa-solid fa-newspaper'
    },
    {
      id: 'split-contrast',
      name: 'Chia Đôi Tương Phản 50/50 (Dual Contrast Split)',
      desc: 'Hai nửa trang độc lập với nền màu tương phản mềm mại, cân bằng thị giác tuyệt đối giữa hồ sơ cá nhân và thành tích công việc.',
      icon: 'fa-solid fa-puzzle-piece'
    },
    {
      id: 'technical-grid',
      name: 'Bản Vẽ Kỹ Thuật & Huy Hiệu (Technical Grid)',
      desc: 'Họa tiết lưới kỹ thuật tinh tế, các thẻ thông số, huy hiệu kỹ năng dạng badge công nghệ, hoàn hảo cho Kỹ sư & Lập trình viên.',
      icon: 'fa-solid fa-microchip'
    },
    {
      id: 'framed-luxury',
      name: 'Khung Viền Sang Trọng (Framed Border Deluxe)',
      desc: 'Đường viền đôi thanh nhã cách đều mép giấy 20mm, điểm nhấn góc hoa văn hoàng gia, mang lại cảm giác đẳng cấp và chỉn chu.',
      icon: 'fa-solid fa-square-full'
    }
  ];

  // 3. 12 Bảng Màu Chủ Đạo Có Thể Áp Dụng Cho Mọi Bố Cục
  const THEME_COLORS = [
    { id: 'blue-engineer', name: 'Xanh Kỹ Sư (Navy Blue)', hex: '#1e40af', secondary: '#f59e0b' },
    { id: 'cyan-tech', name: 'Xanh Công Nghệ (Tech Cyan)', hex: '#0284c7', secondary: '#38bdf8' },
    { id: 'green-emerald', name: 'Xanh Lục Bảo (Emerald Green)', hex: '#059669', secondary: '#d97706' },
    { id: 'red-burgundy', name: 'Đỏ Rượu Vang (Burgundy Red)', hex: '#991b1b', secondary: '#ca8a04' },
    { id: 'slate-dark', name: 'Đen Than Tối Giản (Slate Charcoal)', hex: '#1e293b', secondary: '#3b82f6' },
    { id: 'indigo-purple', name: 'Tím Indigo (Creative Purple)', hex: '#4f46e5', secondary: '#ec4899' },
    { id: 'amber-orange', name: 'Cam Hổ Phách (Amber Orange)', hex: '#d97706', secondary: '#2563eb' },
    { id: 'rose-ruby', name: 'Hồng Ruby (Rose Pink)', hex: '#e11d48', secondary: '#7c3aed' },
    { id: 'teal-ocean', name: 'Xanh Mòng Két (Elegant Teal)', hex: '#0d9488', secondary: '#0284c7' },
    { id: 'bronze-earth', name: 'Nâu Đất Hoàng Gia (Bronze Earth)', hex: '#854d0e', secondary: '#b45309' },
    { id: 'gray-neutral', name: 'Xám Khói Thanh Lịch (Neutral Gray)', hex: '#475569', secondary: '#2563eb' },
    { id: 'midnight-black', name: 'Xanh Đêm Thẳm (Midnight Black)', hex: '#0f172a', secondary: '#06b6d4' }
  ];

  // 4. Danh Sách Các Mẫu CV Chuẩn Hóa Theo Kiến Trúc Độc Bản
  // Mỗi mẫu có phong cách bố cục riêng biệt, liên kết với ngành nghề và màu sắc mặc định
  const TEMPLATES = [
    {
      id: 'tpl-001',
      name: 'Kỹ Sư Điện - Blueprint Pro (Mặc Định)',
      industryId: 'electrical-tech',
      industryName: 'Kỹ Sư & Kỹ Thuật Điện',
      styleId: 'modern-sidebar',
      styleName: 'Cột Trái Hiện Đại (Left Sidebar)',
      isDefault: true,
      badge: 'Mặc Định • Khuyên Dùng',
      desc: 'Bố cục 2 cột với thanh bên thông số kỹ thuật vững chãi, tối ưu trình bày dự án tủ điện, trạm biến áp và phần mềm CAD/PLC.',
      colors: { primary: '#1e40af', secondary: '#f59e0b', textDark: '#1e293b', bgSoft: '#eff6ff' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-002',
      name: 'CNTT & Phần Mềm - Fullstack Matrix',
      industryId: 'it-software',
      industryName: 'CNTT & Lập Trình Viên',
      styleId: 'technical-grid',
      styleName: 'Bản Vẽ Kỹ Thuật & Huy Hiệu',
      isDefault: false,
      badge: 'Công Nghệ',
      desc: 'Bố cục lưới công nghệ hiện đại, nổi bật các huy hiệu công nghệ (Tech Stack badges), kiến trúc Microservices và dự án GitHub.',
      colors: { primary: '#0284c7', secondary: '#38bdf8', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-003',
      name: 'Kinh Doanh B2B - Enterprise Closer',
      industryId: 'business-sales',
      industryName: 'Kinh Doanh & Quản Lý Sales',
      styleId: 'header-banner',
      styleName: 'Header Banner Toàn Chiều Rộng',
      isDefault: false,
      badge: 'Kinh Doanh',
      desc: 'Header banner quyền uy, làm nổi bật thành tích vượt doanh số, mạng lưới quan hệ khách hàng VIP và đàm phán hợp đồng lớn.',
      colors: { primary: '#1e293b', secondary: '#d97706', textDark: '#0f172a', bgSoft: '#f8fafc' },
      fontHeading: 'Inter',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-004',
      name: 'Marketing & Growth - Viral Impact',
      industryId: 'marketing-media',
      industryName: 'Marketing & Truyền Thông Số',
      styleId: 'editorial-magazine',
      styleName: 'Tạp Chí Sáng Tạo (Editorial)',
      isDefault: false,
      badge: 'Marketing',
      desc: 'Typography tạp chí thời thượng, hộp trích dẫn mục tiêu nổi bật, thiết kế bất đối xứng thu hút nhà tuyển dụng sáng tạo.',
      colors: { primary: '#be123c', secondary: '#7c3aed', textDark: '#1f2937', bgSoft: '#fff1f2' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-005',
      name: 'Tài Chính & Kiểm Toán - Wall Street Precision',
      industryId: 'finance-accounting',
      industryName: 'Tài Chính, Kế Toán & Ngân Hàng',
      styleId: 'minimal-clean',
      styleName: 'Tối Giản Chuẩn ATS (Swiss Clean)',
      isDefault: false,
      badge: 'Tài Chính',
      desc: 'Đơn giản, chuẩn mực, độ tương phản sắc nét, thông số tài chính và chứng chỉ CFA/CPA được tổ chức khoa học tuyệt đối.',
      colors: { primary: '#065f46', secondary: '#ca8a04', textDark: '#132a13', bgSoft: '#f0fdf4' },
      fontHeading: 'Inter',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-006',
      name: 'Y Tế & Bác Sĩ - Clinical Harmony',
      industryId: 'medical-health',
      industryName: 'Y Tế, Bác Sĩ & Sức Khỏe',
      styleId: 'right-sidebar',
      styleName: 'Cột Phải Tinh Tế (Right Sidebar)',
      isDefault: false,
      badge: 'Y Tế',
      desc: 'Cột phải dịu mát tạo cảm giác tin cậy, cột trái ưu tiên làm nổi bật quá trình đào tạo chuyên khoa và kinh nghiệm lâm sàng bệnh viện.',
      colors: { primary: '#0f766e', secondary: '#0284c7', textDark: '#134e4a', bgSoft: '#f0fdfa' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-007',
      name: 'Giáo Dục & Giảng Viên - Academic Scholar',
      industryId: 'education-training',
      industryName: 'Giáo Dục, Đào Tạo & Giảng Viên',
      styleId: 'executive-bold',
      styleName: 'Đẳng Cấp Quản Lý & Lãnh Đạo (Serif)',
      isDefault: false,
      badge: 'Giáo Dục',
      desc: 'Khung viền sang trọng, phông chữ có chân mẫu mực, thể hiện bề dày nghiên cứu khoa học, bằng cấp thạc sĩ và giải thưởng sư phạm.',
      colors: { primary: '#831843', secondary: '#ca8a04', textDark: '#2b061e', bgSoft: '#fdf2f8' },
      fontHeading: 'Inter',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-008',
      name: 'Thiết Kế Đồ Họa & UI/UX - Modern Bento',
      industryId: 'design-creative',
      industryName: 'Thiết Kế Đồ Họa & UI/UX',
      styleId: 'bento-cards',
      styleName: 'Thẻ Khối Bento Hiện Đại (Bento Grid)',
      isDefault: false,
      badge: 'Sáng Tạo',
      desc: 'Bố cục module dạng thẻ Bento UI bo tròn đẳng cấp, thể hiện gu thẩm mỹ thời thượng, năng lực Design System và sản phẩm nổi bật.',
      colors: { primary: '#18181b', secondary: '#ea580c', textDark: '#18181b', bgSoft: '#fafafa' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-009',
      name: 'Khách Sạn & Du Lịch - 5-Star Luxury',
      industryId: 'hospitality-service',
      industryName: 'Nhà Hàng, Khách Sạn & Du Lịch',
      styleId: 'framed-luxury',
      styleName: 'Khung Viền Sang Trọng (Framed Deluxe)',
      isDefault: false,
      badge: 'Dịch Vụ',
      desc: 'Khung viền chỉ đôi cao cấp, khoảng thở rộng mở, tái hiện phong thái hiếu khách thượng lưu chuẩn khách sạn quốc tế.',
      colors: { primary: '#9a3412', secondary: '#d97706', textDark: '#2b1006', bgSoft: '#fff7ed' },
      fontHeading: 'Inter',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-010',
      name: 'Nhân Sự & Tuyển Dụng - People Champion',
      industryId: 'hr-administration',
      industryName: 'Nhân Sự & Tuyển Dụng HRBP',
      styleId: 'split-contrast',
      styleName: 'Chia Đôi Tương Phản 50/50',
      isDefault: false,
      badge: 'Nhân Sự',
      desc: 'Hai mảng khối màu tương phản hài hòa, tôn vinh kỹ năng kết nối con người, chiến lược HRBP và văn hóa doanh nghiệp vững mạnh.',
      colors: { primary: '#334155', secondary: '#e11d48', textDark: '#1e293b', bgSoft: '#f8fafc' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-011',
      name: 'Lộ Trình Thăng Tiến - Career Timeline',
      industryId: 'electrical-tech',
      industryName: 'Kỹ Sư & Kỹ Thuật Điện',
      styleId: 'timeline-focus',
      styleName: 'Trục Thời Gian Trực Quan (Timeline)',
      isDefault: false,
      badge: 'Lộ Trình',
      desc: 'Trục thời gian xuyên suốt kết nối từng bước tiến sự nghiệp từ kỹ sư hiện trường lên trưởng nhóm kỹ thuật và quản lý dự án.',
      colors: { primary: '#1d4ed8', secondary: '#fbbf24', textDark: '#1e293b', bgSoft: '#eef2ff' },
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Inter'
    },
    {
      id: 'tpl-012',
      name: 'Tổng Quan Toàn Diện - Compact 3-Column',
      industryId: 'it-software',
      industryName: 'CNTT & Lập Trình Viên',
      styleId: 'compact-3col',
      styleName: '3 Cột Cô Đọng Thông Tin (3-Column)',
      isDefault: false,
      badge: 'Toàn Diện',
      desc: 'Bố cục 3 cột song song chứa lượng thông tin tối đa mà vẫn thông thoáng, thích hợp ứng viên có nhiều dự án và chứng chỉ chuyên ngành.',
      colors: { primary: '#4f46e5', secondary: '#10b981', textDark: '#0f172a', bgSoft: '#eef2ff' },
      fontHeading: 'Inter',
      fontBody: 'Inter'
    }
  ];

  return {
    INDUSTRIES,
    LAYOUT_STYLES,
    THEME_COLORS,
    TEMPLATES,
    getDefaultTemplate: () => TEMPLATES[0],
    getTemplateById: (id) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0],
    getTemplatesByIndustry: (indId) => TEMPLATES.filter(t => t.industryId === indId),
    getTemplatesByStyle: (styleId) => TEMPLATES.filter(t => t.styleId === styleId)
  };
})();
