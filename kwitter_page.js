const firebaseConfig = {
      apiKey: "AIzaSyBs9ZROHC9Blf13ORTb9rBaJocbtROk5t8",
      authDomain: "kwitter-c6ed3.firebaseapp.com",
      databaseURL: "https://kwitter-c6ed3-default-rtdb.firebaseio.com",
      projectId: "kwitter-c6ed3",
      storageBucket: "kwitter-c6ed3.appspot.com",
      messagingSenderId: "485182167897",
      appId: "1:485182167897:web:05a55c2bc970e0c2340a48"
    };
    
    
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("Room_name");

    function send(){
          msg = document.getElementById("msg").value;

          firebase.database().ref(room_name).push({
                name: user_name,
                message: msg,
                like:0
          });

          document.getElementById("msg").value = "";
    }


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4> "+name+ "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : "+like+"</span></button><hr>"

        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();



function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("Room_name");
    window.location = "index.html";
}


function updateLike(message_id){
    console.log("button click - "+message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);


    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
    });
}