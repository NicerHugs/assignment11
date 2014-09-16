var serverURL = '//tiny-pizza-server.herokuapp.com/collections/NicerHugs';

var _id = "54174b6a84d2ee0200000057";


// $.ajax({
//     url: serverURL,
//     type: 'GET'
// })
//     .done(function(a) {
//         console.log(a);
//     });

// $.ajax({
//     url: serverURL + _id,
//     type: 'delete'
// }).done(function() {
//     console.log('deleted')
// });


$.ajax({
    url: serverURL,
    type: 'get'
})
    .done(function(todoData) {
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

    });

function markCompleted(elementClass) {
    $(elementClass).addClass('completed');
}

function sendNewTodo(e) {
    e.preventDefault();
    var todoObject =  {
        title: $('#title').val(),
        dueDate: Date.parse($('#due-date').val()),
        createdDate: Date.now(),
        description: $('#description').val(),
        priority: 'priority-' + $('#priority').val(),
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
