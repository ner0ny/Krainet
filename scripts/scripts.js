const burger = document.querySelector(".main__icon");

burger.addEventListener("click", () => {
  const menu = document.querySelector(".main__menu");
  const body = document.querySelector("body");

  menu.classList.add("main__menu_active");
  body.classList.add("_lock");
});

const closeBtn = document.querySelector(".main__menu-body__icon");

closeBtn.addEventListener("click", () => {
  const menu = document.querySelector(".main__menu");
  const body = document.querySelector("body");

  menu.classList.remove("main__menu_active");
  body.classList.remove("_lock");
});

const formButton = document.querySelector(".contact__form-button");

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const massage = document.getElementById("massage");

  const values = {
    name: name.value,
    email: email.value,
    massage: massage.value,
  };

  const errors = validation(values);

  if (errors.name === "" && errors.email === "" && errors.massage === "") {
    updateErrors(errors);
    postData(values);
  } else {
    updateErrors(errors);
  }
});

const validation = (values) => {
  const massageInfoError = {
    name: "",
    email: "",
    massage: "",
  };
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (values.name === "") {
    massageInfoError.name = "Введите имя";
  } else {
    massageInfoError.name = "";
  }

  if (values.email === "") {
    massageInfoError.email = "Введите почту";
  } else if (!email_pattern.test(values.email)) {
    massageInfoError.email = "Электронная почта не соответствует";
  } else {
    massageInfoError.email = "";
  }

  if (values.massage === "") {
    massageInfoError.massage = "Введите сообщение";
  } else {
    massageInfoError.massage = "";
  }

  return massageInfoError;
};

const updateErrors = (errors) => {
  const nameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const massageError = document.getElementById("error-massage");

  nameError.innerHTML = errors.name;
  emailError.innerHTML = errors.email;
  massageError.innerHTML = errors.massage;
};

const postData = (values) => {
  formButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      formButton.disabled = false;
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
