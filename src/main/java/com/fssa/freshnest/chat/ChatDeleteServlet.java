package com.fssa.freshnest.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.Chat;
import com.fssa.freshnest.services.ChatService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class ChatDeleteServlet
 */
@WebServlet("/ChatDeleteServlet")
public class ChatDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		int messageId = Integer.parseInt(request.getParameter("messageId"));
		PrintWriter out = response.getWriter();
		
		ChatService chatService  = new ChatService();
		Chat chat = new Chat();
		chat.setMessageId(messageId);
		
		try {
			if(chatService.deleteChat(chat)) {
				out.print("success");
			}
		}catch(ServiceException e) {
			out.print(e.getMessage());
		}

	}

}
