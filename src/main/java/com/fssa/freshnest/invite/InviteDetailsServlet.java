package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;

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
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class InviteDetailsServlet
 */
@WebServlet("/InviteDetailsServlet")
public class InviteDetailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String id = request.getParameter("inviteId");

		Integer inviteId = Integer.parseInt(id);

		HttpSession session = request.getSession();

		Integer loggedUserId = (Integer) session.getAttribute("UserId");

		User user = new User();
		user.setUserId(loggedUserId);

		Invite invite = new Invite();
		invite.setUser(user);
		invite.setInviteId(inviteId);

		InviteService inviteService = new InviteService();

		PrintWriter out = response.getWriter();
		try {
			Invite inviteDetails = inviteService.readInviteDetails(inviteId);
			JSONObject accountsJSonArray = new JSONObject(inviteDetails);
			out.println(accountsJSonArray.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			out.println(e.getMessage());
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

		String id = request.getParameter("inviteId");
		Integer inviteId = Integer.parseInt(id);

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

		Invite invite = new Invite(inviteType, date, time, specialPerson, inviteSlogan, inviteExplanation, inviteId);
		invite.setInviteImage(inviteImage);
		InviteService inviteService = new InviteService();

		try {
			if (inviteService.updateInvite(invite)) {
				out.print("success");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
			out.print(e.getMessage());
		}

	}

}
