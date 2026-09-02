"use client";

import { Check, Copy, Loader2, MessageCircle, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InstagramIcon } from "./InstagramIcon";

type AnimalShareProps = {
  slug: string;

  animal: {
    nome: string;
    sexo?: string | null;
    porte?: string | null;
    idadeEstimada?: string | null;
  };
};

export function AnimalShare({ slug, animal }: AnimalShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [instagramFile, setInstagramFile] = useState<File | null>(null);

  const [preparingInstagram, setPreparingInstagram] = useState(false);

  const [shareError, setShareError] = useState<string | null>(null);

  function getShareUrl() {
    return window.location.href;
  }

  function getShareText() {
    const infos = [
      animal.sexo,
      animal.porte ? `Porte ${animal.porte}` : null,
      animal.idadeEstimada,
    ]
      .filter(Boolean)
      .join(" • ");

    return `🐾 ${animal.nome} está procurando uma família! 💛

${infos}

Conheça ${animal.nome} e ajude compartilhando:

${getShareUrl()}`;
  }

  function shareOnWhatsApp() {
    const text = encodeURIComponent(getShareText());

    const url = `https://wa.me/?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function prepareInstagramShare() {
    if (preparingInstagram) {
      return;
    }

    try {
      setPreparingInstagram(true);
      setShareError(null);

      const response = await fetch(
        `/api/share/animal/${encodeURIComponent(slug)}`,
      );

      if (!response.ok) {
        throw new Error("Não foi possível gerar a imagem.");
      }

      const blob = await response.blob();

      const nomeArquivo = animal.nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const file = new File([blob], `${nomeArquivo}-adocao.png`, {
        type: "image/png",
      });

      setInstagramFile(file);
    } catch (error) {
      console.error("Erro ao preparar imagem para Instagram:", error);

      setShareError("Não foi possível preparar a arte para compartilhamento.");
    } finally {
      setPreparingInstagram(false);
    }
  }

  async function sharePreparedInstagram() {
    if (!instagramFile) {
      return;
    }

    try {
      setShareError(null);

      if (typeof navigator.share !== "function") {
        setShareError(
          "O compartilhamento não é suportado neste navegador. Tente pelo celular.",
        );

        return;
      }

      if (
        typeof navigator.canShare === "function" &&
        !navigator.canShare({
          files: [instagramFile],
        })
      ) {
        setShareError(
          "Este navegador não suporta o compartilhamento de imagens. Tente pelo celular.",
        );

        return;
      }

      await navigator.share({
        files: [instagramFile],
        title: `${animal.nome} para adoção`,
        text: `${animal.nome} está procurando uma família.`,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Erro ao compartilhar imagem:", error);

      setShareError("Não foi possível abrir o compartilhamento.");
    }
  }

  function handleInstagramClick() {
    if (preparingInstagram) {
      return;
    }

    if (instagramFile) {
      void sharePreparedInstagram();
      return;
    }

    void prepareInstagramShare();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getShareUrl());

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao copiar link:", error);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setShareError(null);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShareError(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShareError(null);
          setIsOpen(true);
        }}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-full
          border
          border-[#0f4fb6]
          bg-white
          px-5
          py-3
          font-semibold
          text-[#0f4fb6]
          shadow-sm
          transition
          hover:bg-blue-50
          hover:shadow-md
        "
      >
        <Share2 size={20} />
        Compartilhar
      </button>

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-end
            justify-center
            bg-black/40
            backdrop-blur-[2px]
            sm:items-center
            sm:px-4
          "
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            className="
              w-full
              rounded-t-[32px]
              bg-white
              p-6
              shadow-2xl
              sm:max-w-md
              sm:rounded-[32px]
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="share-modal-title"
                  className="text-2xl font-extrabold text-[#0f4fb6]"
                >
                  Compartilhe {animal.nome} 💛
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ajude {animal.nome} a chegar até uma nova família.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  transition
                  hover:bg-slate-200
                "
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-7 space-y-3">
              {/* WHATSAPP */}
              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                  text-left
                  transition
                  hover:border-green-300
                  hover:bg-green-50
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-green-600
                  "
                >
                  <MessageCircle size={22} />
                </div>

                <div>
                  <p className="font-bold text-slate-800">WhatsApp</p>

                  <p className="text-sm text-slate-500">
                    Compartilhar com amigos e grupos
                  </p>
                </div>
              </button>

              {/* INSTAGRAM */}
              <button
                type="button"
                onClick={handleInstagramClick}
                disabled={preparingInstagram}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                  text-left
                  transition
                  hover:border-pink-300
                  hover:bg-pink-50
                  disabled:cursor-wait
                  disabled:opacity-60
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-pink-100
                    text-pink-600
                  "
                >
                  {preparingInstagram ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : instagramFile ? (
                    <Check size={22} />
                  ) : (
                    <InstagramIcon size={22} />
                  )}
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    {preparingInstagram
                      ? "Criando arte..."
                      : instagramFile
                        ? "Compartilhar arte"
                        : "Instagram"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {preparingInstagram
                      ? "Só um instante"
                      : instagramFile
                        ? "Arte pronta para Stories"
                        : "Criar uma arte pronta para Stories"}
                  </p>
                </div>
              </button>

              {/* COPIAR LINK */}
              <button
                type="button"
                onClick={copyLink}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                  text-left
                  transition
                  hover:border-blue-300
                  hover:bg-blue-50
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-[#0f4fb6]
                  "
                >
                  {copied ? <Check size={22} /> : <Copy size={22} />}
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    {copied ? "Link copiado!" : "Copiar link"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {copied
                      ? "Agora é só enviar para quem quiser"
                      : "Copiar o endereço desta página"}
                  </p>
                </div>
              </button>
            </div>

            {shareError && (
              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-orange-200
                  bg-orange-50
                  px-4
                  py-3
                  text-sm
                  leading-5
                  text-orange-700
                "
              >
                {shareError}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
