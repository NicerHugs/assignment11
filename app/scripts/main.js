var serverURL = '//tiny-pizza-server.herokuapp.com/collections/NicerHugs';


function markCompleted() {
    $('.completed-checkbox').on('click', function() {
        $(this).parent().toggleClass('completed');
    });
}


function populateTodos() {
    $.ajax({
      url: serverURL,
      type: 'get'
  })
      .done(function(todoData) {
          $('.todo-item').remove();
          var todoModel = _.map(todoData, function(todoDatum){
              var todoModel = {
                  id: todoDatum._id,
                  title: todoDatum.title,
                  dueDate: todoDatum.dueDate,
                  createdDate: todoDatum.createdDate,
                  description: todoDatum.description,
                  priority: todoDatum.priority
              };
              _.defaults(todoModel, {
                  title: "Title",
                  dueDate: Date.now(),
                  createdDate: Date.now(),
                  description: "description",
                  priority: "off"
              });
              return todoModel;
          });
          _.each(todoModel, function(todoModel){
              renderTemplate('#todo-item', '.todo-section', todoModel);
          });
          markCompleted();
      });
}

populateTodos();

$('#delete-completed').on('click', function(e) {
    e.preventDefault();
    var completedIDs = [];
    $('.completed').each(function () {
        completedIDs.push(this.id);
    });
    _.each(completedIDs, deleteByID)
    // populateTodos();
});



function deleteByID(id) {
    $.ajax({
        url: serverURL + '/' + id,
        type: 'delete'
    }).done(function() {
        populateTodos();
    });
}


function sendNewTodo(e) {
    e.preventDefault();
    var todoObject =  {
        title: $('#title').val(),
        dueDate: moment(Date.parse($('#due-date').val())).format("MMM D, YYYY"),
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
            populateTodos();
        });
}

function renderTemplate(templateId, location, model) {
    var templateString = $(templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(model);
    $(location).append(renderedTemplate);}

renderTemplate('#form', '.form-element');



$('#update-button').on('click', sendNewTodo);
