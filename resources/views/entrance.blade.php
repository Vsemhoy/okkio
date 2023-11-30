<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TeleHost</title>
	<meta name="description" content="TeleHost is a simple and free Private CRM">
    <!-- Add your CSS files here -->

    <link rel="stylesheet" href="{{ asset('resources/css/uikit.min.css') }}">

    <link rel="stylesheet" href="{{ asset('resources/css/apps/eventor/template.css') }}">

    <!-- Add more CSS files if needed -->
    @yield('page-styles')
    <style>
body {
  margin: 0;
}
.body-shop {
   width: 100%;
  height: 100vh;
  position: relative;
  background-image: url(https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=067f0b097deff88a789e125210406ffe);
  background-size: cover;
  background-position: center center;
  display: grid;
    grid-template-rows: auto 85px;
    align-items: center;
}

.phone-wrapper {

  margin-left: auto;
  margin-right: auto;
  height: calc(100vh - 200px);
  padding-top: 100px;
  display: block;
  width: 400px;
  max-height: 800px;
}
.phone-outline {
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 178px #00deff00, 11px 90px 144px -42px #00000026;
    border-radius: 1.6rem;
    border: 2px solid #00000073;
    backdrop-filter: blur(6px);
}
.phone-body {
  display: block;
  width: 100%;
  height:100%;
overflow: hidden;
  border-radius: 1.6rem;

/*   border: 1px solid red; */
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#afb5bf+0,6f7577+50,0a0e0a+51,434244+100 */
/* background: linear-gradient(165deg,  #afb5bf 0%,#6f7577 50%,#0a0e0a 50.3%,#434244 100%); */
/* background: linear-gradient(168deg, #00deff 0%,#f4e8de 49.7%,#00deff 50.3%,#434244 100%); */
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
/*   box-shadow: inset 2px 19px 9px 2px #ffffffc9;
border-left: 1px solid #ebebebe3;
    border-right: 1px solid #a2f0ffd4; */
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1.6rem;
    /* background: black; */
    /* border: 1px solid red; */
    /* background: linear-gradient(165deg, #afb5bf 0%,#6f7577 50%,#0a0e0a 50.3%,#434244 100%); */
    /* background: linear-gradient(168deg, #00deff 0%,#f4e8de 49.7%,#00deff 50.3%,#1ccae4 100%); */
    /* box-shadow: inset 2px 19px 9px 2px #ffffffc9;
    border-left: 1px solid #ebebebe3;
    border-right: 1px solid #a2f0ffd4;
    border-bottom: 2px solid #ffffff61;
    border-top: 1px solid #38d2f994; */
  transition: all 3s;
  user-select: none; 
}
.phone-body:hover {
    /* background-color: #f4e8de; */
}
.phone-outline:hover {
    /* box-shadow: 1px 1px 178px #00deff, 11px 90px 144px -42px #0fc8e026; */
}

.phone-screen-1 {
    background: #00000040;
    width: calc(100% - 36px);
    height: calc(100% - 36px);
    margin-left: 18px;
    margin-top: 18px;
    display: block;
    box-shadow: 0 0 6px 20px #d7d6d44d;
    border-radius: 6px;
    backdrop-filter: grayscale(1);
}

.phone-interface {
    /* background: linear-gradient(168deg, #00deff00 0%,#f4e8de63 49.7%,#00deff00 50.3%,#1ccae400 100%); */
  display: block;
  height: 100%;
  /* box-shadow: inset 1px 0px 100px #a1b6c6ad; */
}
.phone-interface form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  grid-gap: 2rem;
}

.phone-interface input {
  widht: 100%;
  font-size: 2rem;
  opacity: 0.6;
  border-radius: 0.5rem;
  border: 1px solid white;
  /* background: #ffffff73; */
  transition: all ease 0.4s;
  padding: 0.5rem;
  backdrop-filter: blur(16px);
text-align: center;
}
.phone-interface input:hover {
/*    box-shadow: 1px 1px 33px #00deff; */
  border: 1px solid #ffffff73;
  opacity: 0.9;
}
.phone-interface input:focus-visible {
   outline: none;
/* box-shadow: inset 1px 1px 13px 4px #ffffffb5; */
  background: #e9f8fab5;
  
}
.phone-greeting {
    color: white;
    font-size: 3rem;
    font-family: monospace;
    text-align: center;
  text-shadow: 1px 3px 5px #cbf7ff;
}
.phone-checkbox {
  height: 50px;
  filter: blur(78px);
}
.phone-checkbox:hover {
  height: 50px;
  filter: blur(0px);
}
.page-name {
  font-size: 2rem;
  color: white;
  font-family: monospace;
  display: flex;
    justify-content: space-around;
}
.page-policy {
  font-size: 1.2rem;
  color: white;
  font-family: monospace;
}
.page-footer {
 display: flex;
    justify-content: space-around;
    align-items: center;
}
.uk-text-danger {
    font-size: 2rem;
}
a {
    color: white;
}
a:hover {
    color: white;
    text-decoration: none;
    text-shadow: 1px 3px 5px #cbf7ff;
}
@media screen and (max-width: 800px) {
    .body-shop {
    grid-template-rows: auto 140px;
    align-items: center;
}
.phone-wrapper {
    padding-top: 0px;
}
.page-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}
.body-shop div {
    /* background: none; */
    border: none;
    box-shadow: none;
    
}
.body-shop > div {
    backdrop-filter: blur(12px);
    margin-left: 0px;
    margin-right: 0px;
    height: 100%;
    padding-top: 0px;
    width: 100%;
    max-height: 100%;
    
}
.phone-screen-1 {
    background: #00000040;
}
}
    </style>
