import { getAnimalBySlug } from "@/modules/animals/services/animal.service";
import { ImageResponse } from "next/og";
import { createElement, type ReactNode } from "react";

export const runtime = "edge";

type Context = {
  params: Promise<{
    slug: string;
  }>;
};

const size = {
  width: 1080,
  height: 1920,
};

const element = (
  tag: string,
  props: Record<string, unknown> | null,
  ...children: ReactNode[]
) => createElement(tag, props ?? {}, ...children);

function resumirHistoria(
  historia: string | null | undefined,
  limite = 220,
) {
  if (!historia) {
    return "Conheça minha história e ajude a encontrar uma família.";
  }

  const texto = historia.trim();

  if (texto.length <= limite) {
    return texto;
  }

  const corte = texto.slice(0, limite);
  const ultimoEspaco = corte.lastIndexOf(" ");

  return `${corte.slice(0, ultimoEspaco)}...`;
}

function getNomeFontSize(nome: string) {
  if (nome.length > 14) return 76;
  if (nome.length > 10) return 86;
  if (nome.length > 7) return 96;

  return 108;
}

function GenderIcon({
  sexo,
}: {
  sexo: string;
}) {
  const isFemale = sexo === "Fêmea";

  return element(
    "div",
    {
      style: {
        width: 25,
        height: 25,
        minWidth: 25,
        display: "flex",
        position: "relative",
        marginRight: 10,
      },
    },

    // Círculo
    element("div", {
      style: {
        position: "absolute",
        width: 13,
        height: 13,
        border: "3px solid #0f4fb6",
        borderRadius: "50%",
        top: 0,
        left: 4,
      },
    }),

    // Haste
    element("div", {
      style: isFemale
        ? {
            position: "absolute",
            width: 3,
            height: 9,
            background: "#0f4fb6",
            top: 13,
            left: 9,
          }
        : {
            position: "absolute",
            width: 3,
            height: 9,
            background: "#0f4fb6",
            top: 12,
            left: 15,
            transform: "rotate(45deg)",
            transformOrigin: "top center",
          },
    }),

    // Cruz da fêmea
    isFemale &&
      element("div", {
        style: {
          position: "absolute",
          width: 11,
          height: 3,
          background: "#0f4fb6",
          top: 19,
          left: 5,
        },
      }),

    // Seta do macho
    !isFemale &&
      element("div", {
        style: {
          position: "absolute",
          width: 8,
          height: 3,
          background: "#0f4fb6",
          top: 15,
          left: 15,
          transform: "rotate(45deg)",
        },
      }),
  );
}

function PorteIcon() {
  return element(
    "div",
    {
      style: {
        width: 29,
        height: 23,
        minWidth: 29,
        display: "flex",
        position: "relative",
        marginRight: 10,
      },
    },

    // Corpo
    element("div", {
      style: {
        position: "absolute",
        width: 19,
        height: 11,
        left: 3,
        top: 7,
        borderRadius: 4,
        background: "#f58220",
      },
    }),

    // Cabeça
    element("div", {
      style: {
        position: "absolute",
        width: 9,
        height: 9,
        right: 0,
        top: 3,
        borderRadius: "50%",
        background: "#f58220",
      },
    }),

    // Pata esquerda
    element("div", {
      style: {
        position: "absolute",
        width: 3,
        height: 7,
        left: 6,
        top: 16,
        background: "#f58220",
      },
    }),

    // Pata direita
    element("div", {
      style: {
        position: "absolute",
        width: 3,
        height: 7,
        left: 17,
        top: 16,
        background: "#f58220",
      },
    }),

    // Rabo
    element("div", {
      style: {
        position: "absolute",
        width: 9,
        height: 3,
        left: 0,
        top: 7,
        background: "#f58220",
        transform: "rotate(-35deg)",
      },
    }),
  );
}

function AgeIcon() {
  return element(
    "div",
    {
      style: {
        width: 25,
        height: 25,
        minWidth: 25,
        display: "flex",
        position: "relative",
        marginRight: 10,
        border: "3px solid #15803d",
        borderRadius: 5,
      },
    },

    element("div", {
      style: {
        position: "absolute",
        width: 3,
        height: 6,
        background: "#15803d",
        top: -5,
        left: 4,
      },
    }),

    element("div", {
      style: {
        position: "absolute",
        width: 3,
        height: 6,
        background: "#15803d",
        top: -5,
        right: 4,
      },
    }),

    element("div", {
      style: {
        position: "absolute",
        left: 3,
        right: 3,
        top: 7,
        height: 3,
        background: "#15803d",
      },
    }),
  );
}

