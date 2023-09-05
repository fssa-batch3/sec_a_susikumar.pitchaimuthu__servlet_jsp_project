package com.fssa.freshnest;

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
 * Servlet implementation class GetAllUserListServlet
 */
@WebServlet("/GetAllUserListServlet")
public class GetAllUserListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");

		User user1 = new User(loggedInEmail);
		UserService userService = new UserService();
		PrintWriter out = response.getWriter();

		try {
			List<User> usersList = userService.listUser(user1);
			JSONArray usersArray = new JSONArray(usersList);
			out.println(usersArray.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
