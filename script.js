class Calculator {

    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.isResult = false
        this.clear()

    }

    clear(){
        this.currentOperandValue = ''
        this.previousOperandValue = ''
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        this.currentOperandValue = this.currentOperandValue.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperandValue.includes('.')) return
        this.currentOperandValue = this.currentOperandValue.toString() + number.toString()
    }

    selectOperation(operation) {
        if(this.currentOperandValue ==='') return

        if(this.previousOperandValue !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperandValue = this.currentOperandValue
        this.currentOperandValue = ''
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperandValue)
        const curr = parseFloat(this.currentOperandValue)

        if(isNaN(prev) || isNaN(curr)) return

        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }

        this.currentOperandValue = computation
        this.operation = undefined
        this.previousOperandValue
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay

        if(isNaN(integerDigits)){
            integerDisplay= ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperandValue)

        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.previousOperandValue} ${this.operation}`
        }else{
            this.previousOperandText.innerText = ''
        }

        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-prev-operand]')
const currentOperandText = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})