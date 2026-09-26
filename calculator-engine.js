// TouqirHub Calculator Engine
// Common functions used by calculator pages

function getNumber(id) {
  const element = document.getElementById(id);
  if (!element) return 0;

  const value = parseFloat(element.value);
  return Number.isFinite(value) ? value : 0;
}

function setResult(id, value) {
  const element = document.getElementById(id);
  if (!element) return;

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      element.textContent = "Invalid result";
      return;
    }

    element.textContent = Number(value.toFixed(10)).toLocaleString();
  } else {
    element.textContent = value;
  }
}

function roundNumber(value, decimals = 2) {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(decimals));
}


/* =========================
   PERCENTAGE
========================= */

function percentageOf() {
  const percentage = getNumber("percentage");
  const number = getNumber("percentageNumber");

  setResult(
    "percentageResult",
    (percentage / 100) * number
  );
}

function whatPercentage() {
  const part = getNumber("part");
  const total = getNumber("total");

  if (total === 0) {
    setResult("whatPercentageResult", "Cannot divide by zero");
    return;
  }

  setResult(
    "whatPercentageResult",
    (part / total) * 100 + "%"
  );
}

function percentageIncrease() {
  const oldValue = getNumber("oldValue");
  const newValue = getNumber("newValue");

  if (oldValue === 0) {
    setResult("increaseResult", "Cannot divide by zero");
    return;
  }

  const result = ((newValue - oldValue) / oldValue) * 100;

  setResult("increaseResult", result + "%");
}

function percentageDecrease() {
  const oldValue = getNumber("decreaseOld");
  const newValue = getNumber("decreaseNew");

  if (oldValue === 0) {
    setResult("decreaseResult", "Cannot divide by zero");
    return;
  }

  const result = ((oldValue - newValue) / oldValue) * 100;

  setResult("decreaseResult", result + "%");
}


/* =========================
   BMI
========================= */

function calculateBMI() {
  const weight = getNumber("bmiWeight");
  const height = getNumber("bmiHeight");

  if (weight <= 0 || height <= 0) {
    setResult("bmiResult", "Enter valid values");
    return;
  }

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }

  setResult(
    "bmiResult",
    roundNumber(bmi, 2) + " — " + category
  );
}


/* =========================
   AGE
========================= */

function calculateAge() {
  const birthInput = document.getElementById("birthDate");

  if (!birthInput || !birthInput.value) {
    setResult("ageResult", "Select your birth date");
    return;
  }

  const birthDate = new Date(birthInput.value);
  const today = new Date();

  if (birthDate > today) {
    setResult("ageResult", "Invalid birth date");
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    );
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  setResult(
    "ageResult",
    years + " years, " +
    months + " months, " +
    days + " days"
  );
}


/* =========================
   DISCOUNT
========================= */

function calculateDiscount() {
  const price = getNumber("originalPrice");
  const discount = getNumber("discountPercent");

  if (price < 0 || discount < 0) {
    setResult("discountResult", "Enter valid values");
    return;
  }

  const saved = price * discount / 100;
  const finalPrice = price - saved;

  const result =
    "You save " + roundNumber(saved, 2) +
    " — Final price: " + roundNumber(finalPrice, 2);

  setResult("discountResult", result);
}


/* =========================
   TIP
========================= */

function calculateTip() {
  const bill = getNumber("billAmount");
  const tipPercent = getNumber("tipPercent");
  const people = getNumber("tipPeople") || 1;

  if (bill < 0 || tipPercent < 0 || people <= 0) {
    setResult("tipResult", "Enter valid values");
    return;
  }

  const tip = bill * tipPercent / 100;
  const total = bill + tip;
  const perPerson = total / people;

  setResult(
    "tipResult",
    "Tip: " + roundNumber(tip, 2) +
    " — Total: " + roundNumber(total, 2) +
    " — Per person: " + roundNumber(perPerson, 2)
  );
}


/* =========================
   COMPOUND INTEREST
========================= */

