package com.fssa.freshnest.timeTales;

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

import com.fssa.freshnest.model.TimeTales;
import com.fssa.freshnest.services.TimeTalesService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetUserTimeTalesServlet
 */
@WebServlet("/GetUserTimeTalesServlet")
public class GetUserTimeTalesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		TimeTalesService timeTalesService = new TimeTalesService();
		TimeTales timeTales = new TimeTales();
		PrintWriter out = response.getWriter();
		timeTales.setUserId(userId);

		try {
			List<TimeTales> timeTaleList = timeTalesService.listUserTimeTales(timeTales);
			JSONArray userTales = new JSONArray(timeTaleList);
			out.print(userTales.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
