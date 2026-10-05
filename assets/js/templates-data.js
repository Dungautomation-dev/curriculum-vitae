/**
 * Curriculum Vitae (CV Creator) - 100 Templates Catalog & Industry Definitions
 * Author: Dung Automation
 */

const CV_TEMPLATES_CATALOG = (function () {
  // 10 Core Industry Sectors
  const INDUSTRIES = [
    {
      id: 'electrical-tech',
      name: 'Kỹ Sư & Kỹ Thuật Công Nghệ',
      nameEn: 'Engineering & Technology',
      icon: 'fa-solid fa-bolt',
      desc: 'Điện, Cơ khí, Tự động hóa, Cơ điện M&E, Xây dựng, Điện tử viễn thông',
      badge: 'Kỹ Thuật'
    },
    {
      id: 'it-software',
      name: 'CNTT & Lập Trình Viên',
      nameEn: 'IT & Software Development',
      icon: 'fa-solid fa-code',
      desc: 'Frontend, Backend, Fullstack, Mobile App, DevOps, Data & Trí tuệ nhân tạo AI',
      badge: 'Công Nghệ'
    },
    {
      id: 'business-sales',
      name: 'Kinh Doanh & Quản Lý Bán Hàng',
      nameEn: 'Business & Sales Management',
      icon: 'fa-solid fa-briefcase',
      desc: 'Sales B2B/B2C, Account Manager, Giám sát bán hàng, Phát triển thị trường',
      badge: 'Kinh Doanh'
    },
    {
      id: 'marketing-media',
      name: 'Marketing & Truyền Thông Số',
      nameEn: 'Marketing & Digital Media',
      icon: 'fa-solid fa-bullhorn',
      desc: 'Digital Marketing, Content Creator, SEO Specialist, Brand Manager, Event',
      badge: 'Marketing'
    },
    {
      id: 'finance-accounting',
      name: 'Tài Chính, Kế Toán & Ngân Hàng',
      nameEn: 'Finance, Accounting & Banking',
      icon: 'fa-solid fa-calculator',
      desc: 'Kế toán tổng hợp, Kiểm toán viên, Phân tích tài chính, Chuyên viên tín dụng',
      badge: 'Tài Chính'
    },
    {
      id: 'medical-health',
      name: 'Y Tế, Dược Phẩm & Sức Khỏe',
      nameEn: 'Medical, Pharmacy & Healthcare',
      icon: 'fa-solid fa-stethoscope',
      desc: 'Bác sĩ điều trị, Dược sĩ, Điều dưỡng, Kỹ thuật viên xét nghiệm, Chăm sóc y tế',
      badge: 'Y Tế'
    },
    {
      id: 'education-training',
      name: 'Giáo Dục, Đào Tạo & Nghiên Cứu',
      nameEn: 'Education, Training & Research',
      icon: 'fa-solid fa-graduation-cap',
      desc: 'Giảng viên đại học, Giáo viên các cấp, Chuyên viên đào tạo doanh nghiệp (L&D)',
      badge: 'Giáo Dục'
    },
    {
      id: 'design-creative',
      name: 'Thiết Kế, Nghệ Thuật & Sáng Tạo',
      nameEn: 'Design & Creative Arts',
      icon: 'fa-solid fa-palette',
      desc: 'UI/UX Designer, Graphic Design, Kiến trúc sư, Thiết kế nội thất, Video Editor',
      badge: 'Sáng Tạo'
    },
    {
      id: 'hospitality-service',
      name: 'Nhà Hàng, Khách Sạn & Du Lịch',
      nameEn: 'Hospitality, F&B & Tourism',
      icon: 'fa-solid fa-bell-concierge',
      desc: 'Quản lý nhà hàng, Bếp trưởng F&B, Lễ tân khách sạn, Hướng dẫn viên du lịch',
      badge: 'Dịch Vụ'
    },
    {
      id: 'hr-administration',
      name: 'Nhân Sự, Hành Chính & Pháp Lý',
      nameEn: 'HR, Administration & Legal',
      icon: 'fa-solid fa-users-gear',
      desc: 'HR Manager, Chuyên viên tuyển dụng, Hành chính văn phòng, Pháp chế doanh nghiệp',
      badge: 'Nhân Sự'
    }
  ];

  // 10 Visual Layout Archetypes
  const LAYOUT_STYLES = [
    {
      id: 'modern-sidebar',
      name: 'Cột Trái Hiện Đại (Left Sidebar)',
      desc: 'Bố cục 2 cột với thanh bên thông tin cá nhân & kỹ năng, nội dung chính bên phải',
      icon: 'fa-solid fa-table-columns'
    },
    {
      id: 'right-sidebar',
      name: 'Cột Phải Tinh Tế (Right Sidebar)',
      desc: 'Thanh phụ kỹ năng bên phải, kinh nghiệm & học vấn chiếm vị trí chủ đạo bên trái',
      icon: 'fa-solid fa-table-columns fa-flip-horizontal'
    },
    {
      id: 'classic-two-col',
      name: 'Hai Cột Cân Xứng (Classic 2-Column)',
      desc: 'Bố cục truyền thống đối xứng, chuẩn quét tự động ATS tuyển dụng quốc tế',
      icon: 'fa-solid fa-grip-vertical'
    },
    {
      id: 'header-banner',
      name: 'Header Băng Ngang (Header Banner Grid)',
      desc: 'Khối thông tin cá nhân trải dài trên cùng, nội dung bên dưới chia lưới khoa học',
      icon: 'fa-solid fa-window-maximize'
    },
    {
      id: 'minimal-clean',
      name: 'Tối Giản Thụy Sĩ (Swiss Minimalism)',
      desc: 'Phong cách tối giản, đường nét thanh mảnh, khoảng thở rộng rãi, cực kỳ trang nhã',
      icon: 'fa-solid fa-bars-staggered'
    },
    {
      id: 'timeline-focus',
      name: 'Trục Thời Gian (Timeline Infographic)',
      desc: 'Dòng thời gian dọc trực quan làm nổi bật lộ trình thăng tiến và các mốc học tập',
      icon: 'fa-solid fa-timeline'
    },
    {
      id: 'executive-bold',
      name: 'Đẳng Cấp Lãnh Đạo (Executive Bold)',
      desc: 'Đường nét mạnh mẽ, điểm xuyết ánh kim sang trọng dành cho cấp quản lý & chuyên gia',
      icon: 'fa-solid fa-award'
    },
    {
      id: 'compact-grid',
      name: 'Tối Ưu 1 Trang A4 (Compact Grid)',
      desc: 'Tối ưu diện tích hiển thị gói gọn trong 1 trang A4 mà không bị rối mắt',
      icon: 'fa-solid fa-table-cells-large'
    },
    {
      id: 'infographic-badges',
      name: 'Đồ Họa & Huy Hiệu (Infographic Badges)',
      desc: 'Tập trung vào các huy hiệu kỹ năng, thanh đánh giá trực quan và biểu tượng sinh động',
      icon: 'fa-solid fa-chart-simple'
    },
    {
      id: 'creative-split',
      name: 'Khối Màu Tương Phản (Creative Split)',
      desc: 'Khối màu phân mảng phá cách, trẻ trung, tạo ấn tượng thị giác sâu sắc',
      icon: 'fa-solid fa-puzzle-piece'
    }
  ];

  // Colors & Themes Palette for each industry
  const INDUSTRY_PALETTES = {
    'electrical-tech': [
      { primary: '#1e40af', secondary: '#f59e0b', textDark: '#1e293b', bgSoft: '#eff6ff' },
      { primary: '#0369a1', secondary: '#38bdf8', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      { primary: '#1d4ed8', secondary: '#fbbf24', textDark: '#1e293b', bgSoft: '#eef2ff' },
      { primary: '#2563eb', secondary: '#10b981', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#0284c7', secondary: '#f97316', textDark: '#1e293b', bgSoft: '#f0fdf4' },
      { primary: '#1e3a8a', secondary: '#eab308', textDark: '#0f172a', bgSoft: '#fefce8' },
      { primary: '#0e7490', secondary: '#06b6d4', textDark: '#1e293b', bgSoft: '#ecfeff' },
      { primary: '#3b82f6', secondary: '#6366f1', textDark: '#0f172a', bgSoft: '#f5f3ff' },
      { primary: '#172554', secondary: '#60a5fa', textDark: '#1e293b', bgSoft: '#eff6ff' },
      { primary: '#0c4a6e', secondary: '#38bdf8', textDark: '#0f172a', bgSoft: '#f0f9ff' }
    ],
    'it-software': [
      { primary: '#312e81', secondary: '#10b981', textDark: '#0f172a', bgSoft: '#f5f3ff' },
      { primary: '#1e1e24', secondary: '#00d26a', textDark: '#18181b', bgSoft: '#f4f4f5' },
      { primary: '#4338ca', secondary: '#06b6d4', textDark: '#0f172a', bgSoft: '#e0e7ff' },
      { primary: '#0f172a', secondary: '#38bdf8', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#18181b', secondary: '#a855f7', textDark: '#18181b', bgSoft: '#faf5ff' },
      { primary: '#4f46e5', secondary: '#f43f5e', textDark: '#0f172a', bgSoft: '#fff1f2' },
      { primary: '#0284c7', secondary: '#8b5cf6', textDark: '#0f172a', bgSoft: '#f5f3ff' },
      { primary: '#111827', secondary: '#10b981', textDark: '#111827', bgSoft: '#f9fafb' },
      { primary: '#3730a3', secondary: '#ec4899', textDark: '#0f172a', bgSoft: '#fdf2f8' },
      { primary: '#2e1065', secondary: '#22c55e', textDark: '#0f172a', bgSoft: '#f5f3ff' }
    ],
    'business-sales': [
      { primary: '#0f172a', secondary: '#d97706', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#1e3a5f', secondary: '#ca8a04', textDark: '#0f172a', bgSoft: '#fefce8' },
      { primary: '#1e293b', secondary: '#2563eb', textDark: '#0f172a', bgSoft: '#eff6ff' },
      { primary: '#1c1917', secondary: '#b45309', textDark: '#1c1917', bgSoft: '#f5f5f4' },
      { primary: '#0c4a6e', secondary: '#eab308', textDark: '#0c4a6e', bgSoft: '#f0f9ff' },
      { primary: '#111827', secondary: '#059669', textDark: '#111827', bgSoft: '#f0fdf4' },
      { primary: '#27272a', secondary: '#f59e0b', textDark: '#27272a', bgSoft: '#fafaf9' },
      { primary: '#1e1b4b', secondary: '#d97706', textDark: '#1e1b4b', bgSoft: '#f8fafc' },
      { primary: '#334155', secondary: '#f97316', textDark: '#334155', bgSoft: '#fff7ed' },
      { primary: '#172554', secondary: '#eab308', textDark: '#172554', bgSoft: '#eff6ff' }
    ],
    'marketing-media': [
      { primary: '#be123c', secondary: '#7c3aed', textDark: '#1f2937', bgSoft: '#fff1f2' },
      { primary: '#9333ea', secondary: '#f43f5e', textDark: '#1f2937', bgSoft: '#faf5ff' },
      { primary: '#e11d48', secondary: '#f97316', textDark: '#1f2937', bgSoft: '#fff7ed' },
      { primary: '#c026d3', secondary: '#06b6d4', textDark: '#1f2937', bgSoft: '#fdf4ff' },
      { primary: '#4f46e5', secondary: '#fb7185', textDark: '#1f2937', bgSoft: '#eef2ff' },
      { primary: '#db2777', secondary: '#8b5cf6', textDark: '#1f2937', bgSoft: '#fdf2f8' },
      { primary: '#ea580c', secondary: '#d946ef', textDark: '#1f2937', bgSoft: '#fff7ed' },
      { primary: '#7c3aed', secondary: '#10b981', textDark: '#1f2937', bgSoft: '#f5f3ff' },
      { primary: '#e11d48', secondary: '#3b82f6', textDark: '#1f2937', bgSoft: '#fff1f2' },
      { primary: '#6366f1', secondary: '#f59e0b', textDark: '#1f2937', bgSoft: '#eef2ff' }
    ],
    'finance-accounting': [
      { primary: '#065f46', secondary: '#b45309', textDark: '#132a13', bgSoft: '#f0fdf4' },
      { primary: '#047857', secondary: '#d97706', textDark: '#0f172a', bgSoft: '#ecfdf5' },
      { primary: '#166534', secondary: '#ca8a04', textDark: '#14532d', bgSoft: '#f0fdf4' },
      { primary: '#1e3a8a', secondary: '#15803d', textDark: '#0f172a', bgSoft: '#eff6ff' },
      { primary: '#0f766e', secondary: '#eab308', textDark: '#134e4a', bgSoft: '#f0fdfa' },
      { primary: '#111827', secondary: '#059669', textDark: '#111827', bgSoft: '#f9fafb' },
      { primary: '#1e293b', secondary: '#10b981', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#064e3b', secondary: '#f59e0b', textDark: '#064e3b', bgSoft: '#f0fdf4' },
      { primary: '#14532d', secondary: '#3b82f6', textDark: '#14532d', bgSoft: '#f0fdf4' },
      { primary: '#0c4a6e', secondary: '#16a34a', textDark: '#0c4a6e', bgSoft: '#f0f9ff' }
    ],
    'medical-health': [
      { primary: '#0f766e', secondary: '#0284c7', textDark: '#134e4a', bgSoft: '#f0fdfa' },
      { primary: '#0284c7', secondary: '#10b981', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      { primary: '#0d9488', secondary: '#38bdf8', textDark: '#134e4a', bgSoft: '#ccfbf1' },
      { primary: '#0369a1', secondary: '#14b8a6', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      { primary: '#14b8a6', secondary: '#6366f1', textDark: '#134e4a', bgSoft: '#f0fdfa' },
      { primary: '#0284c7', secondary: '#f43f5e', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      { primary: '#047857', secondary: '#0284c7', textDark: '#0f172a', bgSoft: '#ecfdf5' },
      { primary: '#2563eb', secondary: '#0d9488', textDark: '#0f172a', bgSoft: '#eff6ff' },
      { primary: '#0891b2', secondary: '#10b981', textDark: '#164e63', bgSoft: '#ecfeff' },
      { primary: '#155e75', secondary: '#06b6d4', textDark: '#164e63', bgSoft: '#ecfeff' }
    ],
    'education-training': [
      { primary: '#831843', secondary: '#92400e', textDark: '#2b061e', bgSoft: '#fdf2f8' },
      { primary: '#701a75', secondary: '#b45309', textDark: '#2a082b', bgSoft: '#fdf4ff' },
      { primary: '#1e3a8a', secondary: '#b45309', textDark: '#0f172a', bgSoft: '#eff6ff' },
      { primary: '#9f1239', secondary: '#ca8a04', textDark: '#2a0815', bgSoft: '#fff1f2' },
      { primary: '#312e81', secondary: '#d97706', textDark: '#0f172a', bgSoft: '#e0e7ff' },
      { primary: '#854d0e', secondary: '#9f1239', textDark: '#3b2405', bgSoft: '#fefce8' },
      { primary: '#4c1d95', secondary: '#b45309', textDark: '#1e0b3b', bgSoft: '#f5f3ff' },
      { primary: '#1e293b', secondary: '#9f1239', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#92400e', secondary: '#1d4ed8', textDark: '#3b2405', bgSoft: '#fefce8' },
      { primary: '#581c87', secondary: '#d97706', textDark: '#2e1065', bgSoft: '#faf5ff' }
    ],
    'design-creative': [
      { primary: '#18181b', secondary: '#ea580c', textDark: '#18181b', bgSoft: '#fafafa' },
      { primary: '#0f172a', secondary: '#f43f5e', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#ea580c', secondary: '#8b5cf6', textDark: '#18181b', bgSoft: '#fff7ed' },
      { primary: '#4f46e5', secondary: '#f97316', textDark: '#0f172a', bgSoft: '#eef2ff' },
      { primary: '#7c3aed', secondary: '#06b6d4', textDark: '#18181b', bgSoft: '#f5f3ff' },
      { primary: '#172554', secondary: '#ec4899', textDark: '#172554', bgSoft: '#eff6ff' },
      { primary: '#be185d', secondary: '#f59e0b', textDark: '#18181b', bgSoft: '#fdf2f8' },
      { primary: '#27272a', secondary: '#10b981', textDark: '#27272a', bgSoft: '#f4f4f5' },
      { primary: '#0d9488', secondary: '#f43f5e', textDark: '#18181b', bgSoft: '#f0fdfa' },
      { primary: '#262626', secondary: '#eab308', textDark: '#262626', bgSoft: '#fafafa' }
    ],
    'hospitality-service': [
      { primary: '#9a3412', secondary: '#d97706', textDark: '#2b1006', bgSoft: '#fff7ed' },
      { primary: '#b45309', secondary: '#0284c7', textDark: '#291404', bgSoft: '#fefce8' },
      { primary: '#7c2d12', secondary: '#eab308', textDark: '#2b1006', bgSoft: '#fff7ed' },
      { primary: '#854d0e', secondary: '#059669', textDark: '#291404', bgSoft: '#fefce8' },
      { primary: '#1c1917', secondary: '#ea580c', textDark: '#1c1917', bgSoft: '#f5f5f4' },
      { primary: '#065f46', secondary: '#d97706', textDark: '#064e3b', bgSoft: '#f0fdf4' },
      { primary: '#a16207', secondary: '#be123c', textDark: '#291404', bgSoft: '#fefce8' },
      { primary: '#1e3a5f', secondary: '#f97316', textDark: '#0f172a', bgSoft: '#f0f9ff' },
      { primary: '#78350f', secondary: '#d97706', textDark: '#291404', bgSoft: '#fefce8' },
      { primary: '#991b1b', secondary: '#ca8a04', textDark: '#290606', bgSoft: '#fef2f2' }
    ],
    'hr-administration': [
      { primary: '#334155', secondary: '#e11d48', textDark: '#1e293b', bgSoft: '#f8fafc' },
      { primary: '#475569', secondary: '#2563eb', textDark: '#1e293b', bgSoft: '#f1f5f9' },
      { primary: '#1e293b', secondary: '#059669', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#374151', secondary: '#7c3aed', textDark: '#111827', bgSoft: '#f9fafb' },
      { primary: '#1f2937', secondary: '#f59e0b', textDark: '#111827', bgSoft: '#f9fafb' },
      { primary: '#0f172a', secondary: '#ec4899', textDark: '#0f172a', bgSoft: '#f8fafc' },
      { primary: '#4b5563', secondary: '#06b6d4', textDark: '#111827', bgSoft: '#f9fafb' },
      { primary: '#18181b', secondary: '#3b82f6', textDark: '#18181b', bgSoft: '#f4f4f5' },
      { primary: '#3f3f46', secondary: '#10b981', textDark: '#18181b', bgSoft: '#fafafa' },
      { primary: '#1e1b4b', secondary: '#e11d48', textDark: '#1e1b4b', bgSoft: '#eef2ff' }
    ]
  };

  // Generate 100 CV Templates
  const TEMPLATES = [];
  let templateCounter = 1;

  INDUSTRIES.forEach((ind) => {
    LAYOUT_STYLES.forEach((sty, styleIdx) => {
      const padNum = String(templateCounter).padStart(3, '0');
      const id = `tpl-${padNum}`;
      const colorScheme = INDUSTRY_PALETTES[ind.id][styleIdx] || INDUSTRY_PALETTES[ind.id][0];

      // Custom titles & descriptions per archetype
      let templateName = `${ind.name.split('&')[0].trim()} • ${sty.name.split('(')[0].trim()}`;
      let isDefault = (id === 'tpl-001');

      if (isDefault) {
        templateName = 'Kỹ Sư Điện - Blueprint Pro (Mặc Định)';
      }

      TEMPLATES.push({
        id: id,
        number: templateCounter,
        name: templateName,
        industryId: ind.id,
        industryName: ind.name,
        styleId: sty.id,
        styleName: sty.name,
        isDefault: isDefault,
        badge: isDefault ? 'Mặc Định • Khuyên Dùng' : ind.badge,
        desc: `${sty.desc}. Phối màu chủ đạo ${colorScheme.primary} chuẩn nhận diện ngành.`,
        colors: {
          primary: colorScheme.primary,
          secondary: colorScheme.secondary,
          textDark: colorScheme.textDark,
          bgSoft: colorScheme.bgSoft
        },
        fontHeading: (ind.id === 'it-software' || ind.id === 'electrical-tech') ? 'Plus Jakarta Sans' : 'Inter',
        fontBody: 'Inter',
        atsScore: 98
      });

      templateCounter++;
    });
  });

  return {
    INDUSTRIES,
    LAYOUT_STYLES,
    TEMPLATES,
    getDefaultTemplate: () => TEMPLATES[0],
    getTemplateById: (id) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0],
    getTemplatesByIndustry: (indId) => TEMPLATES.filter(t => t.industryId === indId)
  };
})();
