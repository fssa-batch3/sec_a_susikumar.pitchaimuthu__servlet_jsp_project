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
 * Servlet implementation class UpdateBirthdayServlet
 */
@WebServlet("/updateBirthday")
public class UpdateBirthdayServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;



	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String gender = request.getParameter("gender");
		String date = request.getParameter("dob");
		LocalDate dob = LocalDate.parse(date);
		HttpSession session = request.getSession();
		String registeredEmail = (String) session.getAttribute("registeredEmail");

		PrintWriter out = response.getWriter();

		User user1 = new User(dob, gender, registeredEmail);
		UserService userService = new UserService();

		try {
			if (userService.secondPageRegisterUser(user1)) {
				out.println("User date of birth details updated successfully");
				RequestDispatcher dispatcher = request.getRequestDispatcher("./pages/userLogin.jsp");
				dispatcher.forward(request, response);
			} else {
				out.println("User date of birth details update failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();

		}

	}

}
