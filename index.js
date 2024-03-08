require('dotenv').config();
const { Bot, GrammyError, HttpError, InlineKeyboard } = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');

const bot = new Bot(process.env.BOT_API_KEY); // <-- put your bot token between the ""
bot.use(hydrate());
//Обробка помилок

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});


bot.api.setMyCommands([
    {
    command: 'plus',
    description: 'начать опрос понедельник',
    
    },
     {
    command: 'plus2',
    description: 'начать опрос среда',
    
    },
      {
    command: 'plus3',
    description: 'начать опрос пятница',
    
    },
       {
    command: 'plus4',
    description: 'начать опрос субота',
    
    },
]);

bot.command('start', async (ctx) => {
    await ctx.reply('Welcome! Up and running.')
}
);



// const username = ctx.from.username;
 
const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('плюс за другого', 'addDif')
    .row().text('-', 'remove').text('убрать плюс друга', 'removeDif').row()
    .text('обновить', 'renew').text('очистить список', 'clear')

bot.command('plus', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');

    await ctx.reply(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 

`, {
        reply_markup: inlineKeyboard
    })
});
bot.command('plus2', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');

    await ctx.reply(`ДЕНЬ: Среда
20:15/60грн.
Список гравців: 

`, {
        reply_markup: inlineKeyboard
    })
});
bot.command('plus3', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');

    await ctx.reply(`ДЕНЬ: Пятница
20:15/60грн.
Список гравців: 

`, {
        reply_markup: inlineKeyboard
    })
});
bot.command('plus4', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');

    await ctx.reply(`ДЕНЬ: Субота
20:15/60грн.
Список гравців: 

`, {
        reply_markup: inlineKeyboard
    })
}); 

const usernames = [];

bot.callbackQuery('add', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const index = usernames.length + 1;
    const formattedUsernames = `. @${username}`;
    usernames.push(formattedUsernames);
    const userList = usernames.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});

bot.callbackQuery('addDif', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const index = usernames.length + 1;
    const formattedUsernames = `. плюс от @${username}`;
    usernames.push(formattedUsernames);
    const userList = usernames.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});


bot.callbackQuery('remove', async (ctx) => {
     await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const index = usernames.length + 1;
    const formattedUsernames = `. @${username}`;
    const userList = usernames.join("\n");
    let searchItem = formattedUsernames;
    const indexf = usernames.indexOf(searchItem);
    if (indexf > -1) {
        usernames.splice(indexf, 1);
    }
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});

bot.callbackQuery('removeDif', async (ctx) => {
    await ctx.answerCallbackQuery();
   const username = ctx.from.username;
    const index = usernames.length + 1;
    const formattedUsernames = `. плюс от @${username}`;
    const userList = usernames.join("\n");
    let searchItem = formattedUsernames;
    const indexf = usernames.indexOf(searchItem);
    if (indexf > -1) {
        usernames.splice(indexf, 1);
    }
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
    
});

bot.callbackQuery('renew', async (ctx) => {
    await ctx.answerCallbackQuery();
    const userList = usernames.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
    
});
bot.callbackQuery('clear', async (ctx) => {
    await ctx.answerCallbackQuery();
     const userList = usernames.join("\n");
    usernames.splice(0, usernames.length);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
    
});
bot.start();