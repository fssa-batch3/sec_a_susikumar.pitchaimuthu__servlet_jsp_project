package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class InvitePageServlet
 */
@WebServlet("/InvitePage")
public class InvitePageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");
		Integer userId = (Integer) session.getAttribute("UserId");
		User user = new User(loggedInEmail);
		UserService userService = new UserService();

		try {
			User userDetails = userService.readUserDetails(user);
			request.setAttribute("userDetails", userDetails);

			// Create an Invite object using the user1 object
			InviteService inviteService = new InviteService();

			List<Invite> inviteList = inviteService.listInvites(userId);
			JSONArray userInvitesArray = new JSONArray(inviteList);
			out.println(userInvitesArray.toString());
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

	}

}
