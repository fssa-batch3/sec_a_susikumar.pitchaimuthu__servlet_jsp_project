<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>feshnest profile</title>

<link rel="stylesheet" href="./assets/css/profile.css" />
<link rel="stylesheet" href="./assets/css/button.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css" />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap"
	rel="stylesheet" />

<style>
@import
	url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap")
	;
</style>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

</head>
<body>
	<div class="whole-section-div-container">
		<div class="background-image-and-card-div-container">
			<div class="background-div">
				<!-- top content -->
				<div class="top-content-div">
					<div class="user-profile-div">
						<p>USER PROFILE</p>
					</div>
					<div class="top-user-div">
						<img class="top-user-div-image"
							src="../assets/images/Profile/chat.png" alt="user-profile" />
						<p>Notification</p>
					</div>
				</div>

				<!-- center content -->
				<div class="profile-and-content-div">
					<div class="our-static-bio-div">
						<h1 id="profile-head"></h1>
						<p>This is your profile image.you can see the your's activity
							and you can modify yours profile bio and settings.</p>

						<a href="ProfileEditServlet"><button
								class="hero-section-button">Edit Profile</button></a>
					</div>
					<!-- user main profile -->
				</div>
			</div>

			<!-- accont information -->

			<div class="user-last-activity-and-profile-div-container">
				<div class="user-profile-last-activity-inside-container">
					<div class="user-last-activity-showing-div-container">
						<div class="user-last-acitivty-inside-div">
							<div class="activity-head-div">
								<button class="suggestion-head">Suggested friends</button>

								<button class="activity-head">Your activities</button>

								<h4></h4>
							</div>
							<div class="user-last-acitivty-inside-div">
								<div class="card-inside-control-div">
									<c:forEach var="user" items="${userList}">
										<div class="card-div-container">
											<div class="card-inside-div">
												<div class="user-activity-image-div">
													<img class="activity-image" src="${user.profileImage}"
														alt="activity-image" />
												</div>

												<div class="user-activity-name-div">
													<div class="user-name-div">
														<h3 class="user-name">${user.username}</h3>
													</div>

													<div class="user-theme-div">
														<p class="user-theme">${user.userTheme}</p>
													</div>
												</div>

												<div>
													<button class="connect-button" id="${user.userId}">View</button>
												</div>
											</div>
										</div>
									</c:forEach>
								</div>
							</div>

						</div>
					</div>

					<!-- user profile card -->

						<div class="profile-card-div">
							<div class="profile-card-content-div">
								<!-- profile -->
								<div class="profile-connect-message-div">
									<div class="profile-image-div">
										<img id="profile-image" src="${userDetails.profileImage}"
											alt="profile-image" />


										<div class="profile-option-div" style="display: none">
											<div class="profile-option-inside-div">
												<div class="change-profile-div">
													<input type="file" id="file" /> <label for="file"
														class="choose-photo">Change profile</label>
												</div>

												<div class="default-button-div">
													<button class="default-button">Default Profile</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- friends -->

								<div class="user-experience-and-details-div">
									<div class="user-experience-inside-div-container">
										<div class="user-experience-div">
											<div class="user-experience-inside-div">
												<div class="friends-div">
													<h2 class="user-h2">22</h2>
													<p class="user-para">Friends</p>
												</div>
												<div class="photos-div">
													<h2 class="user-h2">143</h2>
													<p class="user-para">Photos</p>
												</div>
												<div class="videos-div">
													<h2 class="user-h2">33</h2>
													<p class="user-para">Videos</p>
												</div>
											</div>
										</div>

										<!-- user details div container -->

										<div class="user-details-div-container">
											<div class="details-head-div">
												<h2>Details</h2>
											</div>
											<div class="user-details-inside-div">
												<div class="each-details-div">
													<div class="details-option-head-div">
														<h4>Name</h4>
													</div>
													<div class="details-div">
														<p class="userName">${userDetails.username}</p>
													</div>
												</div>

												<div class="each-details-div">
													<div class="details-option-head-div">
														<h4>Bio</h4>
													</div>
													<div class="details-div">
														<p class="user-theme">${userDetails.userTheme}</p>
													</div>
												</div>
												<div class="each-details-div">
													<div class="details-option-head-div">
														<h4>Age</h4>
													</div>
													<div class="details-div">
														<p class="age-para">${userDetails.age}</p>
													</div>
												</div>
												<div class="each-details-div">
													<div class="details-option-head-div">
														<h4>City</h4>
													</div>
													<div class="details-div">
														<p class="city-para">${userDetails.nationality}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>

		<!-- user clicking details showing div -->

		<div class="clicking-card-whole-container">
			<div class="clicking-inside-div-container"></div>
		</div>
	</div>

</body>
</html>