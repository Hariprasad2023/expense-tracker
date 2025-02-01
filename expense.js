document.getElementById('expense-form').addEventListener('submit', addExpense);
let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Fetch expenses from local storage
let totalAmount = 0;

// Load expenses when the page loads
window.addEventListener('load', () => {
    updateExpenseList();
    updateTotalAmount();
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
        localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to local storage
        updateExpenseList();
        updateTotalAmount();
    }

    // Clear the form inputs
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateExpenseList() {
    const expenseTableBody = document.getElementById('expenses');
    expenseTableBody.innerHTML = ''; // Clear previous table rows

    expenses.forEach(expense => {
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
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
    updateExpenseList();
    updateTotalAmount();
}

function updateTotalAmount() {
    totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = `Rs ${totalAmount.toFixed(2)}`;
}