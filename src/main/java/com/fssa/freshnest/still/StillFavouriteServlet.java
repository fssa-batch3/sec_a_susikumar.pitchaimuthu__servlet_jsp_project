package com.fssa.freshnest.still;

import java.io.IOException;
import java.io.PrintWriter;
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
 * Servlet implementation class StillFavouriteServlet
 */
@WebServlet("/StillFavouriteServlet")
public class StillFavouriteServlet extends HttpServlet {
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
		boolean is_favourite = jsonData.getBoolean("is_favourite");
		int stillId = jsonData.getInt("stillId");

		Still still = new Still(is_favourite, stillId);
		StillService stillService = new StillService();

		try {
			if(stillService.favouriteStill(still)) {
				out.println("success");
			}else {
				out.println("failed");
			}

		} catch (ServiceException e) {
			e.printStackTrace();

		}

	}

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();

		Integer loggedInUserId = (Integer) session.getAttribute("UserId");
		
		User user = new User();
		user.setUserId(loggedInUserId);
		
		Still still = new Still(user);
		StillService stillService = new StillService();

		
		try {
			List<Still> favouriteStills = stillService.filterStillByFavourite(still);	
			JSONArray favouriteArray = new JSONArray(favouriteStills);
		    out.println(favouriteArray.toString());
			out.flush();
			out.close();
		}catch(ServiceException e) {
			out.println(e.getMessage());
		}
		
		
	}
}
