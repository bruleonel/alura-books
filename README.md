# Anotações

## Explicando o código:

fetch()
Usado para acessar Promisses

then()
Serve como "então".

try() "tentar"

catch() "pegar"

Para tentar explicar esses métodos, imagine que Você está tentando agendar uma consulta, então você vai "try()" marcar a consulta, a atendente vai procurar um horário, então ela gera uma "prommisse" de consulta. nesse caso não há horário disponível então sua promisse foi rejected, o catch será seu aviso (retorno) que aquele horário está indisponível.

<img src="/img/try.png">

### Código 1

````ruby
const consultaCep = fetch('https://viacep.com.br/ws/81250615/json/')
    .then(resposta => resposta.json())
    .then(r => {
        if (r.erro) {
            throw Error('Esse cep não existe')
        } else {
            console.log(r);
        }
    })
    .catch(erro => console.log(erro))
    .finally(mensagem => console.log('Processamento concluído!'))

console.log(consultaCep );
````
then()
o then() vai executar uma função logo depois que sua tarefa terminar

imagina que você está esperando um download baixar, e quando ele terminar o arquivo ja vai abrir direto!

async await
o async vai dizer que sua tarefa é assíncrona e precisa de mais tempo para terminar

imagina que o download demora um tempo então enquanto ele está sendo feito você pode fazer outras coisas..

o await vai dizer que você deve esperar a tarefa ser concluida para continuar

imagina uma atualização do windows que você nao pode usar o pc até que o download seja concluido.

Então quando eu devo usar then() no lugar de async await?

Primeiramente que o then() não é uma boa prática para seu projeto, ele quebra bastante a legibilidade do código e também quebra a linearidade das tarefas no processador do celular, então o ideal é usa-lo raramente. Já o async/await é mais natural para o processador e mais facil de outros devs entenderem a lógica do seu código.

Uai, então porque vocês ensinam o then()?

É porque inicialmente ele é muuito simples de entender, então para introduzir a dinamica de funções sequenciais ele é ideal didaticamente.

Então a dica que eu te dou é: Se dá pra trocar o then() por um async/await faça, você estará sempre ganhando.

Mais pra frente as coisas vão ficar mais complexas com Estados, que é quando o async/await se sobresai em relação ao then()
### Código 2

````ruby
async function buscaEndereco(cep) {
    var mensagemErro = documen.getElementById('erro')
    mensagemErro.innerHTML = "";
    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('CEP não existente')
        }
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

let cep = document.getElementById('cep')
cep.addEventListener('focus', () => buscaEndereco(cep.value));
````

Podemos destrinchar o fluxo de execução de tarefas em JavaScript em três partes: Event Loop, Call Stack e Task Queue. O Event Loop é um ciclo que monitora e executa as ações que mandamos para o JavaScript. O processo de leitura do código só é finalizado quando não existem mais ações a serem executadas. A call stack é um mecanismo que organiza como irá funcionar o script quando existem muitas funções: qual função está sendo executada, quais estão sendo chamadas dentro de alguma função, etc. Por fim, a task queue é a fila de tarefas assíncronas. Se algo precisa ocorrer em segundo plano ou mais tarde, é nessa fila que ele será adicionado e executado mais tarde.

API é uma sigla que significa Interface de Programação de Aplicações. Uma API é um mecanismo que permite que duas partes de um software se comuniquem usando um conjunto de definições e protocolos. Sua arquitetura geralmente é explicada em termos de cliente e servidor. A aplicação que envia a solicitação é chamada de cliente e a aplicação que envia a resposta é chamada de servidor.

<img src="/img/aula2-img2.png" alt="">


## Arrow Functions
Dê uma olhada na estrutura do nosso código dentro do primeiro método .then dessa requisição: .then(resposta => resposta.json()). O conteúdo que está ali presente é uma função, mas construída de uma maneira diferente se torna uma arrow function. A versão ES6 do ECMAScript trouxe uma nova forma mais sucinta de trabalhar com funções chamada de Arrow Functions, por causa da sintaxe que lembra uma flecha: () =>.

Em uma função tradicional, caso você crie uma variável dentro dela, seu contexto é referente a função onde ela está. Para entender melhor: se você usar a palavra chave “.this”, você está se referindo a essa função em si.

Já em uma arrow function temos um contexto externo. Por exemplo, se essa arrow function for criada dentro de outra função seu contexto será aquela função que ela está dentro. Caso a função for aplicada fora de outra função, seu contexto será global, o código inteiro.

Quer aprender mais sobre esse termo? O nosso parceiro Marco Bruno te ensina em seu vídeo:


## Retornos de requisições
Quando estamos realizando uma requisição para a API, estamos trocando mensagens HTTP’s. HTTP é um protocolo, uma forma de conversa entre duas máquinas, que permite transferir hiper-texto de um lado a outro. Daí o nome Hyper Text Transport Protocol.

Uma requisição é composta de uma request (solicitação) e uma response (resposta). Request e Response são dois tipos de mensagem diferentes quando falamos de HTTP. A especificação HTTP diz exatamente o que podemos colocar dentro de cada um destes tipos de mensagem para que todos que "falem" o idioma HTTP consigam trocar informações corretamente.

Em uma response é retornado um response code (código de resposta) e um motivo, que dá significado ao código. A estrutura padrão desse código tem três dígitos, sendo o primeiro referente a classificação dele. Elas são:

1XX: Informativo – a solicitação foi aceita ou está em andamento;
2XX: Confirmação – a solicitação foi concluída ou entendida;
3XX: Redirecionamento – faltou alguma coisa na solicitação;
4XX: Erro do cliente – houve um erro na solicitação;
5XX: Erro no servidor – houve uma falha no servidor durante a solicitação.
Durante essa aula nós conhecemos um deles: quando consultado um CEP de formato inválido na API do ViaCEP ela nos retornará o código 400 (Bad Request).

Caso você queira saber mais sobre os tipos de código de resposta do protocolo HTTP recomendo a aplicação HTTP Cat que demonstra de forma descontraída as diferentes categorias que podemos encontrar. Para entender melhor sobre o funcionamento das requisições, temos o curso “HTTP: Entendendo a web por baixo dos panos” do instrutor Fábio Pimentel.

