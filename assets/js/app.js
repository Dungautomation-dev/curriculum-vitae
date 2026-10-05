/**
 * Curriculum Vitae (CV Creator) - Core Application Controller
 * Xử lý dữ liệu động, 12 Kiến trúc Bố cục Độc bản, Bảng màu Chủ đạo tự do,
 * Nạp hồ sơ chuẩn 10 Ngành nghề, Resizer cột kéo thả, Xuất / Nạp .dungauto
 * Author: Dung Automation
 */

const CVApp = (function () {
  // Global State
  let profile = null;
  let activeTemplate = null;
  let activeThemeColor = '#1e40af';
  let ratingMode = 'percentage'; // 'percentage' | 'stars' | 'dots'
  let sectionsConfig = {};
  let currentZoom = 0.95;

  // Pro Customizer, Direct Edit, History & Custom Templates State
  let customDesignConfig = {
    fontPreset: 'inter',
    fontScale: 100,
    sectionSpacing: 'standard',
    dividerStyle: 'solid',
    avatarShape: 'round',
    avatarBorder: 2,
    avatarShadow: 'soft'
  };
  let isDirectEditMode = false;
  let customTemplates = [];
  let historyStack = [];
  let historyIndex = -1;
  let isUndoRedoAction = false;

  // Collapsible Sidebars, Zen Mode & Multi-Page Layout State (Requirements 1, 2, 3)
  let isLeftSidebarCollapsed = false;
  let isRightSidebarCollapsed = false;
  let isZenMode = false;
  let pageLayoutMode = 'vertical'; // 'vertical' | 'horizontal'

  // Pre-defined Quick Selection Lists (Tích chọn nhanh)
  const QUICK_SOFT_SKILLS = [
    'Quản lý dự án & tiến độ thi công',
    'Xử lý sự cố kỹ thuật khẩn cấp & an toàn',
    'Làm việc nhóm & điều phối liên bộ môn',
    'Giao tiếp & thuyết trình kỹ thuật',
    'Quản lý thời gian & phân bổ nhân lực',
    'Tư duy phản biện & giải quyết vấn đề',
    'Đàm phán & làm việc với chủ đầu tư',
    'Kỹ năng viết báo cáo chuyên nghiệp'
  ];

  const QUICK_STRENGTHS = [
    'Tỉ mỉ, cẩn trọng tuyệt đối với an toàn tính mạng & thiết bị',
    'Khả năng đọc hiểu tài liệu tiếng Anh chuyên ngành tốt',
    'Chịu được áp lực tiến độ cao, sẵn sàng bám sát hiện trường',
    'Chủ động cập nhật công nghệ mới & tinh thần ham học hỏi',
    'Tinh thần trách nhiệm cao và cam kết hoàn thành mục tiêu',
    'Tư duy logic, giải quyết bài toán hóc búa nhanh nhạy'
  ];

  const QUICK_HOBBIES = [
    'Nghiên cứu mạch vi điều khiển IoT & Nhà thông minh',
    'Đọc tạp chí Kỹ thuật Tự động hóa & Năng lượng mới',
    'Chơi cờ vua rèn luyện tư duy phân tích chiến thuật',
    'Tập chạy bộ marathon cự ly 10km rèn luyện sức bền',
    'Chụp ảnh phong cảnh & du lịch trải nghiệm',
    'Đóng góp cho cộng đồng mã nguồn mở trên GitHub'
  ];

  /**
   * Initialize Application
   */
  function init() {
    initWorkspaceResizer();
    loadInitialState();
    initSidebarStates();
    initPageLayoutMode();
    initThemeColorPicker();
    applyTemplateStyles(activeTemplate);
    renderFormInputs();
    renderCVPreview();
    renderQuickTemplatesSidebar();
    syncCustomizerDrawerInputs();
    updateA4PageGauge();
    pushHistoryState(); // Initial history snapshot for Undo/Redo
    setupEventListeners();
    setupAutoSave();
    setupDirectEditEvents();
    showToast('⚡ Đã sẵn sàng! Mặc định hiển thị CV Kỹ sư Điện.', 'fa-solid fa-bolt');
  }

  /**
   * Draggable Workspace Resizer Handle
   */
  function initWorkspaceResizer() {
    const resizer = document.getElementById('workspace-resizer');
    const sidebar = document.querySelector('.editor-sidebar');
    if (!resizer || !sidebar) return;

    // Restore saved width or initialize to 340px (min width requested)
    let savedWidth = localStorage.getItem('dungauto_cv_editor_width');
    if (!savedWidth || savedWidth === '530' || savedWidth === '530px' || savedWidth === '420' || savedWidth === '420px') {
      savedWidth = '340';
      localStorage.setItem('dungauto_cv_editor_width', '340');
    }
    const widthVal = parseInt(savedWidth, 10) || 340;
    const clamped = Math.max(280, Math.min(750, widthVal));
    document.documentElement.style.setProperty('--editor-width', `${clamped}px`);

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    resizer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = sidebar.getBoundingClientRect().width;
      resizer.classList.add('is-dragging');
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      let newWidth = startWidth + deltaX;
      // Clamp between 280px and 750px
      if (newWidth < 280) newWidth = 280;
      if (newWidth > 750) newWidth = 750;
      document.documentElement.style.setProperty('--editor-width', `${newWidth}px`);
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        resizer.classList.remove('is-dragging');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        const curWidth = sidebar.getBoundingClientRect().width;
        localStorage.setItem('dungauto_cv_editor_width', Math.round(curWidth));
      }
    });

    // Double-click to reset to default 340px
    resizer.addEventListener('dblclick', () => {
      document.documentElement.style.setProperty('--editor-width', '340px');
      localStorage.setItem('dungauto_cv_editor_width', '340');
      showToast('Đã đặt lại độ rộng cột điền về 340px chuẩn!', 'fa-solid fa-arrows-left-right');
    });
  }

  /**
   * Theme Color Picker Engine
   */
  function initThemeColorPicker() {
    const toggleBtn = document.getElementById('btn-toggle-theme-color');
    const dropdown = document.getElementById('theme-color-dropdown');
    const presetsGrid = document.getElementById('color-presets-grid');
    const customInput = document.getElementById('input-custom-theme-color');

    if (!toggleBtn || !dropdown || !presetsGrid) return;

    // Render 12 Color Preset Circles
    presetsGrid.innerHTML = CV_TEMPLATES_CATALOG.THEME_COLORS.map(c => `
      <div class="color-preset-circle ${c.hex.toLowerCase() === activeThemeColor.toLowerCase() ? 'active' : ''}" 
           style="background:${c.hex};" 
           title="${c.name}" 
           onclick="CVApp.setPrimaryThemeColor('${c.hex}', '${c.secondary}')"></div>
    `).join('');

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    if (customInput) {
      customInput.value = activeThemeColor;
    }
  }

  /**
   * Set and Apply Primary Theme Color
   */
  function setPrimaryThemeColor(hex, optSecondary) {
    activeThemeColor = hex;
    const root = document.documentElement;

    root.style.setProperty('--cv-primary', hex);
    root.style.setProperty('--cv-primary-light', hexToRgba(hex, 0.12));
    root.style.setProperty('--cv-bg-soft', hexToRgba(hex, 0.06));
    root.style.setProperty('--cv-border', hexToRgba(hex, 0.22));

    if (optSecondary) {
      root.style.setProperty('--cv-secondary', optSecondary);
    }

    if (activeTemplate && activeTemplate.colors) {
      activeTemplate.colors.primary = hex;
      if (optSecondary) activeTemplate.colors.secondary = optSecondary;
    }

    // Update Header Dot
    const dot = document.getElementById('header-theme-color-dot');
    if (dot) dot.style.background = hex;

    // Update Custom Color Input
    const customInput = document.getElementById('input-custom-theme-color');
    if (customInput) customInput.value = hex;

    // Close Dropdown
    const dropdown = document.getElementById('theme-color-dropdown');
    if (dropdown) dropdown.classList.remove('active');

    // Update Presets Active State
    document.querySelectorAll('.color-preset-circle').forEach(el => {
      const bg = el.style.backgroundColor;
      el.classList.remove('active');
    });

    renderCVPreview();
    triggerAutoSave();
    showToast(`Đã áp dụng màu chủ đạo mới: ${hex}`, 'fa-solid fa-palette');
  }

  function setCustomThemeColor(hex) {
    setPrimaryThemeColor(hex);
  }

  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * Load state from LocalStorage or default to Electrical Engineer
   */
  function loadInitialState() {
    // Load custom templates list
    customTemplates = CV_STORAGE.loadCustomTemplates();
    customTemplates.forEach(ct => CV_TEMPLATES_CATALOG.registerCustomTemplate(ct));

    const saved = CV_STORAGE.loadFromLocalStorage();
    if (saved && saved.data) {
      // Auto-migrate if stored profile is the old sample placeholder "NGUYỄN VĂN AN"
      if (saved.data.personalInfo && (saved.data.personalInfo.fullName === 'NGUYỄN VĂN AN' || !saved.data.personalInfo.fullName)) {
        profile = CV_SAMPLE_PROFILES.getDefaultProfile();
        CV_STORAGE.saveToLocalStorage(profile, saved.templateId || 'tpl-001', saved.skillRatingMode || 'percentage', saved.sectionsConfig, saved.themeColor, saved.customDesignConfig);
      } else {
        profile = saved.data;
      }
      activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById(saved.templateId) || CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = saved.skillRatingMode || 'percentage';
      sectionsConfig = saved.sectionsConfig || CV_STORAGE.DEFAULT_SECTIONS_CONFIG;
      if (saved.themeColor) {
        activeThemeColor = saved.themeColor;
      } else if (activeTemplate && activeTemplate.colors) {
        activeThemeColor = activeTemplate.colors.primary;
      }
      if (saved.customDesignConfig) {
        customDesignConfig = Object.assign({}, saved.customDesignConfig);
      }
    } else {
      profile = CV_SAMPLE_PROFILES.getDefaultProfile();
      activeTemplate = CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = profile.skillRatingMode || 'percentage';
      sectionsConfig = Object.assign({}, CV_STORAGE.DEFAULT_SECTIONS_CONFIG);
      activeThemeColor = activeTemplate.colors.primary;
      customDesignConfig = Object.assign({}, CV_STORAGE.DEFAULT_DESIGN_CONFIG);
    }

    // Sync rating mode select
    const modeSelect = document.getElementById('select-rating-mode');
    if (modeSelect) modeSelect.value = ratingMode;

    // Sync industry profile select
    const indSelect = document.getElementById('select-industry-profile');
    if (indSelect && profile && profile.industryId) {
      indSelect.value = profile.industryId;
    }
  }

  /**
   * Apply CSS Variables for the Active Template
   */
  function applyTemplateStyles(tpl) {
    if (!tpl) return;
    const root = document.documentElement;
    const prim = activeThemeColor || tpl.colors.primary;

    root.style.setProperty('--cv-primary', prim);
    root.style.setProperty('--cv-primary-light', hexToRgba(prim, 0.12));
    root.style.setProperty('--cv-secondary', tpl.colors.secondary);
    root.style.setProperty('--cv-text-dark', tpl.colors.textDark || '#1e293b');
    root.style.setProperty('--cv-bg-soft', hexToRgba(prim, 0.06));
    root.style.setProperty('--cv-border', hexToRgba(prim, 0.2));

    const dot = document.getElementById('header-theme-color-dot');
    if (dot) dot.style.background = prim;

    if (tpl.customDesignConfig) {
      customDesignConfig = Object.assign({}, tpl.customDesignConfig);
      syncCustomizerDrawerInputs();
    }

    // Update active template button in header (Compact single-line)
    const activePill = document.getElementById('active-template-name');
    if (activePill) {
      let displayName = tpl.name.split('•')[0].split('-')[0].trim();
      if (displayName.length > 22) displayName = displayName.substring(0, 20) + '...';
      activePill.innerHTML = `<i class="fa-solid fa-palette" style="color:${tpl.colors.secondary};"></i> <strong>${tpl.id.toUpperCase()}</strong>: ${escapeHtml(displayName)}`;
    }
  }

  /**
   * Load Industry Sample Profile
   */
  function loadIndustryProfile(indId) {
    const newProfile = CV_SAMPLE_PROFILES.getProfileByIndustry(indId);
    if (!newProfile) return;

    // Find template corresponding to industry
    const matchingTpl = CV_TEMPLATES_CATALOG.getTemplatesByIndustry(indId)[0] || activeTemplate;
    activeTemplate = matchingTpl;
    activeThemeColor = matchingTpl.colors.primary;

    profile = newProfile;
    applyTemplateStyles(activeTemplate);
    renderFormInputs();
    renderCVPreview();
    renderQuickTemplatesSidebar();
    triggerAutoSave();

    // Sync dropdown
    const indSelect = document.getElementById('select-industry-profile');
    if (indSelect) indSelect.value = indId;

    const indName = (CV_SAMPLE_PROFILES.INDUSTRY_META.find(m => m.id === indId) || {}).name || indId;
    showToast(`Đã nạp hồ sơ mẫu thực tế: ${indName}!`, 'fa-solid fa-user-check');
  }

  /**
   * Render All Inputs into the Editor Sidebar
   */
  function renderFormInputs() {
    const p = profile.personalInfo || {};
    setVal('input-fullname', p.fullName);
    setVal('input-jobtitle', p.jobTitle);
    setVal('input-email', p.email);
    setVal('input-phone', p.phone);
    setVal('input-address', p.address);
    setVal('input-dob', p.dateOfBirth);
    setVal('input-gender', p.gender);
    setVal('input-website', p.website);
    setVal('input-license', p.driverLicense);
    setVal('input-marital', p.maritalStatus);

    const avatarImg = document.getElementById('avatar-preview-display');
    if (avatarImg && p.avatarUrl) {
      avatarImg.src = p.avatarUrl;
    }

    setVal('input-summary', profile.summary || '');

    renderEducationInputs();
    renderExperienceInputs();
    renderHardSkillsInputs();
    renderSoftSkillsCheckboxes();
    renderStrengthsCheckboxes();
    renderHobbiesCheckboxes();
    renderCertificatesInputs();
    renderProjectsInputs();
    renderLanguagesInputs();
    renderReferencesInputs();
    renderSectionsVisibilityToggles();
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  /* Repeatable form items renderers */
  function renderEducationInputs() {
    const container = document.getElementById('education-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.education || []).map((edu, idx) => `
      <div class="repeatable-item-card" data-id="${edu.id}">
        <div class="repeatable-card-header">
          <span class="repeatable-card-index"><i class="fa-solid fa-graduation-cap"></i> Học vấn #${idx + 1}</span>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeEducation('${edu.id}')" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="form-group">
          <label class="form-label">Bằng cấp / Khóa học</label>
          <input type="text" class="form-input" value="${escapeHtml(edu.degree)}" oninput="CVApp.updateEducation('${edu.id}', 'degree', this.value)">
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Trường / Tổ chức</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.school)}" oninput="CVApp.updateEducation('${edu.id}', 'school', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Thời gian</label>
            <input type="text" class="form-input" value="${escapeHtml(edu.period)}" oninput="CVApp.updateEducation('${edu.id}', 'period', this.value)">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Xếp loại / GPA</label>
          <input type="text" class="form-input" value="${escapeHtml(edu.score || '')}" oninput="CVApp.updateEducation('${edu.id}', 'score', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả / Đồ án tốt nghiệp</label>
          <textarea class="form-textarea" rows="2" oninput="CVApp.updateEducation('${edu.id}', 'description', this.value)">${escapeHtml(edu.description || '')}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderExperienceInputs() {
    const container = document.getElementById('experience-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.experience || []).map((exp, idx) => `
      <div class="repeatable-item-card" data-id="${exp.id}">
        <div class="repeatable-card-header">
          <span class="repeatable-card-index"><i class="fa-solid fa-briefcase"></i> Kinh nghiệm #${idx + 1}</span>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeExperience('${exp.id}')" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="form-group">
          <label class="form-label">Chức danh / Vị trí</label>
          <input type="text" class="form-input" value="${escapeHtml(exp.position)}" oninput="CVApp.updateExperience('${exp.id}', 'position', this.value)">
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Công ty / Cơ quan</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.company)}" oninput="CVApp.updateExperience('${exp.id}', 'company', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Thời gian làm việc</label>
            <input type="text" class="form-input" value="${escapeHtml(exp.period)}" oninput="CVApp.updateExperience('${exp.id}', 'period', this.value)">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả trách nhiệm & thành tích (Gạch đầu dòng)</label>
          <textarea class="form-textarea" rows="4" oninput="CVApp.updateExperience('${exp.id}', 'description', this.value)">${escapeHtml(exp.description || '')}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderHardSkillsInputs() {
    const container = document.getElementById('hard-skills-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.hardSkills || []).map((skill, idx) => `
      <div class="repeatable-item-card" style="padding:10px 14px; margin-bottom:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
          <input type="text" class="form-input" style="flex:1;" value="${escapeHtml(skill.name)}" oninput="CVApp.updateHardSkill('${skill.id}', 'name', this.value)">
          <div style="display:flex; align-items:center; gap:6px; width:130px;">
            <input type="range" min="30" max="100" value="${skill.rating || 80}" style="flex:1;" oninput="CVApp.updateHardSkill('${skill.id}', 'rating', this.value); this.nextElementSibling.innerText=this.value+'%'">
            <span style="font-size:0.75rem; font-weight:700; width:35px; text-align:right;">${skill.rating || 80}%</span>
          </div>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeHardSkill('${skill.id}')" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `).join('');
  }

  function renderSoftSkillsCheckboxes() {
    const container = document.getElementById('quick-soft-skills-container');
    if (!container) return;
    const currentSkills = (profile.softSkills || []).map(s => s.name);
    container.innerHTML = QUICK_SOFT_SKILLS.map(skill => {
      const isChecked = currentSkills.includes(skill);
      return `
        <button type="button" class="quick-pill ${isChecked ? 'active' : ''}" onclick="CVApp.toggleSoftSkillPill('${escapeHtml(skill)}')">
          <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-plus'}"></i> ${escapeHtml(skill)}
        </button>
      `;
    }).join('');
  }

  function renderStrengthsCheckboxes() {
    const container = document.getElementById('quick-strengths-container');
    if (!container) return;
    const currentStrengths = (profile.strengths || []).map(s => s.name);
    container.innerHTML = QUICK_STRENGTHS.map(st => {
      const isChecked = currentStrengths.includes(st);
      return `
        <button type="button" class="quick-pill ${isChecked ? 'active' : ''}" onclick="CVApp.toggleStrengthPill('${escapeHtml(st)}')">
          <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-plus'}"></i> ${escapeHtml(st)}
        </button>
      `;
    }).join('');
  }

  function renderHobbiesCheckboxes() {
    const container = document.getElementById('quick-hobbies-container');
    if (!container) return;
    const currentHobbies = (profile.hobbies || []).map(h => h.name);
    container.innerHTML = QUICK_HOBBIES.map(hb => {
      const isChecked = currentHobbies.includes(hb);
      return `
        <button type="button" class="quick-pill ${isChecked ? 'active' : ''}" onclick="CVApp.toggleHobbyPill('${escapeHtml(hb)}')">
          <i class="fa-solid ${isChecked ? 'fa-check' : 'fa-plus'}"></i> ${escapeHtml(hb)}
        </button>
      `;
    }).join('');
  }

  function renderCertificatesInputs() {
    const container = document.getElementById('certificates-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.certifications || []).map((c, idx) => `
      <div class="repeatable-item-card" style="padding:10px 14px; margin-bottom:8px;">
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Tên chứng chỉ" value="${escapeHtml(c.name)}" oninput="CVApp.updateCert('${c.id}', 'name', this.value)">
          <div style="display:flex; gap:6px;">
            <input type="text" class="form-input" placeholder="Tổ chức cấp & Năm" value="${escapeHtml(c.issuer || '')}" oninput="CVApp.updateCert('${c.id}', 'issuer', this.value)">
            <button type="button" class="btn-remove-item" onclick="CVApp.removeCert('${c.id}')"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderProjectsInputs() {
    const container = document.getElementById('projects-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.projects || []).map((p, idx) => `
      <div class="repeatable-item-card" data-id="${p.id}">
        <div class="repeatable-card-header">
          <span class="repeatable-card-index"><i class="fa-solid fa-diagram-project"></i> Dự án #${idx + 1}</span>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeProject('${p.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="form-group">
          <label class="form-label">Tên dự án</label>
          <input type="text" class="form-input" value="${escapeHtml(p.name)}" oninput="CVApp.updateProject('${p.id}', 'name', this.value)">
        </div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Vai trò</label>
            <input type="text" class="form-input" value="${escapeHtml(p.role)}" oninput="CVApp.updateProject('${p.id}', 'role', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Thời gian</label>
            <input type="text" class="form-input" value="${escapeHtml(p.period)}" oninput="CVApp.updateProject('${p.id}', 'period', this.value)">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Công nghệ / Quy mô</label>
          <input type="text" class="form-input" value="${escapeHtml(p.tech || '')}" oninput="CVApp.updateProject('${p.id}', 'tech', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả kết quả đạt được</label>
          <textarea class="form-textarea" rows="2" oninput="CVApp.updateProject('${p.id}', 'description', this.value)">${escapeHtml(p.description || '')}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderLanguagesInputs() {
    const container = document.getElementById('languages-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.languages || []).map(lang => `
      <div class="repeatable-item-card" style="padding:10px 14px; margin-bottom:8px;">
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" class="form-input" style="flex:1;" value="${escapeHtml(lang.name)}" oninput="CVApp.updateLanguage('${lang.id}', 'name', this.value)">
          <input type="text" class="form-input" style="flex:1;" value="${escapeHtml(lang.level)}" oninput="CVApp.updateLanguage('${lang.id}', 'level', this.value)">
          <button type="button" class="btn-remove-item" onclick="CVApp.removeLanguage('${lang.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `).join('');
  }

  function renderReferencesInputs() {
    const container = document.getElementById('references-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.references || []).map(r => `
      <div class="repeatable-item-card" style="padding:10px 14px; margin-bottom:8px;">
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Họ tên người tham chiếu" value="${escapeHtml(r.name)}" oninput="CVApp.updateReference('${r.id}', 'name', this.value)">
          <input type="text" class="form-input" placeholder="Chức vụ & Đơn vị" value="${escapeHtml(r.title)}" oninput="CVApp.updateReference('${r.id}', 'title', this.value)">
        </div>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <input type="text" class="form-input" style="flex:1;" placeholder="Email / SĐT" value="${escapeHtml(r.contact)}" oninput="CVApp.updateReference('${r.id}', 'contact', this.value)">
          <button type="button" class="btn-remove-item" onclick="CVApp.removeReference('${r.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `).join('');
  }

  function renderSectionsVisibilityToggles() {
    const container = document.getElementById('sections-visibility-toggles');
    if (!container) return;
    const sections = [
      { key: 'summary', name: 'Giới thiệu bản thân' },
      { key: 'experience', name: 'Kinh nghiệm làm việc' },
      { key: 'education', name: 'Trình độ học vấn' },
      { key: 'hardSkills', name: 'Kỹ năng chuyên môn' },
      { key: 'softSkills', name: 'Kỹ năng mềm' },
      { key: 'strengths', name: 'Ưu điểm nổi bật' },
      { key: 'hobbies', name: 'Sở thích cá nhân' },
      { key: 'projects', name: 'Dự án tiêu biểu' },
      { key: 'certifications', name: 'Chứng chỉ chuyên môn' },
      { key: 'languages', name: 'Trình độ ngoại ngữ' },
      { key: 'references', name: 'Người tham chiếu' },
      { key: 'awards', name: 'Giải thưởng & Thành tích' }
    ];

    container.innerHTML = sections.map(s => `
      <label class="checkbox-pill">
        <input type="checkbox" ${sectionsConfig[s.key] !== false ? 'checked' : ''} onchange="CVApp.toggleSectionVisibility('${s.key}', this.checked)">
        <span>${escapeHtml(s.name)}</span>
      </label>
    `).join('');
  }

  /**
   * ==========================================================================
   * RENDER REAL-TIME CV PREVIEW (12 UNIQUE PRESENTATION ARCHETYPES)
   * Tuyệt đối không trùng lặp phong cách & Đảm bảo 100% chữ không chạm viền
   * ==========================================================================
   */
  function renderCVPreview() {
    const previewWrapper = document.getElementById('cv-a4-render-target');
    if (!previewWrapper || !profile) return;

    const tpl = activeTemplate || CV_TEMPLATES_CATALOG.getDefaultTemplate();
    const styleClass = `layout-${tpl.styleId}`;
    const p = profile.personalInfo || {};

    // 1. Build Contact HTML
    const contactItems = [];
    if (p.phone) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-phone"></i> <span>${escapeHtml(p.phone)}</span></div>`);
    if (p.email) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-envelope"></i> <span>${escapeHtml(p.email)}</span></div>`);
    if (p.address) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(p.address)}</span></div>`);
    if (p.website) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-globe"></i> <span>${escapeHtml(p.website.replace('https://', ''))}</span></div>`);
    if (p.dateOfBirth) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-cake-candles"></i> <span>${escapeHtml(p.dateOfBirth)}</span></div>`);
    if (p.driverLicense) contactItems.push(`<div class="cv-contact-item"><i class="fa-solid fa-id-card"></i> <span>${escapeHtml(p.driverLicense)}</span></div>`);

    const contactHtml = `<div class="cv-contact-list">${contactItems.join('')}</div>`;

    const contactChipsHtml = `
      <div class="cv-contact-chips-row">
        ${p.phone ? `<span class="cv-contact-chip"><i class="fa-solid fa-phone"></i> ${escapeHtml(p.phone)}</span>` : ''}
        ${p.email ? `<span class="cv-contact-chip"><i class="fa-solid fa-envelope"></i> ${escapeHtml(p.email)}</span>` : ''}
        ${p.address ? `<span class="cv-contact-chip"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(p.address)}</span>` : ''}
        ${p.website ? `<span class="cv-contact-chip"><i class="fa-solid fa-globe"></i> ${escapeHtml(p.website.replace('https://', ''))}</span>` : ''}
      </div>
    `;

    // 2. Build Skills HTML according to rating mode
    const hardSkillsHtml = (sectionsConfig.hardSkills !== false && (profile.hardSkills || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-bolt"></i> Kỹ Năng Chuyên Môn</h3>
        <div class="hard-skills-wrapper">
          ${profile.hardSkills.map(s => {
            const num = parseInt(s.rating, 10) || 80;
            const starCount = Math.round((num / 100) * 5);
            if (ratingMode === 'stars') {
              return `
                <div class="skill-item-bar" style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.79rem; font-weight:600;">${escapeHtml(s.name)}</span>
                  <div class="skill-stars-container">
                    ${[1,2,3,4,5].map(i => `<i class="fa-solid fa-star ${i <= starCount ? 'star-filled' : ''}"></i>`).join('')}
                  </div>
                </div>
              `;
            } else if (ratingMode === 'dots') {
              return `
                <div class="skill-item-bar" style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.79rem; font-weight:600;">${escapeHtml(s.name)}</span>
                  <div class="skill-dots-container">
                    ${[1,2,3,4,5].map(i => `<i class="fa-solid fa-circle ${i <= starCount ? 'dot-filled' : ''}"></i>`).join('')}
                  </div>
                </div>
              `;
            } else {
              return `
                <div class="skill-item-bar">
                  <div class="skill-info-row">
                    <span>${escapeHtml(s.name)}</span>
                    <span>${num}%</span>
                  </div>
                  <div class="skill-track">
                    <div class="skill-fill" style="width:${num}%;"></div>
                  </div>
                </div>
              `;
            }
          }).join('')}
        </div>
      </div>
    ` : '';

    const softSkillsHtml = (sectionsConfig.softSkills !== false && (profile.softSkills || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-users"></i> Kỹ Năng Mềm</h3>
        <div class="tag-pills-wrap">
          ${profile.softSkills.map(s => `<span class="tag-pill"><i class="fa-solid fa-check"></i> ${escapeHtml(s.name)}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const strengthsHtml = (sectionsConfig.strengths !== false && (profile.strengths || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-star"></i> Ưu Điểm Nổi Bật</h3>
        <ul style="padding-left:16px; margin:0; font-size:0.8rem; color:#334155; line-height:1.6;">
          ${profile.strengths.map(st => `<li>${escapeHtml(st.name)}</li>`).join('')}
        </ul>
      </div>
    ` : '';

    const hobbiesHtml = (sectionsConfig.hobbies !== false && (profile.hobbies || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-heart"></i> Sở Thích</h3>
        <div class="tag-pills-wrap">
          ${profile.hobbies.map(h => `<span class="tag-pill">${escapeHtml(h.name)}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const languagesHtml = (sectionsConfig.languages !== false && (profile.languages || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-language"></i> Ngôn Ngữ</h3>
        ${profile.languages.map(l => `
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
            <span style="font-weight:700;">${escapeHtml(l.name)}</span>
            <span style="color:#64748b;">${escapeHtml(l.level)}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    const experienceHtml = (sectionsConfig.experience !== false && (profile.experience || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-briefcase"></i> Kinh Nghiệm Làm Việc</h3>
        ${profile.experience.map(exp => `
          <div class="timeline-item">
            <div class="timeline-header">
              <span class="timeline-title">${escapeHtml(exp.position)}</span>
              <span class="timeline-period">${escapeHtml(exp.period)}</span>
            </div>
            <div class="timeline-subtitle">${escapeHtml(exp.company)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</div>
            <div class="timeline-desc">${escapeHtml(exp.description)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const educationHtml = (sectionsConfig.education !== false && (profile.education || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-graduation-cap"></i> Trình Độ Học Vấn</h3>
        ${profile.education.map(edu => `
          <div class="timeline-item">
            <div class="timeline-header">
              <span class="timeline-title">${escapeHtml(edu.degree)}</span>
              <span class="timeline-period">${escapeHtml(edu.period)}</span>
            </div>
            <div class="timeline-subtitle">${escapeHtml(edu.school)} ${edu.score ? `• ${escapeHtml(edu.score)}` : ''}</div>
            ${edu.description ? `<div class="timeline-desc">${escapeHtml(edu.description)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    const projectsHtml = (sectionsConfig.projects !== false && (profile.projects || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-diagram-project"></i> Dự Án Tiêu Biểu</h3>
        ${profile.projects.map(prj => `
          <div class="cv-card-item">
            <div class="cv-card-title">${escapeHtml(prj.name)}</div>
            <div class="cv-card-meta">${escapeHtml(prj.role)} • ${escapeHtml(prj.period)}</div>
            ${prj.tech ? `<div style="font-size:0.75rem; color:var(--cv-primary); margin-bottom:3px;"><i class="fa-solid fa-microchip"></i> ${escapeHtml(prj.tech)}</div>` : ''}
            <div class="cv-card-desc">${escapeHtml(prj.description)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const certificationsHtml = (sectionsConfig.certifications !== false && (profile.certifications || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-certificate"></i> Chứng Chỉ Chuyên Môn</h3>
        ${profile.certifications.map(c => `
          <div class="cv-card-item">
            <div class="cv-card-title">${escapeHtml(c.name)}</div>
            <div class="cv-card-meta">${escapeHtml(c.issuer)} ${c.year ? `• ${escapeHtml(c.year)}` : ''}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const referencesHtml = (sectionsConfig.references !== false && (profile.references || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-user-check"></i> Người Tham Chiếu</h3>
        ${profile.references.map(r => `
          <div class="cv-card-item">
            <div class="cv-card-title">${escapeHtml(r.name)}</div>
            <div class="cv-card-meta">${escapeHtml(r.title)}</div>
            <div style="font-size:0.75rem; color:#475569;">${escapeHtml(r.contact)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const summaryBlock = (sectionsConfig.summary !== false && profile.summary) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-user"></i> Giới Thiệu Bản Thân</h3>
        <div class="cv-summary-text">${escapeHtml(profile.summary)}</div>
      </div>
    ` : '';

    const avatarSrc = p.avatarUrl || 'assets/images/avatar-electrical-engineer.jpg';
    const avatarHtml = `<img src="${avatarSrc}" alt="Avatar" class="cv-avatar-img">`;

    // ========================================================================
    // 12 DISTINCT ARCHETYPES RENDERING LOGIC (MATCHING TEMPLATES.CSS EXACTLY)
    // ========================================================================

    if (tpl.styleId === 'right-sidebar') {
      // 2. CỘT PHẢI TINH TẾ (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-main">
            <div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
            </div>
            ${summaryBlock}
            ${experienceHtml}
            ${educationHtml}
            ${projectsHtml}
            ${referencesHtml}
          </div>
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${certificationsHtml}
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${strengthsHtml}
            ${languagesHtml}
            ${hobbiesHtml}
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'header-banner') {
      // 3. HEADER BANNER TOÀN CHIỀU RỘNG (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-banner-header">
            ${avatarHtml}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
          </div>
          <div class="cv-body-content">
            <div>
              ${summaryBlock}
              ${experienceHtml}
              ${projectsHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'minimal-clean') {
      // 4. TỐI GIẢN THỤY SĨ CHUẨN ATS (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-minimal-header">
            <div class="cv-minimal-header-inner">
              <div class="cv-avatar-wrap cv-minimal-avatar">${avatarHtml}</div>
              <div class="cv-minimal-header-info">
                <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
                <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
                ${contactChipsHtml}
              </div>
            </div>
          </div>
          ${summaryBlock}
          <div class="cv-columns-grid">
            <div>
              ${experienceHtml}
              ${projectsHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'timeline-focus') {
      // 5. TRỤC THỜI GIAN TRỰC QUAN (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-top-bar">
            ${avatarHtml}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
          </div>
          ${summaryBlock}
          <div class="cv-two-col-body">
            <div>
              <div class="cv-section">
                <h3 class="cv-section-title"><i class="fa-solid fa-timeline"></i> Lộ Trình Sự Nghiệp</h3>
                <div class="cv-timeline-wrapper">
                  ${(profile.experience || []).map(exp => `
                    <div class="timeline-item">
                      <div class="timeline-header">
                        <span class="timeline-title">${escapeHtml(exp.position)}</span>
                        <span class="timeline-period">${escapeHtml(exp.period)}</span>
                      </div>
                      <div class="timeline-subtitle">${escapeHtml(exp.company)}</div>
                      <div class="timeline-desc">${escapeHtml(exp.description)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              ${projectsHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'bento-cards') {
      // 6. THẺ KHỐI BENTO HIỆN ĐẠI (Cân đối đều 2 cột card)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="bento-card bento-hero-card">
            ${avatarHtml}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
          </div>
          ${summaryBlock ? `<div class="bento-card">${summaryBlock}</div>` : ''}
          <div class="bento-grid-2col">
            <div>
              ${experienceHtml ? `<div class="bento-card">${experienceHtml}</div>` : ''}
              ${projectsHtml ? `<div class="bento-card">${projectsHtml}</div>` : ''}
              ${certificationsHtml ? `<div class="bento-card">${certificationsHtml}</div>` : ''}
            </div>
            <div>
              ${educationHtml ? `<div class="bento-card">${educationHtml}</div>` : ''}
              ${hardSkillsHtml ? `<div class="bento-card">${hardSkillsHtml}</div>` : ''}
              ${(softSkillsHtml || strengthsHtml) ? `<div class="bento-card">${softSkillsHtml}${strengthsHtml}</div>` : ''}
              ${(languagesHtml || hobbiesHtml || referencesHtml) ? `<div class="bento-card">${languagesHtml}${hobbiesHtml}${referencesHtml}</div>` : ''}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'executive-bold') {
      // 7. ĐẲNG CẤP QUẢN LÝ & LÃNH ĐẠO (SERIF - Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="executive-inner-border">
            <div class="executive-centered-header">
              <div class="cv-avatar-wrap executive-avatar-wrap">${avatarHtml}</div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title" style="letter-spacing:2px;">${escapeHtml(p.jobTitle)}</div>
              <div style="display:flex; justify-content:center; gap:16px; margin-top:6px;">
                ${contactChipsHtml}
              </div>
            </div>
            ${summaryBlock}
            <div class="executive-columns">
              <div>
                ${experienceHtml}
                ${projectsHtml}
                ${certificationsHtml}
              </div>
              <div>
                ${educationHtml}
                ${hardSkillsHtml}
                ${softSkillsHtml}
                ${strengthsHtml}
                ${languagesHtml}
                ${hobbiesHtml}
                ${referencesHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'compact-3col') {
      // 8. 3 CỘT CÔ ĐỌNG THÔNG TIN (Cân đối đều hoàn hảo cả 3 cột - Triệt tiêu lỗi lệch 1 bên)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="compact-header">
            <div>
              <h1 class="cv-candidate-name" style="font-size:1.6rem;">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title" style="margin-bottom:0;">${escapeHtml(p.jobTitle)}</div>
            </div>
            ${contactChipsHtml}
          </div>
          ${summaryBlock}
          <div class="compact-3col-grid">
            <div>
              <div class="cv-avatar-wrap">${avatarHtml}</div>
              <div class="cv-section">
                <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
                ${contactHtml}
              </div>
              ${educationHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${experienceHtml}
              ${projectsHtml}
            </div>
            <div>
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'editorial-magazine') {
      // 9. TẠP CHÍ SÁNG TẠO (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="editorial-header">
            ${avatarHtml}
            <div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
          </div>
          ${profile.summary ? `
            <div class="editorial-pullquote">
              <i class="fa-solid fa-quote-left" style="color:var(--cv-primary); margin-right:6px;"></i>
              ${escapeHtml(profile.summary)}
            </div>
          ` : ''}
          <div class="editorial-columns">
            <div>
              ${experienceHtml}
              ${projectsHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'split-contrast') {
      // 10. CHIA ĐÔI TƯƠNG PHẢN (Cân đối tỷ lệ 45/55)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="split-col-left">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${certificationsHtml}
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${strengthsHtml}
            ${languagesHtml}
            ${hobbiesHtml}
          </div>
          <div class="split-col-right">
            <div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
            </div>
            ${summaryBlock}
            ${experienceHtml}
            ${educationHtml}
            ${projectsHtml}
            ${referencesHtml}
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'technical-grid') {
      // 11. BẢN VẼ KỸ THUẬT & HUY HIỆU (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="technical-header-box">
            ${avatarHtml}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
          </div>
          ${summaryBlock}
          <div class="tech-columns">
            <div>
              ${experienceHtml}
              ${projectsHtml}
              ${certificationsHtml}
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${hobbiesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'framed-luxury') {
      // 12. KHUNG VIỀN SANG TRỌNG CỔ ĐIỂN (Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="luxury-frame-box">
            <div class="luxury-header">
              <div class="cv-avatar-wrap luxury-avatar-wrap">${avatarHtml}</div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactChipsHtml}
            </div>
            ${summaryBlock}
            <div class="luxury-columns">
              <div>
                ${experienceHtml}
                ${projectsHtml}
                ${certificationsHtml}
              </div>
              <div>
                ${educationHtml}
                ${hardSkillsHtml}
                ${softSkillsHtml}
                ${strengthsHtml}
                ${languagesHtml}
                ${hobbiesHtml}
                ${referencesHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // 1. CỘT TRÁI HIỆN ĐẠI (DEFAULT: MODERN LEFT SIDEBAR - Cân đối đều 2 cột)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${certificationsHtml}
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${strengthsHtml}
            ${languagesHtml}
            ${hobbiesHtml}
          </div>
          <div class="cv-main">
            <div>
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
            </div>
            ${summaryBlock}
            ${experienceHtml}
            ${educationHtml}
            ${projectsHtml}
            ${referencesHtml}
          </div>
        </div>
      `;
    }

    // Apply Deep Visual Customizer Classes & CSS Font Scale
    const printableArea = document.getElementById('cv-printable-area');
    if (printableArea) {
      const customClasses = [
        `font-preset-${customDesignConfig.fontPreset || 'inter'}`,
        `spacing-${customDesignConfig.sectionSpacing || 'standard'}`,
        `divider-${customDesignConfig.dividerStyle || 'solid'}`,
        `avatar-shape-${customDesignConfig.avatarShape || 'round'}`,
        `avatar-border-${customDesignConfig.avatarBorder !== undefined ? customDesignConfig.avatarBorder : 2}`,
        `avatar-shadow-${customDesignConfig.avatarShadow || 'soft'}`
      ];
      if (isDirectEditMode) {
        customClasses.push('direct-edit-active');
      }
      printableArea.classList.add(...customClasses);
      printableArea.style.setProperty('--cv-font-scale', `${(customDesignConfig.fontScale || 100) / 100}`);

      if (isDirectEditMode) {
        enableDirectEditOnCanvas(printableArea);
      }
    }

    applyZoom(currentZoom);
    updateA4PageGauge();
  }

  /* Zoom Controller */
  function applyZoom(zoom) {
    currentZoom = zoom;
    const stage = document.getElementById('preview-zoom-stage');
    const zoomText = document.getElementById('zoom-percentage-text');
    if (stage) {
      stage.style.transform = `scale(${zoom})`;
    }
    if (zoomText) {
      zoomText.innerText = `${Math.round(zoom * 100)}%`;
    }
  }

  /* Event Handlers Setup */
  function setupEventListeners() {
    // Accordion Headers
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const sec = header.closest('.accordion-section');
        sec.classList.toggle('active');
      });
    });

    // Form inputs bindings
    bindInput('input-fullname', (val) => { profile.personalInfo.fullName = val; renderCVPreview(); });
    bindInput('input-jobtitle', (val) => { profile.personalInfo.jobTitle = val; renderCVPreview(); });
    bindInput('input-email', (val) => { profile.personalInfo.email = val; renderCVPreview(); });
    bindInput('input-phone', (val) => { profile.personalInfo.phone = val; renderCVPreview(); });
    bindInput('input-address', (val) => { profile.personalInfo.address = val; renderCVPreview(); });
    bindInput('input-dob', (val) => { profile.personalInfo.dateOfBirth = val; renderCVPreview(); });
    bindInput('input-gender', (val) => { profile.personalInfo.gender = val; renderCVPreview(); });
    bindInput('input-website', (val) => { profile.personalInfo.website = val; renderCVPreview(); });
    bindInput('input-license', (val) => { profile.personalInfo.driverLicense = val; renderCVPreview(); });
    bindInput('input-marital', (val) => { profile.personalInfo.maritalStatus = val; renderCVPreview(); });
    bindInput('input-summary', (val) => { profile.summary = val; renderCVPreview(); });

    // Avatar Upload
    const avatarInput = document.getElementById('input-avatar-file');
    if (avatarInput) {
      avatarInput.addEventListener('change', handleAvatarUpload);
    }

    // Zoom Buttons
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomFit = document.getElementById('btn-zoom-fit');

    if (btnZoomIn) btnZoomIn.addEventListener('click', () => applyZoom(Math.min(1.4, currentZoom + 0.1)));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => applyZoom(Math.max(0.5, currentZoom - 0.1)));
    if (btnZoomFit) btnZoomFit.addEventListener('click', () => applyZoom(0.95));

    // Template Modal
    const btnOpenTemplates = document.getElementById('btn-open-template-modal');
    const btnCloseModal = document.getElementById('btn-close-template-modal');
    const modalOverlay = document.getElementById('template-modal-overlay');

    if (btnOpenTemplates) {
      btnOpenTemplates.addEventListener('click', () => {
        renderTemplatesCatalogModal();
        if (modalOverlay) modalOverlay.classList.add('active');
      });
    }

    if (btnCloseModal && modalOverlay) {
      btnCloseModal.addEventListener('click', () => modalOverlay.classList.remove('active'));
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      });
    }

    // Export .dungauto Button
    const btnExportDungauto = document.getElementById('btn-export-dungauto');
    if (btnExportDungauto) {
      btnExportDungauto.addEventListener('click', () => {
        CV_STORAGE.exportDungAutoFile(profile, activeTemplate ? activeTemplate.id : 'tpl-001', ratingMode, sectionsConfig, activeThemeColor, customDesignConfig, customTemplates);
        showToast('Đã lưu toàn bộ hồ sơ ra tệp .dungauto!', 'fa-solid fa-floppy-disk');
      });
    }

    // Import .dungauto Button
    const fileImportDungauto = document.getElementById('file-import-dungauto');
    if (fileImportDungauto) {
      fileImportDungauto.addEventListener('change', handleImportDungAuto);
    }

    // Print Button
    const btnPrintCV = document.getElementById('btn-print-cv');
    if (btnPrintCV) {
      btnPrintCV.addEventListener('click', () => {
        CV_EXPORTER.printA4();
      });
    }

    // Download PDF Button
    const btnDownloadPDF = document.getElementById('btn-download-pdf');
    if (btnDownloadPDF) {
      btnDownloadPDF.addEventListener('click', () => {
        const candidateName = (profile.personalInfo && profile.personalInfo.fullName) ? profile.personalInfo.fullName : 'UngVien';
        CV_EXPORTER.downloadPDF(candidateName);
      });
    }
  }

  function bindInput(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      callback(e.target.value);
      triggerAutoSave();
    });
  }

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataUrl = event.target.result;
      profile.personalInfo.avatarUrl = dataUrl;
      const avatarPreview = document.getElementById('avatar-preview-display');
      if (avatarPreview) avatarPreview.src = dataUrl;
      renderCVPreview();
      triggerAutoSave();
      showToast('Đã cập nhật ảnh đại diện mới!', 'fa-solid fa-camera');
    };
    reader.readAsDataURL(file);
  }

  function handleImportDungAuto(e) {
    const file = e.target.files[0];
    if (!file) return;
    CV_STORAGE.importDungAutoFile(file, (importedData, err) => {
      if (err) {
        showToast(`Lỗi nạp file: ${err}`, 'fa-solid fa-triangle-exclamation');
        return;
      }
      profile = importedData.data;
      activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById(importedData.selectedTemplateId) || CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = importedData.ratingMode || 'percentage';
      sectionsConfig = importedData.visibility || Object.assign({}, CV_STORAGE.DEFAULT_SECTIONS_CONFIG);
      if (importedData.themeColor) {
        activeThemeColor = importedData.themeColor;
      } else if (activeTemplate && activeTemplate.colors) {
        activeThemeColor = activeTemplate.colors.primary;
      }
      if (importedData.customDesignConfig) {
        customDesignConfig = Object.assign({}, importedData.customDesignConfig);
        syncCustomizerDrawerInputs();
      }
      if (importedData.customTemplates && Array.isArray(importedData.customTemplates)) {
        importedData.customTemplates.forEach(t => {
          if (!customTemplates.some(ct => ct.id === t.id)) {
            customTemplates.push(t);
            CV_TEMPLATES_CATALOG.registerCustomTemplate(t);
          }
        });
        CV_STORAGE.saveCustomTemplates(customTemplates);
        renderQuickTemplatesSidebar();
      }

      applyTemplateStyles(activeTemplate);
      renderFormInputs();
      renderCVPreview();
      triggerAutoSave();

      const modeSelect = document.getElementById('select-rating-mode');
      if (modeSelect) modeSelect.value = ratingMode;

      showToast(`Đã nạp thành công hồ sơ từ file: ${file.name}!`, 'fa-solid fa-circle-check');
      e.target.value = '';
    });
  }

  /* Repeatable items CRUD methods */
  function addEducation() {
    profile.education = profile.education || [];
    profile.education.push({
      id: 'edu-' + Date.now(),
      degree: 'Bằng cấp / Khóa học mới...',
      school: 'Tên trường học...',
      period: '2020 - 2024',
      score: 'Khá / Giỏi',
      description: ''
    });
    renderEducationInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateEducation(id, field, val) {
    const item = (profile.education || []).find(e => e.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeEducation(id) {
    profile.education = (profile.education || []).filter(e => e.id !== id);
    renderEducationInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function addExperience() {
    profile.experience = profile.experience || [];
    profile.experience.push({
      id: 'exp-' + Date.now(),
      position: 'Vị trí công việc mới...',
      company: 'Tên công ty...',
      period: '2022 - Hiện tại',
      location: 'Hà Nội',
      description: '• Trách nhiệm và kết quả nổi bật...'
    });
    renderExperienceInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateExperience(id, field, val) {
    const item = (profile.experience || []).find(e => e.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeExperience(id) {
    profile.experience = (profile.experience || []).filter(e => e.id !== id);
    renderExperienceInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function addHardSkill() {
    profile.hardSkills = profile.hardSkills || [];
    profile.hardSkills.push({
      id: 'hs-' + Date.now(),
      name: 'Kỹ năng chuyên môn mới...',
      rating: 80,
      stars: 4
    });
    renderHardSkillsInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateHardSkill(id, field, val) {
    const item = (profile.hardSkills || []).find(s => s.id === id);
    if (item) {
      item[field] = val;
      if (field === 'rating') {
        item.stars = Math.round((parseInt(val, 10) / 100) * 5);
      }
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeHardSkill(id) {
    profile.hardSkills = (profile.hardSkills || []).filter(s => s.id !== id);
    renderHardSkillsInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleSoftSkillPill(skillName) {
    profile.softSkills = profile.softSkills || [];
    const idx = profile.softSkills.findIndex(s => s.name === skillName);
    if (idx >= 0) {
      profile.softSkills.splice(idx, 1);
    } else {
      profile.softSkills.push({ id: 'ss-' + Date.now(), name: skillName });
    }
    renderSoftSkillsCheckboxes();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleStrengthPill(strengthText) {
    profile.strengths = profile.strengths || [];
    const idx = profile.strengths.findIndex(s => s.name === strengthText);
    if (idx >= 0) {
      profile.strengths.splice(idx, 1);
    } else {
      profile.strengths.push({ id: 'st-' + Date.now(), name: strengthText });
    }
    renderStrengthsCheckboxes();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleHobbyPill(hobbyText) {
    profile.hobbies = profile.hobbies || [];
    const idx = profile.hobbies.findIndex(h => h.name === hobbyText);
    if (idx >= 0) {
      profile.hobbies.splice(idx, 1);
    } else {
      profile.hobbies.push({ id: 'hb-' + Date.now(), name: hobbyText });
    }
    renderHobbiesCheckboxes();
    renderCVPreview();
    triggerAutoSave();
  }

  function addProject() {
    profile.projects = profile.projects || [];
    profile.projects.push({
      id: 'prj-' + Date.now(),
      name: 'Tên dự án mới...',
      role: 'Vai trò đảm nhận',
      period: '2023 - 2024',
      tech: 'Công nghệ / Vật tư',
      description: 'Mô tả kết quả đạt được của dự án...'
    });
    renderProjectsInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateProject(id, field, val) {
    const item = (profile.projects || []).find(p => p.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeProject(id) {
    profile.projects = (profile.projects || []).filter(p => p.id !== id);
    renderProjectsInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function addCert() {
    profile.certifications = profile.certifications || [];
    profile.certifications.push({
      id: 'cert-' + Date.now(),
      name: 'Tên chứng chỉ mới...',
      issuer: 'Cơ quan cấp...',
      year: '2024'
    });
    renderCertificatesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateCert(id, field, val) {
    const item = (profile.certifications || []).find(c => c.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeCert(id) {
    profile.certifications = (profile.certifications || []).filter(c => c.id !== id);
    renderCertificatesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function addLanguage() {
    profile.languages = profile.languages || [];
    profile.languages.push({
      id: 'lang-' + Date.now(),
      name: 'Ngoại ngữ mới',
      level: 'Giao tiếp tốt'
    });
    renderLanguagesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateLanguage(id, field, val) {
    const item = (profile.languages || []).find(l => l.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeLanguage(id) {
    profile.languages = (profile.languages || []).filter(l => l.id !== id);
    renderLanguagesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function addReference() {
    profile.references = profile.references || [];
    profile.references.push({
      id: 'ref-' + Date.now(),
      name: 'Họ tên người tham chiếu',
      title: 'Chức vụ, công ty',
      contact: 'Email / SĐT'
    });
    renderReferencesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateReference(id, field, val) {
    const item = (profile.references || []).find(r => r.id === id);
    if (item) {
      item[field] = val;
      renderCVPreview();
      triggerAutoSave();
    }
  }

  function removeReference(id) {
    profile.references = (profile.references || []).filter(r => r.id !== id);
    renderReferencesInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleSectionVisibility(secKey, isVisible) {
    sectionsConfig[secKey] = isVisible;
    renderSectionsVisibilityToggles();
    renderCVPreview();
    triggerAutoSave();
  }

  function setRatingMode(mode) {
    ratingMode = mode;
    const modeSelect = document.getElementById('select-rating-mode');
    if (modeSelect) modeSelect.value = mode;
    renderCVPreview();
    triggerAutoSave();
    showToast(`Đã chuyển cách đánh giá kỹ năng sang: ${mode === 'stars' ? 'Dấu sao ⭐' : mode === 'dots' ? 'Chấm tròn •' : 'Phần trăm %'}`, 'fa-solid fa-sliders');
  }

  /**
   * ==========================================================================
   * 100 TEMPLATES MODAL RENDERER & SWITCHER
   * Phân loại theo 12 Kiến Trúc Bố Cục Độc Bản và 10 Ngành Nghề
   * ==========================================================================
   */
  let activeModalFilter = 'all';

  function renderTemplatesCatalogModal() {
    const tabsContainer = document.getElementById('modal-industry-tabs');
    const gridContainer = document.getElementById('modal-templates-grid');

    if (!tabsContainer || !gridContainer) return;

    // Render Filter Tabs
    const tabs = [
      { id: 'all', name: 'Tất Cả (12 Bố Cục Độc Bản)', icon: 'fa-solid fa-layer-group' },
      ...CV_TEMPLATES_CATALOG.INDUSTRIES
    ];

    tabsContainer.innerHTML = tabs.map(tab => `
      <div class="industry-tab-btn ${activeModalFilter === tab.id ? 'active' : ''}" onclick="CVApp.setModalFilter('${tab.id}')">
        <i class="${tab.icon}"></i> ${escapeHtml(tab.name.split('(')[0].trim())}
      </div>
    `).join('');

    // Search query
    const searchInput = document.getElementById('modal-template-search');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    // Filter templates
    let list = CV_TEMPLATES_CATALOG.TEMPLATES;
    if (activeModalFilter !== 'all') {
      list = list.filter(t => t.industryId === activeModalFilter);
    }
    if (query) {
      list = list.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query) ||
        t.styleName.toLowerCase().includes(query) ||
        t.industryName.toLowerCase().includes(query)
      );
    }

    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--gray-500);">
          <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:10px; color:var(--gray-400);"></i>
          <p>Không tìm thấy mẫu CV nào phù hợp với từ khóa của bạn.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = list.map(tpl => {
      const isSelected = (activeTemplate && activeTemplate.id === tpl.id);
      return `
        <div class="template-card ${isSelected ? 'active' : ''}" data-id="${tpl.id}">
          <div class="template-card-header">
            <span class="template-card-badge">${tpl.badge || 'Độc Bản'}</span>
            <span style="font-size:0.75rem; font-weight:700; color:var(--gray-400);">${tpl.id.toUpperCase()}</span>
          </div>
          <div class="template-card-title">${escapeHtml(tpl.name)}</div>
          <div class="template-card-desc">${escapeHtml(tpl.desc)}</div>
          <div style="font-size:0.75rem; color:var(--primary); font-weight:600; margin-bottom:10px;">
            <i class="fa-solid fa-shapes"></i> Bố cục: ${escapeHtml(tpl.styleName)}
          </div>
          <div class="template-card-footer" style="flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
              <div class="template-color-preview">
                <div class="color-swatch-dot" style="background:${tpl.colors.primary};" title="Màu chính"></div>
                <div class="color-swatch-dot" style="background:${tpl.colors.secondary};" title="Màu phụ"></div>
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="CVApp.applySelectedTemplate('${tpl.id}', false)">
                ${isSelected ? '<i class="fa-solid fa-check"></i> Đang Chọn' : 'Áp Dụng Mẫu'}
              </button>
            </div>
            <button type="button" class="btn btn-primary btn-sm" style="width:100%; font-size:0.75rem;" onclick="CVApp.applySelectedTemplate('${tpl.id}', true)" title="Áp dụng mẫu này và nạp luôn nội dung thực tế của ngành nghề này">
              <i class="fa-solid fa-file-signature"></i> Áp Dụng & Nạp Dữ Liệu Ngành Này
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function setModalFilter(filterId) {
    activeModalFilter = filterId;
    renderTemplatesCatalogModal();
  }

  function applySelectedTemplate(templateId, loadIndustryData) {
    const tpl = CV_TEMPLATES_CATALOG.getTemplateById(templateId);
    if (!tpl) return;

    activeTemplate = tpl;
    activeThemeColor = tpl.colors.primary;
    applyTemplateStyles(tpl);

    if (loadIndustryData && tpl.industryId) {
      const newProfile = CV_SAMPLE_PROFILES.getProfileByIndustry(tpl.industryId);
      if (newProfile) {
        profile = newProfile;
        renderFormInputs();
        const indSelect = document.getElementById('select-industry-profile');
        if (indSelect) indSelect.value = tpl.industryId;
      }
    }

    if (tpl.customDesignConfig) {
      customDesignConfig = Object.assign({}, tpl.customDesignConfig);
      syncCustomizerDrawerInputs();
    }

    renderCVPreview();
    renderQuickTemplatesSidebar();
    pushHistoryState();
    triggerAutoSave();

    // Close Modal
    const modalOverlay = document.getElementById('template-modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');

    showToast(`Đã áp dụng mẫu: ${tpl.name}!`, 'fa-solid fa-wand-magic-sparkles');
  }

  /* ==========================================================================
     RIGHT SIDEBAR QUICK TEMPLATES RENDERER
     ========================================================================== */
  let activeQuickFilter = 'all';

  function filterQuickTemplates(category) {
    activeQuickFilter = category;
    document.querySelectorAll('.quick-filter-chip').forEach(el => {
      el.classList.toggle('active', el.id === `qfilter-${category}`);
    });
    renderQuickTemplatesSidebar();
  }

  function renderQuickTemplatesSidebar() {
    const container = document.getElementById('templates-quick-list');
    if (!container) return;

    let list = CV_TEMPLATES_CATALOG.TEMPLATES;
    if (activeQuickFilter === 'sidebar') {
      list = list.filter(t => t.styleId === 'modern-sidebar' || t.styleId === 'right-sidebar' || t.styleId === 'split-contrast');
    } else if (activeQuickFilter === 'minimal') {
      list = list.filter(t => t.styleId === 'minimal-clean' || t.styleId === 'executive-bold' || t.styleId === 'framed-luxury' || t.styleId === 'compact-3col');
    } else if (activeQuickFilter === 'cards') {
      list = list.filter(t => t.styleId === 'header-banner' || t.styleId === 'bento-cards' || t.styleId === 'timeline-focus' || t.styleId === 'editorial-magazine' || t.styleId === 'technical-grid');
    }

    const archetypeIcons = {
      'modern-sidebar': 'fa-solid fa-table-columns',
      'right-sidebar': 'fa-solid fa-table-columns fa-flip-horizontal',
      'header-banner': 'fa-solid fa-window-maximize',
      'minimal-clean': 'fa-solid fa-bars-staggered',
      'timeline-focus': 'fa-solid fa-timeline',
      'bento-cards': 'fa-solid fa-table-cells-large',
      'executive-bold': 'fa-solid fa-award',
      'compact-3col': 'fa-solid fa-grip-vertical',
      'editorial-magazine': 'fa-solid fa-newspaper',
      'split-contrast': 'fa-solid fa-puzzle-piece',
      'technical-grid': 'fa-solid fa-microchip',
      'framed-luxury': 'fa-solid fa-square-full'
    };

    let html = '';

    // Show My Custom Templates at the top if any exist and filter is 'all'
    if (activeQuickFilter === 'all' && customTemplates.length > 0) {
      html += `
        <div style="font-size:0.75rem; font-weight:800; color:#b45309; margin:2px 0 4px 2px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-star"></i> Mẫu Của Tôi (${customTemplates.length})
        </div>
      `;
      html += customTemplates.map(tpl => {
        const isSelected = (activeTemplate && activeTemplate.id === tpl.id);
        return `
          <div class="quick-tpl-card ${isSelected ? 'active' : ''}" 
               style="border-color:#fde68a; background:#fefce8;"
               onclick="CVApp.applySelectedTemplate('${tpl.id}', false)" 
               title="Mẫu tự tạo: ${escapeHtml(tpl.name)}">
            <div class="quick-tpl-icon-box" style="background:#fef3c7; color:#d97706; border-color:#fde68a;">
              <i class="fa-solid fa-star"></i>
            </div>
            <div class="quick-tpl-info">
              <div class="quick-tpl-name" style="color:#92400e;">⭐ ${escapeHtml(tpl.name)}</div>
              <div class="quick-tpl-style">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${tpl.colors.primary};"></span>
                <span>Mẫu tùy chỉnh</span>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:4px;">
              <button type="button" class="btn-remove-item" style="color:#ef4444; width:22px; height:22px; font-size:0.75rem;" onclick="event.stopPropagation(); CVApp.deleteCustomTemplate('${tpl.id}')" title="Xóa mẫu này"><i class="fa-solid fa-trash-can"></i></button>
              <div class="quick-tpl-active-check" style="${isSelected ? 'display:block;' : ''}">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>
        `;
      }).join('');
      html += `
        <div style="font-size:0.75rem; font-weight:800; color:var(--gray-500); margin:8px 0 4px 2px;">
          Bố Cục Chuẩn Hệ Thống
        </div>
      `;
    }

    html += list.map(tpl => {
      const isSelected = (activeTemplate && activeTemplate.id === tpl.id);
      const iconClass = archetypeIcons[tpl.styleId] || 'fa-solid fa-file-lines';
      return `
        <div class="quick-tpl-card ${isSelected ? 'active' : ''}" 
             onclick="CVApp.applySelectedTemplate('${tpl.id}', false)" 
             title="Bấm để đổi ngay sang bố cục ${escapeHtml(tpl.name)}">
          <div class="quick-tpl-icon-box">
            <i class="${iconClass}"></i>
          </div>
          <div class="quick-tpl-info">
            <div class="quick-tpl-name">${tpl.id.toUpperCase()}: ${escapeHtml(tpl.name.split('-')[0].trim())}</div>
            <div class="quick-tpl-style">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${tpl.colors.primary};"></span>
              <span>${escapeHtml(tpl.styleName.split('(')[0].trim())}</span>
            </div>
          </div>
          <div class="quick-tpl-active-check">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  /* ==========================================================================
     PRO VISUAL CUSTOMIZER, DIRECT EDIT, FLOATING INSPECTOR, AUTO-FIT & HISTORY
     ========================================================================== */

  /**
   * History Management (Undo / Redo - Gợi ý 4)
   */
  function getSnapshot() {
    return {
      profile: JSON.parse(JSON.stringify(profile)),
      templateId: activeTemplate ? activeTemplate.id : 'tpl-001',
      themeColor: activeThemeColor,
      ratingMode: ratingMode,
      sectionsConfig: Object.assign({}, sectionsConfig),
      customDesignConfig: Object.assign({}, customDesignConfig)
    };
  }

  function pushHistoryState() {
    if (isUndoRedoAction) return;
    // Discard any forward history beyond current position
    historyStack = historyStack.slice(0, historyIndex + 1);
    historyStack.push(getSnapshot());
    if (historyStack.length > 25) {
      historyStack.shift();
    }
    historyIndex = historyStack.length - 1;
    updateHistoryButtons();
  }

  function undo() {
    if (historyIndex > 0) {
      historyIndex--;
      isUndoRedoAction = true;
      restoreHistoryState(historyStack[historyIndex]);
      isUndoRedoAction = false;
      updateHistoryButtons();
      showToast('Đã hoàn tác thao tác!', 'fa-solid fa-rotate-left');
    }
  }

  function redo() {
    if (historyIndex < historyStack.length - 1) {
      historyIndex++;
      isUndoRedoAction = true;
      restoreHistoryState(historyStack[historyIndex]);
      isUndoRedoAction = false;
      updateHistoryButtons();
      showToast('Đã làm lại thao tác!', 'fa-solid fa-rotate-right');
    }
  }

  function updateHistoryButtons() {
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    if (btnUndo) btnUndo.disabled = (historyIndex <= 0);
    if (btnRedo) btnRedo.disabled = (historyIndex >= historyStack.length - 1);
  }

  function restoreHistoryState(state) {
    if (!state) return;
    profile = JSON.parse(JSON.stringify(state.profile));
    activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById(state.templateId) || CV_TEMPLATES_CATALOG.getDefaultTemplate();
    activeThemeColor = state.themeColor;
    ratingMode = state.ratingMode;
    sectionsConfig = Object.assign({}, state.sectionsConfig);
    customDesignConfig = Object.assign({}, state.customDesignConfig);

    applyTemplateStyles(activeTemplate);
    renderFormInputs();
    renderCVPreview();
    renderQuickTemplatesSidebar();
    syncCustomizerDrawerInputs();
    updateA4PageGauge();
    triggerAutoSave();
  }

  /**
   * Direct Edit Mode on A4 Canvas
   */
  function toggleDirectEditMode() {
    isDirectEditMode = !isDirectEditMode;
    const btn = document.getElementById('btn-toggle-direct-edit');
    const txt = document.getElementById('direct-edit-text');
    if (isDirectEditMode) {
      if (btn) btn.classList.add('active');
      if (txt) txt.innerText = 'Đang Soạn Trực Quan';
      showToast('Chế độ soạn trực quan: Nhấp chuột trực tiếp lên A4 để gõ & chỉnh sửa!', 'fa-solid fa-pen-to-square');
    } else {
      if (btn) btn.classList.remove('active');
      if (txt) txt.innerText = 'Soạn Trực Quan';
      hideFloatingInspector();
      showToast('Đã tắt chế độ soạn trực quan.', 'fa-solid fa-eye');
    }
    renderCVPreview();
  }

  function setupDirectEditEvents() {
    // Keyboard shortcuts for Undo (Ctrl+Z) / Redo (Ctrl+Y or Ctrl+Shift+Z)
    document.addEventListener('keydown', (e) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        if (!isInput) {
          e.preventDefault();
          undo();
        }
      } else if (((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) ||
                 ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z'))) {
        if (!isInput) {
          e.preventDefault();
          redo();
        }
      }
    });

    // Dismiss floating inspector on outside click
    document.addEventListener('click', (e) => {
      const inspector = document.getElementById('floating-inspector');
      if (inspector && inspector.style.display !== 'none') {
        if (!inspector.contains(e.target) && !e.target.closest('.cv-avatar-wrap, .cv-section-title, .cv-minimal-avatar, .cv-avatar-img, .floating-inspector-btn')) {
          hideFloatingInspector();
        }
      }
    });
  }

  function enableDirectEditOnCanvas(canvas) {
    if (!canvas) return;

    // Direct edit Candidate Name
    canvas.querySelectorAll('.cv-candidate-name').forEach(el => {
      el.contentEditable = 'true';
      el.title = 'Bấm để sửa họ tên';
      el.addEventListener('input', () => {
        profile.personalInfo.fullName = el.innerText.trim();
        const input = document.getElementById('input-fullname');
        if (input) input.value = profile.personalInfo.fullName;
        triggerAutoSave();
        updateA4PageGauge();
      });
      el.addEventListener('blur', () => pushHistoryState());
    });

    // Direct edit Job Title
    canvas.querySelectorAll('.cv-candidate-title').forEach(el => {
      el.contentEditable = 'true';
      el.title = 'Bấm để sửa chức danh';
      el.addEventListener('input', () => {
        profile.personalInfo.jobTitle = el.innerText.trim();
        const input = document.getElementById('input-jobtitle');
        if (input) input.value = profile.personalInfo.jobTitle;
        triggerAutoSave();
        updateA4PageGauge();
      });
      el.addEventListener('blur', () => pushHistoryState());
    });

    // Direct edit Summary
    canvas.querySelectorAll('.cv-summary-text').forEach(el => {
      el.contentEditable = 'true';
      el.title = 'Bấm để sửa phần giới thiệu';
      el.addEventListener('input', () => {
        profile.summary = el.innerText.trim();
        const input = document.getElementById('input-summary');
        if (input) input.value = profile.summary;
        triggerAutoSave();
        updateA4PageGauge();
      });
      el.addEventListener('blur', () => pushHistoryState());
    });

    // Direct edit Descriptions & Titles in items
    canvas.querySelectorAll('.timeline-desc, .cv-card-desc, .timeline-title, .timeline-subtitle, .cv-card-title, .cv-card-meta').forEach(el => {
      el.contentEditable = 'true';
      el.addEventListener('input', () => {
        triggerAutoSave();
        updateA4PageGauge();
      });
      el.addEventListener('blur', () => pushHistoryState());
    });

    // Floating Inspector triggers on Avatar
    canvas.querySelectorAll('.cv-avatar-wrap, .cv-minimal-avatar, .cv-avatar-img').forEach(avatarEl => {
      avatarEl.style.cursor = 'pointer';
      avatarEl.title = 'Bấm để mở công cụ chỉnh ảnh đại diện';
      avatarEl.addEventListener('click', (e) => {
        e.stopPropagation();
        showFloatingInspectorForAvatar(avatarEl);
      });
    });

    // Floating Inspector triggers on Section Titles
    canvas.querySelectorAll('.cv-section-title').forEach(titleEl => {
      titleEl.style.cursor = 'pointer';
      titleEl.title = 'Bấm để chỉnh kiểu dáng đường kẻ & giãn cách';
      titleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        showFloatingInspectorForTitle(titleEl);
      });
    });
  }

  /**
   * Floating Visual Inspector (Gợi ý 1)
   */
  function showFloatingInspectorForAvatar(targetEl) {
    const inspector = document.getElementById('floating-inspector');
    const viewport = document.getElementById('preview-stage-viewport');
    if (!inspector || !viewport) return;

    inspector.innerHTML = `
      <span class="floating-inspector-title"><i class="fa-solid fa-image"></i> Ảnh Chân Dung:</span>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.avatarShape === 'round' ? 'active' : ''}" onclick="CVApp.setAvatarShape('round')" title="Tròn xoe">● Tròn</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.avatarShape === 'rounded' ? 'active' : ''}" onclick="CVApp.setAvatarShape('rounded')" title="Bo góc mềm">▢ Bo góc</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.avatarShape === 'square' ? 'active' : ''}" onclick="CVApp.setAvatarShape('square')" title="Vuông vắn">■ Vuông</button>
      <div class="floating-inspector-divider"></div>
      <button type="button" class="floating-inspector-btn" onclick="CVApp.cycleAvatarBorder()" title="Đổi viền ảnh (0px / 2px / 4px)"><i class="fa-solid fa-border-all"></i> Viền</button>
      <label class="floating-inspector-btn" style="cursor:pointer;" title="Tải ảnh mới từ máy tính">
        <i class="fa-solid fa-camera"></i> Đổi Ảnh
        <input type="file" accept="image/*" style="display:none;" onchange="CVApp.handleFloatingAvatarUpload(event)">
      </label>
      <button type="button" class="floating-inspector-btn" onclick="CVApp.hideFloatingInspector()" style="color:#ef4444; font-weight:bold;" title="Đóng">&times;</button>
    `;

    const targetRect = targetEl.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const top = targetRect.top - viewportRect.top - 46;
    const left = targetRect.left - viewportRect.left + (targetRect.width / 2);

    inspector.style.top = Math.max(10, top) + 'px';
    inspector.style.left = Math.max(20, left) + 'px';
    inspector.style.transform = 'translateX(-50%)';
    inspector.style.display = 'flex';
  }

  function handleFloatingAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataUrl = event.target.result;
      profile.personalInfo.avatarUrl = dataUrl;
      const avatarPreview = document.getElementById('avatar-preview-display');
      if (avatarPreview) avatarPreview.src = dataUrl;
      renderCVPreview();
      pushHistoryState();
      triggerAutoSave();
      showToast('Đã cập nhật ảnh đại diện mới!', 'fa-solid fa-camera');
    };
    reader.readAsDataURL(file);
  }

  function showFloatingInspectorForTitle(targetEl) {
    const inspector = document.getElementById('floating-inspector');
    const viewport = document.getElementById('preview-stage-viewport');
    if (!inspector || !viewport) return;

    inspector.innerHTML = `
      <span class="floating-inspector-title"><i class="fa-solid fa-grip-lines"></i> Đường Ngăn:</span>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.dividerStyle === 'solid' ? 'active' : ''}" onclick="CVApp.setDividerStyle('solid')" title="Nét liền">Liền</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.dividerStyle === 'dashed' ? 'active' : ''}" onclick="CVApp.setDividerStyle('dashed')" title="Nét đứt">Đứt</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.dividerStyle === 'double' ? 'active' : ''}" onclick="CVApp.setDividerStyle('double')" title="Viền đôi">Đôi</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.dividerStyle === 'gradient' ? 'active' : ''}" onclick="CVApp.setDividerStyle('gradient')" title="Gradient">Grad</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.dividerStyle === 'none' ? 'active' : ''}" onclick="CVApp.setDividerStyle('none')" title="Bỏ viền">Không</button>
      <div class="floating-inspector-divider"></div>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.sectionSpacing === 'compact' ? 'active' : ''}" onclick="CVApp.setSectionSpacing('compact')" title="Giãn cách gọn">Gọn</button>
      <button type="button" class="floating-inspector-btn ${customDesignConfig.sectionSpacing === 'standard' ? 'active' : ''}" onclick="CVApp.setSectionSpacing('standard')" title="Giãn cách chuẩn">Chuẩn</button>
      <button type="button" class="floating-inspector-btn" onclick="CVApp.hideFloatingInspector()" style="color:#ef4444; font-weight:bold;" title="Đóng">&times;</button>
    `;

    const targetRect = targetEl.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const top = targetRect.top - viewportRect.top - 46;
    const left = targetRect.left - viewportRect.left + (targetRect.width / 2);

    inspector.style.top = Math.max(10, top) + 'px';
    inspector.style.left = Math.max(20, left) + 'px';
    inspector.style.transform = 'translateX(-50%)';
    inspector.style.display = 'flex';
  }

  function hideFloatingInspector() {
    const inspector = document.getElementById('floating-inspector');
    if (inspector) {
      inspector.style.display = 'none';
    }
  }

  /**
   * Collapsible Sidebars & Zen Mode (Requirement 3)
   */
  function initSidebarStates() {
    isLeftSidebarCollapsed = localStorage.getItem('dungauto_cv_left_collapsed') === 'true';
    isRightSidebarCollapsed = localStorage.getItem('dungauto_cv_right_collapsed') === 'true';
    if (isLeftSidebarCollapsed) toggleLeftSidebar(true);
    if (isRightSidebarCollapsed) toggleRightSidebar(true);
    updateZenModeButton();
  }

  function toggleLeftSidebar(forceState) {
    const sidebar = document.getElementById('editor-sidebar');
    const expandBtn = document.getElementById('btn-expand-left');
    const resizer = document.getElementById('workspace-resizer');
    if (!sidebar) return;

    if (typeof forceState === 'boolean') {
      isLeftSidebarCollapsed = forceState;
    } else {
      isLeftSidebarCollapsed = !isLeftSidebarCollapsed;
    }

    if (isLeftSidebarCollapsed) {
      sidebar.classList.add('collapsed');
      if (expandBtn) expandBtn.classList.add('active');
      if (resizer) resizer.classList.add('hidden-resizer');
    } else {
      sidebar.classList.remove('collapsed');
      if (expandBtn) expandBtn.classList.remove('active');
      if (resizer) resizer.classList.remove('hidden-resizer');
    }

    localStorage.setItem('dungauto_cv_left_collapsed', isLeftSidebarCollapsed);
    updateZenModeButton();
  }

  function toggleRightSidebar(forceState) {
    const sidebar = document.getElementById('templates-sidebar');
    const expandBtn = document.getElementById('btn-expand-right');
    if (!sidebar) return;

    if (typeof forceState === 'boolean') {
      isRightSidebarCollapsed = forceState;
    } else {
      isRightSidebarCollapsed = !isRightSidebarCollapsed;
    }

    if (isRightSidebarCollapsed) {
      sidebar.classList.add('collapsed');
      if (expandBtn) expandBtn.classList.add('active');
    } else {
      sidebar.classList.remove('collapsed');
      if (expandBtn) expandBtn.classList.remove('active');
    }

    localStorage.setItem('dungauto_cv_right_collapsed', isRightSidebarCollapsed);
    updateZenModeButton();
  }

  function toggleZenMode() {
    if (!isLeftSidebarCollapsed || !isRightSidebarCollapsed) {
      toggleLeftSidebar(true);
      toggleRightSidebar(true);
      isZenMode = true;
      showToast('⚡ Đã bật Chế độ Siêu Rộng: Thu gọn 2 bên để tối đa không gian soạn thảo!', 'fa-solid fa-expand');
    } else {
      toggleLeftSidebar(false);
      toggleRightSidebar(false);
      isZenMode = false;
      showToast('Đã khôi phục các thanh công cụ bên lề.', 'fa-solid fa-compress');
    }
    updateZenModeButton();
  }

  function updateZenModeButton() {
    const btnZen = document.getElementById('btn-zen-mode');
    if (!btnZen) return;

    const bothCollapsed = isLeftSidebarCollapsed && isRightSidebarCollapsed;
    if (bothCollapsed) {
      btnZen.classList.add('active');
      btnZen.innerHTML = '<i class="fa-solid fa-compress"></i>';
      btnZen.setAttribute('data-tooltip', 'Khôi phục 2 thanh bên (Thoát Siêu Rộng)');
      btnZen.title = 'Khôi phục 2 thanh bên (Thoát Siêu Rộng)';
    } else {
      btnZen.classList.remove('active');
      btnZen.innerHTML = '<i class="fa-solid fa-expand"></i>';
      btnZen.setAttribute('data-tooltip', 'Chế độ Siêu Rộng (Thu gọn 2 bên)');
      btnZen.title = 'Chế độ Siêu Rộng (Thu gọn 2 bên)';
    }
  }

  /**
   * Multi-Page Layout & Page Break Dividers (Requirements 1 & 2)
   */
  function initPageLayoutMode() {
    const saved = localStorage.getItem('dungauto_cv_page_layout_mode');
    if (saved) pageLayoutMode = saved;
    applyPageLayoutMode();
  }

  function togglePageLayoutMode() {
    pageLayoutMode = (pageLayoutMode === 'vertical') ? 'horizontal' : 'vertical';
    localStorage.setItem('dungauto_cv_page_layout_mode', pageLayoutMode);
    applyPageLayoutMode();
    renderCVPreview();
    showToast(
      pageLayoutMode === 'horizontal' ? '📖 Đã chuyển sang Dàn Trang Hàng Ngang (Trang 1 & 2 cạnh nhau)!' : '📑 Đã chuyển về Cuộn Dọc truyền thống!',
      pageLayoutMode === 'horizontal' ? 'fa-solid fa-book-open' : 'fa-solid fa-file-lines'
    );
  }

  function applyPageLayoutMode() {
    const stageViewport = document.querySelector('.preview-container');
    const btnToggle = document.getElementById('btn-toggle-page-layout');
    if (!btnToggle) return;

    if (pageLayoutMode === 'horizontal') {
      if (stageViewport) stageViewport.classList.add('stage-horizontal-layout');
      btnToggle.classList.add('active');
      btnToggle.innerHTML = '<i class="fa-solid fa-file-lines"></i>';
      btnToggle.setAttribute('data-tooltip', 'Cuộn Dọc truyền thống');
      btnToggle.title = 'Cuộn Dọc truyền thống';
    } else {
      if (stageViewport) stageViewport.classList.remove('stage-horizontal-layout');
      btnToggle.classList.remove('active');
      btnToggle.innerHTML = '<i class="fa-solid fa-book-open"></i>';
      btnToggle.setAttribute('data-tooltip', 'Dàn trang Ngang (Xem các trang cạnh nhau)');
      btnToggle.title = 'Dàn trang Ngang (Xem các trang cạnh nhau)';
    }
  }

  function renderPageBreakDividersAndHorizontal() {
    const previewWrapper = document.getElementById('cv-a4-render-target');
    const sheet = document.getElementById('cv-printable-area');
    if (!previewWrapper || !sheet) return;

    // Remove any previous dividers
    sheet.querySelectorAll('.cv-page-break-divider').forEach(el => el.remove());
    const oldRow = previewWrapper.querySelector('.horizontal-pages-row');
    if (oldRow) oldRow.remove();

    // Standard A4 height = 297mm = ~1122.52px at 96 DPI
    const standardA4Height = 1122.52;
    const scrollH = sheet.scrollHeight;
    const totalPages = Math.ceil(scrollH / standardA4Height);

    // Requirement 1: In vertical mode, render scissors cut dividers at 297mm, 594mm...
    if (pageLayoutMode === 'vertical') {
      sheet.style.display = '';
      if (totalPages > 1) {
        for (let p = 1; p < totalPages; p++) {
          const divider = document.createElement('div');
          divider.className = 'cv-page-break-divider no-print';
          divider.style.top = `${297 * p}mm`;
          divider.innerHTML = `
            <div class="cv-page-break-line"></div>
            <div class="cv-page-break-pill">
              <i class="fa-solid fa-scissors"></i>
              <span class="break-tag">Vạch Ngắt Trang A4</span>
              <span>Hết Trang ${p} ➔ Bắt Đầu Trang ${p + 1} (297mm)</span>
            </div>
          `;
          sheet.appendChild(divider);
        }
      }
    } else {
      // Requirement 2: In horizontal mode, render pages side-by-side
      if (totalPages > 1) {
        sheet.style.display = 'none'; // sheet remains in DOM for print / pdf export
        const row = document.createElement('div');
        row.className = 'horizontal-pages-row no-print';

        for (let p = 1; p < totalPages + 1; p++) {
          const card = document.createElement('div');
          card.className = 'horizontal-page-card';
          card.innerHTML = `
            <div class="horizontal-page-header-badge">
              <i class="fa-solid fa-file-lines" style="color:var(--primary);"></i> TRANG ${p} / ${totalPages}
            </div>
            <div class="horizontal-page-inner-viewport">
              <div class="horizontal-page-clone" style="position:absolute; top:-${(p - 1) * 297}mm; left:0; width:210mm;">
                ${sheet.outerHTML.replace('id="cv-printable-area"', `id="cv-printable-page-${p}" style="display:block;"`)}
              </div>
            </div>
          `;
          row.appendChild(card);
        }
        previewWrapper.appendChild(row);
      } else {
        sheet.style.display = '';
      }
    }
  }

  /**
   * Live A4 Page Fill Gauge & Auto-Fit 1 Page Magic Button (Gợi ý 2)
   */
  function updateA4PageGauge() {
    const sheet = document.getElementById('cv-printable-area');
    const fillText = document.getElementById('a4-fill-text');
    const badge = document.getElementById('a4-status-badge');
    if (!sheet || !fillText || !badge) return;

    renderPageBreakDividersAndHorizontal();

    const standardA4Height = 1122.52;
    const scrollH = sheet.scrollHeight;
    const percent = Math.round((scrollH / standardA4Height) * 100);
    const totalPages = Math.ceil(scrollH / standardA4Height);

    if (totalPages <= 1) {
      fillText.innerText = `${percent}% A4`;
      badge.className = 'a4-badge badge-green';
      badge.innerText = 'Chuẩn 1 trang';
    } else if (percent <= 108) {
      fillText.innerText = `${percent}% A4`;
      badge.className = 'a4-badge badge-yellow';
      badge.innerText = `Tràn nhẹ (${percent}%)`;
    } else {
      fillText.innerText = `${percent}% A4`;
      badge.className = 'a4-badge badge-red';
      badge.innerText = `Trang 1/${totalPages}`;
    }
  }

  function autoFitA4() {
    const sheet = document.getElementById('cv-printable-area');
    if (!sheet) return;

    const standardA4Height = 1122.5;
    const initialH = sheet.scrollHeight;

    if (initialH <= standardA4Height && customDesignConfig.fontScale === 100 && customDesignConfig.sectionSpacing === 'standard') {
      showToast('CV của bạn đã vừa vặn chuẩn 1 trang A4 rồi!', 'fa-solid fa-circle-check');
      return;
    }

    // Step 1: Switch spacing to compact
    customDesignConfig.sectionSpacing = 'compact';
    sheet.classList.remove('spacing-standard', 'spacing-spacious');
    sheet.classList.add('spacing-compact');

    // Step 2: Calibrate fontScale incrementally until fits or reaches 85%
    let scale = 100;
    while (scale > 85) {
      sheet.style.setProperty('--cv-font-scale', `${scale / 100}`);
      if (sheet.scrollHeight <= standardA4Height + 10) {
        break;
      }
      scale -= 2;
    }

    customDesignConfig.fontScale = scale;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
    showToast(`⚡ Đã tự động căn vừa 1 trang A4 (Giãn cách: Gọn, Cỡ chữ: ${scale}%)!`, 'fa-solid fa-bolt');
  }

  /**
   * Customizer Slide-Over Drawer Controls (Gợi ý 3)
   */
  function toggleCustomizerDrawer() {
    const drawer = document.getElementById('customizer-drawer');
    if (drawer) {
      drawer.classList.toggle('active');
    }
  }

  function syncCustomizerDrawerInputs() {
    // Font presets
    document.querySelectorAll('.font-card').forEach(card => {
      card.classList.toggle('active', card.dataset.font === customDesignConfig.fontPreset);
    });

    // Font scale slider
    const slider = document.getElementById('font-scale-slider');
    const scaleNum = document.getElementById('font-scale-num');
    if (slider) slider.value = customDesignConfig.fontScale || 100;
    if (scaleNum) scaleNum.innerText = `${customDesignConfig.fontScale || 100}%`;

    // Spacing chips
    document.querySelectorAll('.customizer-chip[data-spacing]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.spacing === customDesignConfig.sectionSpacing);
    });

    // Divider chips
    document.querySelectorAll('.customizer-chip[data-divider]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.divider === customDesignConfig.dividerStyle);
    });

    // Avatar shape chips
    document.querySelectorAll('.customizer-chip[data-avatar-shape]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.avatarShape === customDesignConfig.avatarShape);
    });

    // Avatar border chips
    document.querySelectorAll('.customizer-chip[data-avatar-border]').forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.avatarBorder, 10) === customDesignConfig.avatarBorder);
    });

    // Avatar shadow chips
    document.querySelectorAll('.customizer-chip[data-avatar-shadow]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.avatarShadow === customDesignConfig.avatarShadow);
    });
  }

  function setTypographyPreset(preset) {
    customDesignConfig.fontPreset = preset;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function setFontScale(scale) {
    customDesignConfig.fontScale = parseInt(scale, 10) || 100;
    const scaleNum = document.getElementById('font-scale-num');
    if (scaleNum) scaleNum.innerText = `${customDesignConfig.fontScale}%`;
    const printableArea = document.getElementById('cv-printable-area');
    if (printableArea) {
      printableArea.style.setProperty('--cv-font-scale', `${customDesignConfig.fontScale / 100}`);
    }
    updateA4PageGauge();
    triggerAutoSave();
  }

  function setSectionSpacing(spacing) {
    customDesignConfig.sectionSpacing = spacing;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function setDividerStyle(divider) {
    customDesignConfig.dividerStyle = divider;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function setAvatarShape(shape) {
    customDesignConfig.avatarShape = shape;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function setAvatarBorder(width) {
    customDesignConfig.avatarBorder = parseInt(width, 10);
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function cycleAvatarBorder() {
    const borders = [0, 2, 4];
    const cur = customDesignConfig.avatarBorder !== undefined ? customDesignConfig.avatarBorder : 2;
    const idx = borders.indexOf(cur);
    const next = borders[(idx + 1) % borders.length];
    setAvatarBorder(next);
  }

  function setAvatarShadow(shadow) {
    customDesignConfig.avatarShadow = shadow;
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
  }

  function resetCustomDesign() {
    customDesignConfig = Object.assign({}, CV_STORAGE.DEFAULT_DESIGN_CONFIG);
    syncCustomizerDrawerInputs();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
    showToast('Đã đặt lại kiểu dáng thiết kế về mặc định!', 'fa-solid fa-arrow-rotate-left');
  }

  /**
   * Save My Custom Templates (Lưu & Quản Lý Mẫu Của Tôi)
   */
  function openSaveCustomTemplateModal() {
    const modal = document.getElementById('save-custom-template-modal');
    const input = document.getElementById('input-custom-template-name');
    if (modal) modal.classList.add('active');
    if (input) {
      input.value = activeTemplate ? `${activeTemplate.name.split('-')[0].trim()} (Bản Riêng)` : 'Mẫu CV Của Tôi';
      input.focus();
    }
  }

  function closeSaveCustomTemplateModal() {
    const modal = document.getElementById('save-custom-template-modal');
    if (modal) modal.classList.remove('active');
  }

  function saveCurrentAsCustomTemplate() {
    const nameInput = document.getElementById('input-custom-template-name');
    const descInput = document.getElementById('input-custom-template-desc');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      showToast('Vui lòng nhập tên cho mẫu CV riêng của bạn!', 'fa-solid fa-triangle-exclamation');
      return;
    }

    const newTpl = {
      id: 'custom-' + Date.now(),
      name: name,
      styleId: activeTemplate ? activeTemplate.styleId : 'modern-left-col',
      styleName: 'Mẫu Tự Tùy Chỉnh',
      category: 'custom',
      industry: 'Tùy Chỉnh Riêng',
      badge: 'Cá Nhân',
      desc: descInput ? descInput.value.trim() || 'Mẫu CV do bạn tự tinh chỉnh' : 'Mẫu CV do bạn tự tinh chỉnh',
      colors: {
        primary: activeThemeColor,
        secondary: '#1e293b'
      },
      customDesignConfig: Object.assign({}, customDesignConfig)
    };

    customTemplates.unshift(newTpl);
    CV_TEMPLATES_CATALOG.registerCustomTemplate(newTpl);
    CV_STORAGE.saveCustomTemplates(customTemplates);
    activeTemplate = newTpl;

    closeSaveCustomTemplateModal();
    renderQuickTemplatesSidebar();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
    showToast(`⭐ Đã lưu thành công "${name}" vào Mẫu Của Tôi!`, 'fa-solid fa-star');
  }

  function deleteCustomTemplate(tplId) {
    if (!confirm('Bạn có chắc chắn muốn xóa mẫu tùy biến này khỏi danh sách?')) return;
    customTemplates = customTemplates.filter(t => t.id !== tplId);
    CV_TEMPLATES_CATALOG.removeCustomTemplate(tplId);
    CV_STORAGE.saveCustomTemplates(customTemplates);
    if (activeTemplate && activeTemplate.id === tplId) {
      activeTemplate = CV_TEMPLATES_CATALOG.getDefaultTemplate();
      applyTemplateStyles(activeTemplate);
    }
    renderQuickTemplatesSidebar();
    renderCVPreview();
    pushHistoryState();
    triggerAutoSave();
    showToast('Đã xóa mẫu tùy biến thành công!', 'fa-solid fa-trash-can');
  }

  /* Autosave & Toast Engine */
  let autoSaveTimer = null;
  function triggerAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
      CV_STORAGE.saveToLocalStorage(profile, activeTemplate ? activeTemplate.id : 'tpl-001', ratingMode, sectionsConfig, activeThemeColor, customDesignConfig);
    }, 400);
  }

  function setupAutoSave() {
    // Initial sync
    triggerAutoSave();
  }

  function showToast(message, iconClass) {
    const container = document.getElementById('app-toast-container');
    if (!container) return;

    // Keep at most 2 toasts simultaneously
    while (container.children.length > 1) {
      container.removeChild(container.firstChild);
    }

    const toast = document.createElement('div');
    toast.className = 'app-toast';

    let iconWrapClass = 'info';
    if (iconClass && (iconClass.includes('fa-bolt') || iconClass.includes('fa-star') || iconClass.includes('fa-wand'))) {
      iconWrapClass = 'accent';
    } else if (iconClass && (iconClass.includes('fa-check') || iconClass.includes('fa-floppy-disk'))) {
      iconWrapClass = 'success';
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap ${iconWrapClass}">
        <i class="${iconClass || 'fa-solid fa-circle-check'}"></i>
      </div>
      <div class="toast-msg-wrap">
        <span>${escapeHtml(message)}</span>
      </div>
      <button type="button" class="toast-close-btn" onclick="this.closest('.app-toast').remove()" title="Đóng">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 320);
    }, 3400);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Public API
  return {
    init,
    renderCVPreview,
    setRatingMode,
    setPrimaryThemeColor,
    setCustomThemeColor,
    loadIndustryProfile,
    renderTemplatesCatalogModal,
    setModalFilter,
    applySelectedTemplate,
    renderQuickTemplatesSidebar,
    filterQuickTemplates,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addHardSkill,
    updateHardSkill,
    removeHardSkill,
    toggleSoftSkillPill,
    toggleStrengthPill,
    toggleHobbyPill,
    addProject,
    updateProject,
    removeProject,
    addCert,
    updateCert,
    removeCert,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addReference,
    updateReference,
    removeReference,
    toggleSectionVisibility,
    // Pro Customizer, Direct Edit, History & My Templates API
    undo,
    redo,
    toggleDirectEditMode,
    showFloatingInspectorForAvatar,
    showFloatingInspectorForTitle,
    hideFloatingInspector,
    handleFloatingAvatarUpload,
    updateA4PageGauge,
    autoFitA4,
    toggleCustomizerDrawer,
    syncCustomizerDrawerInputs,
    setTypographyPreset,
    setFontScale,
    setSectionSpacing,
    setDividerStyle,
    setAvatarShape,
    setAvatarBorder,
    cycleAvatarBorder,
    setAvatarShadow,
    resetCustomDesign,
    openSaveCustomTemplateModal,
    closeSaveCustomTemplateModal,
    saveCurrentAsCustomTemplate,
    deleteCustomTemplate,
    // Collapsible Sidebars, Zen Mode & Multi-Page Layout API
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleZenMode,
    togglePageLayoutMode
  };
})();

// Auto-run on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  CVApp.init();
});
