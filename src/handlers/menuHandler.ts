import { Context, Markup } from "telegraf";
import { ActionsEnum } from "../enums/actionsEnum";

export default {
    showMenu(ctx: Context) {
        ctx.reply(
            'Opa, bom dia! Como posso ajudar você hoje?',
            Markup.inlineKeyboard([
                [Markup.button.callback('📃 Obter Boletim', ActionsEnum.SHOW_BULLETIN)],
                [Markup.button.callback('📝 Atestado de Matrícula', ActionsEnum.SHOW_REGISTRATION)],
                [Markup.button.callback('🪪 Número de Matrícula', ActionsEnum.SHOW_REGISTRATIONCODE)],
                [Markup.button.callback('📬 E-mail dos Professores', ActionsEnum.SHOW_EMAILTEACHERS)],
                [Markup.button.callback('🤩 Sugestões e Feedback', ActionsEnum.SHOW_FEEDBACK)],
                [Markup.button.callback('💗 Ajude o SigaelBot', ActionsEnum.SHOW_DONATION)],
            ])
        );
    }
};
