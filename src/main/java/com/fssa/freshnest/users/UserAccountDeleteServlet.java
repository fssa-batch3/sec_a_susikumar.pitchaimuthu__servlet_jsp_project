package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class UserAccountDeleteServlet
 */
@WebServlet("/UserAccountDeleteServlet")
public class UserAccountDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");
		PrintWriter out = response.getWriter();
		
		User user1 = new User(loggedInEmail, true);
		UserService userService = new UserService();
		try {
			if(userService.deleteUser(user1)) {
				out.println("success");		
			}else {
				out.println("failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();

		}
	}

}
