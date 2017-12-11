/**
 * Created by Suchishree Jena on 11/29/2017.
 */

//Path to Gallery: https://postimg.org/gallery/dxt88np8/
//https://postimg.org/gallery/dxt88np8/c0402eb5/
var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

var products = [
    new Product({
        _id: 186,
        imagePath: "https://s33.postimg.org/cmp6nub5b/Lamp1.jpg",
        name:"Batman Lamp with chrome shade",
        price: 40,
        stock: 100,
        categories: ['Lamp','Black Lamp', 'General'],
        description: "This desk lamp measures approximately 16 in. H x 10 in. W. Made of sturdy metal. Uses a standard light bulb - A15 bulb type from GE, which is 3 inches height and available everywhere. A plate wraps the base. This durable desk lamp will last a long time. And its quality is absolutely superb."
    }),
    new Product({
        _id: 187,
        imagePath: "https://s33.postimg.org/9sm1afj9r/Lamp2.jpg",
        name:"BATMAN ECLIPSE LIGHT USB POWERED DESK LAMP DC COMICS ",
        price: 50,
        stock: 100,
        categories: ['Lamp','Black Lamp','General'],
        description: "Approximately 16 in. H x 10 in. W. A metal plate was rolled to make the body of the lamp base. Officially licensed merchandise for Batman fans."
    }),
    new Product({
        _id: 188,
        imagePath: "https://s33.postimg.org/cmp6nuqkv/Lamp3.jpg",
        name:"Batman USB LED Night Light Soft Yellow Lamp Portable Free Twisted For Laptop Power Bank Other 5V USB Source",
        price: 45,
        stock: 100,
        categories: ['Lamp','Black Lamp','General'],
        description: "Wattage:5W Material:ABS+PS Size:44*39*72mm Input Voltage:5V 500MA(USB) Feature: Compatible with any USB port It is convenient and easy to use Cute batman PC Reading Lamp 360 Turn Led USB Night Light."
    }),
    new Product({
        _id: 189,
        imagePath: "https://s33.postimg.org/9338y23an/Lamp4.jpg",
        name:"Batman Symbol Lamp with chrome shade, logo",
        price: 145,
        stock: 100,
        categories: ['Lamp','Black Lamp','General'],
        description: "Uses a standard light bulb - A15 bulb type from GE, which is 3 inches height and available everywhere.This item is the original and a great gift for your friend, girls, children and others. They will be satisfied and happy of it."
    }),
    new Product({
        _id: 190,
        imagePath: "https://s33.postimg.org/5jhb88dfj/Lamp5.jpg",
        name:"DC Comics Collectors Edition Batman LED Night Light Lamp",
        price: 75,
        stock: 100,
        categories: ['Lamp','Black Lamp','General'],
        description: "The night light makes it easy to see in the dark while on an adventure with the Man of Steal or The Dark Knight !"
    }),
    new Product({
        _id: 191,
        imagePath: "https://s33.postimg.org/nz1s5n6zj/Lamp6.jpg",
        name:"Neca 61421 DC Comics Originals 20-Inch Batman Leg Lamp",
        price: 20,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: "Decorate your room with a little help from the Caped Crusader! These fun leg lamps feature classic Batman art for fans of the DC Comics detective. Both the leg and the lamp light up, adding a bold glow to any room. Including the full-size shade, it stands 20inch high x 10inch wide and has a 5-foot cord. Main light uses one 40-watt bulb (not included) and leg light uses one 5-watt type C bulb (included)."
    }),
    new Product({
        _id: 192,
        imagePath: "https://s33.postimg.org/hze11fwbj/Lamp7.jpg",
        name:"DC Comics Batman Look A Lite LED Lamp by gro",
        price: 59,
        stock: 100,
        categories: ['Lamp','General','Black Lamp'],
        description: "Officially licensed DC Comics Batman Lamp.It takes either 3 x AAA batteries or a mini USB cable (neither included)"
    }),
    new Product({
        _id: 193,
        imagePath: "https://s33.postimg.org/cb7qajk9b/Lamp8.jpg",
        name:"Ata-Boy DC Comics Batman Logo Night Light Lamp",
        price: 58,
        stock: 100,
        categories: ['Lamp','White Black Lamp','General'],
        description: "There's always a good place for a night light in your home to ensure that you and your family can move around safely at night."
    }),
    new Product({
        _id: 194,
        imagePath: "https://s33.postimg.org/a5dfglttr/Lamp9.jpg",
        name:"Batman Lighting Decor Gadget Lamp",
        price: 25,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: "GET A UNIQUE HOME ACCESSORY! Be sure your friends and neighbors never remain indifferent after they have seen your modern Lamp!"
    }),
    new Product({
        _id: 195,
        imagePath: "https://s33.postimg.org/ftjq7idlr/Lamp10.jpg",
        name:"Batman Signal Lamp Shade",
        price: 65,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: "Our shade measures 4 inches across the top; 9 inches across the bottom and 7 inches in height. We make every shade in our home. Fabric is Blue with Batman and Bat Signal all over and trimmed in Black. "
    }),
    new Product({
        _id: 196,
        imagePath: "https://s33.postimg.org/wil62v4vz/Lamp11.jpg",
        name:"Batman Inspired: Lamp Shade",
        price: 38,
        stock: 100,
        categories: ['Lamp','Yellow Black Lamp','General'],
        description: "Let the rest of Gotham know where you stand, with this Batman emblem covered lamp shade."
    }),
    new Product({
        _id: 197,
        imagePath: "https://s33.postimg.org/6aa1dhd2n/Lamp12.jpg",
        name:"BATMAN SUPERHERO NIGHT LIGHT LAMP",
        price: 66,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: "Features a plug in with automatic light sensor for auto on/off with the classic Batman logo. Officially licensed."
    }),
    new Product({
        _id: 198,
        imagePath: "https://s33.postimg.org/6yivx048v/Lamp13.jpg",
        name:"Batman Dark Knight Night Light Sign Lamp",
        price: 56,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: " Fabric is Blue with Batman and Bat Signal all over and trimmed in Black. The shade clips onto a standard 60 or 40 watt bulb or the new fluorescent light bulb."
    }),
    new Product({
        _id: 199,
        imagePath: "https://s33.postimg.org/7pbm27tlb/Lamp14.jpg",
        name:"LE3D 3D Optical Illusion Desk Lamp/3D Optical Illusion Night Light Lamp",
        price: 72,
        stock: 100,
        categories: ['Lamp','Blue Lamp','General'],
        description: "MIND BENDING LED 3D ILLUSION LAMP ADDS A COOL DESIGN ELEMENT TO YOUR ROOM: This unique DC Comics Justice League inspired The Dark Knight Batman 3D optical illusion lamp is crafted from a flat acrylic plate; when light from the base hits the acrylic surface it creates an astonishing 3D hologram effect that will impress your guests and provide a gentle night light for kids who are afraid of the dark. Fill your space with the soft glow of this amazing 3D illusion lamp."
    }),
    new Product({
        _id: 200,
        imagePath: "https://s33.postimg.org/ks78m1p4f/Lamp15.jpg",
        name:"Westland Giftware Nightlight DC Comics Batman Lamp",
        price: 35,
        stock: 100,
        categories: ['Lamp','White Black Lamp','General'],
        description: "Westland Giftware's DC Comics Batman Nightlight is made of durable resin and is 4.75inch high. The light bulb is included and the nightlight has an on/off switch. Westland Giftware is a leading manufacturer of quality collectible gift and home decor items."
    }),
    new Product({
        _id: 201,
        imagePath: "https://s33.postimg.org/94d6qy2e7/Lamp16.jpg",
        name:"Justice League Batman Batsignal Superhero Logo LED Illuminated Night Light Lamp",
        price: 124,
        stock: 100,
        categories: ['Lamp','Yellow Black Lamp','General'],
        description: "This piece measures almost 2ft across and over 1ft tall. It is powered by a 12v wall plug adaptor and is lit using LED strip lights."
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

