
//Scripts for pizza delivey chatbot


module.exports = function(controller) {
    
    let wit = require('botkit-middleware-witai')({
        token: process.env.wit_token
    });
    controller.middleware.receive.use(wit.receive);
    

    controller.hears(['want_pizza'],'direct_message,direct_mention,mention,message_received',wit.hears, function(bot, message) {
    bot.reply(message, 'Eu ouvi PIZZA? hmmmmmm')
   
    bot.startConversation(message, function(err, convo) {
        let pizza = {}
        //convo.gotoThread('pizza_size');
        convo.say({text: 'Então vamos personalizar sua Pizza! '},'pizza_start');
        convo.ask({
            attachment: {
                'type':'template',
                'payload':{
                    'template_type':'generic',
                    'elements':[
                        {
                            'title':'Tamanho das Pizzas',
                            'image_url':'https://www.wegmans.com/content/dam/wegmans/products/445/62445.jpg',
                            'subtitle':'Selecione o tamanho da pizza',
                            'buttons':
                                    [{
                                        'type':'postback',
                                        'title':'Media',
                                        'payload': 'pizza_media'
                                        },{
                                    'type':'postback',
                                    'title':'Grande',
                                    'payload': 'pizza_grande'
                                    },
                                    {
                                        'type':'postback',
                                        'title':'Familia',
                                        'payload': 'pizza_familia'
                                        }]
                            
                        },
                    ]
                }
                }
        }, (response, convo) => {
            // whoa, I got the postback payload as a response to my convo.ask!
            console.log(`POSTBACK RESP ${JSON.stringify(response)}`)
            let parts = '';
            pizza.size = response.postback.payload
            switch (pizza.size) {
                case 'pizza_grande':
                    parts = 4;
                    break;
                case 'pizza_familia':
                    parts = 8;
                    break;
                default:
                    parts =4 ;
                
            }
            convo.say(`Voce pediu uma Pizza ${response.postback.title}, você pode escolher ${parts}` )
            
            console.log(`PIZZA SIZE ${pizza.size} `)
            convo.gotoThread('pizza_taste');
        },{},'pizza_size');

        convo.addQuestion({text: 'Qual o sabor'    

        }, (res,convo) => {
        },{},'pizza_taste')
        
        convo.activate()
      
     
    }); // end of conversation
    controller.on('facebook_postback', function(bot, message) {
        // console.log(bot, message);
       bot.reply(message, 'Great Choice!!!! (' + message.payload + ')');
    
    });
}) // end of hear
   

}
