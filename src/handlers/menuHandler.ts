import { Context, Markup } from "telegraf";

export default {
    showMenu(ctx: Context) {
        ctx.reply(
            'Opa, bom dia! Como posso ajudar você hoje?',
            Markup.inlineKeyboard([
                [Markup.button.callback('Visualizar Boletim', 'SHOW_BULLETIN')],
                [Markup.button.callback('Obter Atestado de Matricula', 'SHOW_REGISTRATION')]
            ])
        );
    }
};
