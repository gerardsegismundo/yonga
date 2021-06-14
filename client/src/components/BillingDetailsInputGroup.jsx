import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Dropdown from 'react-dropdown'
import countryList from 'react-select-country-list'

import { CustomInput } from '../components/custom'

const countryOptions = countryList().getData()

const BillingDetailsInputGroup = props => {
  const { form, setForm, error, handleOnChange, isFormDisabled = false } = props

  const { isAuthenticated, data } = useSelector(({ user }) => user)

  useEffect(() => {
    if (isAuthenticated && data) setForm({ ...form, ...data })

    // eslint-disable-next-line
  }, [isAuthenticated, data])

  const handleOnChangeCountry = e => setForm({ ...form, country: e.label })

  return (
    <div className='billing-details--input-group'>
      <h2 className='billing-header'>Billing details</h2>

      <CustomInput
        label='Name'
        name='name'
        value={form.name}
        onChange={handleOnChange}
        error={error.name}
        disabled={isFormDisabled}
      />

      {!isFormDisabled || form.companyName ? (
        <CustomInput
          label='Company name (optional)'
          name='companyName'
          value={form.companyName}
          onChange={handleOnChange}
          error={error.companyName}
          disabled={isFormDisabled}
          required={false}
        />
      ) : null}

      <div className='dropdown-wrapper' data-is-disabled={isFormDisabled}>
        {form.country && <label htmlFor='country'>Country</label>}

        <Dropdown
          options={countryOptions}
          onChange={handleOnChangeCountry}
          value={form.country}
          className='dropdown-root'
          controlClassName='dropdown-control'
          placeholder='Select your Country'
          disabled={isFormDisabled}
        />
      </div>

      <CustomInput
        label='House number and street name'
        name='houseNumAndStrtName'
        value={form.houseNumAndStrtName}
        onChange={handleOnChange}
        error={error.houseNumAndStrtName}
        disabled={isFormDisabled}
      />

      {!isFormDisabled || form.apartment ? (
        <CustomInput
          label='Apartment, suite, unit, etc. (optional)'
          name='apartment'
          value={form.apartment}
          onChange={handleOnChange}
          error={error.apartment}
          required={false}
          disabled={isFormDisabled}
        />
      ) : null}

      <CustomInput
        label='Town/City'
        name='town'
        value={form.town}
        onChange={handleOnChange}
        error={error.town}
        disabled={isFormDisabled}
      />

      <CustomInput
        label='Postcode'
        name='postcode'
        value={form.postcode}
        onChange={handleOnChange}
        error={error.postcode}
        disabled={isFormDisabled}
      />

      <CustomInput
        label='Phone'
        name='phone'
        value={form.phone}
        onChange={handleOnChange}
        error={error.phone}
        disabled={isFormDisabled}
      />

      <CustomInput
        label='Email address'
        name='email'
        type='email'
        value={form.email}
        onChange={handleOnChange}
        error={error.email}
        disabled={isAuthenticated || isFormDisabled}
      />
    </div>
  )
}

export default BillingDetailsInputGroup
