package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class InviteDeleteServlet
 */
@WebServlet("/InviteDeleteServlet")
public class InviteDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		String id = request.getParameter("inviteId");
		Integer inviteId = Integer.parseInt(id);

		Invite invite = new Invite(inviteId);
		InviteService inviteService = new InviteService();

		try {
			if (inviteService.deleteInvite(invite)) {
				out.println("success");
			} else {
				out.println("Invite deletion failed");
			}
		} catch (ServiceException e) {
			out.println(e.getMessage());

		}
	}

}
