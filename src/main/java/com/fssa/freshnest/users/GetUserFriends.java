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

import org.json.JSONArray;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetUserFriends
 */
@WebServlet("/GetUserFriends")
public class GetUserFriends extends HttpServlet {
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

		try {
			List<User> userFriends = userService.getAllUserFriends(userId);
			JSONArray userFriendsArray = new JSONArray(userFriends);
			out.print(userFriendsArray.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
