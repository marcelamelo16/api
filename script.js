const url = "https://aapi.frankfurter.dev/v1/latest?base=USD&symbols=BRL";

async function obterCotacao() {
  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("HTTP error: " + resposta.status);
    }

    const dados = await resposta.json();

    if (!dados.rates || dados.rates.BRL === undefined) {
      throw new Error("Resposta inválida: campo rates.BRL não encontrado");
    }

    document.getElementById("json-container").innerHTML =
      "<pre>" + JSON.stringify(dados, null, 2) + "</pre>";

    const info = {
      moeda: "USD/BRL",
      data: new Date().toLocaleString("pt-BR"),
      preco_venda: dados.rates.BRL 
    };

    document.getElementById("dados-formatados").innerHTML = `
      <p><strong>Moeda:</strong> ${info.moeda}</p>
      <p><strong>Data:</strong> ${info.data}</p>
      <p><strong>Preço de Venda:</strong> R$ ${info.preco_venda.toFixed(2)}</p>
    `;
    
    document.getElementById("baixar").onclick = () => {
     
      const blob = new Blob([JSON.stringify(dados, null, 2)], {
        type: "application/json"
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cotacao.json"; 
      link.click(); 
    };

  } catch (erro) {
    document.getElementById("json-container").innerHTML =
      `<div class="erro">Erro ao carregar cotação: ${erro.message}</div>`;

    document.getElementById("dados-formatados").innerHTML =
      `<div class="erro">Dados indisponíveis</div>`;
  }
}

obterCotacao();