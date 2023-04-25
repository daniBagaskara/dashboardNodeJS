document.addEventListener("DOMContentLoaded", function (event) {
  const buttonSignup = document.getElementById("button-Signup");
  const buttonLogin = document.getElementById("button-Login");

  buttonSignup.addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("Username-Signup").value;
    const email = document.getElementById("Email-Signup").value;
    const password = document.getElementById("Password-Signup").value;
    const confirmPassword = document.getElementById(
      "Confirm-Password-Signup"
    ).value;

    // Buat objek data untuk dikirim ke server
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    Swal.fire({
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
    });
    // Kirim permintaan POST ke endpoint yang sesuai
    axios
      .post("/register", data)
      .then((response) => {
        Swal.close();
        const successMessage = response.data.message;
        const successAlert = document.getElementById("alert");
        successAlert.classList.remove("alert-danger");
        successAlert.innerHTML = successMessage;
        successAlert.classList.add("alert-success");
        successAlert.classList.remove("d-none");
      })
      .catch((error) => {
        Swal.close();
        const errorMessage = error.response.data.message;
        const errorAlert = document.getElementById("alert");
        errorAlert.classList.remove("alert-success");
        errorAlert.innerHTML = errorMessage;
        errorAlert.classList.add("alert-danger");
        errorAlert.classList.remove("d-none");
      });
  });

  buttonLogin.addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.getElementById("Email-Login").value;
    const password = document.getElementById("Password-Login").value;

    const data = {
      email,
      password,
    };

    // Kirim permintaan POST ke endpoint yang sesuai
    axios
      .post("/login", data)
      .then((response) => {
        Swal.close();
      })
      .catch((error) => {
        Swal.close();
      });
  });
});
