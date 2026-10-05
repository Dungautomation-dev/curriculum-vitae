/**
 * Curriculum Vitae (CV Creator) - PDF & Print Export Manager
 * Quản lý xuất file PDF chuẩn vector A4 và in ấn tài liệu
 * Author: Dung Automation
 */

const CV_EXPORTER = (function () {
  /**
   * Native Browser Vector Print (Best quality for ATS, 100% crisp vector, selectable text)
   */
  function printCV(fullName, jobTitle) {
    const sheet = document.getElementById('cv-printable-area');
    const wasHidden = sheet && sheet.style.display === 'none';
    if (wasHidden) sheet.style.display = 'block';

    const oldTitle = document.title;
    const cleanName = (fullName || 'Ung_Vien').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    const cleanTitle = (jobTitle || 'CV').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    
    document.title = `CV_${cleanName}_${cleanTitle}`;

    // Small delay to ensure all DOM styles are painted
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = oldTitle;
        if (wasHidden && sheet) sheet.style.display = 'none';
      }, 1000);
    }, 200);
  }

  function printA4(fullName, jobTitle) {
    printCV(fullName, jobTitle);
  }

  /**
   * Direct 1-Click PDF Download via html2pdf library
   */
  function downloadPDF(elementIdOrName, fullName, callback) {
    let elementId = 'cv-printable-area';
    let actualName = fullName;

    // Support both downloadPDF(candidateName) and downloadPDF('cv-printable-area', candidateName)
    if (typeof elementIdOrName === 'string') {
      if (document.getElementById(elementIdOrName)) {
        elementId = elementIdOrName;
      } else {
        actualName = elementIdOrName;
      }
    }

    const element = document.getElementById(elementId);
    if (!element) {
      if (callback) callback(false, 'Không tìm thấy trang CV để xuất PDF.');
      return;
    }

    const wasHidden = element.style.display === 'none';
    if (wasHidden) element.style.display = 'block';

    const cleanName = (actualName || 'Ung_Vien').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    const fileName = `CV_${cleanName}.pdf`;

    // Check if html2pdf is available
    if (typeof html2pdf !== 'undefined') {
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        if (wasHidden) element.style.display = 'none';
        if (callback) callback(true, fileName);
      }).catch((err) => {
        console.warn('html2pdf error, fallback to print:', err);
        if (wasHidden) element.style.display = 'none';
        printCV(actualName);
        if (callback) callback(true, 'Đã mở hộp thoại in PDF trình duyệt');
      });
    } else {
      // Direct browser print fallback
      if (wasHidden) element.style.display = 'none';
      printCV(actualName);
      if (callback) callback(true, 'Đã mở hộp thoại in PDF');
    }
  }

  return {
    printCV,
    printA4,
    downloadPDF
  };
})();
