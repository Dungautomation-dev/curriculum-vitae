/**
 * Curriculum Vitae (CV Creator) - Core Application Controller
 * Xử lý dữ liệu động, liên kết Form & Preview A4, 100 Template Switcher, Xuất / Nạp .dungauto
 * Author: Dung Automation
 */

const CVApp = (function () {
  // Global State
  let profile = null;
  let activeTemplate = null;
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
    'Kỹ năng viết báo cáo kỹ thuật chuyên nghiệp'
  ];

  const QUICK_STRENGTHS = [
    'Tỉ mỉ, cẩn trọng tuyệt đối với an toàn điện',
    'Khả năng đọc hiểu tài liệu tiếng Anh chuyên ngành',
    'Chịu được áp lực tiến độ cao & bám sát hiện trường',
    'Chủ động cập nhật công nghệ mới & ham học hỏi',
    'Tinh thần trách nhiệm và tính kỷ luật cao',
    'Tư duy logic và khả năng phân tích hệ thống tốt'
  ];

  const QUICK_HOBBIES = [
    'Nghiên cứu mạch vi điều khiển IoT & Smart Home',
    'Đọc tạp chí Kỹ thuật Tự động hóa & Năng lượng mới',
    'Chơi cờ vua rèn luyện tư duy chiến thuật',
    'Chạy bộ marathon rèn luyện sức bền',
    'Chụp ảnh phong cảnh & du lịch khám phá',
    'Đóng góp cho cộng đồng kỹ thuật mã nguồn mở'
  ];

  /**
   * Initialize Application
   */
  function init() {
    loadInitialState();
    applyTemplateStyles(activeTemplate);
    renderFormInputs();
    renderCVPreview();
    setupEventListeners();
    setupAutoSave();
    showToast('⚡ Đã sẵn sàng! Mặc định hiển thị CV Kỹ sư Điện.', 'fa-solid fa-bolt');
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
    } else {
      profile = CV_SAMPLE_PROFILES.getDefaultProfile();
      activeTemplate = CV_TEMPLATES_CATALOG.getDefaultTemplate();
      ratingMode = profile.skillRatingMode || 'percentage';
      sectionsConfig = Object.assign({}, CV_STORAGE.DEFAULT_SECTIONS_CONFIG);
    }
  }

  /**
   * Apply CSS Variables for the Active Template
   */
  function applyTemplateStyles(tpl) {
    if (!tpl) return;
    const root = document.documentElement;
    root.style.setProperty('--cv-primary', tpl.colors.primary);
    root.style.setProperty('--cv-secondary', tpl.colors.secondary);
    root.style.setProperty('--cv-text-dark', tpl.colors.textDark);
    root.style.setProperty('--cv-bg-soft', tpl.colors.bgSoft);

    // Update active template button in header
    const activePill = document.getElementById('active-template-name');
    if (activePill) {
      activePill.innerHTML = `<i class="fa-solid fa-palette" style="color:${tpl.colors.secondary};"></i> <strong>${tpl.id.toUpperCase()}</strong>: ${tpl.name}`;
    }
  }

  /**
   * Render All Inputs into the Editor Sidebar
   */
  function renderFormInputs() {
    // 1. Personal Info
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

    // 2. Summary
    setVal('input-summary', profile.summary || '');

    // 3. Repeatables
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

    // 4. Section Visibility Toggles
    renderSectionsVisibilityToggles();
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  /* ==========================================================================
     REPEATABLE ITEMS FORM RENDERERS
     ========================================================================== */
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
          <label class="form-label">Xếp loại / Điểm số</label>
          <input type="text" class="form-input" value="${escapeHtml(edu.score)}" oninput="CVApp.updateEducation('${edu.id}', 'score', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Mô tả / Đồ án</label>
          <textarea class="form-textarea" rows="2" oninput="CVApp.updateEducation('${edu.id}', 'description', this.value)">${escapeHtml(edu.description)}</textarea>
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
          <label class="form-label">Vị trí / Chức vụ</label>
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
          <label class="form-label">Mô tả công việc & Thành tích</label>
          <textarea class="form-textarea" rows="3" oninput="CVApp.updateExperience('${exp.id}', 'description', this.value)">${escapeHtml(exp.description)}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderHardSkillsInputs() {
    const container = document.getElementById('hardskills-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.hardSkills || []).map((hs, idx) => `
      <div class="repeatable-item-card" style="padding:10px;" data-id="${hs.id}">
        <div class="form-row-2" style="align-items:center;">
          <input type="text" class="form-input" value="${escapeHtml(hs.name)}" placeholder="Tên kỹ năng chuyên môn..." oninput="CVApp.updateHardSkill('${hs.id}', 'name', this.value)">
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="range" min="10" max="100" step="5" value="${hs.rating || 80}" style="flex:1;" oninput="CVApp.updateHardSkill('${hs.id}', 'rating', this.value); this.nextElementSibling.textContent=this.value+'%';">
            <span style="font-size:0.75rem; font-weight:700; width:34px;">${hs.rating || 80}%</span>
            <button type="button" class="btn-remove-item" onclick="CVApp.removeHardSkill('${hs.id}')"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderSoftSkillsCheckboxes() {
    const container = document.getElementById('softskills-quick-select');
    if (!container) return;
    const currentList = (profile.softSkills || []).map(s => s.name);
    container.innerHTML = QUICK_SOFT_SKILLS.map(item => {
      const isChecked = currentList.includes(item);
      return `
        <label class="checkbox-pill-label ${isChecked ? 'checked' : ''}">
          <input type="checkbox" value="${escapeHtml(item)}" ${isChecked ? 'checked' : ''} onchange="CVApp.toggleSoftSkill('${escapeHtml(item)}', this.checked)">
          <span>${item}</span>
        </label>
      `;
    }).join('');
  }

  function renderStrengthsCheckboxes() {
    const container = document.getElementById('strengths-quick-select');
    if (!container) return;
    const currentList = (profile.strengths || []).map(s => s.name);
    container.innerHTML = QUICK_STRENGTHS.map(item => {
      const isChecked = currentList.includes(item);
      return `
        <label class="checkbox-pill-label ${isChecked ? 'checked' : ''}">
          <input type="checkbox" value="${escapeHtml(item)}" ${isChecked ? 'checked' : ''} onchange="CVApp.toggleStrength('${escapeHtml(item)}', this.checked)">
          <span>${item}</span>
        </label>
      `;
    }).join('');
  }

  function renderHobbiesCheckboxes() {
    const container = document.getElementById('hobbies-quick-select');
    if (!container) return;
    const currentList = (profile.hobbies || []).map(h => h.name);
    container.innerHTML = QUICK_HOBBIES.map(item => {
      const isChecked = currentList.includes(item);
      return `
        <label class="checkbox-pill-label ${isChecked ? 'checked' : ''}">
          <input type="checkbox" value="${escapeHtml(item)}" ${isChecked ? 'checked' : ''} onchange="CVApp.toggleHobby('${escapeHtml(item)}', this.checked)">
          <span>${item}</span>
        </label>
      `;
    }).join('');
  }

  function renderCertificatesInputs() {
    const container = document.getElementById('certs-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.certifications || []).map((c, idx) => `
      <div class="repeatable-item-card" data-id="${c.id}">
        <div class="repeatable-card-header">
          <span class="repeatable-card-index"><i class="fa-solid fa-certificate"></i> Chứng chỉ #${idx + 1}</span>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeCert('${c.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="form-group">
          <input type="text" class="form-input" placeholder="Tên chứng chỉ..." value="${escapeHtml(c.name)}" oninput="CVApp.updateCert('${c.id}', 'name', this.value)">
        </div>
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Tổ chức cấp..." value="${escapeHtml(c.issuer)}" oninput="CVApp.updateCert('${c.id}', 'issuer', this.value)">
          <input type="text" class="form-input" placeholder="Năm cấp..." value="${escapeHtml(c.year)}" oninput="CVApp.updateCert('${c.id}', 'year', this.value)">
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
          <input type="text" class="form-input" placeholder="Tên dự án..." value="${escapeHtml(p.name)}" oninput="CVApp.updateProject('${p.id}', 'name', this.value)">
        </div>
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Vai trò..." value="${escapeHtml(p.role)}" oninput="CVApp.updateProject('${p.id}', 'role', this.value)">
          <input type="text" class="form-input" placeholder="Thời gian..." value="${escapeHtml(p.period)}" oninput="CVApp.updateProject('${p.id}', 'period', this.value)">
        </div>
        <div class="form-group">
          <input type="text" class="form-input" placeholder="Công nghệ / Tiêu chuẩn áp dụng..." value="${escapeHtml(p.tech)}" oninput="CVApp.updateProject('${p.id}', 'tech', this.value)">
        </div>
        <div class="form-group">
          <textarea class="form-textarea" rows="2" placeholder="Mô tả kết quả đạt được..." oninput="CVApp.updateProject('${p.id}', 'description', this.value)">${escapeHtml(p.description)}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderLanguagesInputs() {
    const container = document.getElementById('languages-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.languages || []).map((l, idx) => `
      <div class="repeatable-item-card" style="padding:10px;" data-id="${l.id}">
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Ngôn ngữ (VD: Tiếng Anh)" value="${escapeHtml(l.name)}" oninput="CVApp.updateLanguage('${l.id}', 'name', this.value)">
          <div style="display:flex; gap:6px;">
            <input type="text" class="form-input" placeholder="Trình độ (VD: Thành thạo)" value="${escapeHtml(l.level)}" oninput="CVApp.updateLanguage('${l.id}', 'level', this.value)">
            <button type="button" class="btn-remove-item" onclick="CVApp.removeLanguage('${l.id}')"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderReferencesInputs() {
    const container = document.getElementById('references-list-inputs');
    if (!container) return;
    container.innerHTML = (profile.references || []).map((r, idx) => `
      <div class="repeatable-item-card" data-id="${r.id}">
        <div class="repeatable-card-header">
          <span class="repeatable-card-index"><i class="fa-solid fa-user-check"></i> Người tham chiếu #${idx + 1}</span>
          <button type="button" class="btn-remove-item" onclick="CVApp.removeReference('${r.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="form-row-2">
          <input type="text" class="form-input" placeholder="Họ và tên..." value="${escapeHtml(r.name)}" oninput="CVApp.updateReference('${r.id}', 'name', this.value)">
          <input type="text" class="form-input" placeholder="Chức vụ, cơ quan..." value="${escapeHtml(r.title)}" oninput="CVApp.updateReference('${r.id}', 'title', this.value)">
        </div>
        <div class="form-group">
          <input type="text" class="form-input" placeholder="Thông tin liên hệ (Email, SĐT)..." value="${escapeHtml(r.contact)}" oninput="CVApp.updateReference('${r.id}', 'contact', this.value)">
        </div>
      </div>
    `).join('');
  }

  function renderSectionsVisibilityToggles() {
    const container = document.getElementById('sections-visibility-toggles');
    if (!container) return;
    const sectionsMeta = [
      { key: 'summary', name: 'Mục tiêu / Giới thiệu' },
      { key: 'education', name: 'Trình độ học vấn' },
      { key: 'experience', name: 'Kinh nghiệm làm việc' },
      { key: 'hardSkills', name: 'Kỹ năng chuyên môn' },
      { key: 'softSkills', name: 'Kỹ năng mềm' },
      { key: 'strengths', name: 'Ưu điểm & Thế mạnh' },
      { key: 'hobbies', name: 'Sở thích' },
      { key: 'certifications', name: 'Chứng chỉ' },
      { key: 'projects', name: 'Dự án tiêu biểu' },
      { key: 'awards', name: 'Giải thưởng' },
      { key: 'languages', name: 'Ngoại ngữ' },
      { key: 'references', name: 'Người tham chiếu' }
    ];

    container.innerHTML = sectionsMeta.map(sec => `
      <label class="checkbox-pill-label ${sectionsConfig[sec.key] !== false ? 'checked' : ''}">
        <input type="checkbox" ${sectionsConfig[sec.key] !== false ? 'checked' : ''} onchange="CVApp.toggleSectionVisibility('${sec.key}', this.checked)">
        <span>${sec.name}</span>
      </label>
    `).join('');
  }

  /* ==========================================================================
     A4 LIVE PREVIEW RENDERING ENGINE
     ========================================================================== */
  function renderCVPreview() {
    const previewWrapper = document.getElementById('cv-a4-render-target');
    if (!previewWrapper) return;

    const p = profile.personalInfo || {};
    const tpl = activeTemplate || CV_TEMPLATES_CATALOG.getDefaultTemplate();
    const styleClass = `layout-${tpl.styleId}`;

    // Render Skill Rating Indicator according to active rating mode
    const renderSkillRating = (rating, stars) => {
      const val = parseInt(rating, 10) || 80;
      if (ratingMode === 'stars') {
        const starCount = Math.min(5, Math.max(1, Math.round(val / 20)));
        let starHtml = '';
        for (let i = 1; i <= 5; i++) {
          starHtml += `<i class="fa-solid fa-star ${i <= starCount ? '' : 'star-empty'}"></i>`;
        }
        return `<div class="skill-stars-meter">${starHtml}</div>`;
      } else if (ratingMode === 'dots') {
        const dotCount = Math.min(5, Math.max(1, Math.round(val / 20)));
        let dotHtml = '';
        for (let i = 1; i <= 5; i++) {
          dotHtml += `<span class="skill-dot-node ${i <= dotCount ? 'active' : ''}"></span>`;
        }
        return `<div class="skill-dots-meter">${dotHtml}</div>`;
      } else {
        // Percentage bar mode
        return `
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: ${val}%;"></div>
          </div>
        `;
      }
    };

    // Sub-components
    const contactHtml = `
      <div class="cv-contact-list">
        ${p.phone ? `<div class="cv-contact-item"><i class="fa-solid fa-phone"></i> <span>${escapeHtml(p.phone)}</span></div>` : ''}
        ${p.email ? `<div class="cv-contact-item"><i class="fa-solid fa-envelope"></i> <span>${escapeHtml(p.email)}</span></div>` : ''}
        ${p.address ? `<div class="cv-contact-item"><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(p.address)}</span></div>` : ''}
        ${p.dateOfBirth ? `<div class="cv-contact-item"><i class="fa-solid fa-cake-candles"></i> <span>${escapeHtml(p.dateOfBirth)}</span></div>` : ''}
        ${p.website ? `<div class="cv-contact-item"><i class="fa-solid fa-globe"></i> <span>${escapeHtml(p.website.replace('https://', ''))}</span></div>` : ''}
        ${p.driverLicense ? `<div class="cv-contact-item"><i class="fa-solid fa-id-card"></i> <span>${escapeHtml(p.driverLicense)}</span></div>` : ''}
      </div>
    `;

    const hardSkillsHtml = (sectionsConfig.hardSkills !== false && (profile.hardSkills || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-screwdriver-wrench"></i> Kỹ Năng Chuyên Môn</h3>
        <div class="skills-list-container">
          ${profile.hardSkills.map(s => `
            <div class="skill-item-row">
              <div class="skill-info-meta">
                <span>${escapeHtml(s.name)}</span>
                ${ratingMode === 'percentage' ? `<span style="font-size:0.75rem; color:var(--cv-secondary);">${s.rating || 80}%</span>` : ''}
              </div>
              ${renderSkillRating(s.rating, s.stars)}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const softSkillsHtml = (sectionsConfig.softSkills !== false && (profile.softSkills || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-lightbulb"></i> Kỹ Năng Mềm</h3>
        <div class="cv-tags-cloud">
          ${profile.softSkills.map(s => `<span class="cv-tag-chip">${escapeHtml(s.name)}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const strengthsHtml = (sectionsConfig.strengths !== false && (profile.strengths || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-star"></i> Ưu Điểm Nổi Bật</h3>
        <div class="cv-tags-cloud">
          ${profile.strengths.map(s => `<span class="cv-tag-chip">${escapeHtml(s.name)}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const hobbiesHtml = (sectionsConfig.hobbies !== false && (profile.hobbies || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-heart"></i> Sở Thích</h3>
        <div class="cv-tags-cloud">
          ${profile.hobbies.map(h => `<span class="cv-tag-chip">${escapeHtml(h.name)}</span>`).join('')}
        </div>
      </div>
    ` : '';

    const languagesHtml = (sectionsConfig.languages !== false && (profile.languages || []).length > 0) ? `
      <div class="cv-section">
        <h3 class="cv-section-title"><i class="fa-solid fa-language"></i> Ngôn Ngữ</h3>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${profile.languages.map(l => `
            <div style="font-size:0.8rem; display:flex; justify-content:space-between;">
              <strong>${escapeHtml(l.name)}</strong>
              <span style="color:var(--cv-text-muted);">${escapeHtml(l.level)}</span>
            </div>
          `).join('')}
        </div>
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

    // Build Entire A4 Structure according to Layout Style
    if (tpl.styleId === 'classic-two-col') {
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-top-header">
            ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="Avatar" class="cv-avatar-img">` : ''}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${contactHtml}
            </div>
          </div>
          ${sectionsConfig.summary !== false && profile.summary ? `
            <div class="cv-summary-text">${escapeHtml(profile.summary)}</div>
          ` : ''}
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
              ${hobbiesHtml}
              ${languagesHtml}
              ${referencesHtml}
            </div>
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'right-sidebar') {
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-main">
            <div class="cv-header-block">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${sectionsConfig.summary !== false && profile.summary ? `
                <div class="cv-summary-text">${escapeHtml(profile.summary)}</div>
              ` : ''}
            </div>
            ${experienceHtml}
            ${educationHtml}
            ${projectsHtml}
            ${referencesHtml}
          </div>
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">
              ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="Avatar" class="cv-avatar-img">` : ''}
            </div>
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
          </div>
        </div>
      `;
    } else if (tpl.styleId === 'header-banner') {
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-banner-header">
            ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="Avatar" class="cv-avatar-img">` : ''}
            <div style="flex:1;">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              <div style="margin-top:8px;">${contactHtml}</div>
            </div>
          </div>
          <div class="cv-body-content">
            <div>
              ${sectionsConfig.summary !== false && profile.summary ? `
                <div class="cv-section">
                  <h3 class="cv-section-title"><i class="fa-solid fa-user"></i> Giới Thiệu</h3>
                  <div class="cv-summary-text">${escapeHtml(profile.summary)}</div>
                </div>
              ` : ''}
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
    } else {
      // Default: Modern Sidebar (and other variants with 2 main zones)
      previewWrapper.innerHTML = `
        <div class="cv-a4-sheet ${styleClass}" id="cv-printable-area">
          <div class="cv-sidebar">
            <div class="cv-avatar-wrap">
              ${p.avatarUrl ? `<img src="${p.avatarUrl}" alt="Avatar" class="cv-avatar-img">` : ''}
            </div>
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
            <div class="cv-header-block">
              <h1 class="cv-candidate-name">${escapeHtml(p.fullName)}</h1>
              <div class="cv-candidate-title">${escapeHtml(p.jobTitle)}</div>
              ${sectionsConfig.summary !== false && profile.summary ? `
                <div class="cv-summary-text">${escapeHtml(profile.summary)}</div>
              ` : ''}
            </div>
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

  /* ==========================================================================
     EVENT LISTENERS & INTERACTIVE ACTIONS
     ========================================================================== */
  function setupEventListeners() {
    // Accordion Toggle Handlers
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.closest('.accordion-section');
        section.classList.toggle('active');
      });
    });

    // Form inputs binding
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

    // Avatar Upload Handler
    const avatarInput = document.getElementById('input-avatar-file');
    if (avatarInput) {
      avatarInput.addEventListener('change', handleAvatarUpload);
    }

    // Zoom Controls
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomFit = document.getElementById('btn-zoom-fit');

    if (btnZoomIn) btnZoomIn.addEventListener('click', () => applyZoom(Math.min(1.4, currentZoom + 0.1)));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => applyZoom(Math.max(0.5, currentZoom - 0.1)));
    if (btnZoomFit) btnZoomFit.addEventListener('click', () => applyZoom(0.95));

    // Template Selector Modal Buttons
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
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      });
    }

    // Export .dungauto Button
    const btnExportDungAuto = document.getElementById('btn-export-dungauto');
    if (btnExportDungAuto) {
      btnExportDungAuto.addEventListener('click', () => {
        const res = CV_STORAGE.exportDungAutoFile(profile, activeTemplate.id, sectionsConfig, ratingMode);
        if (res.success) {
          showToast(`💾 Đã xuất tệp hồ sơ thành công: ${res.fileName}`, 'fa-solid fa-file-export');
        }
      });
    }

    // Import .dungauto Button & Input
    const fileImportInput = document.getElementById('file-import-dungauto');
    if (fileImportInput) {
      fileImportInput.addEventListener('change', handleDungAutoImport);
    }

    // Print & PDF Export Buttons
    const btnPrint = document.getElementById('btn-print-cv');
    const btnDownloadPDF = document.getElementById('btn-download-pdf');

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        CV_EXPORTER.printCV(profile.personalInfo.fullName, profile.personalInfo.jobTitle);
      });
    }

    if (btnDownloadPDF) {
      btnDownloadPDF.addEventListener('click', () => {
        showToast('⏳ Đang kết xuất tài liệu PDF chất lượng cao...', 'fa-solid fa-spinner fa-spin');
        CV_EXPORTER.downloadPDF('cv-printable-area', profile.personalInfo.fullName, (ok, msg) => {
          if (ok) showToast(`✅ ${msg}`, 'fa-solid fa-circle-check');
        });
      });
    }
  }

  function bindInput(id, callback) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        callback(e.target.value);
        triggerAutoSave();
      });
    }
  }

  function applyZoom(scale) {
    currentZoom = scale;
    const stage = document.getElementById('preview-zoom-stage');
    const zoomText = document.getElementById('zoom-percentage-text');
    if (stage) {
      stage.style.transform = `scale(${currentZoom})`;
    }
    if (zoomText) {
      zoomText.textContent = `${Math.round(currentZoom * 100)}%`;
    }
  }

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (evt) {
      const base64 = evt.target.result;
      profile.personalInfo.avatarUrl = base64;
      const display = document.getElementById('avatar-preview-display');
      if (display) display.src = base64;
      renderCVPreview();
      triggerAutoSave();
      showToast('📸 Đã cập nhật ảnh đại diện mới!', 'fa-solid fa-camera');
    };
    reader.readAsDataURL(file);
  }

  function handleDungAutoImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      const content = evt.target.result;
      const res = CV_STORAGE.parseDungAutoFile(content);
      if (res.success) {
        profile = res.data;
        if (res.templateId) {
          activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById(res.templateId) || activeTemplate;
          applyTemplateStyles(activeTemplate);
        }
        if (res.skillRatingMode) ratingMode = res.skillRatingMode;
        if (res.sectionsConfig) sectionsConfig = res.sectionsConfig;

        renderFormInputs();
        renderCVPreview();
        triggerAutoSave();
        showToast('🎉 Nạp hồ sơ .dungauto thành công!', 'fa-solid fa-circle-check');
      } else {
        alert(res.error);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  }

  /* ==========================================================================
     REPEATABLE ITEMS ACTIONS (ADD / UPDATE / REMOVE)
     ========================================================================== */
  function addEducation() {
    profile.education = profile.education || [];
    profile.education.push({
      id: 'edu-' + Date.now(),
      degree: 'Cử nhân / Kỹ sư...',
      school: 'Trường Đại học...',
      period: '2020 - 2024',
      score: 'Tốt nghiệp loại Khá/Giỏi',
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
      position: 'Vị trí công việc...',
      company: 'Tên công ty...',
      period: '2023 - Hiện tại',
      location: 'Hà Nội',
      description: '• Mô tả nhiệm vụ chính và thành tích đạt được...'
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
      name: 'Kỹ năng mới',
      rating: 85,
      stars: 4
    });
    renderHardSkillsInputs();
    renderCVPreview();
    triggerAutoSave();
  }

  function updateHardSkill(id, field, val) {
    const item = (profile.hardSkills || []).find(s => s.id === id);
    if (item) {
      item[field] = (field === 'rating') ? parseInt(val, 10) : val;
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

  function toggleSoftSkill(name, isChecked) {
    profile.softSkills = profile.softSkills || [];
    if (isChecked) {
      if (!profile.softSkills.some(s => s.name === name)) {
        profile.softSkills.push({ id: 'ss-' + Date.now(), name });
      }
    } else {
      profile.softSkills = profile.softSkills.filter(s => s.name !== name);
    }
    renderSoftSkillsCheckboxes();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleStrength(name, isChecked) {
    profile.strengths = profile.strengths || [];
    if (isChecked) {
      if (!profile.strengths.some(s => s.name === name)) {
        profile.strengths.push({ id: 'st-' + Date.now(), name });
      }
    } else {
      profile.strengths = profile.strengths.filter(s => s.name !== name);
    }
    renderStrengthsCheckboxes();
    renderCVPreview();
    triggerAutoSave();
  }

  function toggleHobby(name, isChecked) {
    profile.hobbies = profile.hobbies || [];
    if (isChecked) {
      if (!profile.hobbies.some(h => h.name === name)) {
        profile.hobbies.push({ id: 'hb-' + Date.now(), name });
      }
    } else {
      profile.hobbies = profile.hobbies.filter(h => h.name !== name);
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
      role: 'Kỹ sư phụ trách',
      period: '2024',
      tech: '',
      description: 'Mô tả ngắn gọn về kết quả của dự án...'
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

  /* ==========================================================================
     100 TEMPLATES MODAL RENDERER & SWITCHER
     ========================================================================== */
  let activeModalIndustryFilter = 'all';

  function renderTemplatesCatalogModal() {
    const tabsContainer = document.getElementById('modal-industry-tabs');
    const gridContainer = document.getElementById('modal-templates-grid');

    if (!tabsContainer || !gridContainer) return;

    // Render 10 Industry Filter Buttons
    tabsContainer.innerHTML = `
      <button type="button" class="industry-tab-btn ${activeModalIndustryFilter === 'all' ? 'active' : ''}" onclick="CVApp.filterTemplatesModal('all')">
        <i class="fa-solid fa-layer-group"></i> Tất Cả (100 Mẫu)
      </button>
      ${CV_TEMPLATES_CATALOG.INDUSTRIES.map(ind => `
        <button type="button" class="industry-tab-btn ${activeModalIndustryFilter === ind.id ? 'active' : ''}" onclick="CVApp.filterTemplatesModal('${ind.id}')">
          <i class="${ind.icon}"></i> ${ind.name.split('&')[0].trim()}
        </button>
      `).join('')}
    `;

    // Filter templates list
    let list = CV_TEMPLATES_CATALOG.TEMPLATES;
    if (activeModalIndustryFilter !== 'all') {
      list = list.filter(t => t.industryId === activeModalIndustryFilter);
    }

    // Search query filter
    const searchInput = document.getElementById('modal-template-search');
    if (searchInput && searchInput.value.trim()) {
      const q = searchInput.value.trim().toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
    }

    gridContainer.innerHTML = list.map(t => {
      const isSelected = (t.id === activeTemplate.id);
      return `
        <div class="template-card ${isSelected ? 'active' : ''}" onclick="CVApp.selectTemplate('${t.id}')">
          <span class="template-active-badge"><i class="fa-solid fa-check"></i> Đang Chọn</span>
          <div class="template-card-preview-thumb" style="--theme-thumb-primary:${t.colors.primary}; --theme-thumb-secondary:${t.colors.secondary};">
            <div class="mini-thumb-sidebar">
              <div class="mini-thumb-avatar"></div>
              <div class="mini-thumb-line" style="background:rgba(255,255,255,0.7);"></div>
              <div class="mini-thumb-line" style="background:rgba(255,255,255,0.5); width:70%;"></div>
            </div>
            <div class="mini-thumb-main">
              <div class="mini-thumb-line title"></div>
              <div class="mini-thumb-line sub"></div>
              <div class="mini-thumb-line" style="margin-top:6px;"></div>
              <div class="mini-thumb-line" style="width:80%;"></div>
              <div class="mini-thumb-line" style="width:90%;"></div>
            </div>
          </div>
          <div class="template-card-name">${escapeHtml(t.name)}</div>
          <div class="template-card-industry"><i class="fa-solid fa-briefcase"></i> ${t.industryName.split('&')[0].trim()}</div>
          <div class="template-card-colors">
            <span class="color-dot" style="background:${t.colors.primary};" title="Màu chính"></span>
            <span class="color-dot" style="background:${t.colors.secondary};" title="Màu nhấn"></span>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterTemplatesModal(industryId) {
    activeModalIndustryFilter = industryId;
    renderTemplatesCatalogModal();
  }

  function selectTemplate(tplId) {
    const tpl = CV_TEMPLATES_CATALOG.getTemplateById(tplId);
    if (!tpl) return;
    activeTemplate = tpl;
    applyTemplateStyles(activeTemplate);
    renderCVPreview();
    triggerAutoSave();

    // Close Modal
    const modalOverlay = document.getElementById('template-modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');

    showToast(`🎨 Đã áp dụng mẫu: ${tpl.name}!`, 'fa-solid fa-wand-magic-sparkles');
  }

  /* ==========================================================================
     AUTOSAVE & TOAST SYSTEM
     ========================================================================== */
  let autoSaveTimer = null;
  function triggerAutoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
      CV_STORAGE.saveToLocalStorage(profile, activeTemplate.id, sectionsConfig, ratingMode);
    }, 600);
  }

  function setupAutoSave() {
    setInterval(() => {
      CV_STORAGE.saveToLocalStorage(profile, activeTemplate.id, sectionsConfig, ratingMode);
    }, 30000); // Autosave every 30s
  }

  function showToast(message, icon = 'fa-solid fa-bell') {
    const container = document.getElementById('app-toast-container');
    if (!container) return;
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `<i class="${icon}"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(item);

    setTimeout(() => {
      item.classList.add('fade-out');
      setTimeout(() => item.remove(), 400);
    }, 3200);
  }

  function loadSampleProfile(type) {
    if (confirm('Bạn có chắc chắn muốn nạp dữ liệu mẫu mới? Các thông tin bạn đã chỉnh sửa sẽ được thay thế bằng hồ sơ mẫu chuẩn.')) {
      if (type === 'electrical') {
        profile = CV_SAMPLE_PROFILES.getDefaultProfile();
        activeTemplate = CV_TEMPLATES_CATALOG.getDefaultTemplate();
      } else if (type === 'it') {
        profile = CV_SAMPLE_PROFILES.getProfileByIndustry('it-software');
        activeTemplate = CV_TEMPLATES_CATALOG.getTemplateById('tpl-011');
      }
      applyTemplateStyles(activeTemplate);
      renderFormInputs();
      renderCVPreview();
      triggerAutoSave();
      showToast('⚡ Đã nạp thành công dữ liệu mẫu!', 'fa-solid fa-rotate-right');
    }
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

  return {
    init,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addHardSkill,
    updateHardSkill,
    removeHardSkill,
    toggleSoftSkill,
    toggleStrength,
    toggleHobby,
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
    setRatingMode,
    filterTemplatesModal,
    selectTemplate,
    renderTemplatesCatalogModal,
    loadSampleProfile
  };
})();

document.addEventListener('DOMContentLoaded', CVApp.init);
