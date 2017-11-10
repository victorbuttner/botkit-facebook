
//controler to greetins new users

module.exports = function(controller) {
    
    controller.on('facebook_optin', function(bot, message) {
        bot.reply(message, 'Bem Vindo ao nosso delivery. consulte nossas promoções!!! ');
    })


}