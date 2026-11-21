"use client";

import { useState, useEffect, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { AppShell } from "@/components/layout/AppShell";
import PageController from "./components/layout/PageController";
import PageTransitionWrapper from "./components/layout/PageTransitionWrapper";
import {
  PageCover,
  PageContent,
  PageLapbook,
  PagePestGallery,
  PageMouthparts,
  PageHotspot,
  PageImpact,
  PageAlert,
  PageOrgaos,
  PageChain,
  PageQuiz,
  PageFindTheHero,
  PageClosing,
  PageAmapaCases,
} from "./components/layout/BookletPages";
import PestDialog from "./components/pages/pests/PestDialog";
import {
  getPage,
  TOTAL_PAGES,
  type CartilhaPageData,
  type PestGalleryItemData,
  type PageAmapaCasesData,
} from "./data/cartilha-data";

/* ─────────────────────────────────────────────────────────────────────────
   renderPage — o switch passa onSelectItem apenas para 'pest-gallery'
   para que o PagePestGallery possa elevar o evento de selecao para ca.
───────────────────────────────────────────────────────────────────────── */

function renderPage(
  page: CartilhaPageData,
  onSelectItem: (item: PestGalleryItemData, index: number) => void,
  onGoTo: (pageIndex: number) => void,
  onQuizComplete: () => void,
  onQuizReset: () => void,
) {
  switch (page.type) {
    case "cover":
      return <PageCover data={page} />;
    case "content":
      return <PageContent data={page} onGoTo={onGoTo} />;
    case "lapbook":
      return <PageLapbook data={page} />;
    case "pest-gallery":
      return <PagePestGallery data={page} onSelectItem={onSelectItem} />;
    case "mouthparts":
      return <PageMouthparts data={page} />;
    case "hotspot":
      return <PageHotspot data={page} />;
    case "impact":
      return <PageImpact data={page} />;
    case "alert":
      return <PageAlert data={page} />;
    case "orgaos":
      return <PageOrgaos data={page} />;
    case "chain":
      return <PageChain data={page} />;
    case "quiz":
      return (
        <PageQuiz
          data={page}
          onComplete={onQuizComplete}
          onReset={onQuizReset}
        />
      );
    case "find-the-hero":
      return <PageFindTheHero data={page} />;
    case "amapa-cases":
      return <PageAmapaCases data={page as PageAmapaCasesData} />;
    case "closing":
      return <PageClosing data={page} />;
  }
}

export default function CartilhaPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizNavigationMessage, setQuizNavigationMessage] = useState("");

  /* ── Estado do modal de praga — mantido AQUI, fora do PageTransitionWrapper ── */
  const [pestDialogOpen, setPestDialogOpen] = useState(false);
  const [selectedPest, setSelectedPest] = useState<PestGalleryItemData | null>(
    null,
  );
  const [selectedPestIndex, setSelectedPestIndex] = useState(0);

  const handleSelectPest = useCallback(
    (item: PestGalleryItemData, index: number) => {
      setSelectedPest(item);
      setSelectedPestIndex(index);
      setPestDialogOpen(true);
    },
    [],
  );

  const handleClosePestDialog = useCallback(() => {
    setPestDialogOpen(false);
  }, []);

  /* ── Navegacao de paginas ── */
  const goTo = useCallback(
    (target: number) => {
      if (
        getPage(currentPage).type === "quiz" &&
        target > currentPage &&
        !quizCompleted
      ) {
        setQuizNavigationMessage(
          "Responda e confirme todas as perguntas do quiz antes de avançar.",
        );
        return;
      }
      setQuizNavigationMessage("");
      const clamped = Math.max(0, Math.min(target, TOTAL_PAGES - 1));
      setDirection(clamped >= currentPage ? "next" : "prev");
      setCurrentPage(clamped);
      setAnimKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [currentPage, quizCompleted],
  );

  useEffect(() => {
    if (!quizNavigationMessage) return;

    const timeoutId = window.setTimeout(
      () => setQuizNavigationMessage(""),
      4000,
    );
    return () => window.clearTimeout(timeoutId);
  }, [quizNavigationMessage]);

  const handlePrev = useCallback(
    () => goTo(currentPage - 1),
    [currentPage, goTo],
  );
  const handleNext = useCallback(
    () => goTo(currentPage + 1),
    [currentPage, goTo],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  const page = getPage(currentPage);

  return (
    <AppShell
      title="Cartilha Interativa"
      description={`Página ${currentPage + 1} de ${TOTAL_PAGES}: ${page.label}`}
    >
      <Box
        fontFamily="body"
        id="cartilha-root"
        w="100%"
        minH="100vh"
        position="relative"
        overflow="hidden"
        pt={{ base: 12, md: 8 }}
        pb={8}
        px={4}
      >
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          backgroundImage="url('/images/fundo-floresta.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          filter="blur(4px)"
          transform="scale(1.05)"
          pointerEvents="none"
        />
        <Box
          as="main"
          maxW="1000px"
          minH="85vh"
          mx="auto"
          my={6}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          position="relative"
          zIndex={1}
          bg="white"
          border="2px solid rgba(255, 255, 255, 0.8)"
          borderRadius="2xl"
          boxShadow="0 20px 45px -10px rgba(20, 50, 20, 0.3)"
          overflow="hidden"
          boxSizing="border-box"
          w="100%"
          py={{ base: 4, md: 8 }}
          px={{ base: 4, sm: 6, md: 8 }}
          minW={0}
          id="main-content"
          css={
            page.id === "p7" ||
            page.id === "p8" ||
            page.id === "p9" ||
            page.id === "p10" ||
            page.id === "p11" ||
            page.id === "p12" ||
            page.id === "p13" ||
            page.id === "p14" ||
            page.id === "p15" ||
            page.id === "p16" ||
            page.id === "p17" ||
            page.id === "p18" ||
            page.id === "p19" ||
            page.id === "p20"
              ? {
                  "@media (max-width: 639px)": {
                    width: "calc(100% - 16px)",
                    marginInline: "auto",
                  },
                }
              : undefined
          }
        >
          <Box
            w="100%"
            maxW="100%"
            minW={0}
            boxSizing="border-box"
            css={{
              "&, & *": {
                boxSizing: "border-box",
                maxWidth: "100%",
              },
            }}
          >
            <PageTransitionWrapper pageKey={animKey} direction={direction}>
              {renderPage(
                page,
                handleSelectPest,
                goTo,
                () => {
                  setQuizCompleted(true);
                  setQuizNavigationMessage("");
                },
                () => {
                  setQuizCompleted(false);
                  setQuizNavigationMessage("");
                },
              )}
            </PageTransitionWrapper>
          </Box>

          <Box as="footer" w="100%" maxW="100%" minW={0} boxSizing="border-box">
            {quizNavigationMessage && (
              <Box
                role="alert"
                mb={3}
                px={4}
                py={3}
                border="1px solid #FFCC80"
                borderRadius="lg"
                bg="#FFF8E1"
                color="#5D4037"
                fontSize="sm"
                fontWeight="600"
                textAlign="center"
              >
                {quizNavigationMessage}
              </Box>
            )}
            <PageController
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPrev={handlePrev}
              onNext={handleNext}
              onGoTo={goTo}
              nextDisabled={page.type === "quiz" && !quizCompleted}
            />
          </Box>
        </Box>
      </Box>

      {/*
        PestDialog e renderizado AQUI — irmao do <Box fontFamily="body">,
        filho direto do <AppShell>, completamente FORA do PageTransitionWrapper.
        Isso garante que o Portal do Dialog nao herde o stacking context de
        filter + transform da animacao de transicao de pagina.
        O componente usa <Portal> internamente para montar no <body>.
      */}
      <PestDialog
        open={pestDialogOpen}
        onClose={handleClosePestDialog}
        selectedItem={selectedPest}
        selectedIndex={selectedPestIndex}
      />
    </AppShell>
  );
}
