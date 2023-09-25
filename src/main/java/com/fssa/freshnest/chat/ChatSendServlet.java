package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class ChatSendServlet
 */
@WebServlet("/ChatSendServlet")
public class ChatSendServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		PrintWriter out = response.getWriter();

		// Retrieve data from the request body
		StringBuilder requestBody = new StringBuilder();
		String line;
		while ((line = request.getReader().readLine()) != null) {
			requestBody.append(line);
		}
		JSONObject jsonData = new JSONObject(requestBody.toString());

		HttpSession session = request.getSession();

		Integer userId = (Integer) session.getAttribute("UserId");

		String chatMessage = jsonData.getString("chatMessage");
		int chatId = jsonData.getInt("chatId");

		ChatService chatService = new ChatService();
		Chat chat = new Chat();
		chat.setChatId(chatId);
		chat.setChatMessage(chatMessage);
		chat.setSenderId(userId);
		try {
			if (chatService.createChat(chat)) {
				out.print("success");
			}

		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}
}