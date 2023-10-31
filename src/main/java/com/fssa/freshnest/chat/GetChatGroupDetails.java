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

import org.json.JSONObject;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class GetChatGroupDetails
 */
@WebServlet("/GetChatGroupDetails")
public class GetChatGroupDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int chatId = Integer.parseInt(request.getParameter("chatId"));
		String type = request.getParameter("chatType");

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("UserId");

		ChatService chatService = new ChatService();
		Chat chat = new Chat();
		chat.setChatId(chatId);
		chat.setChatType(type);
		JSONObject json = new JSONObject();

		try {
			if (type.equals("group")) {
				Chat groupDetail = chatService.getGroupChatDetails(chat);
				boolean isAdmin = chatService.checkWhetherTheUserIsAdminOrNot(userId, chatId);
				List<Chat> participants = chatService.getChatGroupParticipants(chatId);
				json.put("groupImage", groupDetail.getProfileImage());
				json.put("groupName", groupDetail.getUsername());
				json.put("groupTheme", groupDetail.getGroupTheme());
				json.put("isAdmin", isAdmin);
				json.put("participant", participants);
			} else {
				Chat directDetails = chatService.getDirectChatGroupDetails(chat);
				json.put("groupImage", directDetails.getProfileImage());
				json.put("groupName", directDetails.getUsername());
			}
			out.print(json.toString());
			out.flush();
			out.close();
		} catch (ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
