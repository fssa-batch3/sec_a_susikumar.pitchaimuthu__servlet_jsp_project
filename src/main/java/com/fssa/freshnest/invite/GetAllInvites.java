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
 * Servlet implementation class GetAllInvites
 */
@WebServlet("/GetAllInvites")
public class GetAllInvites extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");
		Integer userId = (Integer) session.getAttribute("UserId");
		User user = new User(loggedInEmail);
		UserService userService = new UserService();

		try {
			User userDetails = userService.readUserDetails(user);
			request.setAttribute("userDetails", userDetails);
			System.out.println(userDetails);

			User user1 = new User();
			user1.setUserId(userId);
			// Create an Invite object using the user1 object
			Invite invite = new Invite(user1);
			InviteService inviteService = new InviteService();

			List<Invite> friendsInviteList = inviteService.listFriendsInvite(invite);
			JSONArray accountsJSonArray = new JSONArray(friendsInviteList);
			PrintWriter out = response.getWriter();
			out.println(accountsJSonArray.toString());
			out.flush();
			System.out.println(friendsInviteList);

		} catch (ServiceException e) {
			System.out.println(e.getMessage());
		}
	}

}
