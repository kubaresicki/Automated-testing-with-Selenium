const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert')
const io = require('console-read-write');

async function basicAuth(){
    const forBrowser = 'firefox'
    let driver = await new Builder().forBrowser(`${forBrowser}`).build();
    const login='admin'
    const pass = 'admin'
    let url = `http://${login}:${pass}@the-internet.herokuapp.com/basic_auth`
    try {
        await driver.get(url);
        await driver.findElement(By.css('.example p'))
        
        const element = driver.findElement(By.css('.example p'));
        assert.deepEqual(await element.getText(By.css('.example p')), 'Congratulations! You must have the proper credentials.');
    }
     finally {
        await driver.sleep(2999)
        await driver.quit()
    }
}
async function addButtonFunction() {
  const forBrowser = 'firefox'
  let driver = await new Builder().forBrowser(`${forBrowser}`).build();
  let url = 'http://the-internet.herokuapp.com/add_remove_elements/'
  let length  = url.length
  let len = Math.floor((length/4))

    
    async function generateOne(){
        await (await driver.findElement(By.xpath('//button[normalize-space()="Add Element"]'))).click()
        const element = driver.findElement(By.className("added-manually"));
        assert.deepEqual(await element.getText(), 'Delete');
    }
    async function delOne(){
        await (await driver.findElement(By.xpath('//button[normalize-space()="Delete"]'))).click()
    }
    async function generateFew() {
        for (let i = 0; i < len; i++) {
            await (await driver.findElement(By.xpath('//button[normalize-space()="Add Element"]'))).click()
        }
    }
    async function delFew() {
        for (let i = 0; i < len; i++) {
            await (await driver.findElement(By.xpath('//button[normalize-space()="Delete"]'))).click()
        }
    }

    try {
        await driver.get(url);
        await generateOne();
        await delOne();
        
    }
    finally {
        await driver.sleep(2999)
        await driver.quit()
    }
}

async function contextMenu() {
    const forBrowser = 'firefox'
    let driver = await new Builder().forBrowser(`${forBrowser}`).build();
    let url = `https://the-internet.herokuapp.com/context_menu`
    try {
        await driver.get(url);
        const spot = driver.findElement(By.id("hot-spot"))
        await driver.actions().contextClick(spot).perform();
        let alert = await driver.switchTo().alert();


        let alertText = await alert.getText();

        await alert.accept();
        await assert.equal(alertText, 'You selected a context menu')
    }
     finally {
        await driver.quit()
    }
}
async function checkboxes(){
    const forBrowser = 'firefox'
    let driver = await new Builder().forBrowser(`${forBrowser}`).build();
    let url = `http://the-internet.herokuapp.com/checkboxes`
    try {
        await driver.get(url);


        let arr = []
        arr = await driver.findElements(By.css('html.no-js body div.row div#content.large-12.columns div.example form#checkboxes input'))
        arr.map(async l => {
            let state = await l.getAttribute("checked")
            if(state==null){
                await l.click()
                let state = await l.getAttribute("checked")
                assert.equal(state, 'true')
            }
            
        })
        


    }
     finally {
        await driver.sleep(2999)
        await driver.quit()
    }
}

async function main() {
  

  while(true){
    io.write('\nPut scenario number: \n 0: Exit application \n 1: Basic authentication test \n 2: Add and delete button test \n 3: Checkbox check test \n 4: Contect menu test');

    let scenario = await io.read();
      if(scenario==0){
          console.log("Exit app")
          break;
      }
      switch (scenario) {
          case '1':
              console.log("You choose basic authentication test")
              await basicAuth();
              console.log("Job done")
              break;
          case '2':
              console.log("You choose delete button test")
              await addButtonFunction();
              console.log("Job done")
              break;
        case '3':
            console.log("You choose checkbox check test")
            await checkboxes();
            console.log("Job done")
            break;
        case '4':
            console.log("You choose context menu test")
            await contextMenu()
            console.log("Job done")
        default:
            continue
      }
  }
}
main();
//basicAuth()
//contextMenu()
//addButtonFunction()
//checkboxes()

