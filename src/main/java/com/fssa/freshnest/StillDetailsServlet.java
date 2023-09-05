package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class StillDetailsServlet
 */
@WebServlet("/StillDetailsServlet")
public class StillDetailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String id = request.getParameter("stillId");
		System.out.println("Parameter 'naan': " + id);
		Integer stillId = Integer.parseInt(id);

		Still still = new Still();
		still.setStillId(stillId);
		StillService stillService = new StillService();

		try {
			Still stillDetail = stillService.readStill(still);
			JSONObject stillObject = new JSONObject(stillDetail);
			PrintWriter out = response.getWriter();
			out.println(stillObject.toString());
			out.flush();

		} catch (ServiceException e) {
			e.printStackTrace();
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
