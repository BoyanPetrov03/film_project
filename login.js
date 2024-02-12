window.onload = () => {
  const registerButton = document.querySelector("button:nth-child(1)");
  registerButton.addEventListener("click", () => {
    window.location.href = "/register.html";
  });
  const loginButton = document.querySelector("button");
  const form = document.querySelector(`form`);
  const pass = document.querySelector(`input[type="password"]`);
  const email = document.querySelector(`input[name="email"]`);
  const error = document.querySelector(`span.register-error`);
  form.onsubmit = (event) => {
    event.preventDefault();
  };
  loginButton.addEventListener("click", () => {
    if (!email.value.includes("@")) {
      email.classList.add("invalid-field");
      error.innerHTML = "Invalid email format";
      return;
    }
    fetch("accounts.json")
      .then((data) => data.json())
      .then((accounts) => {
        console.log(accounts);
        const acc = accounts.find((acc) => acc.email == email.value);
        if (acc) {
          if (acc.pass == pass.value) {
            window.location.href = "/index.html";
          } else {
            pass.classList.add("invalid-field");
            error.innerHTML = "Wrong password";
          }
        } else {
          email.classList.add("invalid-field");
          error.innerHTML = "There is no registered user with that email";
          return;
        }
      });
  });
};
