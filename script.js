// Hàm để cập nhật năm hiện tại vào phần Copyright
function updateCopyrightYear() {
  var currentYear = new Date().getFullYear();
  document.getElementById("copyright-year").textContent = currentYear;
}

// Gọi hàm khi trang được tải
window.onload = updateCopyrightYear;

// Chặn tổ hợp phím và tắt context menu
document.addEventListener("keydown", function (event) {
  // Chặn tổ hợp phím Ctrl + Shift + I (mở Developer Tools)
  if (event.ctrlKey && event.shiftKey && event.key === 'I') {
    event.preventDefault();
  }

  // Disable F12 (F12 key is 123)
  if (event.key === 'F12') {
    event.preventDefault();
  }

  // Disable Ctrl + Shift + J (mở Console)
  if (event.ctrlKey && event.shiftKey && event.key === 'J') {
    event.preventDefault();
  }
});

// Disable right-click context menu on the page
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

// Kiểm tra khi DevTools mở và đóng (chặn DevTools ở tất cả các vị trí)
(function() {
  let devToolsOpened = false;

  const devtoolsDetectInterval = setInterval(function() {
    // Kiểm tra nếu DevTools được mở bằng cách so sánh kích thước cửa sổ
    if (window.outerHeight - window.innerHeight > 100 || window.outerWidth - window.innerWidth > 100) {
      if (!devToolsOpened) {
        devToolsOpened = true;
        onDeveloperToolsOpened();
      }
    } else {
      // Nếu DevTools bị đóng
      if (devToolsOpened) {
        devToolsOpened = false;
        location.reload(); // Tự động reload lại trang khi DevTools đóng
      }
    }
  }, 1000);
})();

function onDeveloperToolsOpened() {
  // Hiển thị lời chúc khi DevTools mở
  document.body.innerHTML = '<h1 style="text-align: center; color: #FF6347;">Xin người dừng tay!<br> Đây chỉ là một trang web nhỏ xinh của Tài thui :( <br> Nhưng mà nếu đã lỡ mở DevTools lên rồi thì hãy check tab Console trước nhé</h1>';
  console.log('%cCuồi cùng, Tài xin chúc bạn một ngày tốt lành!', 'color: green; font-size: 24px; text-align: center;');
}

// Logs hidden from the console output
console.log("%cXin chào Xin chào! 👋", "color: #ff0000; font-size: 24px; font-weight: bold;");
console.log("%cNếu bạn muốn xem mã nguồn của trang web này, hãy gửi email cho Tài theo địa chỉ: %ciam@kaiz.vn", "color: #000000; font-size: 20px;", "color: blue; font-size: 20px; text-decoration: underline;");
console.log("%cNhưng mà thực sự là không cần thiết í, vì trang web này không có gì đặc biệt cả.", "color: #000000; font-size: 20px;");
