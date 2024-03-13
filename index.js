require('dotenv').config();
const { Bot, GrammyError, HttpError, InlineKeyboard, Context , session } = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');
const { run, sequentialize } = require("@grammyjs/runner");

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

    const inlineKeyboard2 = new InlineKeyboard().text('+', 'add2').text('плюс за другого', 'addDif2')
    .row().text('-', 'remove2').text('убрать плюс друга', 'removeDif2').row()
    .text('обновить', 'renew2').text('очистить список', 'clear2')

    const inlineKeyboard3 = new InlineKeyboard().text('+', 'add3').text('плюс за другого', 'addDif3')
    .row().text('-', 'remove3').text('убрать плюс друга', 'removeDif3').row()
    .text('обновить', 'renew3').text('очистить список', 'clear3')

    const inlineKeyboard4 = new InlineKeyboard().text('+', 'add4').text('плюс за другого', 'addDif4')
    .row().text('-', 'remove4').text('убрать плюс друга', 'removeDif4').row()
    .text('обновить', 'renew4').text('очистить список', 'clear4')

// function getSessionKey(ctx) {
//   return ctx.chat?.id.toString();
// }
// console.log(getSessionKey);
// bot.use(sequentialize(getSessionKey));
// bot.use(session({ getSessionKey }));
// bot.command('plus3', (ctx) => ctx.reply("Got your message."));

