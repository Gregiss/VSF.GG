// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Note) {

    Note.gerarTeste = function(obj, cb) {
        
        if (obj) {
            console.log(123);
            Note.upsert({
                teste: obj.teste,
            }, function (err, res) {
                if (err) { 
                    cb(err, null); return; 
                }
                if (res) {
                    cb(null, res)
                }
            })
        }
    }

    Note.remoteMethod("gerarTeste", {
    accepts: [{ arg: "obj", type: "object", require: true }],
    returns: { arg: "result", type: "object", root: true },
    http: { path: "/gerarTeste", verb: "post" }

  });

};
