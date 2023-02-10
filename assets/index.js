let checkResponse;

window.addEventListener("load", () => {
  checkResponse = (() => {
    let correct_answers = ["1", "1", "1"]; /* "cranc", "violí", "Iván" */
    let actualRiddle = 0;
    let check_answer = function (value) {
      if (correct_answers[actualRiddle] == value) return true;
      return false;
    };
    let increase_riddle = function () {
      ++actualRiddle;
    };
    let get_actualRiddle = function () {
      return actualRiddle;
    };
    let get_finalRiddle = function () {
      return actualRiddle == correct_answers.length;
    };

    return {
      check: check_answer,
      increase: increase_riddle,
      actualRiddle: get_actualRiddle,
      finalRiddle: get_finalRiddle,
    };
  })();
});

function checkAnswer() {
  let input = document.querySelector('input[type="text"');
  let answer = input.value;
  if (checkResponse.check(answer)) {
    //Show the new riddle
    let riddles = document.querySelector(".riddles");
    riddles.children[checkResponse.actualRiddle()].classList.remove("active");
    checkResponse.increase();
    riddles.children[checkResponse.actualRiddle()].classList.add("active");
    //Show the image associated to the riddle and change the number
    document.getElementById("n_images").innerHTML =
      checkResponse.actualRiddle();
    let imageWrapper = document.querySelector(".imageWrapper");
    imageWrapper.children[checkResponse.actualRiddle() - 1].classList.add(
      "show"
    );
    input.value = "";

    if (checkResponse.finalRiddle()) {
      const jsConfetti = new JSConfetti();

      setTimeout(() => {
        jsConfetti.addConfetti({
          confettiNumber: 500,
          confettiRadius: 4,
        });
        setTimeout(() => {
          jsConfetti.addConfetti({
            confettiNumber: 500,
            confettiRadius: 4,
          });
        }, 1000);
      }, 500);

      //remove the button and the input
      let button = document.querySelector("button");
      button.remove();
      input.remove();

      //Show the final message
      document.querySelector(".card").classList.add("final");
    }
  } else {
    alert("Error!");
  }
}

function showImage(element) {
  let popup = document.querySelector(".popup");

  popup.classList.add("show");

  let img = document.createElement("img");
  img.src = element.src;
  img.id = "popupImage";

  let description = (document.querySelector(".imgDescription").innerHTML =
    element.dataset.description);

  popup.appendChild(img);
}

function closePopup() {
  let popup = document.querySelector(".popup");
  popup.classList.remove("show");
  let img = document.querySelector("#popupImage");
  img.remove();
}
