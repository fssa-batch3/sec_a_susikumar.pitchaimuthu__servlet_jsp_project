package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.model.InviteReaction;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.InviteReactionService;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetUserFriendInviteDetailServlet
 */
@WebServlet("/GetUserFriendInviteDetailServlet")
public class GetUserFriendInviteDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int inviteId = Integer.parseInt(request.getParameter("inviteId"));
		PrintWriter out = response.getWriter();

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		InviteReactionService inviteReactionService = new InviteReactionService();
		InviteReaction inviteReaction = new InviteReaction();
		inviteReaction.setInviteId(inviteId);
		inviteReaction.setUserId(userId);

		InviteService inviteService = new InviteService();
		Invite invite = new Invite();
		invite.setInviteId(inviteId);

		User user = new User();
		user.setUserId(userId);
		invite.setUser(user);

		try {
			InviteReaction inviteReactionDetail = inviteReactionService.getUserInviteReaction(inviteReaction);
			Invite inviteDetail = inviteService.listInviteDetails(invite);

			// Create a JSONObject to hold the response data
			JSONObject jsonResponse = new JSONObject();

			jsonResponse.put("inviteDetail", new JSONObject(inviteDetail));
			jsonResponse.put("userInviteReactionDetail", new JSONObject(inviteReactionDetail));

			// Send the JSONObject as a response
			out.print(jsonResponse.toString());
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
