document.getElementById('income-form').addEventListener('submit', addIncome);
let incomes = JSON.parse(localStorage.getItem('incomes')) || []; // Fetch incomes from local storage
let totalAmount = 0;

// Load incomes when the page loads
window.addEventListener('load', () => {
    updateIncomeList();
    updateTotalAmount();
});

function addIncome(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (description && category && !isNaN(amount)) {
        const income = {
            id: new Date().getTime(),
            description,
            category,
            amount,
            date
        };

        incomes.push(income);
        localStorage.setItem('incomes', JSON.stringify(incomes)); // Save to local storage
        updateIncomeList();
        updateTotalAmount();
    }

    // Clear the form inputs
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function updateIncomeList() {
    const incomeTableBody = document.getElementById('incomes');
    incomeTableBody.innerHTML = ''; // Clear previous table rows

    incomes.forEach(income => {
        const row = document.createElement('tr');

        // Create cells for each piece of information
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = income.description;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = income.category;

        const dateCell = document.createElement('td');
        dateCell.textContent = income.date;

        const amountCell = document.createElement('td');
        amountCell.textContent = `Rs ${income.amount.toFixed(2)}`;

        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button class="delete-btn" onclick="deleteIncome(${income.id})">Delete</button>`;

        // Append the cells to the row
        row.appendChild(descriptionCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        // Append the row to the table body
        incomeTableBody.appendChild(row);
    });
}

function deleteIncome(id) {
    incomes = incomes.filter(income => income.id !== id);
    localStorage.setItem('incomes', JSON.stringify(incomes)); // Update local storage
    updateIncomeList();
    updateTotalAmount();
}

function updateTotalAmount() {
    totalAmount = incomes.reduce((total, income) => total + income.amount, 0);
    document.getElementById('total-amount').textContent = `Rs ${totalAmount.toFixed(2)}`;
}