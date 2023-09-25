package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;

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
 * Servlet implementation class ProfileEditServlet
 */
@WebServlet("/ProfileDetailsUpdateServlet")
public class ProfileEditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		
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
		String nationality = jsonData.getString("city");
		String gender = jsonData.getString("userGender");
		String userTheme = jsonData.getString("userTheme");
		String dateOfBirth = jsonData.getString("dob");

		// Parsing the date of birth and phone number into the respective data types
		Long mobileNo = jsonData.getLong("mobileNumber");
		LocalDate dob = LocalDate.parse(dateOfBirth);

		String loggedInEmail = (String) session.getAttribute("loggedInEmail");
		User user1 = new User(userName, firstName, lastName, mobileNo, dob, nationality, gender);
		User email = new User(loggedInEmail);
		user1.setUserTheme(userTheme);

		UserService userService = new UserService();

		try {
			if(userService.updateUser(user1, email)) {
				out.print("success");
			}else {
				out.print("failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
