function calculatePercentage() {
    const number = parseFloat(document.getElementById("number").value);
    const percentage = parseFloat(document.getElementById("percentage").value);
    const result = document.getElementById("result");

    if (isNaN(number) || isNaN(percentage)) {
        result.textContent = "Please enter both values.";
        return;
    }

    const answer = (number * percentage) / 100;

    result.textContent = `${percentage}% of ${number} = ${answer}`;
}