/* =========================================
   INTRO
========================================= */

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");


function fecharIntro() {

    if (!intro) {
        return;
    }

    intro.classList.add("hidden");
    document.body.style.overflow = "";

    if (introVideo) {
        introVideo.pause();
    }

    // Tenta iniciar a música ao fechar a intro
    iniciarMusica();
}


if (intro) {
    document.body.style.overflow = "hidden";
}


if (skipIntro) {
    skipIntro.addEventListener("click", fecharIntro);
}


if (introVideo) {

    introVideo.addEventListener("ended", fecharIntro);

    introVideo.addEventListener("error", function () {
        fecharIntro();
    });

}


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");


function fecharMenu() {

    if (!nav || !menuToggle) {
        return;
    }

    nav.classList.remove("active");

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menu"
    );
}


function abrirOuFecharMenu() {

    if (!nav || !menuToggle) {
        return;
    }

    const menuAberto =
        nav.classList.toggle("active");

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        if (menuAberto) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

    menuToggle.setAttribute(
        "aria-label",
        menuAberto
            ? "Fechar menu"
            : "Abrir menu"
    );
}


if (menuToggle && nav) {

    menuToggle.addEventListener(
        "click",
        abrirOuFecharMenu
    );

    const links =
        nav.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {
                fecharMenu();
            }
        );

    });

}


/* =========================================
   FECHAR MENU AO REDIMENSIONAR
========================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 800) {
            fecharMenu();
        }

    }
);


/* =========================================
   GALERIA - CATEGORIAS
========================================= */

const categoriaButtons =
    document.querySelectorAll(
        ".categoria-btn"
    );

const categoriasGaleria =
    document.querySelectorAll(
        ".categoria-galeria"
    );


categoriaButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const categoria =
                    button.getAttribute(
                        "data-categoria"
                    );

                categoriaButtons.forEach(
                    function (btn) {
                        btn.classList.remove(
                            "active"
                        );
                    }
                );

                categoriasGaleria.forEach(
                    function (galeria) {
                        galeria.classList.remove(
                            "active"
                        );
                    }
                );

                button.classList.add("active");

                const galeriaSelecionada =
                    document.getElementById(
                        "galeria-" + categoria
                    );

                if (galeriaSelecionada) {

                    galeriaSelecionada.classList.add(
                        "active"
                    );

                    const elementos =
                        galeriaSelecionada.querySelectorAll(
                            ".reveal"
                        );

                    elementos.forEach(
                        function (elemento) {

                            elemento.classList.add(
                                "visible"
                            );

                        }
                    );

                }

            }
        );

    }
);


/* =========================================
   MODAL DA IMAGEM
========================================= */

const modalImagem =
    document.getElementById(
        "modalImagem"
    );

const imagemAmpliada =
    document.getElementById(
        "imagemAmpliada"
    );


function abrirImagem(imagem) {

    if (
        !modalImagem ||
        !imagemAmpliada ||
        !imagem
    ) {
        return;
    }

    imagemAmpliada.src = imagem.src;

    imagemAmpliada.alt =
        imagem.alt ||
        "Imagem ampliada";

    modalImagem.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


function fecharImagem() {

    if (!modalImagem) {
        return;
    }

    modalImagem.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* =========================================
   FECHAR MODAL CLICANDO FORA DA IMAGEM
========================================= */

if (modalImagem) {

    modalImagem.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                modalImagem
            ) {
                fecharImagem();
            }

        }
    );

}


/* =========================================
   FECHAR MODAL COM ESC
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (
                modalImagem &&
                modalImagem.classList.contains(
                    "active"
                )
            ) {
                fecharImagem();
            }

            if (
                nav &&
                nav.classList.contains(
                    "active"
                )
            ) {
                fecharMenu();
            }

        }

    }
);


/* =========================================
   ANIMAÇÕES REVEAL
========================================= */

