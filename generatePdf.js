const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream("output.pdf"));

// Embed a font, set the font size, and render some text
doc
  .fillColor("#4169E1")
  .font("Fonts/Roboto/Roboto-Bold.ttf")
  .fontSize(25)
  .text("2024 Asia import prevision ", 10, 100, { align: "center" });

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image("assets/containerShip.jpg", 5, 200, {
  fit: [600, 800],
});

// Add another page
doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

// Draw a triangle
doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
  .fill("red", "even-odd")
  .restore();

// Add New page with a link
doc.addPage();
const linkText = "Here is a link!";

const widthLink = doc.widthOfString(linkText);
const xLinkText = 150 + widthLink * 0.5;
const yLinkText = 10;

doc.fillColor("blue").text(linkText, xLinkText, yLinkText);

doc
  .underline(xLinkText, yLinkText + 10, widthLink, 15, {
    color: "#0000FF",
  })
  .link(xLinkText, yLinkText, widthLink, 30, "http://google.com/");

// Finalize PDF file
doc.end();
