"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import type { PageAlertData } from "../../../data/cartilha-data";
import { Avatar } from "../../layout/Avatar";
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  Truck,
} from "lucide-react";
type InvestigationCase = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageCredit: string;
  correctAction: "block" | "allow";
  alertLabel?: string;
  status: string;
  threat: string;
  blockFeedback: string;
  allowFeedback: string;
};

const CASES: InvestigationCase[] = [
  {
    id: 1,
    title: "Caso 1: Carga de Carambolas",
    description:
      "PQP — a Mosca-da-Carambola está presente em áreas restritas do Amapá. A carga chega sem a documentação fitossanitária necessária para a conferência.",
    imageSrc: "/images/cartilha/quarentenarias/mosca-carambola.jpg",
    imageCredit: "Foto: Ken Walker / Museum Victoria / Wikimedia Commons (CC BY 3.0)",
    correctAction: "block",
    alertLabel: "Mosca-da-carambola",
    status: "PQP · Controle de dispersão em área restrita",
    threat:
      "",
    blockFeedback:
      "Uau! Decisão correta: a carga deve ser bloqueada para inspeção, pois, se essa Mosca-da-carambola entrasse, toda a nossa produção local estaria em risco.",
    allowFeedback:
      "Atenção! Sem certificado sanitário, as frutas podem trazer uma praga agrícola perigosa. A carga deve ser bloqueada para inspeção.",
  },
  {
    id: 2,
    title: "Caso 2: Mudas de Laranja",
    description:
      "PQA — mudas cítricas chegam sem certificação. A origem externa e a ausência do selo de inspeção exigem uma análise cuidadosa na alfândega.",
    imageSrc: "/images/cartilha/quarentenarias/mudas-laranja.jpg",
    imageCredit: "Foto: USDA / David Bartels / Wikimedia Commons (Domínio Público)",
    correctAction: "block",
    alertLabel: "Mudas de laranja",
    status: "PQA · Ameaça externa",
    threat:
      "",
    blockFeedback:
      "Muito bem! Decisão correta: a entrada deve ser bloqueada para inspeção. Mudas sem comprovação podem espalhar o HLB e destruir pomares inteiros de laranja.",
    allowFeedback:
      "Atenção! Sem o selo de inspeção, essa doença destruiria as laranjeiras. A entrada deve ser bloqueada.",
  },
  {
    id: 3,
    title: "Caso 3: Maçãs Certificadas",
    description:
      "PQA — a carga vem de área oficialmente livre e tem documentação e selo de inspeção para conferência na barreira fitossanitária.",
    imageSrc: "/images/cartilha/quarentenarias/macas-certificadas.jpg",
    imageCredit: "Foto: AS Photography / Wikimedia Commons (CC BY 4.0)",
    correctAction: "allow",
    alertLabel: "Maçãs certificadas",
    status: "PQA · Origem certificada e área livre",
    threat:
      "",
    blockFeedback:
      "Atenção! Esta carga está regularizada. Bloqueá-la sem motivo atrasa uma remessa segura e dificulta o trabalho de fiscalização.",
    allowFeedback:
      "Decisão correta: a documentação confirma que a carga foi inspecionada e a entrada pode ser permitida com segurança.",
  },
];

function CasePhoto({ item }: { item: InvestigationCase }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Box
        h="full"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, green.100, orange.100)"
        fontSize="4rem"
        aria-label={`Ilustração de ${item.title}`}
      >
        {item.correctAction === "allow" ? (
          <Package size={64} color="#2F855A" />
        ) : (
          <Truck size={64} color="#C53030" />
        )}
      </Box>
    );
  }

  return (
    <Image
      key={item.id}
      src={item.imageSrc}
      alt={`Fotografia da ${item.title}`}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: "cover" }}
      onError={() => setHasError(true)}
    />
  );
}

