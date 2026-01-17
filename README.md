# Expense Tracker

A beautiful, interactive expense tracking application that helps you manage your daily spending and stay within budget.

## Features

✨ **Key Features:**
- 📅 **Interactive Calendar** - View expenses on a calendar interface
- 💰 **Smart Budget Management** - Set monthly budget and number of days for automatic daily budget calculation
- 📊 **Progress Bars** - Visual representation of both monthly and daily budget usage with color-coded warnings
- 💎 **Automatic Savings** - Unspent daily amounts automatically go to your savings
- 🗓️ **Date-Based Expense Entry** - Add expenses for any date (past, present, or future)
- ⚠️ **Smart Warnings** - Get alerts when spending reaches 70% or 90% of budget
- 💳 **Category Tracking** - Organize expenses by category (Food, Transportation, Shopping, Entertainment, Bills, Healthcare, Other)
- 📈 **Daily Tracker** - See today's budget, spending, and remaining amount at a glance
- 💾 **Local Storage** - All data is saved locally on your device
- 🎨 **Beautiful UI** - Modern glassmorphism design with purple gradient theme

## File Structure
```
TrackMoney/
├── page1.html          # Main HTML file
├── page1.js            # JavaScript functionality
├── style/
│   └── page1.css       # Styling
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## How to Use

### 1. **Set Your Budget**
   - Click the "Set Budget" button
   - Enter your **total monthly budget** in Rs
   - Enter the **number of days** (e.g., 30 days)
   - Daily budget automatically calculates as: Total Budget ÷ Number of Days
   - Click "Set Budget"
   - Example: Budget Rs 1000 for 10 days = Rs 100 daily budget

### 2. **Add Expenses**
   - Click the "Add Expense" button
   - Enter the expense amount
   - Select a category
   - (Optional) Choose a specific date for the expense
   - (Optional) Add a description
   - Click "Add Expense"
   - If you spend LESS than your daily budget, the remaining automatically goes to **Savings**!

### 3. **View Daily Budget**
   - Check the "Today's Budget" section to see:
     - Daily Budget (allocated for today)
     - Today's Spent (how much you've already spent)
     - Remaining (how much you can still spend today)
   - A progress bar shows your daily spending percentage

### 4. **View Expenses**
   - Click on any date in the calendar
   - See all expenses for that day with descriptions
   - View the total spending for that day

### 5. **Monitor Overall Budget**
   - Check the monthly budget progress bar to see spending percentage
   - Current balance shows remaining money from your budget
   - Savings shows your accumulated savings from unspent daily amounts
   - Warning messages appear when spending exceeds safe levels

## Budget Warning Thresholds

- **Below 70%**: Green progress bar (all good)
- **70-89%**: Orange progress bar with alert message
- **90%+**: Red progress bar with warning message

## How Savings Work

**The Smart Savings System:**
- Your monthly budget is divided equally across the specified number of days
- Each day you get a daily budget allocation
- When you spend less than your daily budget, the difference goes to **Savings**
- This creates a safety net and helps you save automatically!

**Example:**
- Monthly Budget: Rs 1000
- Number of Days: 10
- Daily Budget: Rs 100
- Day 1: You spend Rs 50 → Rs 50 goes to Savings
- Day 2: You spend Rs 100 → No additional savings (used full daily budget)
- Day 3: You spend Rs 120 → You exceeded budget by Rs 20
- By end of month: You've accumulated savings from underspending days!

## Features Explained

### Calendar View
- Current day is highlighted
- Days with expenses show a pink indicator dot
- Click any date to view that day's expenses
- Navigate between months using arrow buttons

### Expense Organization
- All expenses are stored by date
- Can add expenses to past dates (useful for recording old receipts)
- Can add expenses to future dates (useful for planning)
- Organized by categories for better tracking

### Data Persistence
- All data is saved automatically to browser's local storage
- Your budget, expenses, and savings are retained even after closing the browser
- Clear browser data will reset all information

## Currency

All amounts are displayed in **Indian Rupees (Rs)**

## Getting Started

1. Open `page1.html` in a web browser
2. Set your monthly budget
3. Start adding your daily expenses
4. Monitor your spending with the visual progress bar

## Browser Compatibility

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript to be enabled
- Uses HTML5 Date input and localStorage API

## Tips

- Add expenses immediately to keep accurate records
- Use descriptive names for expenses to remember what you spent on
- Check the calendar regularly to monitor spending
- Reset your budget at the beginning of each month

## Future Enhancements

- Export expense reports as PDF
- Data visualization and charts
- Recurring expense templates
- Budget categories with individual limits
- Cloud synchronization across devices

## License

This project is open source and available under the MIT License.

## Support

For issues or suggestions, please refer to the GitHub repository.

---

**Track your spending. Stay within budget. Achieve your financial goals!** 💪