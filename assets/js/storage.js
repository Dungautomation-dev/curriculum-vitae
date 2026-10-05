/**
 * Curriculum Vitae (CV Creator) - Storage & .dungauto File Manager
 * Quản lý lưu trữ tự động LocalStorage và xuất / nạp file định dạng .dungauto
 * Author: Dung Automation
 */

const CV_STORAGE = (function () {
  const STORAGE_KEY = 'dungauto_cv_profile_data';
  const CONFIG_KEY = 'dungauto_cv_builder_config';
  const CUSTOM_TEMPLATES_KEY = 'dungauto_cv_custom_templates';

  // Default Sections Visibility Configuration
  const DEFAULT_SECTIONS_CONFIG = {
    summary: true,
    education: true,
    experience: true,
    hardSkills: true,
    softSkills: true,
    strengths: true,
    hobbies: true,
    certifications: true,
    projects: true,
    awards: true,
    languages: true,
    references: true
  };

  // Default Custom Design Configuration
  const DEFAULT_DESIGN_CONFIG = {
    fontPreset: 'inter', // 'inter' | 'vietnam' | 'merriweather' | 'space'
    fontScale: 100, // 85% to 115%
    sectionSpacing: 'standard', // 'compact' | 'standard' | 'spacious'
    dividerStyle: 'solid', // 'solid' | 'dashed' | 'double' | 'gradient' | 'none'
    avatarShape: 'round', // 'round' | 'rounded' | 'square'
    avatarBorder: 2, // 0 | 2 | 4
    avatarShadow: 'soft' // 'none' | 'soft' | 'bold'
  };

  /**
   * Save current profile data & custom design config to LocalStorage
   */
  function saveToLocalStorage(profileData, templateId, ratingMode, sectionsConfig, themeColor, customDesignConfig) {
    try {
      const payload = {
        app: 'DungAutomation_CV_Builder',
        version: '1.2.0',
        lastUpdated: new Date().toISOString(),
        templateId: templateId || 'tpl-001',
        skillRatingMode: ratingMode || 'percentage',
        sectionsConfig: sectionsConfig || DEFAULT_SECTIONS_CONFIG,
        themeColor: themeColor || '#1e40af',
        customDesignConfig: customDesignConfig || DEFAULT_DESIGN_CONFIG,
        data: profileData
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return true;
    } catch (err) {
      console.warn('LocalStorage save error:', err);
      return false;
    }
  }

  /**
   * Load profile data & custom design config from LocalStorage
   */
  function loadFromLocalStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.data) {
        return parsed;
      }
    } catch (err) {
      console.warn('LocalStorage load error:', err);
    }
    return null;
  }

  /**
   * Save Custom Templates list to LocalStorage
   */
  function saveCustomTemplates(templatesList) {
    try {
      localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(templatesList || []));
      return true;
    } catch (err) {
      console.warn('Failed to save custom templates:', err);
      return false;
    }
  }

  /**
   * Load Custom Templates list from LocalStorage
   */
  function loadCustomTemplates() {
    try {
      const raw = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn('Failed to load custom templates:', err);
      return [];
    }
  }

  /**
   * Export profile data as .dungauto file
   */
  function exportDungAutoFile(profileData, templateId, ratingMode, sectionsConfig, themeColor, customDesignConfig, customTemplates) {
    try {
      const fullNameClean = (profileData.personalInfo && profileData.personalInfo.fullName)
        ? profileData.personalInfo.fullName.trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_')
        : 'Ho_So_Ung_Vien';
      
      const fileName = `CV_${fullNameClean}.dungauto`;

      const exportPayload = {
        app: 'DungAutomation_CV_Builder',
        fileFormat: '.dungauto',
        version: '1.2.0',
        creator: 'Dung Automation',
        exportDate: new Date().toISOString(),
        templateId: templateId || 'tpl-001',
        skillRatingMode: ratingMode || 'percentage',
        sectionsConfig: sectionsConfig || DEFAULT_SECTIONS_CONFIG,
        themeColor: themeColor || '#1e40af',
        customDesignConfig: customDesignConfig || DEFAULT_DESIGN_CONFIG,
        customTemplates: customTemplates || [],
        data: profileData
      };

      const jsonStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/octet-stream;charset=utf-8' });
      
      // Trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);

      return { success: true, fileName };
    } catch (err) {
      console.error('Export .dungauto error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Parse and validate file content from .dungauto or .json
   */
  function parseDungAutoFile(fileContent) {
    try {
      const parsed = JSON.parse(fileContent);
      if (!parsed || !parsed.data) {
        throw new Error('Định dạng tệp không hợp lệ hoặc thiếu dữ liệu hồ sơ.');
      }
      return {
        success: true,
        data: parsed.data,
        templateId: parsed.templateId || 'tpl-001',
        skillRatingMode: parsed.skillRatingMode || 'percentage',
        sectionsConfig: parsed.sectionsConfig || DEFAULT_SECTIONS_CONFIG,
        themeColor: parsed.themeColor || null,
        customDesignConfig: parsed.customDesignConfig || DEFAULT_DESIGN_CONFIG,
        customTemplates: parsed.customTemplates || [],
        exportDate: parsed.exportDate || null
      };
    } catch (err) {
      return {
        success: false,
        error: 'Tệp .dungauto bị lỗi cú pháp hoặc không tương thích: ' + err.message
      };
    }
  }

  /**
   * Import file from input event
   */
  function importDungAutoFile(file, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const content = e.target.result;
      const result = parseDungAutoFile(content);
      if (result.success) {
        callback(result, null);
      } else {
        callback(null, result.error);
      }
    };
    reader.onerror = function () {
      callback(null, 'Không thể đọc nội dung tệp tin tải lên.');
    };
    reader.readAsText(file, 'utf-8');
  }

  /**
   * Clear LocalStorage and return default Electrical Engineer profile
   */
  function resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return CV_SAMPLE_PROFILES.getDefaultProfile();
    } catch (e) {
      return CV_SAMPLE_PROFILES.getDefaultProfile();
    }
  }

  return {
    DEFAULT_SECTIONS_CONFIG,
    DEFAULT_DESIGN_CONFIG,
    saveToLocalStorage,
    loadFromLocalStorage,
    saveCustomTemplates,
    loadCustomTemplates,
    exportDungAutoFile,
    parseDungAutoFile,
    importDungAutoFile,
    resetToDefault
  };
})();
