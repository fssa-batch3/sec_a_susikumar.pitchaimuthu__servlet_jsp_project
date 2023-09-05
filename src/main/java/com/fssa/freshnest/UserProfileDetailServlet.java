package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class UserProfileDetailServlet
 */
@WebServlet("/UserProfileDetailServlet")
public class UserProfileDetailServlet extends HttpServlet {
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
		PrintWriter out = response.getWriter();

		try {
			User userDetails = userService.readUserDetails(user1);
			
			HttpSession secondSession = request.getSession();
			secondSession.setAttribute("UserId", userDetails.getUserId());
			
			JSONObject userObject = new JSONObject(userDetails);
			out.println(userObject.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			e.printStackTrace();
		}

	}
}
