package com.fssa.freshnest.notification;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.freshnest.model.RequestAndResponse;
import com.fssa.freshnest.services.NotificationService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class NotificationDetailsServlet
 */
@WebServlet("/NotificationDetailsServlet")
public class NotificationDetailsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		int notificationId = Integer.parseInt(request.getParameter("notificationId"));
		PrintWriter out = response.getWriter();
		
		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setNotificationId(notificationId);
		
		NotificationService notificationService = new NotificationService();
		
		try {	
			RequestAndResponse notificationDetail =	notificationService.readNotificationDetails(requestAndResponse);
			JSONObject obj = new JSONObject(notificationDetail);
			out.print(obj);
			out.flush();
			out.close();
		}catch(ServiceException e) {
			out.print(e.getMessage());
			
		}
	}

	

}
