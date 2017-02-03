package com.buildix.glorem.services.impl;

import com.buildix.glorem.models.EstimateForm;
import com.buildix.glorem.models.TypeJob;
import com.buildix.glorem.services.EstimateFormService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.UserDao;
import com.buildix.glorem.models.User;
import com.buildix.glorem.services.MailSenderService;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import org.apache.log4j.Logger;

@Service
@Transactional
public class MailSenderServiceImpl implements MailSenderService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private JavaMailSender javaMailService;
	@Autowired
    private EstimateFormService estimateFormService;

	private final Logger logger = Logger.getLogger(MailSenderServiceImpl.class);
	@Override
	public void sendCustomerEmail(Integer id) throws DocumentException, FileNotFoundException {


	    userDao.changeStatusToSend(id);
		User user = userDao.getUserByUserId(id);

        File attachment = createPDF(user);
        String msg = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
                "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
                "<head>\n" +
                "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n" +
                "    <title>Welcome</title>\n" +
                "\n" +
                "    <style type=\"text/css\">\n" +
                "    /* Take care of image borders and formatting, client hacks */\n" +
                "    img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}\n" +
                "    a img { border: none; }\n" +
                "    table { border-collapse: collapse !important;}\n" +
                "    #outlook a { padding:0; }\n" +
                "    .ReadMsgBody { width: 100%; }\n" +
                "    .ExternalClass { width: 100%; }\n" +
                "    .backgroundTable { margin: 0 auto; padding: 0; width: 100% !important; }\n" +
                "    table td { border-collapse: collapse; }\n" +
                "    .ExternalClass * { line-height: 115%; }\n" +
                "    .container-for-gmail-android { min-width: 600px; }\n" +
                "\n" +
                "\n" +
                "    /* General styling */\n" +
                "    * {\n" +
                "      font-family: Helvetica, Arial, sans-serif;\n" +
                "    }\n" +
                "\n" +
                "    body {\n" +
                "      -webkit-font-smoothing: antialiased;\n" +
                "      -webkit-text-size-adjust: none;\n" +
                "      width: 100% !important;\n" +
                "      margin: 0 !important;\n" +
                "      height: 100%;\n" +
                "      color: #676767;\n" +
                "    }\n" +
                "\n" +
                "    td {\n" +
                "      font-family: Helvetica, Arial, sans-serif;\n" +
                "      font-size: 14px;\n" +
                "      color: #777777;\n" +
                "      text-align: center;\n" +
                "      line-height: 21px;\n" +
                "    }\n" +
                "\n" +
                "    a {\n" +
                "      color: #676767;\n" +
                "      text-decoration: none !important;\n" +
                "    }\n" +
                "\n" +
                "    .pull-left {\n" +
                "      text-align: left;\n" +
                "    }\n" +
                "\n" +
                "    .pull-right {\n" +
                "      text-align: right;\n" +
                "    }\n" +
                "\n" +
                "    .header-lg,\n" +
                "    .header-md,\n" +
                "    .header-sm {\n" +
                "      font-size: 32px;\n" +
                "      font-weight: 700;\n" +
                "      line-height: normal;\n" +
                "      padding: 35px 0 0;\n" +
                "      color: #4d4d4d;\n" +
                "    }\n" +
                "\n" +
                "    .header-md {\n" +
                "      font-size: 24px;\n" +
                "    }\n" +
                "\n" +
                "    .header-sm {\n" +
                "      padding: 5px 0;\n" +
                "      font-size: 18px;\n" +
                "      line-height: 1.3;\n" +
                "    }\n" +
                "\n" +
                "    .content-padding {\n" +
                "      padding: 20px 0 30px;\n" +
                "    }\n" +
                "\n" +
                "    .mobile-header-padding-right {\n" +
                "      width: 290px;\n" +
                "      text-align: right;\n" +
                "      padding-left: 10px;\n" +
                "    }\n" +
                "\n" +
                "    .mobile-header-padding-left {\n" +
                "      width: 290px;\n" +
                "      text-align: left;\n" +
                "      padding-left: 10px;\n" +
                "    }\n" +
                "\n" +
                "    .free-text {\n" +
                "      width: 100% !important;\n" +
                "      padding: 10px 60px 0px;\n" +
                "    }\n" +
                "\n" +
                "    .block-rounded {\n" +
                "      border-radius: 5px;\n" +
                "      border: 1px solid #e5e5e5;\n" +
                "      vertical-align: top;\n" +
                "    }\n" +
                "\n" +
                "    .button {\n" +
                "      padding: 30px 0;\n" +
                "    }\n" +
                "\n" +
                "    .info-block {\n" +
                "      padding: 0 20px;\n" +
                "      width: 260px;\n" +
                "    }\n" +
                "\n" +
                "    .block-rounded {\n" +
                "      width: 260px;\n" +
                "    }\n" +
                "\n" +
                "    .info-img {\n" +
                "      width: 258px;\n" +
                "      border-radius: 5px 5px 0 0;\n" +
                "    }\n" +
                "\n" +
                "    .force-width-gmail {\n" +
                "      min-width:600px;\n" +
                "      height: 0px !important;\n" +
                "      line-height: 1px !important;\n" +
                "      font-size: 1px !important;\n" +
                "    }\n" +
                "\n" +
                "    .button-width {\n" +
                "      width: 228px;\n" +
                "    }\n" +
                "\n" +
                "  </style>\n" +
                "\n" +
                "    <style type=\"text/css\" media=\"screen\">\n" +
                "    @import url(http://fonts.googleapis.com/css?family=Oxygen:400,700);\n" +
                "  </style>\n" +
                "\n" +
                "    <style type=\"text/css\" media=\"screen\">\n" +
                "    @media screen {\n" +
                "      /* Thanks Outlook 2013! */\n" +
                "      * {\n" +
                "        font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\n" +
                "      }\n" +
                "    }\n" +
                "  </style>\n" +
                "\n" +
                "    <style type=\"text/css\" media=\"only screen and (max-width: 480px)\">\n" +
                "    /* Mobile styles */\n" +
                "    @media only screen and (max-width: 480px) {\n" +
                "\n" +
                "      table[class*=\"container-for-gmail-android\"] {\n" +
                "        min-width: 290px !important;\n" +
                "        width: 100% !important;\n" +
                "      }\n" +
                "\n" +
                "      table[class=\"w320\"] {\n" +
                "        width: 320px !important;\n" +
                "      }\n" +
                "\n" +
                "      img[class=\"force-width-gmail\"] {\n" +
                "        display: none !important;\n" +
                "        width: 0 !important;\n" +
                "        height: 0 !important;\n" +
                "      }\n" +
                "\n" +
                "      a[class=\"button-width\"],\n" +
                "      a[class=\"button-mobile\"] {\n" +
                "        width: 248px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class*=\"mobile-header-padding-left\"] {\n" +
                "        width: 160px !important;\n" +
                "        padding-left: 0 !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class*=\"mobile-header-padding-right\"] {\n" +
                "        width: 160px !important;\n" +
                "        padding-right: 0 !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class=\"header-lg\"] {\n" +
                "        font-size: 24px !important;\n" +
                "        padding-bottom: 5px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class=\"header-md\"] {\n" +
                "        font-size: 18px !important;\n" +
                "        padding-bottom: 5px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class=\"content-padding\"] {\n" +
                "        padding: 5px 0 30px !important;\n" +
                "      }\n" +
                "\n" +
                "       td[class=\"button\"] {\n" +
                "        padding: 5px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class*=\"free-text\"] {\n" +
                "        padding: 10px 18px 30px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class=\"info-block\"] {\n" +
                "        display: block !important;\n" +
                "        width: 280px !important;\n" +
                "        padding-bottom: 40px !important;\n" +
                "      }\n" +
                "\n" +
                "      td[class=\"info-img\"],\n" +
                "      img[class=\"info-img\"] {\n" +
                "        width: 278px !important;\n" +
                "      }\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "\n" +
                "<body bgcolor=\"#f7f7f7\">\n" +
                "<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"container-for-gmail-android\" width=\"100%\">\n" +
                "    <tr>\n" +
                "        <td align=\"left\" valign=\"top\" width=\"100%\" style=\"background:repeat-x url(http://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg) #ffffff;\">\n" +
                "            <center>\n" +
                "                <img src=\"http://s3.amazonaws.com/swu-filepicker/SBb2fQPrQ5ezxmqUTgCr_transparent.png\" class=\"force-width-gmail\">\n" +
                "                <table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" bgcolor=\"#ffffff\" background=\"http://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg\" style=\"background-color:transparent\">\n" +
                "                    <tr>\n" +
                "                        <td width=\"100%\" height=\"80\" valign=\"top\" style=\"text-align: center; vertical-align:middle;background-color:darkgrey;\">\n" +
                "                            <!--[if gte mso 9]>\n" +
                "                            <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"mso-width-percent:1000;height:80px; v-text-anchor:middle;\">\n" +
                "                                <v:fill type=\"tile\" src=\"http://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg\" color=\"#ffffff\" />\n" +
                "                                <v:textbox inset=\"0,0,0,0\">\n" +
                "                            <![endif]-->\n" +
                "                            <center>\n" +
                "                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"600\" class=\"w320\">\n" +
                "                                    <tr>\n" +
                "                                        <td class=\"pull-left mobile-header-padding-left\" style=\"vertical-align: middle;\">\n" +
                "                                            <a href=\"\">Glorem</a>\n" +
                "                                        </td>\n" +
                "                                        <td class=\"pull-right mobile-header-padding-right\" style=\"color: #4d4d4d;\">\n" +
                "                                            <a href=\"\"><img width=\"44\" height=\"47\" src=\"http://s3.amazonaws.com/swu-filepicker/k8D8A7SLRuetZspHxsJk_social_08.gif\" alt=\"twitter\" /></a>\n" +
                "                                            <a href=\"\"><img width=\"38\" height=\"47\" src=\"http://s3.amazonaws.com/swu-filepicker/LMPMj7JSRoCWypAvzaN3_social_09.gif\" alt=\"facebook\" /></a>\n" +
                "                                            <a href=\"\"><img width=\"40\" height=\"47\" src=\"http://s3.amazonaws.com/swu-filepicker/hR33ye5FQXuDDarXCGIW_social_10.gif\" alt=\"rss\" /></a>\n" +
                "                                        </td>\n" +
                "                                    </tr>\n" +
                "                                </table>\n" +
                "                            </center>\n" +
                "                            <!--[if gte mso 9]>\n" +
                "                            </v:textbox>\n" +
                "                            </v:rect>\n" +
                "                            <![endif]-->\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "            </center>\n" +
                "        </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"100%\" style=\"background-color: #f7f7f7;\" class=\"content-padding\">\n" +
                "            <center>\n" +
                "                <table cellspacing=\"0\" cellpadding=\"0\" width=\"600\" class=\"w320\">\n" +
                "                    <tr>\n" +
                "                        <td class=\"header-lg\">\n" +
                "                            Welcome to Glorem LLC!\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td class=\"free-text\">\n" +
                "                            Thank you for inquire with Glorem LLC! We hope you enjoy your time with us. Check out estimate for your upcoming project below or click the button to view your estimate.\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td class=\"button\">\n" +
                "                            <div><!--[if mso]>\n" +
                "                                <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"http://35.165.140.157:8080\" style=\"height:45px;v-text-anchor:middle;width:155px;\" arcsize=\"15%\" strokecolor=\"#ffffff\" fillcolor=\"#ff6f6f\">\n" +
                "                                    <w:anchorlock/>\n" +
                "                                    <center style=\"color:#ffffff;font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;\">My Estimate</center>\n" +
                "                                </v:roundrect>\n" +
                "                                <![endif]--><a class=\"button-mobile\" href=\"http://35.165.140.157:8080\"\n" +
                "                                               style=\"background-color:#ff6f6f;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Cabin', Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;line-height:45px;text-align:center;text-decoration:none;width:155px;-webkit-text-size-adjust:none;mso-hide:all;\">My Estimate</a></div>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "            </center>\n" +
                "        </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "        <td align=\"center\" valign=\"top\" width=\"100%\" style=\"background-color: #f7f7f7; height: 100px;\">\n" +
                "            <center>\n" +
                "                <table cellspacing=\"0\" cellpadding=\"0\" width=\"600\" class=\"w320\">\n" +
                "                    <tr>\n" +
                "                        <td style=\"padding: 25px 0 25px\">\n" +
                "                            <strong>Glorem LLC</strong><br />\n" +
                "                            (443)-224-3124<br />\n" +
                "                            1234 Awesome St <br />\n" +
                "                            Baltimore, MD.<br /><br />\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "            </center>\n" +
                "        </td>\n" +
                "    </tr>\n" +
                "</table>\n" +
                "</body>\n" +
                "</html>\n";

		final String username = "glorem.projects@gmail.com";
		final String password = "Glorem44";

		Properties props = new Properties();
		props.put("mail.smtp.auth", true);
		props.put("mail.smtp.starttls.enable", true);
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("glorem.projects@gmail.com"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse("kuznetsov74@gmail.com,contact_us@gloremllc.com"));
			message.setSubject("Glorem LLC Estimate");
            message.setSentDate(new Date());

            Multipart multipart = new MimeMultipart();

            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(msg, "text/html; charset=utf-8");

            MimeBodyPart attachPart = new MimeBodyPart();
			DataSource source = new FileDataSource(attachment);
            attachPart.setDataHandler(new DataHandler(source));
            attachPart.setFileName("estimate.pdf");

			multipart.addBodyPart(messageBodyPart);
			multipart.addBodyPart(attachPart);

			message.setContent(multipart);

			logger.info("Sending");
			Transport.send(message);
			logger.info("Done");

		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

    private File createPDF(User user) throws DocumentException, FileNotFoundException {
        List<EstimateForm> estimate = estimateFormService.getCustomerEstimate(user.getId());

        String dest = "pdfEstimates/estimate.pdf";
        File file = new File(dest);
        file.getParentFile().mkdirs();

        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream(dest));
        document.open();
        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);

        Font headerFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.BLACK );
        Font boldItalic = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLDITALIC, BaseColor.BLACK );
        Font normal = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL, BaseColor.BLACK );

        BaseColor header = new BaseColor(217,217,217);
        BaseColor redLine = new BaseColor(155,58,56);
        BaseColor peach = new BaseColor(253,234,218);
        BaseColor main = new BaseColor(248,248,248);

        PdfPCell mainCell = new PdfPCell(new Paragraph("PROPOSAL", headerFont));
        mainCell.setColspan(3);
        mainCell.setBackgroundColor(header);
        mainCell.setMinimumHeight(25);
        mainCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        mainCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(mainCell);

        PdfPCell redCell = new PdfPCell(new Phrase(""));
        redCell.setColspan(3);
        redCell.setBackgroundColor(redLine);
        redCell.setFixedHeight(2);
        table.addCell(redCell);


        Paragraph info = new Paragraph("Info:", boldItalic);
        PdfPCell infoCell = new PdfPCell(info);
        infoCell.setColspan(3);
        infoCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        infoCell.setBackgroundColor(peach);
        infoCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(infoCell);


        PdfPCell fnCell = new PdfPCell(new Paragraph("First name: " + user.getName(), normal));
        fnCell.setColspan(1);
        fnCell.setBackgroundColor(main);
        table.addCell(fnCell);

        PdfPCell lnCell = new PdfPCell(new Paragraph("Last name: "+ user.getLastName(), normal));
        lnCell.setColspan(1);
        lnCell.setBackgroundColor(main);
        table.addCell(lnCell);

        PdfPCell phCell = new PdfPCell(new Paragraph("Phone number: " + user.getPhoneNumber(), normal));
        phCell.setColspan(1);
        phCell.setBackgroundColor(main);
        table.addCell(phCell);

        PdfPCell addressCell = new PdfPCell(new Paragraph("Address: " + user.getAddress(), normal));
        addressCell.setColspan(2);
        addressCell.setBackgroundColor(main);
        table.addCell(addressCell);

        PdfPCell emailCell = new PdfPCell(new Paragraph("Email: " + user.getEmail(), normal));
        emailCell.setColspan(1);
        emailCell.setBackgroundColor(main);
        table.addCell(emailCell);

        PdfPCell totalCell = new PdfPCell(new Paragraph("TOTAL PRICE:\nDISCOUNT:\nGRANDTOTAL:", boldItalic));
        totalCell.setColspan(2);
        totalCell.setBackgroundColor(peach);
        totalCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(totalCell);

        String discount = user.getCustomerDiscount() == null ? "" : "$" + user.getCustomerDiscount();
        PdfPCell totalPriceCell = new PdfPCell(new Paragraph("$" + user.getCustomerTotal() + "\n" + discount + "\n$" + user.getCustomerGrandTotal(), boldItalic));
        totalPriceCell.setColspan(1);
        totalPriceCell.setBackgroundColor(peach);
        totalPriceCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.addCell(totalPriceCell);

        String notes = user.getNotes() == null ? "" : user.getNotes();
        PdfPCell noteCell = new PdfPCell(new Paragraph(
                "Notes:\nAll building, plumbing. electrical materials and supplies included" +
                        "\nHomeowner provide:\n\n" + notes, normal));
        noteCell.setColspan(3);
        noteCell.setBackgroundColor(main);
        table.addCell(noteCell);
        document.add(table);

        PdfPTable table2 = new PdfPTable(10);
        table2.setWidthPercentage(100);

        PdfPCell descCell = new PdfPCell(new Paragraph("Work description", boldItalic));
        descCell.setColspan(5);
        descCell.setMinimumHeight(25);
        descCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        descCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        descCell.setBackgroundColor(header);
        table2.addCell(descCell);

        PdfPCell amountCell = new PdfPCell(new Paragraph("Amount", boldItalic));
        amountCell.setColspan(1);
        amountCell.setMinimumHeight(25);
        amountCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        amountCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        amountCell.setBackgroundColor(header);
        table2.addCell(amountCell);

        PdfPCell priceCell = new PdfPCell(new Paragraph("Price", boldItalic));
        priceCell.setColspan(1);
        priceCell.setMinimumHeight(25);
        priceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        priceCell.setBackgroundColor(header);
        table2.addCell(priceCell);

        PdfPCell unitCell = new PdfPCell(new Paragraph("Unit", boldItalic));
        unitCell.setColspan(1);
        unitCell.setMinimumHeight(25);
        unitCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        unitCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        unitCell.setBackgroundColor(header);
        table2.addCell(unitCell);

        PdfPCell miniCell = new PdfPCell(new Paragraph("Minimum charge", boldItalic));
        miniCell.setColspan(1);
        miniCell.setMinimumHeight(25);
        miniCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        miniCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        miniCell.setBackgroundColor(header);
        table2.addCell(miniCell);

        PdfPCell totalHeaderCell = new PdfPCell(new Paragraph("Total", boldItalic));
        totalHeaderCell.setColspan(1);
        totalHeaderCell.setMinimumHeight(25);
        totalHeaderCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        totalHeaderCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        totalHeaderCell.setBackgroundColor(header);
        table2.addCell(totalHeaderCell);

        redCell.setColspan(10);
        table2.addCell(redCell);

        //For loop first - chapters
        for(int i = 0 ; i<estimate.size();i++) {
            EstimateForm chapter = estimate.get(i);
            PdfPCell p = new PdfPCell(new Paragraph(chapter.getChapterName(), boldItalic));
            p.setColspan(10);
            p.setVerticalAlignment(Element.ALIGN_MIDDLE);
            p.setBackgroundColor(peach);
            p.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(p);
            for(int j = 1; j<=chapter.getTjList().size();j++) {
                //For loop second - items
                TypeJob item = estimate.get(i).getTjList().get(j-1);
                PdfPCell itemDesc = new PdfPCell(new Paragraph(j + ". " + item.getWorkDescription(), normal));
                itemDesc.setColspan(5);
                itemDesc.setBackgroundColor(main);
                table2.addCell(itemDesc);

                PdfPCell itemAmount = new PdfPCell(new Paragraph(item.getAmount(), normal));
                itemAmount.setColspan(1);
                itemAmount.setBackgroundColor(main);
                itemAmount.setHorizontalAlignment(Element.ALIGN_LEFT);
                table2.addCell(itemAmount);

                PdfPCell itemPrice = new PdfPCell(new Paragraph("$" + item.getPrice(), normal));
                itemPrice.setColspan(1);
                itemPrice.setBackgroundColor(main);
                itemPrice.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table2.addCell(itemPrice);

                PdfPCell itemUnit = new PdfPCell(new Paragraph(item.getUnitName(), normal));
                itemUnit.setColspan(1);
                itemUnit.setBackgroundColor(main);
                table2.addCell(itemUnit);

                String minimumCharge = item.getMinimumCharge() == null ? "" : "$" + item.getMinimumCharge();
                PdfPCell itemMini = new PdfPCell(new Paragraph(minimumCharge, normal));
                itemMini.setColspan(1);
                itemMini.setBackgroundColor(main);
                itemMini.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table2.addCell(itemMini);

                PdfPCell itemTotal = new PdfPCell(new Paragraph("$" + item.getTotal(), normal));
                itemTotal.setColspan(1);
                itemTotal.setBackgroundColor(main);
                itemTotal.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table2.addCell(itemTotal);
            }
        }
        document.add(table2);
        document.close();

        return file;
    }

    @Override
	public void emailEstimateFromCustomer(Integer id) {

		User user = userDao.getUserByUserId(id);

		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo("kuznetsov74@gmail.com");
		mailMessage.setSubject("Estimate has been modifyed!");
		mailMessage.setText(
				"Dear manager. \n\n" + user.getName() + " " + user.getLastName() + " has modify his\\her estimate.\n\n "
						+ "Please login to web-application to http://35.165.140.157:8080 to see changes in estimate."
						+ "\n\nGlorem LLC\nClean. Beautifull. In time\n(123) 456-7890");
		javaMailService.send(mailMessage);
	}

}
