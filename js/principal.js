document.addEventListener('DOMContentLoaded', () => {
  inicializarMenuMobile();
  inicializarNavegacaoAtiva();
  inicializarCarrosselTime();
  inicializarScrollSuave();
  inicializarOcultarNavbar(); 
  inicializarAnimacoesRevelacao();
});

function inicializarAnimacoesRevelacao() {
  const elementos = document.querySelectorAll(
    '.banner-cultura-topo, .imagem-missao-container, .imagem-visao-container, .bloco-valores'
  );

  if (!elementos.length || !('IntersectionObserver' in window)) return;

  const alvos = new Map(); 

  elementos.forEach(elemento => {
    elemento.classList.add('revelacao-pendente');
    const observado = elemento.closest('.bloco-cultura-item') || elemento;
    alvos.set(observado, elemento);
  });

  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      alvos.get(entrada.target).classList.add('revelacao-visivel');
      observer.unobserve(entrada.target);
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  alvos.forEach((_, observado) => observador.observe(observado));

  setTimeout(() => {
    elementos.forEach(el => el.classList.add('revelacao-visivel'));
  }, 4000);
}

function inicializarOcultarNavbar() {
  const cabecalho = document.getElementById('cabecalho-topo');
  if (!cabecalho) return;

  let ultimoScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollAtual <= 0) {
      cabecalho.style.transform = 'translateY(0)';
      return;
    }

    if (scrollAtual > ultimoScroll) {
      cabecalho.style.transform = 'translateY(-100%)';
    } 
    else {
      cabecalho.style.transform = 'translateY(0)';
    }

    ultimoScroll = scrollAtual;
  }, { passive: true }); 
}

function inicializarMenuMobile() {
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const menuNavegacao = document.getElementById('navegacao-menu');

  if (!botaoMenuMobile || !menuNavegacao) return;

  botaoMenuMobile.addEventListener('click', () => {
    menuNavegacao.classList.toggle('aberto');
    const estaAberto = menuNavegacao.classList.contains('aberto');
    botaoMenuMobile.setAttribute('aria-expanded', estaAberto);
    botaoMenuMobile.setAttribute(
      'aria-label',
      estaAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );

    if (estaAberto) {
      document.getElementById('cabecalho-topo').style.transform = 'translateY(0)';
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menuNavegacao.classList.contains('aberto')) {
      menuNavegacao.classList.remove('aberto');
      botaoMenuMobile.setAttribute('aria-expanded', 'false');
      botaoMenuMobile.setAttribute('aria-label', 'Abrir menu de navegação');
      botaoMenuMobile.focus();
    }
  });

  const linksMenu = menuNavegacao.querySelectorAll('.navegacao-item');
  linksMenu.forEach(link => {
    link.addEventListener('click', () => {
      menuNavegacao.classList.remove('aberto');
      botaoMenuMobile.setAttribute('aria-expanded', false);
      botaoMenuMobile.setAttribute('aria-label', 'Abrir menu de navegação');
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
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0 
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
  const indicadores = document.querySelector('.indicadores-carrossel');
  let bolinhas = [];
  let paginaAtual = 0;

  if (!trilho || !botaoAnterior || !botaoProximo || !indicadores) return;

  function estaNoMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function obterTotalPaginas() {
    if (estaNoMobile()) {
      return trilho.querySelectorAll('.card-membro-time').length;
    }

    return trilho.querySelectorAll('.carrossel-pagina').length;
  }

  function configurarIndicadores() {
    const totalPaginas = obterTotalPaginas();
    indicadores.replaceChildren();

    for (let indice = 0; indice < totalPaginas; indice += 1) {
      const bolinha = document.createElement('button');
      bolinha.className = 'bolinha-indicador';
      bolinha.type = 'button';
      bolinha.dataset.indice = indice;
      bolinha.setAttribute(
        'aria-label',
        `Ir para ${estaNoMobile() ? 'funcionário' : 'grupo'} ${indice + 1}`
      );
      indicadores.appendChild(bolinha);
    }

    bolinhas = indicadores.querySelectorAll('.bolinha-indicador');
  }

  function irParaPagina(indice) {
    const totalPaginas = obterTotalPaginas();

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

  configurarIndicadores();
  irParaPagina(0);

  botaoAnterior.addEventListener('click', () => {
    irParaPagina(paginaAtual - 1);
  });

  botaoProximo.addEventListener('click', () => {
    irParaPagina(paginaAtual + 1);
  });

  indicadores.addEventListener('click', (evento) => {
    const bolinha = evento.target.closest('.bolinha-indicador');
    if (!bolinha) return;

    irParaPagina(parseInt(bolinha.dataset.indice, 10));
  });

  let larguraAnterior = window.innerWidth;
  window.addEventListener('resize', () => {
    const mudouBreakpoint = (window.innerWidth <= 768) !== (larguraAnterior <= 768);
    larguraAnterior = window.innerWidth;

    if (mudouBreakpoint) {
      paginaAtual = 0;
      configurarIndicadores();
      irParaPagina(0);
    }
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
        const alturaCabecalho = document.getElementById('cabecalho-topo')?.offsetHeight || 72;
        const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: posicaoElemento - alturaCabecalho,
          behavior: 'smooth'
        });
      }
    });
  });
}