bot.command('plus', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');
//  const chatId = ctx.chat?.id;
    // const topic = ctx.message.is_topic_message;
    const tops = ctx.message.message_thread_id;
    await ctx.reply(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 

`, {
            reply_parameters:
            
                { message_id: tops },
            reply_markup: inlineKeyboard,
            
        },
        )
});
bot.command('plus2', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');
//  const chatId = ctx.chat?.id;
    // const topic = ctx.message.is_topic_message;
    const tops = ctx.message.message_thread_id;
    await ctx.reply(`ДЕНЬ: Среда
20:15/60грн.
Список гравців: 

`, {
            reply_parameters:
            
                { message_id: tops },
            reply_markup: inlineKeyboard2,
            
        },
        )
});
bot.command('plus3', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');
    const chatId = ctx.chat?.id;
    // const topic = ctx.message.is_topic_message;
    const tops = ctx.message.message_thread_id;
    
    await ctx.api.sendMessage(chatId,  `ДЕНЬ: Пятница
20:15/60грн.
Список гравців: 

`,
{
            reply_parameters:
            
                { message_id: tops },
            reply_markup: inlineKeyboard3,
            
        },
        
              )
});

bot.command('plus4', async (ctx) => {
    // const inlineKeyboard = new InlineKeyboard().text('+', 'add').text('-', 'remove');
//  const chatId = ctx.chat?.id;
    // const topic = ctx.message.is_topic_message;
    const tops = ctx.message.message_thread_id;
    await ctx.reply(`ДЕНЬ: Субота
20:15/60грн.
Список гравців: 

`,{
            reply_parameters:
            
                { message_id: tops },
            reply_markup: inlineKeyboard4,
            
        },
        )
}); 

const usernames = [];


bot.callbackQuery('add', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    usernames.push(formattedUsernames);
    const index = usernames.length;
    const userList = `${usernames.join("\n")}`;
    console.log(usernames);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});

bot.callbackQuery('addDif', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    usernames.push(formattedUsernames);
    const index = usernames.length;
    const userList = usernames.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});


bot.callbackQuery('remove', async (ctx) => {
     await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames.indexOf(searchItem);
    if (indexf > -1) {
        usernames.splice(indexf, 1);
    }
const index = usernames.length;
    const userList = usernames.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
   
});

bot.callbackQuery('removeDif', async (ctx) => {
    await ctx.answerCallbackQuery();
   const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames.indexOf(searchItem);
    if (indexf > -1) {
        usernames.splice(indexf, 1);
    }
    const index = usernames.length;
    const userList = usernames.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Кількість записаних людей:
${index}
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
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
    
});
bot.callbackQuery('clear', async (ctx) => {
    await ctx.answerCallbackQuery();
    usernames.splice(0, usernames.length);
     const userList = usernames.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Понедельник
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard,
    });
    
});


const usernames2 = [];

bot.callbackQuery('add2', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    usernames2.push(formattedUsernames);
    const index = usernames2.length;
    const userList = `${usernames2.join("\n")}`;
    console.log(usernames2);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
   
});

bot.callbackQuery('addDif2', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    usernames2.push(formattedUsernames);
    const index = usernames2.length;
    const userList = usernames2.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
   
});


bot.callbackQuery('remove2', async (ctx) => {
     await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames2.indexOf(searchItem);
    if (indexf > -1) {
        usernames2.splice(indexf, 1);
    }
const index = usernames2.length;
    const userList = usernames2.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames2);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
   
});

bot.callbackQuery('removeDif2', async (ctx) => {
    await ctx.answerCallbackQuery();
   const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames2.indexOf(searchItem);
    if (indexf > -1) {
        usernames2.splice(indexf, 1);
    }
    const index = usernames2.length;
    const userList = usernames2.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames2);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
    
});

bot.callbackQuery('renew2', async (ctx) => {
    await ctx.answerCallbackQuery();
    const userList = usernames2.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
    
});
bot.callbackQuery('clear2', async (ctx) => {
    await ctx.answerCallbackQuery();
    usernames2.splice(0, usernames2.length);
     const userList = usernames2.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Среда
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard2,
    });
    
});

const usernames3 = [];

bot.callbackQuery('add3', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    usernames3.push(formattedUsernames);
    const index = usernames3.length;
    const userList = `${usernames3.join("\n")}`;
    console.log(usernames3);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
   
});

bot.callbackQuery('addDif3', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    usernames3.push(formattedUsernames);
    const index = usernames3.length;
    const userList = usernames3.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
   
});


bot.callbackQuery('remove3', async (ctx) => {
     await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames3.indexOf(searchItem);
    if (indexf > -1) {
        usernames3.splice(indexf, 1);
    }
const index = usernames3.length;
    const userList = usernames3.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames3);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
   
});

bot.callbackQuery('removeDif3', async (ctx) => {
    await ctx.answerCallbackQuery();
   const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames3.indexOf(searchItem);
    if (indexf > -1) {
        usernames3.splice(indexf, 1);
    }
    const index = usernames3.length;
    const userList = usernames3.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames3);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
    
});

bot.callbackQuery('renew3', async (ctx) => {
    await ctx.answerCallbackQuery();
    const userList = usernames3.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
    
});
bot.callbackQuery('clear3', async (ctx) => {
    await ctx.answerCallbackQuery();
    usernames3.splice(0, usernames3.length);
     const userList = usernames3.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard3,
    });
    
});

const usernames4 = [];

bot.callbackQuery('add4', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    usernames4.push(formattedUsernames);
    const index = usernames4.length;
    const userList = `${usernames4.join("\n")}`;
    console.log(usernames4);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
   
});

bot.callbackQuery('addDif4', async (ctx) => {
    await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    usernames4.push(formattedUsernames);
    const index = usernames4.length;
    const userList = usernames4.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
   
});


bot.callbackQuery('remove4', async (ctx) => {
     await ctx.answerCallbackQuery();
    const username = ctx.from.username;
    const formattedUsernames = ` @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames4.indexOf(searchItem);
    if (indexf > -1) {
        usernames4.splice(indexf, 1);
    }
const index = usernames4.length;
    const userList = usernames4.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames4);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
   
});

bot.callbackQuery('removeDif4', async (ctx) => {
    await ctx.answerCallbackQuery();
   const username = ctx.from.username;
    const formattedUsernames = ` плюс от @${username}`;
    let searchItem = formattedUsernames;
    const indexf = usernames4.indexOf(searchItem);
    if (indexf > -1) {
        usernames4.splice(indexf, 1);
    }
    const index = usernames4.length;
    const userList = usernames4.join("\n");
    console.log(indexf);
    console.log(searchItem);
    console.log(usernames4);
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
    
});

bot.callbackQuery('renew4', async (ctx) => {
    await ctx.answerCallbackQuery();
    const userList = usernames4.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Кількість записаних людей:
${index}
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
    
});
bot.callbackQuery('clear4', async (ctx) => {
    await ctx.answerCallbackQuery();
    usernames4.splice(0, usernames4.length);
     const userList = usernames4.join("\n");
    await ctx.callbackQuery.message.editText(`ДЕНЬ: Пятница
20:15/60грн.
Список гравців: 
${userList}
`, {
        reply_markup: inlineKeyboard4,
    });
    
});


bot.start();