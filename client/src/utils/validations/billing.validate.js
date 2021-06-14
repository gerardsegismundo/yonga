import { validateEmail } from './email.validate'

export const validateBilling = ({ name, country, email, houseNumAndStrtName, town, postcode, phone }) => {
  let errors = {}

  if (!name) errors.name = 'Name is required.'
  if (!country) errors.country = 'Country is required.'
  if (!houseNumAndStrtName) {
    errors.houseNumAndStrtName = 'House number and street name is required.'
  }
  if (!town) errors.town = 'Town is required.'
  if (!postcode) errors.postcode = 'Postcode is required.'
  if (!phone) errors.phone = 'Phone is required.'

  if (!validateEmail(email)) errors.email = 'Invalid email.'
  if (!email) errors.email = 'Email is required.'

  return Object.keys(errors).length === 0 ? false : errors
}
