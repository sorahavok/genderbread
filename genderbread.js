Persons = new Mongo.Collection("persons");

if (Meteor.isClient) {

  Template.body.helpers({
    persons : function() {
      return Persons.find({});
    }
  });

  Template.createPerson.events({
    "submit .new-person": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var name = event.target.name.value;
      var womanId = event.target.womanId.value;
      var manId = event.target.manId.value;

      // Insert a task into the collection
      Persons.insert({
        name: name,
        womanId: womanId,
        manId: manId,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.name.value = "";
      event.target.womanId.value = "";
      event.target.manId.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
