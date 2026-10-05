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
    initThemeColorPicker();
    applyTemplateStyles(activeTemplate);
    renderFormInputs();
    renderCVPreview();
    renderQuickTemplatesSidebar();
    setupEventListeners();
    setupAutoSave();
    showToast('⚡ Đã sẵn sàng! Mặc định hiển thị CV Kỹ sư Điện.', 'fa-solid fa-bolt');
  }

  /**
   * Draggable Workspace Resizer Handle
   */
  function initWorkspaceResizer() {
    const resizer = document.getElementById('workspace-resizer');
    const sidebar = document.querySelector('.editor-sidebar');
    if (!resizer || !sidebar) return;

    // Restore saved width
    const savedWidth = localStorage.getItem('dungauto_cv_editor_width');
    if (savedWidth) {
      document.documentElement.style.setProperty('--editor-width', `${savedWidth}px`);
    } else {
      document.documentElement.style.setProperty('--editor-width', '530px');
    }

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
      // Clamp between 400px and 850px
      if (newWidth < 400) newWidth = 400;
      if (newWidth > 850) newWidth = 850;
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

    // Double-click to reset to default 530px
    resizer.addEventListener('dblclick', () => {
      document.documentElement.style.setProperty('--editor-width', '530px');
      localStorage.setItem('dungauto_cv_editor_width', '530px');
      showToast('Đã đặt lại độ rộng cột điền về 530px mặc định!', 'fa-solid fa-arrows-left-right');
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
    const saved = CV_STORAGE.loadFromLocalStorage();
    if (saved && saved.data) {
      profile = saved.data;
      activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById(saved.templateId) || CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = saved.skillRatingMode || 'percentage';
      sectionsConfig = saved.sectionsConfig || CV_STORAGE.DEFAULT_SECTIONS_CONFIG;
      if (saved.themeColor) {
        activeThemeColor = saved.themeColor;
      } else if (activeTemplate && activeTemplate.colors) {
        activeThemeColor = activeTemplate.colors.primary;
      }
    } else {
      profile = CV_SAMPLE_PROFILES.getDefaultProfile();
      activeTemplate = CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = profile.skillRatingMode || 'percentage';
      sectionsConfig = Object.assign({}, CV_STORAGE.DEFAULT_SECTIONS_CONFIG);
      activeThemeColor = activeTemplate.colors.primary;
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
      // 2. CỘT PHẢI TINH TẾ
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
          </div>
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${certificationsHtml}
            ${strengthsHtml}
            ${hobbiesHtml}
            ${languagesHtml}
            ${referencesHtml}
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'header-banner') {
      // 3. HEADER BANNER TOÀN CHIỀU RỘNG
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
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${certificationsHtml}
              ${strengthsHtml}
              ${hobbiesHtml}
              ${languagesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'minimal-clean') {
      // 4. TỐI GIẢN THỤY SĨ CHUẨN ATS
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
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${certificationsHtml}
              ${strengthsHtml}
              ${languagesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'timeline-focus') {
      // 5. TRỤC THỜI GIAN TRỰC QUAN
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
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${certificationsHtml}
              ${languagesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'bento-cards') {
      // 6. THẺ KHỐI BENTO HIỆN ĐẠI
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
              <div class="bento-card">${experienceHtml}</div>
              <div class="bento-card">${projectsHtml}</div>
            </div>
            <div>
              <div class="bento-card">${educationHtml}</div>
              <div class="bento-card">${hardSkillsHtml}</div>
              <div class="bento-card">${softSkillsHtml}${certificationsHtml}${languagesHtml}</div>
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'executive-bold') {
      // 7. ĐẲNG CẤP QUẢN LÝ & LÃNH ĐẠO (SERIF)
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
              </div>
              <div>
                ${educationHtml}
                ${hardSkillsHtml}
                ${certificationsHtml}
                ${languagesHtml}
                ${referencesHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'compact-3col') {
      // 8. 3 CỘT CÔ ĐỌNG THÔNG TIN
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
              ${languagesHtml}
            </div>
            <div>
              ${experienceHtml}
            </div>
            <div>
              ${hardSkillsHtml}
              ${projectsHtml}
              ${certificationsHtml}
              ${strengthsHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'editorial-magazine') {
      // 9. TẠP CHÍ SÁNG TẠO
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
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${certificationsHtml}
              ${strengthsHtml}
              ${hobbiesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'split-contrast') {
      // 10. CHIA ĐÔI TƯƠNG PHẢN 50/50 (SỬA DỨT ĐIỂM LỖI CHẠM MÉP)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="split-col-left">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${strengthsHtml}
            ${hobbiesHtml}
            ${languagesHtml}
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
            ${certificationsHtml}
            ${referencesHtml}
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'technical-grid') {
      // 11. BẢN VẼ KỸ THUẬT & HUY HIỆU
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
            </div>
            <div>
              ${educationHtml}
              ${hardSkillsHtml}
              ${softSkillsHtml}
              ${certificationsHtml}
              ${languagesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'framed-luxury') {
      // 12. KHUNG VIỀN SANG TRỌNG CỔ ĐIỂN
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
              </div>
              <div>
                ${educationHtml}
                ${hardSkillsHtml}
                ${certificationsHtml}
                ${strengthsHtml}
                ${languagesHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // 1. CỘT TRÁI HIỆN ĐẠI (DEFAULT: MODERN LEFT SIDEBAR)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">${avatarHtml}</div>
            <div class="cv-section">
              <h3 class="cv-section-title"><i class="fa-solid fa-address-book"></i> Liên Hệ</h3>
              ${contactHtml}
            </div>
            ${hardSkillsHtml}
            ${softSkillsHtml}
            ${strengthsHtml}
            ${hobbiesHtml}
            ${languagesHtml}
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
            ${certificationsHtml}
            ${referencesHtml}
          </div>
        </div>
      `;
    }

    applyZoom(currentZoom);
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
        CV_STORAGE.exportDungAutoFile(profile, activeTemplate ? activeTemplate.id : 'tpl-001', ratingMode, sectionsConfig, activeThemeColor);
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

    renderCVPreview();
    renderQuickTemplatesSidebar();
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

    container.innerHTML = list.map(tpl => {
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
  }

  /* Autosave & Toast Engine */
  let autoSaveTimer = null;
  function triggerAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
      CV_STORAGE.saveToLocalStorage(profile, activeTemplate ? activeTemplate.id : 'tpl-001', ratingMode, sectionsConfig, activeThemeColor);
    }, 400);
  }

  function setupAutoSave() {
    // Initial sync
    triggerAutoSave();
  }

  function showToast(message, iconClass) {
    const container = document.getElementById('app-toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.innerHTML = `
      <i class="${iconClass || 'fa-solid fa-circle-check'}"></i>
      <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
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
    toggleSectionVisibility
  };
})();

// Auto-run on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  CVApp.init();
});
