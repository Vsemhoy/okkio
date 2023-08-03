<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A new Super Laravel App</title>

    <!-- Add your CSS files here -->

    <link rel="stylesheet" href="{{ asset('resources/css/uikit.min.css') }}">
    <!-- Add more CSS files if needed -->

    <style>
    .uk-navbar-container .uk-navbar-item {
        height: 40px !important;
        background: red;
    }

    .th-navbar {
        /* display: grid;
            grid-template-columns: 120px auto 120px; */
        display: flex;
        justify-content: space-between;
        z-index: 9;
    }

    .th-navbar>div {

        display: flex;
        justify-content: space-around;
    }

    .th-navbar>div>* {}

    .th-navbar-item {
        vertical-align: middle;
        font-size: 1.2rem;
        text-align: center;
        padding: 6px;
        min-width: 42px;
        transition: all ease 0.2s;
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;
    }

    .th-navbar-item a {
        color: gray;
    }

    .th-navbar-item:hover {
        cursor: pointer;
        /* background-color: #fff;
        box-shadow: 0 5px 12px rgba(0, 0, 0, .15); */
        border-right: 1px solid #dfdfdf;
        border-left: 1px solid #dfdfdf;
    }

    .th-navbar-item-dd:hover {
        /* margin-bottom: -6px; */
    }

    .th-navbar-item-dd .th-navbar-item:hover a {
        color: #039BE5;
    }
.th-central-search, .th-central-menu {
    width: -webkit-fill-available;
}
.th-central-search {
    padding: 3px 12px;
}
.th-central-search input {

}
.th-search-wrap {
    display: flex;
    border-radius: 6px;
    border: 1px solid #dfdfdf;
    background: white;
    overflow: hidden;
    width: 100%;
}
.th-search-wrap * {
    border:none;
    background: white;
    height: 31px;
    color: gray;
}
.th-search-wrap button:hover * {
    color: black;
    cursor: pointer;
}

    .menu-minimized .th-col-sidenav {
        width: 60px !important;
    }

    .th-col-sidenav {
        background-color: rgba(0, 122, 193, 0.82);
        box-shadow: rgb(0 54 108 / 70%) 0px 0px 200px inset !important;
    }

    .th-col-sidenav {
        overflow: auto;
        float: left;
        background-color: rgba(0, 122, 193, 0.82);
        position: fixed;
        z-index: 1;
        transition: all ease 0.3s;
        overflow: hidden;
        box-shadow: rgba(0, 54, 108, 0.7) 0px 0px 200px inset;
        height: 100vh;
        width: 46px;
        top: 0px;
        backdrop-filter: blur(3px);
    }

    .menu-minimized .th-nav-rail {
        position: fixed;
        height: 100vh;
        margin-left: 0px;
        width: 8px !important;
        padding: 0px;
        top: 0px;
    }

    .th-nav-rail {
        position: fixed;
        z-index: 26;
        transition: all ease 0.3s;
        padding: 0px;
        opacity: 0;
        cursor: pointer;
        background: rgb(255 0 0 / 32%);
        height: 100vh;
        left: 0px;
        width: 6px;
    }
    .th-nav-rail:hover {
        opacity: 1;
    }
    
    .col-main {
        width: 100%;
        float: left;
        margin-left: 0px;
    }
    .th-sidenav-show .col-main {
        width: calc(100% - 61px);
        float: left;
        margin-left: 60px;
    }
    .th-sidenav-trigger,  .th-col-sidenav ,  .th-nav-rail {
        display: none;
    }
    .th-sidenav-show .th-sidenav-trigger, .th-sidenav-show .th-col-sidenav , .th-sidenav-show .th-nav-rail {
        display: block;
    }
    .th-sidebar-opened .th-col-sidenav {
            width: 260px;
        }
    @media only screen and (max-width: 992px) {
        .th-col-sidenav {
            margin-left: -46px;
        }
        .col-main {
            width: 100%;
            margin-left: 0px;
        }
        .th-sidebar-opened .th-col-sidenav {
            margin-left: 0px !important;
            width: 260px !important;
        }
    }



    .flex-column {
        flex-direction: column !important;
    }

    .nav-link {
        display: block;
        padding: 6px 12px 6px 12px;
        text-decoration: none;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
        color: rgb(221, 221, 221);
    }

    .menu-minimized .icon-square {
        display: block;
    }

    .icon-square {
        font-size: large;
        text-align: center;
        width: 32px;
        padding-right: 6px;
    }
    </style>
