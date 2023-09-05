<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>freshnest register</title>
    <link rel="stylesheet" href="../assets/css/login.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    />
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
					<h2 class="sign-in-head">Sign Up</h2>

					<form id="form" action="../register" method="post">
						<div class="input-container">
							<div>
								<label class="label" for="firstname"> <input type="text"
									class="input" id="firstname" name="firstname"
									autocomplete="off" pattern="[a-zA-Z]+"
									title="First name is required" placeholder="&nbsp;" required />
									<span class="placeholder">First
										name <span class="mandatory">*</span>
								</span>
								</label>
							</div>

							<div>
								<label class="label" for="lastname"> <input type="text"
									id="lastname" class="input" name="lastname" pattern="[a-zA-Z]+"
									autocomplete="off" placeholder="&nbsp;" required />
									<span class="placeholder">Last
										name <span class="mandatory">*</span>
								</span></label>
							</div>

							<div>
								<label class="label" for="username"> <input type="text"
									id="username" class="input" name="username" autocomplete="off"
									placeholder="&nbsp;" required /> <span
									class="placeholder">User name <span
										class="mandatory">*</span>
								</span></label>
							</div>

							<div>
								<label class="label" for="email"> <input type="email"
									id="email" class="input" name="email" autocomplete="off"
									placeholder="&nbsp;" required /> <span
									class="placeholder">Email ID <span
										class="mandatory">*</span>
								</span></label>
							</div>
							<div class="password-input">
								<label class="label password-label" for="password"> <input
									type="password" id="password" class="input" name="password"
									pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
									autocomplete="off" placeholder="&nbsp;" required />

									<span class="placeholder">Password
										<span class="mandatory">*</span>
								</span></label>
								<div class="eye-slash-div">
									<i class="bi bi-eye-slash"></i>
								</div>
							</div>

							<div class="password-strength-div">
								<div class="hr-div">
									<hr class="hr" />
								</div>

								<div class="strength-content-div">
									<span class="emoji-span"> </span>
									<p class="password-content"></p>
								</div>
							</div>
						</div>

						<div class="button-error-container">
							<div>
								<h3></h3>
							</div>
							<div class="button-div">
								<button class="login-button" type="submit">Next</button>
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
							<h3>Sign with</h3>
						</div>
						<div class="button-container">
							<button class="sign-button">
								<i class="fa fa-twitter fa-2x"></i>
							</button>
							<button class="sign-button google-button">
								<i class="fa fa-google fa-2x"></i>
							</button>
							<button class="sign-button">
								<i class="fa fa-facebook fa-2x"></i>
							</button>
						</div>
					</div>

					<div class="sign-up-div">
						<h4 class="sign-up-link">
							Already have an account? <a href="./pages/logIn.html"><span>Log
									in here</span></a>
						</h4>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>