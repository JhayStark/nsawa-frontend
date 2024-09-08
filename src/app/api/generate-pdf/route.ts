// pages/api/generate-pdf.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Funeral ID is required' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Replace with the URL of your page
    const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`;

    await page.goto(pageUrl, { waitUntil: 'networkidle2' });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      landscape: true, // Set to landscape
      printBackground: true,
    });

    await browser.close();

    // Set the response headers to indicate a file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=funeral-details.pdf'
    );

    // Send the generated PDF to the client
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
