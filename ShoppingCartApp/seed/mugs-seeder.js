/**
 * Created by Suchishree Jena on 11/29/2017.
 */

//Path to Gallery: https://postimg.org/gallery/sbjqxx4s/
//https://postimg.org/gallery/sbjqxx4s/34255b5a/
var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

var products = [
    new Product({
        _id: 202,
        imagePath: "https://s33.postimg.org/yjgb1i3an/Batman_Mug1.jpg",
        name:"Batman DC Comics Logo Ceramic Coffee Mug",
        price: 40,
        stock: 100,
        categories: ['Mug','Yellow White Mug', 'General'],
        description: "Have a cup of morning coffee with some Batman flair!. This Batman Cape Logo 14 oz."
    }),
    new Product({
        _id: 203,
        imagePath: "https://s33.postimg.org/dzbh30v9b/Batman_Mug2.jpg",
        name:"DC Comics KB1324 Batman Bat Logo Ceramic Soup Mug, 24 oz",
        price: 50,
        stock: 100,
        categories: ['Mug','Black yellow Mug','General'],
        description: "Drink your coffee every morning in superhero style with this large 20-ounce ceramic mug that features the classic Bat logo embossed on the front. The Batman Embossed Logo DC Comics Ceramic Mug makes the perfect gift for fans of DC Comics Caped Crusader!"
    }),
    new Product({
        _id: 204,
        imagePath: "https://s33.postimg.org/wrnc6lzdb/Batman_Mug3.jpg",
        name:"DC Comics Batman Coffee Mug Cup 14oz Glitter Belt",
        price: 45,
        stock: 100,
        categories: ['Mug','Yellow White Mug','General'],
        description: "BATMAN TO SAVE THE DAY: Now, before you go and step on a lego piece or stub your toe on the end of the coffee table take this with you."
    }),
    new Product({
        _id: 205,
        imagePath: "https://s33.postimg.org/ixyzhkm7j/Batman_Mug4.jpg",
        name:"Paladone DC Comics Glow in The Dark Mug",
        price: 35,
        stock: 100,
        categories: ['Mug','Black Mug','General'],
        description: "HIGH QUALITY: This Batman Glow in the Dark mug is made with super sleek black glaze on the high quality stoneware with a premium glow in the dark decal perfect to suit any drink whether cold or hot."
    }),
    new Product({
        _id: 206,
        imagePath: "https://s33.postimg.org/4erug6g7z/Batman_Mug5.jpg",
        name:"Zak Designs BTMC-8510 Batman Comics Ceramic sculpted Mug",
        price: 45,
        stock: 100,
        categories: ['Mug','Black Mug','General'],
        description: "Slow mornings will be swept away by the fun and action-packed full surface artwork. This coffee mug is perfect for your favorite hot beverage, like coffee, tea, cocoa, or even soup. It also makes a great gift - DC Comics fans will love this attractive and functional mug. Made of ceramic, it has a sturdy, comfortable weight and holds heat well. And because safety is important, this mug is dishwasher safe, microwave safe, and completely BPA free."
    }),
    new Product({
        _id: 207,
        imagePath: "https://s33.postimg.org/l2jcioipb/Batman_Mug6.jpg",
        name:"Officially Licensed DC Comics Batman Logo Enamelware Mug 20Oz by iCup",
        price: 60,
        stock: 100,
        categories: ['Mug','Black Mug','General'],
        description: "This 20 oz. mug from ICUP is officially licensed and extremely durable.Printed with an image of the Batman Logo on one side, and a stylized vintage printing of the name Batman on the other this mug is sure to become a quick favorite!"
    }),
    new Product({
        _id: 208,
        imagePath: "https://s33.postimg.org/l2jcing4f/Batman_Mug7.jpg",
        name:"DC Comics Batman Gotham city Mug",
        price: 29,
        stock: 100,
        categories: ['Mug','General','Black Mug'],
        description: "CONVERSATION STARTER:Inspired by the Caped Crusader himself,this Batman Glow in the Dark Mug will spark conversation whether it be a feud with a Joker fan or a conversation with a fellow Batman lover."
    }),
    new Product({
        _id: 209,
        imagePath: "https://s33.postimg.org/eou9fflj3/Batman_Mug8.jpg",
        name:"BATMAN 3D BLACK COFFEE MUG - 350 ML",
        price: 58,
        stock: 100,
        categories: ['Mug','Black Mug','General'],
        description: "Beautiful carved Batman 3D on the mug is permanent and fade-proof. Kick start your day with a sip of your favorite coffee in this lovely mug. Mugs can be bought in several of designs and it is a great idea to have a collection of them."
    }),
    new Product({
        _id: 210,
        imagePath: "https://s33.postimg.org/jnhrty26n/Batman_Mug9.jpg",
        name:"I'm Not Saying I'm BATMAN...- Funny Coffee Mug",
        price: 25,
        stock: 100,
        categories: ['Mug','White Mug','General'],
        description: "This 11 or 15 ounce white mug says it all - I'm BATMAN..You can be sure that this cool coffee mug is going to make your wife, girlfriend, mom, or friend to smile from ear to ear!"
    }),
    new Product({
        _id: 211,
        imagePath: "https://s33.postimg.org/8b56c5lrz/Batman_Mug10.jpg",
        name:"Batman Vintage Turquoise Logo Two-Tone Coffee Mug",
        price: 65,
        stock: 100,
        categories: ['Mug','White Mug','General'],
        description: "Add a pop of color to your morning coffee! The outside of the mug features a bright white base for your photo, logo, pattern, or saying, while the inside is vividly glazed in rich color."
    }),
    new Product({
        _id: 212,
        imagePath: "https://s33.postimg.org/s5r7yb3kf/Batman_Mug11.jpg",
        name:"Batman Old School Logo Coffee Mug",
        price: 38,
        stock: 100,
        categories: ['Mug','White Mug','General'],
        description: "OFFICIALLY LICENSED: This mug is not suitable for dishwasher use nor is it suitable for microwave use."
    }),
    new Product({
        _id: 213,
        imagePath: "https://s33.postimg.org/q16ux8wsv/Batman_Mug12.jpg",
        name:"Batman Urban Legends - 1 Coffee Mug",
        price: 66,
        stock: 100,
        categories: ['Mug','White Mug','General'],
        description: "Give a made-to-order mug from Zazzle to someone special, or treat yourself to a design that brings you joy or makes you laugh. Available in 11-ounce or 15-ounce."
    }),
    new Product({
        _id: 214,
        imagePath: "https://s33.postimg.org/bhzpvtvy7/Batman_Mug13.jpg",
        name:"Vintage Batman Head Logo Mug",
        price: 56,
        stock: 100,
        categories: ['Mug','Black Mug','General'],
        description: "Express your love for Batman with this mug. Holds up to 24-ounces of liquid. Made of durable toxin-free Ceramic. Features easy grip handle."
    }),
    new Product({
        _id: 215,
        imagePath: "https://s33.postimg.org/eou9fg0yn/Batman_Mug14.jpg",
        name:"Batman Color Changing Coffee Mug DC Comics 11.5 oz Loot Crate Exclusive BNIB",
        price: 66,
        stock: 100,
        categories: ['Mug','Black yellow Mug','General'],
        description: "The 11.5 ounce mug features heat-sensitive color-changing exterior so that the yellow Bat signal appears only with hot liquids."
    }),
    new Product({
        _id: 216,
        imagePath: "https://s33.postimg.org/z8z3dxofj/Batman_Mug15.jpg",
        name:"Vandor 76065 Batman Ceramic Mug, Black, 12-Ounce",
        price: 35,
        stock: 100,
        categories: ['Mug','Black yellow Mug','General'],
        description: "The Batman mug is ceramic with photo quality design. The perfect size for your morning cup of Joe, it is microwave and dishwasher safe. Enjoy a refreshing beverage with your favorite comic book hero Batman on this 22-Oz mug."
    }),
    new Product({
        _id: 217,
        imagePath: "https://s33.postimg.org/qqpn9m527/Batman_Mug16.jpg",
        name:"I Am Batman's girlfriend Coffee Mug",
        price: 24,
        stock: 100,
        categories: ['Mug','Yellow White Mug','General'],
        description: "If your favorite hot beverage is coffee, tea, hot chocolate or even a hot toddy you will enjoy it even more in this adorable custom mug. We make every mug to order with the care and love you would appreciate and expect."
    })
];

var done = 0;
for(var i=0; i<products.length; i++){
    products[i].save(function(err,result) {
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit() {
    console.log("Disconnected from Mongodb");
    mongoose.disconnect();
}


