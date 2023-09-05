package com.fssa.freshnest;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Base64;

import javax.imageio.ImageIO;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fssa.freshnest.model.User;
import com.fssa.freshnest.services.UserService;
import com.fssa.freshnest.services.exceptions.ServiceException;

/**
 * Servlet implementation class RegisterServlet
 * 
 * @author SusikumarPitchaimuth
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public static String generateAvatarImageUrl(String name) throws IOException {
		char avatarText = Character.toUpperCase(name.charAt(0));

		int width = 200;
		int height = 200;

		BufferedImage avatarImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics = avatarImage.createGraphics();

		// Create a random color
		Color randomColor = new Color((float) Math.random(), (float) Math.random(), (float) Math.random());
		graphics.setColor(randomColor);
		graphics.fillRect(0, 0, width, height);

		// Draw text
		graphics.setFont(new Font("Assistant", Font.BOLD, 100));
		graphics.setColor(Color.WHITE);
		FontMetrics fontMetrics = graphics.getFontMetrics();
		int textX = (width - fontMetrics.stringWidth(String.valueOf(avatarText))) / 2;
		int textY = (height - fontMetrics.getHeight()) / 2 + fontMetrics.getAscent();
		graphics.drawString(String.valueOf(avatarText), textX, textY);

		graphics.dispose();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(avatarImage, "png", baos);

		byte[] bytes = baos.toByteArray();
		String imageUrl = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
		

		return imageUrl;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String firstName = request.getParameter("firstname");
		String lastName = request.getParameter("lastname");
		String userName = request.getParameter("username");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String avatar = generateAvatarImageUrl(firstName);

		PrintWriter out = response.getWriter();

		UserService userService = new UserService();
		User user1 = new User(email, userName, password, firstName, lastName, avatar);
		try {

			if (userService.registerUser(user1)) {
				out.println("Registration successful");

				HttpSession session = request.getSession();
				session.setAttribute("registeredEmail", email);

				RequestDispatcher dispatcher = request.getRequestDispatcher("./pages/birthday.jsp");
				dispatcher.forward(request, response);
			} else {
				out.println("Registration failed");
				RequestDispatcher dispatcher = request.getRequestDispatcher("./pages/register.jsp");
				dispatcher.forward(request, response);
			}

		} catch (ServiceException e) {
			System.out.println(e.getMessage());
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("./pages/register.jsp");
	}

}
