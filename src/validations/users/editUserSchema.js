const yup = require('../schemasConfig')

const editUserSchema = yup.object().shape({
  user_name: yup.string().required("O campo 'nome' é obrigatório").trim(),
  user_email: yup
    .string()
    .email('Por favor, insira um e-mail em um formato válido')
    .required("O campo 'email' é obrigatório")
    .trim(),
})

module.exports = {
  editUserSchema,
}
