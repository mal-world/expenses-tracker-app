let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Load stored expenses or initialize as an empty array
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to render expenses from the array to the table
function renderExpenses() {
    expensesTableBody.innerHTML = ''; // Clear existing rows
    totalAmount = 0; // Reset total

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;
        totalAmountCell.textContent = totalAmount;

        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses)); // Update localStorage
            renderExpenses(); // Re-render expenses
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    });
}

renderExpenses();

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validation
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select the date');
        return;
    }

    // Add new expense to the array and localStorage
    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to localStorage

    renderExpenses(); // Re-render the table with the new expense

    // Reset input fields
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});
