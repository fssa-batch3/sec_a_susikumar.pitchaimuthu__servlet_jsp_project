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

import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class StillGalleryServlet
 */
@WebServlet("/GetAllStillls")
public class StillGalleryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();

		Integer userId = (Integer) session.getAttribute("UserId");

		StillService stillService = new StillService();
		try {
			List<Still> stillList = stillService.listStills(userId);
			JSONArray StillJsonArray = new JSONArray(stillList);
			out.println(StillJsonArray.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());

		}

	}

}
