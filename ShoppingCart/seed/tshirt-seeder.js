var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

//Path for Women Tshirts: https://postimg.org/gallery/ih7g4x4i/
//Path for Men's Tshirts: https://postimg.org/gallery/oxlxzbci/
//Path for kid's Tshirts : https://postimg.org/gallery/x51t2j76/
var products = [
    new Product({
        _id: 117,
        imagePath: "https://s8.postimg.org/4815no2ld/Tshirt1.jpg",
        name:"DC Comics Men's Batman Basic Logo T-Shirt",
        price: 60,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Men'],
        description: "Short-sleeve crew-neck tee featuring large Batman screenprint at chest."
    }),
    new Product({
        _id: 118,
        imagePath: "https://s8.postimg.org/nd4exfwox/Tshirt2.jpg",
        name:"Men's Batman® Shield T-Shirt",
        price: 40,
        stock: 100,
        categories: ['Tshirt','Men','Yellow Tshirt'],
        description: "Cool and creative design tshirt for Men."
    }),
    new Product({
        _id: 119,
        imagePath: "https://s8.postimg.org/tqti0p9at/Tshirt5.jpg",
        name:"Official Batman Distressed Logo Women's T-Shirt",
        price: 30,
        stock: 100,
        categories: ['Tshirt','Grey Tshirt','Women'],
        description: "This ladies official Batman distressed logo t-shirt features the iconic Bat signal from the Batman franchise, made from 100% cotton this soft to touch t-shirt is the perfect new addition to your awesome t-shirt collection"
    }),
    new Product({
        _id: 120,
        imagePath: "https://s8.postimg.org/xzy82xhpx/Tshirt16.jpg",
        name:"Women's DC Comics Batman Wifey Graphic Cape T-Shirt",
        price: 45,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Women'],
        description: "Offering the classic crew neck and short sleeves style, this ladies t-shirt is made with a fashionable slim or skinny fit in mind."
    }),
    new Product({
        _id: 121,
        imagePath: "https://s8.postimg.org/40ravzqit/Women_Tshirt1.jpg",
        name:"BATMAN CLASSIC LOGO WOMEN T-SHIRT",
        price: 25,
        stock: 100,
        categories: ['Tshirt','White Tshirt','Women'],
        description: "Printed for a no feel, feel this women’s Batman t-shirt is a must-have for any DC Comics fan."
    }),
    new Product({
        _id: 122,
        imagePath: "https://s8.postimg.org/cj0r0ck6t/Women_Tshirt2.jpg",
        name:"Lego Batman DC Comics Women's Tshirt",
        price: 20,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Women'],
        description: "The black t-shirt features a retro inspired, distressed effect Graphic print."
    }),
    new Product({
        _id: 123,
        imagePath: "https://s8.postimg.org/dy2bp2szp/Women_Tshirt3.jpg",
        name:"Batman Superhero Black tops",
        price: 53,
        stock: 100,
        categories: ['Tshirt','Women','Black Tshirt'],
        description: "Classic Batman logo graphic on the front, with the Batman name printed on the back, along with the double zero number; very fashionable and comfortable"
    }),
    new Product({
        _id: 124,
        imagePath: "https://s8.postimg.org/40raw0t3p/Women_Tshirt4.jpg",
        name:"Womens Licensed Batman Logo Shirt New M",
        price: 35,
        stock: 100,
        categories: ['Tshirt','black & white Tshirt','Women'],
        description: "Made of a perfectly blended cotton/polyester for a silky soft feel."
    }),
    new Product({
        _id: 125,
        imagePath: "https://s8.postimg.org/uyl7xqivp/Women_Tshirt5.jpg",
        name:"DC Comics Womens Batman Logo Burnout Ringer Tee",
        price: 49,
        stock: 100,
        categories: ['Tshirt','Grey Tshirt','Women'],
        description: "53% Cotton 47% Polyester, Officially licensed by DC Comics"
    }),
    new Product({
        _id: 126,
        imagePath: "https://s8.postimg.org/j9h89rzmt/Women_Tshirt6.jpg",
        name:"DC Comics Womens Batman Varsity Football Tee Black",
        price: 65,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Women'],
        description: "DC Comics Womens Batman Varsity Football Tee,Officially licensed by DC Comics."
    }),
    new Product({
        _id: 127,
        imagePath: "https://s8.postimg.org/5abc69qkl/Tshirt13.jpg",
        name:"Hot Womens Ladies Short Sleeves Batman Superman Superhero Print T Shirt Top",
        price: 48,
        stock: 100,
        categories: ['Tshirt','black & grey Tshirt','Women'],
        description: "Material: 60% Cotton 40% Polyester, the sewn on stripes on the sleeves add the most fashionable and vintage touch"
    }),
    new Product({
        _id: 128,
        imagePath: "https://s8.postimg.org/gmnxo0oyt/Tshirt8.jpg",
        name:"DC COMICS Classic BATMAN LOGO Weathered T-shirt",
        price: 26,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Men'],
        description: "The men's Batman tee is perfect for a fun day out with friends and family."
    }),
    new Product({
        _id: 129,
        imagePath: "https://s8.postimg.org/i1picqxrp/Tshirt6.jpg",
        name:"DC Comics Batman Grey Tshirt with Black Bat Logo",
        price: 56,
        stock: 100,
        categories: ['Tshirt','Grey Tshirt','Men'],
        description: "100% cotton, Professionally designed and printed."
    }),
    new Product({
        _id: 130,
        imagePath: "https://s8.postimg.org/ut3ojb4zp/Tshirt10.jpg",
        name:"Junk Food Batman Vintage Logo Navy Blue Adult T-shirt Tee",
        price: 62,
        stock: 100,
        categories: ['Tshirt','Blue Tshirt','Men'],
        description: "Made of 100% cotton, it keeps you cool and comfy all day long and offers a regular fit."
    }),
    new Product({
        _id: 131,
        imagePath: "https://s8.postimg.org/9z546jepx/Kids_Tshirt.jpg",
        name:"Boys' Batman Graphic T- Shirt",
        price: 14,
        stock: 100,
        categories: ['Tshirt','red & black Tshirt','Kids'],
        description: "This tee features a very cool vintage logo from the Batman series."
    }),
    new Product({
        _id: 132,
        imagePath: "https://s8.postimg.org/xq4honmmt/Kids_Tshirt4.jpg",
        name:"Toddler Boy Jumping Beans® Batman Raglan Graphic Tee",
        price: 24,
        stock: 100,
        categories: ['Tshirt','Black & Yellow Tshirt','Kids'],
        description: "This Batman shirt sports a big and bold graphic of the classic Caped Crusader logo in bright yellow and black. Made of soft yet durable fabric, it has a relaxed fit to give him plenty of room to move and a tagless rib-knit collar to keep him comfortable."
    }),
    new Product({
        _id: 133,
        imagePath: "https://s8.postimg.org/4aytfnxit/Kids_Tshirt2.jpg",
        name:"Boys' Batman Short Sleeve Button Down Shirt - Green",
        price: 12,
        stock: 100,
        categories: ['Tshirt','Green Tshirt','Kids'],
        description: "This Batman T-shirt goes with practically anything, from sweats to jeans to shorts."
    }),
    new Product({
        _id: 134,
        imagePath: "https://s8.postimg.org/yseo77d5x/Kids_Tshirt3.jpg",
        name:"Batman Symbol Kids Space Dye T-Shirt",
        price: 24,
        stock: 100,
        categories: ['Tshirt','Grey Tshirt','Kids'],
        description: "This Batman Boys' Short Sleeve Button Down Shirt in Grey is ready for whatever your little super hero can dish out. With an all-over Batman print, he'll love this top's super good looks."
    }),
    new Product({
        _id: 135,
        imagePath: "https://s8.postimg.org/tqti0otv9/Tshirt3.jpg",
        name:"Batman Yellow Tshirt",
        price: 10,
        stock: 100,
        categories: ['Tshirt','Yellow Tshirt','Kids'],
        description: "Soft and comfortable Cotton and Polyester fabric.Button-up front, collar, short sleeves offer classic good looks."
    }),
    new Product({
        _id: 136,
        imagePath: "https://s8.postimg.org/7rn3dinbp/Tshirt4.jpg",
        name:"Batman Green Logo Black Tshirt",
        price: 12,
        stock: 100,
        categories: ['Tshirt','Green & Black Tshirt','Men'],
        description: "This t-shirt has a crew neck, short sleeves and a plain hem. Pair it with jeans, cargo pants or shorts. This tee is available in standard sizes. Machine wash."
    }),
    new Product({
        _id: 137,
        imagePath: "https://s8.postimg.org/v5v2pgkol/Tshirt12.jpg",
        name:"Batman Keep Calm Black Tshirt",
        price: 18,
        stock: 100,
        categories: ['Tshirt','Black Tshirt','Men'],
        description: "This Batman t-shirt features the beaming, screen-printed, ubiquitous Batman symbol adorning Batman's chest since the 1960s."
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