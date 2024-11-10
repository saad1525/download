// Event listener for the "Generate Resume" button
document.getElementById('generateResume')!.addEventListener('click', () => {
    // Get input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const work = (document.getElementById('work') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const photo = (document.getElementById('photo') as HTMLInputElement).files?.[0];
  
    // Check if required fields are filled
    if (!username || !name || !email || !skills || !work || !education) {
      alert('Please fill in all the fields.');
      return;
    }
  
    // Generate unique URL (just an example, replace with your own logic for real URLs)
    const resumeURL = `${username}.vercel.app/resume`;
  
    // Show the resume preview
    const previewContent = document.getElementById('previewContent')!;
    previewContent.innerHTML = `
      <h3>Resume of ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Skills:</strong> ${skills}</p>
      <p><strong>Work Experience:</strong> ${work}</p>
      <p><strong>Education:</strong> ${education}</p>
      ${photo ? `<img src="${URL.createObjectURL(photo)}" alt="User Photo" style="max-width: 100px;">` : ''}
      <p><strong>Shareable Link:</strong> <a href="${resumeURL}" target="_blank">${resumeURL}</a></p>
    `;
    document.getElementById('resumePreview')!.classList.remove('hidden'); // Show preview section
  
    // Enable PDF download button
    document.getElementById('downloadPDF')!.addEventListener('click', () => {
      generatePDF(name, email, skills, work, education, photo);
    });
  
    // Enable copy link functionality
    document.getElementById('copyLink')!.addEventListener('click', () => {
      navigator.clipboard.writeText(resumeURL);
      alert('Resume link copied to clipboard!');
    });
  });
  
  // Function to generate PDF
  function generatePDF(name: string, email: string, skills: string, work: string, education: string, photo: File | undefined) {
    const { jsPDF } = (window as any).jspdf;  // Make sure jsPDF is loaded
  
    const doc = new jsPDF();
    
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Skills: ${skills}`, 10, 30);
    doc.text(`Work Experience: ${work}`, 10, 40);
    doc.text(`Education: ${education}`, 10, 50);
  
    if (photo) {
      const img = URL.createObjectURL(photo);
      doc.addImage(img, 'JPEG', 10, 60, 50, 50);
    }
  
    doc.save(`${name}_resume.pdf`);
  }
  