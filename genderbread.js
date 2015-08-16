Persons = new Mongo.Collection("persons");

if (Meteor.isClient) {

  Template.body.helpers({
    persons : function() {
      return Persons.find({});
    },
    closePersons : function() {
      user = Session.get("curUser") || Persons.findOne({owner: Meteor.userId()})
      return Persons.find({
        $and:[
          {name: {$not:user.name}},
          {$or:[{womanId:user.womanId}, {manId:user.manId}]}
          ]
        }
      );
    }
  });

  Template.userInfo.helpers({
    curUser : function() {
      return Session.get("curUser")
    }
  })

  Template.createPerson.events({
    "submit .new-person": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var name = event.target.name.value;
      var womanId = parseInt(event.target.womanId.value);
      var manId = parseInt(event.target.manId.value);

      // Insert a task into the collection
      Persons.insert({
        name: name,
        womanId: womanId,
        manId: manId,
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username,  // username of logged in user
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.name.value = "";
      event.target.womanId.value = "";
      event.target.manId.value = "";
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Accounts.onLogin(function (){
    Session.set('curUser', Persons.findOne({owner: Meteor.userId()})); 
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
