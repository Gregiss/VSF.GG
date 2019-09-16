function log(m) {
    console.log(m);
}

/* Local Store funÃ§Ãµes curtas */
function getStore(i) {
    return localStorage.getItem(i);
}
function setStore(i) {
    return localStorage.setItem(i);
}
function delStore(i) {
    return localStorage.removeItem(i);
}

/* Cookie funÃ§Ãµes curtas */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function delCookie(name) {
    setCookie(name, "", -1);
}

/* redirecionamentos */
function redirect(l) {
    window.location.href = l;
}

/* adiciona zero a esquerda (num, casas) */
function ajustNumber(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

/* ajust Data */
function retornDataTime(date) {
    if (!date instanceof Date) { date = new Date(date); }
    return ajustNumber(date.getDate(), 2) + "/" + ajustNumber((date.getMonth() + 1), 2) + "/" + date.getFullYear() + " " + ajustNumber(date.getHours(), 2) + ":" + ajustNumber(date.getMinutes(), 2);
}
/* Propriedades Array */
Array.prototype.containsKey = function (key) {
    if (!this || (this.constructor !== Array && this.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (Object.keys(this[i]) == key) {
            return true;
        }
    }
    return key in this;
}
Array.prototype.getObjectKey = function (key) {
    if (!this || (this.constructor !== Array && this.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (Object.keys(this[i]) == key) {
            return this[i];
        }
    }
    return false;
}
Array.prototype.updateKey = function (key, name, value) {
    if (!this || (this.constructor !== Array && this.constructor !== Object)) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (Object.keys(this[i]) == key) {
            if (!this[i][key][name]) {
                return false;
            } else {
                this[i][key][name] = value;
                return this[i];
            }
        }
    }
    return false;
}
Array.prototype.removeItemKey = function (key) {
    for (i = 0; i < this.length; i++) {
        if (Object.keys(this[i]) == key) {
            for (i2 = i; i2 < this.length - 1; i2++) {
                this[i2] = this[i2 + 1];
            }
            this.length = this.length - 1
            return;
        }
    }
}
Array.prototype.removeItem = function (a) {
    for (i = 0; i < this.length; i++) {
        if (this[i] == a) {
            for (i2 = i; i2 < this.length - 1; i2++) {
                this[i2] = this[i2 + 1];
            }
            this.length = this.length - 1
            return;
        }
    }
}
Array.prototype.contains = function (a) {
    var i = this.length;
    while (i--) {
        if (this[i] === a) {
            return true;
        }
    }
    return false;
}


function loadScript(a) {
    if (a) {
        var c = document.getElementsByTagName("body")[0],
            d = document.createElement("script");
        d.src = a, c.appendChild(d);
    }
}

function minifyMenu() {
    $.root_.hasClass("menu-on-top") || ($.root_.toggleClass("minified"), $.root_.removeClass("hidden-menu"), $("html").removeClass("hidden-menu-mobile-lock"));
    $('.table').DataTable().responsive.recalc();
}

function toggleMenu() {
    $.root_.hasClass("menu-on-top") ? $.root_.hasClass("menu-on-top") && $(window).width() < 979 && ($("html").toggleClass("hidden-menu-mobile-lock"), $.root_.toggleClass("hidden-menu"), $.root_.removeClass("minified")) : ($("html").toggleClass("hidden-menu-mobile-lock"), $.root_.toggleClass("hidden-menu"), $.root_.removeClass("minified"));
    $('.table').DataTable().responsive.recalc();
}

function loadURL(a, b) {
    if (!pagOn || pagOn != a) {
        if (b[0] == $('#content')[0]) {
            pagOn = a;
        }
        $.ajax({
            "type": "GET",
            "url": a,
            "dataType": "html",
            "cache": false,
            "beforeSend": function () {
                pagefunction = null, b.removeData().html(""), b.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>'), b[0] == $("#content")[0] && ($("html").animate({
                    "scrollTop": 0
                }, "fast"))
                if (b[0] == $('#content')[0]) {
                    $("nav li.active").removeClass("active");
                    $('nav li:has(a[value="' + a + '"])').addClass("active");
                }
            },
            "success": function (a) {
                b.css({
                    "opacity": "0.0"
                }).html(a).delay(50).animate({
                    "opacity": "1.0"
                }, 300), a = null, b = null
                return false;
            },
            "error": function (c, d, e) {
                b.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error requesting <span class="txt-color-red">' + a + "</span>: " + c.status + ' <span style="text-transform: capitalize;">' + e + "</span></h4>")
            }
        })
    }
}

