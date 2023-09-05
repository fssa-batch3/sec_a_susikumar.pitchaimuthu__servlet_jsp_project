<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Invite Creation Page</title>
<link rel="stylesheet" href="../assets/css/addInvite.css" />

</head>
<body>
	<section class="whole-div-control-section">
		<!-- user profile div -->
		<c:forEach var="userDetail" items="${userDetailsList}">
			<div class="invite-above-content-div">
				<div class="invite-inside-profile-div">
					<div class="profile-user-name-div">
						<p class="profile-user-name">${userDetails.username}</p>
					</div>
					<div class="user-profile-div">
						<img class="profile-image" src="${userDetails.profileImage}"
							alt="profile-image">
					</div>
				</div>
			</div>
		</c:forEach>
		<!-- user invite double div container -->

		<div class="section-inside-div-container">
			<!-- about invite page our side details -->

			<div class="about-invite-div-container">
				<div class="about-inside-div">
					<img class="about-image"
						src="../assets/images/Home/Wallpaper (1).jpg" alt="about-image" />
				</div>
			</div>

			<!-- invite form area div container -->

			<div class="invite-form-div-container">
				<div class="invite-form-inside-div">
					<!-- user welcome from our side -->

					<div class="our-side-head-div">
						<div class="fresh-logo-div">
							<img class="fresh-logo" src="../assets/images/logos/bird-logo.png"
								alt="fresh-logo" />

							<p class="content">Declare your Party invite to your
								intimacies</p>
						</div>
					</div>
					<!-- user invite form div -->

					<form id="invite-form" action="CreateInviteServlet" method="post">
						<div class="invite-content-div">
							<label for="text" class="invite-label">Invite name <span
								class="mandatory">*</span>
							</label> <input name="inviteType" class="party-page-input"
								id="party_name" type="text" autocomplete="off" required />
						</div>
						<div class="invite-content-div">
							<label for="text" class="invite-label">Party Time <span
								class="mandatory">*</span>
							</label> <input class="party-page-input" name="inviteTime"
								id="party_time" type="time" autocomplete="off" min="" required />
						</div>
						<div class="invite-content-div">
							<label for="text" class="invite-label">Party Date <span
								class="mandatory">*</span>
							</label> <input class="party-page-input" name="inviteDate"
								id="party_date" type="date" autocomplete="off" required />
						</div>
						<div class="invite-content-div">
							<label for="text" class="invite-label">Special Person</label> <input
								class="party-page-input" name="specialPerson"
								id="special_person" type="text" autocomplete="off" />
						</div>
						<div class="invite-content-div">
							<label class="invite-label">Party file <span
								class="mandatory">*</span>
							</label>

							<button class="choose-file-button"  onclick="chooseInviteFile()">Choose invitation</button>
						</div>

						<div class="invite-content-div">
							<p class="invite-label">
								Invite's slogan <span class="mandatory">*</span>
							</p>
							<textarea name="inviteSlogan" id="party_short_note" cols="30"
								rows="10" class="party-slogan-textarea" autocomplete="off"></textarea>
						</div>

						<div class="invite-content-div">
							<p class="invite-label">
								Invite era <span class="mandatory">*</span>
							</p>
							<textarea class="party-page-textarea" name="inviteExplanation"
								id="party_expand_passage" cols="30" required rows="10"
								autocomplete="off"></textarea>
						</div>
						<div class="invite-button-div">
					    	<button id="invite-button" type="submit">Invite</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
		<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<script src="../assets/js/add_invite.js"></script>

</body>
</html>