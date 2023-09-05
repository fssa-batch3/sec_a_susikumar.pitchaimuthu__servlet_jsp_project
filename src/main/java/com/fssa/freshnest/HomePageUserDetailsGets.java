package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class HomePageUserDetailsGets
 */
@WebServlet("/HomePageUserDetailsGets")
public class HomePageUserDetailsGets extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}

		JSONObject jsonData = new JSONObject(requestBody.toString());
		int userId = jsonData.getInt("userId");

		UserService userService = new UserService();

		User user = new User();
		user.setUserId(userId);

		try {
			User friendDetail = userService.readUserFriendDetails(user);
			JSONObject accountsJSonArray = new JSONObject(friendDetail);
			out.println(accountsJSonArray.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}

	}

}
