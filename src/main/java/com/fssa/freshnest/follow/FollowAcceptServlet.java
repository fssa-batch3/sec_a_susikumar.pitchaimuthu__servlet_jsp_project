package com.fssa.freshnest.follow;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.RequestAndResponse;
import com.fssa.freshnest.services.FollowConnectionService;
import com.fssa.freshnest.services.exceptions.ServiceException;



/**
 * Servlet implementation class FollowAcceptServlet
 */
@WebServlet("/FollowAcceptServlet")
public class FollowAcceptServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int receiverId = Integer.parseInt(request.getParameter("userId"));
		HttpSession session = request.getSession(); 
		Integer userId = (Integer) session.getAttribute("UserId");
		PrintWriter out = response.getWriter();
		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestSenderId(userId);
		requestAndResponse.setRequestReceiverId(receiverId);
		requestAndResponse.setRequestType("follow_accept");
		FollowConnectionService followConnectionService = new FollowConnectionService();

		try {
			if (followConnectionService.followRequestAcceptService(requestAndResponse)) {
				out.print("success");
				out.flush();
				out.close();
			}
		} catch (ServiceException e) {
			out.print(e.getMessage());

		}
	}

}
