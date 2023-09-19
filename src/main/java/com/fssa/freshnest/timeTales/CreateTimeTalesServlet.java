package com.fssa.freshnest.timeTales;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.TimeTales;
import com.fssa.freshnest.services.TimeTalesService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class CreateTimeTalesServlet
 */
@WebServlet("/CreateTimeTalesServlet")
public class CreateTimeTalesServlet extends HttpServlet {
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
		JSONObject jsonData = new JSONObject(requestBody.toString());
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		String mediaUrl = jsonData.getString("media_url");
		Double duration = jsonData.getDouble("taleDuration");

		TimeTalesService timeTalesService = new TimeTalesService();
		TimeTales timeTales = new TimeTales();
		timeTales.setMedia_url(mediaUrl);
		timeTales.setTaleDuration(duration);
		timeTales.setUserId(userId); 

		try {
			if (timeTalesService.createTimeTale(timeTales)) {
				out.print("success");
				out.flush();
				out.close();
			}

		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
