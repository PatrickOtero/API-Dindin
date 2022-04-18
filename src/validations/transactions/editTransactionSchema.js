const yup = require('../schemasConfig')

const editTransactionSchema = yup.object().shape({
  registry_date: yup.string().trim(),
  description: yup
    .string()
    .required("O campo 'descrição' é obrigatório")
    .trim(),
  category: yup.string().required("O campo 'categoria' é obrigatório").trim(),
  registry_value: yup.number().required("O campo 'valor' é obrigatório"),
  registry_type: yup.string().trim(),
})

module.exports = {
  editTransactionSchema,
}
