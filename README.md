Send Mail in node
===================

Sending mail to students from csv file

How To
-----------
#### Set up
- Download repo
- npm install
- Create auth.txt under ./ containing "Gmail address","Gmail 3rd party app Password". Note: do not add @gmail.com. See 3rd party password here: https://www.google.com/settings/security/lesssecureapps

#### Other things needed
Set up the csv like the Yfirlit_Test.csv is set up. First line is the email, line 2 to n - 2 are grades for each factor, line n - 1 is total grade and line n is comments.

#### Sending mail
- npm start
- localhost:3000
- Put in the assignment number at the top
- For each grading factor of the assignment add a line. The left box is the text and left is the value of each factor
- Check "send mail" if you want the mail to be sent.
- Finally upload the csv and the code will return

#### Output
- Local copy of each file made in ./out
- email sent to each mail in the csv with the corresponding grade
