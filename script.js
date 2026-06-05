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
    const dataEscolhida = document.getElementById("data").value;
    const dataAtual = new Date().toISOString().split("T")[0];
    
    if (dataEscolhida < dataAtual) {
        alert("Erro: Não é possível realizar um agendamento numa data que já passou. Por favor, escolha outra data.");
        return;
    }

    alert(`Tudo certo, ${nome}! O seu agendamento foi recebido com sucesso.`);
    this.reset();
});