import { Update } from "@telegraf/types";
import { Context, Markup, Telegraf } from "telegraf";

export default {
    async handle(ctx: Context, bot: Telegraf<Context<Update>>) {
        const feedback = ctx.text;

        ctx.reply(
            "Deseja confirmar o envio do feedback?",
            Markup.inlineKeyboard([
                Markup.button.callback('Confirmar', 'confirmado'),
                Markup.button.callback('Cancelar', 'cancelado'),
            ])
        );

        bot.action('confirmado', async (ctx) => {
            await ctx.editMessageReplyMarkup(
                Markup.inlineKeyboard([
                    Markup.button.callback('Confirmar ✅', 'confirmado_disabled'),
                    Markup.button.callback('Cancelar', 'cancelado_disabled'),
                ]).reply_markup
            );

            //Mandar Mensagem
            //Problema, feedback duplicado
            console.log(feedback)

            ctx.reply('Envio do feedback realizado com sucesso');
        });

        bot.action('cancelado', async (ctx) => {
            await ctx.editMessageReplyMarkup(
                Markup.inlineKeyboard([
                    Markup.button.callback('Confirmar', 'confirmado_disabled'),
                    Markup.button.callback('Cancelar ❌', 'cancelado_disabled'),
                ]).reply_markup
            );
            ctx.reply('Envio do feedback cancelado');
        });
    }
};

