var app = new Vue({
    el: "#app",
    data: {
        links: [
            { "name": "Home", "ativo": true},
            {"name": "Support"}
        ],
        linkAtivo: { "name": "Home", "ativo": true},
        domain: "VSF.GG",
        user: {"nickname" : null},
        logged: false,
        user_vendo: {"name" : ''},
        type: 0,
        avatar_vendo: "",
        recentes_users: [],
        loading_data: false,
        me: {"name" : ''},
    },
    mounted() {
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
                    this.logged = true
                    this.avatar_vendo = "https://opgg-static.akamaized.net/images/profile_icons/profileIcon"+ res.data.profileIconId + ".jpg"
                    this.recentes_users.push(res.data)
                    localStorage.recentes_users = JSON.stringify(this.recentes_users)
                    document.title = this.res.data.name + " VSF.GG"
                    this.loading_data = false
                }
                } else if(this.type == 1){
                    this.user_vendo = res.data;
                    this.logged = true
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
                 this.logged = false   
            }
            else{
                this.type = 0
                this.loading_data = true
                this.post("summoner/" + this.user.nickname)
            }
        },
        tryAgain(){
            this.logged = false
            this.user_vendo = {"name" : ''}
            this.loading_data = false
            this.user.nickname = ''
        },
        inicio(){
            this.logged = false
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
        }
    }

})

//aagit