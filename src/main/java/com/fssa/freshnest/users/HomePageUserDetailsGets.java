package com.fssa.freshnest.users;

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
@WebServlet("/HomePageUserDetail")
public class HomePageUserDetailsGets extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int userId = Integer.parseInt(request.getParameter("userId"));

		UserService userService = new UserService();

		User user = new User();
		user.setUserId(userId);
 
		try {
			User friendDetail = userService.readUserFrinedsDetails(user);
			JSONObject accountsJSonArray = new JSONObject(friendDetail);
			out.println(accountsJSonArray.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			e.printStackTrace();
		}

	}

}
