package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class CreateInviteServlet
 * 
 * @author SusikumarPitchaimuth
 */
@WebServlet("/CreateInvite")
public class CreateInviteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");

		User user1 = new User(loggedInEmail);
		UserService userService = new UserService();

		try {
			User userDetails = (User) userService.readUserDetails(user1);
			request.setAttribute("userDetails", userDetails);
			RequestDispatcher dispatcher = request.getRequestDispatcher("addInvite.jsp");
			dispatcher.forward(request, response);

		} catch (ServiceException e) {
			System.out.println(e.getMessage());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}

		JSONObject jsonData = new JSONObject(requestBody.toString());

		String inviteType = jsonData.getString("inviteType");
		String specialPerson = jsonData.getString("specialPerson");
		String inviteSlogan = jsonData.getString("inviteSlogan");
		String inviteExplanation = jsonData.getString("inviteExplanation");
		String inviteDate = jsonData.getString("inviteDate");
		String inviteTime = jsonData.getString("inviteTime");
		String inviteImage = jsonData.getString("inviteImage");

		LocalDate date = LocalDate.parse(inviteDate);
		LocalTime time = LocalTime.parse(inviteTime);

		HttpSession session = request.getSession();

		Integer loggedUserId = (Integer) session.getAttribute("UserId");
		System.out.println(loggedUserId);

		User user = new User();
		user.setUserId(loggedUserId);

		Invite invite = new Invite(user, inviteType, date, time, specialPerson, inviteSlogan, inviteExplanation);

		invite.setInviteImage(inviteImage);
		
		InviteService inviteService = new InviteService();
		try {
			if (inviteService.createInvite(invite)) {
				out.print("success");

			} else {
				out.println("Invitaion creation failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
			out.print(e.getMessage());
		}

	}

}
