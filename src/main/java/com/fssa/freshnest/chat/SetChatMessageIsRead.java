package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class SetChatMessageIsRead
 */
@WebServlet("/SetChatMessageIsRead")
public class SetChatMessageIsRead extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
//	protected void doGet(HttpServletRequest request, HttpServletResponse response)
//			throws ServletException, IOException {
//		int chatId = Integer.parseInt(request.getParameter("chatId"));
//
//		HttpSession session = request.getSession();
//		PrintWriter out = response.getWriter();
//
//		Integer userId = (Integer) session.getAttribute("UserId");
//		
//		ChatService chatService = new ChatService();
//		Chat chat = new Chat();
//		chat.setChatId(chatId);
//		chat.setUserId(chatId);
//		
//		try {
//			chatService.makeChatMessagesAsRead(chat);
//		}catch(ServiceException e) {
//			out.print(e.getMessage());
//		}
//
//	}

}