</head>

<body class='th-sidenav-show'>


    <!-- Offcanvas Menu -->
    <div id="offcanvas-nav" uk-offcanvas="mode: slide; overlay: true; flip: true">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <h5 class='uk-text-title'>Applications:</h5>
            <!-- Add your offcanvas menu content here -->
            <ul class="uk-nav uk-nav-default">
                <li class="{{ Request::routeIs('budget') ? 'uk-active' : '' }}"><a
                        href="{{ route('budget') }}">Budget</a></li>
                <li class="{{ Request::routeIs('eventor') ? 'uk-active' : '' }}"><a
                        href="{{ route('eventor') }}">Eventor</a></li>
                <!-- Add more menu items if needed -->
            </ul>
        </div>
    </div>

    <!-- Navbar -->
    <nav class="uk-navbar-container uk-margin-none th-navbar" uk-navbar>
        <div>
            <div class='th-navbar-item th-sidenav-trigger' style='padding-left: 1px; padding-right: 1px;'>
                <a class="" href="#offcanvas-nav2">
                    <span uk-navbar-toggle-icon></span>
                </a>
            </div>
        </div>
        <div class='th-central-menu'>
            <div class='th-navbar-item'>
                First hfghfd dasfj asdjkfhjkashdjfk sajdhfjashdjkfs
            </div>
        </div>
        <div class='th-central-search uk-hidden'>
            <div class='uk-form-custom th-search-wrap uk-box-shadow-hover-medium'>
                <input class="uk-input" type="text" placeholder="Input" aria-label="Input" id='th_searchArea'>
                <button type="button" id='th_topSearch'><span uk-icon="search"></span></button>
                <button type="button" id='th_searchClose'><span uk-icon="close" ></span></button>

            </div>
            <div uk-form-custom="target: true">
               
            </div>

        </div>
        <div>
            <div class='th-navbar-item' id='th_topSearchTrigger'>
                <a class="" href="#">
                    <span uk-icon="search"></span>
                </a>
            </div>
            <div class='th-navbar-item th-navbar-item-dd'>
                <a class=""  href="#">
                    <span uk-icon="user"></span>
                </a>
                <div class="uk-navbar-dropdown">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active" uk-toggle="target: #register-modal"><a href="#">Registration</a></li>
                        <li><a href="#" uk-toggle="target: #login-modal">Login</a></li>
                        <li><a href="#">Logout</a></li>
                        <li><a href="#">Account settings</a></li>
                        <li><a href="#">Terms of service</a></li>
                    </ul>
                </div>
            </div>
            <div class='th-navbar-item'>
                <a class="" href="#offcanvas-nav" uk-toggle>
                    <span uk-icon='grid'></span>
                </a>
            </div>
        </div>

    </nav>



    <div class="uk-width-1-1 "><a href="http://new.teftele.com/logout?token=qgH8Z217juVMgHxL5uo84paIhBOBtHSzIayDwmYy"
            class="app-item login-btn">

        </a>
        <nav id="sidebarMenu" class="th-col-sidenav uk-background-muted"><a
                href="http://new.teftele.com/logout?token=qgH8Z217juVMgHxL5uo84paIhBOBtHSzIayDwmYy"
                class="app-item login-btn">
            </a>
            <div class="position-sticky pt-3"><a
                    href="http://new.teftele.com/logout?token=qgH8Z217juVMgHxL5uo84paIhBOBtHSzIayDwmYy"
                    class="app-item login-btn">
                </a><a class="uk-navbar-toggle " id="leftSidenavToggler2" style="justify-items: none;">
                    <div class="uk-width-1-1 " style="padding: 3px;">
                        <span uk-navbar-toggle-icon="" class="uk-icon uk-navbar-toggle-icon"><svg width="20" height="20"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <style>
                                .uk-navbar-toggle-animate svg &gt;

                                [class*='line-'] {
                                    transition: 0.2s ease-in-out;
                                    transition-property: transform, opacity, ;
                                    transform-origin: center;
                                    opacity: 1;
                                }

                                .uk-navbar-toggle svg &gt;

                                .line-3 {
                                    opacity: 0;
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-3 {
                                    opacity: 1;
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-2 {
                                    transform: rotate(45deg);
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-3 {
                                    transform: rotate(-45deg);
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;
                                .line-1,
                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-4 {
                                    opacity: 0;
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-1 {
                                    transform: translateY(6px) scaleX(0);
                                }

                                .uk-navbar-toggle-animate[aria-expanded="true"] svg &gt;

                                .line-4 {
                                    transform: translateY(-6px) scaleX(0);
                                }
                                </style>
                                <rect class="line-1" y="3" width="20" height="2"></rect>
                                <rect class="line-2" y="9" width="20" height="2"></rect>
                                <rect class="line-3" y="9" width="20" height="2"></rect>
                                <rect class="line-4" y="15" width="20" height="2"></rect>
                            </svg></span>
                    </div>
                </a>
                <br>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="http://new.teftele.com/budger">
                            <span class="icon-square">
                                MA </span>
                            <span data-feather="home" class="align-text-bottom"></span>
                            <span class="sitem-text">
                                Main </span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="http://new.teftele.com/budger/accmanager">
                            <span class="icon-square">
                                BS </span>
                            <span data-feather="home" class="align-text-bottom"></span>
                            <span class="sitem-text">
                                Account manager </span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="http://new.teftele.com/budger/catmanager">
                            <span class="icon-square">
                                GM </span>
                            <span data-feather="home" class="align-text-bottom"></span>
                            <span class="sitem-text">
                                Category Manager </span>
                        </a>
                    </li>
                </ul>
                <div class="sidebar-heading uk-padding-x-small uk-text-uppercase uk-text-medium">
                    <span class="nav-divider-text">Statistics:</span>
                    <span class="nav-divider-icon"><i class="bi-dot uk-icon" uk-icon="icon: flickr" title="ST"><svg
                                width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5.5" cy="9.5" r="3.5"></circle>
                                <circle cx="14.5" cy="9.5" r="3.5"></circle>
                            </svg></i></span>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="http://new.teftele.com/budger/commstat">
                            <span class="icon-square">
                                CS </span>
                            <span data-feather="home" class="align-text-bottom"></span>
                            <span class="sitem-text">
                                Common stat </span>
                        </a>
                    </li>
                </ul>






            </div>
        </nav>

        <div id="navRail" class="th-nav-rail th-sidenav-trigger">
        </div>

        <main class="col-main ms-sm-auto p-0" id="mainWrapper">
            <!-- Your page content goes here -->
            <div class="uk-expand">
                @yield('content')
            </div>

        </main>
    </div>




    </div>


    <!-- Login Modal -->
    <div id="login-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Login</h2>
            <!-- Add your login form content here -->
            <form>
                <div class="uk-margin">
                    <label class="uk-form-label" for="email">Email:</label>
                    <input class="uk-input" type="email" id="email" placeholder="Enter your email">
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="password">Password:</label>
                    <input class="uk-input" type="password" id="password" placeholder="Enter your password">
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Login Modal -->
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
                    <label class="uk-form-label" for="reg_password">Password:</label>
                    <div class="uk-inline uk-width-1-1">
                        <input class="uk-input" type="password" id="reg_password" placeholder="Enter your password"
                            required>
                        <button class="uk-form-icon uk-form-icon-flip" onclick="togglePasswordVisibility()"
                            type="button" uk-icon="icon: unlock"></button>
                    </div>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="reg_confirm-password">Confirm Password:</label>
                    <input class="uk-input" type="password" id="reg_confirm-password"
                        placeholder="Confirm your password" required>
                </div>
                <div class="uk-margin uk-text-danger" id="password-match-error"></div>
                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" type="submit">Register</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Add your JavaScript files here -->
    <script src="{{ asset('resources/js/uikit.js') }}"></script>
    <script src="{{ asset('resources/js/uikit-icons.js') }}"></script>
    <!-- Add more JavaScript files if needed -->

    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const registrationForm = document.getElementById("registration-form");
        const passwordInput = document.getElementById("reg_password");
        const confirmPasswordInput = document.getElementById("reg_confirm-password");
        const passwordMatchError = document.getElementById("password-match-error");

        registrationForm.addEventListener("submit", function(event) {
            event.preventDefault();
            if (!validateEmail()) {
                return;
            }

            if (!checkPasswordMatch()) {
                passwordMatchError.textContent = "Passwords do not match.";
                return;
            } else {
                passwordMatchError.textContent = "";
            }

            // If all validations pass, submit the form to the server
            registrationForm.submit();
        });

        function validateEmail() {
            const emailInput = document.getElementById("reg_email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert("Invalid email address.");
                return false;
            }
            return true;
        }

        function checkPasswordMatch() {
            if (passwordInput.value !== confirmPasswordInput.value) {
                return false;
            }
            return true;
        }
    });

    function togglePasswordVisibility() {
        const passwordInput = document.getElementById("reg_password");
        const passwordInput2 = document.getElementById("reg_confirm-password");
        const passwordIcon = document.querySelector("#reg_password ~ .uk-form-icon");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordInput2.type = "text";
            passwordIcon.setAttribute("uk-icon", "icon: lock-open");

        } else {
            passwordInput.type = "password";
            passwordInput2.type = "password";
            passwordIcon.setAttribute("uk-icon", "icon: unlock");
        }
    }


    class SearchBar {
        constructor(){
            this.cst       = document.querySelector("#th_topSearchTrigger");
            this.searchbar = document.querySelector(".th-central-search");
            this.menubar   = document.querySelector(".th-central-menu");
            this.closearch = document.querySelector("#th_searchClose");

            
            this.cst.addEventListener('click', (e) => {
                e.preventDefault;
                this.trigSearchBar();         
            });
            this.closearch.addEventListener('click', (e) => {
                e.preventDefault;
                this.trigSearchBar();         
            });
        }

        trigSearchBar(){
            if (this.searchbar.classList.contains('uk-hidden')){
                this.searchbar.classList.remove('uk-hidden');
                this.menubar.classList.add('uk-hidden');
                this.cst.classList.add('uk-hidden');
                    
                } else {
                    this.searchbar.classList.add('uk-hidden');
                    this.menubar.classList.remove('uk-hidden');
                    this.cst.classList.remove('uk-hidden');
                }
        }
    }


    class SideNav {
        constructor(){
            this.body      = document.querySelector("body");
            this.triggers  = document.querySelectorAll(".th-sidenav-trigger");

            this.triggers.forEach((el)=> {
                el.addEventListener('click', (e) => {
                e.preventDefault;
               this.body.classList.toggle('th-sidebar-opened');       
            });
            });


        }

        trigSearchBar(){
            if (this.searchbar.classList.contains('uk-hidden')){
                this.searchbar.classList.remove('uk-hidden');
                this.menubar.classList.add('uk-hidden');
                this.cst.classList.add('uk-hidden');
                    
                } else {
                    this.searchbar.classList.add('uk-hidden');
                    this.menubar.classList.remove('uk-hidden');
                    this.cst.classList.remove('uk-hidden');
                }
        }
    }

    $sb = new SearchBar();
    $sn = new SideNav();
    </script>
</body>

</html>