/**
 * Created by Suchishree Jena on 11/23/2017.
 */
//Path to Gallery: https://postimg.org/gallery/lqaj5jqg/
//https://postimg.org/gallery/fmwh3ke4/ac2a6dac/
var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

var products = [
    new Product({
        _id: 154,
        imagePath: "https://s33.postimg.org/5uxcavzv3/Wall_Clock1.jpg",
        name:"Batman Clock Modern Wall Clock",
        price: 60,
        stock: 100,
        categories: ['Wallclock','black wallclock', 'General'],
        description: "This wooden clock with silent mechanism fit well into any interior."
    }),
    new Product({
        _id: 155,
        imagePath: "https://s33.postimg.org/4fvrm71cv/Wall_Clock2.jpg",
        name:"Ultra creative fashion stereo Batman WallClock",
        price: 90,
        stock: 100,
        categories: ['Wallclock','black white wallclock','General'],
        description: "A Unique-New-One of a Kind clock you won't find anywhere else! Size: 10inch Diameter x 1 inch from wall."
    }),
    new Product({
        _id: 156,
        imagePath: "https://s33.postimg.org/4sn5scwhb/Wall_Clock3.jpg",
        name:"Batman WallClock with original design, Batman poster, batman decal",
        price: 110,
        stock: 100,
        categories: ['Wallclock','black wallclock','General'],
        description: "Incredible wall clock made from real vinyl. Size of clock is 30cm (diametr). The clock requires 1 AA battery."
    }),
    new Product({
        _id: 157,
        imagePath: "https://s33.postimg.org/tlwpt0n7j/Wall_Clock4.jpg",
        name:"Modern Vinyl Record Wall Clock With Batman Superman Emblem Design",
        price: 145,
        stock: 100,
        categories: ['Wallclock','black wallclock','General'],
        description: "This item is the original and a great gift for your friend, girls, children and others. They will be satisfied and happy of it."
    }),
    new Product({
        _id: 158,
        imagePath: "https://s33.postimg.org/x5iniud2n/Wall_Clock5.jpg",
        name:"Batman Logo Design Vinyl Record Wall Clock",
        price: 65,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "FOR THE PEOPLE WHO WANNA FEEL SPECIAL - we are open for custom designs. If you wanna one - we can help you - just contact us!"
    }),
    new Product({
        _id: 159,
        imagePath: "https://s33.postimg.org/mvg8jluwv/Wall_Clock6.jpg",
        name:"Batman Catwoman Love Design Vinyl Record Wall Clock",
        price: 120,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "PERFECT GIFT FOR ANY OCCASION: Anniversary, New Year or World Post Day... Or don't wait for any special days and make your today better with vintage unique clock!"
    }),
    new Product({
        _id: 160,
        imagePath: "https://s33.postimg.org/lt62111sv/Wall_Clock7.jpg",
        name:"Vinyl Record Wall Clock",
        price: 59,
        stock: 100,
        categories: ['Wallclock','General','black wallclock'],
        description: "This Batman vinyl clock was made for comic book fans! Perfect for anyone who loves superheroes and crimefighters! Our unique wall clocks are handmade from used vinyl records to achieve a one-of-a-kind modern gift while still holding a vintage appeal to it."
    }),
    new Product({
        _id: 161,
        imagePath: "https://s33.postimg.org/atkupfyj3/Wall_Clock8.jpg",
        name:"Vintage Batman Vinyl Record Designer Wall Clock",
        price: 135,
        stock: 100,
        categories: ['Wallclock','yellow black wallclock','General'],
        description: "Made for any wall, this clock is vibrantly printed with AcryliPrint®HD process to ensure the highest quality display of any content."
    }),
    new Product({
        _id: 162,
        imagePath: "https://s33.postimg.org/5i5y4r7bj/Wall_Clock9.jpg",
        name:"Batman Dark Сomics Vinyl Record Wall Clock",
        price: 59,
        stock: 100,
        categories: ['Wallclock','black wallclock','General'],
        description: "GET A UNIQUE HOME ACCESSORY! Be sure your friends and neighbors never remain indifferent after they have seen your modern vinyl record wall clock!"
    }),
    new Product({
        _id: 163,
        imagePath: "https://s33.postimg.org/hwsq536jj/Wall_Clock10.jpg",
        name:"Secondlifeforvinyl Eco-Friendly Batman Vinyl Wall Clock",
        price: 65,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "It's creative - the clock is made of a record, and vinyl records themselves are very beautiful.It has the silent mechanism - no tick-tock will get on your nerves."
    }),
    new Product({
        _id: 164,
        imagePath: "https://s33.postimg.org/jbuattn27/Wall_Clock11.jpg",
        name:"Batman Dark Knight Hero Arkham City DC Comics Movie Characters Vinyl Record Design Wall Clock",
        price: 48,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "Made of Hand Selected Vintage Recycled 12inch Vinyl Records (Item Surface May Have Minor Scratches and Blemishes)"
    }),
    new Product({
        _id: 165,
        imagePath: "https://s33.postimg.org/lgenuwwen/Wall_Clock12.jpg",
        name:"Batman Dark Knight Vinyl Record Wall Clock",
        price: 66,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "MAKE A PERFECT PRESENT FOR FANS OF DC COMICS - Wanna make a unique and original gift but only named cup is on your mind? Impress everybody with handmade vinyl record clock!"
    }),
    new Product({
        _id: 166,
        imagePath: "https://s33.postimg.org/4sn5sem7j/Wall_Clock13.jpg",
        name:"Batman vs Joker Vinyl Record Wall Clock",
        price: 56,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "UNIQUE COMBINE OF MODERN ART AND VINTAGE STYLE – Batman vs Joker Vinyl Record Wall Clock is a perfect home decoration and will suit any design and interior!"
    }),
    new Product({
        _id: 167,
        imagePath: "https://s33.postimg.org/pcrzqwp3z/Wall_Clock14.jpg",
        name:"Batman Logo Silhouette Vinyl Record WallClock",
        price: 32,
        stock: 100,
        categories: ['Wallclock','black wallclock','General'],
        description: "SHOW YOUR CARE - This clock makes an original present for your friends and family, it shows your knowledge about their hobbies and interests, it shows your love!"
    }),
    new Product({
        _id: 168,
        imagePath: "https://s33.postimg.org/iz2wnnrxr/Wall_Clock15.jpg",
        name:"Justice Hero Batman DIY Wallclock Home Decoration Creative Watch Classic Film",
        price: 11,
        stock: 100,
        categories: ['Wallclock','Yellow Black wallclock','General'],
        description: "A GIFT HE WILL LOVE - Imagine the look on your friend's face when he will open the box and find awesome vinyl clock with unique design inside. You don't need any extra effort to find something MORE than a regular gift!"
    }),
    new Product({
        _id: 169,
        imagePath: "https://s33.postimg.org/434dg2o8v/Wall_Clock16.jpg",
        name:"Supernatural Handmade Vinyl Record Wall Clock Fun gift Vintage Unique Home decor",
        price: 124,
        stock: 100,
        categories: ['Wallclock','Black wallclock','General'],
        description: "Amazing-looking vintage wall clock with unique design made from used vinyl records. Clock movement works quiet and your favorite Rock Music Band clock will serve you for a very long time."
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
