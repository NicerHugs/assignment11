var serverURL = '//tiny-pizza-server.herokuapp.com/collections/NicerHugs';

var _id = "54174b6a84d2ee0200000057";


// $.ajax({
//     url: serverURL,
//     type: 'GET'
// })
//     .done(function(a) {
//         console.log(a);
//     });
//
// $.ajax({
//     url: serverURL + _id,
//     type: 'delete'
// }).done(function() {
//     console.log('deleted')
// });


function sendNewTodo(e) {
  e.preventDefault();
  var todoObject =  {
      title: $('#title').val(),
      dueDate: Date.parse($('#due-date').val()),
      createdDate: Date.now(),
      description: $('#description').val(),
      priority: $('#priority').val(),
  };
  $.ajax({
      url: serverURL,
      type: 'POST',
      data: todoObject
  })
      .done(function() {
          console.log('Sent!');
      });
}

function renderTemplate(templateId, location, model) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(model);
    $(location).append(renderedTemplate);}

renderTemplate('#form', '.form-element');


$('#update-button').on('click', sendNewTodo);
