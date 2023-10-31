package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class UpdateChatGroupDetailsServlet
 */
@WebServlet("/UpdateChatGroupDetailsServlet")
public class UpdateChatGroupDetailsServlet extends HttpServlet {
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

		String groupName = jsonData.getString("groupName");
		String groupTheme = jsonData.getString("groupTheme");
		int chatId = jsonData.getInt("chatId");

		ChatService chatService = new ChatService();

		try {
			chatService.updateChatGroupDetails(groupName, groupTheme , chatId);
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
