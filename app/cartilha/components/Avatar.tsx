import { Box } from "@chakra-ui/react";
import Image from "next/image";

export function Avatar({ src }: { src: string }) {
  return (
    <>
        {/* Avatar */}
          <Box
            w="60px"
            h="60px"
            borderRadius="50%"
            position="relative"
            overflow="hidden"
            bg="linear-gradient(135deg, #A5D6A7, #2E7D32)"
            boxShadow={[
              "0 1px 0 rgba(255,255,255,0.5) inset",
              "0 6px 20px rgba(46,125,50,0.30)",
              "0 2px 6px rgba(0,0,0,0.12)",
            ].join(", ")}
            border="3px solid white"
            role="img"
          >
            <Image
              src={src}
              alt="Avatar"
              fill
              sizes="60px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </Box>
    </>
  );
}