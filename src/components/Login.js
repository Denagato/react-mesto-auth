import React from 'react';
import Header from '../components/Header.js';

function Login({ handleLogin }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    function handleChangeData(e) {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value,
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(data)
    }

    return (
        <>
        <Header loginText={'Регистрация'} link="/sign-up"/>
        <section className="form">
            <form onSubmit={handleSubmit} className="form__container form__containe_type_register">
                <h3 className="form__title">Вход</h3>
                <label className="form__field">
                <input  value={data.email} onChange={handleChangeData}
                        placeholder="Email"
                        type="email" 
                        name="email" 
                        className="form__input form__input_type_register" 
                        id="email" 
                        required 
                        minLength="2"
                        maxLength="40"/>
                <span className="form__error" id="email-error"></span>
                </label>
                <label className="form__field">
                <input  value={data.password} onChange={handleChangeData}
                        placeholder="Пароль"
                        type="text" 
                        name="password" 
                        className="form__input form__input_type_password" 
                        id="password" 
                        required 
                        minLength="2" 
                        maxLength="200"/>
                <span className="form__error" id="password-error"></span>
                </label>
                <button type="submit" className="form__save-button">Войти</button>
            </form>
        </section>
        </ >
    )
}

export default Login