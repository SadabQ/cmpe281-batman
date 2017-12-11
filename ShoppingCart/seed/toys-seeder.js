var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

//Path for Gallery :https://postimg.org/gallery/3cu1rz7hu/

var products = [
    new Product({
        _id: 138,
        imagePath: "https://s8.postimg.org/r4wd2m1at/Toy1.jpg",
        name:"Imaginext DC Super Friends Batbot Xtreme",
        price: 60,
        stock: 100,
        categories: ['Toys','black blue toy','Kids'],
        description: "The Imaginext DC Super Friends Batbot Xtreme is the Ultimate toy for Batman fans."
    }),
    new Product({
        _id: 139,
        imagePath: "https://s8.postimg.org/atw96bz3p/Toy2.jpg",
        name:"The Batman EXP Extreme Power Batman Action Figure",
        price: 90,
        stock: 100,
        categories: ['Toys','blue grey toy','Kids'],
        description: "With extendable wings, multiple projectile launchers, a hidden Batcycle, a voice changer, and real punching fists, your young Super Hero will have a blast defending Gotham City from all sorts of evil Super-Villain attacks! "
    }),
    new Product({
        _id: 140,
        imagePath: "https://s8.postimg.org/h7lc9k94l/Toy3.jpg",
        name:"Magna Battle Armor, Magna Shield and Magna Fight Wing Batman figures",
        price: 110,
        stock: 100,
        categories: ['Toys','black grey toy','Kids'],
        description: "These awesome Batman figures are approximately 7 inch tall and come with full heavy armor that kids attach with magnets."
    }),
    new Product({
        _id: 141,
        imagePath: "https://s8.postimg.org/t9gq3qsnp/Toy4.jpg",
        name:"Rock 'Em Sock 'Em Robots Batman v Superman",
        price: 145,
        stock: 100,
        categories: ['Toys','black toy','Kids'],
        description: "Inspired by the movie Batman v Superman: Dawn of Justice. Batman and Superman star in this classic game."
    }),
    new Product({
        _id: 142,
        imagePath: "https://s8.postimg.org/f30z8gzs5/Toy5.jpg",
        name:"The Batman EXP Extreme Power Batman Action Figure [Ultra Blast]",
        price: 65,
        stock: 100,
        categories: ['Toys','Brown Black toy','Kids'],
        description: "Move them into position and pummel back and forth until one superhero flies off the platform!"
    }),
    new Product({
        _id: 143,
        imagePath: "https://s8.postimg.org/ah4v051ed/Toy6.jpg",
        name:"LEGO® Batman Movie - Mr. Freeze™ Ice Attack 70901",
        price: 120,
        stock: 100,
        categories: ['Toys','light blue toy','Kids'],
        description: "Includes two thumb-operated mechanisms and two battling superheroes."
    }),
    new Product({
        _id: 144,
        imagePath: "https://s8.postimg.org/t9gq3qkxx/Toy7.jpg",
        name:"The Batman EXP Extreme Power Batman Action Figure [Magna Battle Armor]",
        price: 59,
        stock: 100,
        categories: ['Toys','Kids','Grey black toy'],
        description: "Each figure comes with its own weapon and EXP Power Key that helps transform the figure to be battle ready."
    }),
    new Product({
        _id: 145,
        imagePath: "https://s8.postimg.org/7n1pmorid/Toy8.jpg",
        name:"The Dark Knight Batman Toy Stone Washed & Black",
        price: 135,
        stock: 100,
        categories: ['Toys','Grey black toy','Kids'],
        description: "Contains small hang loop for locker or closet hanging."
    }),
    new Product({
        _id: 146,
        imagePath: "https://s8.postimg.org/xvcuc2r1h/Toy9.jpg",
        name:"Fisher-Price Imaginext DC Super Friends Batwing",
        price: 49,
        stock: 100,
        categories: ['Toys','black toy','Kids'],
        description: "The perfect way to battle evil at any scale. Value priced for everyday play. Ages 3 and up."
    }),
    new Product({
        _id: 147,
        imagePath: "https://s8.postimg.org/ppusdz08l/Toy10.png",
        name:"DC Comics Justice League True-Moves Series 12 inch Action Figure -Batman",
        price: 65,
        stock: 100,
        categories: ['Toys','Black toy','Kids'],
        description: "From the world of DC Comics comes classic comic Batman in his popular 1990's black costume."
    }),
    new Product({
        _id: 148,
        imagePath: "https://s8.postimg.org/izeb4iahx/Toy11.jpg",
        name:"DC Comics Multiverse Justice League 6 inch Action Figure - Batman with Tact Suit",
        price: 48,
        stock: 100,
        categories: ['Toys','Black Toy','Kids'],
        description: "6 inch scale DC Super Hero figure from the new Justice League movie."
    }),
    new Product({
        _id: 149,
        imagePath: "https://s8.postimg.org/k1ohn2111/Toy12.jpg",
        name:"DC Justice League Battle In a Box Batman Figures 6pk",
        price: 26,
        stock: 100,
        categories: ['Toys','Silver Black Toy','Kids'],
        description: "Complete battle play pack from the new Justice League movie. 6 characters with detailed power suits and 14 points of articulation"
    }),
    new Product({
        _id: 150,
        imagePath: "https://s8.postimg.org/bjf1iqhnp/Toy13.jpg",
        name:"Imaginext DC Super Friends Batbot Xtreme",
        price: 56,
        stock: 100,
        categories: ['Toys','Yellow Blue Toy','Kids'],
        description: "Spread the wings of the Batmobile to flaunt the bat emblem and show Super-Villains who's boss in this town. Uh oh, Batman's under attack!"
    }),
    new Product({
        _id: 151,
        imagePath: "https://s8.postimg.org/k1ohn3bbp/Toy14.jpg",
        name:"Batman Dark Knight - The Joker 1:6 Scale Collector Figure(Imported Toys)",
        price: 62,
        stock: 100,
        categories: ['Toys','black Toy','Kids'],
        description: "Batman comes in 12inch scale with 5 points of articulation, iconic details, an enhanced Batsuit and dramatic lights and sounds."
    }),
    new Product({
        _id: 152,
        imagePath: "https://s8.postimg.org/3qodqqw91/Toy15.jpg",
        name:"Imaginext DC Super Friends Legends of Batman Deluxe Batmobile",
        price: 34,
        stock: 100,
        categories: ['Toys','Silver Blue Toy','Kids'],
        description: "Made from 100% high quality materials"
    }),
    new Product({
        _id: 153,
        imagePath: "https://s8.postimg.org/p0c01lk9h/Toy16.jpg",
        name:"DC Justice League Tactical Strike Batman Action Figure 12inch ",
        price: 24,
        stock: 100,
        categories: ['Toys','Silver Toy','Kids'],
        description: "The Dark Knight figure will recognize other figures when in close proximity and speaks to them."
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