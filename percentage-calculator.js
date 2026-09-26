<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Percentage Calculator</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="calculator-container">
        <h1>Percentage Calculator</h1>

        <div class="calculator-card">

            <label for="number">Enter Number</label>
            <input type="number" id="number" placeholder="e.g. 500">

            <label for="percentage">Enter Percentage</label>
            <input type="number" id="percentage" placeholder="e.g. 20">

            <button onclick="calculatePercentage()">
                Calculate
            </button>

            <div id="result" class="result">
                Result will appear here
            </div>

        </div>
    </div>

    <script>
        function calculatePercentage() {

            const number = parseFloat(
                document.getElementById("number").value
            );

            const percentage = parseFloat(
                document.getElementById("percentage").value
            );

            const result = document.getElementById("result");

            if (isNaN(number) || isNaN(percentage)) {
                result.textContent = "Please enter both values.";
                return;
            }

            const answer = (number * percentage) / 100;

            result.textContent =
                percentage + "% of " + number + " = " + answer;
        }
    </script>

</body>
</html>