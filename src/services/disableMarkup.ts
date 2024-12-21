import { Context, Markup } from "telegraf";
import { OptionsEnum } from "../enums/optionsEnum";

export default async function disableMarkup(selected: number, ctx: Context) {
    await ctx.editMessageReplyMarkup(
        Markup.inlineKeyboard([
            [Markup.button.callback(selected == OptionsEnum.BULLETIN ? `📃 Obter Boletim ✅` : `📃 Obter Boletim`, "disabled")],
            [Markup.button.callback(selected == OptionsEnum.REGISTRATION ? `📝 Atestado de Matrícula ✅` : `📝 Atestado de Matrícula`, "disabled")],
            [Markup.button.callback(selected == OptionsEnum.REGISTRATIONCODE ? `🪪 Número de Matrícula ✅` : `🪪 Número de Matrícula`, "disabled")],
            [Markup.button.callback(selected == OptionsEnum.EMAILTEACHERS ? `📬 E-mail dos Professores ✅` : `📬 E-mail dos Professores`, "disabled")],
            [Markup.button.callback(selected == OptionsEnum.FEEDBACK ? `🤩 Sugestões e Feedback ✅` : `🤩 Sugestões e Feedback`, "disabled")],
            [Markup.button.callback(selected == OptionsEnum.DONATION ? `💗 Ajude o SigaelBot ✅` : `💗 Ajude o SigaelBot`, "disabled")],
        ]).reply_markup
    );
}