function logout() {

    console.log("Executando LOGOFF");

    $.ajax({
        method: "POST",
        url: "/api/Users/logout",
        timeout: 4000,
        data: {
            tokenId: app.config.token
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", app.config.token);
        },
        success: function (res) {
            console.log("OK");
            //localStorage.removeItem("token")
            //redirect("./");
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function queryGet(query) {
    if (query && Object.keys(query).length > 0) {
        return "?filter=" + encodeURI(JSON.stringify(query));
    }
    return "";
};
function requestServer(query, method, url, callback) {

    if (method == "GET" && query && Object.keys(query).length > 0) {
        url = url + "?filter=" + encodeURI(JSON.stringify(query));
    }
    $.ajax({
        url: app.config.host + "/" + url,
        method: method,
        data: query,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", app.config.token);
        },
        success: function (d) {

            callback(null, d);
        }, error: function (e) {
            tratError(e, callback);
        }
    });
}

function tratError(e, callb) {
    log(e);
    if (e.status == "401" || (e.responseText && JSON.parse(e.responseText).error && JSON.parse(e.responseText).error.message == "401")) {
        delCookie("token");
        redirect("./");
    } else if (e.status == "500") {
        alertError("Erro interno no servidor(500).", 1500);
        callb ? callb("Erro interno no servidor(500).") : "";
    } else if (e.status == "404") {
        alertError("Erro interno no servidor (404).", 1500);
        callb ? callb("Erro interno no servidor (404).") : "";
    } else if (e.status == "400") {
        alertError(JSON.parse(e.responseText).error.message, 5000);
        callb ? callb(JSON.parse(e.responseText).error.message) : "";
    } else {
        alertError("Servidor indisponí­vel, tente mais tarde.", 1500);
        callb ? callb("Servidor indisponí­vel, tente mais tarde.") : "";
    }
}

function alertError(msg, timeout) {
    msg = {
        title: "Aviso",
        content: msg,
        color: "#be5050",
        icon: "fas fa-exclamation-triangle"
    }
    if (timeout)
        msg.timeout = timeout
    $.smallBox(msg);
}

function alertSuccess(msg, timeout) {
    msg = {
        title: "Sucesso",
        content: msg,
        color: "#58c15c",
        icon: "far fa-thumbs-up"
    }
    if (timeout)
        msg.timeout = timeout
    $.smallBox(msg);
}

function alertWarning(msg, timeout) {
    msg = {
        title: "Aviso",
        content: msg,
        color: "#FFA500",
        icon: "fas fa-exclamation"
    }
    if (timeout)
        msg.timeout = timeout
    $.smallBox(msg)
}

$.fn.extend({

    //pass the options variable to the function
    jarvismenu: function (options) {

        var defaults = {
            accordion: 'true',
            speed: 200,
            closedSign: '[+]',
            openedSign: '[-]'
        },

            // Extend our default options with those provided.
            opts = $.extend(defaults, options),
            //Assign current element to variable, in this case is UL element
            $this = $(this);

        //add a mark [+] to a multilevel menu
        $this.find("li").each(function () {
            if ($(this).find("ul").length !== 0) {
                //add the multilevel sign next to the link
                $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

                //avoid jumping to the top of the page when the href is an #
                if ($(this).find("a:first").attr('href') == "#") {
                    $(this).find("a:first").click(function () {
                        return false;
                    });
                }
            }
        });

        //open active level
        $this.find("li.active").each(function () {
            $(this).parents("ul").slideDown(opts.speed);
            $(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
            $(this).parents("ul").parent("li").addClass("open");
        });

        $this.find("li a").click(function () {

            if ($(this).parent().find("ul").length !== 0) {

                if (opts.accordion) {
                    //Do nothing when the list is open
                    if (!$(this).parent().find("ul").is(':visible')) {
                        parents = $(this).parent().parents("ul");
                        visible = $this.find("ul:visible");
                        visible.each(function (visibleIndex) {
                            var close = true;
                            parents.each(function (parentIndex) {
                                if (parents[parentIndex] == visible[visibleIndex]) {
                                    close = false;
                                    return false;
                                }
                            });
                            if (close) {
                                if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                    $(visible[visibleIndex]).slideUp(opts.speed, function () {
                                        $(this).parent("li").find("b:first").html(opts.closedSign);
                                        $(this).parent("li").removeClass("open");
                                    });

                                }
                            }
                        });
                    }
                }// end if
                if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
                    $(this).parent().find("ul:first").slideUp(opts.speed, function () {
                        $(this).parent("li").removeClass("open");
                        $(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
                    });

                } else {
                    $(this).parent().find("ul:first").slideDown(opts.speed, function () {
                        /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                        $(this).parent("li").addClass("open");
                        $(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
                    });
                } // end else
            } // end if
        });
    } // end function
});
/* ~ END: CUSTOM MENU PLUGIN */



// buscar empresas para setar ao incluir
function buscarExterno(apiPath, fieldID) {

    var args = arguments;
    requestServer({}, "GET", apiPath, function (err, result) {
        // verifico se o resultado não é nulo, maior que zero e um array
        if (result && result.length > 0 && Array.isArray(result)) {
            var select = document.getElementById(fieldID);

            for (var i = 0; i < result.length; i++) {
                var opt = result[i];
                var el = document.createElement("option");

                for (var j = 2; j < args.length; j++) {
                    el.innerHTML += opt[args[j]] + ((j == args.length - 1) ? "" : ", ");
                }
                el.value = opt.id;
                select.appendChild(el);
            }

        }

    });
};

function incluirLaudo() {
    $("#btn_incluirLaudo").click();

};


function deleteAllExplorer(url, objArray, callback) {
    var AsyncCount = 0;
    if (objArray && objArray.length > 0) {
        objArray.each(function (item) {
            requestServer({}, "delete", url + "/" + item.id, function (a, b) {
                AsyncCount++;
                if (objArray.length <= AsyncCount) {
                    if (callback) callback(a, b);
                }
            });
        });
    } else {
        if (callback) callback();
    }

}

function setFocusLooping() {
    var form = ".modal";
    $(form).each(function () {
        var a = 1;
        var formID = "#" + this.id;
        $(formID + " input[disabled!='disabled'], " + formID + " textarea[disabled!='disabled'], " + formID + " select[disabled!='disabled'], " + formID + " .modal-footer button").each(function () {
            $(this).attr("tabindex", ++a);
        });
        $(formID + " [tabindex='" + a + "']").attr("tabindex", "9998");
        $(this).append('<div class="focusguard0" tabindex="1"></div>\
        <div class="focusguard1" tabindex="9999"></div>');
    });
    $(form).on("shown.bs.modal", function () {
        var formID = "#" + this.id;
        $(formID + " [tabindex='2']").focus();
        $(formID + " [tabindex='9999']").focus(function () {
            $(formID + " [tabindex='2']").focus();
        });
        $(formID + " [tabindex=1]").focus(function () {
            $(formID + " [tabindex='9998']").focus();
        });
    });
};


//Destacar campos de preenchimento obrigatorio
function showRequired() {
    $(".modal").on("show.bs.modal", function () {
        $("[required]").css("background-color", "#FFFFFF");
    });
    $("[required]").change(function () {
        $("[required]").each(function () {
            if ($(this).val() && $(this).val() != "") {
                $(this).css("background-color", "#FFFFFF");
            }
        });
    });
    $("button").click(function () {
        var bool = false;
        if ($(this).html().indexOf("Salvar") >= 0) {
            $(".modal.in [required]").each(function () {
                if (!$(this).val() || $(this).val() == "") {
                    bool = true;
                    $(this).css("background-color", "#FFDDDD");
                }
            });
            $(".modal.in [name='CPF']").each(function () {
                if ($(this).val() != "" && !(is_cpf($(this).val()))) {
                    bool = true;
                    $(this).css("background-color", "#FFDDDD");
                    $(this).popover('destroy');
                    $(this).popover({ content: "CPF inválido!", offset: "0", placement: "top" }).popover("show");
                    setTimeout(() => {
                        $(this).popover('destroy');
                    }, 2000);
                }
            });
            $(".modal.in [name='CNPJ']").each(function () {
                if ($(this).val() != "" && !(is_cnpj($(this).val()))) {
                    bool = true;
                    $(this).css("background-color", "#FFDDDD");
                    $(this).popover('destroy');
                    $(this).popover({ content: "CNPJ inválido!", offset: "0", placement: "top" }).popover("show");
                    setTimeout(() => {
                        $(this).popover('destroy');
                    }, 2000);
                }
            });
            $(".modal.in [name='CEP']").each(function () {
                if ($(this).val() != "" && !(is_cep($(this).val()))) {
                    bool = true;
                    $(this).css("background-color", "#FFDDDD");
                    $(this).popover('destroy');
                    $(this).popover({ content: "CEP inválido!", offset: "0", placement: "top" }).popover("show");
                    setTimeout(() => {
                        $(this).popover('destroy');
                    }, 2000);
                }
            });
        };
        if (bool) {
            $.smallBox({
                title: "Aviso",
                content: "Preencha os campos obrigatórios corretamente.",
                color: "#be5050",
                icon: "fa fa-exclamation-triangle",
                timeout: 2000
            });
        };
    });
};

//Checar se tem campos nao preenchidos
function hasUnfilledRequired() {
    var bool = false;
    $(".modal.in [name='CPF']").each(function () {
        if (!(is_cpf($(this).val()))) bool = true;
    });
    $(".modal.in [name='CNPJ']").each(function () {
        if (!(is_cnpj($(this).val()))) bool = true;
    });
    $(".modal.in [name='CEP']").each(function () {
        if (!(is_cep($(this).val()))) bool = true;
    });

    $(".modal.in [required]").each(function () {
        if (!$(this).val() || $(this).val() == "") bool = true;
    });
    return bool;
};

function is_cpf(c) {
    if ((c = c.replace(/[^\d]/g, "")).length != 11)
        return false
    if (c == "00000000000")
        return false;
    var r;
    var s = 0;
    for (i = 1; i <= 9; i++)
        s = s + parseInt(c[i - 1]) * (11 - i);
    r = (s * 10) % 11;
    if ((r == 10) || (r == 11))
        r = 0;
    if (r != parseInt(c[9]))
        return false;
    s = 0;
    for (i = 1; i <= 10; i++)
        s = s + parseInt(c[i - 1]) * (12 - i);
    r = (s * 10) % 11;
    if ((r == 10) || (r == 11))
        r = 0;
    if (r != parseInt(c[10]))
        return false;
    return true;
}
function is_cnpj(c) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    if ((c = c.replace(/[^\d]/g, "").split("")).length != 14)
        return false;
    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;
    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;
    return true;
}
function is_cep(c) {
    if ((c = c.replace(/[^\d]/g, "")).length != 8)
        return false
    if (c == "00000000")
        return false;
    return true;
}


// Gmail Authentication
var clientId = '203330746681-nv876srqbg4i5krt8vm7dk2jdu8m247g.apps.googleusercontent.com';
var apiKey = 'AIzaSyALgS_oz3DT8ITkFtB0-l6hGO_6dUpVo0E';
var scopes =
    'https://www.googleapis.com/auth/gmail.compose';
function handleClientLoad(cb) {

    gapi.client.setApiKey(apiKey);
    window.setTimeout(function () {
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true
        }, function (authResult) {
            if (authResult && !authResult.error) {
                gapi.client.load('gmail', 'v1', function () {
                    !cb || cb(true)
                });;
            } else {
                !cb || cb(false)
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false
                }, function (authResult) {
                    if (authResult && !authResult.error) {
                        gapi.client.load('gmail', 'v1', function () {
                        });;
                    } else {
                    }
                });
                return false;
            }
        });
    }, 1);
}


