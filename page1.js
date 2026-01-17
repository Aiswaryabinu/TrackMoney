const monthyearElement = document.getElementById('monthyear');
const dateElement = document.getElementById('date');
const prevbuttonElement = document.getElementById('prevbutton');
const nextbuttonElement = document.getElementById('nextbutton');

let currentDate =new Date();
let selectedDate = null;
let expenses = JSON.parse(localStorage.getItem('expenses')) || {};

const updateCalender=()=>{
    const currentYear=currentDate.getFullYear();
    const currentMonth=currentDate.getMonth();

    const firstDay =new Date(currentYear,currentMonth,1);
    const lastDay =new Date(currentYear,currentMonth+1,0);
    const totalDays=lastDay.getDate();
    const firstDayIndex=firstDay.getDay();
    const lastDayIndex= lastDay.getDay();

    const monthyearString = currentDate.toLocaleDateString
    ('default',{month:'long',year:'numeric'});
    monthyearElement.textContent=monthyearString

    let datesHTML ='';
    for(let i=firstDayIndex;i>0;i--){
        const prevDate= new Date(currentYear,currentMonth,1-i);
        const dateKey = formatDateKey(prevDate);
        const hasExpense = expenses[dateKey] && expenses[dateKey].length > 0 ? 'has-expense' : '';
        datesHTML+=`<div class="date inactive ${hasExpense}" data-date="${dateKey}">${prevDate.getDate()}</div>`;
    }
    for(let i=1;i<=totalDays;i++){
        const date =new Date(currentYear,currentMonth,i);
        const dateKey = formatDateKey(date);
        const activeClass= date.toDateString()===new Date().toDateString()?'active':'';
        const hasExpense = expenses[dateKey] && expenses[dateKey].length > 0 ? 'has-expense' : '';
        datesHTML +=`<div class="date ${activeClass} ${hasExpense}" data-date="${dateKey}">${i}</div>`;
    }

    for (let i=1;i<=7-lastDayIndex;i++){
        const nextDate=new Date(currentYear,currentMonth+1,i);
        const dateKey = formatDateKey(nextDate);
        const hasExpense = expenses[dateKey] && expenses[dateKey].length > 0 ? 'has-expense' : '';
        datesHTML+=`<div class="date inactive ${hasExpense}" data-date="${dateKey}">${nextDate.getDate()}</div>`;
    }
    dateElement.innerHTML=datesHTML;
    
    // Add click handlers to dates
    document.querySelectorAll('.date').forEach(dateEl => {
        dateEl.addEventListener('click', function() {
            const dateKey = this.getAttribute('data-date');
            showExpensesForDate(dateKey);
        });
    });
}
prevbuttonElement.addEventListener('click', ()=>{
    currentDate.setMonth(currentDate.getMonth()-1);
    updateCalender();
})
nextbuttonElement.addEventListener('click', ()=>{
    currentDate.setMonth(currentDate.getMonth()+1);
    updateCalender();
})
updateCalender();




// Initialize data from localStorage or defaults
let monthlyBudget = parseFloat(localStorage.getItem('monthlyBudget')) || 2000;
let budgetDays = parseFloat(localStorage.getItem('budgetDays')) || 30;
let currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 2000;
let savings = parseFloat(localStorage.getItem('savings')) || 0;
let totalSpent = parseFloat(localStorage.getItem('totalSpent')) || 0;
let dailyBudget = monthlyBudget / budgetDays;

// Update daily tracker display
function updateDailyTracker() {
  const today = formatDateKey(new Date());
  const todaySpent = calculateDailySpent(today);
  const todayRemaining = dailyBudget - todaySpent;
  const percentSpentToday = dailyBudget > 0 ? (todaySpent / dailyBudget) * 100 : 0;
  
  document.getElementById('todayBudget').textContent = 'Rs ' + dailyBudget.toFixed(2);
  document.getElementById('todaySpent').textContent = 'Rs ' + todaySpent.toFixed(2);
  document.getElementById('todayRemaining').textContent = 'Rs ' + Math.max(0, todayRemaining).toFixed(2);
  document.getElementById('dailyProgressFill').style.width = Math.min(percentSpentToday, 100) + '%';
  
  // Update daily progress color based on spending
  const dailyProgressFill = document.getElementById('dailyProgressFill');
  if (percentSpentToday > 90) {
    dailyProgressFill.style.background = 'linear-gradient(90deg, #f44336, #e91e63)';
  } else if (percentSpentToday > 70) {
    dailyProgressFill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
  } else {
    dailyProgressFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
  }
}

// Helper function to format date as key
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to show expenses for a specific date
function showExpensesForDate(dateKey) {
  selectedDate = dateKey;
  const dateExpenses = expenses[dateKey] || [];
  const date = new Date(dateKey);
  const dateString = date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  
  document.getElementById('expenseListTitle').textContent = `Expenses - ${dateString}`;
  
  if (dateExpenses.length === 0) {
    document.getElementById('expenseList').innerHTML = '<div class="no-expenses">No expenses for this day</div>';
    document.getElementById('dayTotal').textContent = '0.00';
  } else {
    let expensesHTML = '';
    let dayTotal = 0;
    
    dateExpenses.forEach((expense, index) => {
      dayTotal += expense.amount;
      expensesHTML += `
        <div class="expense-item">
          <div class="expense-desc">${expense.description || 'No description'}</div>
          <div class="expense-amount">Rs ${expense.amount.toFixed(2)}</div>
        </div>
      `;
    });
    
    document.getElementById('expenseList').innerHTML = expensesHTML;
    document.getElementById('dayTotal').textContent = dayTotal.toFixed(2);
  }
  
  document.getElementById('expenseListModal').classList.remove('hidden');
}

