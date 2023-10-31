package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class chatGroupCreationServlet
 */
@WebServlet("/ChatGroupCreationServlet")
public class ChatGroupCreationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		response.setContentType("application/json");
		PrintWriter out = response.getWriter(); 
		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}
		JSONObject jsonData = new JSONObject(requestBody.toString());

		String groupName = jsonData.getString("chatGroupName");
		String groupImage = jsonData.getString("chatGroupImage");
		String groupTheme = jsonData.getString("chatGroupTheme");

		// Retrieve the chatGroupParticipants array
		JSONArray chatGroupParticipants = jsonData.getJSONArray("chatParticipant");

		int[] participantsId = new int[chatGroupParticipants.length() + 1];

		int count = 0;
		for (int i = 0; i < chatGroupParticipants.length(); i++) {
			participantsId[i] = chatGroupParticipants.getInt(i);
			count++;
		}
		participantsId[count] = userId;

		ChatService chatService = new ChatService();
		Chat chat = new Chat();
		chat.setChatName(groupName);
		chat.setGroupImage(groupImage);
		chat.setGroupTheme(groupTheme);
		chat.setParticipantsId(participantsId);

		try {
			if (chatService.createChatGroup(chat)) {
				chatService.insertChatParticipants(chat);
				out.print("success");
			}
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
