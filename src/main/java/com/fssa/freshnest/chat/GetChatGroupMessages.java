package com.fssa.freshnest.chat;

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

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetChatBoxDetails
 */
@WebServlet("/GetChatGroupMessages")
public class GetChatGroupMessages extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		int chatId = Integer.parseInt(request.getParameter("chatId"));
		String chatType = request.getParameter("chatType");
		PrintWriter out = response.getWriter();

		HttpSession session = request.getSession();

		Integer userId = (Integer) session.getAttribute("UserId");

		ChatService chatService = new ChatService();
		Chat chat = new Chat();
		chat.setChatId(chatId);
		chat.setUserId(userId);

		try {
			Chat chatGroupDetails;

			if (chatType.equals("direct")) {
				chatGroupDetails = chatService.getDirectChatGroupDetails(chat);
			} else {
				chatGroupDetails = chatService.getGroupChatDetails(chat);
			}

			List<Chat> chatMessages = chatService.getSpecificChatGroupChatMessages(chatGroupDetails);
			chatService.makeChatMessagesAsRead(chatMessages, chatId, userId);

			JSONObject responseObject = new JSONObject();
			responseObject.put("chatGroupDetails", new JSONObject(chatGroupDetails));
			responseObject.put("chatMessages", new JSONArray(chatMessages));

			out.print(responseObject.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}
	}

}