// Update display function
function updateDisplay() {
  document.getElementById('monthlyBudget').textContent = 'Rs ' + monthlyBudget.toFixed(2);
  document.getElementById('dailyBudget').textContent = 'Rs ' + dailyBudget.toFixed(2);
  document.getElementById('currentBalance').textContent = 'Rs ' + currentBalance.toFixed(2);
  document.getElementById('savings').textContent = 'Rs ' + savings.toFixed(2);
  document.getElementById('spentAmount').textContent = totalSpent.toFixed(2);
  
  // Update progress bar
  const percentSpent = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  document.getElementById('percentSpent').textContent = percentSpent.toFixed(1) + '%';
  document.getElementById('progressBar').style.width = Math.min(percentSpent, 100) + '%';
  
  // Change progress bar color and show warning based on spending
  const progressBar = document.getElementById('progressBar');
  const warningDiv = document.getElementById('warningMessage');
  const warningText = document.getElementById('warningText');
  
  if (percentSpent > 90) {
    progressBar.style.background = 'linear-gradient(90deg, #f44336, #e91e63)';
    warningDiv.classList.remove('hidden');
    warningText.textContent = '⚠️ Warning! You have spent ' + percentSpent.toFixed(1) + '% of your budget!';
  } else if (percentSpent > 70) {
    progressBar.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
    warningDiv.classList.remove('hidden');
    warningText.textContent = '⚠️ Alert: You have spent ' + percentSpent.toFixed(1) + '% of your budget. Be careful!';
  } else {
    progressBar.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
    warningDiv.classList.add('hidden');
  }
  
  // Update daily tracker
  updateDailyTracker();
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('monthlyBudget', monthlyBudget);
  localStorage.setItem('budgetDays', budgetDays);
  localStorage.setItem('currentBalance', currentBalance);
  localStorage.setItem('savings', savings);
  localStorage.setItem('totalSpent', totalSpent);
}

// 1. Toggle Form Visibility
function toggleForm(id) {
  const form = document.getElementById(id);
  form.classList.toggle('hidden');
}

// 2. Save Budget
function saveBudget() {
  const val = parseFloat(document.getElementById('bAmount').value);
  const days = parseFloat(document.getElementById('bDays').value) || 30;
  if(val && val > 0 && days && days > 0) {
    monthlyBudget = val;
    budgetDays = days;
    dailyBudget = monthlyBudget / budgetDays;
    currentBalance = val - totalSpent;
    saveData();
    updateDisplay();
    alert("Budget set to: Rs " + val.toFixed(2) + " for " + days + " days (Rs " + dailyBudget.toFixed(2) + " per day)");
    document.getElementById('bAmount').value = '';
    document.getElementById('bDays').value = '';
    toggleForm('budgetForm');
  } else {
    alert('Please enter valid budget and number of days');
  }
}
// 3. Save Expense
function saveExpense() {
  const amt = parseFloat(document.getElementById('eAmount').value);
  const desc = document.getElementById('eDesc').value || 'No description';
  const category = document.getElementById('eCategory').value || 'Other';
  const dateInput = document.getElementById('eDate').value;
  
  if(amt && amt > 0) {
    // Get date from input or use today
    let expenseDate;
    if (dateInput) {
      expenseDate = dateInput; // Format: YYYY-MM-DD
    } else {
      expenseDate = formatDateKey(new Date());
    }
    
    // Initialize expenses array for this date if it doesn't exist
    if (!expenses[expenseDate]) {
      expenses[expenseDate] = [];
    }
    
    // Calculate daily allocated budget
    const allocatedDaily = dailyBudget;
    
    // Get total expenses already on this day
    let existingDayTotal = 0;
    expenses[expenseDate].forEach(exp => {
      existingDayTotal += exp.amount;
    });
    
    // Add expense to the list
    expenses[expenseDate].push({
      amount: amt,
      description: desc,
      category: category,
      timestamp: new Date().toISOString()
    });
    
    // Calculate total for this day after adding new expense
    const newDayTotal = existingDayTotal + amt;
    
    // If total spending on this day is less than daily budget, add difference to savings
    if (newDayTotal <= allocatedDaily) {
      const savingsAmount = allocatedDaily - newDayTotal;
      savings += savingsAmount;
      alert("✓ Expense added! Rs " + savingsAmount.toFixed(2) + " added to savings (you spent less than daily budget)");
    } else {
      const overspent = newDayTotal - allocatedDaily;
      alert("⚠️ Expense added! You've exceeded today's budget by Rs " + overspent.toFixed(2));
    }
    
    // Save expenses to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Update totals
    totalSpent += amt;
    currentBalance -= amt;
    saveData();
    updateDisplay();
    updateCalender(); // Refresh calendar to show expense indicator
    
    document.getElementById('eAmount').value = '';
    document.getElementById('eDesc').value = '';
    document.getElementById('eCategory').value = '';
    document.getElementById('eDate').value = '';
    toggleForm('expenseForm');
  } else {
    alert('Please enter a valid expense amount');
  }
}

// Initialize display on page load
updateDisplay();