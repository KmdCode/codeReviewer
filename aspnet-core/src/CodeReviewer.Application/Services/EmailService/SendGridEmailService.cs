﻿using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeReviewer.Services.EmailService
{
    public interface ISendGridEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string htmlContent);
    }

    public class SendGridEmailService : ISendGridEmailService
    {
        private readonly ISendGridClient _client;
        private readonly string _fromEmail;
        private readonly string _fromName;

        public SendGridEmailService(ISendGridClient client, IConfiguration config)
        {
            _client = client;
            _fromEmail = config["SendGrid:FromEmail"];
            _fromName = config["SendGrid:FromName"];
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlContent)
        {
            var from = new EmailAddress(_fromEmail, _fromName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, htmlContent, htmlContent);
            await _client.SendEmailAsync(msg);
        }
    }
}
