const billInput = document.querySelector(".bill");
const peopleInput = document.querySelector(".people");
const tipPercents = document.querySelectorAll(".tip-percent");
const customTip = document.querySelector(".custom");
const tipPerPerson = document.querySelector(
  ".tip-per-person .total-result .result"
);
const totalPerPerson = document.querySelector(
  ".total-per-person .total-result .result"
);
const reset = document.querySelector(".reset");
let tipPercentValue;

tipPercents.forEach((percent) => {
  percent.addEventListener("click", setTipPercent);
});
customTip.addEventListener("input", setCustomTip);
[billInput, peopleInput].forEach((input) => {
  input.addEventListener("input", calculate);
});
reset.addEventListener("click", resetAll);

function setTipPercent(e) {
  const { target } = e;
  const targetValue = target.dataset.tipvalue;

  tipPercents.forEach((percent) => percent.classList.remove("selected"));
  target.classList.add("selected");
  tipPercentValue = targetValue / 100;

  calculate();
}

function setCustomTip(e) {
  const value = e.target.value / 100;

  tipPercents.forEach((percent) => percent.classList.remove("selected"));
  tipPercentValue = value;

  calculate(e);
}

function calculate(e) {
  if (e) {
    if (isNaN(e.target.value)) {
      e.currentTarget.value = "";
      return;
    }
  }

  if (billInput.value === "" || peopleInput.value === "" || !tipPercentValue) {
    tipPerPerson.innerHTML = "0";
    totalPerPerson.innerHTML = "0";
  } else {
    tipPerPerson.innerHTML = (
      (parseFloat(billInput.value) * tipPercentValue) /
      parseInt(peopleInput.value)
    ).toFixed(2);
    totalPerPerson.innerHTML = (
      parseFloat(tipPerPerson.innerHTML) +
      parseFloat(billInput.value) / parseInt(peopleInput.value)
    ).toFixed(2);
  }
}

function resetAll() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => (input.value = ""));
  tipPercents.forEach((percent) => percent.classList.remove("selected"));

  calculate();
}
