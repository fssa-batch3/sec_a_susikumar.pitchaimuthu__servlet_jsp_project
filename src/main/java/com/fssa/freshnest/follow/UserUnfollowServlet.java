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
 * Servlet implementation class UserUnfollowServlet
 */
@WebServlet("/UserUnfollowServlet")
public class UserUnfollowServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		int otherUserId = Integer.parseInt( request.getParameter("userId"));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");
		PrintWriter out = response.getWriter();

		FollowConnectionService followConnectionService = new FollowConnectionService();
		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestSenderId(userId);
		requestAndResponse.setRequestReceiverId(otherUserId);
		
		try {
			if(followConnectionService.userUnFollow(requestAndResponse)) {
				out.print("success");
			}
		}catch(ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
