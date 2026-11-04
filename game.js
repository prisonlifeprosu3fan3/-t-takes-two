const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Oyuncular (Telefona uygun boyutlar)
const player1 = { x: 50, y: 300, size: 25, color: "#3498db", speed: 4 };
const player2 = { x: 50, y: 100, size: 25, color: "#e74c3c", speed: 4 };

// Mekanikler
const button = { x: 300, y: 320, width: 40, height: 10, pressed: false };
const gate = { x: 500, y: 50, width: 20, height: 120, open: false };
const finishLine = { x: 740, y: 100, width: 40, height: 200 };

// Dokunmatik Durumları
const movement = {
    p1: { up: false, down: false, left: false, right: false },
    p2: { up: false, down: false, left: false, right: false }
};

// Butonları Tanımla ve Dokunma Dinleyicilerini Ekle
function setupButton(id, player, dir) {
    const btn = document.getElementById(id);
    if (!btn) return;
    const start = (e) => { e.preventDefault(); movement[player][dir] = true; };
    const end = (e) => { e.preventDefault(); movement[player][dir] = false; };
    
    btn.addEventListener("touchstart", start);
    btn.addEventListener("touchend", end);
    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", end);
}

setupButton("p1-up", "p1", "up"); setupButton("p1-down", "p1", "down");
setupButton("p1-left", "p1", "left"); setupButton("p1-right", "p1", "right");
setupButton("p2-up", "p2", "up"); setupButton("p2-down", "p2", "down");
setupButton("p2-left", "p2", "left"); setupButton("p2-right", "p2", "right");

function update() {
    // Mavi Hareket
    if (movement.p1.up && player1.y > 0) player1.y -= player1.speed;
    if (movement.p1.down && player1.y < canvas.height - player1.size) player1.y += player1.speed;
    if (movement.p1.left && player1.x > 0) player1.x -= player1.speed;
    if (movement.p1.right && player1.x < canvas.width - player1.size) player1.x += player1.speed;

    // Kırmızı Hareket
    if (movement.p2.up && player2.y > 0) player2.y -= player2.speed;
    if (movement.p2.down && player2.y < canvas.height - player2.size) player2.y += player2.speed;
    if (movement.p2.left && player2.x > 0) player2.x -= player2.speed;
    if (movement.p2.right && player2.x < canvas.width - player2.size) player2.x += player2.speed;

    // Butona basma kontrolü
    if (player1.x < button.x + button.width && player1.x + player1.size > button.x &&
        player1.y < button.y + button.height && player1.y + player1.size > button.y) {
        button.pressed = true;
        gate.open = true;
    } else {
        button.pressed = false;
        gate.open = false;
    }

    // Kapı engeli kontrolü
    if (!gate.open) {
        if (player2.x + player2.size > gate.x && player2.x < gate.x + gate.width &&
            player2.y + player2.size > gate.y && player2.y < gate.y + gate.height) {
            player2.x = gate.x - player2.size;
        }
    }

    // Bitiş kontrolü
    if (player1.x > finishLine.x && player2.x > finishLine.x) {
        alert("Harika! İkiniz de ulaştınız!");
        player1.x = 50; player1.y = 300;
        player2.x = 50; player2.y = 100;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Buton
    ctx.fillStyle = button.pressed ? "#2ecc71" : "#f1c40f";
    ctx.fillRect(button.x, button.y, button.width, button.height);

    // Kapı
    if (!gate.open) {
        ctx.fillStyle = "#c0392b";
        ctx.fillRect(gate.x, gate.y, gate.width, gate.height);
    }

    // Bitiş
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(finishLine.x, finishLine.y, finishLine.width, finishLine.height);

    // Karakterler
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.size, player1.size);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.size, player2.size);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
      
