package com.fssa.freshnest.timeTales;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.freshnest.model.TimeTales;
import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.TimeTalesService;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetUserFriendsTimeTalesServlet
 */
@WebServlet("/GetUserFriendsTimeTalesServlet")
public class GetUserFriendsTimeTalesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		UserService userService = new UserService();
		TimeTalesService timeTalesService = new TimeTalesService();

		try {
			List<User> userFriends = userService.getAllUserFriends(userId);
			JSONArray userFriendsTimeTale = new JSONArray();

			for (User ch : userFriends) {
				JSONArray tempUserData = new JSONArray();
				int id = ch.getUserId();
				List<TimeTales> tales = timeTalesService.getUserFriendsTimeTales(id);

				for (int i = 0; i < tales.size(); i++) {
					JSONObject object = new JSONObject();
					object.put("taleId", tales.get(i).getTaleId());
					object.put("media", tales.get(i).getMedia_url());
					object.put("userId", tales.get(i).getUserId());
					object.put("createdAt", tales.get(i).getCreatedAt());
					object.put("duration", tales.get(i).getTaleDuration());
					object.put("profileImage", tales.get(i).getUser().getProfileImage());
					object.put("username", tales.get(i).getUser().getUsername());
					tempUserData.put(object);
				}
				userFriendsTimeTale.put(tempUserData);
			}

			out.print(userFriendsTimeTale.toString());
			out.flush();
		} catch (ServiceException e) {
			out.print(e.getMessage());
			out.flush();
		} finally {
			out.close();
		}

	}

}
