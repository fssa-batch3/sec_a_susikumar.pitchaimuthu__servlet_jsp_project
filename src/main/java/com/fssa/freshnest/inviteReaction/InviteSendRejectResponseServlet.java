package com.fssa.freshnest.inviteReaction;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.InviteReaction;
import com.fssa.freshnest.services.InviteReactionService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class InviteSendRejectResponseServlet
 */
@WebServlet("/InviteSendRejectResponseServlet")
public class InviteSendRejectResponseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int inviteId = Integer.parseInt(request.getParameter("inviteId"));
		boolean value = Boolean.parseBoolean(request.getParameter("value"));

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		PrintWriter out = response.getWriter();

		InviteReactionService inviteReactionService = new InviteReactionService();
		InviteReaction inviteReaction = new InviteReaction();
		inviteReaction.setInviteId(inviteId);
		inviteReaction.setUserId(userId);
		inviteReaction.setReject(value);

		try {
			if (inviteReactionService.userSendRejectResponse(inviteReaction)) {
				out.print("success");
			}

		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
