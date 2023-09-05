
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<nav class="sidebar close">
	<header>
		<!-- Display user details in your navigation menu -->
		<div class="image-text">
			<a href="./profile"> <span class="image"> <img
					id="profile-image" src="" alt="profile-image" />
			</span></a>
			<div class="text logo-text">
				<span class="name"></span> <span class="profession"></span>
			</div>
		</div>
		<i class="bx bx-chevron-right toggle"></i>

	</header>
	<div class="menu-bar">
		<div class="menu">
			<ul class="menu-links">
				<a href="./home.jsp">
					<li class="nav-link" id="home"><i
						class="bi bi-person-badge-fill icon"></i> <span
						class="text nav-text">Dashboard</span></li>
				</a>
				<li class="nav-link" id="chat"><i class="bi bi-chat-right icon"></i>
					<span class="text nav-text">freshChat</span></li>

				<a href="FreshStillServlet">
					<li class="nav-link" id="camera"><i class="bi bi-camera icon"></i>
						<span class="text nav-text">fresh cam</span></li>
				</a>

				<a href="./pages/invite.jsp">
					<li class="nav-link" id="invite"><i
						class="fa-brands fa-battle-net icon"></i> <span
						class="text nav-text">fresh invite</span></li>
				</a>
				<li class="nav-link" id="notification"><i
					class="bx bx-bell icon"></i>
					<p class="notification-para"></p> <span class="text nav-text">Notification</span>
				</li>

				<a href="./setting.html">
					<li class="nav-link" id="setting"><i class="bi bi-gear icon"></i>
						<span class="text nav-text">Setting</span></li>
				</a>
			</ul>
		</div>

		<ul class="bottom-content">
			<a href="./LogoutServlet">
				<li class="logOut"><i class="bx bx-log-out icon"></i> <span
					class="text nav-text">Logout</span></li>
			</a>

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

