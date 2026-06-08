import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5I7WEUOo4tlteBuaaHj7NcoU91JHSpek",
    authDomain: "barbearia-narciso.firebaseapp.com",
    projectId: "barbearia-narciso",
    storageBucket: "barbearia-narciso.firebasestorage.app",
    messagingSenderId: "484721302723",
    appId: "1:484721302723:web:44b13501687e26c2499676"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

if (listaServicos) {
    servicos.forEach(servico => {
        const div = document.createElement("div");
        div.className = "card-servico";
        
        div.innerHTML = `
            <img src="${servico.imagem}" alt="${servico.nome}">
            <h3>${servico.nome}</h3>
            <p class="descricao-card">${servico.descricao}</p>
            <p class="preco">${servico.preco}</p>
        `;
        
        listaServicos.appendChild(div);
    });
}

const produtos = [
    {
        id: 1,
        nome: "Pomada Modeladora Matte",
        descricao: "Fixação forte e efeito seco para penteados duradouros.",
        preco: "R$ 45,00",
        imagem: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        nome: "Óleo Hidratante para Barba",
        descricao: "Fórmula com óleos essenciais para amaciar e perfumar a barba.",
        preco: "R$ 38,00",
        imagem: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        nome: "Shampoo Refrescante Ice",
        descricao: "Limpeza profunda com extrato de menta para o couro cabeludo.",
        preco: "R$ 32,00",
        imagem: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80"
    }
];

const vitrineProdutos = document.getElementById("vitrine-produtos");

if (vitrineProdutos) {
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
}

window.comprarProduto = async function(nomeProduto, precoProduto) {
    const nomeCliente = prompt(`Está a comprar: ${nomeProduto} por ${precoProduto}.\n\nPor favor, digite o seu nome completo para registar o pedido:`);
    
    if (nomeCliente && nomeCliente.trim() !== "") {
        const novoPedido = {
            cliente: nomeCliente,
            produto: nomeProduto,
            valor: precoProduto,
            dataPedido: new Date().toLocaleDateString('pt-PT')
        };

        try {
            await addDoc(collection(db, "pedidos_loja"), novoPedido);
            alert(`Pedido confirmado na nuvem, ${nomeCliente}! O item foi reservado.`);
        } catch (erro) {
            alert("Ocorreu um erro ao comunicar com o servidor.");
        }
    } else {
        alert("Compra cancelada. É necessário informar um nome.");
    }
}

const formAgendamento = document.getElementById("form-agendamento");

if (formAgendamento) {
    formAgendamento.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const servicoElement = document.getElementById("servico-escolhido");
        const servico = servicoElement.options[servicoElement.selectedIndex].text;
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

        try {
            await addDoc(collection(db, "agendamentos"), novoAgendamento);
            
            if (typeof emailjs !== 'undefined') {
                const parametrosEmail = {
                    nome_cliente: nome,
                    data_agendamento: dataEscolhida,
                    hora_agendamento: hora,
                    servico: servico
                };
                emailjs.send("service_04c6d6n", "template_bzkwmpp", parametrosEmail).catch(() => {});
            }

            alert(`Tudo certo, ${nome}! O seu agendamento foi guardado na nuvem com sucesso.`);
            this.reset();
        } catch (erro) {
            alert("Ocorreu um erro ao comunicar com o servidor.");
        }
    });
}
