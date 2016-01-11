$(document).ready(function () {
    $("#SignInForm").on("submit", function (e){
        e.preventDefault();
        $.post("/signin/adminpanel", {
            username: SignInForm.UserName.value,
            password: SignInForm.UserPassword.value
        })
        .done(function () {
            $("#SignInForm .form-group").removeClass("has-error");
            $("#SignInForm .form-group span").addClass("hidden");
            $("#SignInForm .form-group").addClass("has-success");
            location.href = "/adminpanel";
        })
        .fail(function (data) {
            // validation for username field
            if (data.responseJSON.name) {
                $("#SignInForm .form-group").removeClass("has-error");
                $("#SignInForm .form-group span").addClass("hidden");
                $("#SignInForm .form-group").addClass("has-success");
            } else {
                $("#SignInForm .form-group").addClass("has-error");
                $("#SignInForm .form-group span").removeClass("hidden");
            }
            // validation for password field
            if (!data.responseJSON.pass) {
                $("#SignInForm .form-group").eq(1).addClass("has-error");
                $("#SignInForm .form-group span").eq(1).removeClass("hidden");
            }
        });
    });
});