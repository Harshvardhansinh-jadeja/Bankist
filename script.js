'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  for (const [i, movement] of movs.entries()) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${movement}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
};

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcPrintBalance(acc);
  //display summary
  calcDisplaySummary(acc.movements);
};

//Map method DEV
const Rupees = account1.movements.map(mov => mov * 77);
console.log(Rupees);

//Same as above but above use function
//while below method will make new array and push it.
const RupeesFor = [];
for (const mov of account1.movements) {
  RupeesFor.push(mov * 77);
}
console.log(RupeesFor);
//DEV end

const Createusernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
Createusernames(accounts);
console.log(accounts);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}$`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest}€`;
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    //display content
    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }

  btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = ' ';
    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      console.log('Transfer valied');
      updateUI(currentAccount);
    }
  });
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movements.push(amount);
    inputLoanAmount.value = ' ';
  }
  updateUI(currentAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    //CLose account find
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(accounts);
    //splice that account
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//DEV
//Filter Method
const deposit = account1.movements.filter(move => {
  return move > 0;
});
// console.log(deposit);

const withdraw = account1.movements.filter(move => move < 0);
// console.log(withdraw);

//Reduce method - 0 means accumulator will have 0 as intial value.
const balance = account1.movements.reduce((acc, curr, i, arr) => acc + curr, 0);
// console.log(balance);

//Find method
//it is basically like the filter method but here it won't create new array
//And it will return the first item in array which will satisfy the condition
const firstDeposite = account1.movements.find(mov => mov > 0);
console.log(firstDeposite);

//Creating empty array and filling
const x = new Array(7); //It will create 7 size array with empty Elements
x.fill(1, 3, 5); //It will fill element of index  3 to 5 with element 1;
x.fill(0, 1, 3);
console.log(x);
//DEV end
