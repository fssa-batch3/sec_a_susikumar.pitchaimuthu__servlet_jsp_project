package com.fssa.freshnest.notification;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

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
 * Servlet implementation class MakeNotificationIsReadServlet
 */
@WebServlet("/MakeNotificationIsReadServlet")
public class MakeNotificationIsReadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");
		
		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setNotifyAt(timestamp);
		requestAndResponse.setRequestSenderId(userId);
		NotificationService notificationService = new NotificationService();
		
		
		try {
			if(notificationService.makeNoticationAsRead(requestAndResponse)) {
				out.print("success");
			}
			
		}catch(ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
