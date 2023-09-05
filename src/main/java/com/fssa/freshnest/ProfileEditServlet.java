package com.fssa.freshnest;

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

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class ProfileEditServlet
 */
@WebServlet("/ProfileEditServlet")
public class ProfileEditServlet extends HttpServlet {
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
			System.out.println(userDetails);
			request.setAttribute("userDetails", userDetails);

			request.getRequestDispatcher("./pages/editProfile.jsp").forward(request, response);
		} catch (ServiceException e) {
			e.printStackTrace();
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		String firstName = request.getParameter("firstname");
		String lastName = request.getParameter("lastname");
		String userName = request.getParameter("username");
		String nationality = request.getParameter("nationality");
		String gender = request.getParameter("gender");
		String phone = request.getParameter("mobileno");
		String userTheme = request.getParameter("userTheme");

		// Parsing the date of birth and phone number into the respective data types
		Long mobileNo = Long.parseLong(phone);
		LocalDate dob = LocalDate.of(2003, 2, 10);

		PrintWriter out = response.getWriter();
		String loggedInEmail = (String) session.getAttribute("loggedInEmail");
		User user1 = new User(userName, firstName, lastName, mobileNo, dob, nationality, gender);
		User email = new User(loggedInEmail);
		user1.setUserTheme(userTheme);

		UserService userService = new UserService();

		try {
			if(userService.updateUser(user1, email)) {
				out.println("Profile detials updated sucessfully");
				RequestDispatcher dispatcher = request.getRequestDispatcher("profile");
				dispatcher.forward(request, response);
				
			}else {
				out.println("Profile details update failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
