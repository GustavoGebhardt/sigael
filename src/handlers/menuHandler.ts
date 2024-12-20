import { Context, Markup } from "telegraf";
import { ActionsEnum } from "../enums/actionsEnum";

export default {
    showMenu(ctx: Context) {
        ctx.reply(
            'Opa, bom dia! Como posso ajudar você hoje?',
            Markup.inlineKeyboard([
                [Markup.button.callback('📃 Obter Boletim', ActionsEnum.SHOW_BULLETIN)],
                [Markup.button.callback('📝 Obter Atestado de Matrícula', ActionsEnum.SHOW_REGISTRATION)],
                [Markup.button.callback('🪪 Visualizar Número de Matrícula', ActionsEnum.SHOW_REGISTRATIONCODE)],
                [Markup.button.callback('📬 E-mail dos Professores', ActionsEnum.SHOW_EMAILTEACHERS)],
                [Markup.button.callback('🤩 Sugestões de Melhoria', ActionsEnum.SHOW_FEEDBACK)],
                [Markup.button.callback('💗 Ajude a manter o SigaelBot', ActionsEnum.SHOW_DONATION)]
            ])
        );
    }
};
