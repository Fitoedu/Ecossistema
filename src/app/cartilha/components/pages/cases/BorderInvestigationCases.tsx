"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import type { PageAlertData } from "../../../data/cartilha-data";
import { Avatar } from "../../layout/Avatar";
import { Icon } from "@chakra-ui/react";
import {
  AlertTriangle,
  CheckCircle2,
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
      "A ausência de certificado impede confirmar a origem e a sanidade da carga. Larvas da Mosca-da-carambola poderiam se espalhar para pomares locais.",
    imageSrc: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    correctAction: "block",
    alertLabel: "ALERTA: Mosca-da-carambola",
    status: "Origem não certificada · Entrada deve ser bloqueada",
    threat:
      "A carga não apresenta documentação sanitária para confirmar sua origem e segurança.",
    blockFeedback:
      "Uau! Se essa Mosca-da-carambola entrasse, toda a nossa produção local estaria em risco!",
    allowFeedback:
      "Atenção! Sem certificado sanitário, as frutas podem trazer uma praga perigosa. A carga deve ser bloqueada para inspeção.",
  },
  {
    id: 2,
    title: "Caso 2: Mudas de Laranja",
    description:
      "A ausência de certificação impede confirmar a origem. Essas mudas de citros vindas de fora podem trazer o temido Greening, uma doença sem cura para laranjeiras.",
    imageSrc: "https://images.unsplash.com/photo-1590502160462-2200234771a3",
    correctAction: "block",
    alertLabel: "ALERTA: Doença HLB",
    status: "Mudas suspeitas de Greening (HLB) · Entrada proibida",
    threat:
      "Mudas de citros sem certificação podem carregar o Huanglongbing (HLB), doença sem cura que compromete árvores cítricas e pode afetar toda a região.",
    blockFeedback:
      "Muito bem! Mudas sem comprovação podem espalhar o HLB e destruir pomares inteiros de laranja.",
    allowFeedback:
      "Atenção! Sem o selo de inspeção, essa doença destruiria as laranjeiras. A entrada deve ser bloqueada.",
  },
  {
    id: 3,
    title: "Caso 3: Maçãs Certificadas",
    description:
      "Carga com nota fiscal e certificado de inspeção sanitária de área livre de pragas. Tudo regularizado e seguro para trânsito.",
    imageSrc: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
    correctAction: "allow",
    alertLabel: "SEGURO: Carga Certificada",
    status: "Carga regularizada com certificação · Permitir entrada",
    threat:
      "O selo de inspeção e a nota fiscal permitem rastrear a origem e comprovam que a carga passou pelos controles sanitários.",
    blockFeedback:
      "Atenção! Esta carga está regularizada. Bloqueá-la sem motivo atrasa uma remessa segura e dificulta o trabalho de fiscalização.",
    allowFeedback:
      "Decisão correta! A documentação confirma que a carga foi inspecionada e pode seguir com segurança.",
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
              <Text fontSize="0.82rem" color="gray.700" lineHeight="1.65">
                O termo vem de “quarentena”: um período de isolamento para
                evitar a propagação. Na agricultura, a quarentena fitossanitária
                protege as plantas e a produção.
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
            h="220px"
            w="100%"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            bg="green.50"
          >
            <CasePhoto item={item} />
            {item.alertLabel && (
              <Box
                position="absolute"
                left={3}
                top={3}
                px={2.5}
                py={1}
                borderRadius="full"
                bg={item.correctAction === "block" ? "red.700" : "green.700"}
                color="white"
                fontSize="0.68rem"
                fontWeight="800"
                display="flex"
                alignItems="center"
                gap="5px"
              >
                {item.correctAction === "block" ? (
                  <AlertTriangle size={13} color="white" />
                ) : (
                  <CheckCircle2 size={13} color="white" />
                )}
                <span>{item.alertLabel}</span>
              </Box>
            )}
          </Box>
          <Box>
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
                Status sanitário
              </Text>
              <Text fontSize="0.82rem" color="gray.700" lineHeight="1.55">
                {item.status}
              </Text>
            </Box>
            <Text mt={3} fontSize="0.82rem" color="gray.700" lineHeight="1.65">
              {item.threat}
            </Text>
            <Text mt={2} fontSize="0.72rem" color="gray.600">
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
