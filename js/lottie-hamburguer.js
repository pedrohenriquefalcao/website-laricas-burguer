document.addEventListener('DOMContentLoaded', () => {
  const recipiente = document.getElementById('recipiente-lottie-hamburguer');
  if (!recipiente) return;

  const imagemReserva = recipiente.querySelector('.ilustracao-hamburguer-reserva');

  if (typeof lottie === 'undefined') {
    return;
  }

  fetch('assets/animations/burgerAnimation.json')
    .then(resposta => {
      if (!resposta.ok) throw new Error('Erro ao carregar animação');
      return resposta.json();
    })
    .then(animData => {
      const animacao = lottie.loadAnimation({
        container: recipiente,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animData
      });

      animacao.addEventListener('DOMLoaded', () => {
        if (imagemReserva) imagemReserva.style.display = 'none';
      });
    })
    .catch(() => {
      const animacao = lottie.loadAnimation({
        container: recipiente,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/burgerAnimation.json'
      });

      animacao.addEventListener('DOMLoaded', () => {
        if (imagemReserva) imagemReserva.style.display = 'none';
      });
    });
});