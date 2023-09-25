package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class getProfilePageDetailsCountServlet
 */
@WebServlet("/GetProfilePageDetailsCountServlet")
public class GetProfilePageDetailsCountServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		UserService userService = new UserService();
		InviteService inviteService = new InviteService();
		StillService stillService = new StillService();

		try {

			List<User> userFriends = userService.getAllUserFriends(userId);
			List<User> blockedFriends = userService.getUserBlockedFriends(userId);
			List<Invite> userInvites = inviteService.listInvites(userId);
			List<Still> userStills = stillService.listStills(userId);

			JSONObject userCounts = new JSONObject();
			userCounts.put("userFriends", userFriends);
			userCounts.put("userBlockFriends", blockedFriends);
			userCounts.put("userInvites", userInvites);
			userCounts.put("userStills", userStills);

			out.print(userCounts.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
