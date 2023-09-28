document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const inputDay = document.getElementById("inputDay");
    const inputMonth = document.getElementById("inputMonth");
    const inputYear = document.getElementById("inputYear");
    const btn = document.querySelector(".btn");
    const yearsSpan = document.querySelector(".years");
    const monthsSpan = document.querySelector(".months");
    const daysSpan = document.querySelector(".days");
    const errorDay = document.getElementById("errorDay"); // Error message for day
    const errorMonth = document.getElementById("errorMonth"); // Error message for month
    const errorYear = document.getElementById("errorYear"); // Error message for year

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Get user input
        const day = parseInt(inputDay.value);
        const month = parseInt(inputMonth.value);
        const year = parseInt(inputYear.value);

        // Validate input
        let isValid = true;

        if (!isValidDate(day, month, year)) {
            isValid = false;
            if (day < 1 || day > 31) {
                displayErrorMessage("Day must be between 1 and 31", errorDay);
            }
            if (month < 1 || month > 12) {
                displayErrorMessage("Month must be between 1 and 12", errorMonth);
            }
            if (year < 1 || year > new Date().getFullYear()) {
                displayErrorMessage(
                    `Year must be between 1 and ${new Date().getFullYear()}`,
                    errorYear
                );
            }
            return;
        }

        // Calculate age
        const currentDate = new Date();
        const inputDate = new Date(year, month - 1, day); // Month is 0-based
        const age = calculateAge(currentDate, inputDate);

        // Display age with animation
        animateAge(age);
    });

    function isValidDate(day, month, year) {
        const currentDate = new Date();
        const inputDate = new Date(year, month - 1, day); // Month is 0-based

        // Check if the inputDate is a valid date and not in the future
        return (
            inputDate instanceof Date &&
            !isNaN(inputDate) &&
            inputDate <= currentDate &&
            day >= 1 &&
            day <= 31 &&
            month >= 1 &&
            month <= 12 &&
            year >= 1 &&
            year <= new Date().getFullYear()
        );
    }

    function calculateAge(currentDate, inputDate) {
        let age = {};
        let yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
        let monthDiff = currentDate.getMonth() - inputDate.getMonth();
        let dayDiff = currentDate.getDate() - inputDate.getDate();

        if (dayDiff < 0) {
            monthDiff--;
            dayDiff += daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        }

        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }

        age.years = yearDiff;
        age.months = monthDiff;
        age.days = dayDiff;

        return age;
    }

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function animateAge(age) {
        let years = 0;
        let months = 0;
        let days = 0;
        const interval = 1; // Interval for each animation step (ms)

        const intervalId = setInterval(function () {
            if (years < age.years) {
                years++;
                yearsSpan.textContent = years;
            } else if (months < age.months) {
                months++;
                monthsSpan.textContent = months;
            } else if (days < age.days) {
                days++;
                daysSpan.textContent = days;
            } else {
                clearInterval(intervalId);
            }
        }, interval);
    }

    function displayErrorMessage(message, errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((error) => {
            error.textContent = "";
            error.style.display = "none";
        });
    }
});
