package com.fssa.freshnest.timeTales;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.fssa.freshnest.model.TimeTales;
import com.fssa.freshnest.services.TimeTalesService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetTimeTalesByUserId
 */
@WebServlet("/GetTimeTalesByUserId")
public class GetTimeTalesByUserId extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int userId = Integer.parseInt(request.getParameter("userId"));
		PrintWriter out = response.getWriter();
		TimeTalesService timeTalesService = new TimeTalesService();
		try {
			List<TimeTales> userTimTale = timeTalesService.getUserFriendsTimeTales(userId);
			JSONArray userTales = new JSONArray(userTimTale);
			out.print(userTales.toString());
			out.flush();

		} catch (ServiceException e) {
			out.print(e.getMessage());
		} finally {
			out.close();
		}

	}

}
