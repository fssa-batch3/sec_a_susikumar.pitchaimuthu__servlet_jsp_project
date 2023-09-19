package com.fssa.freshnest.invite;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.Invite;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.InviteService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class ReadInviteServlet
 */
@WebServlet("/ListInviteServlet")
public class ListInviteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();

		User user = new User();
		user.setUserId(1);

		Invite invite = new Invite(user.getUserId());

		InviteService inviteService = new InviteService();
		try {
			List<Invite> result = inviteService.listInvites(invite);

			out.println("invite details got successfully " + result);

			RequestDispatcher dispatcher = request.getRequestDispatcher("invite.jsp");
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
		doGet(request, response);
	}

}
