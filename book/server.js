const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors()); // CORS 미들웨어 추가

app.get('/top5', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028`);

    await page.waitForSelector('.rankBestContentList');

    const results = await page.evaluate(() => {
      const lis = document.querySelectorAll('.listItem.singleType');
      const formattedResults = [];
      lis.forEach(li => {
          const imgElement = li.querySelector('.coverImage img').getAttribute('src').trim();
          const titleElement = li.querySelector('.itemName').textContent.trim();
          const authorElement = li.querySelector('.itemMeta span:nth-child(1)').textContent.trim();
          const publisherElement = li.querySelector('.itemMeta span:nth-child(2)').textContent.trim();
        formattedResults.push({ imgElement, titleElement, authorElement, publisherElement});
      });
      return formattedResults;
    });

    const topFiveResults = results.slice(0, 5);
    await browser.close();
    
    res.json(topFiveResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
