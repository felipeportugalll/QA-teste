import puppeteer from "puppeteer";
import { config } from "dotenv";
config();

describe ( 'Teste Github', () => {
    let browser;
    let page;

    beforeAll (async() => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 150,
            args: ["--start-maximized"]
        })
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    });

    afterAll (async() => {
        await browser.close()
    });

    it('Acessar página web', async () => {
        try {
          await page.goto('https://www.google.com'); 
          const pageTitle = await page.$x('//title'); 
          const titleText = await pageTitle[0].evaluate((node) => node.textContent);
          expect(titleText).toBe('Google')
        } catch (error) {
          throw new Error('Erro ao acessar a página:' + error);
        }
    });

    it('Acessar página do GitHub', async () => {
        try {
          await page.goto('https://github.com'); 
          const pageTitle = await page.$x('//title'); 
          const titleText = await pageTitle[0].evaluate((node) => node.textContent); 
          expect(titleText).toBe('GitHub: Let’s build from here · GitHub'); 
        } catch (error) {
          throw new Error('Erro ao acessar a página do GitHub: ' + error);
        }
    },20000);
    
    it('Acessar página de login do GitHub', async () => {
        try {
          await page.goto('https://github.com/login');
          const pageTitle = await page.$x('//title');
          const titleText = await pageTitle[0].evaluate((node) => node.textContent);
          expect(titleText).toBe('Sign in to GitHub · GitHub'); 
        } catch (error) {
          throw new Error('Erro ao acessar a página de login do GitHub:' + error);
        }
    });

    it('Preencher formulário de login do GitHub', async () => {
        try {
          await page.type('input[name="login"]', process.env.EMAIL);
          await page.type('input[name="password"]', process.env.PASSWORD); 
          const loginValue = await page.$eval('input[name="login"]', (el) => el.value); 
          const passwordValue = await page.$eval('input[name="password"]', (el) => el.value); 
          expect(loginValue).toBe(process.env.EMAIL);
          expect(passwordValue).toBe(process.env.PASSWORD); 
        } catch (error) {
        throw new Error('Erro ao preencher formulário de login do GitHub:' + error);
        }
    },20000);

    it('Apertar botão "Sign in" do formulário de login do GitHub', async () => {
        try {
          await page.click('input[type="submit"]');
          await page.waitForNavigation();
        } catch (error) {
          throw new Error('Erro ao apertar botão "Sign in" do formulário de login do GitHub:' + error);
        }
    });

    it('Verificar autenticação no GitHub', async () => {
        try {
          const avatarImage = await page.waitForXPath('//img[contains(@class, "avatar-user")]');
          expect(avatarImage).not.toBeNull(); 
        } catch (error) {
          throw new Error('Erro ao verificar autenticação no GitHub:' + error);
        }
    },20000);

    it('Verificar URL após autenticação no GitHub', async () => {
        try {
          const currentUrl = page.url();
          expect(currentUrl).toBe('https://github.com/');
        } catch (error) {
          throw new Error('Erro ao verificar URL após autenticação no GitHub:' + error);
        }
    });

    it('Verificar nome de usuário no perfil do GitHub', async () => {
        try {
            await page.click('summary[aria-label="View profile and more"]');
            await page.waitForSelector('.dropdown-menu');
            const username = await page.$eval('.dropdown-menu a[href="/'+process.env.NAME+'"]', element => element.innerText);
            expect(username).toBe('Signed in as '+process.env.NAME);        
        } catch (error) {
          throw new Error('Erro ao verificar nome de usuário no perfil do GitHub:' + error);
        }
    },20000);

    it("Navegar até a aba Repositories", async () => {
        try {
            await page.waitForSelector('a[href="/'+process.env.NAME+'?tab=repositories"]');
            await page.click('a[href="/'+process.env.NAME+'?tab=repositories"]');
            await page.waitForNavigation();
            const currentUrl = page.url();
            expect(currentUrl).toBe('https://github.com/');          
        } catch (error) {
          throw new Error('Navegação falhou' + error)
        }
    },20000);
      

    it("Acessar um repositório aleatório do seu perfil", async () => {
        try {
          await page.waitForSelector("#user-repositories-list li");
      
          const repos = await page.$$("#user-repositories-list li");
          if (repos.length === 0) {
            throw new Error("Não há repositórios disponíveis.");
          }
      
          const index = Math.floor(Math.random() * repos.length);
          const repo = repos[index];
      
          const repoLink = await repo.$eval("a", (el) => el.href);
          const repoName = await repo.$eval("a", (el) => el.innerText);
          await page.goto(repoLink);
          await page.waitForSelector('[data-content="Code"]');
      
          const pageTitle = await page.title();
          expect(pageTitle).toContain(repoName);
        } catch (error) {
          throw new Error('Falha ao acessar um repositório: ' + error)
        }
      },20000);

    it("Navegar até a aba Pull Request", async () => {
        try {
            await page.waitForSelector('a[id="pull-requests-tab"]');
            await page.click('a[id="pull-requests-tab"]');
            const searchElement = await page.waitForSelector('div[role="search"]');
            expect(searchElement).toBeTruthy();
        } catch (error) {
          throw new Error('Falha ao navegar a aba Pull Request:' + error)
        }
    });


    it('Deslogar', async () => {
        try {
            await page.waitForXPath('//summary[@aria-label="View profile and more"]');
            const dropdownButton = (await page.$x('//summary[@aria-label="View profile and more"]'))[0];
            await dropdownButton.click();
            await page.waitForXPath('//button[contains(text(), "Sign out")]', { visible: true });
            const signOutButton = (await page.$x('//button[contains(text(), "Sign out")]'))[0];
            await signOutButton.click();
        } catch (error) {
          throw new Error('Erro ao deslogar:' + error);
        }
    },20000);
      
      
    it('Validar que foi possível deslogar', async () => {
        try {
            await page.waitForXPath('//a[contains(text(), "Sign in")]');
            const loginLink = (await page.$x('//a[contains(text(), "Sign in")]'))[0];
            expect(loginLink).not.toBeNull();
        } catch (error) {
          throw new Error('Erro ao validar que foi possível deslogar:' + error);
        }
    },20000);
      
      it('Encerrar o teste', () => {
        console.log('Teste encerrado!');
      });
      
})

 