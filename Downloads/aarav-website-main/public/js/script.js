// Get the popup
var popup = document.getElementById("emiPopup");

// Get the button that opens the popup
var openPopupBtn = document.querySelector(".open-popup-btn");

// Get the <span> element that closes the popup
var closePopupBtn = document.getElementById("closePopupBtn");

// Get input fields
var loanAmountInput = document.getElementById("loanAmount");
var interestRateInput = document.getElementById("interestRate");
var tenureInput = document.getElementById("tenure");

// Get output fields
var emiAmountDisplay = document.getElementById("emiAmount");
var totalInvestmentDisplay = document.getElementById("totalInvestment");
var totalAmountPayableDisplay = document.getElementById("totalAmountPayable");

// When the user clicks on the button, open the popup
openPopupBtn.onclick = function() {
  popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
closePopupBtn.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

// Function to calculate EMI
function calculateEMI() {
  // Get input values
  var loanAmount = parseFloat(loanAmountInput.value);
  var annualInterestRate = parseFloat(interestRateInput.value);
  var tenure = parseFloat(tenureInput.value);

  // Check if inputs are valid
  if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(tenure)) {
    emiAmountDisplay.innerText = "Invalid input";
    return;
  }

  // Convert annual interest rate to monthly interest rate
  var monthlyInterestRate = (annualInterestRate / 12) / 100;

  // Calculate EMI using the formula
  var emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure) / (Math.pow(1 + monthlyInterestRate, tenure) - 1);

  // Calculate total amount payable
  var totalAmountPayable = emi * tenure;
  
  // Set the output values
  emiAmountDisplay.innerText = emi.toFixed(2);
  totalInvestmentDisplay.innerText = loanAmount.toFixed(2);
  totalAmountPayableDisplay.innerText = totalAmountPayable.toFixed(2);
}

// Listen to input changes and recalculate EMI
loanAmountInput.addEventListener("input", calculateEMI);
interestRateInput.addEventListener("input", calculateEMI);
tenureInput.addEventListener("input", calculateEMI);
