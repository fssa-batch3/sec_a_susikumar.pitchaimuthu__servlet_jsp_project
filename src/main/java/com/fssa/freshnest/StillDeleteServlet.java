package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;

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
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class StillDeleteServlet
 */
@WebServlet("/StillDeleteServlet")
public class StillDeleteServlet extends HttpServlet {
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

		HttpSession session = request.getSession();

		Integer loggedInUserId = (Integer) session.getAttribute("UserId");
		User user = new User();
		user.setUserId(loggedInUserId);

		JSONObject jsonData = new JSONObject(requestBody.toString());
		int still_id = jsonData.getInt("stillId");

		Still still = new Still(true, still_id, user);

		StillService stillService = new StillService();

		try {
			if (stillService.deleteStill(still)) {
				out.println("success");

			} else {
				out.println("failed");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
