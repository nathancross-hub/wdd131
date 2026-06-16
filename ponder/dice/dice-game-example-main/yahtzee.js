const dice = document.querySelectorAll(".die");
const rollButton = document.getElementById("rollButton");
const message = document.getElementById("message");
const rollsLeftDisplay = document.getElementById("rollsLeft");

const totalScoreDisplay = document.getElementById("totalScore");
const upperTotalDisplay = document.getElementById("upperTotal");
const bonusScoreDisplay = document.getElementById("bonusScore");

let rollsLeft = 3;
let totalScore = 0;
let upperTotal = 0;
let bonusScore = 0;

rollButton.addEventListener("click", rollDice);

document.querySelectorAll("#scorecard button").forEach(button => {
    button.addEventListener("click", () => scoreCategory(button));
});

function rollDice() {
    if (rollsLeft <= 0) {
        message.textContent = "Pick a score before rolling again.";
        return;
    }

    dice.forEach(die => {
        const checkbox = die.querySelector("input");
        const image = die.querySelector("img");

        if (!checkbox.checked) {
            image.src = "assets/die_rolling.gif";
        }
    });

    setTimeout(() => {
        dice.forEach(die => {
            const checkbox = die.querySelector("input");
            const image = die.querySelector("img");

            if (!checkbox.checked) {
                const value = Math.floor(Math.random() * 6) + 1;
                image.src = `assets/white_dice_${value}.gif`;
                image.dataset.value = value;
            }
        });

        rollsLeft--;
        rollsLeftDisplay.textContent = rollsLeft;
        message.textContent = "";
    }, 500);
}

function getValues() {
    return Array.from(document.querySelectorAll("#gameboard img"))
        .map(img => Number(img.dataset.value));
}

function scoreCategory(button) {
    const category = button.dataset.score;
    const values = getValues();
    let score = 0;

    if (category === "ones") score = scoreNumber(values, 1);
    if (category === "twos") score = scoreNumber(values, 2);
    if (category === "threes") score = scoreNumber(values, 3);
    if (category === "fours") score = scoreNumber(values, 4);
    if (category === "fives") score = scoreNumber(values, 5);
    if (category === "sixes") score = scoreNumber(values, 6);

    if (category === "threeKind") score = hasAmount(values, 3) ? sum(values) : 0;
    if (category === "fourKind") score = hasAmount(values, 4) ? sum(values) : 0;
    if (category === "fullHouse") score = isFullHouse(values) ? 25 : 0;
    if (category === "smallStraight") score = isSmallStraight(values) ? 30 : 0;
    if (category === "largeStraight") score = isLargeStraight(values) ? 40 : 0;
    if (category === "yahtzee") score = hasAmount(values, 5) ? 50 : 0;
    if (category === "chance") score = sum(values);

    button.querySelector("span").textContent = score;
    button.disabled = true;

    if ([
        "ones",
        "twos",
        "threes",
        "fours",
        "fives",
        "sixes"
    ].includes(category)) {

        upperTotal += score;
        upperTotalDisplay.textContent = upperTotal;

        if (upperTotal >= 63 && bonusScore === 0) {
            bonusScore = 35;
            bonusScoreDisplay.textContent = bonusScore;
            message.textContent = "Upper Section Bonus Earned! +35";
        }
    }

    totalScore += score;
    totalScoreDisplay.textContent = totalScore + bonusScore;

    resetTurn();
}

function scoreNumber(values, number) {
    return values.filter(value => value === number).length * number;
}

function sum(values) {
    return values.reduce((total, value) => total + value, 0);
}

function hasAmount(values, amount) {
    for (let i = 1; i <= 6; i++) {
        if (values.filter(value => value === i).length >= amount) {
            return true;
        }
    }

    return false;
}

function isFullHouse(values) {
    const counts = [];

    for (let i = 1; i <= 6; i++) {
        counts.push(values.filter(value => value === i).length);
    }

    return counts.includes(3) && counts.includes(2);
}

function isSmallStraight(values) {
    const unique = [...new Set(values)]
        .sort((a, b) => a - b)
        .join("");

    return unique.includes("1234") ||
           unique.includes("2345") ||
           unique.includes("3456");
}

function isLargeStraight(values) {
    const unique = [...new Set(values)]
        .sort((a, b) => a - b)
        .join("");

    return unique === "12345" ||
           unique === "23456";
}

function resetTurn() {
    rollsLeft = 3;
    rollsLeftDisplay.textContent = rollsLeft;

    dice.forEach(die => {
        die.querySelector("input").checked = false;
    });

    message.textContent ||= "Score saved. Roll again.";
}