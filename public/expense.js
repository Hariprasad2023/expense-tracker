document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('filter-category').addEventListener('change', filterExpenses);

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = 0;

// Load expenses when the page loads
window.addEventListener('load', () => {
    updateExpenseList();
    updateTotalAmount();
    updateNetIncome(); // Calculate and display net income
});

function addExpense(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (description && category && !isNaN(amount)) {
        const expense = {
            id: new Date().getTime(),
            description,
            category,
            amount,
            date
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateExpenseList();
        updateTotalAmount();
        updateNetIncome(); // Update net income after adding an expense
    }

    // Clear the form inputs
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateExpenseList(filteredExpenses = expenses) {
    const expenseTableBody = document.getElementById('expenses');
    expenseTableBody.innerHTML = ''; // Clear previous table rows

    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');

        // Create cells for each piece of information
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = expense.description;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement('td');
        dateCell.textContent = expense.date;

        const amountCell = document.createElement('td');
        amountCell.textContent = `Rs ${expense.amount.toFixed(2)}`;

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>`;

        // Append the cells to the row
        row.appendChild(descriptionCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        // Append the row to the table body
        expenseTableBody.appendChild(row);
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpenseList();
    updateTotalAmount();
    updateNetIncome(); // Update net income after deleting an expense
}

function updateTotalAmount(filteredExpenses = expenses) {
    totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = `Rs ${totalAmount.toFixed(2)}`;
}

// Function to calculate and display net income
function updateNetIncome() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    const netIncomeElement = document.getElementById('net-income-amount');
    netIncomeElement.textContent = `Rs ${netIncome.toFixed(2)}`;

    // Change color based on net income
    if (netIncome < 0) {
        netIncomeElement.style.color = '#e74c3c'; // Red for negative net income
    } else {
        netIncomeElement.style.color = '#4CAF50'; // Green for positive net income
    }
}

// Function to filter expenses by category
function filterExpenses() {
    const selectedCategory = document.getElementById('filter-category').value;
    let filteredExpenses = expenses;

    if (selectedCategory !== 'All') {
        filteredExpenses = expenses.filter(expense => expense.category === selectedCategory);
    }

    updateExpenseList(filteredExpenses);
    updateTotalAmount(filteredExpenses);
}