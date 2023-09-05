<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.fssa.freshnest.model.User"%>
<%@ page import="java.util.List"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>freshnest home</title>

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

<script src="https://kit.fontawesome.com/a06ff6477a.js"
	crossorigin="anonymous"></script>

<link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
	rel="stylesheet" />

<!-- css links -->
<link rel="stylesheet" href="./style.css" />
<link rel="stylesheet" href="./home.css" />
</head>
<body>
	<section class="navbar-home-page-container">
		<nav class="sidebar close">
			<header>


				<div class="image-text">



					<span class="image"> <img id="profile-image" src=""
						alt="profile-image" />
					</span>

					<div class="text logo-text">
						<span class="name">Codinglab</span> <span class="profession">Web
							developer</span>
					</div>
				</div>

				<i class="bx bx-chevron-right toggle"></i>
			</header>

			<div class="menu-bar">
				<div class="menu">
					<ul class="menu-links">
						<li class="nav-link" id="home"><i
							class="bi bi-person-badge-fill icon"></i> <span
							class="text nav-text">Dashboard</span></li>

						<li class="nav-link" id="chat"><i
							class="bi bi-chat-right icon"></i> <span class="text nav-text">freshChat</span>
						</li>

						<li class="nav-link" id="camera"><i class="bi bi-camera icon"></i>
							<span class="text nav-text">fresh cam</span></li>

						<li class="nav-link" id="invite"><i
							class="fa-brands fa-battle-net icon"></i> <span
							class="text nav-text">fresh invite</span></li>

						<li class="nav-link" id="notification"><i
							class="bx bx-bell icon"></i>
							<p class="notification-para"></p> <span class="text nav-text">Notification</span>
						</li>

						<li class="nav-link" id="setting"><i class="bi bi-gear icon"></i>
							<span class="text nav-text">Setting</span></li>
					</ul>
				</div>

				<ul class="bottom-content">
					<li class="logOut"><i class="bx bx-log-out icon"></i> <span
						class="text nav-text">Logout</span></li>

					<li class="mode">
						<div class="sun-moon">
							<i class="bx bx-moon icon moon"></i> <i
								class="bx bx-sun icon sun"></i>
						</div> <span class="mode-text text">Dark mode</span>

						<div class="toggle-switch">
							<span class="switch"></span>
						</div>
					</li>
				</ul>
			</div>
		</nav>

		<section class="search-bar-div-whole-container">
			<div class="search-bar-container">
				<div class="search-bar-div">
					<input class="search-input" type="text"
						placeholder="Search your friend" />

					<button class="search-button">
						<i class="bi bi-search"></i>
					</button>
				</div>
			</div>

			<!-- section container to show all user to make friends -->
			<section class="whole-section-container">
				<div class="section-inside-container-div">
					<div class="section-inside-container">
						<div class="all-user-showing-div-container">
							<div class="all-user-showing-inside-div">
								<!-- Loop through the user list and generate user cards -->
								<%
								List<User> userList = (List<User>) session.getAttribute("userList");
								if (userList != null && !userList.isEmpty()) {
									for (User user : userList) {
								%>
								<div class="user-card-container" id="<%=user.getUserId()%>">
									<div class="user-card">
										<div class="user-card-inside-div">
											<div class="tiny-image-content-container">
												<div class="tiny-profile-div">
													<img alt="user-profile" class="tiny-image"
														src="<%=user.getProfileImage()%>">
												</div>
												<div class="tiny-content-container">
													<h3 class="tiny-name"><%=user.getUsername()%></h3>
													<p class="tiny-para"><%=user.getUserTheme()%></p>
												</div>
												<div class="view-button-div">
													<button class="view" id="<%=user.getUserId()%>">view</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<%
								}
								} else {
								%>
								<p>No users available.</p>
								<%
								}
								%>
							</div>
						</div>
					</div>

					<!-- details showing div container -->

					<div class="details-showing-container"></div>
				</div>
			</section>
		</section>
	</section>
</body>
</html>

