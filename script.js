// Event listener for the "Generate Resume" button
document.getElementById('generateResume').addEventListener('click', function () {
    var _a;
    // Get input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var skills = document.getElementById('skills').value;
    var work = document.getElementById('work').value;
    var education = document.getElementById('education').value;
    var photo = (_a = document.getElementById('photo').files) === null || _a === void 0 ? void 0 : _a[0];
    // Check if required fields are filled
    if (!username || !name || !email || !skills || !work || !education) {
        alert('Please fill in all the fields.');
        return;
    }
    // Generate unique URL (just an example, replace with your own logic for real URLs)
    var resumeURL = "".concat(username, ".vercel.app/resume");
    // Show the resume preview
    var previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = "\n      <h3>Resume of ".concat(name, "</h3>\n      <p><strong>Email:</strong> ").concat(email, "</p>\n      <p><strong>Skills:</strong> ").concat(skills, "</p>\n      <p><strong>Work Experience:</strong> ").concat(work, "</p>\n      <p><strong>Education:</strong> ").concat(education, "</p>\n      ").concat(photo ? "<img src=\"".concat(URL.createObjectURL(photo), "\" alt=\"User Photo\" style=\"max-width: 100px;\">") : '', "\n      <p><strong>Shareable Link:</strong> <a href=\"").concat(resumeURL, "\" target=\"_blank\">").concat(resumeURL, "</a></p>\n    ");
    document.getElementById('resumePreview').classList.remove('hidden'); // Show preview section
    // Enable PDF download button
    document.getElementById('downloadPDF').addEventListener('click', function () {
        generatePDF(name, email, skills, work, education, photo);
    });
    // Enable copy link functionality
    document.getElementById('copyLink').addEventListener('click', function () {
        navigator.clipboard.writeText(resumeURL);
        alert('Resume link copied to clipboard!');
    });
});
// Function to generate PDF
function generatePDF(name, email, skills, work, education, photo) {
    var jsPDF = window.jspdf.jsPDF; // Make sure jsPDF is loaded
    var doc = new jsPDF();
    doc.text("Name: ".concat(name), 10, 10);
    doc.text("Email: ".concat(email), 10, 20);
    doc.text("Skills: ".concat(skills), 10, 30);
    doc.text("Work Experience: ".concat(work), 10, 40);
    doc.text("Education: ".concat(education), 10, 50);
    if (photo) {
        var img = URL.createObjectURL(photo);
        doc.addImage(img, 'JPEG', 10, 60, 50, 50);
    }
    doc.save("".concat(name, "_resume.pdf"));
}
