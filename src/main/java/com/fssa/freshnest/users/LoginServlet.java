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
 * Servlet implementation class LoginServlet
 * 
 * @author SusikumarPitchaimuth
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		System.out.println("I am login servlet"); 
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}
		JSONObject jsonData = new JSONObject(requestBody.toString());

		// Paramaeter of the login post
		String email = jsonData.getString("email");
		String password = jsonData.getString("password");

		// Instance of the user model
		User user = new User(email, password);
		// Instance of the UserService logIn user Service
		UserService logInService = new UserService();

		try {
			if (logInService.logInUser(user)) {
				HttpSession secondSession = request.getSession();
				secondSession.setAttribute("loggedInEmail", email);
				
				User userDetails = logInService.readUserDetails(user);
				
				HttpSession secondSessionTwo = request.getSession();
				secondSessionTwo.setAttribute("UserId", userDetails.getUserId());

				out.print("success");
			} 

		} catch (ServiceException e) {
			out.print(e.getMessage());	
		}
	}

}
