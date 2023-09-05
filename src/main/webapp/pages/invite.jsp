<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ page import="com.fssa.freshnest.model.Invite"%>
<%@ page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>fresh invite</title>
<link rel="stylesheet" href="../assets/css/style.css" />
<link rel="stylesheet" href="../assets/css/invite.css" />

<!-- bootstrap link -->

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />

<!----===== Boxicons CSS ===== -->
<link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
	rel="stylesheet" />
<script src="https://kit.fontawesome.com/a06ff6477a.js"
	crossorigin="anonymous"></script>
</head>
<body>
	<jsp:include page="navbar.jsp"></jsp:include>
	<section class="section-container">
		<section class="section-user-invite-section">
			<div class="invitation-inside-control-div">
				<div class="invitation-showing-area-container"></div>
				<a href="./inviteAdd.jsp">
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
				</a>
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
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<script src="https://momentjs.com/downloads/moment.js"
		integrity="sha384-mFSRsfjTuXtihSLc/J0LxrFE1H9WRRllwGM6pxxyiYACkVdxRG82d3DQVlq8yXZM"
		crossorigin="anonymous"></script>
    <script src="../assets/js/profile_user_find.js"></script>		
	<script src="../assets/js/easy_pie_chart.js"></script>
	<script src="../assets/js/fresh_invite.js"></script>
    <script src="../assets/js/user_friends_invite.js"></script>
    
	
</body>
</html>