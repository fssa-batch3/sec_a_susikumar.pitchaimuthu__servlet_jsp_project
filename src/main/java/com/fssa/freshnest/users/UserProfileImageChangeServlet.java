package com.fssa.freshnest.users;

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
 * Servlet implementation class UserProfileImageChangeServlet
 */
@WebServlet("/UserProfileImageChangeServlet")
public class UserProfileImageChangeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}
		JSONObject jsonData = new JSONObject(requestBody.toString());

		String profileImage = jsonData.getString("profileImage");

		UserService userService = new UserService();
		User user = new User();
		user.setProfileImage(profileImage);
		user.setUserId(userId);

		try {
			if (userService.profileImageUpdate(user)) {
				out.print("success");
			}
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
