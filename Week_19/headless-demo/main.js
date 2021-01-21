const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:8080/main.html')
  // await page.screenshot({ path: 'example.png' })

  const a = await page.$('a')
  console.log(a.asElement().boxModel())
  // $$取image
  const imgs = await page.$$('a')
  console.log(imgs)

  await browser.close()
})()
