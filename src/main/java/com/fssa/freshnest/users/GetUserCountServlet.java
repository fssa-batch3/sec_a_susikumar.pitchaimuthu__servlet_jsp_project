package com.fssa.freshnest.users;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetUserCountServlet
 */
@WebServlet("/GetUserCountServlet")
public class GetUserCountServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        
		UserService userService = new UserService();
		PrintWriter out = response.getWriter();
		
		try {
			int count = userService.getTotalUserCount();
		}catch(ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
