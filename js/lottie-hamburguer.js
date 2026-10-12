document.addEventListener('DOMContentLoaded', () => {
  const recipiente = document.getElementById('recipiente-lottie-hamburguer');
  if (!recipiente) return;

  const imagemReserva = recipiente.querySelector('.ilustracao-hamburguer-reserva');

  const exibirImagemReserva = () => {
    if (imagemReserva) imagemReserva.style.display = 'block';
    recipiente.style.display = 'flex';
  };

  if (typeof lottie === 'undefined') {
    exibirImagemReserva();
    return;
  }

  const jaExibiuAnimacao = sessionStorage.getItem('animacaoHamburguerExibida');

  if (jaExibiuAnimacao) {
    exibirImagemReserva();
    return;
  }

  const iniciarLottie = (dadosOuCaminho, tipo) => {
    const config = {
      container: recipiente,
      renderer: 'svg',
      loop: false, 
      autoplay: true
    };

    if (tipo === 'data') {
      config.animationData = dadosOuCaminho;
    } else {
      config.path = dadosOuCaminho;
    }

    let animacao;

    try {
      animacao = lottie.loadAnimation(config);
    } catch {
      exibirImagemReserva();
      return;
    }

    animacao.setSpeed(0.9); 

    animacao.addEventListener('DOMLoaded', () => {
      if (imagemReserva) imagemReserva.style.display = 'none';
      sessionStorage.setItem('animacaoHamburguerExibida', 'true');
    });

    animacao.addEventListener('error', exibirImagemReserva);
  };

  fetch('../assets/animations/burgerAnimation.json')
    .then(resposta => {
      if (!resposta.ok) throw new Error('Erro ao carregar animação');
      return resposta.json();
    })
    .then(animData => {
      iniciarLottie(animData, 'data');
    })
    .catch(() => {
      iniciarLottie('../assets/animations/burgerAnimation.json', 'path');
    });
});
