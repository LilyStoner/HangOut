const image = document.getElementById("char");
let scale = 1; // Tỷ lệ ban đầu
let increasing = true; // Cờ để xác định phóng to hay thu nhỏ
let vscale = 0.001;
let check=0;

// Hàm hiệu ứng phóng to/thu nhỏ
function zoomImage() {
  if (increasing) {
    scale += vscale; // Phóng to
    if (scale >= 1.02) increasing = false; // Khi đạt mức tối đa, chuyển sang thu nhỏ
  } else {
    scale -= vscale; // Thu nhỏ
    if (scale <= 0.98) increasing = true; // Khi đạt mức tối thiểu, chuyển sang phóng to
  }

  // Áp dụng tỷ lệ phóng to/thu nhỏ
  image.style.transform = `scale(${scale})`;

  // Lặp lại hiệu ứng
  requestAnimationFrame(zoomImage);
}

// Nội dung dòng chữ
let textContents = ["Anh nhớ em quá😳", "Mình đi chơi thôi🥰"];
const textElement = document.getElementById("text");

let currentTextIndex = 0; // Chỉ số chuỗi hiện tại
let charIndex = 0; // Chỉ số ký tự

// Hiệu ứng từ từ xuất hiện từng ký tự
function typeEffect() {
  if (charIndex < textContents[currentTextIndex].length) {
    textElement.textContent += textContents[currentTextIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 150); // 150ms cho mỗi ký tự
  } else if (currentTextIndex < textContents.length - 1) {
    // Chờ trước khi chuyển sang chuỗi tiếp theo
    setTimeout(() => {
      textElement.textContent = "";
      charIndex = 0;
      currentTextIndex++;
      typeEffect();
    }, 3000); // 3 giây nghỉ trước khi hiển thị chuỗi tiếp theo
  } else {
    // Khi hoàn thành việc gõ chữ, hiển thị các nút
    if(check==0) showButtons();
  }
}

// Hiển thị các nút "Dạ" và "Không"
function showButtons() {
  const buttonsContainer = document.getElementById('buttons');
  buttonsContainer.style.display = 'flex'; // Hiển thị nút "Dạ" và "Không"
}

const noButton = document.getElementById('no-button');

const handleMoveAway = () => {
  noButton.style.visibility = "hidden"; // Ẩn nút cũ nếu có

  // Tạo nút mới nếu chưa tồn tại
  if (!document.getElementById('newButton')) {
    const newButton = document.createElement("button");
    newButton.id = "newButton";
    newButton.textContent = "Không";
    document.body.appendChild(newButton);

    // Đặt vị trí ban đầu của nút
    const rect = noButton.getBoundingClientRect();
    newButton.style.position = "absolute";
    newButton.style.left = `${rect.left}px`;
    newButton.style.top = `${rect.top}px`;
    newButton.style.zIndex = '100';
    newButton.style.transition = 'all 0.3s ease';
 

    // Gắn sự kiện di chuyển nút mới khi hover hoặc chạm
    const moveButton = () => {
      const randomX = Math.random() * (window.innerWidth - newButton.offsetWidth);
      const randomY = Math.random() * (window.innerHeight - newButton.offsetHeight);
      newButton.style.left = `${randomX}px`;
      newButton.style.top = `${randomY}px`;
    };

    // Gắn sự kiện hover hoặc touch
    newButton.addEventListener('mouseover', moveButton);
    newButton.addEventListener('touchstart', moveButton);
  }
};

// Gắn sự kiện cho nút gốc "Không"
noButton.addEventListener('mouseover', handleMoveAway);
noButton.addEventListener('touchstart', handleMoveAway);

const yesButton = document.getElementById('yes-button');

// Sự kiện khi nhấn nút "Dạ"
yesButton.addEventListener('click', () => {
    // Thay đổi nội dung của textElement khi nút "Dạ" được nhấn
    textContents = ["Bao giờ xong thì bảo anh nhé 🥰"]; // Cập nhật lại mảng nội dung mới
    check++;
    // Reset textElement và bắt đầu hiệu ứng gõ chữ lại từ đầu
    textElement.textContent = ""; // Xóa văn bản hiện tại
    charIndex = 0; // Đặt lại chỉ số ký tự về 0
    currentTextIndex = 0; // Đặt lại chỉ số chuỗi về 0
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.style.display = 'none'; 
    newButton.style.display = 'none';
    // Gọi lại hàm typeEffect để bắt đầu lại hiệu ứng
    typeEffect();
});

const backgroundMusic = document.getElementById("background-music");

// Bỏ muted khi người dùng tương tác
document.body.addEventListener('click', () => {
    backgroundMusic.muted = false; // Bỏ tắt tiếng
    backgroundMusic.volume = 0.5; // Đặt âm lượng
});


// Bắt đầu hiệu ứng gõ chữ
typeEffect();
zoomImage();
