package com.fssa.freshnest.still;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;

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

/**
 * Servlet implementation class StillEditServlet
 */
@WebServlet("/StillEditServlet")
public class StillEditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

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
		String stillUrl = jsonData.getString("stillUrl");
		String stillName = jsonData.getString("stillName");
		int parent_id = jsonData.getInt("parent_id");
 
		// Adding that image is updated 
		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();

	     
		// Adding the new image to the database
		Still still2 = new Still(stillUrl, user, stillName, currentDate, currentTime, false, false);
		still2.setStillId(parent_id);

		StillService stillService = new StillService();
		try {
			if (stillService.updateStill(still2)) {
				out.println("success");

			} else {
				out.println("failed");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