</head>


<div class="body-shop">
  <div class="phone-wrapper">
    <div class="phone-outline">
      <div class="phone-body">
        <div class="phone-screen-1">
          <div class="phone-interface">
            <form id="login-form">
              <h3 class='phone-greeting'>Halo, 
@auth
{{ Auth::user()->name }}
@endauth
@guest
 2U!
@endguest
                </h3>
@guest 
            <input type='text' type="email" id="email" placeholder='email'/>
            <input type='password' type="password" id="password" placeholder='password'/>
            <input type='submit' name="login" value='Let me in, please!'/>
                
              <input class="phone-checkbox"  id='rememberme' type="checkbox" title='and remember me'>
              <div class="uk-margin uk-text-danger" id="wrong-credentials_error"></div>
@endguest
@auth
<h3 class='page-name'><a href="{{ route('eventor') }}">Enter</a> 
|| <a id='logout' href="#">Logout</a></h3>
@endauth
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-footer">
  @auth 
  <h5 class='page-name'><a href="{{ route('eventor') }}">Okkio.ru</a></h5>
  @endauth
  @guest
  <h5 class='page-name'>Okkio.ru</h5>
  @endguest
    <h6 class='page-policy'>Полититики конфиденциальности</h6>
  </div>
</div>
<script>
    class LoginHandler {
        static calling = false;
        constructor() {
            LoginHandler.calling = false;
            this.loginForm = document.getElementById('login-form');
            this.loginForm.addEventListener('submit', this.login.bind(this));
            this.loginMessage = document.getElementById('wrong-credentials_error');
        }

        validateEmail(emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                alert("Invalid email address.");
                return false;
            }
            return true;
        }

        async login(event) {
            event.preventDefault();
            if (LoginHandler.calling) {
                return;
            }
            LoginHandler.calling = true;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let remember =  document.getElementById('rememberme').checked;
console.log(remember);
            if (!this.validateEmail(email)) {
                this.loginMessage.innerHTML = "Email not valid!"
                return;
            };
            if (email.length < 6) {
                this.loginMessage.innerHTML = "Email too short!"
                return;
            };
            if (password.length < 1) {
                this.loginMessage.innerHTML = "Fill the password field!"
                return;
            };
            if (password.length < 5) {
                this.loginMessage.innerHTML = "Password too short!"
                return;
            };

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify({
                        'email' : email,
                        'password' : password,
                        'remember': remember
                    }),
                });

                if (!response.ok) {
                    // Handle error response from the server
                    const errorData = await response.json();
                    console.error('Login failed:', errorData.message);
                    this.loginMessage.innerHTML = errorData.message;
                    LoginHandler.calling = false;
                    return; // Stop the execution of the function
                }
                this.loginMessage.innerHTML = "";
                const data = await response.json();
                // Login successful, do something (e.g., set token, redirect, etc.)
                console.log('Login successful');
                //console.log('User token:', data.token); // Assuming the server returns a token
                document.querySelector('meta[name="csrf-token"]').content = data.token;
            
                //UIkit.modal('#login-modal').hide();
                            location.reload();
            } catch (error) {
                // Handle network-related errors or exceptions

                console.error('Error:', error.message);
                this.loginMessage.innerHTML = error.message;
            }
            setTimeout(() => {
                LoginHandler.calling = false;
            }, 5000);
        }
    }
    // Create an instance of the LoginHandler class
    const loginHandler = new LoginHandler();
    </script>



    @guest




	<?php // Register modal ?>
    <div id="register-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Registration</h2>
            <!-- Add your login form content here -->
            <form id="registration-form" class="uk-form-stacked">
                <div class="uk-margin">
                    <label class="uk-form-label" for="reg_email">Email:</label>
                    <input class="uk-input" type="email" id="reg_email" placeholder="Enter your email" required>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="name">Name:</label>
                    <input class="uk-input" type="text" id="name" placeholder="Enter your UserName">
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="reg_password">Password:</label>
                    <div class="uk-inline uk-width-1-1">
                        <input class="uk-input" type="password" id="reg_password" placeholder="Enter your password"
                            required>
                        <button class="uk-form-icon uk-form-icon-flip" id="password-toggle" type="button"
                            uk-icon="icon: unlock"></button>
                    </div>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="reg_confirm-password">Confirm Password:</label>
                    <input class="uk-input" type="password" id="reg_confirm-password"
                        placeholder="Confirm your password" required>
                </div>
                <div class="uk-text-danger" id="password-match-error"></div>
                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" type="submit">Register</button>
                </div>
            </form>
        </div>
    </div>



    <script>
    class RegisterHandler {
        static calling = false;
        constructor() {
            this.registrationForm = document.getElementById("registration-form");
            this.passwordInput = document.getElementById("reg_password");
            this.confirmPasswordInput = document.getElementById("reg_confirm-password");
            this.passwordMatchError = document.getElementById("password-match-error");
            RegisterHandler.calling = false;
            this.registrationForm.addEventListener("submit", this.onSubmit.bind(this));
        }

        onSubmit(event) {
            event.preventDefault();
            if (!this.validateEmail()) {
                return;
            }

            if (!this.checkPasswordMatch()) {
                this.passwordMatchError.textContent = "Passwords do not match.";
                return;
            } else {
                this.passwordMatchError.textContent = "";
            }

            // If all validations pass, submit the form to the server
            if (!RegisterHandler.calling) {
                RegisterHandler.calling = true;
                this.registerUser();
            }
        }

        validateEmail() {
            const emailInput = document.getElementById("reg_email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert("Invalid email address.");
                return false;
            }
            return true;
        }

        checkPasswordMatch() {
            if (this.passwordInput.value !== this.confirmPasswordInput.value) {
                return false;
            }
            return true;
        }

        async registerUser() {
            const email = document.getElementById("reg_email").value;
            const password = document.getElementById("reg_password").value;
            const name = document.getElementById('name').value;
            if (name.length < 6) {
                this.loginMessage.innerHTML = "Name is too short!";
                return;
            };
            if (!this.validateName(name)) {
                this.loginMessage.innerHTML = "Name is not valid!";
                return;
            }

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    }),
                });

                if (!response.ok) {
                    // Handle the server response for unsuccessful registration
                    const responseData = await response.json();
                    if (responseData.message == undefined) {
                        console.log(response);
                    }
                    alert('Registration failed: ' + responseData.message);
                } else {
                    // Registration successful, refresh the page
                    const responseData = await response.json();
                    if (responseData.message == undefined) {
                        console.log(response);
                    }
                    console.log('Registration message: ' + responseData.message);
                    if (responseData.code == 0) {
                        UIkit.modal('#register-modal').hide();
                        UIkit.modal.alert(responseData.message);
                    }
                    //location.reload();
                }
            } catch (error) {
                // Handle network-related errors or exceptions
                console.error('Error:', error.message);
            }
            setTimeout(() => {
                RegisterHandler.calling = false;
            }, 5000);
        }

        validateName() {
            const nameInput = document.getElementById("name");
            const nameRegex = /^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*(?: [A-Za-z0-9]+)?$/;

            if (!nameRegex.test(nameInput.value)) {
                alert("The name may only contain alphanumeric characters and a maximum of one underscore.");
                return false;
            }
            return true;
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        const registerHandler = new RegisterHandler();

        // Password visibility toggle
        const passwordToggle = document.getElementById("password-toggle");
        passwordToggle.addEventListener("click", function() {
            registerHandler.togglePasswordVisibility();
        });
    });

    RegisterHandler.prototype.togglePasswordVisibility = function() {
        const passwordIcon = document.querySelector("#reg_password ~ .uk-form-icon");

        if (this.passwordInput.type === "password") {
            this.passwordInput.type = "text";
            this.confirmPasswordInput.type = "text";
            passwordIcon.setAttribute("uk-icon", "icon: lock-open");
        } else {
            this.passwordInput.type = "password";
            this.confirmPasswordInput.type = "password";
            passwordIcon.setAttribute("uk-icon", "icon: unlock");
        }
    };

    const regHandler = new RegisterHandler();
    </script>

    @endguest

    @auth

    <script>
    class LogoutHandler {
        constructor() {
            this.logout = document.getElementById("logout");
            this.logout.addEventListener("click", this.exit);
        }

        async exit() {
            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                });

                if (!response.ok) {
                    // Handle the server response for unsuccessful registration
                    const responseData = await response.json();
                    if (responseData.message == undefined) {
                        console.log(response);
                        UIkit.modal.alert(responseData.message);
                    }

                } else {
                    // Registration successful, refresh the page
                    const responseData = await response.json();
                    if (responseData.message == undefined) {
                        console.log(response);
                    }
                    if (responseData.code == 0) {
                        //UIkit.modal.alert(responseData.message);
                        setTimeout(() => {
                            location.reload();
                        }, 200);
                    }
                }
            } catch (error) {
                // Handle network-related errors or exceptions
                console.error('Error:', error.message);
            }
        }
    }
    const loghan = new LogoutHandler();
    </script>
    @endauth
    <!-- Add your JavaScript files here -->
    <script src="{{ asset('resources/js/uikit.js') }}"></script>
    <script src="{{ asset('resources/js/uikit-icons.js') }}"></script>

    @yield('page-scripts')

    <!-- Add more JavaScript files if needed -->
    <script>
    </script>
   

    <script src="{{ asset('resources/js/apps/eventor/page.js') }}"></script>




    <script>

        
    </script>
</body>

</html>