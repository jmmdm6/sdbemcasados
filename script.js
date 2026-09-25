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

    const menuAberto = nav.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

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

    const links = nav.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            fecharMenu();
        });

    });

}


/* =========================================
   FECHAR MENU AO REDIMENSIONAR
========================================= */

window.addEventListener("resize", function () {

    if (window.innerWidth > 800) {
        fecharMenu();
    }

});


/* =========================================
   GALERIA - CATEGORIAS
========================================= */

const categoriaButtons =
    document.querySelectorAll(".categoria-btn");

const categoriasGaleria =
    document.querySelectorAll(".categoria-galeria");

categoriaButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const categoria =
            button.getAttribute("data-categoria");

        categoriaButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        categoriasGaleria.forEach(function (galeria) {
            galeria.classList.remove("active");
        });

        button.classList.add("active");

        const galeriaSelecionada =
            document.getElementById(
                "galeria-" + categoria
            );

        if (galeriaSelecionada) {

            galeriaSelecionada.classList.add("active");

            /*
             * As novas imagens da galeria
             * recebem a animação novamente.
             */
            const elementos =
                galeriaSelecionada.querySelectorAll(".reveal");

            elementos.forEach(function (elemento) {
                elemento.classList.add("visible");
            });
        }

    });

});


/* =========================================
   MODAL DA IMAGEM
========================================= */

const modalImagem =
    document.getElementById("modalImagem");

const imagemAmpliada =
    document.getElementById("imagemAmpliada");


function abrirImagem(imagem) {

    if (!modalImagem || !imagemAmpliada || !imagem) {
        return;
    }

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt || "Imagem ampliada";

    modalImagem.classList.add("active");

    document.body.style.overflow = "hidden";
}


function fecharImagem() {

    if (!modalImagem) {
        return;
    }

    modalImagem.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   FECHAR MODAL CLICANDO FORA DA IMAGEM
========================================= */

if (modalImagem) {

    modalImagem.addEventListener(
        "click",
        function (event) {

            if (event.target === modalImagem) {
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
                modalImagem.classList.contains("active")
            ) {
                fecharImagem();
            }

            if (
                nav &&
                nav.classList.contains("active")
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
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (entry.isIntersecting) {

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
            elemento.classList.add("visible");
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
   ÁUDIOS DOS FEEDBACKS
========================================= */

const audiosFeedback =
    document.querySelectorAll(
        ".feedback-audio audio"
    );


/*
   Quando um áudio começar,
   os outros serão pausados.
*/

audiosFeedback.forEach(
    function (audio) {

        audio.addEventListener(
            "play",
            function () {

                audiosFeedback.forEach(
                    function (outroAudio) {

                        if (outroAudio !== audio) {
                            outroAudio.pause();
                        }

                    }
                );

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

        }

    }
);


/* =========================================
   CONTROLE DO ÁUDIO
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

document.documentElement.style.overflowX = "hidden";


/* =========================================
   FINAL
========================================= */

console.log(
    "SD Bem Casados - site carregado com sucesso."
);
