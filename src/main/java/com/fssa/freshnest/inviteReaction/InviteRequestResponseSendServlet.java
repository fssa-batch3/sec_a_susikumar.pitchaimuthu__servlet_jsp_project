package com.fssa.freshnest.inviteReaction;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.InviteReaction;
import com.fssa.freshnest.services.InviteReactionService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class InviteRequestResponseSendServlet
 */
@WebServlet("/InviteRequestResponseSendServlet")
public class InviteRequestResponseSendServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		int reactId = Integer.parseInt(request.getParameter("reactId"));
		String value = request.getParameter("value");

		InviteReactionService inviteReactionService = new InviteReactionService();
		InviteReaction inviteReaction = new InviteReaction();
		inviteReaction.setReactId(reactId);
		inviteReaction.setInviteRequsestReaction(value);

		try {
			if (inviteReactionService.sendBackTheInviteRequestResponse(inviteReaction)) {
				out.print("success");
			}
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
