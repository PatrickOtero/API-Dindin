const yup = require('../schemasConfig')

const editTransactionSchema = yup.object().shape({
  registry_date: yup.string().trim(),
  description: yup.string().required().trim(),
  category: yup.string().required().trim(),
  registry_value: yup.number().required(),
  registry_type: yup.string().trim(),
})

module.exports = {
  editTransactionSchema,
}
