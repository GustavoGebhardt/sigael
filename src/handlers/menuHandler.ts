import { Context, Markup } from "telegraf";

export default {
    showMenu(ctx: Context) {
        ctx.reply(
            'Opa, bom dia! Como posso ajudar você hoje?',
            Markup.inlineKeyboard([
                [Markup.button.callback('📃 Obter Boletim', 'SHOW_BULLETIN')],
                [Markup.button.callback('📝 Obter Atestado de Matrícula', 'SHOW_REGISTRATION')],
                [Markup.button.callback('🪪 Visualizar Número de Matrícula', 'SHOW_REGISTRATION')],
                [Markup.button.callback('📬 E-mail dos Professores', 'SHOW_REGISTRATION')],
                [Markup.button.callback('🤩 Sugestões de Melhoria', 'SHOW_REGISTRATION')],
                [Markup.button.callback('💗 Ajude a manter o SigaelBot', 'SHOW_REGISTRATION')]

            ])
        );
    }
};
