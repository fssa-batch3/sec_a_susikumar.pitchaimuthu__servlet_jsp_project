package com.fssa.freshnest;

import java.io.IOException;
import java.util.List;

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
 * Servlet implementation class AddInviteServlet
 */
@WebServlet("/AddInviteServlet")
public class AddInviteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");

		User user1 = new User(loggedInEmail);
		UserService userService = new UserService();

		try {

			User userDetails = userService.readUserDetails(user1);
			request.setAttribute("userDetails", userDetails);

			request.getRequestDispatcher("./pages/inviteAdd.jsp").forward(request, response);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}



}
