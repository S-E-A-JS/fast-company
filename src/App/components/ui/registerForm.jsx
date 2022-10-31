import React, { useState, useEffect } from 'react'

import { validator } from '../../utils/validator'
import api from '../../api'

import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioFiield'
import MultiSelectField from '../common/form/multiSelectField'

const RegisterForm = () => {
  const [ data, setData ] = useState ( {
    email: '',
    password: '',
    profession: '',
    sex: 'other',
    qualities: [],
  } )
  const [ qualities, setQualities ] = useState ( {
  } )
  const [ professions, setProfession ] = useState ( [] )
  const [ errors, setErrors ] = useState ( {
  } )

  useEffect ( () => {
    api.professions.fetchAll ().then ( data => setProfession ( data ) )
    api.qualities.fetchAll ().then ( data => setQualities ( data ) )
  }, [] )

  const handleChange = target => {
    console.log ( target )
    setData ( prevState => ( {
      ...prevState,
      [target.name]: target.value,
    } ) )
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательная для заполнения',
      },
      isEmail: {
        message: 'Email введен некорректно',
      },
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения',
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру',
      },
      min: {
        message: 'Пароль должен состоять не менее чем из 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите Вашу профессию',
      },
    },
  }

  useEffect ( () => {
    validate ()
  }, [ data ] )
  const validate = () => {
    const errors = validator ( data, validatorConfig )
    setErrors ( errors )
    return Object.keys ( errors ).length === 0
  }

  const isValid = Object.keys ( errors ).length === 0

  const handleSubmit = e => {
    e.preventDefault ()
    const isValid = validate ()
    if ( !isValid ) return
    console.log ( data )
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField label='Электронная почта'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}/>
      <TextField label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}/>
      <SelectField
        label='Выбери свою профессию'
        defaultOption='Choose...'
        options={professions}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          {
            name: 'Male',
            value: 'male',
          },
          {
            name: 'Female',
            value: 'female',
          },
          {
            name: 'Other',
            value: 'other',
          },
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Выберите ваш пол'
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name='qualities'
        label='Выберитее ваши качества'
      />
      <button className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}>Submit</button>
    </form>
  )
}

export default RegisterForm