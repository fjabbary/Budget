// Item function constructors
const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}

const Expense = function(id, description, value) {
  this.id = id;
  this.description = description;
  this.value = value;
};

const DOMstrings = {
  addBtn: ".add__btn",
  addType: ".add__type",
  addDescription: ".add__description",
  addValue: ".add__value",
  incomeList: '.income__list',
  expenseList: '.expenses__list'
};

//Determine the current Month
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthSpan = document.querySelector(".budget__title--month");
const index = new Date().getMonth();
const curMonth = monthNames[index];
monthSpan.innerText = curMonth;


// Add event listener for button & enter key
document.querySelector(DOMstrings.addBtn).addEventListener('click', addItem);
document.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        addItem();
    }
})

const inc = [];
const exp = [];

function addItem() {
    let newItem;
    const e = document.querySelector(DOMstrings.addType);
    const type = e.options[e.selectedIndex].value;
    
    let description = document.querySelector(DOMstrings.addDescription).value;
    const dollarAmount = parseFloat(document.querySelector(DOMstrings.addValue).value);
    
    //All the code related to the income type
    if (type === 'inc') {
        incomeHandler(description, dollarAmount);

    // All the code related to the Expenses
    } else if (type === 'exp') { 
        expenseHandler(description, dollarAmount);
     
    }

    var totalIncome = 0;
    inc.forEach((item) => {
        totalIncome += item.value;
    })

    var totalExpense = 0;
    exp.forEach((item) => {
        totalExpense += item.value;
    })

    updateUI(type, totalIncome, totalExpense);
   
    document.querySelector(".add__description").focus();
    document.querySelector(".add__description").value = "";
    document.querySelector('.add__value').value = '';
}


// Update UI values

function updateUI(type, totalIncome, totalExpense) {
  const incomeDiv = document.querySelector(".budget__income--value");
  const expenseDiv = document.querySelector(".budget__expenses--value");

  if (type === "inc") {
    incomeDiv.innerText = `+ ${totalIncome}`;
  } else if (type === "exp") {
    expenseDiv.innerText = `- ${totalExpense}`;
  }

  let budgetValue = document.querySelector(".budget__value");
  budgetValue.innerText = `$${totalIncome - totalExpense}`;

  const budgetPercentage = document.querySelector(".budget__expenses--percentage");
  if (totalExpense === 0) {
    budgetPercentage.innerText = 0;
  } else {
    const percent = (totalExpense / totalIncome) * 100;
    budgetPercentage.innerText = `${percent.toFixed(1)}%`;
  }
}


//Delete Incom Item 
const incomeItemList = document.querySelector(".income__list");
const expenseItemList = document.querySelector(".expenses__list");

    incomeItemList.addEventListener('click', deleteItem);
    expenseItemList.addEventListener('click', deleteItem);

    function deleteItem(e) {
        const deleteIcon = e.target.classList.contains("ion-ios-close-outline");

        if (deleteIcon) {
            const item = e.target.parentElement.parentElement.parentElement.parentElement;
            item.remove();
           
            const id = item.getAttribute('id');
            const splitStr = id.split('-');
            const targetedId = Number(splitStr[1]);

            let type;
            let targetedEl;

            if (id.includes("income")) {
                type = "inc";
                targetedEl = inc.findIndex((income) => {
                    return income.id === targetedId
                })
                
                console.log(targetedEl)
                inc.splice(targetedEl, 1);


            } else if (id.includes("expense")) {
                type = "exp";
                targetedEl = exp.findIndex((expense) => {
                    return expense.id === targetedId
                })

                exp.splice(targetedEl, 1);
            }

            var totalIncome = 0;
            inc.forEach((item) => {
                totalIncome += item.value;
            })

            var totalExpense = 0;
            exp.forEach((item) => {
                totalExpense += item.value;
            })
            
            console.log(exp)

            updateUI(type, totalIncome, totalExpense);
        }
    }


  function incomeHandler(description, dollarAmount) {
        let id;
        if (inc.length !== 0) {
            id = inc[inc.length - 1].id + 1;
        } else {
            id = 0;
        }

        //;

        newItem = new Income(id, description, dollarAmount);

      if (description !== '' && !isNaN(dollarAmount)){
            inc.push(newItem);
        } else {
            alert('Please add description and value');
        }

      const html = `<div class="item clearfix" id="income-${id}"><div class="item__description"> ${description.charAt(0).toUpperCase() + description.slice(1)}</div><div class="right clearfix"><div class="item__value">+ ${dollarAmount}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;

      if (description !== "" && !isNaN(dollarAmount)) {
        $(DOMstrings.incomeList).append(html);
      }

        //Calculate the total value for INCOME
        console.log('inc array:')
        console.log(inc);
    }


function expenseHandler(description, dollarAmount) {
        let id;
        if (exp.length !== 0) {
            id = exp[exp.length - 1].id + 1;
        } else {
            id = 0;
        }

        newItem = new Expense(id, description, dollarAmount);
    if (description !== "" && !isNaN(dollarAmount)) {
            exp.push(newItem);
    } else {
      alert("Please add description and value");
    }


        const html = `<div class="item clearfix" id="expense-${id}">
                            <div class="item__description"> ${description
                              .charAt(0)
                              .toUpperCase() + description.slice(1)} </div>
                            <div class="right clearfix">
                                <div class="item__value">- ${dollarAmount}</div>
                
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

    if (description !== "" && !isNaN(dollarAmount)) {
            $(DOMstrings.expenseList).append(html);
    } 
    
        console.log('exp array:');
        console.log(exp);
    }