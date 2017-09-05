(function () {
    "use strict";
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var ui = WinJS.UI;
    var htmlinited = false;
    var editor;
    var asynCancel = null;
    var m_atts = new Array();
    ui.Pages.define("/default.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            init_gui();
        },

        unload: function () {

        }

    });

    function init_gui() {

        // add OnClick event handler
        var btn = document.getElementById("btnSend");
        btn.addEventListener("click", send_email, false);
    }

    function send_email() {
      console.log("test")
        var result = "";

        var oMail = new EASendMailRT.SmtpMail("TryIt");

        // Set Gmail sender email address, please change it to yours
        oMail.from = new EASendMailRT.MailAddress("ketillgudmunds@gmail.com");

        // Add recipient email address, please change it to yours
        oMail.to.add(new EASendMailRT.MailAddress("ketillgudmunds@emailarchitect.net"));

        // Set email subject
        oMail.subject = "test email from JavaScript HTML5 project";

        // Set email body
        oMail.textBody = "this is a test email sent from Windows Store App using Gmail.";

        // Gmail SMTP server address
        var oServer = new EASendMailRT.SmtpServer("smtp.gmail.com");

        // User and password for Gmail authentication
        oServer.user = "ketillgudmunds@gmail.com";
        oServer.password = "hkiurdrzzwwiuzhc";

        // Enable SS connection on 465 port
        oServer.port = 465;
        oServer.connectType = EASendMailRT.SmtpConnectType.connectSSLAuto;

        var oSmtp = new EASendMailRT.SmtpClient();

        var btn = document.getElementById("btnSend");
        btn.disabled = true;
        oSmtp.sendMailAsync(oServer, oMail).then(function (e) {
            result = "Email was sent successfully!";

            // Display Result by Diaglog box
            (new Windows.UI.Popups.MessageDialog(result, "Success")).showAsync();
            btn.disabled = false;
        },

        function (e) {
            // because javascript exception only gives the stack trace messages, but it is not
            // real description of exception, so we give a property lastErrorMessage for javascript.
            if (oSmtp.lastErrorMessage != "") {
                result = oSmtp.lastErrorMessage;
            }
            else {
                result = e.message;
            }
            oSmtp.close();

            // Display Result by Diaglog box
            (new Windows.UI.Popups.MessageDialog(result, "Error Information")).showAsync();
            btn.disabled = false;
        });
    }
})();
