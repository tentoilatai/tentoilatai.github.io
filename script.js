// Hàm để cập nhật năm hiện tại vào phần Copyright
function updateCopyrightYear() {
  var currentYear = new Date().getFullYear();
  document.getElementById("copyright-year").textContent = currentYear;
}

// Gọi hàm khi trang được tải
window.onload = updateCopyrightYear;