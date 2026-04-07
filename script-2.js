const inputs = [...document.querySelectorAll('input:not([type="text"])')]
const passwordInput = document.getElementById('password')
const lengthInput = document.getElementById('length')
const lengthText = document.getElementById('lengthtext')
const copyButton = document.querySelector('.copy')

const numbers = [2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ['@', '#', '$', '%']
const similarNumbers = [0, 1]
const similarLowercase = ['i', 'l', 'o']
const similarUppercase = ['I', 'L', 'O']

const arrayForCodes = Array.from(Array(26))
const arrayWithCodes = arrayForCodes.map((_, i) => i + 97);
const lowercaseLetters = arrayWithCodes
    .map((code) => String.fromCharCode(code))
    .filter((letter) => !similarLowercase.includes(letter))
const uppercaseLetters = lowercaseLetters.map((letter) => letter.toUpperCase())

const updatePassword = () => {
    const lengthFromRange = lengthInput.value
    // console.log(lengthFromRange);
    const checkboxValues = inputs.slice(1).map(input => input.checked)
    // console.log(checkboxValues);
    const password = generatePassword(lengthFromRange, ...checkboxValues)
    passwordInput.value = password
    lengthText.textContent = lengthFromRange
}

const generatePassword = (lengthPassword, hasSymbols, hasNumbers, hasLowercase, hasUppercase, hasSimilar) => {
    // console.log(hasSymbols, hasNumbers, hasLowercase, hasUppercase);

    let availiableCharacters = [
        ...(hasSymbols ? symbols : []),
        ...(hasNumbers ? numbers : []),
        ...(hasLowercase ? lowercaseLetters : []),
        ...(hasUppercase ? uppercaseLetters : []),
    ]
    if (hasSimilar) {
        if (hasNumbers) {
            availiableCharacters = [...availiableCharacters, ...similarNumbers]
        }
        if (hasLowercase) {
            availiableCharacters = [...availiableCharacters, ...similarLowercase]
        }
        if (hasUppercase) {
            availiableCharacters = [...availiableCharacters, ...similarUppercase]
        }
    }
    // console.log(availiableCharacters);

    let password = ''
    if (availiableCharacters.length === 0) {
        return 'not enough parameters'
    }

    for (let i = 0; i < lengthPassword; i++) {
        const randomIndex = Math.floor(Math.random() * availiableCharacters.length)
        // console.log(randomIndex);
        password = password + availiableCharacters[randomIndex]
        // console.log(password);

    }

    return password
}
inputs.forEach(input => {
    input.addEventListener('input', updatePassword)
    // inputs[1].addEventListener('input', updatePassword)

})
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordInput.value)
    // console.dir(passwordInput);
    copyButton.disabled = true
    setTimeout(() => {
        copyButton.disabled = false
        passwordInput.value = ''
        passwordInput.focus()
        window.location.reload()
    }, 2 * 1000)
})

updatePassword()