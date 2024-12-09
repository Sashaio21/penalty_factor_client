import '../App.css';
import { Input, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const [registerUser, setRegisterUser] = useState()
  const [errorLogin, setErrorLogin] = useState(false)

  function RegisterUser(data){
    const dataNewUser = axios.post('/auth/signin', data)
      .then(()=>{console.log(dataNewUser)
        setRegisterUser(dataNewUser)
      })      
      .catch((err)=>{
        setErrorLogin(err.response.data.message)
        console.log(err.response.data.message)
      })
    
  }

  function test(){
    console.log("ok")
  }

  if (registerUser) {
    return <Navigate to={'/login'}/> 
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{display: "flex", flexDirection: "column"}}>
      Регистрация
        <form onSubmit={handleSubmit(RegisterUser)}>
          <div style={{display: "flex", flexDirection: "column", width: "250px"}}>
            <Input
              placeholder='Фамилия'
              name='firstName'
              {...register('firstName')}
            />
            <Input
              placeholder='Имя'
              name='name'
              {...register('name')}
            />
            <Input
              placeholder='email'
              name='email'
              {...register('email')}
            />
            <Input
              id='password'
              placeholder='Пароль'
              name='password'
              type='password'
              {...register('password')}
            />
            <Input
              id='againPassword'
              placeholder='Подтвредить пароль'
              name='againPassword'
              type='password'
              {
                ...register('againPassword',{
                  validate: {
                    value: (value)=>{
                      console.log(value)
                    }
                  }
                }) 
              }
            />
            {errors.againPassword && <p>{errors.againPassword.message}</p>}
            {errorLogin?(<p style={{alignSelf:"center", color:"red"}}>{errorLogin}</p>):<></>}
            <Button type='submit'>Зарегистрироваться</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;