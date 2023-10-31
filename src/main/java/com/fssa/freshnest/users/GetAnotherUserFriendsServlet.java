package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetAnotherUserFriendsServlet
 */
@WebServlet("/GetAnotherUserFriendsServlet")
public class GetAnotherUserFriendsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int userId = Integer.parseInt(request.getParameter("userId"));
		PrintWriter out = response.getWriter();
		UserService userService = new UserService();

		try {
			List<User> userFriends = userService.getAllUserFriends(userId);
			out.print(userFriends.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
