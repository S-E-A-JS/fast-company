import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import api from '../../api'

import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const EditForm = ( { userId } ) => {
  const [ user, setUser ] = useState ( )
  const [ professions, setProfessions ] = useState ( [] )
  const [ qualities, setQualities ] = useState ( [] )

  useEffect ( () => {
    api.users.getById ( userId ).then ( data => setUser ( data ) )
    api.professions.fetchAll ().then ( data => {
      const proffesionList = Object.keys ( data ).map ( professionName => ( {
        label: data[professionName].name,
        value: data[professionName]._id,
      } ) )
      setProfessions ( proffesionList )
    } )
    api.qualities.fetchAll ().then ( data => {
      const qualitiesList = Object.keys ( data ).map ( optionName => ( {
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color,
      } ) )
      setQualities ( qualitiesList )
    } )
  }, [] )

  const getProfessionById = id => {
    for ( const prof of professions ) {
      if ( prof.value === id ) {
        return {
          _id: prof.value,
          name: prof.label,
        }
      }
    }
  }
  const getQualities = elements => {
    const qualitiesArray = []
    for ( const elem of elements ) {
      for ( const quality in qualities ) {
        if ( elem.value === qualities[quality].value ) {
          qualitiesArray.push ( {
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          } )
        }
      }
    }
    return qualitiesArray
  }

  const handleChange = target => {
    setUser ( prevState => ( {
      ...prevState,
      [target.name]: target.value,
    } ) )
  }

  const handleSubmit = () => {
    const { profession, qualities } = user
    const userToLocalStorage = {
      ...user,
      profession: getProfessionById ( profession ),
      qualities: getQualities ( qualities ),
    }
    api.users.update ( userId, userToLocalStorage ).then ( ( <Link to={`/users/`}/> ) )
  }

  // TODO форма должна отображаться только после того как все данные подгрузились иначе Loading...
  if ( user ) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="shadow p-4">
            <form
              onSubmit={handleSubmit}
            >
              <TextField
                label='Имя'
                name='name'
                placeholder='name'
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={user.email}
                onChange={handleChange}
              />
              <SelectField
                label='Выбери свою профессию'
                name='profession'
                onChange={handleChange}
                defaultOption='Choose'
                options={professions}
                value={user.profession}
              />
              <RadioField
                label='Выбери свой пол'
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
                value={user.sex}
                name='sex'
                onChange={handleChange}
              />
              <MultiSelectField
                label='Выбери свои качества'
                name='qualities'
                defaultValue={user.qualities}
                options={qualities}
                onChange={handleChange}
              />

              <button
                className='btn btn-primary w-100 mx-auto'
                type='submit'
              >
          Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
EditForm.propTypes = {
  userId: PropTypes.string,
  userData: PropTypes.object,
  // userName: PropTypes.string,
  // userProfession: PropTypes.string,
  // userQualities: PropTypes.array,
}

export default EditForm