import React, { useEffect, useState } from "react"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import BackHistoryButton from "../../common/backButton"
import { useProfessions } from "../../../hooks/useProfession"
import { useQualities } from "../../../hooks/useQualities"
import { useAuth } from "../../../hooks/useAuth"
import { Redirect, useHistory } from "react-router-dom"

const EditUserPage = () => {
  const history = useHistory ()

  const [ isLoading, setIsLoading ] = useState ( false )
  const [ data, setData ] = useState ( {
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  } )
  const {
    currentUser, updateUserProfile, isLoading: userLoading,
  } = useAuth ()

  const { professions, isLoading: profLoading } = useProfessions ()
  const { qualities, isLoading: qualLoading } = useQualities ()

  const [ quals, setQuals ] = useState ( [] )
  const [ profs, setProfs ] = useState ( [] )
  const [ errors, setErrors ] = useState ( {
  } )

  const transformQualities = data => {
    return data.map ( qual => ( {
      label: qual.name,
      value: qual._id,
      color: qual.color,
    } ) )
  }

  useEffect ( () => {
    setIsLoading ( true )

    setData ( {
      ...currentUser,
      qualities: transformQualities ( qualities.filter ( q => {
        return currentUser.qualities.includes ( q._id )
      } ) ),
      profession: currentUser.profession,
    } )

    const professionsList = professions.map ( professionName => ( {
      label: professionName.name,
      value: professionName._id,
    } ) )
    setProfs ( professionsList )

    const qualitiesList = qualities.map ( optionName => ( {
      value: optionName._id,
      label: optionName.name,
      color: optionName.color,
    } ) )
    setQuals ( qualitiesList )
  }, [ ] )

  const handleSubmit = e => {
    e.preventDefault ()
    const isValid = validate ()
    if ( !isValid ) return
    const preparedData = {
      ...data,
      profession: data.profession,
      qualities: data.qualities.map ( q => q.value ),
    }
    updateUserProfile ( preparedData )
    history.push ( "/" )
  }

  useEffect ( () => {
    if ( !userLoading && !profLoading && !qualLoading ) setIsLoading ( false )
  }, [ data ] )

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  }
  useEffect ( () => {
    validate ()
  }, [ data ] )

  const handleChange = target => {
    setData ( prevState => ( {
      ...prevState,
      [target.name]: target.value,
    } ) )
  }

  const validate = () => {
    const errors = validator ( data, validatorConfig )
    setErrors ( errors )
    return Object.keys ( errors ).length === 0
  }

  const isValid = Object.keys ( errors ).length === 0

  const editUserPath = `/users/${currentUser._id}/edit`

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      {( location.pathname !== editUserPath )
        ? <Redirect to={{
          pathname: editUserPath,
        }}/>
        : <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {data.qualities.length > 0
              ? (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={profs}
                    name="profession"
                    onChange={handleChange}
                    value={data.profession.value}
                    error={errors.profession}
                  />
                  <RadioField
                    options={[
                      {
                        name: "Male",
                        value: "male",
                      },
                      {
                        name: "Female",
                        value: "female",
                      },
                      {
                        name: "Other",
                        value: "other",
                      },
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                  />
                  <MultiSelectField
                    defaultValue={data.qualities}
                    options={quals}
                    onChange={handleChange}
                    name="qualities"
                    label="Выберите ваши качества"
                  />
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                  >
                        Обновить
                  </button>
                </form>
              )
              : (
                "Loading..."
              )}
          </div>
        </div>}

    </div>
  )
}

export default EditUserPage