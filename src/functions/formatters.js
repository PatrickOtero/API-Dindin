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

const totalAmountObtainer = (array) => {
  let totalIncoming = 0
  let totalOutgoing = 0

  array.forEach((item) => {
    if (item.registry_type === 'Incoming') totalIncoming += item.registry_value
    if (item.registry_type === 'Outgoing') totalOutgoing += item.registry_value
  })

  const balance = totalIncoming - totalOutgoing

  return { totalIncoming, totalOutgoing, balance }
}

module.exports = {
  dateFormatter,
  arrayPropertyValueFormatter,
  totalAmountObtainer,
}
