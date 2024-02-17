import {useState} from 'react'
import Cookies from 'js-cookie'
import React from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onsubmitSuccess = jwtToken => {
    // Storing JWT
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  const onsubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const onsubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    // LOGIN API CALL
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    // MAKING AUTH REQST
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    // CHECKING API CALL
    if (response.ok === true) {
      onsubmitSuccess(data.jwt_token)
    } else {
      onsubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <>
      <input
        type='text'
        value={username}
        onChange={onChangeUsername}
        className='user-input'
        placeholder='Username'
      />
    </>
  )

  const renderPasswordField = () => (
    <>
      <input
        type={showPassword ? 'text' : 'password'}
        className='password-input-field'
        value={password}
        onChange={onChangePassword}
        placeholder='Password'
      />
    </>
  )

  const renderShowPasswordField = () => (
    <>
      <label>show Password</label>
      type = 'checkbox' checked = {showPassword}
      onChange{() => setShowPassword(!showPassword)} /&gt;
    </>
  )
  return (
    <div className='Login-form-container'>
      <div className='form-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          className='nxt-watch-logo'
          alt='nxt-light-logo'
        />
        <form className='login-form' onSubmit={onsubmitForm}>
          <label className='input-label' htmlFor='username'>
            USERNAME
          </label>
          <div className='input-container'>{renderUsernameField()}</div>
          <label className='input-label' htmlFor='password'>
            PASSWORD
          </label>
          <div className='input-container'>{renderPasswordField()}</div>
          <div className='input-container'>{renderShowPasswordField()}</div>
          <button type='submit' className='login-button'>
            Login
          </button>
          {showSubmitError ? <div>{errorMsg}</div> : null}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
