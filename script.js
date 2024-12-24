// Generate OTP (simulasi)
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    return otp;
}

// Enkripsi data dengan AES (gunakan crypto.subtle)
async function encryptData(data) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte initialization vector
    const encodedData = encoder.encode(data);

    const encrypted = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedData
    );

    return {
        encryptedData: new Uint8Array(encrypted),
        iv: iv,
        key: key,
    };
}

// Fungsi untuk menangani form login dan OTP
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const otp = document.getElementById("otp").value;

    // Hanya generate OTP sekali untuk pengujian
    if (!document.getElementById("otpMessage").textContent) {
        const generatedOtp = generateOTP();
        window.generatedOtp = generatedOtp;  // Simpan OTP yang dihasilkan
        document.getElementById("otpMessage").textContent = `OTP telah dikirim: ${generatedOtp}`;
        return;
    }
    
    // Verifikasi OTP
    if (otp == window.generatedOtp) {
        // Enkripsi data password dan email
        const dataToEncrypt = `${email}:${password}`;
        const encrypted = await encryptData(dataToEncrypt);

        // Kirim data terenkripsi (simulasi)
        console.log("Data terenkripsi:", encrypted.encryptedData);
        console.log("IV:", encrypted.iv);

        // Simulasi pengiriman data terenkripsi ke server
        alert("Login berhasil! Data telah terenkripsi.");
    } else {
        document.getElementById("otpMessage").textContent = "OTP salah. Coba lagi.";
    }
});