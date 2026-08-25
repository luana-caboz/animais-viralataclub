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

function HealthCheck({
  children,
}: {
  children: ReactNode;
}) {
  return element(
    "div",
    {
      style: {
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
          position: "relative",
        },
      },
      element("div", {
        style: {
          position: "absolute",
          width: 16,
          height: 9,
          borderLeft: "4px solid #16a34a",
          borderBottom: "4px solid #16a34a",
          transform: "rotate(-45deg)",
          top: 13,
          left: 12,
        },
      }),
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
    return new Response("Animal não encontrado", {
      status: 404,
    });
  }

  const foto = animal.fotos?.[0]?.url?.trim();
  const historia = resumirHistoria(animal.historia);
  const nomeFontSize = getNomeFontSize(animal.nome);
  const logoUrl = new URL("/logo.png", request.url).toString();
  const pageUrl = new URL(`/animal/${slug}`, request.url).toString();
  const siteHost = new URL(request.url).host;

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
          padding: "58px 64px 62px",
          fontFamily: "Arial, sans-serif",
        },
      },
      element("div", {
        style: {
          position: "absolute",
          width: 460,
          height: 460,
          top: -280,
          right: -150,
          display: "flex",
          borderRadius: "50%",
          background: "#fff0dd",
        },
      }),
      element(
        "div",
        {
          style: {
            height: 76,
            display: "flex",
            alignItems: "center",
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
          element("span", { style: { color: "#0f4fb6" } }, "VIRA LATA"),
          element(
            "span",
            { style: { color: "#f58220", marginLeft: 11 } },
            "CLUB",
          ),
        ),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            zIndex: 10,
          },
        },
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
            },
          },
          animal.nome,
        ),
        element(
          "div",
          {
            style: {
              display: "flex",
              marginTop: 18,
              color: "#f58220",
              fontSize: 34,
              fontWeight: 800,
            },
          },
          "Procuro uma família",
        ),
      ),
      element(
        "div",
        {
          style: {
            position: "relative",
            width: "100%",
            height: 820,
            display: "flex",
            flexShrink: 0,
            overflow: "hidden",
            marginTop: 36,
            borderRadius: 52,
            background: "#cfe7f7",
            boxShadow: "0 28px 60px rgba(15, 79, 182, 0.14)",
          },
        },
        foto
          ? element("img", {
              src: foto,
              alt: animal.nome,
              width: 952,
              height: 820,
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
        element(
          "div",
          {
            style: {
              position: "absolute",
              top: 30,
              left: 30,
              display: "flex",
              alignItems: "center",
              padding: "18px 30px",
              borderRadius: 999,
              background: "#f58220",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 800,
              boxShadow: "0 12px 28px rgba(0,0,0,0.14)",
            },
          },
          "🏠 Procuro uma família",
        ),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 34,
          },
        },
        animal.sexo &&
          element(
            "div",
            {
              style: {
                display: "flex",
                padding: "14px 24px",
                borderRadius: 999,
                background: "#dcecff",
                color: "#0f4fb6",
                fontSize: 27,
                fontWeight: 700,
              },
            },
            animal.sexo,
          ),
        animal.porte &&
          element(
            "div",
            {
              style: {
                display: "flex",
                padding: "14px 24px",
                borderRadius: 999,
                background: "#fff0dd",
                color: "#f58220",
                fontSize: 27,
                fontWeight: 700,
              },
            },
            `Porte ${animal.porte}`,
          ),
        animal.idadeEstimada &&
          element(
            "div",
            {
              style: {
                display: "flex",
                padding: "14px 24px",
                borderRadius: 999,
                background: "#dcf8e8",
                color: "#15803d",
                fontSize: 27,
                fontWeight: 700,
              },
            },
            animal.idadeEstimada,
          ),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            marginTop: 34,
            padding: "32px 36px",
            borderRadius: 38,
            background: "#ffffff",
            border: "1px solid #eef1f5",
            boxShadow: "0 18px 38px rgba(15,23,42,0.07)",
          },
        },
        element(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              color: "#0f4fb6",
              fontSize: 33,
              fontWeight: 800,
            },
          },
          "Conheça ",
          animal.sexo === "Fêmea" ? "a" : "o",
          " ",
          animal.nome,
        ),
        element(
          "div",
          {
            style: {
              display: "flex",
              marginTop: 18,
              color: "#475569",
              fontSize: 27,
              lineHeight: 1.45,
              fontWeight: 500,
            },
          },
          historia,
        ),
        element("div", {
          style: {
            width: "100%",
            height: 1,
            display: "flex",
            marginTop: 26,
            background: "#edf1f5",
          },
        }),
        element(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              marginTop: 22,
            },
          },
          animal.vacinado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea" ? "Vacinada" : "Vacinado",
            }),
          animal.castrado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea" ? "Castrada" : "Castrado",
            }),
          animal.vermifugado &&
            HealthCheck({
              children:
                animal.sexo === "Fêmea" ? "Vermifugada" : "Vermifugado",
            }),
        ),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 34,
          },
        },
        element(
          "div",
          {
            style: {
              display: "flex",
              color: "#0f4fb6",
              fontSize: 31,
              fontWeight: 900,
              textAlign: "center",
            },
          },
          `Ajude ${animal.nome} a encontrar uma família`,
        ),
        element(
          "div",
          {
            style: {
              display: "flex",
              marginTop: 12,
              color: "#f58220",
              fontSize: 25,
              fontWeight: 700,
            },
          },
          "Compartilhe esta história",
        ),
        element(
          "div",
          {
            style: {
              display: "flex",
              marginTop: 16,
              color: "#64748b",
              fontSize: 20,
            },
          },
          siteHost,
        ),
      ),
      element(
        "div",
        {
          style: {
            display: "none",
          },
        },
        pageUrl,
      ),
    ),
    size,
  );
}