package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class MakeUserAsGroupAdminServlet
 */
@WebServlet("/MakeUserAsGroupAdminServlet")
public class MakeUserAsGroupAdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int chatId = Integer.parseInt(request.getParameter("chatId"));
		int userId = Integer.parseInt(request.getParameter("userId"));
		boolean isAdmin = Boolean.parseBoolean(request.getParameter("admin"));
		PrintWriter out = response.getWriter();

		ChatService chatService = new ChatService();

		try {
			chatService.makeUserAsGroupAdmin(userId, chatId, isAdmin);
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
