package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Base64;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class FreshStillServlet
 */
@WebServlet("/FreshStillServlet")
public class FreshStillServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("yes");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}

		HttpSession session = request.getSession();

		Integer loggedInUserId = (Integer) session.getAttribute("UserId");
		User user = new User();
		user.setUserId(loggedInUserId);

		JSONObject jsonData = new JSONObject(requestBody.toString());
		String stillUrl = jsonData.getString("imageLink");
		String stillName = jsonData.getString("imageName");

		// Encode the URL to Base64

		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();

		Still still = new Still(stillUrl, user, stillName, currentDate, currentTime, false, false);
		StillService stillService = new StillService();

		try {
			if (stillService.takeStill(still)) {
				out.println("Still taken successfully");

			}
		} catch (ServiceException e) {
			System.out.println("Still taken failed");
			System.out.println(e.getMessage());

		}

	}

	   protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
			HttpSession session = request.getSession();

			String loggedInEmail = (String) session.getAttribute("loggedInEmail");

			User user1 = new User(loggedInEmail);
			UserService userService = new UserService();

			try {
				User userDetails = userService.readUserDetails(user1);
				request.setAttribute("userDetails", userDetails);

				request.getRequestDispatcher("./pages/webcam.html").forward(request, response);
				System.out.print(userDetails);
			} catch (ServiceException e) {
				e.printStackTrace();
			}
		
		  
	} 

}
