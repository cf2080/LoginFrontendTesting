const puppeteer = require ('puppeteer');

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function LoginToDashboard(){

  (async () => {

    let imgPath = 'Login';

    // Open browser and navigate to app registration page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/login');
    await page.screenshot({path: (imgPath + '01.png')});
  
    
    // Try to login with a blank boxes.
    await page.click('.button-login')
    await page.screenshot({path: (imgPath + '02.png')});

    // Try to register with a email not in database and no password
    await page.type('#email', 'qwerty@f.com');
    await page.click('.button-login');
    await page.screenshot({path: (imgPath + '03.png')});
    await browser.close()

  })();
}

function LoginToDashboard2(){

  (async () => {
    let imgPath = 'Login';

    // Open browser and navigate to app registration page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/login')
  
    // Try to login with wrong password and no email
    await page.type('#password', 'sdfdfdg');
    await page.click('.button-login');
    await page.screenshot({path: (imgPath + '04.png')});
    await browser.close()
  })();
}

function LoginToDashboard3(){

  (async () => {
    let imgPath = 'Login';

    // Open browser and navigate to app registration page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/login')
  
    // Try to login with wrong password but correct email
    await page.type('#email', 'rrrcf2080@gmail.com');
    await page.type('#password', 'kkkkk');
    //await page.screenshot({path: (imgPath + '55.png')});
    await page.on('dialog', async dialog => {
      console.log(dialog.message());
      //await page.screenshot({path: (imgPath + '55.png')});    
      await dialog.accept();
    },    await page.screenshot({path: (imgPath + '55.png')})
    );
    const overlay = await page.waitForSelector('.button-login');
    await page.waitFor(500);
    await page.click('.button-login');

    await page.screenshot({path: (imgPath + '05.png')});
    await browser.close()
  })();
}

function LoginToDashboardSuccessful(){

  (async () => {
    let imgPath = 'Login';

    // Open browser and navigate to app registration page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/login')
  
    // Try to login with correct information
    await page.click('#email', {clickCount: 3});
    await page.click('#password', {clickCount: 3});
    await page.type('#email', 'cf2080@gmail.com');
    await page.type('#password', 'qwertyuiop');
    await page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    await page.click('.button-login');
    await page.screenshot({path: (imgPath + '06.png')});
  
    //Successful login to Dashboard
    await page.goto('http://localhost:8080/#/dashboard');
    await page.screenshot({path: (imgPath + '07.png')});
    await browser.close()
  })();
}

function LoginToResendLink(){

  (async () => {
    let imgPath = 'Login';

    // Open browser and navigate to app registration page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/#/resetPage')
  
    //Successful click to link
    //await form.evaluate( form => form.click() );
    await page.screenshot({path: (imgPath + '08.png')});
    await browser.close()
  })();
}



LoginToDashboard()
LoginToDashboard2()
LoginToDashboard3()
LoginToDashboardSuccessful()
LoginToResendLink()