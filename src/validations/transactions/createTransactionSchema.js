const yup = require('../schemasConfig')

const createTransactionSchema = yup.object().shape({
  registry_date: yup.string().required().trim(),
  description: yup.string().required().trim(),
  category: yup.string().required().trim(),
  registry_value: yup.number().required(),
  registry_type: yup.string().trim(),
})

module.exports = {
  createTransactionSchema,
}
