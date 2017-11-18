var session = require('./demo');


var session_create_data = { login_id: "aashi", cart_id : "cart1", quantity: 1};
var session_set_data = { token: null, login_id: "aashi", cart_id : "cart2", quantity: 2};
var session_data = {token: null};

session.create(session_create_data, function(response){
    session_set_data.token = response.token;
    session_data.token = response.token;
    console.log(response);
})

session.get(session_data, function(response){
    console.log("Get:");
    console.log(response);
 })

session.set(session_set_data, function(response){
    console.log("Set:");
   console.log(response);
})

session.get(session_data, function(response){
    console.log("Get:");
    console.log(response);
 })

// session.kill(session_data, function(response){
//     console.log(response);
// })
