var Product = require('../models/product');

var mongoose = require('mongoose');

    mongoose.connect('localhost:27017/shoppingcart');
    console.log("Connected to MongoDb database");

var products = [
    new Product({
		_id: 100,
        imagePath: "https://s1.postimg.org/9rgb2jbadn/Bag1.jpg",
        name:"DC Comics Batman with Logo Black Tactical Backpack bag",
        price: 60,
        stock: 100,
        categories: ['bags','LaptopBag','black bag','BagPack'],
		description: "Polyester/PU Blend, Measures Approx 19 x 17 x 7, Fits up to a 15inch laptop "
    }),
     new Product({
		_id: 101,
        imagePath: "https://s1.postimg.org/1osc9r3j3f/Bag2.jpg",
        name:"Batman High Capacity LaptopBag",
        price: 40,
        stock: 100,
        categories: ['bags','LaptopBag','black bag','BagPack'],
		description: "Cool and creative design, Fits up to a 15inch laptop "
    }),
    new Product({
		_id: 102,
        imagePath: "https://s1.postimg.org/67udcqc023/Bag3.jpg",
        name:"YOURNELO Leisure Rucksack School Backpack Bookbag",
        price: 30,
        stock: 100,
        categories: ['bags','School Bag','black bag','kids'],
		description: "Perfect gift choice for your kids.You could also use it to travel.It is eyecatching"
    }),
    new Product({
		_id: 103,
        imagePath: "https://s1.postimg.org/zz2pqgfij/Bag4.jpg",
        name:"School Backpack Bookbag",
        price: 45,
        stock: 100,
        categories: ['bags','School Bag','black bag','kids'],
		description: "high quality canvas.Adjustable shoulder straps are reflective/padded for carrying comfort."
    }),
    new Product({
		_id: 104,
        imagePath: "https://s1.postimg.org/67udcqa2m3/Bag5.jpg",
        name:"Roreto School Backpack bag",
        price: 25,
        stock: 100,
        categories: ['bags','School Bag','yellow bag','kids'],
		description: "Size: 11.8inch  L x 4.7inch W x 16.5inch H school bagpack"
    }),
    new Product({
		_id: 105,
        imagePath: "https://s1.postimg.org/51b244ldqj/Bag6.jpg",
        name:"Lego Batman Full Size 16 inch DC Comics School Backpack bag",
        price: 20,
        stock: 100,
        categories: ['bags','School Bag','blue bag','kids'],
		description: "Polyester/PU Blend, Measures Approx 18 x 15 x 5 "
    }),
	    new Product({
		_id: 106,
        imagePath: "https://s1.postimg.org/60r5han2bf/Bag7.jpg",
        name:"Laptop black bag Backpack",
        price: 53,
        stock: 100,
        categories: ['bags','LaptopBag','black bag'],
		description: "Size: 11.8inch L x 4.7inch W x 16.5inch H Laptop bagpack"
    }),
	    new Product({
		_id: 107,
        imagePath: "https://s1.postimg.org/1vvk56rlyz/Bag8.jpg",
        name:"The Dark Knight Batman Logo Laptop Messenger Bag Daypack Stone Washed & Black",
        price: 35,
        stock: 100,
        categories: ['bags','Messenger Bag','black bag','Women'],
		description: "Contains small hang loop for locker or closet hanging."
    }),
	    new Product({
		_id: 108,
        imagePath: "https://s1.postimg.org/8aa60s8fxn/Bag9.jpg",
        name:"Batman Symbol Logo Tote/Messenger Bag",
        price: 49,
        stock: 100,
        categories: ['bags','Sling Bag','black bag','Women'],
		description: "Better Built Messenger bags are built to last."
    }),
	    new Product({
		_id: 109,
        imagePath: "https://s1.postimg.org/8oglrnhlnv/Bag10.jpg",
        name:"Travel Backpack Bag",
        price: 65,
        stock: 100,
        categories: ['bags','Travel Bag','black bag','Men','Women'],
		description: "Holds a lot more than just your laptop"
    }),
	    new Product({
		_id: 110,
        imagePath: "https://s1.postimg.org/1l8qc1fduj/Bag11.jpg",
        name:"Batman Logo Retro Comic Shoulder Bag",
        price: 48,
        stock: 100,
        categories: ['bags','Sling Bag','black bag','Women'],
		description: "This Beautiful bag was created using Batman designs on black cotton fabric."
    }),
		new Product({
		_id: 111,
        imagePath: "https://s1.postimg.org/2h57rhmpez/Bag12.jpg",
        name:"Batman Symbol Logo Graphic Messenger Bag",
        price: 26,
        stock: 100,
        categories: ['bags','Sling Bag','black bag','Women'],
		description: "A versatile cotton canvas messenger bag with many uses. It works well as a school bag, travel carry-all, or even a diaper bag. Spacious and comfortable to carry with two inside pockets, two outside pockets, and 2' wide adjustable shoulder strap with Brass hardware."
    }),
		new Product({
		_id: 112,
        imagePath: "https://s1.postimg.org/3noj03djgb/Bag13.jpg",
        name:"DC Comics Batman Black Backpack bag with Black Bat Logo",
        price: 56,
        stock: 100,
        categories: ['bags','Backpack','black bag','Women','Men'],
		description: "Black messenger bag from DC Comics featuring a large rubber Batman logo patch and ballistic nylon details on the front flap."
    }),
        new Product({
		_id: 113,
        imagePath: "https://s1.postimg.org/1hp4ebjqjf/Bag14.jpg",
        name:"Official DC Comics Distressed Batman Classic Logo Street Messenger Sling Bag - Black and Yellow",
        price: 62,
        stock: 100,
        categories: ['bags','Sling Bag','black bag','Women'],
		description: "Approximately 14inch long (not including length of strap) and 14.5inch wide"
    }),
        new Product({
		_id: 114,
        imagePath: "https://s1.postimg.org/2h57rhoukr/Bag15.jpg",
        name:"Batman Symbol Logo Graphic Messenger Bag",
        price: 34,
        stock: 100,
        categories: ['bags','Sling Bag','black bag','Women'],
		description: "Made from 100% high quality materials"
    }),
        new Product({
		_id: 115,
        imagePath: "https://s1.postimg.org/6wnmwqzbcr/Bag16.jpg",
        name:"DC Comics Batman Envelope Purse, Clutch, Chain Strap Bag",
        price: 24,
        stock: 100,
        categories: ['bags','Sling Bag','Golden black bag','Women'],
		description: "Holds your personal belongings in a bag made of nice fabric materials. Has a graphic design on the front of the bag. Be the envy of your friends."
    }),
	    new Product({
		_id: 116,
        imagePath: "https://s1.postimg.org/7sk4c79my3/Bag17.jpg",
        name:"Batman Golden Bag",
        price: 34,
        stock: 100,
        categories: ['bags','Sling Bag','Golden bag','Women'],
		description: "Very nice for those Batman Or Comic Fans. Ladies clutch wallet."
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