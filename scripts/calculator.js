class Calculator{

    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.isResult = false

        this.clear()
    }

    clear() {
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

        switch(this.operation) {
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

        if(isNaN(integerDigits)) {
            integerDisplay= ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en',{
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

export default Calculator;