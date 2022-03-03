const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret

const app = new App({
   token: process.env.SLACK_BOT_TOKEN,
   signingSecret: process.env.SLACK_SIGNING_SECRET,
   port: process.env.PORT || 3000,
});

(async () => {
   //Start your app
   await app.start();
   console.log('bolt app is running!');
})();

app.shortcut('submit_form', async ({ shortcut, ack, client }) => {
   try {
      //Acknowledge shortcut request
      await ack();
      // Call the views.open method using one of the built-in WebClients
      const result = await client.views.open({
         trigger_id: shortcut.trigger_id,
         view: {
            type: 'modal',
            title: {
               type: 'plain_text',
               text: 'My App',
            },
            close: {
               type: 'plain_text',
               text: 'Close',
            },
            blocks: [
               {
                  type: 'section',
                  text: {
                     type: 'mrkdwn',
                     text: 'Hello!!',
                  },
               },
            ],
         },
      });
      console.log(result);
   } catch (error) {
      console.error(error);
   }
});
