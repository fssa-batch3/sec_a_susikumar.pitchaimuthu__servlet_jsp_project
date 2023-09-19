package com.fssa.freshnest.follow;

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
import com.fssa.freshnest.services.FollowConnectionService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class SendFollowRequest
 */
@WebServlet("/SendFollowRequest")
public class SendFollowRequest extends HttpServlet {
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
		Integer followerId = (Integer) session.getAttribute("UserId");
		System.out.println(followerId);

		int followingId = jsonData.getInt("followingId"); 
		System.out.println(followingId);
		String followType = jsonData.getString("followType"); 
		System.out.println(followType);

		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestSenderId(followerId);
		requestAndResponse.setRequestReceiverId(followingId);
		
		requestAndResponse.setRequestType(followType);

		FollowConnectionService followConnectionService = new FollowConnectionService();

		try {
			if (followConnectionService.followRequestSendService(requestAndResponse)) {
				out.print("success");
			} else {
				out.println("fail");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
