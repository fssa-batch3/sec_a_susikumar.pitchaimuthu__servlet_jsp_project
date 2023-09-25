package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class getAllUserChatFriends
 */
@WebServlet("/GetAllUserChatFriends")
public class GetAllUserChatFriends extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		PrintWriter out = response.getWriter();

		Integer userId = (Integer) session.getAttribute("UserId");
		System.out.println("getAll " + userId);

		ChatService chatService = new ChatService();

		try {
			
			List<Chat> chatGroups = chatService.getUserChatGroups(userId);
			List<Chat> groups = new ArrayList<>(); 
			
			for (Chat ch : chatGroups) {
			    String chatType = ch.getChatType(); 
			    int chatId = ch.getChatId();
			    System.out.println(chatType);
			    System.out.println(chatId);
			    if(chatType.equals("direct")) {
			    	groups.add(chatService.getUserDirectConversationGroupDetails(chatId));
			    }else {
			    	groups.add(chatService.getUserGroupConversationGroupDetails(chatId));
			    }
			}
			
			JSONArray userChatGroup = new JSONArray(groups);
			out.print(userChatGroup.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

} 
