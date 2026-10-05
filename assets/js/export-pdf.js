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
    const oldTitle = document.title;
    const cleanName = (fullName || 'Ung_Vien').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    const cleanTitle = (jobTitle || 'CV').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
    
    document.title = `CV_${cleanName}_${cleanTitle}`;

    // Small delay to ensure all DOM styles are painted
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.title = oldTitle;
      }, 1000);
    }, 200);
  }

  /**
   * Direct 1-Click PDF Download via html2pdf library
   */
  function downloadPDF(elementId, fullName, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
      if (callback) callback(false, 'Không tìm thấy trang CV để xuất PDF.');
      return;
    }

    const cleanName = (fullName || 'Ung_Vien').trim().replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_');
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
        if (callback) callback(true, fileName);
      }).catch((err) => {
        console.warn('html2pdf error, fallback to print:', err);
        printCV(fullName);
        if (callback) callback(true, 'Đã mở hộp thoại in PDF trình duyệt');
      });
    } else {
      // Direct browser print fallback
      printCV(fullName);
      if (callback) callback(true, 'Đã mở hộp thoại in PDF');
    }
  }

  return {
    printCV,
    downloadPDF
  };
})();