export default function BorderInvestigationCases({
  data,
}: {
  data: PageAlertData;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<
    "block" | "allow" | null
  >(null);
  const item = CASES[selectedIndex];
  const feedback =
    selectedAction === "block"
      ? item.blockFeedback
      : selectedAction === "allow"
        ? item.allowFeedback
        : null;
  const isCorrect = selectedAction === item.correctAction;

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Box
          bg="orange.50"
          border="1px solid"
          borderColor="orange.200"
          borderRadius="18px"
          p={{ base: 4, sm: 5 }}
        >
          <Text fontSize="0.78rem" fontWeight="900" color="orange.800" mb={2}>
            Definição Oficial do MAPA
          </Text>
          <Text fontSize="0.82rem" color="gray.700" lineHeight="1.65">
            {data.alertText}
          </Text>
        </Box>
        <Box
          bg="yellow.50"
          border="1px solid"
          borderColor="yellow.200"
          borderRadius="18px"
          p={{ base: 4, sm: 5 }}
        >
          <HStack align="flex-start" gap={3}>
            <Avatar src="/images/dona-fito.webp" />
            <Box>
              <Text
                fontSize="0.78rem"
                fontWeight="900"
                color="yellow.800"
                mb={2}
              >
                Curiosidade: por que o nome “Quarentenária”?
              </Text>
              <Text fontSize="0.82rem" color="gray.900" lineHeight="1.65">
                O termo vem de “quarentena”, período de isolamento para
                evitar a propagação de doenças. Na agricultura, a quarentena fitossanitária
                protege as plantas.
              </Text>
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={2} mt={5} mb={4}>
        {CASES.map((caseItem, index) => (
          <Box
            key={caseItem.title}
            as="button"
            onClick={() => {
              setSelectedIndex(index);
              setSelectedAction(null);
            }}
            p={3}
            borderRadius="12px"
            border="1px solid"
            borderColor={selectedIndex === index ? "green.500" : "green.200"}
            bg={selectedIndex === index ? "green.700" : "white"}
            color={selectedIndex === index ? "white" : "green.800"}
            fontSize="0.72rem"
            fontWeight="800"
            textAlign="left"
            cursor="pointer"
            _hover={{ bg: selectedIndex === index ? "green.600" : "green.50" }}
          >
            Caso {caseItem.id}: {caseItem.title.replace(/^Caso \d+: /, "")}
          </Box>
        ))}
      </SimpleGrid>

      <Box
        border="1px solid"
        borderColor="green.200"
        borderRadius="20px"
        p={{ base: 3, sm: 5 }}
        bg="white"
        boxShadow="sm"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 4, md: 6 }}
          alignItems="center"
        >
          <Box
            key={item.id}
            w="100%"
            position="relative"
          >
            <Box h="220px" position="relative" overflow="hidden" borderRadius="lg" bg="green.50">
              <CasePhoto item={item} />
              {item.alertLabel && (
                <Box
                  position="absolute"
                  left={3}
                  top={3}
                  px={2.5}
                  py={1}
                  borderRadius="full"
                  bg="green.700"
                  color="white"
                  fontSize="0.68rem"
                  fontWeight="800"
                  display="flex"
                  alignItems="center"
                >
                  <span>{item.alertLabel}</span>
                </Box>
              )}
            </Box>
            <Text mt={1} fontSize="xs" color="gray.500" textAlign="right">
              {item.imageCredit}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" py={4}>
            <Text fontSize="1.15rem" fontWeight="900" color="green.900">
              {item.title}
            </Text>
            <Box
              mt={3}
              p={3}
              borderRadius="md"
              bg="orange.50"
              borderLeft="4px solid"
              borderColor="orange.500"
            >
              <Text
                fontSize="0.7rem"
                fontWeight="900"
                color="orange.800"
                mb={1}
              >
                Classificação e status sanitário
              </Text>
              <Text fontSize="0.82rem" color="gray.900" fontWeight="500" lineHeight="1.55">
                {item.status}
              </Text>
            </Box>
            <Text mt={3} fontSize="md" color="gray.900" fontWeight="500" lineHeight="1.65">
              {item.threat}
            </Text>
            <Text mt={2} fontSize="md" color="gray.700" fontWeight="500" lineHeight="1.6">
              {item.description}
            </Text>
          </Box>
        </SimpleGrid>
        <HStack gap={3} mt={5} w="100%">
          <Box
            as="button"
            flex={1}
            onClick={() => setSelectedAction("block")}
            p={3}
            borderRadius="12px"
            bg="red.600"
            color="white"
            fontWeight="900"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            _hover={{ bg: "red.700" }}
            transition="all 0.2s"
          >
            <ShieldAlert size={20} color="white" />
            <span>BLOQUEAR ENTRADA</span>
          </Box>

          <Box
            as="button"
            flex={1}
            onClick={() => setSelectedAction("allow")}
            p={3}
            borderRadius="12px"
            bg="green.600"
            color="white"
            fontWeight="900"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            _hover={{ bg: "green.700" }}
            transition="all 0.2s"
          >
            <ShieldCheck size={20} color="white" />
            <span>PERMITIR ENTRADA</span>
          </Box>
        </HStack>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              mt={4}
              p={3}
              borderRadius="12px"
              bg={isCorrect ? "green.50" : "orange.50"}
              borderLeft="4px solid"
              borderColor={isCorrect ? "green.500" : "orange.500"}
            >
              <Text
                fontSize="0.78rem"
                fontWeight="900"
                color={isCorrect ? "green.800" : "orange.800"}
                mb={1}
              >
                {isCorrect
                  ? "Dona Fito: boa análise!"
                  : "Dona Fito: atenção à documentação!"}
              </Text>
              <Text fontSize="0.82rem" color="gray.700" lineHeight="1.6">
                {feedback}
              </Text>
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}
