let angkaRahasia;
let jumlahPercobaan;
const maksimalPercobaan = 10;

// Timer Countdown
let sisaWaktu = 60;
let intervalTimer;

// Tampilan
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");

// Tombol
const mulaiBtn = document.getElementById("mulaiBtn");
const cekBtn = document.getElementById("cekBtn");
const ulangBtn = document.getElementById("ulangBtn");
const mainLagiAkhir = document.getElementById("mainLagiAkhir");

// Komponen Game
const tebakan = document.getElementById("tebakan");
const hasil = document.getElementById("hasil");
const percobaan = document.getElementById("percobaan");
const timer = document.getElementById("timer");

// Komponen Akhir
const statusGame = document.getElementById("statusGame");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");

// =====================
// MULAI GAME
// =====================

mulaiBtn.addEventListener("click", function(){

    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    resetGame();

});

// =====================
// TIMER COUNTDOWN
// =====================

function mulaiTimer(){

    clearInterval(intervalTimer);

    sisaWaktu = 60;

    timer.textContent = "⏱ Waktu : 01:00";
// 
    intervalTimer = setInterval(function(){

        sisaWaktu--;

        let menit = Math.floor(sisaWaktu / 60);
        let detik = sisaWaktu % 60;

        timer.textContent =
        "⏱ Waktu : " +
        String(menit).padStart(2,"0") +
        ":" +
        String(detik).padStart(2,"0");
// 
        if(sisaWaktu <= 0){

            clearInterval(intervalTimer);

            hasil.textContent =
            "⏰ Waktu habis!";

            cekBtn.disabled = true;

            setTimeout(function(){

                selesaiGame(false);

            },1000);

        }

    },1000);

}

// =====================
// CEK ANGKA
// =====================

cekBtn.addEventListener("click", cekAngka);

function cekAngka(){

    let angkaUser = Number(tebakan.value);

    if(angkaUser < 1 || angkaUser > 100){

        hasil.textContent =
        "Masukkan angka 1 - 100";

        return;

    }
// 
    jumlahPercobaan++;

    for(let i = 1; i <= jumlahPercobaan; i++){

        console.log("Percobaan ke-" + i);

    }

    if(angkaUser === angkaRahasia){

        hasil.textContent =
        "🎉 Selamat! Angka yang benar adalah " + angkaRahasia;

        cekBtn.disabled = true;

        setTimeout(function(){

            selesaiGame(true);

        },1000);

    }
// 
    else if(angkaUser < angkaRahasia){

        hasil.textContent =
        "⬆️ Terlalu kecil! Coba angka yang lebih besar.";

    }

    else{

        hasil.textContent =
        "⬇️ Terlalu besar! Coba angka yang lebih kecil.";

    }
// 
    percobaan.textContent =
    "Jumlah Percobaan : " +
    jumlahPercobaan +
    " / " +
    maksimalPercobaan;

    if(jumlahPercobaan >= maksimalPercobaan &&
       angkaUser !== angkaRahasia){

        hasil.textContent =
        "❌ Kesempatan habis! Angka yang benar adalah " + angkaRahasia;

        cekBtn.disabled = true;

        setTimeout(function(){

            selesaiGame(false);

        },1000);

    }

    tebakan.value = "";

}

// =====================
// GAME SELESAI
// =====================

function selesaiGame(menang){

    clearInterval(intervalTimer);

    let waktuDipakai = 60 - sisaWaktu;

    let menit = Math.floor(waktuDipakai / 60);
    let detik = waktuDipakai % 60;

    let score = 110 - (jumlahPercobaan * 10);

    if(score < 0){

        score = 0;

    }
// 
    gameScreen.style.display = "none";
    endScreen.style.display = "block";

    if(menang){

        statusGame.textContent =
        "🎉 SELAMAT ANDA MENANG";

    }else{

        statusGame.textContent =
        "❌ GAME OVER";

        score = 0;

    }
// 
    scoreText.innerHTML =
    "🏆 Score : " + score;

    timeText.innerHTML =
    "📊 Percobaan : " +
    jumlahPercobaan +
    " / " +
    maksimalPercobaan +
    "<br><br>" +
    "⏱ Waktu Bermain : " +
    menit +
    " menit " +
    detik +
    " detik";

}

// =====================
// MAIN LAGI
// =====================

ulangBtn.addEventListener("click", resetGame);

mainLagiAkhir.addEventListener("click", function(){

    endScreen.style.display = "none";
    gameScreen.style.display = "block";

    resetGame();

});

// =====================
// RESET GAME
// =====================

function resetGame(){

    angkaRahasia = Math.floor(Math.random() * 100) + 1;

    jumlahPercobaan = 0;

    tebakan.value = "";

    hasil.textContent =
    "Silakan mulai menebak";

    percobaan.textContent =
    "Jumlah Percobaan : 0 / 10";

    timer.textContent =
    "⏱ Waktu : 01:00";

    cekBtn.disabled = false;

    mulaiTimer();

}
