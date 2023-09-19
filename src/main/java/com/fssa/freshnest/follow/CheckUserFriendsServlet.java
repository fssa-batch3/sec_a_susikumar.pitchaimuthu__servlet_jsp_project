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
 * Servlet implementation class CheckUserFriendsServlet
 */
@WebServlet("/CheckUserFriendsServlet")
public class CheckUserFriendsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String id = request.getParameter("userId");
		System.out.println(id);
		
		int userId = Integer.parseInt(id);
		PrintWriter out = response.getWriter();

		HttpSession session = request.getSession();
		Integer loggedInUserId = (Integer) session.getAttribute("UserId");
		RequestAndResponse requestAndResponse = new RequestAndResponse();
		requestAndResponse.setRequestSenderId(userId);
		requestAndResponse.setRequestReceiverId(loggedInUserId);

		FollowConnectionService followConnectionService = new FollowConnectionService();

		try {
			if (followConnectionService.checkWhetherUserFollowingOrNot(requestAndResponse)) {
				out.print("follow");
			} else {
				out.print("not follow");
			}
		} catch (ServiceException e) {
			e.printStackTrace();
		}
	}

}
