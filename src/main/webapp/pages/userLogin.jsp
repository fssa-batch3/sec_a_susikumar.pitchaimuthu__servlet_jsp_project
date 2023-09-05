<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>freshnest login</title>
<link rel="stylesheet" href="./assets/css/login.css" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
</head>
<body>
<section class="login-section">
		<div class="whole-container">
			<div class="welcome-container">
				<h1 class="welcome-head">welcome to Fresh Nest</h1>

				<p class="login-paragraph">Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Eveniet, itaque accusantium odio,
					soluta, corrupti aliquam quibusdam tempora at cupiditate quis eum
					maiores libero veritatis? Dicta facilis sint aliquid ipsum atque?</p>
			</div>
			<div class="login-container">
				<div class="login-inside-container">
					<h2 class="sign-in-head">Sign In</h2>

					<form id="form" action="login" method="post">
						<div class="input-container">
							<div>
								<label class="label"> <input type="email" class="input"
									id="inputemail" name="email" autocomplete="off"
									placeholder="&nbsp;" required /> <span class="placeholder">Email
										ID <span class="mandatory">*</span>
								</span></label>
							</div>

							<div class="password-input">
								<label class="label"> <input type="password"
									class="input" id="password" name="password"
									placeholder="&nbsp;" autocomplete="off" required /> <span
									class="placeholder">Password <span class="mandatory">*</span>
								</span></label>
								<div class="eye-slash-div">
									<i class="bi bi-eye-slash"></i>
								</div>
							</div>

							<div class="remember-and-forget-password-div">
								<div class="remember-me-div">
									<input class="check-box" type="checkbox" />
									<p class="remember">Remember me</p>
								</div>

								<div class="forget-password-div">
									<a href="" class="forget">Forgot password</a>
								</div>
							</div>
						</div>

						<div class="button-error-container">
							<div>
								<h3></h3>
							</div>
							<div class="button-div">
								<button class="login-button" type="submit">Log in</button>
							</div>
						</div>
					</form>

					<div class="or-div">
						<p>-----------------------</p>
						<span>OR</span>
						<p>-----------------------</p>
					</div>

					<div class="button-content-container">
						<div>
							<h3>Sign in with</h3>
						</div>
						<div class="button-container">
							<button class="sign-button">
								<i class="fa fa-twitter fa-2x"></i>
							</button>
							<button class="sign-button">
								<i class="fa fa-google fa-2x"></i>
							</button>
							<button class="sign-button">
								<i class="fa fa-facebook fa-2x"></i>
							</button>
						</div>
					</div>

					<div class="sign-up-div">
						<h4 class="sign-up-link">
							Don't have an account? <a href="./pages/register.jsp"><span>Register
									here</span></a>
						</h4>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>