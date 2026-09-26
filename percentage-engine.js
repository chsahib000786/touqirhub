function getValue(id) {
  const input = document.getElementById(id);
  return input ? parseFloat(input.value) : NaN;
}

function showResult(id, value) {
  const result = document.getElementById(id);

  if (result) {
    result.textContent = value;
  }
}


/* =========================
   1. PERCENTAGE OF NUMBER
   X% of Y
========================= */

function percentageOf() {
  const percentage = getValue("percentage");
  const number = getValue("percentageNumber");

  if (isNaN(percentage) || isNaN(number)) {
    showResult("percentageResult", "Please enter both values");
    return;
  }

  const result = (percentage / 100) * number;

  showResult(
    "percentageResult",
    Number(result.toFixed(10)).toLocaleString()
  );
}


/* =========================
   2. WHAT PERCENTAGE
   X is what % of Y
========================= */

function whatPercentage() {
  const part = getValue("part");
  const total = getValue("total");

  if (isNaN(part) || isNaN(total)) {
    showResult("whatPercentageResult", "Please enter both values");
    return;
  }

  if (total === 0) {
    showResult("whatPercentageResult", "Cannot divide by zero");
    return;
  }

  const result = (part / total) * 100;

  showResult(
    "whatPercentageResult",
    Number(result.toFixed(10)).toLocaleString() + "%"
  );
}


/* =========================
   3. PERCENTAGE INCREASE
========================= */

function percentageIncrease() {
  const oldValue = getValue("oldValue");
  const newValue = getValue("newValue");

  if (isNaN(oldValue) || isNaN(newValue)) {
    showResult("increaseResult", "Please enter both values");
    return;
  }

  if (oldValue === 0) {
    showResult("increaseResult", "Cannot divide by zero");
    return;
  }

  const result = ((newValue - oldValue) / oldValue) * 100;

  showResult(
    "increaseResult",
    Number(result.toFixed(10)).toLocaleString() + "%"
  );
}


/* =========================
   4. PERCENTAGE DECREASE
========================= */

function percentageDecrease() {
  const oldValue = getValue("decreaseOld");
  const newValue = getValue("decreaseNew");

  if (isNaN(oldValue) || isNaN(newValue)) {
    showResult("decreaseResult", "Please enter both values");
    return;
  }

  if (oldValue === 0) {
    showResult("decreaseResult", "Cannot divide by zero");
    return;
  }

  const result = ((oldValue - newValue) / oldValue) * 100;

  showResult(
    "decreaseResult",
    Number(result.toFixed(10)).toLocaleString() + "%"
  );
}
