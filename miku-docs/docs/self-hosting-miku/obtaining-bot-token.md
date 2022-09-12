---
title: Obtaining Bot Token
sidebar_position: 3
---

You'll more than likely need to get your discord bot up. So these are the setups to how to do that



1. Create the app that will be needed for the bot. Once done, you should see the page as shown above
    ![images](/img/obtaining-bot-token-assets/create-app.png)


2. Now head done to the bot section, and click on the button that says "Add Bot". 

    ![yesyes](/img/obtaining-bot-token-assets/create-bot.png)


3. You'll see a pop-up that asks you if you want to create the bot. 

    ![ewom](/img/obtaining-bot-token-assets/allow-bot.png)
4. Make sure to have all 3 of the buttons enabled. Kumiko will need all 3 of them to work.

    ![intents](/img/obtaining-bot-token-assets/allow-intents.png)


5. You'll see a page just like the one above. We'll need access the the token for the bot, and the only way to do it is to reset the token.

    ![whyyy](/img/obtaining-bot-token-assets/reset-token.png)

6. Allow for the token to be reset. Note that if your account is hooked up with 2FA, it will ask you to enter your 2FA code. Go to your authenticator app and enter the code from the app.

    ![confirm](/img/obtaining-bot-token-assets/allow-reset-token.png)

7. Now click on the copy button and copy the token

    ![copytoken](/img/obtaining-bot-token-assets/copy-token.png)
8. Put the token in the `.env` file you created.