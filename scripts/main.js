import Calculator from './calculator.js';

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-prev-operand]')
const currentOperandText = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})