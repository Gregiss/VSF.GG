var _app = new Vue({
    el: "#_app",
    data: {
        links: [
            { "name": "Home", "ativo": true},
            {"name": "Support"}
        ],
        linkAtivo: { "name": "Home", "ativo": true},
        domain: "VSF.GG",
        user: {"nickname" : null},
        login: {"login" : null, "senha": null},
        logged: false,
        user_vendo: {"name" : ''},
        type: 0,
        avatar_vendo: "",
        recentes_users: [],
        loading_data: false,
        me: {"name" : ''},
    },
    mounted() {
        if (this.logged) {
            this.links.push({"name": "Loggout", "ativo" : false})
        } else {
            this.links.push({"name":"Login", "ativo" : false})
        }
        document.title = this.domain
        this.recentes_users = localStorage.recentes_user ? JSON.parse(localStorage.recentes_users): []
        
    },
    methods: {
        acessLink(link) {
            for(var i = 0; i < this.links.length; i++){
                this.links.ativo = false
            }
            link.ativo = true
            const index = this.links.indexOf(link)
            this.links[index].ativo = true
            this.linkAtivo = this.links[index]
            document.title = "VSF.GG |" + " " + link.name
        },
        post(url){
            var region = "br1"
            let axiosConfig = {
                headers: {
                        "Access-Control-Allow-Origin": "*",
                        "crossDomain": "true"
                }
            }
            axios.get("http://vsf-gg.umbler.net/v1/" + url, axiosConfig)
            .then((res) => {
                if(this.type == 0){
                    if(res.data == ''){
                        this.user_vendo = "not_found"
                    } else{
                    this.user_vendo = res.data;
                    this.avatar_vendo = "https://opgg-static.akamaized.net/images/profile_icons/profileIcon"+ res.data.profileIconId + ".jpg"
                    this.recentes_users.push(res.data)
                    localStorage.recentes_users = JSON.stringify(this.recentes_users)
                    document.title = this.res.data.name + " VSF.GG"
                    this.loading_data = false
                }
                } else if(this.type == 1){
                    this.user_vendo = res.data;
                    this.avatar_vendo = "https://opgg-static.akamaized.net/images/profile_icons/profileIcon"+ res.data.profileIconId + ".jpg"
                    document.title = this.res.data.name + " VSF.GG"
                    this.loading_data = false
                }
            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            })
        },
        changeNickName(){
            if(this.user.nickname == '' || this.user.nickname == null)
            {
                return false
            }
            else{
                this.type = 0
                this.loading_data = true
                this.post("summoner/" + this.user.nickname)
            }
        },
        tryAgain(){
            this.user_vendo = {"name" : ''}
            this.loading_data = false
            this.user.nickname = ''
        },
        inicio(){
            this.user_vendo = {"name" : ''}
            this.loading_data = false
            this.user.nickname = ''
        },
        limparRecentes(){
            this.recentes_users = []
            this.loading_data = false
            localStorage.recentes_users = JSON.stringify(this.recentes_users)
            this.user.nickname = ''
        },
        acess(user){
            this.type = 1
            this.loading_data = true
            this.post("summoner/" + user.name)
        },
        entrar() {
            _this = this
            if (this.login.usuario && this.login.senha) {
                usuario = this.login.usuario;
                senha = this.login.senha;
                if (usuario && senha && usuario != '' && senha != "") {
                    if (!localStorage.checklogTime || localStorage.checklogTime < Date()) {
                        $.ajax({
                            type: "POST",
                            url: "/api/users/login",
                            timeout: 4000,
                            data: {
                                username: usuario,
                                password: senha
                            }
                        }).done(function (resultado) {
                            if (resultado) {
                                $.ajax({
                                    type: "GET",
                                    url: "/api/Users/" + resultado.userId + "?access_token=" + resultado.id
                                }).done(function (res) {
                                    if (res) {
                                        localStorage.setItem("userInfo", JSON.stringify(res));
                                    }
                                    localStorage.setItem("token", resultado.id, 1);
                                    localStorage.setItem("userId", resultado.userId, 1);
                                    _this.logged = true
                                    _this.links[2].name = "Loggout"
                                    _this.linkAtivo = _this.links[0]
                                })
                                $('input').val("");
                            } else if (resultado == "401") {
                                if (localStorage.checklog) {
                                    localStorage.checklog = parseInt(localStorage.checklog) + 1;
                                } else {
                                    localStorage.checklog = 1;
                                }
                                if (localStorage.checklog >= 10) {
                                    var d = new Date();
                                    d.setMinutes(d.getMinutes() + 15);
                                    localStorage.checklogTime = d;
                                    localStorage.removeItem("checklog");
                                } else {
                                    localStorage.removeItem("checklogTime");
                                }
                                // alertaErro("Usuário ou senha inválido!")
                            } else {
                                console.log(resultado);
                                // alertaErro("Oops...", "Ocorreu um erro tente mais tarde!", "error");
                            }
                        }).fail(function (err) {
                            if (err && err.status.toString() == "401") {
                                // alertaErro("Usuário ou senha inválido!")
                                console.log("erro1");
                                
                            } else {
                                // alertaErro("Oops...", "Ocorreu um erro ao conectar, tente mais tarde!", "error");
                                console.log("erro2");
                                
                            }
                        });
                    } else {
                        // alertaErro("Oops...", "Você está temporariamente bloqueado, aguarde 15min para efetuar o login.", "error");
                        console.log("erro3");
                        
                    }
                } else {
                    // alertaErro("Falta preencher campos", "error")
                    console.log("erro4")
                }
            }
        }
    }

})

//aagit