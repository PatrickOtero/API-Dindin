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
  let incomingValue = 0
  let outgoingValue = 0

  array.forEach((item) => {
    if (item.registry_type === 'Incoming') incomingValue += item.registry_value
    if (item.registry_type === 'Outgoing') outgoingValue += item.registry_value
  })

  const balanceValue = incomingValue - outgoingValue

  const totalIncoming = `R$: ${incomingValue},00`
  const totalOutgoing = `R$: ${outgoingValue},00`

  const balance = `R$: ${balanceValue},00`

  return { totalIncoming, totalOutgoing, balance }
}

const weekDayNumberRemover = (array) => {
  array.forEach((registry) => {
    registry.week_day = registry.week_day.slice(1, registry.week_day.length)
  })
}

module.exports = {
  dateFormatter,
  arrayPropertyValueFormatter,
  totalAmountObtainer,
  weekDayNumberRemover,
}
