package com.fssa.freshnest.invite;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.services.InviteService;

/**
 * Servlet implementation class GetAnotherUserInvites
 */
@WebServlet("/GetAnotherUserInvites")
public class GetAnotherUserInvites extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int userId = Integer.parseInt(request.getParameter("userId"));
		InviteService inviteService = new InviteService();
		

	}

}
