import config from '../../config';
import assert from 'assert';
import async from 'async';
import riakClient from 'basho-riak-client';

export const viewCart = (req, res) => {
     console.log(`GET cart request successfull`);
     res.send(`This is cart contents`);
     var client = config.createClient(function (e, c) {
        if (e) {
            throw new Error(e);
        }
        /*client.ping(function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                // On success, ping returns true
                assert(rslt === true);
                //logger.info('[TasteOfRiakIntro] ping is successful');
                //save_people();
            }
        });*/
    });
    console.log(`GET cart client creation successfull`);
    client.fetchValue({ bucket: 'cart', key: 'utsavjain@gmail.com', convertToJs: true },
    function (err, rslt) {
        if (err) {
            console.log(err);
            throw new Error(err);
        } else {
            var riakObj = rslt.values;
            //var bashoman = riakObj.value;
            //logger.info("[TasteOfRiakIntro] I found %s in 'contributors'", bashoman.emailAddress);
            //res.send(riakObj);
           // update_person(riakObj);
        }
    }
);

};






export const pingRiak = (req, res) => {
    var client = config.createClient(function (e, c) {
        if (e) {
            throw new Error(e);
        }
        client.ping(function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                // On success, ping returns true
                assert(rslt === true);
                //logger.info('[TasteOfRiakIntro] ping is successful');
                //save_people();
            }
        });
    });
    console.log(`Riak ping successful`);
    res.send("Ping successfull");
};

export const addToCart = (req, res) => {
    
    var client = config.createClient(function (e, c) {
        if (e) {
            throw new Error(e);
        }
        client.ping(function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                // On success, ping returns true
                assert(rslt === true);
                //logger.info('[TasteOfRiakIntro] ping is successful');
                //save_people();
            }
        });
    });
    console.log(`Riak cart POST successful`);
    res.send("Added To cart  successfull");
    client.storeValue({
        bucket:'cart',
        key:'utsavjain@gmail.com',
        value:'cocaCola'
        },
        function(err, rslt) {
             if (err) {
            throw new Error(err);
                 }
        }
    )
    console.log(`Riak cart storeValue POST successful`);
    /*client.stop(function (err, rslt) {
        // NB: you may wish to check err
        process.exit();
    });
    console.log(`Riak client stopped`);*/
    /*var client = config.createClient(function (e, c) {
        if (e) {
            throw new Error(e);
        }
        client.ping(function (err, rslt) {
            if (err) {
                throw new Error(err);
            } else {
                // On success, ping returns true
                assert(rslt === true);
                //logger.info('[TasteOfRiakIntro] ping is successful');
                //save_people();
            }
        });
    });
    let obj = new Object(req.body);
    console.log(`POST call made`);
    client.storeValue({
        bucket:'carts',
        key: obj.email,
        value: obj.value
    });
    if(err){
        res.send(err);
      }
      res.json(obj);
      */
};
        

export const updateCart = (req, res) => {
    console.log(`PUT request successfull`);
      
};
