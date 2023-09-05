<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.fssa.freshnest.model.User"%>
<%@ page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


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
<link rel="stylesheet" href="./assets/css/homepage.css" />
<link rel="stylesheet" href="./assets/css/style.css" />
</head>
<body>
	<section class="navbar-home-page-container">
		<jsp:include page="navbar.jsp"></jsp:include>

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
							
							</div>
						</div>
					</div>
					<!-- details showing div container -->
					<div class="details-showing-container"></div>
				</div>
			</section>

		</section>
	</section>
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
	 <script src="./assets/js/side-bar.js"></script>
	 <script src="./assets/js/profile_user_find.js"></script>
	<script src="./assets/js/home.js"></script>
	<script src="./assets/js/userHomeSearchFilter.js"></script>
	

</body>
</html>

