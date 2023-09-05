package com.fssa.freshnest;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.Still;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.StillService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class CreateStillServlet
 * 
 * @author SusikumarPitchaimuth
 */
@WebServlet("/CreateStillServlet")
public class CreateStillServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CreateStillServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();

		LocalDate currentDate = LocalDate.now();
		LocalTime currentTime = LocalTime.now();
		User user = new User();
		user.setUserId(1);

		Still still = new Still("https://www.example.com", user, "Supreme", currentDate, currentTime, false, false);
		StillService stillService = new StillService();

		try {
			stillService.takeStill(still);
			out.println("Still Created successfully");
		} catch (ServiceException e) {
			out.println(e.getMessage());

		}
	}

}
