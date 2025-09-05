let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let name = document.getElementById("expenseName").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);

  if (name === "" || isNaN(amount)) {
    alert("Please enter valid details");
    return;
  }

  let expense = { name, amount };
  expenses.push(expense);

  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";

  renderExpenses();
}

function renderExpenses() {
  let list = document.getElementById("expenseList");
  let total = 0;
  list.innerHTML = "";

  expenses.forEach((expense, index) => {
    total += expense.amount;
    let li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Show saved expenses on load
renderExpenses();