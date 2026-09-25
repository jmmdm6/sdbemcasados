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
}

if (skipIntro) {
    skipIntro.addEventListener("click", fecharIntro);
}

if (introVideo) {
    introVideo.addEventListener("ended", fecharIntro);
}


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

    const links = nav.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {
            nav.classList.remove("active");
        });

    });
}


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

    if (!modalImagem || !imagemAmpliada) {
        return;
    }

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;

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

    modalImagem.addEventListener("click", function (event) {

        if (event.target === modalImagem) {
            fecharImagem();
        }

    });

}


/* =========================================
   FECHAR MODAL COM ESC
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        fecharImagem();
    }

});


/* =========================================
   ANIMAÇÕES REVEAL
========================================= */

const elementosReveal =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    elementosReveal.forEach(function (elemento) {
        observer.observe(elemento);
    });

} else {

    elementosReveal.forEach(function (elemento) {
        elemento.classList.add("visible");
    });

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
    document.querySelectorAll(".feedback-audio audio");


/*
   Quando um áudio começar,
   os outros serão pausados.
*/

audiosFeedback.forEach(function (audio) {

    audio.addEventListener("play", function () {

        audiosFeedback.forEach(function (outroAudio) {

            if (outroAudio !== audio) {
                outroAudio.pause();
            }

        });

    });

});


/* =========================================
   PAUSAR ÁUDIOS AO SAIR DA ABA
========================================= */

document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        audiosFeedback.forEach(function (audio) {
            audio.pause();
        });

    }

});


/* =========================================
   CONTROLE DO ÁUDIO
========================================= */

/*
   Garante que os áudios comecem pausados.
*/

audiosFeedback.forEach(function (audio) {

    audio.pause();

    audio.currentTime = 0;

});


/* =========================================
   FINAL
========================================= */

console.log("SD Bem Casados - site carregado com sucesso.");
