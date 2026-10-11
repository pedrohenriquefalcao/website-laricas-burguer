document.addEventListener('DOMContentLoaded', () => {
  inicializarMenuMobile();
  inicializarNavegacaoAtiva();
  inicializarCarrosselTime();
  inicializarScrollSuave();
});

function inicializarMenuMobile() {
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const menuNavegacao = document.getElementById('navegacao-menu');

  if (!botaoMenuMobile || !menuNavegacao) return;

  botaoMenuMobile.addEventListener('click', () => {
    menuNavegacao.classList.toggle('aberto');
    const estaAberto = menuNavegacao.classList.contains('aberto');
    botaoMenuMobile.setAttribute('aria-expanded', estaAberto);
  });

  const linksMenu = menuNavegacao.querySelectorAll('.navegacao-item');
  linksMenu.forEach(link => {
    link.addEventListener('click', () => {
      menuNavegacao.classList.remove('aberto');
      botaoMenuMobile.setAttribute('aria-expanded', false);
    });
  });
}

function inicializarNavegacaoAtiva() {
  const linksNavbar = document.querySelectorAll('.navegacao-barra .navegacao-item');
  const secoesPrincipais = [
    { id: 'secao-inicio', seletorLink: 'a[href="#secao-inicio"]' },
    { id: 'secao-cultura', seletorLink: 'a[href="#secao-cultura"]' },
    { id: 'secao-nosso-time', seletorLink: 'a[href="#secao-nosso-time"]' },
    { id: 'secao-cardapio', seletorLink: 'a[href="#secao-cardapio"]' }
  ];

  linksNavbar.forEach(link => {
    link.addEventListener('click', () => {
      linksNavbar.forEach(l => l.classList.remove('ativo'));
      link.classList.add('ativo');
    });
  });

  const observerNavbar = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idSecao = entry.target.id;
          linksNavbar.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${idSecao}`) {
              link.classList.add('ativo');
            } else {
              link.classList.remove('ativo');
            }
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.35,
      rootMargin: '-72px 0px 0px 0px'
    }
  );

  secoesPrincipais.forEach(item => {
    const elemento = document.getElementById(item.id);
    if (elemento) observerNavbar.observe(elemento);
  });
}

function inicializarCarrosselTime() {
  const trilho = document.getElementById('carrossel-trilho-time');
  const botaoAnterior = document.getElementById('botao-carrossel-anterior');
  const botaoProximo = document.getElementById('botao-carrossel-proximo');
  const bolinhas = document.querySelectorAll('.bolinha-indicador');
  const totalPaginas = 4;
  let paginaAtual = 0;

  if (!trilho || !botaoAnterior || !botaoProximo) return;

  function irParaPagina(indice) {
    if (indice < 0) {
      paginaAtual = totalPaginas - 1;
    } else if (indice >= totalPaginas) {
      paginaAtual = 0;
    } else {
      paginaAtual = indice;
    }

    trilho.style.transform = `translateX(-${paginaAtual * 100}%)`;

    bolinhas.forEach((bolinha, idx) => {
      if (idx === paginaAtual) {
        bolinha.classList.add('ativo');
        bolinha.setAttribute('aria-current', 'true');
      } else {
        bolinha.classList.remove('ativo');
        bolinha.removeAttribute('aria-current');
      }
    });
  }

  botaoAnterior.addEventListener('click', () => {
    irParaPagina(paginaAtual - 1);
  });

  botaoProximo.addEventListener('click', () => {
    irParaPagina(paginaAtual + 1);
  });

  bolinhas.forEach(bolinha => {
    bolinha.addEventListener('click', () => {
      const indice = parseInt(bolinha.getAttribute('data-indice'), 10);
      irParaPagina(indice);
    });
  });

  let toqueInicioX = 0;
  let toqueFimX = 0;

  trilho.addEventListener('touchstart', (e) => {
    toqueInicioX = e.changedTouches[0].screenX;
  }, { passive: true });

  trilho.addEventListener('touchend', (e) => {
    toqueFimX = e.changedTouches[0].screenX;
    if (toqueInicioX - toqueFimX > 50) {
      irParaPagina(paginaAtual + 1);
    } else if (toqueFimX - toqueInicioX > 50) {
      irParaPagina(paginaAtual - 1);
    }
  }, { passive: true });
}

function inicializarScrollSuave() {
  const todosLinksAncora = document.querySelectorAll('a[href^="#"]');

  todosLinksAncora.forEach(link => {
    link.addEventListener('click', (evento) => {
      const idDestino = link.getAttribute('href');
      if (idDestino === '#' || !idDestino) return;

      const elementoAlvo = document.querySelector(idDestino);
      if (elementoAlvo) {
        evento.preventDefault();
        const alturaCabecalho = 72;
        const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: posicaoElemento - alturaCabecalho,
          behavior: 'smooth'
        });
      }
    });
  });
}
