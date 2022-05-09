/* eslint-disable no-alert */
/* eslint-disable eol-last */
/* eslint-disable import/no-cycle */
import { onNavigate } from '../lib/application/controller.js';
import { signInWithGoogle, loginUser } from '../lib/application/authFirebase.js';

export const Login = () => {
  const loginPage = `
  <section class='text-container'>
    <h1>CUY VIAJERO</h1>
    <img class='img-responsive' src='img/cuyLog.png'>
    <p class=text-Register>Login</p>
    <label for='nameEmail'>Email
    <input type='text' id='loginEmail' placeholder ='Ingresar correo' name ='nameEmail'>
    </label>
    <label for='namePassword'>Contraseña
    <input type= 'password' id='loginPassword' placeholder ='Ingresar contraseña' name ='namePassword'>
    <p id='messageEmail'></p>
    <p id='messagePassword'></p>
    </label>
    <button id='getInto'> Iniciar sesión
    <button id='buttonGoogle'>Iniciar con <img class='logo-Google' src='img/google.png'> </button>
    <div id='register-link'>
    <p>¿No tienes cuenta? <a href='/register'><span class='link-span'><strong>Registrate</strong></span></a></p>
    </div>
    <button id='buttonBackHome' class='buttonHome'>
    </section>
  `;
  const viewLoginPage = document.createElement('div');
  viewLoginPage.innerHTML = loginPage;
  viewLoginPage.className = 'viewContainer';

  viewLoginPage.querySelector('#getInto').addEventListener('click', (e) => {
    const emailValue = viewLoginPage.querySelector('#loginEmail');
    console.log(emailValue);
    const passwordValue = viewLoginPage.querySelector('#loginPassword');
    console.log(passwordValue);

    const messageEmail = viewLoginPage.querySelector('#messageEmail');
    const messagePassword = viewLoginPage.querySelector('#messagePassword');
    if (emailValue.value === '') {
      messageEmail.innerHTML = 'campo email vacio';
    } if (passwordValue.value === '') {
      messagePassword.innerHTML = 'campo Password vacio';
    }
    e.preventDefault();
    loginUser(emailValue.value, passwordValue.value)
      .then((user) => {
        if (user.emailVerified === true) {
          onNavigate('/home');
        } else {
          alert('Por favor verifica tu bandeja');
          onNavigate('/login');
        }
      }).catch(() => {
        alert('Campos invalidos');
        onNavigate('/login');
      });
  });

  viewLoginPage.querySelector('#buttonGoogle').addEventListener('click', () => {
    signInWithGoogle().then((userCredential) => {
      console.log(userCredential); 
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email);
      onNavigate('/home'); 

    });
  });
  viewLoginPage.querySelector('#buttonBackHome').addEventListener('click', () => onNavigate('/'));
  return viewLoginPage;
};