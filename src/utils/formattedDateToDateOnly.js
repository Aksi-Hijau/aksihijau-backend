const formattedDateToDateOnly = (date) => {
  const dateOnly = date ? date.toISOString().split('T')[0] : null
  return dateOnly
}

module.exports = formattedDateToDateOnly