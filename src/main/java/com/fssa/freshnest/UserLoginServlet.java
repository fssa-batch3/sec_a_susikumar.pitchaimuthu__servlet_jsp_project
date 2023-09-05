package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;

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
 * Servlet implementation class UserLoginServlet
 */
@WebServlet("/userLogin")
public class UserLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// Paramaeter of the login post
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		// Instance of the user model
		User user = new User(email, password);
		// Instance of the UserService logIn user Service
		UserService logInService = new UserService();

		PrintWriter out = response.getWriter();

		try {
			if (logInService.logInUser(user)) {
				out.println("Login Successfully");
				
				User user1 = new User();
				System.out.println(user1.getUserId());
				
				HttpSession secondSession = request.getSession();
				secondSession.setAttribute("loggedInEmail", email);

				RequestDispatcher dispatcher = request.getRequestDispatcher("./pages/home.jsp");
				dispatcher.forward(request, response);

			} else {
				out.println("Login Failed");
				RequestDispatcher dispatcher = request.getRequestDispatcher("./pages/login.jsp");
				dispatcher.forward(request, response);
			}

		} catch (ServiceException e) {
			out.println(e.getMessage());
		}

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("./pages/login.html");

	}

}
