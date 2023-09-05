<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Profile details page</title>
<link rel="stylesheet" href="./assets/css/profileEditPage.css" />

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
	crossorigin="anonymous" />

</head>
<body>
	<!-- section for the profile showing -->

	<section class="common-section-container">

			<!-- profile-details showing -->
			<div class="profile-details-showing-whole-container">
				<div class="profile-details-inside-div-container">
					<div class="profile-details-common-container">
						<div class="profile-background-and-image-div">
							<div class="image-background-image-div">
								<div class="profile-image-name-button-div">
									<div class="profile-div-container">
										<div class="profile-div">
											<img class="profile-image" src="${userDetails.profileImage}"
												alt="profile-imge" />
										</div>

										<div class="profile-person-name-and-slogan-div">
											<div class="prorile-slogan-inside-div">
												<h3 class="profile-user-name"></h3>
												<p class="profile-user-slogan"></p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- profile input label details -->

							<div class="prfile-input-details-div-container">
								<form class="row g-3" id="change-form"
									action="ProfileEditServlet" method="post">
									<div class="col-md-6">
										<label for="text" class="form-label">First name <span
											class="mandotary">*</span>
										</label> <input name="firstname" type="text" class="form-control"
											id="firstName" value="${userDetails.firstName}" />
									</div>
									<div class="col-md-6">
										<label for="text" class="form-label">Last name <span
											class="mandatory">*</span>
										</label> <input name="lastname" type="text" class="form-control"
											id="lastName" value="${userDetails.lastName}" />
									</div>
									<div class="col-md-6">
										<label for="text" class="form-label">User name <span
											class="mandatory">*</span>
										</label> <input name="username" type="text" class="form-control"
											id="userName" value="${userDetails.username}" />
									</div>
									<div class="col-md-6">
										<label for="text" class="form-label">Bio</label> <input
											name="userTheme" type="text" class="form-control" id="bio"
											value="${userDetails.userTheme}" />
									</div>
									<div class="col-md-6">
										<label for="inputEmail4" class="form-label">Email <span
											class="mandatory">*</span>
											<button type="button" class="btn btn-primary update"
												style="--bs-btn-padding-y: 0.25rem; --bs-btn-padding-x: 0.5rem; --bs-btn-font-size: 0.75rem;">
												Update</button>
										</label> <input type="email" class="form-control" id="email"
											name="email" value="${userDetails.email}" disabled />
									</div>

									<div class="col-md-6">
										<label for="inputCity" class="form-label">City</label> <input
											type="text" class="form-control" id="city" name="nationality"
											value="${userDetails.nationality}" />
									</div>

									<div class="col-md-6">
										<label for="inputCity" class="form-label">Phone</label> <input
											name="mobileno" type="tel" class="form-control" id="phone"
											value="${userDetails.mobileNumber}" />
									</div>

									<div class="col-md-4">
										<label for="inputState" class="form-label">Date of
											birth <span class="mandatory">*</span>
										</label> <input type="date" class="form-control" id="dateOfBirth"
											name="dob" value="${userDetails.dob}" />
									</div>

									<div class="col-md-6">
										<div>
											<label for="radio" class="form-label">Gender</label>
										</div>
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="gender"
												id="genderMale" value="Male"
												${userDetails.gender == 'Male' ? 'checked' : ''} /> <label
												class="form-check-label" for="genderMale">Male</label>
										</div>
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="gender"
												id="genderFemale" value="Female"
												${userDetails.gender == 'Female' ? 'checked' : ''} /> <label
												class="form-check-label" for="genderFemale">Female</label>
										</div>
										<div class="form-check form-check-inline">
											<input class="form-check-input" type="radio" name="gender"
												id="genderOther" value="Other"
												${userDetails.gender == 'Other' ? 'checked' : ''} /> <label
												class="form-check-label" for="genderOther">Other</label>
										</div>
									</div>

									<div class="col-12" id="button-div">
										<button type="button" id="cancel-button"
											class="btn btn-outline-warning">Cancel</button>
										<button type="submit" class="btn btn-primary">Save</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
	</section>

</body>
</html>