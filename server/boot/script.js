var async = require("async");
var config = require("../config.json");

module.exports = function (app) {
    
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    delete User.validations.email;
    
    if (config && config.users && config.users.length > 0) {

        var usersRegister = [];

        async.eachSeries(config.users, function (user, cb) {
            User.findOne({ where: { username: user.username } }, function (err, dadosUser) {
                if (!dadosUser) usersRegister.push(user);
                cb();
            });
        }, function () {

            if (usersRegister.length <= 0) return;

            User.create(usersRegister, function (err, users) {

                if (err) {

                    console.log(err);

                } else if (users) {

                    users.forEach(function (usuario) {
                        Role.findOne({ where: { name: usuario.cargo } }, function (err, role) {

                            if (role) {

                                role.principals.create({ principalType: RoleMapping.USER, principalId: usuario.id }, function (err, principal) {
                                    if (err) console.log(err);
                                });

                            } else {

                                Role.create({ name: usuario.cargo }, function (err, role) {
                                    role.principals.create({ principalType: RoleMapping.USER, principalId: usuario.id }, function (err, principal) {
                                        if (err) console.log(err);
                                    });
                                });

                            }
                        });
                    });

                }

            });
        });

    }

}


function createRole(nameRole) {
    app.models.Role.findOne({ where: { name: nameRole } }, function (err, role) {

        if (!role) {

            app.models.Role.create({ name: nameRole }, function (err, role) {
                if (err) console.log(err);
            });

        }
    });
}