function calculateCompoundInterest() {
  const principal = getNumber("principal");
  const rate = getNumber("interestRate");
  const years = getNumber("interestYears");
  const compounds = getNumber("compoundFrequency") || 1;

  if (
    principal < 0 ||
    years < 0 ||
    compounds <= 0
  ) {
    setResult("compoundResult", "Enter valid values");
    return;
  }

  const amount =
    principal *
    Math.pow(
      1 + (rate / 100) / compounds,
      compounds * years
    );

  const interest = amount - principal;

  setResult(
    "compoundResult",
    "Final amount: " +
    roundNumber(amount, 2) +
    " — Interest: " +
    roundNumber(interest, 2)
  );
}


/* =========================
   LOAN / EMI
========================= */

function calculateLoan() {
  const principal = getNumber("loanAmount");
  const annualRate = getNumber("loanRate");
  const years = getNumber("loanYears");

  if (principal <= 0 || years <= 0) {
    setResult("loanResult", "Enter valid values");
    return;
  }

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment;

  if (monthlyRate === 0) {
    monthlyPayment = principal / months;
  } else {
    monthlyPayment =
      principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  setResult(
    "loanResult",
    "Monthly: " + roundNumber(monthlyPayment, 2) +
    " — Total: " + roundNumber(totalPayment, 2) +
    " — Interest: " + roundNumber(totalInterest, 2)
  );
}


/* =========================
   SIMPLE INTEREST
========================= */

function calculateSimpleInterest() {
  const principal = getNumber("simplePrincipal");
  const rate = getNumber("simpleRate");
  const years = getNumber("simpleYears");

  const interest =
    principal * rate * years / 100;

  const total = principal + interest;

  setResult(
    "simpleInterestResult",
    "Interest: " + roundNumber(interest, 2) +
    " — Total: " + roundNumber(total, 2)
  );
}


/* =========================
   PROFIT MARGIN
========================= */

function calculateProfitMargin() {
  const revenue = getNumber("revenue");
  const cost = getNumber("cost");

  if (revenue === 0) {
    setResult("profitMarginResult", "Cannot divide by zero");
    return;
  }

  const profit = revenue - cost;
  const margin = (profit / revenue) * 100;

  setResult(
    "profitMarginResult",
    "Profit: " + roundNumber(profit, 2) +
    " — Margin: " + roundNumber(margin, 2) + "%"
  );
}


/* =========================
   AREA
========================= */

function calculateRectangleArea() {
  const length = getNumber("areaLength");
  const width = getNumber("areaWidth");

  setResult(
    "areaResult",
    length * width
  );
}

function calculateCircleArea() {
  const radius = getNumber("circleRadius");

  setResult(
    "circleAreaResult",
    Math.PI * radius * radius
  );
}


/* =========================
   TEMPERATURE
========================= */

function celsiusToFahrenheit() {
  const celsius = getNumber("celsius");

  setResult(
    "fahrenheitResult",
    (celsius * 9 / 5) + 32
  );
}

function fahrenheitToCelsius() {
  const fahrenheit = getNumber("fahrenheit");

  setResult(
    "celsiusResult",
    (fahrenheit - 32) * 5 / 9
  );
}


/* =========================
   DATE DIFFERENCE
========================= */

function calculateDateDifference() {
  const start = document.getElementById("startDate");
  const end = document.getElementById("endDate");

  if (!start || !end || !start.value || !end.value) {
    setResult("dateDifferenceResult", "Select both dates");
    return;
  }

  const startDate = new Date(start.value);
  const endDate = new Date(end.value);

  if (endDate < startDate) {
    setResult("dateDifferenceResult", "End date must be after start date");
    return;
  }

  const difference =
    endDate.getTime() - startDate.getTime();

  const days =
    Math.floor(difference / (1000 * 60 * 60 * 24));

  setResult(
    "dateDifferenceResult",
    days + " days"
  );
}


/* =========================
   GENERAL CALCULATOR
========================= */

function basicCalculate(expression) {
  if (!expression) return "";

  const safeExpression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\^/g, "**")
    .replace(/[^0-9+\-*/().%\s*]/g, "");

  try {
    const result = Function(
      '"use strict"; return (' +
      safeExpression +
      ')'
    )();

    if (!Number.isFinite(result)) {
      return "Invalid result";
    }

    return result;
  } catch {
    return "Invalid expression";
  }
}


/* =========================
   FORMAT NUMBER
========================= */

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "Invalid result";
  }

  return Number(
    value.toFixed(10)
  ).toLocaleString();
}
