<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>fresh invite</title>

<link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />

    <!----===== Boxicons CSS ===== -->
    <link
      href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
      rel="stylesheet"
    />
    <script
      src="https://kit.fontawesome.com/a06ff6477a.js"
      crossorigin="anonymous"
    ></script>
<link rel="stylesheet" href="./style.css" />
<link rel="stylesheet" href="./invite.css" />
</head>
<body>
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
						<i class="bx bx-moon icon moon"></i> <i class="bx bx-sun icon sun"></i>
					</div> <span class="mode-text text">Dark mode</span>

					<div class="toggle-switch">
						<span class="switch"></span>
					</div>
				</li>
			</ul>
		</div>
	</nav>
	<section class="section-container">
		<section class="section-user-invite-section">
			<!-- invite section mantain inside div -->

			<div class="invitation-inside-control-div">
				<!-- invitation-showing-area -->

				<div class="invitation-showing-area-container"></div>

				<!-- invite adding -->

				<div class="invite-adding-div-container">
					<div class="invite-inside-div-container">
						<div class="invite-div">
							<i class="bi bi-plus-square-dotted"></i>
						</div>
						<div class="add-invite-head-div">
							<p class="add-invite-head">Add Invite</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="invite-details-div-container-section">
			<!-- Other user invites showing box -->
			<div class="invite-and-details-showing-container">
				<div class="invite-and-details-showing-inside-container">
					<!-- search filer div -->
					<div class="invite-page-search-filter-div">
						<div class="invite-page-inside-search-filter-div">
							<input class="search-input" type="text" />
							<button class="search-button">
								<i class="bi bi-search"></i>
							</button>
						</div>
					</div>
					<!-- invites showing container -->

					<div class="friends-inside-invite-and-details-showing-container">
						<!-- Here creating element if the user didn't add any invite it will show -->
					</div>
				</div>
			</div>
			<div class="hr-bar-div">
				<hr />
			</div>

			<!-- details showing container -->

			<div class="invite-details-showing-container"></div>
		</section>
	</section>
</body>
</html>