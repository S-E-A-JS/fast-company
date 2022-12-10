import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useQualities } from '../../hooks/useQualities'
import { useProfessions } from '../../hooks/useProfession'

const RegisterForm = () => {
  const [ data, setData ] = useState ( {
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false,
  } )
  const { qualities } = useQualities ()
  // Преобразование данных в случае если qualities - массив
  const qualitiesList = qualities.map ( q => ( {
    label: q.name,
    value: q._id,
  } ) )
  const { professions } = useProfessions ()
  // Преобразование данных если professions - массив
  const professionsList = professions.map ( p => ( {
    label: p.name,
    value: p._id,
  } ) )
  const [ errors, setErrors ] = useState ( {
  } )

  const getProfessionById = id => {
    for ( const prof of professions ) {
      if ( prof._id === id ) {
        return prof._id
      }
    }
  }
  const getQualities = elements => {
    const qualitiesArray = []
    for ( const elem of elements ) {
      for ( const quality in qualities ) {
        if ( elem.value === qualities[quality]._id ) {
          qualitiesArray.push ( qualities[quality]._id )
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = e => {
    e.preventDefault ()
    const isValid = validate ()
    if ( !isValid ) return
    const { profession, qualities } = data
    console.log ( {
      ...data,
      profession: getProfessionById ( profession ),
      qualities: getQualities ( qualities ),
    } )
  }

  // useEffect ( () => {
  //   api.professions.fetchAll ().then ( data => {
  //     const professionsList = Object.keys ( data ).map ( professionName => ( {
  //       label: data[professionName].name,
  //       value: data[professionName]._id,
  //     } ) )
  //     setProfession ( professionsList )
  //   } )
  //   api.qualities.fetchAll ().then ( data => {
  //     const qualitiesList = Object.keys ( data ).map ( optionName => ( {
  //       value: data[optionName]._id,
  //       label: data[optionName].name,
  //       color: data[optionName].color,
  //     } ) )
  //     setQualities ( qualitiesList )
  //   } )
  // }, [] )
  const handleChange = target => {
    setData ( prevState => ( {
      ...prevState,
      [target.name]: target.value,
    } ) )
  }
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения',
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
        message: 'Пароль должен содержать хотя бы одно число',
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию',
      },
    },
    licence: {
      isRequired: {
        message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выбери свою профессию"
        defaultOption="Choose..."
        options={professionsList}
        name="profession"
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
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
                Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
                Submit
      </button>
    </form>
  )
}

export default RegisterForm