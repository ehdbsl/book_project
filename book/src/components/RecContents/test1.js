import * as puppeteer from 'puppeteer';


export async function scrapeBookData() {
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

  const firstThreeResults = results.slice(0, 5);
  console.log(firstThreeResults);

  await browser.close();

  return firstThreeResults;
}

// 함수 실행
scrapeBookData();
