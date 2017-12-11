/**
 * Created by Suchishree Jena on 11/23/2017.
 */
//Path to Gallery: https://postimg.org/gallery/33tebu4n0/
//https://postimg.org/gallery/33tebu4n0/78fca8bd/
var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingcart');
console.log("Connected to MongoDb database");

var products = [
    new Product({
        _id: 170,
        imagePath: "https://s33.postimg.org/r4u5dmv1r/WH1.jpg",
        name:"Batman - Wall Hanging",
        price: 60,
        stock: 100,
        categories: ['WallHanging','Yellow black WallHanging', 'General'],
        description: "Decorate any room in your home or office.Our unique wallHangings are handmade from used vinyl records to achieve a one-of-a-kind modern gift while still holding a vintage appeal to it."
    }),
    new Product({
        _id: 171,
        imagePath: "https://s33.postimg.org/n9qrak40v/WH2.jpg",
        name:"DC Comics 3-D WallHanging Wobblers BN12061E Batman Logo",
        price: 90,
        stock: 100,
        categories: ['WallHanging','black white WallHanging','General'],
        description: "Eye-popping and impressive 3-D wall art. Officially licensed merchandise for Batman fans."
    }),
    new Product({
        _id: 172,
        imagePath: "https://s33.postimg.org/onie6dqkv/WH3.jpg",
        name:"3D Effect Super Hero Batman Breaking WallHanging",
        price: 110,
        stock: 100,
        categories: ['WallHanging','black WallHanging','General'],
        description: "Impress your visitors with this unique wall-wobbler wall art piece that displays a crisp, clean image."
    }),
    new Product({
        _id: 173,
        imagePath: "https://s33.postimg.org/5if4wm473/WH4.jpg",
        name:"Modern Vinyl Record WallHanging With Batman Emblem Design",
        price: 145,
        stock: 100,
        categories: ['WallHanging','black WallHanging','General'],
        description: "This item is the original and a great gift for your friend, girls, children and others. They will be satisfied and happy of it."
    }),
    new Product({
        _id: 174,
        imagePath: "https://s33.postimg.org/rucxq0iqn/WH5.jpg",
        name:"Batman Logo Design Vinyl Record WallHanging cum book shelf",
        price: 75,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "FOR THE PEOPLE WHO WANNA FEEL SPECIAL - we are open for custom designs. If you wanna one - we can help you - just contact us!"
    }),
    new Product({
        _id: 175,
        imagePath: "https://s33.postimg.org/55nqqggsf/WH6.jpg",
        name:"Batman Catwoman Love Design Vinyl Record WallHanging cum Book Shelf",
        price: 110,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "PERFECT GIFT FOR ANY OCCASION: Anniversary, New Year or World Post Day... Or don't wait for any special days and make your today better with vintage unique WallHanging!"
    }),
    new Product({
        _id: 176,
        imagePath: "https://s33.postimg.org/cyeeifuhb/WH7.jpg",
        name:"Batman Vinyl Record WallHanging cum Shelf",
        price: 59,
        stock: 100,
        categories: ['WallHanging','General','black WallHanging'],
        description: "This Batman vinyl shelf is made for comic book fans! Perfect for anyone who loves superheroes and crimefighters!."
    }),
    new Product({
        _id: 177,
        imagePath: "https://s33.postimg.org/ib38w0si7/WH8.jpg",
        name:"Vintage Batman Vinyl Record Designer WallHanging with LED in background",
        price: 115,
        stock: 100,
        categories: ['WallHanging','black WallHanging','General'],
        description: "Made for any wall, this WallHanging is vibrantly printed with AcryliPrint®HD process to ensure the highest quality display of any content."
    }),
    new Product({
        _id: 178,
        imagePath: "https://s33.postimg.org/n8gtho4xb/WH9.jpg",
        name:"Batman Dark Сomics Vinyl Record WallHanging cum windchime",
        price: 79,
        stock: 100,
        categories: ['WallHanging','Yellow Black WallHanging','General'],
        description: "GET A UNIQUE HOME ACCESSORY! Be sure your friends and neighbors never remain indifferent after they have seen your modern vinyl record WallHanging!"
    }),
    new Product({
        _id: 179,
        imagePath: "https://s33.postimg.org/bjcttq13z/WH10.jpg",
        name:"Secondlifeforvinyl Eco-Friendly Batman Vinyl WallHanging",
        price: 65,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "It's creative - the WallHanging is made of a record, and vinyl records themselves are very beautiful.It has the silent mechanism - no tick-tock will get on your nerves."
    }),
    new Product({
        _id: 180,
        imagePath: "https://s33.postimg.org/sjvq2elv3/WH11.jpg",
        name:"Batman Dark Knight Hero Arkham City DC Comics Movie Characters Vinyl Record Design WallHanging",
        price: 38,
        stock: 100,
        categories: ['WallHanging','Yellow Black WallHanging','General'],
        description: "Made of Hand Selected Vintage Recycled 12inch Vinyl Records (Item Surface May Have Minor Scratches and Blemishes)"
    }),
    new Product({
        _id: 181,
        imagePath: "https://s33.postimg.org/bw47zwytb/WH12.jpg",
        name:"Batman Dark Knight Vinyl Record WallHanging Poster",
        price: 66,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "MAKE A PERFECT PRESENT FOR FANS OF DC COMICS - Wanna make a unique and original gift but only named cup is on your mind? Impress everybody with handmade vinyl record WallHanging!"
    }),
    new Product({
        _id: 182,
        imagePath: "https://s33.postimg.org/7mzhxr39r/WH13.jpg",
        name:"Batman Dark Knight LED Light Sign WallHanging",
        price: 156,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "Materials: High Quality Acrylic Plastic , Aluminum tube & LED. Size: About 30 X 22 cm (12 X 8.66 Inch). The Package include Chain for hanging on the wall. The Power Cord Length about 140 cm , have not on/off switch."
    }),
    new Product({
        _id: 183,
        imagePath: "https://s33.postimg.org/e0ol10nlb/WH14.jpg",
        name:"Batman Logo Silhouette Vinyl Record WallHanging cum Shelf",
        price: 72,
        stock: 100,
        categories: ['WallHanging','black WallHanging','General'],
        description: "SHOW YOUR CARE - This wallhanging makes an original present for your friends and family, it shows your knowledge about their hobbies and interests, it shows your love!"
    }),
    new Product({
        _id: 184,
        imagePath: "https://s33.postimg.org/onie6fo0v/WH15.jpg",
        name:"Justice Hero Batman DIY WallHanging Home Decoration Creative Watch Classic Film",
        price: 35,
        stock: 100,
        categories: ['WallHanging','Yellow Black WallHanging','General'],
        description: "A GIFT HE WILL LOVE - Imagine the look on your friend's face when he will open the box and find awesome vinyl Wallhanging with unique design inside. You don't need any extra effort to find something MORE than a regular gift!"
    }),
    new Product({
        _id: 185,
        imagePath: "https://s33.postimg.org/p09scmlq7/WH16.jpg",
        name:"Supernatural Handmade Vinyl Record WallHanging Fun gift Vintage Unique Home decor",
        price: 124,
        stock: 100,
        categories: ['WallHanging','Black WallHanging','General'],
        description: "Amazing-looking vintage wallhanging with unique design made from used vinyl records."
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
