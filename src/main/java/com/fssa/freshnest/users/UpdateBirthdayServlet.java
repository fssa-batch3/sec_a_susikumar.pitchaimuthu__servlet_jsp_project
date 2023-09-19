package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;

import javax.servlet.RequestDispatcher;
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
 * Servlet implementation class UpdateBirthdayServlet
 */
@WebServlet("/updateUserBirthdayDetails")
public class UpdateBirthdayServlet extends HttpServlet {
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

		String date = jsonData.getString("dateOfBirth");
		String gender = jsonData.getString("gender");
		
		LocalDate dob = LocalDate.parse(date);
		HttpSession session = request.getSession();
		String registeredEmail = (String) session.getAttribute("registeredEmail");

		User user1 = new User(dob, gender, registeredEmail);
		UserService userService = new UserService();

		try {
			if (userService.secondPageRegisterUser(user1)) {
				out.print("success");
				
			} else {
				out.println("User date of birth details update failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
			out.println(e.getMessage());

		}

	}

}
