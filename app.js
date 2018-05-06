/* eslint-disable */

import Wisebot from '@wisebot/wisebot';
import Telegram from '@wisebot/telegram';

const bot = new Wisebot();

bot.use(new Telegram());
