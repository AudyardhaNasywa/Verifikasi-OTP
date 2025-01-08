let generatedOtp = "";

document.getElementById("sendOtp").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    if (email) {
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        alert(`Your OTP is: ${generatedOtp}`); // Simulates sending OTP
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("otpForm").style.display = "block";
    } else {
        alert("Please enter your email.");
    }
});

document.getElementById("verifyOtp").addEventListener("click", () => {
    const enteredOtp = document.getElementById("otp").value;
    const message = document.getElementById("message");
    if (enteredOtp === generatedOtp) {
        message.style.color = "green";
        message.textContent = "OTP Verified! Login Successful.";
        
        // Redirect to landing page after 1 second
        setTimeout(() => {
            window.location.href = "page.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid OTP. Please try again.";
    }
});
