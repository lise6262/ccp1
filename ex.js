$(document).ready(function() {

    var usersObj
    if (!localStorage.getItem('compte')) {
        usersObj = {
            "users": []
        }
    } else {
        usersObj = JSON.parse(localStorage.getItem('compte'))
    }

   


    $('#inscription').submit(register)

    $('#connexion').submit(loginPseudo)

    $('#connexionMail').submit(login)

   $("#mdpIns").on("keyup" ,function(e){
        let valid = true ;
        let maRegex = new RegExp(
           / ^(?=.*[A-Za-z])(?=.*\d)(?=.*[\&\#\-\_\+\=\@\{\}\[\]\(\)])[A-Za-z\d\&\#\-\_\+\=\@\{\}\[\]\(\)]{6,}$/
            )
            
          if ($(this).val() != "" && $(this).val() != valid) {
              let taille = $("#taille-mdp");
              taille.children().remove();
              taille.text("");
              let car = $("#car-mdp");
              car.children().remove();
              car.text("");
              let digit = $("#chiffre-mdp");
              digit.children().remove();
              digit.text("");
              //au moins 6 caractères
              if (/^(.{6,})/.test($(this).val())) {
                  taille.append('<i class="text-decoration-line-through">Au moins 6 caractères.</i> (' + $(this).val().length + '/6)');
                  valid = true
              } else {
                  taille.append(' Au moins 6 caractères. (' + $(this).val().length + '/6)');
                  valid = false;
              }
              //Vérification 1 chiffre
              if (/^(?=.*\d)/.test($(this).val())) {
                  digit.append('<i class="text-decoration-line-through">Au moins 1 chiffre.</i>');
                  valid = true
              } else {
                  digit.append(' Au moins 1 chiffre.');
                  valid = false
                 
                  return false;
              }
              //Vérification caractere
                   if (/[""\/@.?!§,$:;*]+/.test($(this).val())) {
                  car.append('<i class="text-decoration-line-through">Au moins 1 caractère spéciale.</i>');
                  valid = true
              } else {
                  car.append(' Au moins 1 caractère spéciale.');
                 valid = false
                  return false;
              }
          }else {
              alert('le mot de passe ne correspond pas au critères demandés ')
              valid = false;
          }
      });

    function register(event) {
        event.preventDefault()
        var mailIns = $("#mailIns").val()
        var mdpIns = $("#mdpIns").val()
        var pseudoIns = $("#pseudoIns").val()
        var photo = $("#photo").val()
        var id = uuidv4()
        let valid = true ;
        
        let maRegex = new RegExp(
            / ^(?=.*[A-Za-z])(?=.*\d)(?=.*[\&\#\-\_\+\=\@\{\}\[\]\(\)])[A-Za-z\d\&\#\-\_\+\=\@\{\}\[\]\(\)]{6,}/
        )   
    
          if (/^(.{6,})/.test($("#mdpIns").val()) && /^(?=.*\d)/.test($("#mdpIns").val()) && /[""\/@.?!§,$:;*]+/.test($("#mdpIns").val()) ){
              console.log("mot de passe correct")
          }else{
              alert('le mot de passe est incorrect')
              return false;
          }
        if (mdpIns == "" || pseudoIns == "" || mailIns == "") {
            alert("Tout les champs ne sont pas remplis")
        
        }else{
            
            let pseudoExist = false
            let x
            for (x in usersObj.users) {
                let userActual = usersObj.users[x]
                if (userActual.pseudo == pseudoIns) {
                    pseudoExist = true
                    break;
                }
            }
            if (pseudoExist) {
                alert("le pseudo existe déja")
            } else {
                let mailExist = false
                let y
                for (y in usersObj.users) {
                    let userActual = usersObj.users[x]
                    if (userActual.mail == mailIns) {
                        mailExist = true
                        break;
                    } 
                }if (mailExist) {
                        alert("l'adresse mail existe déja")
                    }else {
                      var user = {
                        "mail" : mailIns,
                        "pseudo": pseudoIns,
                        "mdp": mdpIns,
                        "id": id ,
                        "photo" : photo
                    }
                    alert("Votre compte est enregistré , vous pouvez vous connecter")
                usersObj.users.push(user);
                registerUsers()
               
                $('#mailIns').val("")
                $('#mdpIns').val("")
                $('#pseudoIns').val("")
                $("#connexionEmail").show()
                $("#forminscription").hide()
               
                
                }
            }
        }
    }
    function login(event) {
        event.preventDefault()
        var email = $('#mail').val()
        var mdp = $('#mdp').val()

        if (mdp == "" || email == "") {
            alert("Veuillez remplir tout les champs")
        } else {
            let connected = false
            let x
            for (x in usersObj.users) {
                var userActual = usersObj.users[x]
                if (userActual.mail == email) {
                    if (userActual.mdp == mdp) {
                        connected = true
                        sessionStorage.setItem("session", JSON.stringify(userActual))
                        break;
                    }
                }
            }
            if (connected) {
                alert("Bienvenue & Bonne écoute")
                $("#form").hide()

            } else {
                alert("Identifiant ou mot de passe incorrect")
            }
        }        
    }
    function loginPseudo (event) {
        event.preventDefault()
        var pseudo = $('#pseudo').val()
        var mdp = $('#mdppseudo').val()

        if (mdp == "" || pseudo == "") {
            alert("Veuillez remplir tout les champs")
        } else {
            let connected = false
            let x
            for (x in usersObj.users) {
                var userActual = usersObj.users[x]
                if (userActual.pseudo == pseudo) {
                    if (userActual.mdp == mdp) {
                        connected = true
                        sessionStorage.setItem("session", JSON.stringify(userActual))
                        break;
                    }
                }
            }
            if (connected) {
                alert("Bienvenue & Bonne écoute")
                $("#form").hide()

            } else {
                alert("Identifiant ou mot de passe incorrect")
            }
        }        
    }
    function registerUsers() {
        localStorage.setItem('compte', JSON.stringify(usersObj))
    }
       
        function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
})//ready
 $("#refreshIns").click(function (e){
        e.preventDefault()
        var mailIns = $("#mailIns").val("");
        var mdpIns = $("#mdpIns").val("");
        var pseudoIns = $("#pseudoIns").val("");
        var photo = $("#photo").val("");

    });
    //bouton rafraichir 
    $("#refresh").click(function (e){
        e.preventDefault()
        var mailIns = $("#mail").val("");
        var mdpIns = $("#mdp").val("");
        var pseudoIns = $("#pseudo").val("");
    });
// cache le formulaire 
    function displayConnexion(){
        $("#forminscription").hide()      
    };
// cache formulaire et connexion
       function displayPage(){
        $("#form").hide()
        $("#connexionPseudo").hide()
        $("#connexionEmail").hide()
        $("#connexionEmail").hide()
    
    };
// afficher connexion par pseudo
    $("#btnIn2").click(function(e) {
        e.preventDefault()
       displayConnexion()
       $("#connexionPseudo").show()
       $("#connexionEmail").hide()

    });
// afficher le formulaire au bouton
    $("#btnIn3").click(function(e) {
        e.preventDefault()
        $("#forminscription").show()
        $("#connexionPseudo").hide()
        $("#connexionEmail").hide()
    });
// afficher le formulaire au bouton
    $("#btnIn").click(function(e) {
        e.preventDefault()
        $("#forminscription").show()
        $("#connexionEmail").hide()
        $("#connexionEmail").hide()
    });
//// afficher connexion par mail
    $("#mailConnexion").click(function (e){
        e.preventDefault()
        $("#connexionPseudo").hide()
        $("#connexionEmail").show()
        console.log("mail connexion click")
    });
//afficher pseudo connexion
    $("#pseudoConnexion").click(function (e){
        e.preventDefault()
        $("#connexionEmail").hide()
        $("#connexionPseudo").show()
        console.log("pseudo connexion click")
    });