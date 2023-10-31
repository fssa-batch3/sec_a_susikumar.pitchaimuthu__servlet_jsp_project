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

import com.fssa.freshnest.model.RequestAndResponse;
import com.fssa.freshnest.services.NotificationService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class SendTimeTaleMessageServlet
 */
@WebServlet("/SendTimeTaleMessageServlet")
public class SendTimeTaleMessageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}
		JSONObject jsonData = new JSONObject(requestBody.toString());

		String message = jsonData.getString("message");
		int taleId = jsonData.getInt("currentTaleId");
		int receiverId = jsonData.getInt("currentUserId");

		NotificationService notificationService = new NotificationService();

		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestType("tale_reaction");
		requestAndResponse.setRequestSenderId(userId);
		requestAndResponse.setRequestReceiverId(receiverId);
		requestAndResponse.setRequestText(message);

		try {
			if (notificationService.sendTimeTaleMessage(requestAndResponse)) {
				out.print("success");
			}
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
