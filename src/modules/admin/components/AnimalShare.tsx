"use client";

import { Check, Copy, MessageCircle, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

type AnimalShareProps = {
  animal: {
    nome: string;
    sexo?: string | null;
    porte?: string | null;
    idadeEstimada?: string | null;
  };
};

export function AnimalShare({ animal }: AnimalShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
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
        onClick={() => setIsOpen(true)}
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
          onClick={() => setIsOpen(false)}
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
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
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
          </div>
        </div>
      )}
    </>
  );
}