function sendEmail(recipient, subject, body, filesInfo, callback) {
    function attachments() {
        var text = '';
        filesInfo.forEach(function (file) {
            text += [
                '--a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a\r\n',
                'Content-Type: ' + file.contenttype + '; name="' + file.filename + '"\r\n',
                'MIME-Version: 1.0\r\n',
                'Content-Transfer-Encoding: base64\r\n',
                'Content-Disposition: attachment;\r\n\r\n',

                file.base64_file, '\r\n\r\n',
            ].join('')
        })

        return text;
    }
    var mail = [
        [
            'Content-Type: multipart/mixed; boundary="a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a"\r\n',
            'MIME-Version: 1.0\r\n',
            'To: ' + recipient + "\r\n",
            'Subject: ' + subject + '\r\n\r\n',

            '--a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a\r\n',
            'Content-Type: text/plain; charset="UTF-8"\r\n',
            'MIME-Version: 1.0\r\n\r\n',

            body + '\r\n\r\n'

        ].join(''),
        attachments(),
        '--a3f166a86b56ff6c37755292d690675717ea3cd9de81228ec2b76ed4a15d6d1a--'
    ].join('');

    sendMessage(mail, function (response) {
        callback(response.error)
    });
    return false;
}
function sendMessage(message, callback) {
    var email = message;
    var sendRequest = gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': window.btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_')

        }
    });
    return sendRequest.execute(callback);
}

function hasInvalidDates() {
    if (!($(".modal input[type='datetime-local']").toArray().map(item => item.value).every(item => moment(item)._isValid))) {
        alertError("Insira datas válidas", 1500);
        return true;
    } else
        return false;
}
