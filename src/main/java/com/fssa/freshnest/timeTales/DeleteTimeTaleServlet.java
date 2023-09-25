package com.fssa.freshnest.timeTales;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fssa.freshnest.model.TimeTales;
import com.fssa.freshnest.services.TimeTalesService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class DeleteTimeTaleServlet
 */
@WebServlet("/DeleteTimeTaleServlet")
public class DeleteTimeTaleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
          int taleId = Integer.parseInt(request.getParameter("taleId"));
          PrintWriter out = response.getWriter();
          
          TimeTalesService timeTalesService = new TimeTalesService();
          TimeTales timeTale = new TimeTales();
          timeTale.setTaleId(taleId);
          
          try {
        	  if(timeTalesService.deleteTimeTalesByTaleId(timeTale)) {
        		  out.print("success");
        	  }
          }catch(ServiceException e) {
        	  out.print(e.getMessage());
          }
	}

}
