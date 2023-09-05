package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class StillFilterServlet
 */
@WebServlet("/StillFilterServlet")
public class StillFilterServlet extends HttpServlet {
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
		String fromDateString = jsonData.getString("from");
		String toDateString = jsonData.getString("to");
		System.out.println(fromDateString);
		System.out.println(toDateString);

		// Parse date strings to LocalDate
		LocalDate from = LocalDate.parse(fromDateString);
		LocalDate to = LocalDate.parse(toDateString);

		StillService stillService = new StillService();

		Still still = new Still(from, to, user);

		try {
			List<Still> filterStills = stillService.filterStills(still);

			JSONArray StillJsonArray = new JSONArray(filterStills);
			out.println(StillJsonArray.toString());
			out.flush();
			out.close();

		} catch (ServiceException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}

}
