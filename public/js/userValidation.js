const regForm = document.querySelector('.reg-form')
regForm.addEventListener('submit', event => {
    event.preventDefault()

    const username = regForm.username.value
    const password = regForm.password.value

    const nameCorrect = isCorrectName(username)
    const passCorrect = isCorrectPassword(password)
    let message = ""

    if(nameCorrect && passCorrect) {
        event.target.submit()
        return
    }

    if (!nameCorrect) {
        message += 'Name should exist from 2 to 20 symbols\n'
    }
    if(!passCorrect) {
        message += 'Password should exist at least one letter and number. Length of password should be from 8 to 64 symbols\n'
    }

    alert(message)
})

const isCorrectName = (name) => {
    return name.length > 2 && name.length < 20
}

const isCorrectPassword = (pass) => {
    const pattern =/^(?=.*[A-Za-z])(?=.*\d).{8,64}$/
    return pattern.test(pass)
}