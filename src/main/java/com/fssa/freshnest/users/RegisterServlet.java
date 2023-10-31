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
 * Servlet implementation class RegisterServlet
 * 
 * @author SusikumarPitchaimuth
 */
@WebServlet("/UserRegister")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

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

		String firstName = jsonData.getString("firstName");
		String lastName = jsonData.getString("lastName");
		String userName = jsonData.getString("userName");
		String email = jsonData.getString("email");
		String password = jsonData.getString("password");
		String profileImage = jsonData.getString("profileImage");

		UserService userService = new UserService();
		User user1 = new User(email, userName, password, firstName, lastName, profileImage);
		try {
			if (!userService.checkWhetherTheUsernameIsExistOrNot(userName) && (userService.registerUser(user1))) {
				HttpSession session = request.getSession();
				session.setAttribute("registeredEmail", email);
				out.print("success");

			}

		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
