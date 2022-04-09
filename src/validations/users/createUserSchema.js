const yup = require('../schemasConfig')

const createUserSchema = yup.object().shape({
  user_name: yup.string().required("O campo 'nome' é obrigatório").trim(),
  user_email: yup
    .string()
    .email('Por favor, insira um e-mail em um formato válido')
    .required("O campo 'email' é obrigatório")
    .trim(),
  user_password: yup
    .string()
    .min(5, 'Senha muito curta. Insira ao menos 5 caracteres')
    .required("O campo 'senha' é obrigatório")
    .trim(),
})

module.exports = {
  createUserSchema,
}
