const yup = require('../schemasConfig')

const loginSchema = yup.object().shape({
  user_email: yup
    .string()
    .email('Por favor, insira um e-mail em um formato válido')
    .required("O campo 'email' é obrigatório")
    .trim(),
  user_password: yup.string().required("O campo 'senha' é obrigatório").trim(),
})

module.exports = { loginSchema }
