const { format } = require('date-fns')

const dateFormatter = (array) => {
  let treatedDate = ''
  array.forEach((item) => {
    treatedDate = format(item.registry_date, 'dd/MM/yyyy')
    item.registry_date = treatedDate
  })
}

const arrayPropertyValueFormatter = (array) => {
  array.forEach((item) => {
    item.registry_value = `R$${item.registry_value},00`
  })
}

module.exports = { dateFormatter, arrayPropertyValueFormatter }