function AdoptionHeart() {
  return element(
    "svg",
    {
      width: 52,
      height: 52,
      viewBox: "0 0 24 24",
      style: {
        display: "flex",
        marginBottom: 10,
      },
    },

    element("path", {
      d: "M12 23C12 23 2 16.5 2 9.2C2 5.8 4.4 3.9 7.3 3.9C9.5 3.9 11.1 5.2 12 6.9C12.9 5.2 14.5 3.9 16.7 3.9C19.6 3.9 22 5.8 22 9.2C22 16.5 12 23 12 23Z",
      fill: "#f58220",
    }),
  );
}

function HealthCheck({
  children,
}: {
  children: ReactNode;
}) {
  return element(
    "div",
    {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        color: "#475569",
        fontSize: 30,
        fontWeight: 700,
      },
    },

    element(
      "div",
      {
        style: {
          width: 42,
          height: 42,
          minWidth: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 14,
          borderRadius: "50%",
          background: "#dcfce7",
        },
      },

      element(
        "svg",
        {
          width: 22,
          height: 22,
          viewBox: "0 0 24 24",
          style: {
            display: "flex",
          },
        },

        element("path", {
          d: "M5 12.5 9.2 16.7 19 7",
          fill: "none",
          stroke: "#16a34a",
          strokeWidth: 3.2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      ),
    ),

    element(
      "div",
      {
        style: {
          display: "flex",
          whiteSpace: "nowrap",
        },
      },
      children,
    ),
  );
}

export async function GET(
  request: Request,
  { params }: Context,
) {
  const { slug } = await params;

  const animal = await getAnimalBySlug(slug);

  if (!animal) {
    return new Response(
      "Animal não encontrado",
      {
        status: 404,
      },
    );
  }

  const foto =
    animal.fotos?.[0]?.url?.trim();

  const historia =
    resumirHistoria(animal.historia);

  const nomeFontSize =
    getNomeFontSize(animal.nome);

  const logoUrl = new URL(
    "/logo.png",
    request.url,
  ).toString();

  const pageUrl = new URL(
    `/animal/${slug}`,
    request.url,
  ).toString();

  const displayUrl = pageUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return new ImageResponse(
    element(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",

          position: "relative",
          overflow: "hidden",

          background: "#fffdf9",

          padding: "58px 64px 58px",

          fontFamily: "Arial, sans-serif",
        },
      },

      /*
       * DECORAÇÕES DE FUNDO
       */

      element("div", {
        style: {
          position: "absolute",
          width: 420,
          height: 420,

          top: -250,
          left: -160,

          display: "flex",

          borderRadius: "50%",
          background: "#fff0dd",
        },
      }),

      element("div", {
        style: {
          position: "absolute",
          width: 520,
          height: 520,

          right: -290,
          bottom: -300,

          display: "flex",

          borderRadius: "50%",
          background: "#e7f2ff",
        },
      }),

      /*
       * HEADER
       */

      element(
        "div",
        {
          style: {
            height: 76,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            zIndex: 10,
          },
        },

        element("img", {
          src: logoUrl,
          alt: "",

          width: 68,
          height: 68,

          style: {
            width: 68,
            height: 68,

            borderRadius: "50%",

            objectFit: "cover",

            marginRight: 18,
          },
        }),

        element(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",

              fontSize: 40,
              fontWeight: 900,
            },
          },

          element(
            "span",
            {
              style: {
                color: "#0f4fb6",
              },
            },
            "VIRA LATA",
          ),

          element(
            "span",
            {
              style: {
                color: "#f58220",
                marginLeft: 11,
              },
            },
            "CLUB",
          ),
        ),
      ),

      /*
       * NOME
       */

      element(
        "div",
        {
          style: {
            display: "flex",

            color: "#0f4fb6",

            fontSize: nomeFontSize,
            lineHeight: 0.95,

            fontWeight: 900,

            letterSpacing: "-3px",

            marginTop: 42,

            zIndex: 10,
          },
        },

        animal.nome,
      ),

      /*
       * CHIPS
       */

      element(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",

            gap: 16,

            marginTop: 22,

            zIndex: 10,
          },
        },

        animal.sexo &&
          element(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",

                padding: "14px 24px",

                borderRadius: 999,

                background: "#dcecff",
                color: "#0f4fb6",

                fontSize: 27,
                fontWeight: 700,
              },
            },

            GenderIcon({
              sexo: animal.sexo,
            }),

            animal.sexo,
          ),

        animal.porte &&
          element(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",

                padding: "14px 24px",

                borderRadius: 999,

                background: "#fff0dd",
                color: "#f58220",

                fontSize: 27,
                fontWeight: 700,
              },
            },

            PorteIcon(),

            `Porte ${animal.porte}`,
          ),

        animal.idadeEstimada &&
          element(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",

                padding: "14px 24px",

                borderRadius: 999,

                background: "#dcf8e8",
                color: "#15803d",

                fontSize: 27,
                fontWeight: 700,
              },
            },

            AgeIcon(),

            animal.idadeEstimada,
          ),
      ),

      /*
       * FOTO
       */

      element(
        "div",
        {
          style: {
            position: "relative",

            width: "100%",
            height: 840,

            display: "flex",

            flexShrink: 0,

            overflow: "hidden",

            marginTop: 30,

            borderRadius: 52,

            background: "#cfe7f7",

            boxShadow:
              "0 28px 60px rgba(15,79,182,0.14)",
          },
        },

        foto
          ? element("img", {
              src: foto,
              alt: animal.nome,

              width: 952,
              height: 840,

              style: {
                width: "100%",
                height: "100%",

                objectFit: "cover",
                objectPosition: "center 42%",
              },
            })
          : element(
              "div",
              {
                style: {
                  width: "100%",
                  height: "100%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: 230,
                },
              },

              "🐶",
            ),

        /*
         * SELO SOBRE A FOTO
         */

        element(
          "div",
          {
            style: {
              position: "absolute",

              top: 34,
              right: 34,

              width: 190,
              height: 190,

              display: "flex",
              flexDirection: "column",

              alignItems: "center",
              justifyContent: "center",

              borderRadius: "50%",

              background: "transparent",

              border: "3px solid #f58220",

              color: "#f58220",

              fontSize: 23,
              lineHeight: 1.25,

              fontWeight: 800,

              textAlign: "center",
            },
          },

          AdoptionHeart(),

          "Adote ou",

          element("br", null),

          "compartilhe",
        ),
      ),

      /*
       * HISTÓRIA
       */

      element(
        "div",
        {
          style: {
            width: "100%",

            display: "flex",
            flexDirection: "column",

            marginTop: 32,

            padding: "30px 34px 28px",

            borderRadius: 38,

            background: "#ffffff",

            border: "1px solid #eef1f5",

            boxShadow:
              "0 18px 38px rgba(15,23,42,0.07)",
          },
        },

        element(
          "div",
          {
            style: {
              display: "flex",

              color: "#0f4fb6",

              fontSize: 30,
              fontWeight: 800,
            },
          },

          "Sua história",
        ),

        element(
          "div",
          {
            style: {
              display: "flex",

              marginTop: 15,

              color: "#475569",

              fontSize: 27,
              lineHeight: 1.45,

              fontWeight: 500,
            },
          },

          historia,
        ),

        /*
         * DIVISOR
         */

        element("div", {
          style: {
            width: "100%",
            height: 1,

            display: "flex",

            marginTop: 24,

            background: "#edf1f5",
          },
        }),

        /*
         * SAÚDE
         */

        element(
          "div",
          {
            style: {
              width: "100%",

              display: "flex",

              gap: 22,

              marginTop: 20,
            },
          },

          animal.vacinado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea"
                  ? "Vacinada"
                  : "Vacinado",
            }),

          animal.castrado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea"
                  ? "Castrada"
                  : "Castrado",
            }),

          animal.vermifugado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea"
                  ? "Vermifugada"
                  : "Vermifugado",
            }),
        ),
      ),

      /*
       * CTA
       */

      element(
        "div",
        {
          style: {
            width: "100%",

            display: "flex",
            flexDirection: "column",

            alignItems: "center",

            marginTop: "auto",

            paddingTop: 28,

            zIndex: 10,
          },
        },

        /*
         * BOTÃO VISUAL
         */

        element(
          "div",
          {
            style: {
              minWidth: 390,
              height: 76,

              display: "flex",

              alignItems: "center",
              justifyContent: "center",

              padding: "0 42px",

              borderRadius: 999,

              background: "#f58220",

              color: "#ffffff",

              fontSize: 31,
              fontWeight: 900,

              boxShadow:
                "0 14px 30px rgba(245,130,32,0.26)",
            },
          },

          `Adote ${animal.nome}`,
        ),

        /*
         * LINK VISUAL
         */

        element(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",

              marginTop: 15,

              padding: "12px 22px",

              borderRadius: 999,

              background: "#edf4ff",

              color: "#0f4fb6",

              fontSize: 20,
              fontWeight: 600,
            },
          },

          displayUrl,
        ),
      ),
    ),

    size,
  );
}