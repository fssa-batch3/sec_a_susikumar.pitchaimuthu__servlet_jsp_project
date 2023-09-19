package com.fssa.freshnest.notification;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.RequestAndResponse;
import com.fssa.freshnest.services.NotificationService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class NotificationCountServelt
 */
@WebServlet("/GetUserUnReadNotificationCount")
public class NotificationCountServelt extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		System.out.println("Yeah");

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");
		System.out.println(userId); 

		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestSenderId(userId);

		NotificationService notificationService = new NotificationService();

		try {
			int count = notificationService.countNotIsReadNotificationCounts(requestAndResponse);
			out.print(count);
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
