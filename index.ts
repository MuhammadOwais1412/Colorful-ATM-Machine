#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

let myBalance: number = 25000;
let myPin: number = 1234;

console.log(chalk.bold.cyanBright("\n\tWelcome to Code With Owais - ATM Machine\n"));

// printing a message Enter Your Pin
let answer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.hex('#99CCFF')("Enter Your Pin:"),
  },
]);

// if pin is Correct
if (answer.pin === myPin) {
  console.log(chalk.greenBright("\nPin Code is Correct, Login Succesfully!\n"));

  let operationAnswer = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: chalk.hex('#99CCFF')("Select an operation"),
      choices: ["Withdraw Amount", "Check Balance"],
    },
  ]);

 // if choose Withdraw Amount
  if (operationAnswer.operation === "Withdraw Amount") {

    let withdrawAns = await inquirer.prompt([
      {
        name: "WithdrawMethod",
        type: "list",
        message: chalk.hex('#99CCFF')("Enter Your Withdrawal Method"),
        choices: ["Fast Cash", "Enter Amount"],
      }
    ])

// if choose Withdraw Amount = Fast Cash
    if (withdrawAns.WithdrawMethod === "Fast Cash") {
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: chalk.hex('#99CCFF')("Select Amount"),
          choices: [1000, 2000, 5000, 10000, 15000, 20000],
        }
      ])

      if (fastCashAns.fastCash > myBalance) {
        console.log(chalk.redBright("Insuffecient Amount"));
      } 
      else {
        myBalance -= fastCashAns.fastCash;
        console.log(chalk.whiteBright(`${fastCashAns.fastCash} Withdrawn Successfully`));
        console.log(chalk.whiteBright(`Your Remaining Balance is: ${myBalance}`));
      }
    }

// if choose Withdraw Amount = Enter Amount
    else if (withdrawAns.WithdrawMethod === "Enter Amount") {
      let amountAnswer = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: chalk.hex('#99CCFF')("Enter the Amount to Withdraw:"),
        },
      ]);
      
      if (amountAnswer.amount > myBalance) {
        console.log(chalk.redBright("Insuffecient Amount"));
      }
       else {
        myBalance -= amountAnswer.amount;
        console.log(chalk.whiteBright(`${amountAnswer.amount} Withdrawn Successfully`));
        console.log(chalk.whiteBright(`Your Remaining Balance is: ${myBalance}`));
      }
    }
  
// if choose Check Balance
  } else if (operationAnswer.operation === "Check Balance") {
    console.log(chalk.whiteBright(`Your Account Balance is: ${myBalance}`));
  }
} 

// if pin is Incorrect
else {
  console.log(chalk.redBright("\nPin Code is Incorrect, Try Again!"));
};
