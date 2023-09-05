<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.fssa.freshnest.model.Invite"%>
<%@ page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Invite Details page</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
<link rel="stylesheet" href="../assets/css/inviteCard.css" />
</head>
<body>
	<section class="whole-container">
		<div class="whole-inside-div-container">
			<!-- user profile div -->
			<div class="invite-above-content-div">
				<div class="invite-inside-profile-div"></div>
			</div>

			<!-- showing user all div -->
			<div class="invite-div-control-container">
				<!-- invite card image div container -->

				<div class="user-invite-showing-div-container">
					<!-- invite inside div -->
					<div class="invite-inside-div"></div>
				</div>

				<!-- invite details showing container -->
				<div class="invite-result-input-div-container">
					<div class="invite-result-inside-div-container">
						<div class="invite-result-showing-div">
							<div class="result-inside-div">
								<!-- result chart div container -->
								<div class="chart-div-container">
									<div class="chart-div">
										<p class="chart-percentage-para first"></p>
										<i class="bi bi-hearts"></i>
									</div>
									<div class="chart-div-three">
										<p class="chart-percentage-para second"></p>
										<i class="bi bi-hand-thumbs-up-fill"></i>
									</div>
									<div class="chart-div-two">
										<p class="chart-percentage-para three"></p>
										<i class="bi bi-hand-thumbs-down-fill"></i>
									</div>
								</div>
							</div>
						</div>
						<form class="form-div">
							<div class="invite-input-div-container">
								<!-- invite details and update and delete option -->

								<div class="invite-update-option-div-container">
									<div class="invite-details-div">
										<p>Invite Details</p>
									</div>

									<div class="invite-update-option-div">
										<button id="delete-invite-button">
											<i class="bi bi-trash"></i> <span>Remove</span>
										</button>
										<button id="edit-button">
											<i class="bi bi-bar-chart-steps"></i><span>Update</span>
										</button>
										<button id="save-button">
											<i class="bi bi-check-circle-fill"></i><span>Save</span>
										</button>
									</div>
								</div>
								<!-- invites input and lable -->

								<div class="invite-input-div">
									<label for="text">Invite name</label> <input
										class="inviteInput" id="inviteName" type="text" disabled />
								</div>

								<div class="invite-input-div">
									<label for="text">Invite date</label> <input
										class="inviteInput" id="inviteDate" type="text" disabled />
								</div>

								<div class="invite-input-div">
									<label for="text">Invite time</label> <input
										class="inviteInput" id="inviteTime" type="text" disabled />
								</div>

								<div class="invite-input-div">
									<label for="text">Special person </label> <input
										class="inviteInput" id="specialPerson" type="text" disabled />
								</div>

								<div class="invite-input-div">
									<label for="text">Invite file </label> <input id="party_image"
										type="file" />
								</div>

								<div class="invite-input-div">
									<label for="text">Invite glimpse</label>
									<textarea class="inviteInput" name="" id="inviteGlimpse"
										cols="30" rows="10" disabled></textarea>
								</div>

								<div class="invite-input-div">
									<label for="text">Invite explanation</label>
									<textarea class="inviteInput" name="" id="inviteExplanation"
										cols="30" rows="10" disabled></textarea>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- details showing elements -->

		<div class="invite-details-showing-div-container"
			style="display: none">
			<div class="invite-details-inside-div-container">
				<!-- card-started -->
				<div class="invite-details-div">
					<div class="invite-inside-inside-div">
						<div class="content-remove-div">
							<div class="content-div">
								<p class="response-head-para"></p>
							</div>
							<div class="remove-div">
								<i class="bi bi-x-square-fill"></i>
							</div>
						</div>

						<!-- inviter members details -->
						<div class="invite-response-div-container">
							<div class="invite-inside-response-div">
								<div class="response-member-div">
									<p class="member-para"></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	<!-- scirpts -->
	<script src="../assets/js/invite_card.js"></script>
	<script src="../assets/js/easy_pie_chart.js"></script>
	 <script src="../assets/js/invite_card_update.js"></script>
	
</body>
</body>
</html>