const elementosReveal =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );

    elementosReveal.forEach(
        function (elemento) {
            observer.observe(elemento);
        }
    );

} else {

    elementosReveal.forEach(
        function (elemento) {

            elemento.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================
   ANO DO FOOTER
========================================= */

const ano =
    document.getElementById("ano");

if (ano) {

    ano.textContent =
        new Date().getFullYear();

}


/* =========================================
   MÚSICA DE FUNDO
========================================= */

const musicaFundo =
    document.getElementById(
        "musicaFundo"
    );

const botaoMusica =
    document.getElementById(
        "botaoMusica"
    );


// Controla se a música estava tocando
// antes do feedback começar.
let musicaEstavaTocando = false;


/* =========================================
   ATUALIZAR ÍCONE DA MÚSICA
========================================= */

function atualizarBotaoMusica() {

    if (
        !botaoMusica ||
        !musicaFundo
    ) {
        return;
    }

    if (musicaFundo.paused) {

        botaoMusica.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

        botaoMusica.setAttribute(
            "aria-label",
            "Ativar música"
        );

        botaoMusica.setAttribute(
            "title",
            "Ativar música"
        );

    } else {

        botaoMusica.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

        botaoMusica.setAttribute(
            "aria-label",
            "Desativar música"
        );

        botaoMusica.setAttribute(
            "title",
            "Desativar música"
        );

    }

}


/* =========================================
   INICIAR MÚSICA
========================================= */

function iniciarMusica() {

    if (!musicaFundo) {
        return;
    }

    musicaFundo.volume = 0.14;

    const promessa =
        musicaFundo.play();

    if (promessa !== undefined) {

        promessa
            .then(function () {

                atualizarBotaoMusica();

            })
            .catch(function () {

                /*
                 * Alguns navegadores bloqueiam
                 * músicas iniciadas automaticamente.
                 *
                 * Nesse caso, o usuário pode
                 * clicar no botão da música.
                 */

                atualizarBotaoMusica();

            });

    }

}


/* =========================================
   CONFIGURAÇÃO DA MÚSICA
========================================= */

if (musicaFundo) {

    musicaFundo.volume = 0.14;

}


if (
    botaoMusica &&
    musicaFundo
) {

    botaoMusica.addEventListener(
        "click",
        function () {

            if (musicaFundo.paused) {

                iniciarMusica();

            } else {

                musicaFundo.pause();

                atualizarBotaoMusica();

            }

        }
    );

    atualizarBotaoMusica();

}


/* =========================================
   ÁUDIOS DOS FEEDBACKS
========================================= */

const audiosFeedback =
    document.querySelectorAll(
        ".feedback-audio audio"
    );


/*
 * Quando um áudio começar:
 *
 * 1. Os outros feedbacks são pausados.
 * 2. A música de fundo é pausada.
 * 3. Guardamos se a música estava tocando.
 */

audiosFeedback.forEach(
    function (audio) {

        audio.addEventListener(
            "play",
            function () {

                /*
                 * Pausar outros feedbacks
                 */

                audiosFeedback.forEach(
                    function (outroAudio) {

                        if (
                            outroAudio !== audio
                        ) {

                            outroAudio.pause();

                        }

                    }
                );


                /*
                 * Verificar se a música
                 * estava tocando
                 */

                if (musicaFundo) {

                    musicaEstavaTocando =
                        !musicaFundo.paused;

                    /*
                     * Pausar música
                     */

                    musicaFundo.pause();

                    atualizarBotaoMusica();

                }

            }
        );


        /*
         * Quando o feedback terminar,
         * a música volta automaticamente
         * se estava tocando antes.
         */

        audio.addEventListener(
            "ended",
            function () {

                if (
                    musicaFundo &&
                    musicaEstavaTocando
                ) {

                    iniciarMusica();

                }

                musicaEstavaTocando =
                    false;

            }
        );

    }
);


/* =========================================
   PAUSAR ÁUDIOS AO SAIR DA ABA
========================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            audiosFeedback.forEach(
                function (audio) {

                    audio.pause();

                }
            );

            /*
             * Também pausa a música de fundo
             * quando o usuário sai da aba.
             */

            if (musicaFundo) {

                musicaFundo.pause();

                atualizarBotaoMusica();

            }

        }

    }
);


/* =========================================
   CONTROLE INICIAL DOS ÁUDIOS
========================================= */

audiosFeedback.forEach(
    function (audio) {

        audio.pause();
        audio.currentTime = 0;

    }
);


/* =========================================
   IMPEDIR SCROLL HORIZONTAL
========================================= */

document.documentElement.style.overflowX =
    "hidden";


/* =========================================
   FINAL
========================================= */

console.log(
    "SD Bem Casados - site carregado com sucesso."
);
