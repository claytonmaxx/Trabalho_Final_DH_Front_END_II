// A variável abaixo foi criada a fim de escutar o botão de atualização da página 
var inicializa = document.getElementById('exiba');
    inicializa.addEventListener('click', function()
        {
           iniciar()
        });

// A variável abaixo tem a função de extrair os dados do Local Storage via chave gatoData
var dataGato = localStorage.getItem('gatoData');

// A variável abaixo tem a função de transfomar em objeto os dados armazenados como string no Local Storage
var dataGatoParse = JSON.parse(dataGato);

//A variável abaixo irá selecionar o elemento Section do HTML para inserir as imagens da Lista proveniente do ENDPOINT da API.
var imagens  = document.getElementById('imagens');

//Essa variável tem a função de auxiliar a configuração da ID de cada botão das imagens da lista durante o forEach.
var butId = 0;

//Assim como a variável acima, essa irá auxiliar na função de guardar o ID do botão clicado bem como servir como parâmetro 
//para o índice do array do objeto no localStorage a ser excluido.
var idButDiscover = 0;

// Essa função é responsável por carregar os dados da lista do ENDPOINT da API no LOCALSTORAGE.
function iniciar()
    {
        fetch('https://api.thecatapi.com/v1/images/search?category_ids=4&limit=10')

            .then(function(resultado)
                {
                    return resultado.json();
                })

            .then(function(gatos)
                {
                    localStorage.setItem('gatoData', JSON.stringify(gatos));
                    location.reload();
                })
    }

// Essa função é a responsável por renderizar as imagens (URLs) do ENDPOINT da API armazenados no LOCALSTORAGE
//através do método forEach para percorrer o array de objetos e extrair somente a URL.
function renderizarImagens()
    {   
        dataGatoParse.forEach(function(gato)
            {   
                let butIdCount = butId++ ;
                    console.log(butIdCount);
                let div = document.createElement('div');
                    div.setAttribute("class", "divs2");
                    div.style.margin="30px";

                let img = document.createElement('img');
                    img.src = gato.url;
                    img.width = 400;

                let but = document.createElement('button');
                    but.setAttribute("id", butId);
                    but.classList.add('btn');
                
                let iconbut=document.createElement('img');
                    iconbut.setAttribute("src", "./assets/lixeira-aberta.png" );
                    iconbut.setAttribute("height", 25);
                    iconbut.setAttribute("width", 25);

                    div.appendChild(img);
                    div.appendChild(but);
                    but.appendChild(iconbut);
                    imagens.appendChild(div);
                    
                let btnEvent = document.getElementById(butId);
                    btnEvent.addEventListener('click', function()
                        {
                            let id = btnEvent.getAttribute("id");
                            idButDiscover = id;
                            excluirImagem();
                        });
            });
    }
    
//Essa função é chamada quando qualquer um dos botões de exclusão das imagens da lista é clicado. 
//Ela também é responsável por atualizar o localStorage e recarregar a página sem o item excluido.
function excluirImagem()
    {
        idButDiscover = idButDiscover - 1;
        dataGatoParse.splice(idButDiscover,1);
        localStorage.clear();
        localStorage.setItem('gatoData' , JSON.stringify(dataGatoParse));
        butId = 0;
        location.reload();
    }

renderizarImagens();



    
       

        
      


