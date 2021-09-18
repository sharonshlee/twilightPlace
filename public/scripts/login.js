$(() => {
    $.post("/users/login", JSON.stringify({ username, password })
    ).then((users) => {
        for (user of users) {
            $("<div>").text(user.name).appendTo($("body"));
        }
    });;
});
