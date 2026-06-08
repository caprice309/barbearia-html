const servicos = [
    {
        nome: "Corte Clássico",
        descricao: "Corte tradicional na tesoura ou máquina, focado na simetria e com um acabamento impecável.",
        preco: "R$ 35,00",
        imagem: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Corte Degradê",
        descricao: "Fade moderno e estiloso, com transição perfeita e opções de navalhado ou máquina zero.",
        preco: "R$ 45,00",
        imagem: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Aparar Barba (Toalha Quente)",
        descricao: "Alinhamento perfeito da barba utilizando o método tradicional de toalha quente e massagem facial.",
        preco: "R$ 30,00",
        imagem: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&q=80"
    },
    {
        nome: "Combo (Cabelo + Barba)",
        descricao: "O pacote completo para um visual renovado. Inclui corte de cabelo à escolha e serviço de barba VIP.",
        preco: "R$ 65,00",
        imagem: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80"
    }
];

const listaServicos = document.getElementById("lista-servicos");

servicos.forEach(servico => {
    const div = document.createElement("div");
    div.className = "card-servico";
    
    div.innerHTML = `
        <img src="${servico.imagem}" alt="Foto de ${servico.nome}">
        <h3>${servico.nome}</h3>
        <p class="descricao-card">${servico.descricao}</p>
        <p class="preco">${servico.preco}</p>
    `;
    
    listaServicos.appendChild(div);
});

document.getElementById("form-agendamento").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const servico = document.getElementById("servico-escolhido").options[document.getElementById("servico-escolhido").selectedIndex].text;
    const dataEscolhida = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    const dataAtual = new Date().toISOString().split("T")[0];
    
    if (dataEscolhida < dataAtual) {
        alert("Erro: Não é possível realizar um agendamento numa data que já passou.");
        return;
    }

    const dataObjeto = new Date(dataEscolhida + "T00:00:00");
    const diaDaSemana = dataObjeto.getDay();

    if (diaDaSemana === 1) { 
        alert("Atenção: A nossa barbearia está fechada às segundas-feiras para descanso da equipe. Por favor, escolha outro dia!");
        return;
    }

    if (hora < "10:00" || hora > "18:00") {
        alert("Atenção: O nosso horário de atendimento é das 10:00 às 18:00. Por favor, escolha um horário válido.");
        return;
    }

    const novoAgendamento = {
        nome: nome,
        telefone: telefone,
        servico: servico,
        data: dataEscolhida,
        hora: hora
    };

    let listaAgendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    
    listaAgendamentos.push(novoAgendamento);
    
    localStorage.setItem("agendamentos", JSON.stringify(listaAgendamentos));

    alert(`Tudo certo, ${nome}! O seu agendamento foi recebido com sucesso.`);

    const parametrosEmail = {
        nome_cliente: nome,
        data_agendamento: dataEscolhida,
        hora_agendamento: hora,
        servico: servico
    };

    emailjs.send("service_04c6d6n", "template_bzkwmpp", parametrosEmail)
        .then(function(resposta) {
            console.log('Email enviado com sucesso!', resposta.status, resposta.text);
        }, function(erro) {
            console.log('Falha ao enviar o email...', erro);
        });

    this.reset();
});


const produtos = [
    {
        id: 1,
        nome: "Pomada Modeladora Matte",
        descricao: "Fixação forte e efeito seco para penteados duradouros.",
        preco: "R$ 45,00",
        imagem: "https://s2-oglobo.glbimg.com/lt8fVQkT8UYqQdD3_3nUqlQFCZ4=/0x0:5148x3607/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/3/2/T9XTEVTbyJxMzcumoh2Q/close-up-shot-body-cream-with-plain-background.jpg"
    },
    {
        id: 2,
        nome: "Óleo Hidratante para Barba",
        descricao: "Fórmula com óleos essenciais para amaciar e perfumar a barba.",
        preco: "R$ 38,00",
        imagem: "https://m.media-amazon.com/images/I/61OzCRoIJyL._AC_SL1500_.jpg"
    },
    {
        id: 3,
        nome: "Shampoo Refrescante Ice",
        descricao: "Limpeza profunda com extrato de menta para o couro cabeludo.",
        preco: "R$ 32,00",
        imagem: "https://knut.com.br/cdn/shop/files/0ef4102ddffb8e57a1f4e41a9906a806.jpg?v=1773347690&width=823"
    }
];

const vitrineProdutos = document.getElementById("vitrine-produtos");
produtos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "card-servico";
    
    div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p class="descricao-card">${produto.descricao}</p>
        <p class="preco">${produto.preco}</p>
        <button class="botao-submit" onclick="comprarProduto('${produto.nome}', '${produto.preco}')" style="margin-top: 15px; padding: 10px;">Comprar Agora</button>
    `;
    
    vitrineProdutos.appendChild(div);
});

function comprarProduto(nomeProduto, precoProduto) {
    const nomeCliente = prompt(`Você está comprando: ${nomeProduto} por ${precoProduto}.\n\nPor favor, digite seu nome completo para registrar o pedido:`);
    
    if (nomeCliente && nomeCliente.trim() !== "") {
        
        const novoPedido = {
            cliente: nomeCliente,
            produto: nomeProduto,
            valor: precoProduto,
            dataPedido: new Date().toLocaleDateString('pt-PT')
        };

        let listaPedidos = JSON.parse(localStorage.getItem("pedidos_loja")) || [];
        listaPedidos.push(novoPedido);
        localStorage.setItem("pedidos_loja", JSON.stringify(listaPedidos));

        alert(`Pedido confirmado, ${nomeCliente}! O item foi reservado e você pode retirá-lo e pagar na sua próxima visita à barbearia.`);
    } else {
        alert("Compra cancelada. É necessário informar um nome para realizar o pedido.");
    }
}
